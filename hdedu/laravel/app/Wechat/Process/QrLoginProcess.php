<?php

namespace App\Wechat\Process;

use Houdunwang\Wechat\Message\Message;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class QrLoginProcess
{
    public function __construct(public Message $message) {}

    public function handle(Message $message)
    {
        //我该处理的
        if ($message->isScanEvent()) {
            $scanInfo = $message->getMessage();
            Cache::put($scanInfo['Ticket'], $scanInfo, now()->addMinute(10));
            return  $message->text(config('app.name') . '欢迎你回家');
        }
    }
}
