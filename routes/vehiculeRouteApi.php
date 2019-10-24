<?php 


//****************** vehicule de vehicules ********************************************************/
Route::get('vehicules', 'VehiculeController@index');
// voir
Route::get('voir_vehicule/{id}', 'VehiculeController@show');

// ajouter 
Route::post('ajouter_vehicule', 'VehiculeController@store');
// modifier
Route::post('modifier_vehicule/{id}', 'VehiculeController@update');

// supprimer
Route::delete('supprimer_vehicule/{id}', 'VehiculeController@destroy');
//*********** fin vehicule vehicules********************************************************* 

//****************** utilisation de vehicules ********************************************************/
Route::get('utilisations', 'VehiculeUtilisationController@index');
// voir
Route::get('voir_vehicule_utilisation/{id}', 'VehiculeUtilisationController@show');

// ajouter 
Route::post('ajouter_vehicule_utilisation', 'VehiculeUtilisationController@store');
// modifier
Route::post('modifier_vehicule_utilisation/{id}', 'VehiculeUtilisationController@update');

// supprimer
Route::delete('supprimer_vehicule_utilisation/{id}', 'VehiculeUtilisationController@destroy');
//*********** fin utilosation vehicules********************************************************* 

//****************** intervention de vehicules ********************************************************/
Route::get('interventions', 'VehiculeInterventionController@index');
// voir
Route::get('voir_vehicule_intervention/{id}', 'VehiculeInterventionController@show');

// ajouter 
Route::post('ajouter_vehicule_intervention', 'VehiculeInterventionController@store');
// modifier
Route::post('modifier_vehicule_intervention/{id}', 'VehiculeInterventionController@update');

// supprimer
Route::delete('supprimer_vehicule_intervention/{id}', 'VehiculeInterventionController@destroy');
//*********** fin utilosation vehicules********************************************************* 

//****************** consommation de vehicules ********************************************************/
Route::get('consommations', 'VehiculeConsomationController@index');
// voir
Route::get('voir_vehicule_consommation/{id}', 'VehiculeConsomationController@show');

// ajouter 
Route::post('ajouter_vehicule_consommation', 'VehiculeConsomationController@store');
// modifier
Route::post('modifier_vehicule_consommation/{id}', 'VehiculeConsomationController@update');

// supprimer
Route::delete('supprimer_vehicule_consommation/{id}', 'VehiculeConsomationController@destroy');
//*********** fin consommation vehicules********************************************************* 


//****************** amende de vehicules ********************************************************/
Route::get('amendes', 'VehiculeAmendeController@index');
// voir
Route::get('voir_vehicule_amende/{id}', 'VehiculeAmendeController@show');

// ajouter 
Route::post('ajouter_vehicule_amende', 'VehiculeAmendeController@store');
// modifier
Route::post('modifier_vehicule_amende/{id}', 'VehiculeAmendeController@update');

// supprimer
Route::delete('supprimer_vehicule_amende/{id}', 'VehiculeAmendeController@destroy');
//*********** fin amende vehicules********************************************************* 


//****************** budget_vehicule de vehicules ********************************************************/
Route::get('budget_vehicules', 'VehiculeBudgetDepenseRecetteController@index');
// voir
Route::get('voir_vehicule_budget_vehicule/{id}', 'VehiculeBudgetDepenseRecetteController@show');

// ajouter 
Route::post('ajouter_vehicule_budget_vehicule', 'VehiculeBudgetDepenseRecetteController@store');
// modifier
Route::post('modifier_vehicule_budget_vehicule/{id}', 'VehiculeBudgetDepenseRecetteController@update');

// supprimer
Route::delete('supprimer_vehicule_budget_vehicule/{id}', 'VehiculeBudgetDepenseRecetteController@destroy');
//*********** fin budget_vehicule vehicules********************************************************* 

//****************** depense_recette de vehicules ********************************************************/
Route::get('depense_recettes', 'VehiculeDepenseRecetteController@index');
// voir
Route::get('voir_vehicule_depense_recette/{id}', 'VehiculeDepenseRecetteController@show');

// ajouter 
Route::post('ajouter_vehicule_depense_recette', 'VehiculeDepenseRecetteController@store');
// modifier
Route::post('modifier_vehicule_depense_recette/{id}', 'VehiculeDepenseRecetteController@update');

// supprimer
Route::delete('supprimer_vehicule_depense_recette/{id}', 'VehiculeDepenseRecetteController@destroy');
//*********** fin depense_recette vehicules********************************************************* 