<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParamPersonnel extends Model
{

      protected $table = 'parametre_generaux_personnels';

      public $timestamps = false;
   
      protected $guarded = ['id'];
}
