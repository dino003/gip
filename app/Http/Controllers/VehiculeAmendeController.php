<?php

namespace App\Http\Controllers;

use App\VehiculeAmende;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class VehiculeAmendeController extends Controller
{
    protected $model;

    public function __construct(VehiculeAmende $vehiculeAmende){
        $this->model = new Repository($vehiculeAmende);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicules_amendes = VehiculeAmende::with(['vehicule', 'organisme',
        'nature_amende', 'conducteur', 'lieu_amende', 'plan_budgetaire.budget'])
        ->orderBy('id', 'desc')->get();
            return response()->json($vehicules_amendes);
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

        $amende = new VehiculeAmende;
        $creation = $amende->create($request->only($amende->fillable));

        return response()->json(VehiculeAmende::with(['vehicule', 'organisme',
         'nature_amende', 'conducteur', 'lieu_amende', 'plan_budgetaire.budget'])
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

      return response()->json(VehiculeAmende::with(['vehicule', 'organisme', 'nature_amende', 'conducteur', 'lieu_amende', 'plan_budgetaire.budget'])->find($id));
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
