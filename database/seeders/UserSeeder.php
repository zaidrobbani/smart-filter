<?php

namespace Database\Seeders;

use App\Actions\Teams\CreateTeam;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'username' => 'Admin User',
                'email' => 'admin@smartfilter.com',
                'password' => 'password123',
                'email_verified_at' => now(),
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=AdminUser',
            ],
            [
                'username' => 'Zaid Robbani',
                'email' => 'zaid@smartfilter.com',
                'password' => 'password123',
                'email_verified_at' => now(),
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=ZaidRobbani',
            ],
            [
                'username' => 'Test User',
                'email' => 'test@smartfilter.com',
                'password' => 'password123',
                'email_verified_at' => null,
                'avatar' => 'https://api.dicebear.com/7.x/avataaars/svg?seed=TestUser',
            ],
        ];

        foreach ($users as $userData) {
            $user = User::create($userData);

            // Create a personal team for the user
            app(CreateTeam::class)->handle($user, $userData['username'], isPersonal: true);
        }
    }
}
