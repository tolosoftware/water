<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIrradiationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('irradiations', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('geolocation_id');
            $table->foreign('geolocation_id')->references('id')->on('geolocations')->onDelete('cascade');
            $table->unsignedBigInteger('month_id');
            $table->foreign('month_id')->references('id')->on('months')->onDelete('cascade');
            $table->string('6am');
            $table->string('7am');
            $table->string('8am');
            $table->string('9am');
            $table->string('10am');
            $table->string('11am');
            $table->string('12am');
            $table->string('1pm'); 
            $table->string('2pm');
            $table->string('3pm');
            $table->string('4pm');
            $table->string('5pm');
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
        Schema::dropIfExists('irradiations');
    }
}
