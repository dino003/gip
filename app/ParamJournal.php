<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class ParamJournal extends Model
{
      use UsesTenantConnection;

     protected $table = 'parametres_generaux_journal';

     public $timestamps = false;
  
     protected $guarded = ['id'];
}
