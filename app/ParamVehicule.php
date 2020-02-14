<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParamVehicule extends Model
{
    protected $table = 'parametre_generaux_vehicules';

    public $timestamps = false;

    protected $guarded = ['id'];
}
