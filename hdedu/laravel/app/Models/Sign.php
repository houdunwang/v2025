<?php

namespace App\Models;

use App\Observers\SignObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[ObservedBy([SignObserver::class])]
class Sign extends Model
{
    /** @use HasFactory<\Database\Factories\SignFactory> */
    use HasFactory;
    protected $with = ['user', 'signCount'];

    protected $fillable = ['content', 'mood', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function signCount()
    {
        return $this->hasOne(SignCount::class, 'user_id', 'user_id');
    }
}
