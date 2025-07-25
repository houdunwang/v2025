<?php

namespace Database\Seeders;

use App\Models\Topic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(20)
            ->hasSigns(1)
            ->has(Topic::factory(1)->hasComments(1, function ($attributes, Topic $topic) {
                return [
                    'user_id' => $topic->user_id,
                ];
            }))->create();
        $user = User::find(1);
        $user->name = 'admin';
        $user->email = '2300071698@qq.com';
        $user->save();
        $user = User::find(2);
        $user->name = 'hd';
        $user->save();
    }
}
