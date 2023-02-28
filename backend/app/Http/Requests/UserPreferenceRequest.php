<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserPreferenceRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'keywords' => 'required|string',
            'from' => 'nullable|date',
            'categories' => 'nullable|array',
            'sources' => 'nullable|array',
        ];
    }
}
