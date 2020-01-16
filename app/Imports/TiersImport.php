<?php

namespace App\Imports;

use App\Tier;
use Maatwebsite\Excel\Concerns\ToModel;

class TiersImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Tier([
            'code'     => $row[0],
            'nom'    => $row[1],
            'metier_principal' => $row[2],
            'adresse1' => $row[3],
            'code_postal' => $row[4],
            'telephonne' => $row[5],
            'fax' => $row[6],
            'adresse_messagerie' => $row[7],
            'pays' => $row[8],
            'ville' => $row[9],
           

        ]);
    }
}
