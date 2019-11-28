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
import EtablissementInforeducer from './parametres_generaux/EtablissementInforeducer'

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
    info_societe: EtablissementInforeducer
})


export default allReducers