<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Config extends Model
{
    /** @use HasFactory<\Database\Factories\ConfigFactory> */
    use HasFactory;

    protected $fillable = ['name', 'data'];

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }
}
