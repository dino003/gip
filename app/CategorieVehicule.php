<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;


class CategorieVehicule extends Model
{
   // use UsesTenantConnection;
    protected $table = 'parametrage_codifications_categories_vehicules';

    public $timestamps = false;

    protected $guarded = ['id'];

    public function modeles()
    {
        return $this->hasMany(ModeleVehicule::class, 'categorie');
    }

    public function operation_intervention()
    {
        return $this->hasMany(OperationIntervention::class, 'categorie_vehicule', 'id');
    }
}
