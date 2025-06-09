<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConcoursPrep extends Model
{
    use HasFactory;

    protected $table = 'concours_preparation'; // Nom de la table

    protected $fillable = [
        'logo_ecole',
        'nom_ecole',
        'domaine',
        'annee_cncrs',
        'lien_pdf'
    ];
}
