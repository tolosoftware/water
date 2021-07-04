<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('compnayname');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('email')->unique();
            $table->string('phone');
            $table->string('website');
            $table->enum('estimated_cost', ['true', 'false'])->default('true');
            $table->enum('status', ['pending', 'active', 'inactive']);
            $table->enum('belongto', ['Rana Solar', 'Dorokhshan Solar'])->default('Rana Solar');
            $table->integer('expiration');
            $table->string('userimage');
            $table->unsignedBigInteger('geolocation_id');
            $table->foreign('geolocation_id')->references('id')->on('geolocations')->onDelete('cascade');
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
        Schema::dropIfExists('users');
    }
}
