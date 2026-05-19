<?php

namespace App\Actions\Profile;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UpdateProfileAction
{
    public function execute(User $user, array $data): User
    {
        $updateData = [
            'username' => $data['username'],
            'email'    => $data['email'],
        ];

        if (!empty($data['password'])) {
            $updateData['password'] = $data['password']; // model sudah cast hashed
        }

        if (!empty($data['avatar'])) {
            $updateData['avatar'] = $data['avatar'];
        }

        $user->update($updateData);

        return $user->fresh();
    }
}