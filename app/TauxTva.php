<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TauxTva extends Model
{

    protected $table = 'parametre_taux_tva';

    protected $guarded = ['id'];

    public $timestamps = false;

}
