<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NatureSinistre extends Model
{

    protected $table = 'parametrage_nature_sinistres';

    protected $guarded = ['id'];

    public $timestamps = false;
}
