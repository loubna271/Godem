<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('etablissements', function (Blueprint $table) {
            $table->id(); // Clé primaire
            $table->string('logo_ecole'); // Stocke le nom de l'image
            $table->text('nom_universite'); // Nom de l’université
            $table->enum('domaine', [
                'Médecine et Pharmacie','Médecine dentaire', 'Ingénierie (Architecture)', 'Militaire / Aviation', 'Ingénierie', 
                'Santé', 'Sciences et Technologies / Innovation', 'Commerce et Gestion', 
                'Technologie / Ingénierie', 'Préparation aux grandes écoles', 'Enseignement / Recherche', 
                'Sciences et Technologie', 'Communication et Médias', 'Chimie / Ingénierie', 
                'Agriculture / Agronomie', 'Agriculture / Vétérinaire', 'Tourisme'
            ]); 
            $table->string('ville'); // Ville
            $table->enum('type_baccalaureat', [
                'Sciences Mathématiques A', 'Sciences Mathématiques B', 'Sciences Physiques', 'SVT', 
                'Sciences de l Ingénieur', 'Sciences et Technologies Mécaniques ou Électriques', 
                'Bac Lettres', 'Bac Technique de Gestion et Comptabilité', 'Sciences Humaines', 
                'Bac Sciences Économiques', 'Bac Sciences Agronomiques', 'Sciences de la Chariaa', 
                'Arts Appliqués'
            ]); 
            $table->enum('type', ['privé', 'public']); // Type d’établissement
            $table->enum('concours', ['oui', 'non']); // Y a-t-il un concours ?
            $table->integer('nbre_annee_etude'); // Nombre d’années d’études
            $table->text('concours_desc')->nullable(); // Description du concours
            $table->text('description')->nullable();
            $table->string('lien_etablissement')->nullable(); // Lien vers l’établissement
            $table->timestamps(); // created_at et updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('etablissements');
    }
};
