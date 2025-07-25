<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->comment('标题');
            $table->string('ad', 100)->comment('一句广告语');
            $table->unsignedSmallInteger('months')->comment('会员月数');
            $table->boolean('state')->default(true)->comment('开启态');
            $table->decimal('price')->comment('价格');
            $table->string('icon')->comment('图片');
            $table->boolean('recommend')->default(false)->comment('推荐');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('packages');
    }
};
