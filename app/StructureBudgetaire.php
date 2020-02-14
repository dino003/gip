<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StructureBudgetaire extends Model
{
    protected $table = 'structure_budgetaires';

    protected $guarded = ['id'];

    public $timestamps = false;

     // plans geographiques

    public function plan_budgetaires()
    {
        return $this->hasMany('App\PlanBudgetaire', 'structure_budgetaire_id', 'id');
    }
}
