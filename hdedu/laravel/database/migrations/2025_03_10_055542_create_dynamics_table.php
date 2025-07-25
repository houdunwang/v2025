<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dynamics', function (Blueprint $table) {
            $table->id();
            $table->morphs('dynamicable');
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete()->comment('用户ID');
            $table->json('properties')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dynamics');
    }
};
