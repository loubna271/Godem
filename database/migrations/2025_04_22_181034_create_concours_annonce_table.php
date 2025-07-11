<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('concoursAnnonce', function (Blueprint $table) {
        $table->id();
        $table->string('logo');
        $table->string('nom');
        $table->date('date');
        $table->string('lieu');
        $table->string('lien');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('concoursAnnonce');
    }
};
