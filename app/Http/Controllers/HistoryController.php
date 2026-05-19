<?php

namespace App\Http\Controllers;

use App\Actions\History\GetUserHistoryAction;
use Inertia\Inertia;

class HistoryController extends Controller
{
    public function index(GetUserHistoryAction $action)
    {
        return Inertia::render('history/index', [
            'history' => $action->execute(),
        ]);
    }
}