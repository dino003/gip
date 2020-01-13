<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alerte extends Model
{

    protected $table = 'parametre_generaux_alertes1';

    public $timestamps = false;
 
    protected $guarded = ['id'];
}
