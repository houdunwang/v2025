<?php

namespace App\Services;

use App\Models\Dynamic;
use Illuminate\Database\Eloquent\Model;

class DynamicService
{
    public function add(Model $model, array | null $properties = null)
    {
        $dynamic = new Dynamic();
        $dynamic->user_id = $model->user_id;
        $dynamic->dynamicable_type = get_class($model);
        $dynamic->dynamicable_id = $model->id;
        $dynamic->properties = $properties ?? [
            "model" => (new \ReflectionClass($model))->getShortName(),
            'model_id' => $model->id
        ];
        $dynamic->save();
    }
}
