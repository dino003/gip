<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IncidentVehicule extends Model
{
    protected $table = 'parametrage_incidents_vehicules';

    protected $guarded = ['id'];

    public $timestamps = false;
}
