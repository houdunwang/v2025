<?php

namespace App\Services;

use App\Models\Learn;
use App\Models\User;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;

class LearnService
{
    public function record(Video $video)
    {
        $user = Auth::user();
        $learn = Learn::where('user_id', $user->id)->where('video_id', $video->id)->firstOrNew();
        if ($learn->id) {
            $learn->touch();
        } else {
            $learn->fill([...$video->toArray(), 'video_id' => $video->id, 'user_id' => $user->id]);
            $learn->save();
        }
    }
}
