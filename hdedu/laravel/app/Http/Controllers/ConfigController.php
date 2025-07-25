<?php

namespace App\Http\Controllers;

use App\Models\Config;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class ConfigController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', only: ['all']),
        ];
    }
    public function all()
    {
        Gate::authorize('all', Config::class);
        return [
            "system" => config('system'),
            'common' => config('common'),
            'pay' => config('pay')
        ];
    }

    public function common()
    {
        return [
            'common' => config('common'),
        ];
    }

    public function update(Request $request)
    {
        Gate::authorize('update', Config::class);
        collect($request->input())->each(function ($value, $name) {
            Config::updateOrCreate(['name' => $name], ['data' => $value]);
        });
        return $this->respondOk('配置项更新成功');
    }
}
