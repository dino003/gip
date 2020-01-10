<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;


class FamillePieceDetache extends Model
{
    use UsesTenantConnection;
    protected $table = 'parametrage_famille_pieces_detaches';

    protected $guarded = ['id'];

    public $timestamps = false;
}
