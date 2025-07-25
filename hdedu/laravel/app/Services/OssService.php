<?php

namespace App\Services;

use OSS\Credentials\StaticCredentialsProvider;
use OSS\OssClient;
use OSS\Core\OssException;
use Illuminate\Http\UploadedFile;

class OssService
{
    public function upload(string $object, UploadedFile $file)
    {
        $videoBucket = config('system.aliyun_video_oss_bucket');
        $imageBUcket = config('system.aliyun_image_oss_bucket');
        $bucket = preg_match('/image\//', $file->getMimeType())  ? $imageBUcket : $videoBucket;
        $ossClient = $this->getOssClient();
        $res = $ossClient->putObject($bucket, $object, \file_get_contents($file));
        return $res['oss-request-url'];
    }

    private function getOssClient()
    {
        // 获取AK和SK信息
        $accessKeyId = config('system.aliyun_accesskey_id');
        $accessKeySecret = config('system.aliyun_accesskey_secret');
        $provider = new StaticCredentialsProvider($accessKeyId, $accessKeySecret);
        $endpoint = "http://oss-cn-hangzhou.aliyuncs.com";
        $config = array(
            "provider" => $provider,
            "endpoint" => $endpoint,
            "signatureVersion" => OssClient::OSS_SIGNATURE_VERSION_V4,
            "region" => "cn-hangzhou"
        );
        return new OssClient($config);
    }

    public function cdnSign(string $path)
    {
        $domain = config('system.aliyun_video_cdn_domain');
        $key = config('system.aliyun_video_cdn_auth_key');
        $filename = preg_replace('/https?:\/\/.+?(?=\/)/is', '', $path);
        $time = strtotime("+20 minutes");
        $sstring = $filename . "-" . $time . "-0-0-" . $key;
        $auth_key = "auth_key=" . $time . "-0-0-" . md5($sstring);
        return $domain .  $filename . "?" . $auth_key;
    }
}
