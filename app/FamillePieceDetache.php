<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class FamillePieceDetache extends Model
{
    protected $table = 'parametrage_famille_pieces_detaches';

    protected $guarded = ['id'];

    public $timestamps = false;
}
