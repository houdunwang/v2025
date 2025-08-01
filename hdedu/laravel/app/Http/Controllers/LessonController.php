<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLessonRequest;
use App\Http\Requests\UpdateLessonRequest;
use App\Http\Resources\LessonResource;
use App\Models\Lesson;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class LessonController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    public function index()
    {
        $lessons = Lesson::when(request('type'), function ($build) {
            $build->where('type', request('type'));
        })->with(['chapters'])
            ->latest()->paginate(request('row', 9));
        return LessonResource::collection($lessons->withPath('?type=' . request('type'))->onEachSide(1));
    }

    public function store(StoreLessonRequest $request, Lesson $lesson)
    {
        Gate::authorize('create', $lesson);
        $lesson->fill($request->input());
        $lesson->save();
        return new LessonResource($lesson);
    }

    public function show(Lesson $lesson)
    {
        $lesson = $lesson->load(['chapters.videos']);
        if (app('lesson')->can($lesson)) {
            $lesson->makeVisible(['download_address']);
        }
        $lesson->isBuy = Auth::check() ? Auth::user()->lessons()->where('lesson_id', $lesson->id)->exists() : false;
        return new LessonResource($lesson);
    }

    public function update(UpdateLessonRequest $request, Lesson $lesson)
    {
        Gate::authorize('update', $lesson);
        $lesson->fill($request->input());
        $lesson->save();
        return new LessonResource($lesson);
    }

    public function destroy(Lesson $lesson)
    {
        Gate::authorize('delete', $lesson);
        $lesson->delete();
        return $this->respondNoContent();
    }
}
