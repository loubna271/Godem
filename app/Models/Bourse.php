<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Bourse extends Model
{
    protected $fillable = ['nom', 'logo', 'description', 'lien'];

}
