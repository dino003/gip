import React, {Component} from 'react';
//import auth0Client from '../Auth';
import './splash-screen.css';
import './splash.scss'
import {connect} from 'react-redux'
import {compose} from 'redux'
import store from '../store/Store'
var housecall = require('housecall');

var queue = housecall({ concurrency: 2, cooldown: 1000 });

const ProgressBar = (props) => {
    return (
        <div className="progress-bar">
          <Filler percentage={props.percentage} />
        </div>
      )
  }
  
  const Filler = (props) => {
    return <div className="filler"
  style={{ width: `${props.percentage}%` }} >
       <p style={{textAlign: 'center', fontSize: '0.2em'}}>{props.percentage == 100 ? 'Chargement terminé' : `${props.percentage} %`}</p> 
       </div>
  }



function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        percentage: 0

      };
    }

  

    fetchInfoSociete(){
        queue.push(() => axios.get('/api/infos_societe').then((response) => {
            
            const action = {type: "GET_INFO_SOCIETE", value: response.data}
            this.props.dispatch(action)
        }));
    } 

    fetchInfoParamGenerauxReservationOrdre(){
        queue.push(() => axios.get('/api/parametre_generaux_reservation_ordre').then((response) => {
            
            const action = {type: "GET_PARAM_GENERAUX_RESERV", value: response.data}
            this.props.dispatch(action)
        }));
    } 

    fetchInfoAlerte(){
        queue.push(() => axios.get('/api/alertes').then((response) => {
            
            const action = {type: "GET_PARAM_GENERAUX_ALERTE", value: response.data}
            this.props.dispatch(action)
        }));
    } 
    
    fetchInfoParamGenerauxModules(){
        queue.push(() => axios.get('/api/parametre_modules').then((response) => {
            
            const action = {type: "GET_PARAM_MODULE", value: response.data}
            this.props.dispatch(action)
        }));
    } 

    fetchInfoParamGenerauxPersonnels(){
        queue.push(() => axios.get('/api/parametre_personnels').then((response) => {
            
            const action = {type: "GET_PARAM_PERSONNEL", value: response.data}
            this.props.dispatch(action)
        }));
    } 

    fetchInfoParamGenerauxJournal(){
        queue.push(() => axios.get('/api/parametre_journal').then((response) => {
            
            const action = {type: "GET_PARAM_JOURNAL", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchInfoParamGenerauxStock(){
        queue.push(() => axios.get('/api/parametre_stocks').then((response) => {
            
            const action = {type: "GET_PARAM_STOCK", value: response.data}
            this.props.dispatch(action)
        }));
    } 

    fetchStructures(){
        queue.push(() => axios.get('/api/structures_etablissements').then((response) => {
            
            const action = {type: "GET_STRUCTURE_ETABLISSEMENT", value: response.data}
            this.props.dispatch(action)
        }));
    } 
    fetchTypeEntites(){
        queue.push(() => axios.get('/api/types_entites').then((response) => {
            
            const action = {type: "GET_TYPE_ENTITE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchModeleVehicules(){
        queue.push(() => axios.get('/api/modeles_vehicules').then((response) => {
            // The eventual response of Twitter	
            const action = {type: "GET_MODELE_VEHICULE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchUtilisateurs(){
        queue.push(() => { 

            axios.get('/api/users').then((response) => {
            // .
            const action = {type: "GET_UTILISATEUR", value: response.data}
            this.props.dispatch(action)
        }) }
        );
    }

    fetchTiers(){
        queue.push(() => axios.get('/api/tiers').then((response) => {
            // .
            const action = {type: "GET_TIER", value: response.data}
            this.props.dispatch(action)
        }));
    }  
    fetchPersonnels(){
        queue.push(() => axios.get('/api/personnels').then((response) => {
            // .
            const action = {type: "GET_PERSONNEL", value: response.data}
            this.props.dispatch(action)
        }));
    } 
    fetchEntites(){
        queue.push(() => axios.get('/api/entites').then((response) => {
            // .
            const action = {type: "GET_ENTITE", value: response.data}
            this.props.dispatch(action)
        }));
    } 
   
    fetchMarques(){
        queue.push(() => axios.get('/api/marques').then((response) => {
            // .
            const action = {type: "GET_MARQUE", value: response.data}
            this.props.dispatch(action)
        }));
    }
    fetchCategories_vehicules(){
        queue.push(() => axios.get('/api/categories_vehicules').then((response) => {
            // .
            const action = {type: "GET_CATEGORIE_VEHICULE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchOrdresMissions(){
        queue.push(() => axios.get('/api/ordre_missions').then((response) => {
            // .
            const action = {type: "GET_MISSION", value: response.data}
            this.props.dispatch(action)
        }));
    }
    
    fetchCodeIncidents(){
        queue.push(() => axios.get('/api/code_incidents').then((response) => {
            // .
            const action = {type: "GET_CODE_INCIDENT", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchNatureEnergies(){
        queue.push(() => axios.get('/api/nature_energies').then((response) => {
            // .
            const action = {type: "GET_NATURE_ENERGIE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchAnneesBudgetaires(){
        queue.push(() => axios.get('/api/annee_budgetaires').then((response) => {
            // .
            const action = {type: "GET_ANNEE_BUDGETAIRE", value: response.data}
            this.props.dispatch(action)
        }));
    }

       
    fetchNatureConsommations(){
        queue.push(() => axios.get('/api/nature_consommations').then((response) => {
            // .
            const action = {type: "GET_NATURE_CONSOMMATION", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchNatureInterventions(){
        queue.push(() => axios.get('/api/nature_interventions').then((response) => {
            // .
            const action = {type: "GET_NATURE_INTERVENTION", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchOperationInterventions(){
        queue.push(() => axios.get('/api/operation_intervention').then((response) => {
            // .
            const action = {type: "GET_OPERATION_INTERVENTION", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchNatureAmendes(){
        queue.push(() => axios.get('/api/nature_amendes').then((response) => {
            // .
            const action = {type: "GET_NATURE_AMENDE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchNatureSinistres(){
        queue.push(() => axios.get('/api/nature_sinistres').then((response) => {
            // .
            const action = {type: "GET_NATURE_SINISTRE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchNatureDepenseRecettes(){
        queue.push(() => axios.get('/api/nature_depense_recettes').then((response) => {
            // .
            const action = {type: "GET_NATURE_DEPENSE_RECETTE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchNatureReservations(){
        queue.push(() => axios.get('/api/nature_reservations').then((response) => {
            // .
            const action = {type: "GET_NATURE_RESERVATION", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchFamillePiecesdetachees(){
        queue.push(() => axios.get('/api/famille_pieces_detachees').then((response) => {
            // .
            const action = {type: "GET_FAMILLE_PIECE_DETACHEE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchNatureTaxes(){
        queue.push(() => axios.get('/api/nature_taxes').then((response) => {
            // .
            const action = {type: "GET_NATURE_TAXE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchCoutConsommables(){
        queue.push(() => axios.get('/api/couts_consomables').then((response) => {
            // .
            const action = {type: "GET_COUT_CONSOMMABLE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchInterventions(){
        queue.push(() => axios.get('/api/interventions').then((response) => {
            // .
            const action = {type: "GET_INTERVENTION", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchTva(){
        queue.push(() => axios.get('/api/taux_tvas').then((response) => {
            // .
            const action = {type: "GET_TVA", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchUtilisations(){
        queue.push(() => axios.get('/api/utilisations').then((response) => {
            // .
            const action = {type: "GET_UTILISATION", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchReservation(){
        queue.push(() => axios.get('/api/reservations').then((response) => {
            // .
            const action = {type: "GET_RESERVATION", value: response.data}
            this.props.dispatch(action)
        }));
    }
    

    fetchContratAssurances(){
        queue.push(() => axios.get('/api/contrat_assurances').then((response) => {
            // .
            const action = {type: "GET_CONTRAT_ASSURANCE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchConsommations(){
        queue.push(() => axios.get('/api/consommations').then((response) => {
            // .
            const action = {type: "GET_CONSOMMATION", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchCommandes(){
        queue.push(() => axios.get('/api/commandes').then((response) => {
            // .
            const action = {type: "GET_COMMANDE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchArticlesStock(){
        queue.push(() => axios.get('/api/articles_stock').then((response) => {
            // .
            const action = {type: "GET_ARTICLE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchEntreesStock(){
        queue.push(() => axios.get('/api/entrees_stock').then((response) => {
            // .
            const action = {type: "GET_ENTREE_STOCK", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchSortiesStock(){
        queue.push(() => axios.get('/api/sorties_stock').then((response) => {
            // .
            const action = {type: "GET_SORTIE_STOCK", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchAmendes(){
        queue.push(() => axios.get('/api/amendes').then((response) => {
            // .
            const action = {type: "GET_AMENDE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchBudgetEntites(){
        queue.push(() => axios.get('/api/budget_entites').then((response) => {
            // .
            const action = {type: "GET_BUDGET_ENTITE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchDepenseRecettes(){
        queue.push(() => axios.get('/api/depense_recettes').then((response) => {
            // .
            const action = {type: "GET_DR", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchBudgetVehicules(){
        queue.push(() => axios.get('/api/budget_vehicules').then((response) => {
            // .
            const action = {type: "GET_BUDGET_VEHICULE", value: response.data}
            this.props.dispatch(action)
        }));
    }

    fetchVehicules(){
        queue.push(() => axios.get('/api/vehicules').then((response) => {
            // .
            const action = {type: "GET_VEHICULE", value: response.data}
            this.props.dispatch(action)
        }
        )
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
      }

      tick() {
          if(this.state.percentage == 100) return
        this.setState({
          percentage: this.state.percentage += 2
        });
      }

    componentDidMount(){
     

       this.timerID = setInterval(
        () => this.tick(),
        1000
      );

         this.fetchInfoSociete();
         this.fetchInfoParamGenerauxReservationOrdre();
         this.fetchUtilisateurs();

         this.fetchInfoAlerte();
         this.fetchInfoParamGenerauxModules();
         this.fetchInfoParamGenerauxPersonnels();
         this.fetchInfoParamGenerauxJournal();
         this.fetchInfoParamGenerauxStock();
         this.fetchTypeEntites()
         this.fetchTva();
         this.fetchStructures()
         this.fetchAnneesBudgetaires();
         this.fetchCategories_vehicules();
         this.fetchMarques()
         this.fetchEntites();
         this.fetchPersonnels();
         this.fetchTiers();
         this.fetchContratAssurances();
         this.fetchModeleVehicules();
         this.fetchCodeIncidents()
         this.fetchNatureEnergies();
         this.fetchNatureInterventions();
         this.fetchOperationInterventions();
         this.fetchNatureConsommations();
         this.fetchReservation();
         this.fetchNatureAmendes();
         this.fetchOrdresMissions();
         this.fetchNatureSinistres();
         this.fetchNatureDepenseRecettes();
         this.fetchNatureReservations();
         this.fetchFamillePiecesdetachees();
         this.fetchNatureTaxes();
         this.fetchCoutConsommables();
         this.fetchUtilisations();
         this.fetchBudgetEntites();
         this.fetchInterventions();
         this.fetchConsommations();
         this.fetchCommandes();
         this.fetchArticlesStock();
         this.fetchEntreesStock();
         this.fetchSortiesStock();
         this.fetchDepenseRecettes();
         this.fetchAmendes();
         this.fetchBudgetVehicules();
         this.fetchVehicules();
 
     }

     

     LoadingMessage() {
        return (
          // <div className="splash-screen">
          //   Wait a moment while we load your app.
          //   <div className="loading-dot">...</div>
          // </div>
              <React.Fragment>
                    <div className="splash">
                      <div className="splash_logo">
                          AGOSOFTPARC <img src="/assets/images/log_princip.png" />
                      </div>
                      <div className="splash_svg">
                          <svg width="100%" height="100%" >
                          <rect width="100%" height="100%" />
                          </svg>
                      </div>
                      <div className="splash_minimize">
                          <svg width="100%" height="100%">
                          <rect width="100%" height="100%" />
                          </svg>
                      </div>
                      </div>
                  <div className="text">
                  {/* <p>Logiciel professionnel de gestion de parc automobile</p>
                      <p style={{fontSize: '0.6em'}}><img src="/assets/images/log_princip.png" /> By AGOSOFT  </p> */}

                   <p> <img src="/assets/images/theme.png" /></p>
                 
                  {/* <button>More</button> */}
                 {/* <marquee behavior="" direction="">AGOSOFTPARC est en cours de chargement</marquee> */}
                 <ProgressBar percentage={this.state.percentage} />

                  </div>
                  <div className="splash-screen">
                     <p style={{color: 'white'}}>Nous preparons les données de AGOPARCSOFT</p>
                       <div className="loading-dot">En cours de Chargement...</div>
                  </div>
              </React.Fragment>
        );
      }

    render() {
     if(this.props.user_id){
        var authUser = this.props.utilisateurs.find(user => user.id == this.props.user_id)
        if(authUser) {
            const action = {type: "GET_AUTH", value: authUser}
            this.props.dispatch(action)
        }
        }
      if (!store.getState().vehicules.items) return this.LoadingMessage();
        // console.log(this.props)
      // otherwise, show the desired route
      return <WrappedComponent {...this.props} />;
    }
  };
}

//export default withSplashScreen;

const mapStateToProps = state => {
    return {
        vehicules: state.vehicules.items,
        utilisateurs: state.utilisateurs.items
      
    }
  }

  const composeField = compose(
      connect(mapStateToProps, null),
      withSplashScreen
  )

 export default composeField