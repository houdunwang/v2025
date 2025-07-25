<?php

use Yansongda\Pay\Pay;

return [
    'alipay' => [
        'default' => [
            "enable" => 1,
            // 「必填」支付宝分配的 app_id
            'app_id' => env('pay_alipay_app_id'),
            // 「必填」应用私钥 字符串或路径
            // 在 https://open.alipay.com/develop/manage 《应用详情->开发设置->接口加签方式》中设置
            'app_secret_cert' => 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChlv+VeWw+NJ8XqRo3A4aivh5jqjLRlW2GW/paZb5Csjo3jJ7Ymd5hkOuf4SyZV62u8Yy/J5Q/NrZiJw6jaD+5t0+/AGEvlfTiT0JHrcqlbgayf/lvPP/15tEjBL57TgAgM1y8+BRSzDh1KySNeIlVdh5ZZI5jdH1lnb1ffJHuec9u2wfwpnZx0o7A6FhBfUuaEugX9sKAagl+aG74SkrII5W2lqAt/gXHBYW2xblqd7/NSPd4Lcx18FX99L1eje18+DiLN0wI/UJUoMKvVNo4wXW/iZWw9ecrAcrdejAaaHd8Etui8kc8YIhKLwFzDWGNN0rle4zCnB92+j0zRDzJAgMBAAECggEAahdNbsHtw1mhKlOoFn6GIstYAG96Ngg5hIFW+YrbQ8boWhhFIkjDrKMNUEbylSrvqXCFy+scdfRiAkdKYRbM4A3umaSSKj/2K6+GALGl3r9CPmevSM1v7+6/WJKAzUwE4R9Xv+nQzhuu5Z6RvSBqamXGv0I6CiotOk46SzrqRPs9oJhqZ0xTFUZytmuZPwn5QsMQTP3PyYZnXXpDh3te6utpvlIiOoVGUeAKDHr9uA1ygKc3FzhqEui2XwEUpZrS+ab4dZTUM3fpOzoyPqgHLyOqgcg4NRgyaBojfCS7rOPcL/A4KtLi/iH9KXmszFZbRst9TIJeW7E+OMFL6FFdkQKBgQDxlAiZeZWeVGhr9Qc4AiMZnGfIQ/a7zEkWLk/OCkQ49UdkfZ/+R2CPU0pIFWnxODM7ODytc+r8rNoJkrKosGhBfaSlpbBUgbOLjYWCNtHAoxlWzt/xsEnjVO9RhAQ02I13IDBlDSQk0vKtTi/RJ3s+lHqVJuJf9ZxH4E9SAuL2jwKBgQCrPIa8DL3qjJeFCAEc8pVI+c+pGOhp2hkXdqPX9xjzidUk3F1Fm0WqSkjFR0ZyDTfpzvB+ek3k3/0KbXNqxGDIpdtCktHly/5Q+RxEM7iWgfVcYQvqmtX/mSst5Q+yYHBzBWYLVMsgAIsht3C9yfIYIvBsZc7rLRmUp8gXd+MDJwKBgEl5yefMKCqg56W2P/zUAZL/lD1AFqJl7vDVIya6zqc4Sv+QigIP+Zl+LsCf6roYatSfNS1YbWdut15kBPzzsrIAofxT2b7KOC7A25OQUtmxgbp6b3iWMtL2+VckvRbJqrVJ0A5cIdslYfQ+LKMDzCNri6Ej04R2MpNV8SozgI6XAoGAOtk7SMdsQX592EdO8p7f9Ut9NZUM0swUkX7Bgkg2eAQnj1p4Z6KcR5Dt/3amXC30yFLJTf5EZOMhuIKzBr9kr7BocTG6FyqLRVLHhxzrVDZnl472pHMAFq6SK1ysj1YbbzwsvLowcNge+MBta5xKqkbfr7Excpt2TiN3XbFjAEMCgYEA2w43vFIhabUFW/hCkzcM/5ecXNdsAmU7e+OQALB3FpVzmzLnsOntbPY8gtURNLrCrmp3pNIfilMvSpS6bBUYnXfJLsrUIMCxodCHWMuuqsA1xnr+SHQ6XHLZ4E+sEkkgdKnLfSWd1OsxqMGUKD+CdM44nyqUAvB3TKMHLHHngeo=',
            // 「必填」应用公钥证书 路径
            // 设置应用私钥后，即可下载得到以下3个证书
            'app_public_cert_path' => base_path('pay/alipay/appCertPublicKey_2017112100066649.crt'),
            // 「必填」支付宝公钥证书 路径
            'alipay_public_cert_path' => base_path('pay/alipay/alipayCertPublicKey_RSA2.crt'),
            // 「必填」支付宝根证书 路径
            'alipay_root_cert_path' => base_path('pay/alipay/alipayRootCert.crt'),
            'return_url' => 'https://yansongda.cn/alipay/return',
            'notify_url' => 'https://yansongda.cn/alipay/notify',
            // 「选填」第三方应用授权token
            'app_auth_token' => '',
            // 「选填」服务商模式下的服务商 id，当 mode 为 Pay::MODE_SERVICE 时使用该参数
            'service_provider_id' => '',
            // 「选填」默认为正常模式。可选为： MODE_NORMAL, MODE_SANDBOX, MODE_SERVICE
            'mode' => Pay::MODE_NORMAL,
        ]
    ],
    'wechat' => [
        'default' => [
            "enable" => 1,
            // 「必填」商户号，服务商模式下为服务商商户号
            // 可在 https://pay.weixin.qq.com/ 账户中心->商户信息 查看
            'mch_id' => env('wepay_mch_id'),
            // 「选填」v2商户私钥
            'mch_secret_key_v2' => '',
            // 「必填」v3 商户秘钥
            // 即 API v3 密钥(32字节，形如md5值)，可在 账户中心->API安全 中设置
            'mch_secret_key' => env('wepay_mch_secret_key'),
            // 「必填」商户私钥 字符串或路径
            // 即 API证书 PRIVATE KEY，可在 账户中心->API安全->申请API证书 里获得
            // 文件名形如：apiclient_key.pem
            'mch_secret_cert' => base_path('pay/wepay/apiclient_key.pem'),
            // 「必填」商户公钥证书路径
            // 即 API证书 CERTIFICATE，可在 账户中心->API安全->申请API证书 里获得
            // 文件名形如：apiclient_cert.pem
            'mch_public_cert_path' => base_path('pay/wepay/apiclient_cert.pem'),
            // 「必填」微信回调url
            // 不能有参数，如?号，空格等，否则会无法正确回调 https
            'notify_url' => 'https://live.houdunren.com/hd/pay/wepay/async',
            // 「选填」公众号 的 app_id
            // 可在 mp.weixin.qq.com 设置与开发->基本配置->开发者ID(AppID) 查看
            'mp_app_id' => env('wepay_mp_app_id'),
            // 「选填」小程序 的 app_id
            'mini_app_id' => '',
            // 「选填」app 的 app_id
            'app_id' => '',
            // 「选填」服务商模式下，子公众号 的 app_id
            'sub_mp_app_id' => '',
            // 「选填」服务商模式下，子 app 的 app_id
            'sub_app_id' => '',
            // 「选填」服务商模式下，子小程序 的 app_id
            'sub_mini_app_id' => '',
            // 「选填」服务商模式下，子商户id
            'sub_mch_id' => '',
            // 「选填」（适用于 2024-11 及之前开通微信支付的老商户）微信支付平台证书序列号及证书路径，强烈建议 php-fpm 模式下配置此参数
            // 「必填」微信支付公钥ID及证书路径，key 填写形如 PUB_KEY_ID_0000000000000024101100397200000006 的公钥id，见 https://pay.weixin.qq.com/doc/v3/merchant/4013053249
            'wechat_public_cert_path' => [
                // '45F59D4DABF31918AFCEC556D5D2C6E376675D57' => __DIR__ . '/Cert/wechatPublicKey.crt',
                // 'PUB_KEY_ID_0000000000000024101100397200000006' => __DIR__ . '/Cert/publickey.pem',
                env('wepay_PUB_KEY_ID') => base_path('pay/wepay/publickey.pem'),
            ],
            // 「选填」默认为正常模式。可选为： MODE_NORMAL, MODE_SERVICE
            'mode' => Pay::MODE_NORMAL,
        ]
    ],
    'unipay' => [
        'default' => [
            // 「必填」商户号
            'mch_id' => '777290058167151',
            // 「选填」商户密钥：为银联条码支付综合前置平台配置：https://up.95516.com/open/openapi?code=unionpay
            'mch_secret_key' => '979da4cfccbae7923641daa5dd7047c2',
            // 「必填」商户公私钥
            'mch_cert_path' => __DIR__ . '/Cert/unipayAppCert.pfx',
            // 「必填」商户公私钥密码
            'mch_cert_password' => '000000',
            // 「必填」银联公钥证书路径
            'unipay_public_cert_path' => __DIR__ . '/Cert/unipayCertPublicKey.cer',
            // 「必填」
            'return_url' => 'https://yansongda.cn/unipay/return',
            // 「必填」
            'notify_url' => 'https://yansongda.cn/unipay/notify',
            'mode' => Pay::MODE_NORMAL,
        ],
    ],
    'douyin' => [
        'default' => [
            // 「选填」商户号
            // 抖音开放平台 --> 应用详情 --> 支付信息 --> 产品管理 --> 商户号
            'mch_id' => '73744242495132490630',
            // 「必填」支付 Token，用于支付回调签名
            // 抖音开放平台 --> 应用详情 --> 支付信息 --> 支付设置 --> Token(令牌)
            'mch_secret_token' => 'douyin_mini_token',
            // 「必填」支付 SALT，用于支付签名
            // 抖音开放平台 --> 应用详情 --> 支付信息 --> 支付设置 --> SALT
            'mch_secret_salt' => 'oDxWDBr4U7FAAQ8hnGDm29i4A6pbTMDKme4WLLvA',
            // 「必填」小程序 app_id
            // 抖音开放平台 --> 应用详情 --> 支付信息 --> 支付设置 --> 小程序appid
            'mini_app_id' => 'tt226e54d3bd581bf801',
            // 「选填」抖音开放平台服务商id
            'thirdparty_id' => '',
            // 「选填」抖音支付回调地址
            'notify_url' => 'https://yansongda.cn/douyin/notify',
        ],
    ],
    'jsb' => [
        'default' => [
            // 服务代码
            'svr_code' => '',
            // 「必填」合作商ID
            'partner_id' => '',
            // 「必填」公私钥对编号
            'public_key_code' => '00',
            // 「必填」商户私钥(加密签名)
            'mch_secret_cert_path' => '',
            // 「必填」商户公钥证书路径(提供江苏银行进行验证签名用)
            'mch_public_cert_path' => '',
            // 「必填」江苏银行的公钥(用于解密江苏银行返回的数据)
            'jsb_public_cert_path' => '',
            // 支付通知地址
            'notify_url' => '',
            // 「选填」默认为正常模式。可选为： MODE_NORMAL:正式环境, MODE_SANDBOX:测试环境
            'mode' => Pay::MODE_NORMAL,
        ],
    ],
    'logger' => [
        'enable' => false,
        'file' => './logs/pay.log',
        'level' => 'info', // 建议生产环境等级调整为 info，开发环境为 debug
        'type' => 'single', // optional, 可选 daily.
        'max_file' => 30, // optional, 当 type 为 daily 时有效，默认 30 天
    ],
    'http' => [ // optional
        'timeout' => 5.0,
        'connect_timeout' => 5.0,
        // 更多配置项请参考 [Guzzle](https://guzzle-cn.readthedocs.io/zh_CN/latest/request-options.html)
    ],
];
