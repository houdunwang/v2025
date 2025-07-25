<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Yansongda\Pay\Pay;
use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;
use Log;

class PayController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            // new Middleware('auth:sanctum', only: ['alipay']),
        ];
    }

    public function alipay(Order $order)
    {
        return Pay::alipay()->web([
            'out_trade_no' => $order->sn,
            'total_amount' => $order->price,
            'subject' => $order->subject
        ]);
    }

    public function alipaySync()
    {
        $result = Pay::alipay()->callback();
        $res = app('order')->handle($result['out_trade_no']);
        return get_class($res) === 'App\Models\Package' ?
            redirect('http://localhost:5173/member/subscribe')
            : redirect('http://localhost:5173/member/lesson');
    }

    public function alipayAsync()
    {
        $result = Pay::alipay()->callback();
        Log::info($result);
        app('order')->handle($result['out_trade_no']);
        return Pay::alipay()->success();
    }


    public function async()
    {
        $result = Pay::wechat()->callback();
        app('order')->handle($result['resource']['ciphertext']['out_trade_no']);
        return Pay::wechat()->success();
    }

    public function wepay(Order $order)
    {
        $order = [
            'out_trade_no' => $order->sn,
            'description' => $order->subject,
            'amount' => [
                'total' => $order->price * 100,
            ],
        ];
        $result = Pay::wechat()->scan($order);
        //⽣成⼆维码图⽚
        $builder = new Builder(
            writer: new PngWriter(),
            writerOptions: [],
            validateResult: false,
            data: $result['code_url'],
            encoding: new Encoding('UTF-8'),
            errorCorrectionLevel: ErrorCorrectionLevel::High,
            size: 300,
            margin: 0,
            roundBlockSizeMode: RoundBlockSizeMode::Margin,
            logoResizeToWidth: 50,
            logoPunchoutBackground: true,
        );
        header("Content-Type:image/png");
        return $builder->build()->getString();
    }
}
