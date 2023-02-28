<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class ArticleSearchRequest extends FormRequest
{
    public function rules()
    {
        return [
            'keywords' => 'nullable|string',
            'from' => 'nullable|date_format:Y-m-d',
            'categories' => 'nullable',
            'categories.*' => 'string',
            'sources' => 'nullable',
            'sources.*' => 'in:nytimes,newsapi,guardian',
            'language' => 'nullable|string',
            'limit' => 'nullable|integer|min:1|max:50',
            'page' => 'nullable|integer|min:1',
        ];
    }
}