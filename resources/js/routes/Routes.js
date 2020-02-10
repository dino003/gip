import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Master from '../components/layouts/Master'
import MasterParametre from '../components/layouts/MasterParametre'
import MasterCodification from '../components/layouts/MasterCodification'
import MasterGestion from '../components/layouts/MasterGestion'
import ParametreGeneraux from '../pages/ParametreGeneraux'
import TypeEntite from '../pages/codifications/TypeEntite.jsx'
import CategorieVehicule from '../pages/codifications/CategorieVehicule'
import Personnels from '../pages/parametres/acteurs/Personnels'
import AjouterPersonnel from '../pages/forms/AjouterPersonnel.jsx'
import ModifierPersonnel from '../pages/forms/ModifierPersonnel'
import Entites from '../pages/parametres/Entites'
import AjouterEntite from '../pages/forms/AjouterEntite.jsx'
import StructureEtablissement from '../pages/parametres/StructureEtablissement'
import ModifierEntite from '../pages/forms/ModifierEntite'
import Tiers from '../pages/parametres/acteurs/Tiers'
import AjouterTier from '../pages/forms/AjouterTier'
import ModifierTiers from '../pages/forms/ModifierTiers'
import Utilisateurs from '../pages/parametres/acteurs/Utilisateurs'
import AjouterUtilisateur from '../pages/forms/AjouterUtilisateur'
import ModifierUtilisateur from '../pages/forms/ModifierUtilisateur'

import AjouterCategorieVehicule from '../pages/forms/AjouterCategorieVehicule'
import ModifierCategorieVehicule from '../pages/forms/ModifierCategorieVehicule'

import Marques from '../pages/codifications/Marques'
import ModelVehicules from '../pages/codifications/ModelVehicules';
import AjouterModelVehicule from '../pages/forms/AjouterModelVehicule';
import ModifierModeleVehicule from '../pages/forms/ModifierModeleVehicule';
import CodeIncident from '../pages/codifications/CodeIncident';
import NatureEnergie from '../pages/codifications/NatureEnergie';
import NatureInterventions from '../pages/codifications/NatureInterventions';
import operationInterventions from '../pages/codifications/operationInterventions';
import NatureConsommations from '../pages/codifications/NatureConsommations';
import NatureAmendes from '../pages/codifications/NatureAmendes';
import NatureSinistres from '../pages/codifications/NatureSinistres';
import NatureDepenseRecettes from '../pages/codifications/NatureDepenseRecettes';
import NatureReservations from '../pages/codifications/NatureReservations';
import FamillePieceDetache from '../pages/codifications/FamillePieceDetache';
import NatureTaxes from '../pages/codifications/NatureTaxes';
import CoutConsommables from '../pages/codifications/CoutConsommables';
import AjouterVehicule from '../pages/forms/Vehicules/AjouterVehicule';
import Utilisations from '../pages/vehicules/Utilisations';
import Interventions from '../pages/vehicules/Interventions';
import AjouterIntervention from '../pages/forms/Vehicules/AjouterIntervention';
import ModifierIntervention from '../pages/forms/Vehicules/ModifierIntervention';
import Consommations from '../pages/vehicules/Consommations';
import AjouterConsommation from '../pages/forms/Vehicules/AjouterConsommation';
import ModifierConsommation from '../pages/forms/Vehicules/ModifierConsommation';
import Amendes from '../pages/vehicules/Amendes';
import AjouterAmende from '../pages/forms/Vehicules/AjouterAmende';
import ModifierAmende from '../pages/forms/Vehicules/ModifierAmende';
import BudgetVehicules from '../pages/vehicules/BudgetVehicules';
import AjouterBudgetVehicule from '../pages/forms/Vehicules/AjouterBudgetVehicule';
import AnneeBudgetaires from '../pages/codifications/AnneeBudgetaires';
import ModifierBudgetVehicule from '../pages/forms/Vehicules/ModifierBudgetVehicule';
import DepenseRecettes from '../pages/vehicules/DepenseRecettes'
import AjouterDepenseRecette from '../pages/forms/Vehicules/AjouterDepenseRecette';
import ModifierDepenseRecette from '../pages/forms/Vehicules/ModifierDepenseRecette';
import AjouterBudgetEntite from '../pages/forms/Vehicules/AjouterBudgetEntite';
import BudgetEntites from '../pages/vehicules/BudgetEntites';
import ModifierBudgetEntite from '../pages/forms/Vehicules/ModifierBudgetEntite';

import ContratAssurances from '../pages/gestion/ContratAssurances'
import AjouterContratAssurance from '../pages/forms/AjouterContratAssurance';
import ModifierContratAssurance from '../pages/forms/ModifierContratAssurance';
import Commandes from '../pages/gestion/Commandes'
import AjouterCommande from '../pages/forms/AjouterCommande';
import ModifierCommande from '../pages/forms/ModifierCommande';
import Reservations from '../pages/vehicules/Reservations';
import AjouterReservation from '../pages/forms/Vehicules/AjouterReservation';
import ModifierReservation from '../pages/forms/Vehicules/ModifierReservation';
import EditionListTable from '../pages/editions/EditionListTable';
import MasterEdition from '../components/layouts/MasterEdition';
import VehiculeEtatForm from '../pages/editions/forms/VehiculeEtatForm';
import Missions from '../pages/gestion/Missions';
import AjouterMission from '../pages/forms/AjouterMission';
import ModifierMission from '../pages/forms/ModifierMission';
import Articles from '../pages/gestion/Articles';
import AjouterArticle from '../pages/forms/AjouterArticle';
import ModifierArticle from '../pages/forms/ModifierArticle';
import EntreeStocks from '../pages/gestion/EntreeStocks';
import AjouterEntreeStock from '../pages/forms/AjouterEntreeStock';
import ModifierEntreeStock from '../pages/forms/ModifierEntreeStock';
import SortieStock from '../pages/gestion/SortieStock';
import AjouterSortieStock from '../pages/forms/AjouterSortieStock';
import ModifierSortieStock from '../pages/forms/ModifierSortieStock';
import TauxTva from '../pages/codifications/TauxTva'
import MasterCodification2 from '../components/layouts/MasterCodification2';
import GardeCodification1 from '../pages/GardeCodification1'
import GardeCodification2 from '../pages/GardeCodification2'
import GardeGestion from '../pages/GardeGestion'

import GardeParametres from '../pages/GardeParametres'
import ModifierVehicule from '../pages/forms/Vehicules/ModifierVehicule';
import Vehicules from '../pages/Vehicules';
import ReservationsGeneral from '../pages/gestion/ReservationsGeneral';
import AjouterReservationGeneral from '../pages/forms/Vehicules/AjouterReservationGeneral';
import ModifierReservationGeneral from '../pages/forms/Vehicules/ModifierReservationGeneral';
import VehiculesEtat from '../pages/editions/etats/vehicules/VehiculesEtat';
import UtilisationVehiculeEtat from '../pages/editions/etats/utilisations/UtilisationVehiculeEtat';
import InterventionVehiculeEtat from '../pages/editions/etats/interventions/InterventionVehiculeEtat';
import ConsommationVehiculeEtat from '../pages/editions/etats/consommations/ConsommationVehiculeEtat';
import ReservationVehiculeEtat from '../pages/editions/etats/reservations/ReservationVehiculeEtat';
import ContratAssuranceVehicule from '../pages/vehicules/ContratAssuranceVehicule';
import Tracabilites from '../pages/vehicules/Tracabilites';
import ModifierUtilisationVehicule from '../pages/forms/Vehicules/ModifierUtilisationVehicule';
import Dashboard from '../pages/Dashboard.jsx';
import FiltreVehicules from '../pages/FiltreVehicules';
import UtilisationGenerals from '../pages/gestion/UtilisationGenerals';
import ModifierUtilisationGeneral from '../pages/forms/Vehicules/ModifierUtilisationGeneral';
import FicheVehicule from '../pages/vehicules/FicheVehicule';
import StructureOrganisationnelles from '../pages/parametres/StructureOrganisationnelles';
import StructureGeographique from '../pages/parametres/StructureGeographique';
import PlanGeographiques from '../pages/parametres/PlanGeographiques';
import PlanOrganisationnel from '../pages/parametres/PlanOrganisationnel';
import StructureVehicules from '../pages/parametres/StructureVehicules';
import PlanVehicules from '../pages/parametres/PlanVehicules';



const NavBack = () => (
  <Switch>

    {/* Dashboard */}
    <MasterEdition path="/gestion_du_parc_automobile/global-dashboard" component={Dashboard} />

    {/* fin dashboard */}
    <MasterParametre exact path="/gestion_du_parc_automobile/parametres_generaux" component={ParametreGeneraux} />
    <MasterParametre exact path="/gestion_du_parc_automobile/gestion_du_personnel" component={Personnels} />
    <MasterParametre exact path="/gestion_du_parc_automobile/ajouter_personnel" component={AjouterPersonnel} />
    <MasterParametre exact path="/gestion_du_parc_automobile/gestion_du_personnel/:personnel_id" component={ModifierPersonnel} />

    <MasterParametre exact path="/gestion_du_parc_automobile/ajouter-entite" component={AjouterEntite} />
    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-des-entites" component={Entites} />
    <MasterParametre  path="/gestion_du_parc_automobile/gestion-des-entites/:entite_id" component={ModifierEntite} />
    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-des-tiers" component={Tiers} />
    <MasterParametre exact path="/gestion_du_parc_automobile/ajouter-tiers" component={AjouterTier} />
    <MasterParametre  path="/gestion_du_parc_automobile/gestion-des-tiers/:tiers_id" component={ModifierTiers} />
    <MasterParametre exact  path="/gestion_du_parc_automobile/gestion-des-utilisateurs" component={Utilisateurs} />
    <MasterParametre  path="/gestion_du_parc_automobile/ajouter-utilisateurs" component={AjouterUtilisateur} />
    <MasterParametre   path="/gestion_du_parc_automobile/gestion-des-utilisateurs/:utilisateur_id" component={ModifierUtilisateur} />
    <MasterCodification2 exact path="/gestion_du_parc_automobile/les_taux_tva" component={TauxTva} />


    {/*  les pages de garde */}
    <MasterCodification2 exact path="/gestion_du_parc_automobile/codifications_2" component={GardeCodification2} />
    <MasterCodification exact path="/gestion_du_parc_automobile/codifications_1" component={GardeCodification1} />
    <MasterParametre exact path="/gestion_du_parc_automobile/parametres" component={GardeParametres} />
    <MasterGestion exact path="/gestion_du_parc_automobile/gestions" component={GardeGestion} />


        {/* fin des pages de garde */}





    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-de-la-structure-etablissement" component={StructureEtablissement} />
    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-de-la-structure-organisationelle" component={StructureOrganisationnelles} />
    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-de-la-structure-geographique" component={StructureGeographique} />

    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-du-plan-geographique" component={PlanGeographiques} />
    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-du-plan-organisationnel" component={PlanOrganisationnel} />



    <MasterCodification2  path="/gestion_du_parc_automobile/les-couts-des-consommables" component={CoutConsommables} />
    <MasterCodification2  path="/gestion_du_parc_automobile/les-annees-budgetaires" component={AnneeBudgetaires} />

    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-de-la-structure-vehicule" component={StructureVehicules} />

    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-du-plan-vehicule" component={PlanVehicules} />



    <MasterCodification exact path="/gestion_du_parc_automobile/types_entites" component={TypeEntite}  />
    <MasterCodification exact path="/gestion_du_parc_automobile/categories_véhicules" component={CategorieVehicule} />
    <MasterCodification exact path="/gestion_du_parc_automobile/ajouter_categories_véhicules" component={AjouterCategorieVehicule} />
    <MasterCodification  path="/gestion_du_parc_automobile/categories_véhicules/:categorie_vehicule_id" component={ModifierCategorieVehicule} />
    <MasterCodification  path="/gestion_du_parc_automobile/marques_de_véhicules" component={Marques} />
    <MasterCodification  path="/gestion_du_parc_automobile/modeles_de_véhicules" component={ModelVehicules} />
    <MasterCodification  path="/gestion_du_parc_automobile/ajouter_modeles_de_véhicules" component={AjouterModelVehicule} />

    <MasterCodification  path="/gestion_du_parc_automobile/modeles-de-vehicules/:modele_id" component={ModifierModeleVehicule} />

    <MasterCodification  path="/gestion_du_parc_automobile/codes-incidents-vehicules" component={CodeIncident} />
    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-energies" component={NatureEnergie} />
    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-interventions" component={NatureInterventions} />
    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-operations-sur-interventions" component={operationInterventions} />
    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-consommations" component={NatureConsommations} />

    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-amendes" component={NatureAmendes} />
    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-sinistres" component={NatureSinistres} />
    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-depenses-et-recettes" component={NatureDepenseRecettes} />

    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-reservations-utilisations" component={NatureReservations} />

    <MasterCodification2  path="/gestion_du_parc_automobile/familles-des-pieces-detachees-et-consommables" component={FamillePieceDetache} />
    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-taxes" component={NatureTaxes} />


    <Master exact path="/gestion_du_parc_automobile/parc" component={Vehicules} />

  <Master path="/gestion_du_parc_automobile/creation-de-vehicule" component={AjouterVehicule} />
  <Master path="/gestion_du_parc_automobile/modification_vehicule/:vehicule_id" component={ModifierVehicule} />


  <Master path="/gestion_du_parc_automobile/parc/utilisations-vehicules/:vehicule_id/:imma" component={Utilisations} />
  <Master path="/gestion_du_parc_automobile/parc/modification-utilisation-vehicule/:vehicule_id/:imma/utilisation/:utilisation_id" component={ModifierUtilisationVehicule} />


  <Master path="/gestion_du_parc_automobile/parc/interventions-vehicules/:vehicule_id/:imma" component={Interventions} />
  <Master path="/gestion_du_parc_automobile/parc/creation-interventions-vehicules/:vehicule_id/:imma" component={AjouterIntervention} />
  <Master path="/gestion_du_parc_automobile/parc/modification-interventions-vehicules/:vehicule_id/:imma/intervention/:intervention_id" component={ModifierIntervention} />
  <Master path="/gestion_du_parc_automobile/parc/consommations-vehicules/:vehicule_id/:imma" component={Consommations} />
  <Master path="/gestion_du_parc_automobile/parc/creation-consommations-vehicules/:vehicule_id/:imma" component={AjouterConsommation} />
  <Master path="/gestion_du_parc_automobile/parc/modification-consommations-vehicules/:vehicule_id/:imma/consommation/:consommation_id" component={ModifierConsommation} />
  <Master path="/gestion_du_parc_automobile/parc/amendes-vehicules/:vehicule_id/:imma" component={Amendes} />
  <Master path="/gestion_du_parc_automobile/parc/creation-amendes-vehicules/:vehicule_id/:imma" component={AjouterAmende} />
  <Master path="/gestion_du_parc_automobile/parc/modification-amendes-vehicules/:vehicule_id/:imma/amende/:amende_id" component={ModifierAmende} />
  <Master path="/gestion_du_parc_automobile/parc/budgets-vehicules/:vehicule_id/:imma" component={BudgetVehicules} />
  <Master path="/gestion_du_parc_automobile/parc/creation-budget-vehicules/:vehicule_id/:imma" component={AjouterBudgetVehicule} />
  <Master path="/gestion_du_parc_automobile/parc/modification-budget-vehicules/:vehicule_id/:imma/budget-vehicule/:budgetVehicule_id" component={ModifierBudgetVehicule} />

  <Master path="/gestion_du_parc_automobile/parc/reservation-vehicules/:vehicule_id/:imma" component={Reservations} />
  <Master path="/gestion_du_parc_automobile/parc/creation-reservation-vehicules/:vehicule_id/:imma" component={AjouterReservation} />
  <Master exact path="/gestion_du_parc_automobile/parc/creation-reservation-vehicules-via-ordre-mission/:vehicule_id/:imma/:ordre_mission_id" component={AjouterReservation} />

  <Master path="/gestion_du_parc_automobile/parc/contrat_assurance_de_vehicule/:vehicule_id/:imma" component={ContratAssuranceVehicule} />
  <Master path="/gestion_du_parc_automobile/parc/modification-reservation-vehicule/:vehicule_id/:imma/reservation/:reservation_id" component={ModifierReservation} />


  <Master path="/gestion_du_parc_automobile/parc/journal_evenement/:vehicule_id/:imma" component={Tracabilites} />



  <Master path="/gestion_du_parc_automobile/parc/depense-recettes-vehicules/:vehicule_id/:imma" component={DepenseRecettes} />
  <Master path="/gestion_du_parc_automobile/parc/creation-depense-recettes-vehicules/:vehicule_id/:imma" component={AjouterDepenseRecette} />

  <Master path="/gestion_du_parc_automobile/parc/modification-depense-recettes-vehicules/:vehicule_id/:imma/dr/:depense_recette_id" component={ModifierDepenseRecette} />

  <Master path="/gestion_du_parc_automobile/parc/filtre_vehicules" component={FiltreVehicules} />
  <Master path="/gestion_du_parc_automobile/parc/fiche_vehicules" component={FicheVehicule} />


  <MasterGestion path="/gestion_du_parc_automobile/parc/budgets-entites" component={BudgetEntites} />

  <MasterGestion path="/gestion_du_parc_automobile/parc/creation-budget-entites" component={AjouterBudgetEntite} />

  <MasterGestion path="/gestion_du_parc_automobile/parc/modification-budget-entites/:budget_entite_id" component={ModifierBudgetEntite} />
  <MasterGestion path="/gestion_du_parc_automobile/gestion-des-contrats-assurances" component={ContratAssurances} />
  <MasterGestion path="/gestion_du_parc_automobile/creation-contrat-assurance" component={AjouterContratAssurance} />
  <MasterGestion path="/gestion_du_parc_automobile/modification-contrat-assurance/:contrat_assurance_id" component={ModifierContratAssurance} />

  <MasterGestion path="/gestion_du_parc_automobile/gestion-des-commandes" component={Commandes} />
  <MasterGestion path="/gestion_du_parc_automobile/creation-commande" component={AjouterCommande} />
  <MasterGestion path="/gestion_du_parc_automobile/modification-commande/:commande_id" component={ModifierCommande} />

  <MasterGestion path="/gestion_du_parc_automobile/gestion-des-ordres-de-missions" component={Missions} />
  <MasterGestion path="/gestion_du_parc_automobile/ajouter-des-ordres-de-missions" component={AjouterMission} />
  <MasterGestion path="/gestion_du_parc_automobile/modification-ordre-de-mission/:mission_id" component={ModifierMission} />

  <MasterGestion exact path="/gestion_du_parc_automobile/gestion-des-articles" component={Articles} />
  <MasterGestion exact path="/gestion_du_parc_automobile/ajouter-article" component={AjouterArticle} />
  <MasterGestion exact path="/gestion_du_parc_automobile/modification-article/:article_id" component={ModifierArticle} />
  <MasterGestion exact path="/gestion_du_parc_automobile/entrees-stock/:article_id/article/:numero_article" component={EntreeStocks} />
  <MasterGestion exact path="/gestion_du_parc_automobile/entrees-stock/:article_id/article/:numero_article/ajout" component={AjouterEntreeStock} />
  <MasterGestion exact path="/gestion_du_parc_automobile/entrees-stock/:article_id/article/:numero_article/edit/:entree_stock_id" component={ModifierEntreeStock} />

  <MasterGestion exact path="/gestion_du_parc_automobile/gestion-des-reservations-all" component={ReservationsGeneral} />
  <MasterGestion exact path="/gestion_du_parc_automobile/creation-reservation-vehicules-general" component={AjouterReservationGeneral} />
  <MasterGestion exact path="/gestion_du_parc_automobile/modification-reservation-vehicules-general/:reservation_id" component={ModifierReservationGeneral} />

  <MasterGestion exact path="/gestion_du_parc_automobile/gestion-des-utilisations-all" component={UtilisationGenerals} />

  <MasterGestion exact path="/gestion_du_parc_automobile/parc/modification-utilisation-vehicule-all/utilisation/:utilisation_id" component={ModifierUtilisationGeneral} />

  <MasterGestion exact path="/gestion_du_parc_automobile/sorties-stock/:article_id/article/:numero_article" component={SortieStock} />
  <MasterGestion exact path="/gestion_du_parc_automobile/sorties-stock/:article_id/article/:numero_article/ajout" component={AjouterSortieStock} />
  <MasterGestion exact path="/gestion_du_parc_automobile/sorties-stock/:article_id/article/:numero_article/edit/:sortie_stock_id" component={ModifierSortieStock} />


{/*  cette partie concerne les etats  */}
  <MasterEdition path="/gestion_du_parc_automobile/liste-etats" component={EditionListTable} />
  <MasterEdition path="/gestion_du_parc_automobile/conception-etat-vehicule" component={VehiculeEtatForm} />


  <MasterEdition path="/gestion_du_parc_automobile/edition-vehicules" component={VehiculesEtat} />
  <MasterEdition path="/gestion_du_parc_automobile/edition-utilisations-vehicules" component={UtilisationVehiculeEtat} />
  <MasterEdition path="/gestion_du_parc_automobile/edition-interventions-vehicules" component={InterventionVehiculeEtat} />
  <MasterEdition path="/gestion_du_parc_automobile/edition-consommations-vehicules" component={ConsommationVehiculeEtat} />
  <MasterEdition path="/gestion_du_parc_automobile/edition-reservations-vehicules" component={ReservationVehiculeEtat} />

{/*  fin de la partie qui concerne les etats  */}



  </Switch>
)

export default NavBack;
