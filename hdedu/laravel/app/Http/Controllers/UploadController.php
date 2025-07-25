<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * 文件上传
 * Class UploadController
 */
class UploadController extends Controller
{
    public function image(Request $request)
    {
        return app('upload')->run($request->file('file'));
    }
}
