<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationReosurce;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Notification;

class NotificationController implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    public function index()
    {
        $user = Auth::user();
        $notifications = $user->notifications()->paginate(10)->withPath('');
        return NotificationReosurce::collection($notifications);
    }

    public function show(string $notification)
    {
        $user = Auth::user();
        $model  = $user->notifications()->where('id', $notification)->firstOrFail();
        $model->markAsRead();
    }

    public function destroy(string $notification)
    {
        $user = Auth::user();
        $user->notifications()->whereId($notification)->delete();
    }

    public function deleteAll()
    {
        $user = Auth::user();
        $user->notifications()->whereNotNull('read_at')->delete();
    }
}
