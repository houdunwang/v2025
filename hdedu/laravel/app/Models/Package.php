<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    /** @use HasFactory<\Database\Factories\PackageFactory> */
    use HasFactory;

    protected $fillable = ['title', 'ad', 'price', 'icon', 'recommend', 'months', 'state'];

    protected function casts(): array
    {
        return [
            'state' => 'integer',
            'recommend' => 'integer',
        ];
    }

    public function orders()
    {
        return $this->morphMany(Order::class, 'orderable');
    }
}
