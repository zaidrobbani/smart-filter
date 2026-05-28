<?php

namespace App\Http\Requests\Bookmarks;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookmarkRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // middleware auth sudah handle
    }

    public function rules(): array
    {
        return [
            'recipe_id' => ['required', 'integer', 'exists:recipes,id'],
        ];
    }
}
