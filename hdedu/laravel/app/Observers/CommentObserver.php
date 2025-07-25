<?php

namespace App\Observers;

use App\Models\Comment;
use App\Models\Dynamic;
use App\Notifications\CommentNotification;
use ReflectionClass;

class CommentObserver
{
    public function created(Comment $comment): void
    {
        app('dynamic')->add($comment, [
            "model" => (new \ReflectionClass($comment->commentable))->getShortName(),
            'model_id' => $comment->commentable->id
        ]);
        if ($comment->commentable->user) {
            $comment->commentable->user->notify(new CommentNotification($comment));
        }
    }

    /**
     * Handle the Comment "updated" event.
     */
    public function updated(Comment $comment): void {}

    /**
     * Handle the Comment "deleted" event.
     */
    public function deleted(Comment $comment): void
    {
        $comment->replys()->delete();
        $comment->dynamic->delete();
    }

    /**
     * Handle the Comment "restored" event.
     */
    public function restored(Comment $comment): void
    {
        //
    }

    /**
     * Handle the Comment "force deleted" event.
     */
    public function forceDeleted(Comment $comment): void
    {
        //
    }
}
