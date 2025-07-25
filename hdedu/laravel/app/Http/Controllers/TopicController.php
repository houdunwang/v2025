<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTopicRequest;
use App\Http\Requests\UpdateTopicRequest;
use App\Http\Resources\TopicReosurce;
use App\Models\Topic;
use Gate;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class TopicController extends Controller
{
    public function index()
    {
        $topics = Topic::when(request('uid'), function (Builder $builder) {
            $builder->where('user_id', request('uid'));
        })->paginate(10);
        return TopicReosurce::collection($topics->withPath(''));
    }

    public function store(StoreTopicRequest $request, Topic $topic)
    {
        $topic->fill($request->input());
        $topic->user_id = Auth::id();
        $topic->save();
        return new TopicReosurce($topic);
    }

    public function show(Topic $topic)
    {
        return new TopicReosurce($topic);
    }

    public function update(UpdateTopicRequest $request, Topic $topic)
    {
        Gate::authorize('update', $topic);
        $topic->fill($request->input());
        $topic->save();
        return new TopicReosurce($topic);
    }


    public function destroy(Topic $topic)
    {
        Gate::authorize('delete', $topic);
        $topic->delete();
        return response()->noContent();
    }
}
