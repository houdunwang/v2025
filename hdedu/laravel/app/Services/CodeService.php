<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\EmailCodeNotification;
use Illuminate\Support\Facades\Cache;

//验证码服务
class CodeService
{
    private $user;
    private $code;
    public function send(User $user, string $driver)
    {
        app('limiter')->run('send_code', 1, 1);
        $this->user = $user;
        $this->code = $this->getCode();
        switch ($driver) {
            case 'mobile':
                $this->mobile();
                break;
            case 'email':
            default:
                $this->email();
        }
    }
    private function email()
    {
        $this->user->notify(new EmailCodeNotification($this->code));
    }

    private function mobile()
    {
        app('sms')->send(
            $this->user->mobile,
            config('system.aliyun_code_template'),
            ["code" => $this->code, "product" => config('app.name')]
        );
    }

    private function getCode()
    {
        Cache::add('send_code', mt_rand(1000, 9999), 600);
        return Cache::get('send_code');
    }
}
