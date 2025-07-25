<?php

namespace App\Providers;

use App\Services\CodeService;
use App\Services\DynamicService;
use App\Services\ImageServer;
use App\Services\LearnService;
use App\Services\LessonService;
use App\Services\LimiterService;
use App\Services\OrderService;
use App\Services\OssService;
use App\Services\SmsService;
use App\Services\UploadServer;
use App\Services\WechatService;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    public $singletons = [
        'upload' => UploadServer::class,
        'image' => ImageServer::class,
        'code' => CodeService::class,
        'limiter' => LimiterService::class,
        'sms' => SmsService::class,
        'dynamic' => DynamicService::class,
        'learn' => LearnService::class,
        'oss' => OssService::class,
        'wx' => WechatService::class,
        'order' => OrderService::class,
        'lesson' => LessonService::class,
    ];
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
        JsonResource::withoutWrapping();
    }
}
