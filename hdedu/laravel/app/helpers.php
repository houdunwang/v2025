<?php
//是否是超级管理员

use Illuminate\Support\Facades\Auth;

if (!function_exists('isAdministrator')) {
    function isAdministrator()
    {
        return Auth::check() && Auth::user()->isAdministrator;
    }
}
if (!function_exists('user')) {
    function user(string $field)
    {
        return Auth::check() ? Auth::user()->$field : null;
    }
}

if (!function_exists('getModel')) {
    function getModel()
    {
        $class = '\App\Models\\' . ucfirst(request('modelName'));
        return $class::findOrFail(request('modelId'));
    }
}
