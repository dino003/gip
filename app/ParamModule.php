<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class ParamModule extends Model
{
       // use UsesTenantConnection;

       protected $table = 'parametre_generaux_modules';

       public $timestamps = false;
    
       protected $guarded = ['id'];
}
