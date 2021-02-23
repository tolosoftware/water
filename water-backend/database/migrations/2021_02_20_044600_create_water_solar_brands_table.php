<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWaterSolarBrandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('water_solar_brands', function (Blueprint $table) {
            $table->id();
            $table->string('brand', 100);
            $table->string('country', 100);
            $table->string('image', 250);
            $table->enum('type', ['water pump', 'solar panel']);
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
        Schema::dropIfExists('water_solar_brands');
    }
}
