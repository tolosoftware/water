<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConfigSolarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config_solars', function (Blueprint $table) {
            $table->id();
            $table->Integer('min_power')->nullable();
            $table->Integer('max_power')->nullable();
            $table->enum('base', ['Manual Tracker', 'Ground Structure', 'Ground Mounting'])->nullable();
            $table->Integer('solar_quantity')->nullable();
            $table->Integer('panal_quantity')->nullable();
            $table->unsignedBigInteger('solar_list_id')->nullable();
            $table->foreign('solar_list_id')->references('id')->on('solar_lists')->onDelete('cascade');
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
        Schema::dropIfExists('config_solars');
    }
}
