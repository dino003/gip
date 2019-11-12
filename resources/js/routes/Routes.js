import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Master from '../components/layouts/Master'
import MasterParametre from '../components/layouts/MasterParametre'
import MasterCodification from '../components/layouts/MasterCodification'
import MasterGestion from '../components/layouts/MasterGestion'

import Dashboard from '../pages/Dashboard'
import ParametreGeneraux from '../pages/ParametreGeneraux'
import TypeEntite from '../pages/codifications/TypeEntite'
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
import Dash from '../pages/Vehicules';
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



const NavBack = () => (
  <Switch>
   {/*  <Route exact path="/" component={Dashboard} /> */}
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







    <MasterParametre exact path="/gestion_du_parc_automobile/gestion-de-la-structure-etablissement" component={StructureEtablissement} />
    <MasterParametre  path="/gestion_du_parc_automobile/les-couts-des-consommables" component={CoutConsommables} />
    <MasterParametre  path="/gestion_du_parc_automobile/les-annees-budgetaires" component={AnneeBudgetaires} />





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

    <MasterCodification  path="/gestion_du_parc_automobile/familles-des-pieces-detachees-et-consommables" component={FamillePieceDetache} />
    <MasterCodification  path="/gestion_du_parc_automobile/natures-des-taxes" component={NatureTaxes} />


    <Master exact path="/gestion_du_parc_automobile/parc" component={Dash} />

  <Master path="/gestion_du_parc_automobile/creation-de-vehicule" component={AjouterVehicule} />

  <Master path="/gestion_du_parc_automobile/parc/utilisations-vehicules/:vehicule_id/:imma" component={Utilisations} />
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



  <Master path="/gestion_du_parc_automobile/parc/depense-recettes-vehicules/:vehicule_id/:imma" component={DepenseRecettes} />
  <Master path="/gestion_du_parc_automobile/parc/creation-depense-recettes-vehicules/:vehicule_id/:imma" component={AjouterDepenseRecette} />

  <Master path="/gestion_du_parc_automobile/parc/modification-depense-recettes-vehicules/:vehicule_id/:imma/dr/:depense_recette_id" component={ModifierDepenseRecette} />
  <MasterGestion path="/gestion_du_parc_automobile/parc/budgets-entites" component={BudgetEntites} />

  <MasterGestion path="/gestion_du_parc_automobile/parc/creation-budget-entites" component={AjouterBudgetEntite} />
  
  <MasterGestion path="/gestion_du_parc_automobile/parc/modification-budget-entites/:budget_entite_id" component={ModifierBudgetEntite} />
  <MasterGestion path="/gestion_du_parc_automobile/gestion-des-contrats-assurances" component={ContratAssurances} />
  <MasterGestion path="/gestion_du_parc_automobile/creation-contrat-assurance" component={AjouterContratAssurance} />
  <MasterGestion path="/gestion_du_parc_automobile/modification-contrat-assurance/:contrat_assurance_id" component={ModifierContratAssurance} />

  <MasterGestion path="/gestion_du_parc_automobile/gestion-des-commandes" component={Commandes} />
  <MasterGestion path="/gestion_du_parc_automobile/creation-commande" component={AjouterCommande} />
  <MasterGestion path="/gestion_du_parc_automobile/modification-commande/:commande_id" component={ModifierCommande} />


    

  </Switch>
)

export default NavBack;