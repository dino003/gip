<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class TauxTva extends Model
{
   // use UsesTenantConnection;

    protected $table = 'parametre_taux_tva';

    protected $guarded = ['id'];

    public $timestamps = false;

}
