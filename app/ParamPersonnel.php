<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class ParamPersonnel extends Model
{
      // use UsesTenantConnection;

      protected $table = 'parametre_generaux_personnels';

      public $timestamps = false;
   
      protected $guarded = ['id'];
}
