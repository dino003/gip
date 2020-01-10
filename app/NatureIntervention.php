<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class NatureIntervention extends Model
{
    use UsesTenantConnection;

    protected $table = 'parametrage_nature_interventions';

    public $timestamps = false;

    protected $guarded = ['id'];

    public function operation_intervention()
    {
        return $this->hasMany(OperationIntervention::class, 'nature_intervention', 'id');
    }

    // interventions vehicules
    public function vehicule_interventions()
    {
        return $this->hasMany(VehiculeIntervention::class, 'nature_intervention', 'id');
    }
}
