<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanOrganisationnel extends Model
{
    protected $table = 'plan_organisationnels';

    protected $guarded = ['id'];

    public $timestamps = false;
    protected $with = ['vehicules'];


    public function structure_organisationnel()
    {
        return $this->belongsTo('App\StructureOrganisationelle', 'structure_organisationnel_id');
    }

    public function children()
    {
        return $this->hasMany(PlanOrganisationnel::class, 'parent', 'id');
    }


        // vehicules 
        public function vehicules()
        {
            return $this->hasMany(Vehicule::class, 'affectation_organisationnel_id', 'id');
        }
}
