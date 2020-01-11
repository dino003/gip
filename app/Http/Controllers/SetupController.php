<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\StructureRegroupement;
use App\TypeEntite;
use App\Tier;
use App\Personnel;
use App\Entite;


class SetupController extends Controller
{
    // ajouter premiere structure etablissement
    public function ajouterPremiereStructure(Request $request){
        $structures = StructureRegroupement::all();
        if($structures->isEmpty()){
            $struc = new StructureRegroupement;

           $struc->code_regroupement = $request->get('code_regroupement');
           $struc->nom_regroupement = $request->get('nom_regroupement');

           $struc->save();

           return response()->json($struc);

        }
    }

    // premiere type d'entite
    public function ajouterPremiereTypeEntite(Request $request){
        $entites = TypeEntite::all();
        if($entites->isEmpty()){
            $ent = new TypeEntite;

           $ent->type_entite = $request->get('type_entite');

           $ent->save();

           return response()->json($ent);

        }
    }

       // premier Tier par defaut
       public function ajouterPremierTier(Request $request){
        $tiers = Tier::all();
        if($tiers->isEmpty()){
            $tier = new Tier;

           $tier->code = $request->get('code');

           $tier->save();

           return response()->json($tier);

        }
    }


     // premier personnel par defaut
     public function ajouterPremierPersonnel(Request $request){
        $personnels = Personnel::all();
        if($personnels->isEmpty()){
           // $entite = Entite::where('')->first();
            $pers = new Personnel;

           $pers->nom = $request->get('nom');
           $pers->default = $request->get('default');
           $pers->personne_prioritaire = $request->get('personne_prioritaire');
         //  $pers->entite_affectation = $request->get('nom');
           $pers->save();

           return response()->json($pers);

        }
    }


}
