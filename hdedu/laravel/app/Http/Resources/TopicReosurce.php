<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Parsedown;

class TopicReosurce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $Parsedown = new Parsedown();
        return [
            ...parent::toArray($request),
            "html" => $Parsedown->text($this->content)
        ];
    }
}
