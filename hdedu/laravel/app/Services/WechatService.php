<?php

namespace App\Services;

use App\Models\User;
use Houdunwang\Wechat\User\User as WechatUser;

class WechatService
{
    public function register(string $openid)
    {
        $user = User::where('openid', $openid)->first();
        if (!$user) {
            $wechatUserService = new WechatUser();
            $wechatUserInfo = $wechatUserService->getByOpenid($openid);
            $user = User::create([
                'name' => $wechatUserInfo['nickname'] ?? '',
                'openid' => $wechatUserInfo['openid'] ?? '',
                'sex' => $wechatUserInfo['sex'] ?? '',
            ]);
        }
        return $user;
    }
}
