<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePumpListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pump_lists', function (Blueprint $table) {
            $table->id();
            $table->integer('serial_no');
            $table->unsignedBigInteger('pump_brand_id');
            $table->foreign('pump_brand_id')->references('id')->on('pump_brands')->onDelete('cascade');
            $table->string('model');
            $table->decimal('outlet');
            $table->decimal('Ampeier');
            $table->decimal('diameter');
            $table->decimal('power');
            $table->string('discription');
            $table->string('image');
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
        Schema::dropIfExists('pump_lists');
    }
}
