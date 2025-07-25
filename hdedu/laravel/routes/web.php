<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChapterController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\DynamicController;
use App\Http\Controllers\LearnController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LessonSubscribeController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\PayController;
use App\Http\Controllers\SignController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\UploadController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;
use App\Models\Comment;
use App\Models\User;
use App\Notifications\CommentNotification;
use App\Wechat\WechatBindController;
use App\Wechat\WechatController;
use App\Wechat\WechatLoginController;
use App\Wechat\WechatUserInfoQrController;
use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return 'welcome@@';
// });

Route::fallback(function () {
    return file_get_contents(base_path('dist/index.html'));
});

Route::prefix('hd')->group(function () {
    Route::apiResource('lesson', LessonController::class);
    //章节
    Route::put('chapter/sort', [ChapterController::class, 'sort']);
    Route::apiResource('chapter', ChapterController::class);
    //视频
    Route::put('video/order', [VideoController::class, 'order']);
    Route::post('video/upload/{chapter}', [VideoController::class, 'upload']);
    Route::apiResource('video', VideoController::class);
    //登录注册
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/logout', [AuthController::class, 'logout']);
    Route::post('auth/send-code/{type}', [AuthController::class, 'sendCode']);
    Route::post('auth/findPassword/{type}', [AuthController::class, 'findPassword']);

    //用户
    Route::get('user/current', [UserController::class, 'current']);
    Route::get('user/info/{user}', [UserController::class, 'info']);
    Route::put('user', [UserController::class, 'update']);
    Route::put('user/password', [UserController::class, 'password']);
    Route::post('user/upload/avatar', [UserController::class, 'uploadAvatar']);
    Route::post('user/send-code/{field}', [UserController::class, 'sendBindCode']);
    Route::post('user/bind/email', [UserController::class, 'bindEmail']);
    Route::post('user/bind/mobile', [UserController::class, 'bindMobile']);
    //话题
    Route::apiResource('topic', TopicController::class);
    //文件上传
    Route::post('upload/image', [UploadController::class, 'image']);
    //评论
    Route::apiResource('comment', CommentController::class);
    //签到
    Route::apiResource('sign', SignController::class);
    Route::get('sign/userSignList/{user}', [SignController::class, 'userSignList']);
    //网站动态
    Route::apiResource('dynamic', DynamicController::class);
    //学习记录
    Route::apiResource('learn', LearnController::class);
    //通知
    Route::delete('notification/delete_all', [NotificationController::class, 'deleteAll']);
    Route::apiResource('notification', NotificationController::class);
    //网站配置
    Route::get('config/all', [ConfigController::class, 'all']);
    Route::get('config/common', [ConfigController::class, 'common']);
    Route::put('config', [ConfigController::class, 'update']);
    //套餐
    Route::apiResource('package', PackageController::class);
    //课程订阅
    Route::get('user/lesson/subscribe', [LessonSubscribeController::class, 'subscribe']);
    //公众号
    Route::any('wechat', WechatController::class);
    Route::post('wechat/qr/user_info', WechatUserInfoQrController::class);
    Route::post('wechat/qr/login', WechatLoginController::class);
    Route::post('wechat/qr/bind', WechatBindController::class);
    //订单
    Route::apiResource('order', OrderController::class);
    //支付
    Route::any('pay/alipay/sync', [PayController::class, 'alipaySync'])->name('pay.alipay.sync');
    Route::any('pay/alipay/async', [PayController::class, 'alipayAsync'])->name('pay.alipay.async');
    Route::get('pay/alipay/{order}', [PayController::class, 'alipay']);
    Route::any('pay/wepay/async', [PayController::class, 'async'])->name('pay.wepay.async');
    Route::post('pay/wepay/{order}', [PayController::class, 'wepay']);
});
