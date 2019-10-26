<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class NatureSinistre extends Model
{
  //  use UsesTenantConnection;

    protected $table = 'parametrage_nature_sinistres';

    protected $guarded = ['id'];

    public $timestamps = false;
}
