<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParamReservationOrdreMission extends Model
{


    protected $table = 'parametre_generaux_reservations_ordre_missions';

    public $timestamps = false;
 
    protected $guarded = ['id'];
}
