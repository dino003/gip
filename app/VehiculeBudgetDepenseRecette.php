<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class VehiculeBudgetDepenseRecette extends Model
{
    use UsesTenantConnection;

    protected $table = 'vehicule_budget_depenses_recettes';

    protected $guarded = ['id'];

    public $timestamps = false;

    
     //  vehicule
     public function vehicule()
     {
         return $this->belongsTo(Vehicule::class, 'vehicule');
     }

     // nature_ligne_budget
     public function nature_ligne_budget()
     {
         return $this->belongsTo(DepenseRecette::class, 'nature_ligne_budget');
     }


}
