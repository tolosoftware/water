<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvertorListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invertor_lists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('invertor_brand_id');
            $table->foreign('invertor_brand_id')->references('id')->on('invertor_brands')->onDelete('cascade');
            $table->string('model');
            $table->decimal('power');
            $table->decimal('voltage_ac');
            $table->decimal('voltage_dc_min');
            $table->decimal('voltage_dc_max');
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
        Schema::dropIfExists('invertor_lists');
    }
}
