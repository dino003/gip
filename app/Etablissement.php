<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Etablissement extends Model
{

   protected $table = 'parametre_generaux_etablissements';

   public $timestamps = false;

   protected $guarded = ['id'];
}
