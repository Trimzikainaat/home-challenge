<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserPreferencesTable extends Migration
{
    public function up()
    {
        Schema::create('user_preferences', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->unique();
            $table->string('keywords')->nullable();
            $table->date('from')->nullable();
            $table->json('categories')->nullable();
            $table->json('sources')->nullable();
            $table->timestamps();
        });

        Schema::table('user_preferences', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down()
    {
        Schema::dropIfExists('user_preferences');
    }
}
