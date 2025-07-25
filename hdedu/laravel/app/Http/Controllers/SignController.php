<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSignRequest;
use App\Http\Requests\UpdateSignRequest;
use App\Http\Resources\SignReosurce;
use App\Models\Sign;
use App\Models\User;
use Auth;
use Gate;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class SignController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    public function index()
    {
        $signs = Sign::whereDate('created_at', now())->get();
        return SignReosurce::collection($signs);
    }

    public function userSignList(User $user)
    {
        return SignReosurce::collection($user->signs()->paginate(10));
    }

    public function store(StoreSignRequest $request, Sign $sign)
    {
        Gate::authorize('create', Sign::class);
        $sign->fill($request->input());
        $sign->user_id = Auth::id();
        $sign->save();
        return new SignReosurce($sign);
    }

    public function destroy(Sign $sign)
    {
        Gate::authorize('delete', $sign);
        $sign->delete();
        return $this->respondNoContent();
    }
}
