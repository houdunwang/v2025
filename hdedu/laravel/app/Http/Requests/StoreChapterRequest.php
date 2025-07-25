<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreChapterRequest extends FormRequest
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
            'title' => ['required'],
            'lesson_id' => ['required'],
            'preview' => ['required'],
            'description' => ['required'],
        ];
    }

    public function attributes()
    {
        return [
            'title' => '章节标题',
            'lesson_id' => '课程ID',
            'preview' => '章节缩略图',
            'description' => '章节介绍',
        ];
    }
}
