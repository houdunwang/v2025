<?php

namespace Database\Seeders;

use App\Models\Package;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Package::factory(3)->make()->each(function ($package, $index) {
            $package->icon = url('assets/package/' . ($index + 1) . '.png');
            $package->recommend = $index == 1;
            $package->save();
        });
    }
}
