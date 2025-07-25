<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderReosurce;
use App\Models\Order;
use Gate;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class OrderController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: []),
        ];
    }

    public function index()
    {
        Gate::authorize('viewAny', Order::class);
        $orders = Order::when(request('key'), function ($query) {
            $query->OrWhere('sn', 'like', '%' . request('key') . '%');
            $query->OrWhere('trade_no',  'like', '%' . request('key') . '%');
        })->with('user')->paginate(2)->withPath('');
        return OrderReosurce::collection($orders);
    }

    public function store(StoreOrderRequest $request)
    {
        $order = app('order')->create(getModel());
        return new OrderReosurce($order);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}
