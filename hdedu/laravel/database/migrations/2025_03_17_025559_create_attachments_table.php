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
        Schema::create('attachments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('url', 255)->comment('链接地址');
            $table->string('name')->comment('原文件名');
            $table->string('extension')->comment('扩展名');
            $table->unsignedInteger('size')->comment('文件大小');
            $table->char('driver', 32)->default('local')->comment('驱动');
            $table->char('mime', 30)->nullable()->comment('mime类型');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attachments');
    }
};
