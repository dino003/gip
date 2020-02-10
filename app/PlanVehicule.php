<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanVehicule extends Model
{
    protected $table = 'plan_vehicules';

    protected $guarded = ['id'];

    public $timestamps = false;

    protected $with = ['vehicules', 'structure_vehicule'];


    public function structure_vehicule()
    {
        return $this->belongsTo('App\StructureVehicule', 'structure_vehicule_id');
    }

        public function children()
        {
            return $this->hasMany(PlanVehicule::class, 'parent', 'id');
        }



        // vehicules
        public function vehicules()
        {
            return $this->hasMany(Vehicule::class, 'plan_vehicule_id', 'id');
        }
}
