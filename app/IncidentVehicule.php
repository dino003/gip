<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class IncidentVehicule extends Model
{
    protected $table = 'parametrage_incidents_vehicules';

    protected $guarded = ['id'];

    public $timestamps = false;
}
