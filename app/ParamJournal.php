<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParamJournal extends Model
{

     protected $table = 'parametres_generaux_journal';

     public $timestamps = false;
  
     protected $guarded = ['id'];
}
