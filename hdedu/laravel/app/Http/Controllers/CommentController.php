<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Http\Resources\CommentReosurce;
use App\Models\Comment;
use Gate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function index(Request $request)
    {
        $model = getModel();
        return CommentReosurce::collection(
            $model->comments()->whereNull('comment_id')->with(['replys'])->get()
        );
    }

    public function store(StoreCommentRequest $request, Comment $comment)
    {
        $comment->user_id = Auth::id();
        $comment->fill($request->input());
        $model = getModel();
        $model->comments()->save($comment);
        return new CommentReosurce($comment);
    }

    public function destroy(Comment $comment)
    {
        Gate::authorize('delete', $comment);
        $comment->delete();
        return response()->noContent();
    }
}
