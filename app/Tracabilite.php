<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tracabilite extends Model
{

    protected $table = 'tracabilites';

    protected $guarded = ['id'];

    public $timestamps = false;

    public function vehicule()
    {
        return $this->belongsTo('App\Vehicule', 'vehicule_id');
    }

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }

    
}
