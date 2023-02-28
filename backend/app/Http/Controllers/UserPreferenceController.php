<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\UserPreference;
use Illuminate\Support\Facades\Auth;


class UserPreferenceController extends Controller
{
    public function saveUserPrefrences(Request $request){

        $user = Auth::user();
        if($user){
            $preferences = UserPreference::updateOrCreate(
                ['user_id' => $user->id],
                [
                    'keywords' => $request->input('keywords'),
                    'from' => $request->input('from'),
                    'categories' => json_encode($request->input('categories')),
                    'sources' => json_encode($request->input('sources'))
                ]
            );
        }

        return true;

    }
}

