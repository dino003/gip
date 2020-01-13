<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        setlocale(LC_TIME, 'French');

    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function renderReactPage(){
        $admin = User::where('isAdmin', 1)->first();

        if($admin->free_trial_days_left == null) return redirect()->route('welcome');

        $nombre_de_jours_restant = $admin->free_trial_days_left;
        $date_fin_abonnement = $admin->end_abonnement_date;

        
         return view('page', compact('nombre_de_jours_restant', 'date_fin_abonnement'));
    }
}
