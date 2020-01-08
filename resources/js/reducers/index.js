import {combineReducers} from 'redux'
import TypeEntiteReducer from './typeEntiteReducer'
import StructureEtablissementReducer from './StructureEtablissementReducer'
import EntitesReducer from './EntitesReducer'
import TiersReducer from './TiersReducers'
import PersonnelReducer from './PersonnelReducer'
import UtilisateurReducer from './UtilisateurReducer'
import CategorieVehiculeReducer from './CategorieVehiculeReducer'
import ModeleVehiculeReducer from './ModeleVehiculeReducer'
import MarqueReducer from './MarqueReducer'
import CodeIncidentReducer from './CodeIncidentReducer'
import NatureEnergieReducer from './NatureEnergieReducer'
import NatureInterventionReducer from './NatureInterventionReducer'
import OperationInterventionReducer from './OperationInterventionReducer'
import NatureConsommationReducer from './NatureConsommationReducer'
import NatureAmendesReducer from './NatureAmendesReducer'
import NatureSinistreReducer from './NatureSinistreReducer'
import NatureDepenseRecetteReducer from './NatureDepenseRecetteRecucer'
import NatureReservationReducer from './NatureReservationReducer'
import FamillePiecedetacheReducer from './FamillePieceDetacheReducer'
import NatureTaxeReducer from './NatureTaxeReducer'
import CoutConsommableReducer from './CoutConsommableReducer'
import VehiculeReducer from './vehicules/VehiculeReducer'
import VehiculeSelectReducer from './vehicules/VehiculeSelectReducer'
import InterventionReducer from './vehicules/InterventionsReducer'
import UtilisationReducer from './vehicules/UtilisationReducer'
import ConsommationReducer from './vehicules/ConsommationReducer'
import AmendeReducer from './vehicules/AmendeReducer'
import ReservationReducer from './vehicules/ReservationReducer'
import BudgetVehiculeReducer from './vehicules/BudgetVehiculeReducer'
import AnneeBudgetaireReducer from './AnneeBudgetaireReducer'
import DepenseRecetteReducer from './vehicules/DepenseRecetteReducer'
import TauxTvaReducer from './TauxTvaReducer'
import BudgetEntiteReducer from './BudgetEntiteReducer'
import ContratAssuranceReducer from './ContratAssuranceReducer'
import CommandesReducer from './CommandesReducer'
import EtablissementInfoReducer from './parametres_generaux/EtablissementInfoReducer'
import ParamGenerauxReserOrdreReducer from './parametres_generaux/ParamGenerauxReserOrdreReducer'
import MissionReducer from './MissionReducer'
import ArticleReducer from './ArticleReducer'
import EntreeStockReducer from './EntreeStockReducer'
import ArticleSelectReducer from './ArticleSelectReducer'
import SortieStockReducer from './SortieStockReducer'
import ModulesReducer from './parametres_generaux/ModulesReducer'
import ParamStockReducer from './parametres_generaux/ParamStockReducer'
import ParamPersonnelReducer from './parametres_generaux/ParamPersonnelReducer'
import ParamJournalReducer from './parametres_generaux/ParamJournalReducer'
import AlertReducer from './parametres_generaux/AlerteReducer'

const allReducers = combineReducers({
    types_entites: TypeEntiteReducer,
    structures_etablissements: StructureEtablissementReducer,
    entites: EntitesReducer,
    tiers: TiersReducer,
    personnels: PersonnelReducer,
    utilisateurs: UtilisateurReducer,
    categories_vehicules: CategorieVehiculeReducer,
    modeles_vehicules: ModeleVehiculeReducer,
    marques: MarqueReducer,
    code_incidents: CodeIncidentReducer,
    natures_energies: NatureEnergieReducer,
    natures_interventions: NatureInterventionReducer,
    natures_operation_interventions: OperationInterventionReducer,
    natures_consommations: NatureConsommationReducer,
    natures_amendes: NatureAmendesReducer,
    natures_sinistres: NatureSinistreReducer,
    natures_depense_recettes: NatureDepenseRecetteReducer,
    natures_reservations: NatureReservationReducer,
    famille_pieces_detaches: FamillePiecedetacheReducer,
    natures_taxes: NatureTaxeReducer,
    couts_consommables: CoutConsommableReducer,
    vehicules: VehiculeReducer,
    vehiculeSeleted: VehiculeSelectReducer,
    interventions: InterventionReducer,
    utilisations: UtilisationReducer,
    consommations: ConsommationReducer,
    amendes: AmendeReducer,
    reservations: ReservationReducer,
    budgetVehicules: BudgetVehiculeReducer,
    annees_budgetaires: AnneeBudgetaireReducer,
    depense_recettes: DepenseRecetteReducer,
    tva: TauxTvaReducer,
    budget_entites: BudgetEntiteReducer,
    contrat_assurances: ContratAssuranceReducer,
    commandes: CommandesReducer,
    missions: MissionReducer,
    articles: ArticleReducer,
    articleSelected: ArticleSelectReducer,
    entrees_stock: EntreeStockReducer,
    sorties_stock: SortieStockReducer,
    info_societe: EtablissementInfoReducer,
    param_generaux_reservation_ordre: ParamGenerauxReserOrdreReducer,
    param_generaux_modules: ModulesReducer,
    param_stock: ParamStockReducer,
    param_personnels: ParamPersonnelReducer,
    param_journal: ParamJournalReducer,
    param_alerte: AlertReducer
    
})


export default allReducers