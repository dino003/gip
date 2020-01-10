<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class ParamStock extends Model
{
         use UsesTenantConnection;

        protected $table = 'parametre_generaux_stocks';

        public $timestamps = false;
     
        protected $guarded = ['id'];
}
