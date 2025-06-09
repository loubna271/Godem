<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ConcoursAnnonce extends Model
{
    protected $table = 'concoursannonce';
    protected $fillable = ['logo', 'nom', 'date', 'lieu','lien'];
}
