<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    /** @use HasFactory<\Database\Factories\ChapterFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'preview',
        'description',
        'lesson_id'
    ];

    public function videos()
    {
        return $this->hasMany(Video::class)->orderBy('order', 'asc');
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}
