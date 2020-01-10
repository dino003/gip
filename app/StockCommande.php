<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class StockCommande extends Model
{
    use UsesTenantConnection;

}
