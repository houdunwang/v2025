<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLessonSubscribeRequest;
use App\Http\Requests\UpdateLessonSubscribeRequest;
use App\Http\Resources\LessonResource;
use App\Models\LessonSubscribe;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;

class LessonSubscribeController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: []),
        ];
    }
    public function subscribe()
    {
        $user = Auth::user();
        $lessons = $user->lessons()->with(['chapters'])->paginate(6);
        return LessonResource::collection($lessons->withPath(''));
    }
}
