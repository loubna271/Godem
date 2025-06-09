<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('etablissements', function (Blueprint $table)  {
            $table->text('type_baccalaureat')->change(); // Ou VARCHAR(255) si vous préférez
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('etablissements', function (Blueprint $table)  {
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
