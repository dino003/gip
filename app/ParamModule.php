<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParamModule extends Model
{

       protected $table = 'parametre_generaux_modules';

       public $timestamps = false;
    
       protected $guarded = ['id'];
}
