<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Theme extends Model
{
    use UsesTenantConnection;

    protected $table = 'themes';

    public $timestamps = false;
 
    protected $guarded = ['id'];
}
