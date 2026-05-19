<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'username'          => 'Admin User',
                'email'             => 'admin@smartfilter.com',
                'password'          => 'password123', // ← tidak perlu Hash::make, sudah di-cast 'hashed' di model
                'email_verified_at' => now(),
            ],
            [
                'username'          => 'Zaid Robbani',
                'email'             => 'zaid@smartfilter.com',
                'password'          => 'password123',
                'email_verified_at' => now(),
            ],
            [
                'username'          => 'Test User',
                'email'             => 'test@smartfilter.com',
                'password'          => 'password123',
                'email_verified_at' => null,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}