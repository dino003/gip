<?php

namespace App\Http\Controllers;

use App\ContratAssurance;
use App\Vehicule;
use Illuminate\Http\Request;
use App\Repositories\Repository;

class ContratAssuranceController extends Controller
{
    protected $model;

    public function __construct(ContratAssurance $contrat_assurance){
        $this->model = new Repository($contrat_assurance);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contrat_assurances = ContratAssurance::with(['compagnie_assurance', 'courtier', 'vehicules.entite_physique'])
                                    ->get();

        return response()->json($contrat_assurances);    
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
       
        $contrat_assurance = new ContratAssurance;
       // $contratInputs = $request->only(['contrat_objet']);
        $contratInputs = $request->get('contrat_objet');
       // dd($contratInputs);

        $contrat_assurance->numero_contrat_police  = $contratInputs['numero_contrat_police'];
        $contrat_assurance->date_contrat  = $contratInputs['date_contrat'];
        $contrat_assurance->periode_date_debut  = $contratInputs['periode_date_debut'];
        $contrat_assurance->periode_date_fin  = $contratInputs['periode_date_fin'];
        $contrat_assurance->date_prise_effet  = $contratInputs['date_prise_effet'];
        $contrat_assurance->compagnie_assurance_id  = $contratInputs['compagnie_assurance_id'];
        $contrat_assurance->courtier  = $contratInputs['courtier'];
        $contrat_assurance->valeur_assuree  = $contratInputs['valeur_assuree'];
        $contrat_assurance->montant_assuree  = $contratInputs['montant_assuree'];
        $contrat_assurance->montant_prime  = $contratInputs['montant_prime'];
        $contrat_assurance->pourcentage_assiete  = $contratInputs['pourcentage_assiete'];
        $contrat_assurance->montant_franchise  = $contratInputs['montant_franchise'];
        $contrat_assurance->global  = $contratInputs['global'];

       // $creation = $contrat_assurance->create($request->only($contrat_assurance->fillable));
        $contrat_assurance->save();
      // dd($request->get('vehicules'));
        
        if($request->get('vehicules')){
            foreach ($request->get('vehicules') as $key => $vehicule) {
                $veh = Vehicule::find($vehicule['id']);
                $veh->contrat_assurance_id = $contrat_assurance->id;
                $veh->save();
            }
        }

        $contrat_assurance = ContratAssurance::with(['compagnie_assurance', 'courtier', 'vehicules.entite_physique'])
                                             ->find($contrat_assurance->id);
        
        $vehicules = Vehicule::with(['entite_comptable', 'entite_physique',
        'demandeur','categorie','marque','tiers','detenteur','chauffeur_atitre', 'energie'])->get();
        return response()->json([
            'vehicules' => $vehicules,
            'contrat_assurance' => $contrat_assurance
        ]);
    }

    
    public function marquerContratDefaut($contrat_id){
        $contrats = ContratAssurance::get();

        foreach ($contrats as $key => $value) {
            if($value->defaut){
                $value->defaut = !$value->defaut;
             $value->save();
            }   
        }

        $contrat = ContratAssurance::find($contrat_id);
        $contrat->defaut = !$contrat->defaut;
        $contrat->save();

       // return $this->model->show($tva->id);
        return $this->index();

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

        return response()->json(ContratAssurance::with(['compagnie_assurance', 'courtier', 'vehicules.entite_physique'])->find($id));
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
