<?php

namespace App\Http\Middleware;

use App\Models\Config;
use Closure;
use Houdunwang\Wechat\WeChat;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Yansongda\Pay\Pay;

class InitMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $this->initConfig();
        $this->wechatInit();
        $this->payConfig();
        return $next($request);
    }

    protected function initConfig()
    {
        $db = Config::all();
        collect(['system', 'common', 'pay'])->each(function ($name) use ($db) {
            $data = $db->where('name', $name)->value('data') ?? [];
            config([$name => [...config($name), ...$data,]]);
        });
    }

    protected function wechatInit()
    {
        $config = [
            'wechat_official_appid' => config('system.wechat_official_appid'),
            'wechat_official_secret' => config('system.wechat_official_secret'),
            'wechat_official_token' => config('system.wechat_official_token'),
        ];
        WeChat::init($config);
    }
    protected function payConfig()
    {
        config(['pay.alipay.default.return_url' => route('pay.alipay.sync')]);
        config(['pay.alipay.default.notify_url' => route('pay.alipay.async')]);
        // config(['pay.wechat.default.notify_url' => route('pay.wepay.async')]);

        Pay::config(config('pay'));
    }
}
