<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chapter>
 */
class ChapterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "title" => fake()->sentence(),
            "preview" => ('/assets/images/chapter/' . mt_rand(1, 12) . '.jpeg'),
            'description' => fake()->sentence(),
            'lesson_id' => 1
        ];
    }
}
