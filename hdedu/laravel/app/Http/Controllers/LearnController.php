<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLearnRequest;
use App\Http\Requests\UpdateLearnRequest;
use App\Http\Resources\LearnReosurce;
use App\Models\Learn;

class LearnController extends Controller
{
    public function index()
    {
        $learns = Learn::paginate(12);
        return LearnReosurce::collection($learns);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLearnRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Learn $learn)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Learn $learn)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLearnRequest $request, Learn $learn)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Learn $learn)
    {
        //
    }
}
