<?php

namespace Database\Seeders;

use App\Models\Subscribe;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubscribeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $subscribes = Subscribe::factory(10)->make()->each(function ($subscribe, $index) {
        //     $subscribe->user_id = $index + 1;
        //     $subscribe->end_time = now()->addMonth(3);
        //     $subscribe->save();
        // });

        // $subscribes->each(function ($subscribe) {
        //     $subscribe->orders()->create([
        //         'user_id' => $subscribe->user_id,
        //         'sn' => mt_rand(100000, 999999),
        //         'price' => mt_rand(100, 999),
        //         'trade_no' => mt_rand(100000, 999999),
        //         'pay_state' => true,
        //         'pay_type' => 'wechat',
        //         'subject' => '网站订阅',
        //     ]);
        // });
    }
}
