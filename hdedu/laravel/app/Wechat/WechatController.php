<?php

namespace App\Wechat;

use App\Http\Controllers\Controller;
use Houdunwang\Wechat\Message\Message;
use Houdunwang\Wechat\WeChat;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class WechatController extends Controller
{
    public function __invoke()
    {
        $files = Storage::disk('app')->files('Wechat/Process');
        foreach ($files as $file) {
            $class = 'App\\' . str_replace(['.php', '/'], ['', '\\'], $file);
            if (class_exists($class)) {
                $process =  app()->make($class);
                if ($content = $process->handle(new Message())) {
                    return $content;
                }
            }
        }
    }
}
