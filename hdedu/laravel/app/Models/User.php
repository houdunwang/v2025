<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'weibo',
        'github',
        'qq',
        'home',
        'nickname',
        'avatar',
        'mobile',
        'openid'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'unionid',
        'openid',
        'email',
        'mobile',
        'real_name'
    ];

    protected $appends = [
        'is_administrator'
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected function isAdministrator(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->id == 1,
        );
    }

    public function topics()
    {
        return $this->hasMany(Topic::class);
    }

    public function signs()
    {
        return $this->hasMany(Sign::class);
    }

    public function learns()
    {
        return $this->belongsToMany(Video::class);
    }

    public function subscribe()
    {
        return $this->hasOne(Subscribe::class);
    }

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class, 'lesson_subscribes');
    }
}
