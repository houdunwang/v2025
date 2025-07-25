<?php

namespace App\Models;

use App\Observers\CommentObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

#[ObservedBy([CommentObserver::class])]
class Comment extends Model
{
    /** @use HasFactory<\Database\Factories\CommentFactory> */
    use HasFactory;

    protected $with = ['user', 'replyUser'];

    protected $fillable = ['content', 'comment_id', 'reply_user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function title(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->content
        );
    }

    public function replyUser()
    {
        return $this->belongsTo(User::class, 'reply_user_id');
    }

    public function replys()
    {
        return $this->hasMany(Comment::class, 'comment_id');
    }

    public function commentable()
    {
        return $this->morphTo();
    }

    public function dynamic()
    {
        return $this->morphOne(Dynamic::class, 'dynamicable');
    }
}
