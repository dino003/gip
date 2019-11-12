<?php

namespace App\Http\Controllers;

use App\Commande;
use Illuminate\Http\Request;
use App\Repositories\Repository;

use App\ContenuCommande;

class CommandeController extends Controller
{
    protected $model;

    public function __construct(Commande $commande){
        $this->model = new Repository($commande);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $commandes = Commande::with(['contenu_commandes', 'fournisseur', 'livraison_entite', 'personne', 'facturation_entite'])
                                    ->get();

        return response()->json($commandes);    
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
       
        $commande = new Commande;
       // $creation = $commande->create($request->only($commande->fillable));
        $commande->etat_commande = $request->get('etat_commande');
        $commande->type_commande = $request->get('type_commande');
        $commande->libelle_commande = $request->get('libelle_commande');
        $commande->fournisseur = $request->get('fournisseur');
        $commande->date_expedition = $request->get('date_expedition');
        $commande->mode_expedition = $request->get('mode_expedition');
        $commande->date_livraison_souhaite = $request->get('date_livraison_souhaite');
        $commande->date_livraison = $request->get('date_livraison');
        $commande->montant_ht = $request->get('montant_ht');
        $commande->tva = $request->get('tva');
        $commande->montant_ttc = $request->get('montant_ttc');
        $commande->numero_facture = $request->get('numero_facture');
        $commande->date_facture = $request->get('date_facture');
        $commande->date_facture_reglee = $request->get('date_facture_reglee');
        $commande->date = $request->get('date');
        $commande->numero_commande = $request->get('numero_commande');
        $commande->livraison_entite = $request->get('livraison_entite');
        $commande->personne = $request->get('personne');
        $commande->livraison_adresse1 = $request->get('livraison_adresse1');
        $commande->livraison_adresse2 = $request->get('livraison_adresse2');
        $commande->livraison_code_postal = $request->get('livraison_code_postal');
        $commande->livraison_ville = $request->get('livraison_ville');
        $commande->livraison_telephonne = $request->get('livraison_telephonne');
        $commande->livraison_fax = $request->get('livraison_fax');
        $commande->livraison_mail = $request->get('livraison_mail');
        $commande->livraison_nom_interlocuteur = $request->get('livraison_nom_interlocuteur');
        $commande->livraison_potable = $request->get('livraison_potable');
        $commande->facturation_entite = $request->get('facturation_entite');
        $commande->facturation_adresse1 = $request->get('facturation_adresse1');
        $commande->facturation_adresse2 = $request->get('facturation_adresse2');
        $commande->facturation_code_postal = $request->get('facturation_code_postal');
        $commande->facturation_ville = $request->get('facturation_ville');
        $commande->facturation_telephonne = $request->get('facturation_telephonne');
        $commande->facturation_fax = $request->get('facturation_fax');
        $commande->facturation_mail = $request->get('facturation_mail');
        $commande->facturation_interlocuteur = $request->get('facturation_interlocuteur');
        $commande->facturation_interlocuteur_telephonne = $request->get('facturation_interlocuteur_telephonne');
        $commande->suivi_nom = $request->get('suivi_nom');
        $commande->suivi_telephone = $request->get('suivi_telephone');
        $commande->suivi_fax = $request->get('suivi_fax');
        $commande->suivi_messagerie = $request->get('suivi_messagerie');
        $commande->suivi_entite_service = $request->get('suivi_entite_service');
            $commande->save();
        // bonjour
        if($request->contenu_commandes){
            foreach ($request->contenu_commandes as $key => $value) {
                $contenu = new ContenuCommande;
              $val = json_decode( json_encode($value) );
                //dd($val->contenu_libelle_commande);
               $contenu->contenu_libelle_commande = $val->contenu_libelle_commande;
                $contenu->contenu_etat_commande = $val->contenu_etat_commande;
                $contenu->contenu_date_livraison = $val->contenu_date_livraison;
                $contenu->contenu_date_livraison_souhaite = $val->contenu_date_livraison_souhaite;
                $contenu->marque = $val->marque;
                $contenu->commande = $commande->id;
                $contenu->contenu_modele_vehicule = $val->contenu_modele_vehicule;
                $contenu->energie = $val->energie;
                $contenu->cv_fiscaux = $val->cv_fiscaux;
                $contenu->places = $val->places;
                $contenu->couleur = $val->couleur;
                $contenu->climatisation = $val->climatisation;
                $contenu->pneu_neige = $val->pneu_neige;
                $contenu->radio_cd = $val->radio_cd;
                $contenu->gps = $val->gps;
                $contenu->contenu_quantite_commande = $val->contenu_quantite_commande;
                $contenu->contenu_quantite_livree = $val->contenu_quantite_livree;
                $contenu->contenu_montant_commande = $val->contenu_montant_commande;
                $contenu->contenu_taux_tva = $val->contenu_taux_tva;
                $contenu->contenu_montant_ttc = $val->contenu_montant_ttc;
              
                $contenu->save();
            }
        }
            
      

        return response()->json(Commande::with(['contenu_commandes', 'fournisseur', 'livraison_entite', 'personne', 'facturation_entite'])
                                     ->find($commande->id));
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

        return response()->json(Commande::with(['contenu_commandes', 'fournisseur', 'livraison_entite', 'personne', 'facturation_entite'])->find($id));
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
