<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;


class BudgetEntite extends Model
{
   // use UsesTenantConnection;

    protected $table = 'budgets_entites';

    protected $guarded = ['id'];

    public $timestamps = false;


        //  entite
        public function entite()
        {
            return $this->belongsTo(Entite::class, 'entite');
        }

        //nature_ligne_budget
        public function nature_ligne_budget()
        {
            return $this->belongsTo(DepenseRecette::class, 'nature_ligne_budget');
        }
}
