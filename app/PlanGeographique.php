<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanGeographique extends Model
{
    protected $table = 'plan_geographiques';

    protected $guarded = ['id'];

    public $timestamps = false;

    public function structure_geographique()
    {
        return $this->belongsTo('App\StructureGeographique', 'structure_geographique_id');
    }

        public function children()
        {
            return $this->hasMany(PlanGeographique::class, 'parent', 'id');
        }

    
}
