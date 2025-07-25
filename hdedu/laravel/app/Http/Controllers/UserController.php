<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserReosurce;
use App\Models\User;
use App\Notifications\EmailCodeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use PDO;

class UserController extends Controller
{
    public function current()
    {
        if (Auth::check()) {
            return new UserReosurce(Auth::user()->makeVisible(['openid'])->load(['subscribe']));
        }
    }
    public function info(User $user)
    {
        return new UserReosurce($user);
    }

    public function update(StoreUserRequest $request)
    {
        $user = Auth::user();
        $user->fill($request->input());
        $user->save();
        return new UserReosurce($user);
    }

    public function password(Request $request)
    {
        $user = Auth::user();
        $request->validate([
            'oldPassword' => ['required', function ($attribute, $value, $fail) use ($user) {
                if (!Hash::check($value, $user->password)) {
                    $fail('旧密码输入错误');
                }
            }],
            'password' => ['required', 'confirmed']
        ], [], ['oldPassword' => '旧密码', 'password' => '新密码']);

        $user->password = Hash::make($request->password);
        $user->save();
        return new UserReosurce($user);
    }

    public function uploadAvatar(Request $request)
    {
        app('image')->scale($request->file('file'), 300, 300);
        return app('upload')->run($request->file('file'), 'local');
    }

    public function sendBindCode(Request $request, string $field, User $user)
    {
        $rule = $field == 'email' ? ['required', 'email'] : ['required', 'regex:/^\d{11}$/'];
        $request->validate([
            $field => $rule,
        ], [], ['email' => '邮箱', 'mobile' => "手机"]);
        $user->$field = request($field);

        app('code')->send($user, $field);
        return response()->json(['message' => '验证码已发送，请查收']);
    }

    public function bindEmail(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required', function ($attribute, $value, $fail) use ($request) {
                if ($value != Cache::get('send_code')) {
                    $fail('验证码错误');
                }
            }]
        ], [], ['email' => '邮箱', 'code' => "验证码"]);

        $user = Auth::user();
        $user->email = $request->email;
        $user->save();
        return $this->respondOk('绑定成功');
    }

    public function bindMobile(Request $request)
    {
        $request->validate([
            'mobile' => ['required', 'regex:/^\d{11}$/'],
            'code' => ['required', function ($attribute, $value, $fail) use ($request) {
                if ($value != Cache::get('send_code')) {
                    $fail('验证码错误');
                }
            }]
        ], [], ['mobile' => '手机号', 'code' => "验证码"]);

        $user = Auth::user();
        $user->mobile = $request->mobile;
        $user->save();
        return $this->respondOk('绑定成功');
    }
}
