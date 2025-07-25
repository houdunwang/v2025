<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //手机号 邮箱  帐号
    public function login(Request $request, User $user)
    {
        $field = preg_match('/^\d{11}$/', $request->input('account')) ? 'mobile' : (
            filter_var($request->input('account'), FILTER_VALIDATE_EMAIL) ? 'email' : 'name'
        );
        $request->validate([
            "account" => ['required', 'exists:users,' . $field],
            "password" => ['required'],
            'captcha' => ['required', 'captcha']
        ], ['captcha.captcha' => '验证码输入错误'], ['captcha' => '验证码', 'account' => '帐号']);
        $user = User::where($field, $request->input('account'))->first();
        if (!Hash::check($request->input('password'), $user->password)) {
            throw ValidationException::withMessages(['password' => '密码输入错误']);
        }

        Auth::login($user);
        return ['user' => $user->refresh()];
    }

    public function logout()
    {
        Auth::logout('web');
        return ['message' => '退出成功'];
    }

    public function register(RegisterRequest $request, User $user)
    {
        $user->name = $request->input('name');
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return ['user' => $user->refresh()];
    }

    public function sendCode(Request $request, string $field, User $user)
    {
        $rule = $field == 'email' ? ['required', 'email'] : ['required', 'regex:/^\d{11}$/'];
        $request->validate([
            $field => [...$rule, 'exists:users,' . $field],
        ], [], ['email' => '邮箱', 'mobile' => "手机", "mobile" => "手机号"]);
        $user->$field = request($field);
        app('code')->send($user, $field);
        return response()->json(['message' => '验证码已发送，请查收']);
    }

    public function findPassword(Request $request, string $field)
    {
        $rule = $field == 'email' ? ['required', 'email'] : ['required', 'regex:/^\d{11}$/'];
        $request->validate(
            [
                $field => [...$rule, 'exists:users,' . $field],
                'captcha' => ['required', 'captcha'],
                'password' => ['required', 'confirmed'],
                'code' => ['required', function ($attribute, $value, $fail) use ($request) {
                    if ($value != Cache::get('send_code')) {
                        $fail('验证码错误');
                    }
                }]
            ],
            ['captcha.captcha' => '验证码输入错误'],
            ['email' => '邮箱', "mobile" => '手机号', 'code' => "验证码", "password" => '密码', 'captcha' => '验证码']
        );

        $user = User::where($field, $request->input($field))->first();
        $user->password = Hash::make($request->input('password'));
        $user->save();
        return $this->respondOk('绑定成功');
    }
}
