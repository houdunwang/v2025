<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;

class LimiterService
{
    public function run($key, $perTwoMinutes = 1, $decayRate = 20)
    {
        $cacheKey = $key . (Auth::check() ? Auth::id() : request()->ip());
        $executed = RateLimiter::attempt($cacheKey, $perTwoMinutes, fn() => true, $decayRate);
        if (!$executed) {
            $seconds = RateLimiter::availableIn($cacheKey);
            abort(429, '请等 ' . $seconds . ' 秒后再试.');
        }
    }
}
