<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Hyn\Tenancy\Traits\UsesTenantConnection;

class Alerte extends Model
{

        use UsesTenantConnection;

    protected $table = 'parametre_generaux_alertes1';

    public $timestamps = false;
 
    protected $guarded = ['id'];
}
