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
        'periode_essai'
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

    public function getFreeTrialDaysLeftAttribute()
    {
        // Future field that will be implemented after payments
        if ($this->plan_until) { 
            return 0;
        }

        return now()->diffInDays($this->periode_essai, false);
    }

  
}
