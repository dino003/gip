<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;


class AnneeBudgetaire extends Model
{
   // use UsesTenantConnection;
    
    protected $table = 'annee_budgetaires';

    protected $guarded = ['id'];

    public $timestamps = false;

    // protected $dates = ['date_debut', 'date_fin', 'date_cloture'];

    // protected $dateFormat = 'd/m/Y';
}
