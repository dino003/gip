<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParamStock extends Model
{

        protected $table = 'parametre_generaux_stocks';

        public $timestamps = false;
     
        protected $guarded = ['id'];
}
