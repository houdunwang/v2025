<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreChapterRequest;
use App\Http\Requests\UpdateChapterRequest;
use App\Http\Resources\ChapterResource;
use App\Models\Chapter;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class ChapterController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
        ];
    }

    public function index()
    {
        return ChapterResource::collection(Chapter::paginate(8)->withPath('')->onEachSide(1));
    }

    public function store(StoreChapterRequest $request, Chapter $chapter)
    {
        Gate::authorize('create', Chapter::class);
        $chapter->fill($request->input());
        $chapter->save();
        return new ChapterResource($chapter);
    }

    public function show(Chapter $chapter)
    {
        $chapter = $chapter->load(['lesson', 'videos']);
        if (app('lesson')->can($chapter->lesson)) {
            $chapter->lesson->makeVisible(['download_address']);
        }
        return new ChapterResource($chapter);
    }

    public function update(UpdateChapterRequest $request, Chapter $chapter)
    {
        Gate::authorize('update', $chapter);
        $chapter->fill($request->input());
        $chapter->save();
        return new ChapterResource($chapter);
    }

    public function destroy(Chapter $chapter)
    {
        Gate::authorize('delete', $chapter);
        $chapter->delete();
        return response()->noContent();
    }

    public function sort(Request $request)
    {
        $data = $request->input('data');
        collect($data)->each(function ($item, $index) {
            Chapter::where('id', $item['id'])->update(['order' => $index]);
        });
        return $this->respondOk('排序成功');
    }
}
