<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
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

            // HASH PASSWORD !!!
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'message' => 'Register success',
            'data' => $user
        ], 201);
    }


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


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout success'
        ]);
    }
}
