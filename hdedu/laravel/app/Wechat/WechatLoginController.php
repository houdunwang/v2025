<?php

namespace App\Wechat;

use App\Http\Controllers\Controller;
use App\Services\WechatService;
use Auth;
use Houdunwang\Wechat\Message\Message;
use Houdunwang\Wechat\QrCode\QrCode;
use Houdunwang\Wechat\WeChat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class WechatLoginController extends Controller
{
    public function __construct(private WechatService $wechat) {}
    public function __invoke(Request $request)
    {
        $ticket = $request->input('ticket');
        $wechatScan = Cache::get($ticket);
        if ($wechatScan) {
            $user = $this->wechat->register($wechatScan['FromUserName']);
            Auth::login($user);
            return ['success' => true];
        }
    }
}
