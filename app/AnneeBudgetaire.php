<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class AnneeBudgetaire extends Model
{
    
    protected $table = 'annee_budgetaires';

    protected $guarded = ['id'];

    public $timestamps = false;

    // protected $dates = ['date_debut', 'date_fin', 'date_cloture'];

    // protected $dateFormat = 'd/m/Y';
}
