<?php

namespace Database\Seeders;

use App\Models\Chapter;
use App\Models\Lesson;
use App\Models\Video;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Lesson::factory(24)->has(Chapter::factory(6)->hasVideos(10, function (array $attributes, Chapter $chapter) {
            return ["lesson_id" => $chapter->lesson_id];
        }))->create();

        Lesson::limit(12)->each(function ($lesson, $index) {
            $lesson->type = 'system';
            $lesson->preview = url('/assets/images/lesson/system/' . ($index + 1) . '.jpeg');
            $lesson->save();
        });

        Lesson::where('id', '>', 12)->each(function ($lesson, $index) {
            $lesson->type = 'project';
            $lesson->preview = url('/assets/images/lesson/project/' . ($index + 1) . '.jpeg');
            $lesson->save();
        });
    }
}
