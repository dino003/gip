<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{

    protected $table = 'themes';

    public $timestamps = false;
 
    protected $guarded = ['id'];
}
