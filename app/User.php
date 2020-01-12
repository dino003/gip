<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Cashier\Billable;
use Hyn\Tenancy\Traits\UsesTenantConnection;



class User extends Authenticatable
{
    use Notifiable, UsesTenantConnection;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    protected $dates = [
        'periode_essai',
        'fin_abonnement'
    ];

    public $timestamps = false;

  

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
         'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function autorisation()
    {
        return $this->hasOne(UserFonction::class, 'user', 'id');
    }

    public function getEndAbonnementDateAttribute(){
        if($this->getFreeTrialDaysLeftAttribute() == null) return null;

        if ($this->fin_abonnement)  return $this->fin_abonnement->format('d/m/Y');

        if ($this->periode_essai)  return $this->periode_essai->format('d/m/Y');
        


    }

    public function getFreeTrialDaysLeftAttribute()
    {
      //  setlocale(LC_TIME, 'fr');

        // on est plus en periode d'évaluation
        if ($this->fin_abonnement) { 
            // si la date d'abonnement est passée
            if( now()->gte($this->fin_abonnement) ) return null;
           // return $this->fin_abonnement->format('d/m/Y');
            return now()->diffInDays($this->fin_abonnement, false); // retourne le nombre de jours

        }

        if(now()->gte($this->periode_essai) ) return null;
        
        return now()->diffInDays($this->periode_essai, false);


    //    $ne = $this->periode_essai->copy()->addDays(10);
    //      //  $ne = $this->periode_essai->copy()->addDays(10);

    //     $diff = now()->diffInDays($ne); 
    //     return $diff;

        /*
            @if (auth()->user()->free_trial_days_left > 0)
                    <li class="nav-item">
                    <a class="nav-link" href="#">Fin évaluation dans {{ auth()->user()->free_trial_days_left }} Jours .</a>
                </li>
                end_abonnement_date
            @endif
        */
        //return now()->diffInDays($this->periode_essai, false);
    }

  
}
