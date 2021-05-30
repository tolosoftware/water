<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserBrandRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_brand_roles', function (Blueprint $table) {
            $table->id();
            $table->enum('checked',['false', 'true'])->default('false');
            $table->unsignedBigInteger('pump_id')->nullable();
            $table->foreign('pump_id')->references('id')->on('pump_brands')->onDelete('cascade');
            $table->unsignedBigInteger('solar_id')->nullable();
            $table->foreign('solar_id')->references('id')->on('solar_brands')->onDelete('cascade');
            $table->unsignedBigInteger('invertor_id')->nullable();
            $table->foreign('invertor_id')->references('id')->on('invertor_brands')->onDelete('cascade');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_brand_roles');
    }
}
