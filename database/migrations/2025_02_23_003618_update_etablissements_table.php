<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('etablissements', function (Blueprint $table) {
            // Modifier la colonne 'domaine' en 'text'
            $table->text('domaine')->change();
            
            // Mettre à jour la colonne 'type' avec les nouvelles valeurs
            $table->enum('type', ['Privée', 'Publique', 'Semi-Publique'])->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('etablissements', function (Blueprint $table) {
            // Revenir à l'ancien type 'domaine' en 'enum' (si nécessaire)
            $table->enum('domaine', [
                'Médecine et Pharmacie','Médecine dentaire', 'Ingénierie (Architecture)', 'Militaire / Aviation', 'Ingénierie', 
                'Santé', 'Sciences et Technologies / Innovation', 'Commerce et Gestion', 
                'Technologie / Ingénierie', 'Préparation aux grandes écoles', 'Enseignement / Recherche', 
                'Sciences et Technologie', 'Communication et Médias', 'Chimie / Ingénierie', 
                'Agriculture / Agronomie', 'Agriculture / Vétérinaire', 'Tourisme'
            ])->change();

            // Revenir aux anciennes valeurs pour la colonne 'type'
            $table->enum('type', ['privé', 'public'])->change();
        });
    }
};
