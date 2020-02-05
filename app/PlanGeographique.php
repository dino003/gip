<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanGeographique extends Model
{
    protected $table = 'plan_geographiques';

    protected $guarded = ['id'];
    
    public $timestamps = false;
    protected $with = ['vehicules', 'structure_geographique'];

    public function structure_geographique()
    {
        return $this->belongsTo('App\StructureGeographique', 'structure_geographique_id');
    }

        public function children()
        {
            return $this->hasMany(PlanGeographique::class, 'parent', 'id');
        }

        // amendes lieu
        public function amendes()
        {
            return $this->hasMany(VehiculeAmende::class, 'lieu_id', 'id');
        }

        // vehicules 
        public function vehicules()
        {
            return $this->hasMany(Vehicule::class, 'affectation_geographique_id', 'id');
        }

    
}
