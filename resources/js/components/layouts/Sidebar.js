import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


const active = {
    backgroundColor: 'orange'
}

 class Sidebar extends Component {
    render() {
        const {vehiculeSeleted} = this.props
        return (
            <div className="app-sidebar sidebar-shadow ">
                {/*             <div className="app-sidebar sidebar-shadow bg-asteroid sidebar-text-light">
 */}
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
                     <div className="scrollbar-sidebar">
                        <div className="app-sidebar__inner">
                            <ul className="vertical-nav-menu">
                                <li className="app-sidebar__heading">Gestion du parc</li>

                                <li>
        

                                     <NavLink exact activeStyle={active} 
                                    to={{
                                        pathname: '/gestion_du_parc_automobile/parc',
                                        state: { veh: this.props.vehiculeSeleted }
                                    }}
                                        >
                                        <i className="metismenu-icon pe-7s-car"></i>
                                        Les Véhicules
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> 
                                </li>
                                <li>
        

                                    {this.props.vehiculeSeleted != undefined ?  <NavLink exact activeStyle={active} 
                                     to={{
                                        pathname: `/gestion_du_parc_automobile/parc/utilisations-vehicules/${vehiculeSeleted.id}/${vehiculeSeleted.immatriculation}`,
                                        state: { veh: this.props.vehiculeSeleted }
                                      }}
                                        >
                                        <i className="metismenu-icon pe-7s-menu"></i>
                                        Utilisations
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> :  <a disabled title="Le lien est désactivé, veuillez sélectionner un véhicule">
                                        <i className="metismenu-icon pe-7s-home"></i>
                                        Utilisations
                                        <i className="metismenu-state-icon "></i>

                                    </a> } 
                                </li>
                                <li>

                                    {this.props.vehiculeSeleted != undefined ?  <NavLink exact activeStyle={active} 
                                    to={{
                                        pathname: `/gestion_du_parc_automobile/parc/interventions-vehicules/${vehiculeSeleted.id}/${vehiculeSeleted.immatriculation}`,
                                        state: { veh: this.props.vehiculeSeleted }
                                      }}
                                    >
                                        <i className="metismenu-icon pe-7s-date"></i>
                                        Interventions
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> :  <a disabled title="Le lien est désactivé, veuillez sélectionner un véhicule">
                                        <i className="metismenu-icon pe-7s-date"></i>
                                        Interventions
                                        <i className="metismenu-state-icon "></i>

                                    </a> }
                                </li>
                                <li>
                                   

                                    {this.props.vehiculeSeleted != undefined ?  <NavLink exact activeStyle={active}
                                      to={{
                                        pathname: `/gestion_du_parc_automobile/parc/consommations-vehicules/${vehiculeSeleted.id}/${vehiculeSeleted.immatriculation}`,
                                        state: { veh: this.props.vehiculeSeleted }
                                      }}
                                     >
                                        <i className="metismenu-icon pe-7s-monitor"></i>
                                        Consommations
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> :  <a disabled title="Le lien est désactivé, veuillez sélectionner un véhicule">
                                        <i className="metismenu-icon pe-7s-monitor"></i>
                                        Consommations
                                        <i className="metismenu-state-icon "></i>

                                    </a> }
                                </li>
                                <li >
                                  
                                
                                    {this.props.vehiculeSeleted != undefined ?  <NavLink exact activeStyle={active} 
                                         to={{
                                            pathname: `/gestion_du_parc_automobile/parc/amendes-vehicules/${vehiculeSeleted.id}/${vehiculeSeleted.immatriculation}`,
                                            state: { veh: this.props.vehiculeSeleted }
                                          }}
                                    >
                                        <i className="metismenu-icon pe-7s-rocket"></i>
                                        Amendes
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> :  <a disabled title="Le lien est désactivé, veuillez sélectionner un véhicule">
                                        <i className="metismenu-icon pe-7s-rocket"></i>
                                        Amendes
                                        <i className="metismenu-state-icon "></i>

                                    </a> }
                                </li>
                                <li>
                                  

                                    {this.props.vehiculeSeleted != undefined ? (this.props.vehiculeSeleted.type_vehicule_statut == 'Fonction' ? 
                              <a disabled title="Vous ne pouvez pas réserver un véhicule de fonction">
                                        <i className="metismenu-icon pe-7s-repeat"></i>
                                        Réservations
                                        <i className="metismenu-state-icon "></i>

                                    </a>: <NavLink exact activeStyle={active} 
                                     to={{
                                        pathname: `/gestion_du_parc_automobile/parc/reservation-vehicules/${vehiculeSeleted.id}/${vehiculeSeleted.immatriculation}`,
                                        state: { veh: this.props.vehiculeSeleted }
                                      }}
                                     >
                                        <i className="metismenu-icon pe-7s-repeat"></i>
                                        Réservations
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> ) :  <a disabled title="Le lien est désactivé, veuillez sélectionner un véhicule">
                                        <i className="metismenu-icon pe-7s-repeat"></i>
                                        Réservations
                                        <i className="metismenu-state-icon "></i>

                                    </a> }
                                </li>
                                <li>

                                    {this.props.vehiculeSeleted != undefined ?  <NavLink exact activeStyle={active} 
                                    to={{
                                        pathname: `/gestion_du_parc_automobile/parc/budgets-vehicules/${vehiculeSeleted.id}/${vehiculeSeleted.immatriculation}`,
                                        state: { veh: this.props.vehiculeSeleted }
                                      }}
                                    >
                                        <i className="metismenu-icon pe-7s-tools"></i>
                                        Budgets Véhicules 
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> :  <a disabled title="Le lien est désactivé, veuillez sélectionner un véhicule">
                                        <i className="metismenu-icon pe-7s-tools"></i>
                                        Budgets Véhicules
                                        <i className="metismenu-state-icon "></i>

                                    </a> }
                                </li>
                                <li>
                                  

                                    {this.props.vehiculeSeleted != undefined ?  <NavLink exact activeStyle={active} 
                                    to={{
                                        pathname: `/gestion_du_parc_automobile/parc/depense-recettes-vehicules/${vehiculeSeleted.id}/${vehiculeSeleted.immatriculation}`,
                                        state: { veh: this.props.vehiculeSeleted }
                                      }}
                                    >
                                        <i className="metismenu-icon pe-7s-graph3"></i>
                                        Dépenses 
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> :  <a disabled title="Le lien est désactivé, veuillez sélectionner un véhicule">
                                        <i className="metismenu-icon pe-7s-graph3"></i>
                                        Dépenses
                                        <i className="metismenu-state-icon "></i>

                                    </a> }
                                </li>

                                <li>
                                

                                    {this.props.vehiculeSeleted != undefined ?  <NavLink exact activeStyle={active} to="/contrat">
                                        <i className="metismenu-icon pe-7s-note2"></i>
                                        Contrats Assurances
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> :  <a disabled title="Le lien est désactivé, veuillez sélectionner un véhicule">
                                        <i className="metismenu-icon pe-7s-note2"></i>
                                        Contrats Assurances
                                        <i className="metismenu-state-icon "></i>

                                    </a> }
                                </li>
                               
                                <li>

                                    {this.props.vehiculeSeleted != undefined ?  <NavLink exact activeStyle={active} to="/sinistre">
                                        <i className="metismenu-icon pe-7s-rocket"></i>
                                        Sinistres
                                        <i className="metismenu-state-icon "></i>

                                    </NavLink> :  <a disabled title="Le lien est désactivé, veuillez sélectionner un véhicule">
                                        <i className="metismenu-icon pe-7s-rocket"></i>
                                        Sinistres
                                        <i className="metismenu-state-icon "></i>

                                    </a> }
                                </li>
                               

                                  
                              
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(Sidebar)
