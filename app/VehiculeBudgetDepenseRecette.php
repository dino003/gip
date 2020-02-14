<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VehiculeBudgetDepenseRecette extends Model
{

    protected $table = 'vehicule_budget_depenses_recettes';

    protected $guarded = ['id'];

    public $timestamps = false;
    protected $with = ['plan_budgetaire', 'vehicule'];


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



        // plan budgetaire
        public function plan_budgetaire()
        {
            return $this->belongsTo(PlanBudgetaire::class, 'plan_budgetaire_id');
        }

            // plan budgetaire
            public function annee()
            {
                return $this->belongsTo(AnneeBudgetaire::class, 'annee_budgetaire');
            }


}
