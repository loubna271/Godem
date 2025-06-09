<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Etablissement extends Model
{

    use HasFactory;

    /**
     * Les champs qui peuvent être remplis massivement.
     *
     * @var array
     */
    
    protected $fillable = [
        'logo_ecole',
        'nom_universite',
        'domaine',
        'ville',
        'type_baccalaureat',
        'type',
        'concours',
        'nbre_annee_etude',
        'concours_desc',
        'description',
        'lien_etablissement',
    ];
}
