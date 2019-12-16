<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



//----------------------Cout consomables --------------------------------------------------------**********
Route::get('couts_consomables', 'CoutConsomableController@index');
// voir
Route::get('voir_cout_consomable/{id}', 'CoutConsomableController@show');

// ajouter 
Route::post('ajouter_cout_consomable', 'CoutConsomableController@store');
// modifier
Route::post('modifier_cout_consomable/{id}', 'CoutConsomableController@update');

// supprimer
Route::delete('supprimer_cout_consomable/{id}', 'CoutConsomableController@destroy');


//*********fin cout consomables************----------------------------------------------------------- */

//****************** type entité ********************************************************/
Route::get('types_entites', 'TypeEntiteController@index');
// voir
Route::get('voir_type_entite/{id}', 'TypeEntiteController@show');

// ajouter 
Route::post('ajouter_type_entite', 'TypeEntiteController@store');
// modifier
Route::post('modifier_type_entite/{id}', 'TypeEntiteController@update');

// supprimer
Route::delete('supprimer_type_entite/{id}', 'TypeEntiteController@destroy');
//*********** fin type entité*********************************************************  */

//****************** Structure etablissement regroupement ********************************************************/
Route::get('structures_etablissements', 'StructureRegroupementController@index');
// voir
Route::get('voir_structure_etablissement/{id}', 'StructureRegroupementController@show');

// ajouter 
Route::post('ajouter_structure_etablissement', 'StructureRegroupementController@store');
// modifier
Route::post('modifier_structure_etablissement/{id}', 'StructureRegroupementController@update');

// supprimer
Route::delete('supprimer_structure_etablissement/{id}', 'StructureRegroupementController@destroy');
//*********** fin Structure etablissement regroupement*********************************************************  */

//****************** entites ********************************************************/
Route::get('entites', 'EntiteController@index');
// voir
Route::get('voir_entite/{id}', 'EntiteController@show');

// ajouter 
Route::post('ajouter_entite', 'EntiteController@store');
// modifier
Route::post('modifier_entite/{id}', 'EntiteController@update');

// supprimer
Route::delete('supprimer_entite/{id}', 'EntiteController@destroy');
//*********** fin entites*********************************************************  */

//****************** tiers ********************************************************/
Route::get('tiers', 'TierController@index');
// voir
Route::get('voir_tier/{id}', 'TierController@show');

// ajouter 
Route::post('ajouter_tier', 'TierController@store');
// modifier
Route::post('modifier_tier/{id}', 'TierController@update');

// supprimer
Route::delete('supprimer_tier/{id}', 'TierController@destroy');
//*********** fin tiers*********************************************************  */

//****************** personnels ********************************************************/
Route::get('personnels', 'PersonnelController@index');
// voir
Route::get('voir_personnel/{id}', 'PersonnelController@show');

// ajouter 
Route::post('ajouter_personnel', 'PersonnelController@store');
// modifier
Route::post('modifier_personnel/{id}', 'PersonnelController@update');

// supprimer
Route::delete('supprimer_personnel/{id}', 'PersonnelController@destroy');
//*********** fin personnels*********************************************************  */

//****************** users ********************************************************/
Route::get('users', 'UserController@index');
// voir
Route::get('voir_user/{id}', 'UserController@show');

// ajouter 
Route::post('ajouter_user', 'UserController@store');
// modifier
Route::post('modifier_user/{id}', 'UserController@update');
Route::post('modifier_user_fonction/{id}', 'UserController@updateFonction');


// check user verifEditUser
Route::post('verif_user', 'UserController@verifUser');
Route::post('verif_edit_user/{id}', 'UserController@verifEditUser');


// supprimer
Route::delete('supprimer_user/{id}', 'UserController@destroy');
//*********** fin users*********************************************************  */



//****************** categories de vehicules ********************************************************/
Route::get('categories_vehicules', 'CategorieVehiculeController@index');
// voir
Route::get('voir_categorie_vehicule/{id}', 'CategorieVehiculeController@show');

// ajouter 
Route::post('ajouter_categorie_vehicule', 'CategorieVehiculeController@store');
// modifier
Route::post('modifier_categorie_vehicule/{id}', 'CategorieVehiculeController@update');

// supprimer
Route::delete('supprimer_categorie_vehicule/{id}', 'CategorieVehiculeController@destroy');
//*********** fin categories vehicules*********************************************************  */

//****************** modeles de vehicules ********************************************************/
Route::get('modeles_vehicules', 'ModeleVehiculeController@index');
// voir
Route::get('voir_modele_vehicule/{id}', 'ModeleVehiculeController@show');

// ajouter 
Route::post('ajouter_modele_vehicule', 'ModeleVehiculeController@store');
// modifier
Route::post('modifier_modele_vehicule/{id}', 'ModeleVehiculeController@update');

// supprimer
Route::delete('supprimer_modele_vehicule/{id}', 'ModeleVehiculeController@destroy');
//*********** fin modeles vehicules*********************************************************  */

//****************** marques de vehicules ********************************************************/
Route::get('marques', 'MarqueController@index');
// voir
Route::get('voir_marque/{id}', 'MarqueController@show');

// ajouter 
Route::post('ajouter_marque', 'MarqueController@store');
// modifier
Route::post('modifier_marque/{id}', 'MarqueController@update');

// supprimer
Route::delete('supprimer_marque/{id}', 'MarqueController@destroy');
//*********** fin marques vehicules*********************************************************  */

//****************** code_incidents de vehicules ********************************************************/
Route::get('code_incidents', 'IncidentVehiculeController@index');
// voir
Route::get('voir_code_incident/{id}', 'IncidentVehiculeController@show');

// ajouter 
Route::post('ajouter_code_incident', 'IncidentVehiculeController@store');
// modifier
Route::post('modifier_code_incident/{id}', 'IncidentVehiculeController@update');

// supprimer
Route::delete('supprimer_code_incident/{id}', 'IncidentVehiculeController@destroy');
//*********** fin code_incidents vehicules*********************************************************  */


//****************** nature_energies de vehicules ********************************************************/
Route::get('nature_energies', 'NatureEnergieController@index');
// voir
Route::get('voir_nature_energie/{id}', 'NatureEnergieController@show');

// ajouter 
Route::post('ajouter_nature_energie', 'NatureEnergieController@store');
// modifier
Route::post('modifier_nature_energie/{id}', 'NatureEnergieController@update');

// supprimer
Route::delete('supprimer_nature_energie/{id}', 'NatureEnergieController@destroy');
//*********** fin nature_energies vehicules*********************************************************  */


//****************** nature_interventions de vehicules ********************************************************/
Route::get('nature_interventions', 'NatureInterventionController@index');
// voir
Route::get('voir_nature_intervention/{id}', 'NatureInterventionController@show');

// ajouter 
Route::post('ajouter_nature_intervention', 'NatureInterventionController@store');
// modifier
Route::post('modifier_nature_intervention/{id}', 'NatureInterventionController@update');

// supprimer
Route::delete('supprimer_nature_intervention/{id}', 'NatureInterventionController@destroy');
//*********** fin nature_interventions vehicules*********************************************************  */


//****************** operation_intervention de vehicules ********************************************************/
Route::get('operation_intervention', 'OperationInterventionController@index');
// voir
Route::get('voir_operation_intervention/{id}', 'OperationInterventionController@show');

// ajouter 
Route::post('ajouter_operation_intervention', 'OperationInterventionController@store');
// modifier
Route::post('modifier_operation_intervention/{id}', 'OperationInterventionController@update');

// supprimer
Route::delete('supprimer_operation_intervention/{id}', 'OperationInterventionController@destroy');
//*********** fin operation_intervention vehicules********************************************************* 


//****************** nature_consommation de vehicules ********************************************************/
Route::get('nature_consommations', 'NatureConsomationController@index');
// voir
Route::get('voir_nature_consommation/{id}', 'NatureConsomationController@show');

// ajouter 
Route::post('ajouter_nature_consommation', 'NatureConsomationController@store');
// modifier
Route::post('modifier_nature_consommation/{id}', 'NatureConsomationController@update');

// supprimer
Route::delete('supprimer_nature_consommation/{id}', 'NatureConsomationController@destroy');
//*********** fin nature_consommation vehicules********************************************************* 

//****************** nature_amende de vehicules ********************************************************/
Route::get('nature_amendes', 'NatureAmendeController@index');
// voir
Route::get('voir_nature_amende/{id}', 'NatureAmendeController@show');

// ajouter 
Route::post('ajouter_nature_amende', 'NatureAmendeController@store');
// modifier
Route::post('modifier_nature_amende/{id}', 'NatureAmendeController@update');

// supprimer
Route::delete('supprimer_nature_amende/{id}', 'NatureAmendeController@destroy');
//*********** fin nature_amende vehicules********************************************************* 

//****************** nature_sinistre de vehicules ********************************************************/
Route::get('nature_sinistres', 'NatureSinistreController@index');
// voir
Route::get('voir_nature_sinistre/{id}', 'NatureSinistreController@show');

// ajouter 
Route::post('ajouter_nature_sinistre', 'NatureSinistreController@store');
// modifier
Route::post('modifier_nature_sinistre/{id}', 'NatureSinistreController@update');

// supprimer
Route::delete('supprimer_nature_sinistre/{id}', 'NatureSinistreController@destroy');
//*********** fin nature_sinistre vehicules********************************************************* 

//****************** nature_depense_recette de vehicules ********************************************************/
Route::get('nature_depense_recettes', 'DepenseRecetteController@index');
// voir
Route::get('voir_nature_depense_recette/{id}', 'DepenseRecetteController@show');

// ajouter 
Route::post('ajouter_nature_depense_recette', 'DepenseRecetteController@store');
// modifier
Route::post('modifier_nature_depense_recette/{id}', 'DepenseRecetteController@update');

// supprimer
Route::delete('supprimer_nature_depense_recette/{id}', 'DepenseRecetteController@destroy');
//*********** fin nature_depense_recette vehicules********************************************************* 

//****************** nature_reservation de vehicules ********************************************************/
Route::get('nature_reservations', 'NatureReservationUtilisationController@index');
// voir
Route::get('voir_nature_reservation/{id}', 'NatureReservationUtilisationController@show');

// ajouter 
Route::post('ajouter_nature_reservation', 'NatureReservationUtilisationController@store');
// modifier
Route::post('modifier_nature_reservation/{id}', 'NatureReservationUtilisationController@update');

// supprimer
Route::delete('supprimer_nature_reservation/{id}', 'NatureReservationUtilisationController@destroy');
//*********** fin nature_reservation vehicules********************************************************* 

//****************** famille_pieces_detachee de vehicules ********************************************************/
Route::get('famille_pieces_detachees', 'FamillePieceDetacheController@index');
// voir
Route::get('voir_famille_pieces_detachee/{id}', 'FamillePieceDetacheController@show');

// ajouter 
Route::post('ajouter_famille_pieces_detachee', 'FamillePieceDetacheController@store');
// modifier
Route::post('modifier_famille_pieces_detachee/{id}', 'FamillePieceDetacheController@update');

// supprimer
Route::delete('supprimer_famille_pieces_detachee/{id}', 'FamillePieceDetacheController@destroy');
//*********** fin famille_pieces_detachee vehicules********************************************************* 


//****************** nature_taxe de vehicules ********************************************************/
Route::get('nature_taxes', 'TaxeController@index');
// voir
Route::get('voir_nature_taxe/{id}', 'TaxeController@show');

// ajouter 
Route::post('ajouter_nature_taxe', 'TaxeController@store');
// modifier
Route::post('modifier_nature_taxe/{id}', 'TaxeController@update');

// supprimer
Route::delete('supprimer_nature_taxe/{id}', 'TaxeController@destroy');
//*********** fin nature_taxe vehicules********************************************************* 

//****************** annee_budgetaire de vehicules ********************************************************/
Route::get('annee_budgetaires', 'AnneeBudgetaireController@index');
// voir
Route::get('voir_annee_budgetaire/{id}', 'AnneeBudgetaireController@show');

// ajouter 
Route::post('ajouter_annee_budgetaire', 'AnneeBudgetaireController@store');
// modifier
Route::post('modifier_annee_budgetaire/{id}', 'AnneeBudgetaireController@update');

// supprimer
Route::delete('supprimer_annee_budgetaire/{id}', 'AnneeBudgetaireController@destroy');
//*********** fin annee_budgetaire vehicules********************************************************* 

//****************** taux_tva de vehicules ********************************************************/
Route::get('taux_tvas', 'TauxTvaController@index');
// voir
Route::get('voir_taux_tva/{id}', 'TauxTvaController@show');

// ajouter 
Route::post('ajouter_taux_tva', 'TauxTvaController@store');
// modifier
Route::post('modifier_taux_tva/{id}', 'TauxTvaController@update');

// tva par defaut
Route::get('modifier_taux_tva_defaut/{tva_id}', 'TauxTvaController@marquerTvaDefaut');


// supprimer
Route::delete('supprimer_taux_tva/{id}', 'TauxTvaController@destroy');
//*********** fin taux_tva vehicules********************************************************* 

//****************** budget_entite de vehicules ********************************************************/
Route::get('budget_entites', 'BudgetEntiteController@index');
// voir
Route::get('voir_budget_entite/{id}', 'BudgetEntiteController@show');

// ajouter 
Route::post('ajouter_budget_entite', 'BudgetEntiteController@store');
// modifier
Route::post('modifier_budget_entite/{id}', 'BudgetEntiteController@update');

// supprimer
Route::delete('supprimer_budget_entite/{id}', 'BudgetEntiteController@destroy');
//*********** fin budget_entite vehicules********************************************************* 

//****************** contrat_assurance  ********************************************************/
Route::get('contrat_assurances', 'ContratAssuranceController@index');
// voir
Route::get('voir_contrat_assurance/{id}', 'ContratAssuranceController@show');

// ajouter 
Route::post('ajouter_contrat_assurance', 'ContratAssuranceController@store');
// modifier
Route::post('modifier_contrat_assurance/{id}', 'ContratAssuranceController@update');

// supprimer
Route::delete('supprimer_contrat_assurance/{id}', 'ContratAssuranceController@destroy');
//*********** fin contrat_assurance ********************************************************* 

//****************** commande  ********************************************************/
Route::get('commandes', 'CommandeController@index');
// voir
Route::get('voir_commande/{id}', 'CommandeController@show');

// ajouter 
Route::post('ajouter_commande', 'CommandeController@store');
// modifier
Route::post('modifier_commande/{id}', 'CommandeController@update');

// supprimer
Route::delete('supprimer_commande/{id}', 'CommandeController@destroy');
//*********** fin commande ********************************************************* 

//****************** articles_stock  ********************************************************/
Route::get('articles_stock', 'StockArticleController@index');
// voir
Route::get('article_stock/{id}', 'StockArticleController@show');

// ajouter 
Route::post('ajouter_article_stock', 'StockArticleController@store');
// modifier
Route::post('modifier_article_stock/{id}', 'StockArticleController@update');

// supprimer
Route::delete('supprimer_article_stock/{id}', 'StockArticleController@destroy');
//*********** fin articles_stock ********************************************************* 

//****************** entrees_stock  ********************************************************/
Route::get('entrees_stock', 'StockEntreeController@index');
// voir
Route::get('entree_stock/{id}', 'StockEntreeController@show');

// ajouter 
Route::post('ajouter_entree_stock', 'StockEntreeController@store');
// modifier
Route::post('modifier_entree_stock/{id}', 'StockEntreeController@update');

// supprimer
Route::delete('supprimer_entree_stock/{id}', 'StockEntreeController@destroy');
//*********** fin entrees_stock ********************************************************* 

//****************** sorties_stock  ********************************************************/
Route::get('sorties_stock', 'StockSortieController@index');
// voir
Route::get('sortie_stock/{id}', 'StockSortieController@show');

// ajouter 
Route::post('ajouter_sortie_stock', 'StockSortieController@store');
// modifier
Route::post('modifier_sortie_stock/{id}', 'StockSortieController@update');

// supprimer
Route::delete('supprimer_sortie_stock/{id}', 'StockSortieController@destroy');
//*********** fin sorties_stock ********************************************************* 

//****************** ordre de missions  ********************************************************/
Route::get('ordre_missions', 'MissionController@index');
// voir
Route::get('voir_ordre_mission/{id}', 'MissionController@show');

// ajouter 
Route::post('ajouter_ordre_mission', 'MissionController@store');
// modifier
Route::post('modifier_ordre_mission/{mission_id}/{mission_cout_id}', 'MissionController@update');

// modifier
Route::get('marquer_ordre_mission_termine/{mission_id}', 'MissionController@marquerMissionTermine');

// supprimer
Route::delete('supprimer_ordre_mission/{id}', 'MissionController@destroy');
//*********** fin ordre de missions  ********************************************************* 



//****************** infos sur la societé  ********************************************************/
Route::get('infos_societe', 'EtablissementController@index');

// ajouter 
Route::post('ajouter_ou_modifier_info_etablissement', 'EtablissementController@storeOuUpdate');
// modifier
//Route::post('modifier_info_etablissement/{id}', 'EtablissementController@update');


//*********** fin infos sur la societé ********************************************************* 

//****************** parametre generaux reservation ordre  ********************************************************/
Route::get('parametre_generaux_reservation_ordre', 'ParamReservationOrdreMissionController@index');

// ajouter 
Route::post('ajouter_ou_modifier_parametre_generaux_reservation_ordre', 'ParamReservationOrdreMissionController@storeOuUpdate');
// modifier
//Route::post('modifier_info_etablissement/{id}', 'ParamReservationOrdreMissionController@update');


//*********** fin parametre generaux modules ********************************************************* 

//****************** parametre generaux modules  ********************************************************/
Route::get('parametre_modules', 'ParamModuleController@index');

// ajouter 
Route::post('ajouter_ou_modifier_parametre_modules', 'ParamModuleController@storeOuUpdate');
// modifier


//*********** fin parametre generaux modules ********************************************************* 

//****************** parametre generaux stock  ********************************************************/
Route::get('parametre_stocks', 'ParamStockController@index');

// ajouter 
Route::post('ajouter_ou_modifier_parametre_stocks', 'ParamStockController@storeOuUpdate');
// modifier

//*********** fin parametre generaux stock ********************************************************* 


//****************** parametre generaux journal  ********************************************************/
Route::get('parametre_journal', 'ParamJournalController@index');

// ajouter 
Route::post('ajouter_ou_modifier_parametre_journal', 'ParamJournalController@storeOuUpdate');
// modifier


//*********** fin parametre generaux journal ********************************************************* 

//****************** parametre generaux personnels  ********************************************************/
Route::get('parametre_personnels', 'ParamPersonnelController@index');

// ajouter 
Route::post('ajouter_ou_modifier_parametre_personnels', 'ParamPersonnelController@storeOuUpdate');
// modifier


//*********** fin parametre generaux personnels ********************************************************* 

Route::get('tt', 'UserController@index');

//var dt = new Date( "12-18-1995" );
//document.write("getMonth() : " + parseFloat(dt.getMonth() + 1) ); 

Route::post('import', 'PersonnelController@import')->name('import');



