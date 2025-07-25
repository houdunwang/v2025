<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SignCount extends Model
{
    /** @use HasFactory<\Database\Factories\SignCountFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'year', 'month', 'total'];
}
