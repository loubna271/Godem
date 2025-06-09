<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('concours_preparation', function (Blueprint $table) {
            $table->id();
            $table->string('logo_ecole'); // Stocke le chemin du logo
            $table->string('nom_ecole'); // Nom de l'école
            $table->text('domaine'); // Domaine de formation
            $table->year('annee_cncrs'); // Année du concours
            $table->string('lien_pdf'); // Lien du fichier PDF
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('concours_preparation');
    }
};
