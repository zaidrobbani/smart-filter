<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    // REGISTER
    public function register(Request $request)
    {
        // validation
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed'
        ]);

        // create user
        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,

            // HASH PASSWORD
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'Register success',
            'data' => $user
        ], 201);
    }


    // LOGIN
    public function login(Request $request)
    {
        // validation
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // cari user berdasarkan email
        $user = User::where('email', $request->email)->first();

        // cek user & password
        if (!$user || !Hash::check($request->password, $user->password)) {

            return response()->json([
                'message' => 'Invalid email or password'
            ], 401);
        }

        // generate token sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login success',
            'token' => $token,
            'data' => $user
        ]);
    }


    // LOGOUT
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout success'
        ]);
    }


    // REDIRECT TO GOOGLE
    public function googleRedirect()
    {
        return Socialite::driver('google')
            ->stateless()
            ->redirect();
    }


    // GOOGLE CALLBACK
    public function googleCallback()
    {
        $googleUser = Socialite::driver('google')
            ->stateless()
            ->user();

        // cek apakah user sudah ada
        $user = User::where('email', $googleUser->email)
            ->first();

        // kalau belum ada -> create user
        if (!$user) {

            // create user baru
            $user = User::create([
                'username' => $googleUser->name,
                'email' => $googleUser->email,
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar,
                'password' => bcrypt(Str::random(16))
            ]);
        } else {

            // update data google user lama
            $user->update([
                'google_id' => $googleUser->id,
                'avatar' => $googleUser->avatar
            ]);
        }

        // generate sanctum token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Google login success',
            'token' => $token,
            'data' => $user
        ]);
    }
}
