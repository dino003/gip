<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class ParamReservationOrdreMission extends Model
{

        use UsesTenantConnection;

    protected $table = 'parametre_generaux_reservations_ordre_missions';

    public $timestamps = false;
 
    protected $guarded = ['id'];
}
