<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreVideoRequest;
use App\Http\Requests\UpdateVideoRequest;
use App\Http\Resources\VideoResource;
use App\Models\Chapter;
use App\Models\Comment;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class VideoController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index']),
        ];
    }

    public function index()
    {
        $videos = Video::latest()->paginate(10);
        return VideoResource::collection($videos->withPath('')->onEachSide(1));
    }

    public function store(StoreVideoRequest $request, Video $video)
    {
        Gate::authorize('create', Video::class);
        $video = $video->fill($request->input());
        return new VideoResource($video);
    }

    public function show(Video $video)
    {
        app('learn')->record($video);
        $video = $video->load(['chapter.videos', 'lesson.chapters']);
        if (app('lesson')->can($video->lesson)) {
            $video->lesson->makeVisible(['download_address']);
            $video->makeVisible(['path']);
            // $video->path = app('oss')->cdnSign($video->path);
        }
        return new VideoResource($video);
    }

    public function update(UpdateVideoRequest $request, Video $video)
    {
        Gate::authorize('update', Video::class);
    }

    public function destroy(Video $video) {}

    public function order(Request $request)
    {
        $data = $request->input('data');
        collect($data)->each(function ($item, $index) {
            Video::where('id', $item['id'])->update(['order' => $index]);
        });
        return $this->respondOk('排序成功');
    }

    public function upload(Request $request, Chapter $chapter, Video $video)
    {
        $file = $request->file('file');
        $data = app('upload')->run($file, 'oss');
        $video->title = $data['name'];
        $video->path = $data['url'];
        $video->order = $chapter->videos()->count();
        $video->lesson_id = $chapter->lesson_id;
        $chapter->videos()->save($video);
        return new VideoResource($video->refresh());
    }
}
