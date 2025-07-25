<?php
return [
    "aliyun_accesskey_id" => env('AccessKey_ID'),
    "aliyun_accesskey_secret" => env("AccessKey_Secret"),
    "aliyun_oss_endpoint" => "",
    //
    "aliyun_video_oss_bucket" => "test-video-999",
    "aliyun_video_cdn_domain" => "https://test-video.houdunren.com",
    "aliyun_video_cdn_auth_key" => "houdunren999",
    "aliyun_image_oss_bucket" => "test-image-888",
    "aliyun_image_cdn_domain" => "https://test-image-888.houdunren.com",
    // 短信
    'aliyun_sms_sign' => env('ALIYUN_SIGN'),
    'aliyun_sms_template' => 'SMS_12840367',
    "test_phone" => env('TEST_PHONE'),
    // 邮件
    'aliyun_email_account' => '',
    'aliyun_email_password' => '',
    'aliyun_email_host' => '',
    'aliyun_email_port' => '25',
    // 上传
    'upload_driver_local' => 'oss',
    'upload_image_size' => '2',
    'upload_image_type' => '.jpeg,.jpg,.png',
    'upload_image_max_width' => '1920',
    'upload_image_max_height' => '1080',
    'upload_video_size' => '30',
    'upload_video_type' => '.mp4',
    //支付
    'pay_alipay_app_id' => '',
    'pay_alipay_secret_cert' => '',
    'pay_alipay_open' => 1,
    'pay_wepay_mch_id' => '',
    'pay_wepay_secret_key' => '',
    'pay_wepay_app_id' => '',
    'pay_wepay_open' => 1,
    //公众号
    'wechat_official_appid' => 'wxd3ba311aa7b6b4ae',
    'wechat_official_secret' => '1ef41b76a9d7c2eb59d18d204bc6f7f4',
    'wechat_official_token' => '5a84c99071a90871509e96e3c134e6b5'
];
