<?php

namespace App\Http\Controllers;

use App\VehiculeUtilisation;
use Illuminate\Http\Request;
use App\Repositories\Repository;
use App\Vehicule;

class VehiculeUtilisationController extends Controller
{
    protected $model;

    public function __construct(VehiculeUtilisation $vehiculeUtilisation){
        $this->model = new Repository($vehiculeUtilisation);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       // return $this->model->all();
       $utilisations_par_vehicules = VehiculeUtilisation::with(['vehicule',
                                                         'nature_utilisation', 'chauffeur'])
                                                         ->with('utilisateur.entite_affectation')
                                                         ->orderBy('date_debut_utilisation', 'desc')
                                                        ->get();

       return response()->json($utilisations_par_vehicules);
       
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        // return $this->model->create($request->only($this->model->getModel()->fillable));

         $utilisation = new VehiculeUtilisation;
         $creation = $utilisation->create($request->only($utilisation->fillable));

         $vehicule = Vehicule::find($creation->vehicule);

        $vehicule->kilometrage_acquisition = $creation->kilometrage_compteur_retour;

        $vehicule->save();
  
         return response()->json(VehiculeUtilisation::with(['vehicule',
         'nature_utilisation', 'chauffeur'])
         ->with('utilisateur.entite_affectation')->find($creation->id));

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->model->show($id);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function edit(CoutConsomable $coutConsomable)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
          // update model and only pass in the fillable fields

       $this->model->update($request->only($this->model->getModel()->fillable), $id);

        return response()->json(VehiculeUtilisation::with(['vehicule', 'utilisateur',
        'nature_utilisation', 'chauffeur'])->find($id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function destroy( $id)
    {
        return $this->model->delete($id);

    }
}
