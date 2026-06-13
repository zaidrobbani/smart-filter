<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\PasswordUpdateRequest;
use App\Http\Requests\Settings\ProfileDeleteRequest;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Resolve the full public URL for an avatar value.
     * - null / empty  → null (frontend akan pakai fallback)
     * - starts with http → sudah berupa URL lengkap (dicebear, google, dll)
     * - anything else → path relatif di disk public → generate storage URL
     */
    private function resolveAvatarUrl(?string $avatar): ?string
    {
        if (! $avatar) {
            return null;
        }

        if (str_starts_with($avatar, 'http://') || str_starts_with($avatar, 'https://')) {
            return $avatar;
        }

        return asset('storage/'.$avatar);
    }

    /**
     * Build the user array that is shared to Inertia.
     */
    private function userPayload(Request $request): array
    {
        $user = $request->user();

        return [
            'id' => $user->id,
            'name' => $user->username,
            'email' => $user->email,
            'avatar' => $this->resolveAvatarUrl($user->avatar),
            'username' => $user->username,
        ];
    }

    /**
     * Show the user's profile settings page.
     */
    public function show(Request $request): Response
    {
        $rule = Password::default();
        $minPasswordLength = (new \ReflectionProperty($rule, 'min'))->getValue($rule);

        return Inertia::render('settings/profile', [
            'user' => $this->userPayload($request),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
            'minPasswordLength' => $minPasswordLength,
        ]);
    }

    /**
     * Edit the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        return $this->show($request);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar if it is a locally stored file (not an external URL)
            $oldAvatar = $request->user()->avatar;
            if ($oldAvatar && ! str_starts_with($oldAvatar, 'http')) {
                Storage::disk('public')->delete($oldAvatar);
            }

            // Store new avatar and save only the relative path in DB
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $path;
        }

        // Map 'name' field to 'username' in the database
        if (isset($validated['name'])) {
            $validated['username'] = $validated['name'];
            unset($validated['name']);
        }

        $request->user()->fill($validated);

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Profile updated.')]);

        return to_route('profile.edit');
    }

    /**
     * Delete the user's profile.
     */
    public function destroy(ProfileDeleteRequest $request): RedirectResponse
    {
        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function updatePassword(PasswordUpdateRequest $request): RedirectResponse
    {
        $request->user()->update([
            'password' => Hash::make($request->validated('password')),
        ]);

        Inertia::flash('toast', ['type' => 'success', 'message' => __('Password updated successfully.')]);

        return to_route('profile.edit');
    }
}
