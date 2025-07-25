<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    /** @use HasFactory<\Database\Factories\LessonFactory> */
    use HasFactory;

    protected $fillable = [
        "title",
        'preview',
        'price',
        'description',
        'download_address',
    ];

    protected $hidden = ['download_address'];

    public function chapters()
    {
        return $this->hasMany(Chapter::class)->orderBy('order', 'asc');
    }

    public function videos()
    {
        return $this->hasMany(Video::class)->orderBy('order', 'asc');
    }

    public function orders()
    {
        return $this->morphMany(Order::class, 'orderable');
    }
}
