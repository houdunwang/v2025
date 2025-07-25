<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Learn extends Model
{
    /** @use HasFactory<\Database\Factories\LearnFactory> */
    use HasFactory;
    protected $fillable = ['video_id', 'lesson_id', 'chapter_id', 'user_id'];
    protected $with = ['video.chapter', 'user'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function video()
    {
        return $this->belongsTo(Video::class);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }
}
