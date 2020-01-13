<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Taxe extends Model
{

    protected $table = 'parametrage_taxes';
    protected $guarded = ['id'];

    public $timestamps = false;
}
