<?php

namespace App\Wechat;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Houdunwang\Wechat\Message\Message;
use Houdunwang\Wechat\QrCode\QrCode;
use Houdunwang\Wechat\WeChat;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class WechatBindController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    public function __invoke(Request $request)
    {
        $ticket = $request->input('ticket');
        $wechatScan = Cache::get($ticket);
        if ($wechatScan) {
            if (User::where('openid', $wechatScan['FromUserName'])->exists()) {
                return ['success' => false, 'message' => '该微信已绑定过账号'];
            }
            $user = Auth::user();
            $user->openid = $wechatScan['FromUserName'];
            $user->save();
            return ['success' => true];
        }
    }
}
