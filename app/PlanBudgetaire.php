<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PlanBudgetaire extends Model
{
    protected $table = 'plan_budgetaires';

    protected $guarded = ['id'];

    public $timestamps = false;

   // protected $with = ['budget'];


    public function structure_budgetaire()
    {
        return $this->belongsTo('App\StructureBudgetaire', 'structure_budgetaire_id');
    }

        public function children()
        {
            return $this->hasMany(PlanBudgetaire::class, 'parent', 'id');
        }

     // budget
     public function budget()
     {
         return $this->hasMany(VehiculeBudgetDepenseRecette::class, 'plan_budgetaire_id', 'id');
     }

     // consommations
     public function consommations()
     {
         return $this->hasMany(VehiculeConsomation::class, 'plan_budgetaire_id', 'id');
     }

          // amendes
          public function amendes()
          {
              return $this->hasMany(VehiculeAmende::class, 'plan_budgetaire_id', 'id');
          }

          // interventions
          public function interventions()
          {
              return $this->hasMany(VehiculeIntervention::class, 'plan_budgetaire_id', 'id');
          }



}
