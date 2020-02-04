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
       $utilisations_par_vehicules = VehiculeUtilisation::with(['vehicule.entite_physique',
                                                         'nature_utilisation', 'chauffeur'])
                                                         ->with('utilisateur.entite_affectation')
                                                         ->orderBy('date_debut_utilisation', 'desc')
                                                        ->orderBy('id', 'desc')->get();

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

            if($creation->kilometres_parcourus !== '' && $creation->kilometres_parcourus !== null && $creation->kilometres_parcourus > 0){
                $vehicule = Vehicule::find($creation->vehicule);

                $vehicule->kilometrage_acquisition += (int)$creation->kilometres_parcourus;
        
                $vehicule->save();
            }

            $utilisation = VehiculeUtilisation::with(['vehicule.entite_physique',
            'nature_utilisation', 'chauffeur'])
            ->with('utilisateur.entite_affectation')->find($creation->id);

            $vehicule = Vehicule::with(['entite_comptable', 'entite_physique',
            'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
             'chauffeur_atitre', 'contrat_assurance.compagnie_assurance', 'energie', 'affectation_geographique', 'affectation_organisationnel'])->find($creation->vehicule);
  
         return response()->json([
             'utilisation' => $utilisation,
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
          $utilisation_edite = VehiculeUtilisation::find($id);


          $vehicule = Vehicule::find($utilisation_edite->vehicule);

          $vehicule->kilometrage_acquisition -= (int)$utilisation_edite->kilometres_parcourus;
  
          $vehicule->save();

       $this->model->update($request->only($this->model->getModel()->fillable), $id);

       $vehicule = Vehicule::find($utilisation_edite->vehicule);

       $vehicule->kilometrage_acquisition += (int)$request->kilometres_parcourus;

       $vehicule->save();

                
       $utilisation = VehiculeUtilisation::with(['vehicule.entite_physique',
       'nature_utilisation', 'chauffeur'])
       ->with('utilisateur.entite_affectation')->find($id);

       $vehicule = Vehicule::with(['entite_comptable', 'entite_physique',
       'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
       'chauffeur_atitre', 'contrat_assurance.compagnie_assurance', 'energie', 'affectation_geographique', 'affectation_organisationnel'])->find($vehicule->id);

        return response()->json([
            'utilisation' => $utilisation,
            'vehicule' => $vehicule
        ]);


        
    }

     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CoutConsomable  $coutConsomable
     * @return \Illuminate\Http\Response
     */
    public function update_derniere(Request $request, $id)
    {
          // update model and only pass in the fillable fields


       $utilisation_edite = VehiculeUtilisation::find($id);


       if($utilisation_edite->kilometres_parcourus !== '' && $utilisation_edite->kilometres_parcourus !== null && $utilisation_edite->kilometres_parcourus > 0){
       // soustraction
        $vehicule = Vehicule::find($utilisation_edite->vehicule);

        $vehicule->kilometrage_acquisition -= (int)$utilisation_edite->kilometres_parcourus;

        $vehicule->save();

            // modification de l'utilisation
        $this->model->update($request->only($this->model->getModel()->fillable), $id);

        // reinitialisation de l'utilisation
        $utilisation_edite2 = VehiculeUtilisation::find($id);

        // addition
        $vehicule = Vehicule::find($utilisation_edite2->vehicule);

        $vehicule->kilometrage_acquisition += (int)$utilisation_edite2->kilometres_parcourus;

        $vehicule->save();


                
            $utilisation = VehiculeUtilisation::with(['vehicule.entite_physique',
            'nature_utilisation', 'chauffeur'])
            ->with('utilisateur.entite_affectation')->find($id);

            $vehicule = Vehicule::with(['entite_comptable', 'entite_physique',
            'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
            'chauffeur_atitre', 'contrat_assurance.compagnie_assurance', 'energie', 'affectation_geographique', 'affectation_organisationnel'])->find($utilisation_edite2->vehicule);

        return response()->json([
            'utilisation' => $utilisation,
            'vehicule' => $vehicule
        ]);
    }

    // else

             $this->model->update($request->only($this->model->getModel()->fillable), $id);


            $utilisation = VehiculeUtilisation::with(['vehicule.entite_physique',
            'nature_utilisation', 'chauffeur'])
            ->with('utilisateur.entite_affectation')->find($id);

            $vehicule = Vehicule::with(['entite_comptable', 'entite_physique',
            'demandeur', 'categorie', 'marque', 'tiers', 'detenteur',
            'chauffeur_atitre', 'contrat_assurance.compagnie_assurance', 'energie', 'affectation_geographique', 'affectation_organisationnel'])->find($utilisation_edite->vehicule);

        return response()->json([
            'utilisation' => $utilisation,
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
