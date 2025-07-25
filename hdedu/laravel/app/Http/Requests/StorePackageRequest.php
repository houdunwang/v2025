<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePackageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return isAdministrator();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required'],
            'ad' => ['required'],
            'months' => ['required'],
            'price' => ['required'],
            'icon' => ['required']
        ];
    }
    public function attributes()
    {
        return [
            'title' => '套餐名称',
            'ad' => '广告',
            'months' => '有效期',
            'price' => '价格',
            'icon' => '图标'
        ];
    }
}
