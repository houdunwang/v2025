<?php

namespace App\Services;

use App\Models\Lesson;
use Illuminate\Support\Facades\Auth;

class LessonService
{
    public function can(Lesson $lesson)
    {
        $user = Auth::user();
        if (!$user) return false;
        if ($user->subscribe && $user->subscribe->end_time > now()) return true;
        if ($user->lessons()->where('lesson_id', $lesson->id)->exists()) return true;
        return false;
    }
}
