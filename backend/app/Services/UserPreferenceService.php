<?php

namespace App\Services;

use App\Models\UserPreference;

class UserPreferenceService
{
    public function storeOrUpdate($user, $data)
    {
        return UserPreference::updateOrCreate(
            ['user_id' => $user->id],
            [
                'keywords' => $data['keywords'],
                'from' => $data['from'],
                'categories' => json_encode($data['categories']),
                'sources' => json_encode($data['sources']),
            ]
        );
    }
}
