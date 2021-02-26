<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessoriesListsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accessories_lists', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('accessories_type_id');
            $table->foreign('accessories_type_id')->references('id')->on('accessories_types')->onDelete('cascade');
            $table->string('name');
            $table->string('model');
            $table->string('country');
            $table->decimal('price');
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
        Schema::dropIfExists('accessories_lists');
    }
}
