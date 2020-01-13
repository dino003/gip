<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class OperationIntervention extends Model
{

    protected $table = 'parametrage_operations_interventions';

    protected $guarded = ['id'];

    public $timestamps = false;

    public function nature_intervention()
    {
        return $this->belongsTo(NatureIntervention::class, 'nature_intervention');
    }

    public function categorie_vehicule()
    {
        return $this->belongsTo(CategorieVehicule::class, 'categorie_vehicule');
    }
}
