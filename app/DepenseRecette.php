<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DepenseRecette extends Model
{
    protected $table = 'parametrage_natures_depenses_recettes';

    protected $guarded = ['id'];

    public $timestamps = false;

    // budgets vehicule

    public function budgets_vehicules()
    {
        return $this->hasMany(VehiculeBudgetDepenseRecette::class, 'nature_ligne_budget', 'id');
    }

    // budget entite

    public function budgets_entites()
    {
        return $this->hasMany(BudgetEntite::class, 'nature_ligne_budget', 'id');
    }


}
