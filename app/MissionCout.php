<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class MissionCout extends Model
{
      use UsesTenantConnection;
     protected $table = 'mission_couts';

     public $timestamps = false;
 
     protected $guarded = ['id'];

     public function mission()
     {
         return $this->belongsTo('App\Mission', 'mission_id');
     }
}
