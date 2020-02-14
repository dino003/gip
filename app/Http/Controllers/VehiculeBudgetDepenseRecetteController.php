<?php

namespace App\Http\Controllers;

use App\VehiculeBudgetDepenseRecette;
use App\Vehicule;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class VehiculeBudgetDepenseRecetteController extends Controller
{
    protected $model;

    public function __construct(VehiculeBudgetDepenseRecette $vehiculeBudgetDepenseRecette){
        $this->model = new Repository($vehiculeBudgetDepenseRecette);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()

    {
        $budgetVehicules = VehiculeBudgetDepenseRecette::with(['vehicule', 'annee'])
        ->orderBy('id', 'desc')->get();
        return response()->json($budgetVehicules);
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

        $budgetVehicule = new VehiculeBudgetDepenseRecette;
        $creation = $budgetVehicule->create($request->only($budgetVehicule->fillable));

        $budget = VehiculeBudgetDepenseRecette::with(['vehicule', 'annee'])->find($creation->id);

        $vehicule = Vehicule::with(['entite_comptable', 'entite_physique',
        'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
         'chauffeur_atitre', 'contrat_assurance.compagnie_assurance', 'energie', 'affectation_geographique', 'affectation_organisationnel', 'plan_vehicule', 'budgets'])->find($creation->vehicule);

     return response()->json([
         'budget' => $budget,
         'vehicule' => $vehicule
     ]);

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
           $budget_edite = VehiculeBudgetDepenseRecette::find($id);


           $vehicule = Vehicule::find($budget_edite->vehicule);



        $this->model->update($request->only($this->model->getModel()->fillable), $id);


        $budget = VehiculeBudgetDepenseRecette::with(['vehicule', 'annee'])->find($id);

        $vehicule = Vehicule::with(['entite_comptable', 'entite_physique',
        'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
        'chauffeur_atitre', 'contrat_assurance.compagnie_assurance', 'energie', 'affectation_geographique', 'affectation_organisationnel', 'plan_vehicule', 'budgets'])->find($vehicule->id);

     return response()->json([
         'budget' => $budget,
         'vehicule' => $vehicule
     ]);


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
