<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StructureVehicule extends Model
{
    protected $table = 'structure_vehicules';

    protected $guarded = ['id'];

    public $timestamps = false;

     // plans geographiques

    public function plan_vehicules()
    {
        return $this->hasMany('App\PlanVehicule', 'structure_vehicule_id', 'id');
    }
}
