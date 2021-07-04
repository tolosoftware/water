<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('country');
            $table->unsignedBigInteger('city_id');
            $table->foreign('city_id')->references('id')->on('geolocations');
            $table->string('name');
            $table->string('discription')->nullable();
            $table->string('daynomic_head');
            $table->string('solar_cable');
            $table->string('motor_cable');
            $table->string('pip_length');
            $table->enum('solar_base', ['Manual Tracker', 'Ground Structure']);
            $table->string('daily_output');
            $table->string('daily_output_changed')->nullable();
            $table->string('daily_output_lable')->nullable();
            $table->string('dirt_loss');
            $table->string('solar_watt')->nullable();
            $table->string('latitude')->nullable();
            $table->string('longtitude')->nullable();
            $table->unsignedBigInteger('solar_brand_id');
            $table->foreign('solar_brand_id')->references('id')->on('solar_brands');
            $table->unsignedBigInteger('pump_brand_id');
            $table->foreign('pump_brand_id')->references('id')->on('pump_brands');
            $table->unsignedBigInteger('invertor_brand_id');
            $table->foreign('invertor_brand_id')->references('id')->on('invertor_brands');
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
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
        Schema::dropIfExists('projects');
    }
}
