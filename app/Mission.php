<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Hyn\Tenancy\Traits\UsesTenantConnection;

class Mission extends Model
{
     use UsesTenantConnection;
    protected $table = 'missions';

    public $timestamps = false;

    protected $guarded = ['id'];

    public function mission_couts()
    {
        return $this->hasOne('App\MissionCout', 'mission_id', 'id');
    }

    public function demandeur()
    {
        return $this->belongsTo('App\Personnel', 'demandeur_id');
    }

    public function vehicule()
    {
        return $this->belongsTo('App\Vehicule', 'vehicule_id');
    }

    public function nature_mission()
    {
        return $this->belongsTo('App\NatureReservationUtilisation', 'nature_mission_id');
    }

    public function decideur()
    {
        return $this->belongsTo('App\Personnel', 'decideur_id');
    }

    public function signataire()
    {
        return $this->belongsTo('App\Personnel', 'signataire_id');
    }

    public function beneficiaire_principal()
    {
        return $this->belongsTo('App\Personnel', 'beneficiaire_principal_id');
    }

    public function beneficiaire1()
    {
        return $this->belongsTo('App\Personnel', 'beneficiaire1_id');
    }

    public function beneficiaire2()
    {
        return $this->belongsTo('App\Personnel', 'beneficiaire2_id');
    }

    public function beneficiaire3()
    {
        return $this->belongsTo('App\Personnel', 'beneficiaire3_id');
    }

    public function beneficiaire4()
    {
        return $this->belongsTo('App\Personnel', 'beneficiaire4_id');
    }

    public function beneficiaire5()
    {
        return $this->belongsTo('App\Personnel', 'beneficiaire5_id');
    }

    public function beneficiaire6()
    {
        return $this->belongsTo('App\Personnel', 'beneficiaire6_id');
    }

    public function beneficiaire7()
    {
        return $this->belongsTo('App\Personnel', 'beneficiaire7_id');
    }

    public function beneficiaire8()
    {
        return $this->belongsTo('App\Personnel', 'beneficiaire8_id');
    }

    public function tier_prenant_en_charge()
    {
        return $this->belongsTo('App\Tier', 'tiers_prenant_en_charge_id');
    }

    
}
