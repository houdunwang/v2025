<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dynamic extends Model
{
    /** @use HasFactory<\Database\Factories\DynamicFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'properties' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function dynamicable()
    {
        return $this->morphTo();
    }
}
