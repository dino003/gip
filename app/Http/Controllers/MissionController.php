<?php

namespace App\Http\Controllers;

use App\Mission;
use Illuminate\Http\Request;
use App\Repositories\Repository;

use App\MissionCout;

class MissionController extends Controller
{
    protected $model;

    public function __construct(Mission $mission){
        $this->model = new Repository($mission);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $missions = Mission::with(['mission_couts', 'demandeur', 'vehicule', 'nature_mission',
         'decideur', 'signataire', 'beneficiaire_principal', 'beneficiaire1', 'beneficiaire2', 'beneficiaire3', 'beneficiaire4',
         'beneficiaire5', 'beneficiaire6', 'tier_prenant_en_charge'])
                                    ->get();

        return response()->json($missions);    
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
       
        $ordre_de_mission = new Mission;
       // $creation = $ordre_de_mission->create($request->only($ordre_de_mission->fillable));
        $ordre_de_mission->numero_ordre_mission = $request->get('numero_ordre_mission');
        $ordre_de_mission->demandeur_id = $request->get('demandeur_id');
        $ordre_de_mission->vehicule_id = $request->get('vehicule_id');
        $ordre_de_mission->entite_demandeur = $request->get('entite_demandeur');
        $ordre_de_mission->date_demande = $request->get('date_demande');
        $ordre_de_mission->heure_demande = $request->get('heure_demande');
        $ordre_de_mission->etat = $request->get('etat');
       // $ordre_de_mission->vehicule_personnel_immatriculation = $request->get('vehicule_personnel_immatriculation');
      //  $ordre_de_mission->vehicule_personnel_marque = $request->get('vehicule_personnel_marque');
      //  $ordre_de_mission->vehicule_personnel_modele = $request->get('vehicule_personnel_modele');
      //  $ordre_de_mission->vehicule_personnel_cv = $request->get('vehicule_personnel_cv');
      //  $ordre_de_mission->vehicule_personnel_nombre_place = $request->get('vehicule_personnel_nombre_place');
        $ordre_de_mission->urgence = $request->get('urgence');
        $ordre_de_mission->nature_mission_id = $request->get('nature_mission_id');
        $ordre_de_mission->moyen_transport = $request->get('moyen_transport');
        $ordre_de_mission->moyen_transport_si_autre = $request->get('moyen_transport_si_autre');
        $ordre_de_mission->decideur_id = $request->get('decideur_id');
        $ordre_de_mission->signataire_id = $request->get('signataire_id');
        $ordre_de_mission->beneficiaire_principal_id = $request->get('beneficiaire_principal_id');
        $ordre_de_mission->beneficiaire1_id = $request->get('beneficiaire1_id');
        $ordre_de_mission->beneficiaire2_id = $request->get('beneficiaire2_id');
        $ordre_de_mission->beneficiaire3_id = $request->get('beneficiaire3_id');
        $ordre_de_mission->beneficiaire4_id = $request->get('beneficiaire4_id');
        $ordre_de_mission->beneficiaire5_id = $request->get('beneficiaire5_id');
        $ordre_de_mission->beneficiaire6_id = $request->get('beneficiaire6_id');
        $ordre_de_mission->date_debut_misssion = $request->get('date_debut_misssion');
        $ordre_de_mission->date_fin_mission = $request->get('date_fin_mission');
        $ordre_de_mission->heure_debut_mission = $request->get('heure_debut_mission');
        $ordre_de_mission->heure_fin_mission = $request->get('heure_fin_mission');
        $ordre_de_mission->destination_ville = $request->get('destination_ville');
        $ordre_de_mission->destination_departement = $request->get('destination_departement');
        $ordre_de_mission->destination_pays = $request->get('destination_pays');
        $ordre_de_mission->kilometrage_prevu = $request->get('kilometrage_prevu');
        $ordre_de_mission->nombre_personne = $request->get('nombre_personne');
        $ordre_de_mission->description_mission = $request->get('description_mission');
        $ordre_de_mission->prise_en_charge_cout = $request->get('prise_en_charge_cout');
        $ordre_de_mission->tiers_prenant_en_charge_id = $request->get('tiers_prenant_en_charge_id');


      
            $ordre_de_mission->save();
        // bonjour
                $cout_mission = new MissionCout;
                //dd($val->contenu_libelle_commande);
                $cout_mission->mission_id = $ordre_de_mission->id;

                $cout_mission->nuitees = $request->get('nuitees');
                $cout_mission->repas = $request->get('repas');
                $cout_mission->peages = $request->get('peages');
                $cout_mission->billet_de_train = $request->get('billet_de_train');
                $cout_mission->billet_avion = $request->get('billet_avion');
                $cout_mission->taxis = $request->get('taxis');
                $cout_mission->billet_transport_commun = $request->get('billet_transport_commun');
                $cout_mission->puissance_vehicule_cv = $request->get('puissance_vehicule_cv');
                $cout_mission->kilometre_parcouru = $request->get('kilometre_parcouru');
                $cout_mission->cout_unitaire_kilometre = $request->get('cout_unitaire_kilometre');
                $cout_mission->cout_total_kms = $request->get('cout_total_kms');
                $cout_mission->cout_nuitee = $request->get('cout_nuitee');
                $cout_mission->cout_repas = $request->get('cout_repas');
                $cout_mission->cout_peage = $request->get('cout_peage');
                $cout_mission->cout_billet_train = $request->get('cout_billet_train');
                $cout_mission->cout_billet_avion = $request->get('cout_billet_avion');
                $cout_mission->cou_billet_taxis = $request->get('cou_billet_taxis');
                $cout_mission->cout_bilet_transport_commun = $request->get('cout_bilet_transport_commun');
                $cout_mission->frais_divers = $request->get('frais_divers');
                $cout_mission->cout_total_mission = $request->get('cout_total_mission');
               
                $cout_mission->save();
            

        return response()->json(Mission::with(['mission_couts', 'demandeur', 'vehicule', 'nature_mission',
        'decideur', 'signataire', 'beneficiaire_principal', 'beneficiaire1', 'beneficiaire2', 'beneficiaire3', 'beneficiaire4',
        'beneficiaire5', 'beneficiaire6', 'tier_prenant_en_charge'])->find($ordre_de_mission->id));
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

        return response()->json(Mission::with(['mission_couts', 'demandeur', 'vehicule', 'nature_mission',
        'decideur', 'signataire', 'beneficiaire_principal', 'beneficiaire1', 'beneficiaire2', 'beneficiaire3', 'beneficiaire4',
        'beneficiaire5', 'beneficiaire6', 'tier_prenant_en_charge'])->find($id));
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
