<?php

namespace App\Wechat\Process;

use App\Models\Sign;
use Houdunwang\Wechat\Message\Message;
use Houdunwang\Wechat\User\User;
use Illuminate\Support\Facades\Log;

class SignProcess
{
    public function __construct(public Message $message) {}
    //签到udunwang\Wechat\Message\Message
    public function handle()
    {
        if ($this->message->isTextMessage()) {
            $content = $this->message->getMessage('Content');
            if (mb_substr($content, 0, 2) != '签到') return;
            $user = app('wx')->register($this->message->getMessage('FromUserName'));
            $isSign = $user->signs()->whereDate('created_at', now())->exists();
            if ($isSign) return $this->message->text('您今天已经签到过了');
            $signContent = mb_substr($content, 2);
            $user->signs()->create([
                'mood' => 'kx',
                'content' => $signContent,
            ]);
            return $this->message->text('签到成功');
        }
    }
}
