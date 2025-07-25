<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDynamicRequest;
use App\Http\Requests\UpdateDynamicRequest;
use App\Http\Resources\DynamicReosurce;
use App\Models\Dynamic;

class DynamicController extends Controller
{
    public function index()
    {
        $dynamics = Dynamic::with(['user'])->paginate(15)->withPath('');
        return DynamicReosurce::collection($dynamics);
    }

    public function store(StoreDynamicRequest $request) {}

    public function show(Dynamic $dynamic) {}

    public function update(UpdateDynamicRequest $request, Dynamic $dynamic) {}
}
