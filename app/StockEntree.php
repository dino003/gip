<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class StockEntree extends Model
{
    use UsesTenantConnection;

}
