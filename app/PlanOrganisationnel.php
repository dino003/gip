<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanOrganisationnel extends Model
{
    protected $table = 'plan_organisationnels';

    protected $guarded = ['id'];

    public $timestamps = false;

    public function structure_organisationnel()
    {
        return $this->belongsTo('App\StructureOrganisationelle', 'structure_organisationnel_id');
    }

    public function children()
    {
        return $this->hasMany(PlanOrganisationnel::class, 'parent', 'id');
    }
}
