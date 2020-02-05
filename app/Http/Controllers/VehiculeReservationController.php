<?php

namespace App\Http\Controllers;

use App\VehiculeReservation;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class VehiculeReservationController extends Controller
{
    protected $model;

    public function __construct(VehiculeReservation $vehiculeReservation){
        $this->model = new Repository($vehiculeReservation);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $reservation_par_vehicules = VehiculeReservation::with(['vehicule',
        'personne_reservant', 'objet_reservation', 'depart_reservation', 'destination_reservation'])
       // ->with('utilisateur.entite_affectation')
       //->where('transforme_en_utilisation', 0)
       ->orderBy('id', 'desc')->get();

        return response()->json($reservation_par_vehicules);
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
       
         $reservation = new VehiculeReservation;
         $creation = $reservation->create($request->only($reservation->fillable));
  
         return response()->json(VehiculeReservation::with(['vehicule',
         'personne_reservant', 'objet_reservation', 'depart_reservation', 'destination_reservation'])
         //->with('utilisateur.entite_affectation')
         ->find($creation->id));

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

       return response()->json(VehiculeReservation::with(['vehicule',
       'personne_reservant', 'objet_reservation', 'depart_reservation', 'destination_reservation'])->find($id));
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

     /**
     *
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function transformerReservationEnUtilisation( $id)
    {
        $reservation = VehiculeReservation::find($id);
        $reservation->transforme_en_utilisation = !$reservation->transforme_en_utilisation;
        $reservation->save();

        return response()->json(VehiculeReservation::with(['vehicule',
        'personne_reservant', 'objet_reservation', 'depart_reservation', 'destination_reservation'])->find($id));

    }
}
