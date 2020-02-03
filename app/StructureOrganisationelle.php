<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StructureOrganisationelle extends Model
{
    protected $table = 'structure_organisationelles';

    protected $guarded = ['id'];

    public $timestamps = false;

       // plans organisationnels

        public function plan_organisationnels()
       {
           return $this->hasMany('App\PlanOrganisationnel', 'structure_organisationnel_id', 'id');
       } 
}
