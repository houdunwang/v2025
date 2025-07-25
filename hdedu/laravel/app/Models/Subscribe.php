<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscribe extends Model
{
    /** @use HasFactory<\Database\Factories\SubscribeFactory> */
    use HasFactory;
    protected $fillable = ['end_time', 'user_id'];

    protected function casts(): array
    {
        return [
            'end_time' => 'datetime',
        ];
    }
    public function orders()
    {
        return $this->morphMany(Order::class, 'orderable');
    }
}
