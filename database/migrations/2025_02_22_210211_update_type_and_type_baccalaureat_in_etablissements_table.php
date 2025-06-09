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
            // Modification de la colonne 'type' pour ajouter 'semi-public'
            $table->enum('type', ['privé', 'public', 'semi-public'])->change();

            // S'assurer que 'type_baccalaureat' reste de type text
            $table->text('type_baccalaureat')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('etablissements', function (Blueprint $table) {
            // Revenir à l'état précédent de la colonne 'type'
            $table->enum('type', ['privé', 'public'])->change();

            // Revenir à l'énumération précédente pour 'type_baccalaureat' si nécessaire
            $table->enum('type_baccalaureat', [
                'Sciences Mathématiques A', 'Sciences Mathématiques B', 'Sciences Physiques', 'SVT', 
                'Sciences de l Ingénieur', 'Sciences et Technologies Mécaniques ou Électriques', 
                'Bac Lettres', 'Bac Technique de Gestion et Comptabilité', 'Sciences Humaines', 
                'Bac Sciences Économiques', 'Bac Sciences Agronomiques', 'Sciences de la Chariaa', 
                'Arts Appliqués'
            ])->change();
        });
    }
};
