<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class NatureEnergie extends Model
{
    use UsesTenantConnection;
    protected $table = 'parametrage_nature_energies';

    public $timestamps = false;

    protected $guarded = ['id'];
}
