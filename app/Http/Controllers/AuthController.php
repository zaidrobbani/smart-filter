<?php

namespace App\Http\Controllers;

use App\Actions\Teams\CreateTeam;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class AuthController extends Controller
{
    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function register(Request $request)
    {
        if ($request->has('username') && ! $request->has('name')) {
            $request->merge(['name' => $request->input('username')]);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'username' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        app(CreateTeam::class)->handle($user, $user->username."'s Team", isPersonal: true);

        Auth::login($user);

        $user->refresh();

        return redirect()->route('dashboard', ['current_team' => $user->currentTeam->slug]);
    }

    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $key = md5('login'.$request->email.'|'.$request->ip());

        if (RateLimiter::tooManyAttempts($key, 5)) {
            abort(429);
        }

        if (! Auth::attempt($request->only('email', 'password'))) {
            RateLimiter::hit($key);

            return back()->withErrors([
                'email' => 'Email atau password salah',
            ]);
        }

        RateLimiter::clear($key);
        $request->session()->regenerate();

        $user = auth()->user();

        if ($currentTeam = $user->currentTeam) {
            return redirect()->route('dashboard', ['current_team' => $currentTeam->slug]);
        }

        return redirect()->route('home');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home');
    }

    public function showForgotPassword()
    {
        return Inertia::render('Auth/ForgotPassword');
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        Password::sendResetLink($request->only('email'));

        return back()->with('status', 'Link reset password sudah dikirim ke email kamu');
    }

    public function showResetPassword(Request $request, $token)
    {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => $request->email,
        ]);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'token' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password),
                ])->save();
                $user->setRememberToken(Str::random(60));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return redirect()->route('login')->with('status', 'Password berhasil direset');
        }

        return back()->withErrors(['email' => 'Token tidak valid']);
    }

    // Google OAuth — tetap redirect biasa, tidak perlu page Inertia
    public function googleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::where('email', $googleUser->email)->first();

        if (! $user) {
            $user = User::create([
                'username' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar,
                'password' => bcrypt(Str::random(16)),
            ]);
        } else {
            $user->update([
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar,
            ]);
        }

        Auth::login($user);

        return redirect()->route('dashboard');
    }
}
