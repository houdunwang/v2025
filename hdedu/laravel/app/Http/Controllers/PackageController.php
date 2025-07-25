<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePackageRequest;
use App\Http\Requests\UpdatePackageRequest;
use App\Http\Resources\PackageResource;
use App\Models\Package;
use Gate;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class PackageController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index']),
        ];
    }
    public function index()
    {
        $packages = Package::get();
        return PackageResource::collection($packages);
    }

    public function store(StorePackageRequest $request, Package $package)
    {
        Gate::authorize('create', Package::class);
        $package->fill($request->input())->save();
        return new PackageResource($package);
    }

    public function show(Package $package)
    {
        return new PackageResource($package);
    }

    public function update(UpdatePackageRequest $request, Package $package)
    {
        Gate::authorize('update', $package);
        $package->fill($request->input())->save();
        return new PackageResource($package);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Package $package)
    {
        Gate::authorize('delete', $package);
        $package->delete();
    }
}
