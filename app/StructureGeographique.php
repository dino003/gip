<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StructureGeographique extends Model
{
    protected $table = 'structure_geographiques';

    protected $guarded = ['id'];

    public $timestamps = false;

     // plans geographiques

    public function plan_geographiques()
    {
        return $this->hasMany('App\PlanGeographique', 'structure_geographique_id', 'id');
    } 

}
