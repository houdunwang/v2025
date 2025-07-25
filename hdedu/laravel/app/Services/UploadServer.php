<?php

namespace App\Services;

use App\Models\Attachment;
use Illuminate\Http\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

//文件上传服务
class UploadServer
{
    public function run(UploadedFile $file)
    {
        $driver = config('system.upload_driver_local');
        switch ($driver) {
            case 'oss':
                $url = app('oss')->upload(date('Ym') . '/' . $file->hashName(), $file);
                return  $this->toDatabase($file, $this->replaceCdnDomain($file, $url), 'oss');
            case 'local':
            default:
                $data = $this->local($file);
                return  $this->toDatabase($file, $data['url'], 'local');
        }
    }

    private function replaceCdnDomain(UploadedFile $file, string $url)
    {
        $domain = preg_match('/image\//', $file->getMimeType())  ? config('system.aliyun_image_cdn_domain') : config('system.aliyun_video_cdn_domain');
        return $domain . preg_replace('/https?:\/\/.+?(?=\/)/is', '', $url);
    }

    private function local(UploadedFile $file)
    {
        $url = $file->storeAs('attachements/' . date('Ym'), $file->hashName(), 'public');
        return ["url" => url($url)];
    }

    private function toDatabase(UploadedFile $file, string $url, string $driver)
    {
        $attachment = new Attachment([
            'user_id' => Auth::id(),
            'name' => $file->getClientOriginalName(),
            'url' => $url,
            'size' => $file->getSize(),
            'mime' => $file->getMimeType(),
            'driver' => $driver,
            'extension' => $file->getClientOriginalExtension(),
        ]);
        $attachment->save();
        return $attachment;
    }
}
