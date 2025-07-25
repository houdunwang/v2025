<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'regex:/^[a-z]\w{3,20}$/i', 'unique:users,name'],
            'password' => ['required', 'string', 'confirmed', 'between:6,20'],
            'password_confirmation' => ['required', 'between:6,20']
        ];
    }

    public function messages()
    {
        return ['name.regex' => '请输入以字母开始的4-20位字符'];
    }
    public function attributes()
    {
        return ['name' => '用户名'];
    }
}
