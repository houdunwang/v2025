<?php

namespace App\Wechat;

use App\Http\Controllers\Controller;
use Houdunwang\Wechat\Message\Message;
use Houdunwang\Wechat\QrCode\QrCode;
use Houdunwang\Wechat\WeChat;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class WechatUserInfoQrController extends Controller
{
    public function __invoke()
    {
        $data = [
            "expire_seconds" => 3600,
            "action_name" => "QR_STR_SCENE",
            "action_info" => [
                "scene" => [
                    "scene_str" => "wechat_user_info"
                ]
            ]
        ];
        return (new QrCode())->getQrTicketAndBase64Image($data);
    }
}
