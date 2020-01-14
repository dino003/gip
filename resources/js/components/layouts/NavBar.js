import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


var housecall = require('housecall');

var queue = housecall({ concurrency: 2, cooldown: 1000 });



// This request will not start until 1000 ms after the above.


 class NavBar extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            navVisible: true
        }
    }

    fetchTheme(){
        queue.push(() => axios.get('/api/theme_defaut').then((response) => {
            
            const action = {type: "GET_THEME", value: response.data}
            this.props.dispatch(action)
        }));
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




    enregistrerStructureSiVide = async () => {
        if(!this.props.structures_etablissements.length){
            await axios.post('/api/ajouter_structure_etablissement_si_vide', 
            {
                code_regroupement: 'SIEGE',
                nom_regroupement: 'SIEGE ETABLISSEMENT'
         }
         ).then(response => {
              const action = {type: "ADD_STRUCTURE_ETABLISSEMENT", value: response.data}
              this.props.dispatch(action)
        
         })
          .catch(error => {
             console.log(error)
          } );
        }
      
    }

    enregistrerPersonnelSiVide = () => {
         
           if(!this.props.personnels.length){
            axios.post('/api/ajouter_personnel_si_vide', {
                nom: 'PERSONNE PAR DEFAUT',
                default: true,
                personne_prioritaire: true,
              //  entite_affectation: this.entite_affectation.value,
               // nom_entite_affectation: this.nom_entite_affectation.value,
            }).then(response => {
                
               const action = {type: "ADD_PERSONNEL", value: response.data}
               this.props.dispatch(action)
            }).catch(error => {
                 console.log(error) } )
           }
      }

      async ajoutertypeEntiteSiVide(){

        if(!this.props.types_entites.length){
          await axios.post('/api/ajouter_type_entite_si_vide', {
                type_entite: 'SIEGE'
            }).then(response => {
                const action = {type: "ADD_TYPE_ENTITE", value: response.data}
                this.props.dispatch(action)
            }).catch(error => console.log(error))
    
        }

    } 

    async ajouterFournisseursiVide(){

        if(!this.props.tiers.length){
        
              axios.post('/api/ajouter_tier_si_vide', {
                  code: 'FOURNISSEUR PAR DEFAUT',
                
              })
              .then(response => {
                 const action = {type: "ADD_TIER", value: response.data}
                   this.props.dispatch(action)
            
               
              }).catch(error => {
                   console.log(error) } )
             
        }

    } 

 

 
    
   

    componentDidMount(){
      

        // debut navbar

        // this.fetchCodeIncidents()
        // this.fetchNatureEnergies();

        // this.fetchNatureSinistres();

        // this.fetchNatureTaxes();

        // this.fetchNatureAmendes();
        // this.fetchOrdresMissions();

        // this.fetchInfoParamGenerauxPersonnels();
        // this.fetchInfoParamGenerauxJournal();
        // this.fetchInfoParamGenerauxStock();
        // this.fetchTypeEntites()
        // this.fetchTva();
        // this.fetchStructures()

        // this.fetchDepenseRecettes();
        // this.fetchAmendes();
        // this.fetchBudgetVehicules();

        // this.fetchCommandes();
        // this.fetchUtilisations();
        // this.fetchBudgetEntites();
        // this.fetchInterventions();
        // this.fetchConsommations();
        // this.fetchModeleVehicules();
        // this.fetchAnneesBudgetaires();
        // this.fetchArticlesStock();
        // this.fetchEntreesStock();
        // this.fetchSortiesStock();

        // // fin navbar

        // this.fetchTheme();
        // this.fetchInfoSociete();
        // this.fetchInfoParamGenerauxReservationOrdre();
        // this.fetchUtilisateurs();

        // this.fetchInfoAlerte();
        // this.fetchInfoParamGenerauxModules();
      
        // this.fetchCategories_vehicules();
        // this.fetchMarques()
        // this.fetchEntites();
        // this.fetchPersonnels();
        // this.fetchTiers();
        // this.fetchContratAssurances();
       
        // this.fetchNatureInterventions();
        // this.fetchOperationInterventions();
        // this.fetchNatureConsommations();
        // this.fetchReservation();
       

        // this.fetchNatureDepenseRecettes();
        // this.fetchNatureReservations();
        // this.fetchFamillePiecesdetachees();
        // this.fetchCoutConsommables();
      


        // this.fetchVehicules();


    }

    toggleVisible = () => {
        this.setState(prevState => {
            return {
                navVisible: !prevState.navVisible
            }
        })
    }

 
    
    render() {
        return (
                 <div className={this.props.theme && this.props.theme.navbar ? `${this.props.theme.navbar}` : 'app-header header-shadow bg-night-sky header-text-light'}>
 
            <div className="app-header__logo">
                <div className="logo-src"></div>
                <div className="header__pane ml-auto">
                    <div>
                        <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </button>
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>   
             <div className="app-header__content">
                <div className="app-header-left">
                    {/* <div className={this.state.navVisible ? "search-wrapper" : "search-wrapper active"}>
                        <div className="input-holder">
                            <input type="text" className="search-input" placeholder="Taper pour rechercher" />
                            <button onClick={this.toggleVisible} className={!this.state.navVisible ? "close" : "search-icon"}><span></span></button>
                        </div>
                        <button onClick={this.toggleVisible} className="close"></button>
                    </div> */}
                    <ul className="header-menu nav">
                        {/*
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-link-icon fa fa-database"> </i>
                                Statistics
                            </a>
                        </li>
                        <li className="btn-group nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-link-icon fa fa-edit"></i>
                                Projects
                            </a>
                        </li>
                         */}
                            <li className="dropdown nav-item">
                            <Link to="/gestion_du_parc_automobile/gestions" className="nav-link">
                                <i className="nav-link-icon fa fa-tools"></i>
                                Gestion
                            </Link>
                        </li>

                        <li className="dropdown nav-item">
                            <Link to="/gestion_du_parc_automobile/parametres" className="nav-link">
                                <i className="nav-link-icon fa fa-cog"></i>
                                Paramètres
                            </Link>
                        </li>
                      

                     

                        <li className="dropdown nav-item">
                            <Link to="/gestion_du_parc_automobile/codifications_1" className="nav-link">
                                <i className="nav-link-icon fa fa-folder"></i>
                                Codifications (1)
                            </Link>
                        </li>

                        <li className="dropdown nav-item">
                            <Link to="/gestion_du_parc_automobile/codifications_2" className="nav-link">
                                <i className="nav-link-icon fa fa-folder"></i>
                                Codifications (2)
                            </Link>
                        </li>
                      


                        <li className="nav-item">
                        <Link to="/gestion_du_parc_automobile/liste-etats" className="nav-link">
                                <i className="nav-link-icon fa fa-database"> </i>
                                Editions
                            </Link>


                        </li>

                        <li className="dropdown nav-item">
                            <NavLink to="/gestion_du_parc_automobile/parc" className="nav-link">
                                <i className="nav-link-icon fa fa-car"></i>
                                Le parc
                            </NavLink>
                        </li>

                        
                        <li className="nav-item">
                        <span  className="nav-link" style={{ 'fontSize': '0.9em'}}>
                            {this.props.abonnement ? `${this.props.abonnement.nombre_de_jours_restant} Jours Restant(s)` : null}
                        </span>


                        </li>

                    </ul>        
                    </div>
                <div className="app-header-right">
                    <div className="header-btn-lg pr-0">
                        <div className="widget-content p-0">
                            <div className="widget-content-wrapper">
                                <div className="widget-content-left">
                                    <div className="btn-group">
                                        <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="p-0 btn">
                                            {/* <img width="42" className="rounded-circle" src="/assets/images/avatars/1.jpg" alt="" /> */}
                                            <i className="fa fa-angle-down ml-2 opacity-8"></i>
                                        </a>
                                        <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                            <button type="button" tabIndex="0" className="dropdown-item">User Account</button>
                                            <button type="button" tabIndex="0" className="dropdown-item">Settings</button>
                                            <h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                            <button type="button" tabIndex="0" className="dropdown-item">Actions</button>
                                            <div tabIndex="-1" className="dropdown-divider"></div>
                                            <button type="button" tabIndex="0" className="dropdown-item">Déconnexion</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-content-left  ml-3 header-user-info">
                                    <div className="widget-heading">
                                        {this.props.user.username.slice(0, 12)}
                                    </div>
                                    
                                    <div className="widget-subheading">
                                    {this.props.user.email.slice(0, 20)}
                                    </div>
                                </div>
                                {/* <div className="widget-content-right header-user-info ml-3">
                                    <button type="button" className="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
                                        <i className="fa text-white fa-calendar pr-1 pl-1"></i>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                    </div>        
                </div>
            </div>






        </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        personnels: state.personnels.items,
        structures_etablissements: state.structures_etablissements.items,
        tiers: state.tiers.items,
        types_entites: state.types_entites.items,
        theme: state.theme.items,
        abonnement: state.abonnement.abonnement


      
    }
  }

export default connect(mapStateToProps)(NavBar)
