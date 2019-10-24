<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Taxe extends Model
{
    use UsesTenantConnection;

    protected $table = 'parametrage_taxes';
    protected $guarded = ['id'];

    public $timestamps = false;
}
