<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MissionCout extends Model
{
     protected $table = 'mission_couts';

     public $timestamps = false;
 
     protected $guarded = ['id'];

     public function mission()
     {
         return $this->belongsTo('App\Mission', 'mission_id');
     }
}
