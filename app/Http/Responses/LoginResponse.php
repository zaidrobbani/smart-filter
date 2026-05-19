<?php

namespace App\Http\Responses;

use App\Actions\Teams\CreateTeam;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\URL;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Symfony\Component\HttpFoundation\Response;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): Response
    {
        $user = $request->user();
        $team = $user?->currentTeam ?? $user?->personalTeam();

        // Create a personal team if the user doesn't have one
        if (! $team && $user) {
            $team = app(CreateTeam::class)->handle($user, $user->username, isPersonal: true);
            $user->refresh();
        }

        if (! $team) {
            abort(403);
        }

        URL::defaults(['current_team' => $team->slug]);

        return $request->wantsJson()
            ? new JsonResponse(['two_factor' => false], 200)
            : redirect()->intended(route('dashboard'));
    }
}
