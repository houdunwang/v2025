<?php

namespace Database\Seeders;

use App\Models\Learn;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LearnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Learn::factory(10)->make()->each(function ($learn, $index) {
            $learn->user_id = $index + 1;
            $learn->lesson_id = $index + 1;
            $learn->chapter_id = $index + 1;
            $learn->video_id = $index + 1;
            $learn->save();
        });
    }
}
