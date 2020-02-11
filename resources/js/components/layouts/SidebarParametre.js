import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'

const active = {
    backgroundColor: 'orange'
}

 class SidebarParametre extends Component {

    render() {
        return (
            <div className={this.props.theme && this.props.theme.sidebar ? `${this.props.theme.sidebar}` : 'app-sidebar sidebar-shadow'}>
            {/*             <div className="app-sidebar sidebar-shadow bg-asteroid sidebar-text-light">
*/}                    <div className="app-header__logo">
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
                                <li className="app-sidebar__heading">Paramètres</li>




                                <li>
                                    <NavLink activeStyle={active} to="/gestion_du_parc_automobile/parametres_generaux">
                                        <i className="metismenu-icon pe-7s-settings"></i>
                                        Paramètres généraux
                                        <i className="metismenu-state-icon "></i>
                                    </NavLink>

                                </li>

                                         <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/les-annees-budgetaires">
                                            <i className="metismenu-icon pe-7s-display2"></i>
                                                Les Exercices Budgétaires
                                            </NavLink>
                                        </li>


                                        <li>
                                            <NavLink activeStyle={active}  to="/gestion_du_parc_automobile/gestion-de-la-structure-geographique">
                                            <i className="metismenu-icon pe-7s-safe"></i>
                                             Structure Géographique
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink activeStyle={active}  to="/gestion_du_parc_automobile/gestion-de-la-structure-organisationelle">
                                            <i className="metismenu-icon pe-7s-safe"></i>
                                             Structure Organisationnelle
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink activeStyle={active}  to="/gestion_du_parc_automobile/gestion-de-la-structure-vehicule">
                                            <i className="metismenu-icon pe-7s-safe"></i>
                                             Structure Véhicule
                                            </NavLink>
                                        </li>


                                    {this.props.structure_vehicules.length ?
                                        <li>
                                            <NavLink activeStyle={active}  to="/gestion_du_parc_automobile/gestion-du-plan-vehicule">
                                            <i className="metismenu-icon pe-7s-safe"></i>
                                             Plan des Véhicules
                                            </NavLink>
                                        </li> : null }

                                    {this.props.structure_geographiques.length ?
                                        <li>
                                            <NavLink activeStyle={active}  to="/gestion_du_parc_automobile/gestion-du-plan-geographique">
                                            <i className="metismenu-icon pe-7s-safe"></i>
                                             Plan Géographique
                                            </NavLink>
                                        </li> : null }
                                     {this.props.structure_organisationnelles.length ?
                                        <li>
                                            <NavLink activeStyle={active}  to="/gestion_du_parc_automobile/gestion-du-plan-organisationnel">
                                            <i className="metismenu-icon pe-7s-safe"></i>
                                             Plan Organisationnel
                                            </NavLink>
                                        </li> : null}


                                      {/*   <li>
                                            <NavLink activeStyle={active}  to="/gestion_du_parc_automobile/gestion-de-la-structure-etablissement">
                                            <i className="metismenu-icon pe-7s-safe"></i>
                                                La Structure Etablissement
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/gestion-des-entites">
                                            <i className="metismenu-icon pe-7s-wallet"></i>
                                                Les Entités
                                            </NavLink>
                                        </li> */}

                                        {/* <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/gestion-des-messages">
                                            <i className="metismenu-icon pe-7s-wallet"></i>
                                                Les Messages
                                            </NavLink>
                                        </li> */}
                                        {/* <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/r">
                                            <i className="metismenu-icon pe-7s-target"></i>
                                                Les Models de documents
                                            </NavLink>
                                        </li> */}



                                        <li className="app-sidebar__heading">Les Acteurs</li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/gestion-des-utilisateurs">
                                            <i className="metismenu-icon pe-7s-add-user"></i>
                                                Les Utilisateurs
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/gestion_du_personnel">
                                            <i className="metismenu-icon pe-7s-users"></i>
                                                Le Personnel
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/gestion-des-tiers">
                                            <i className="metismenu-icon pe-7s-news-paper"></i>
                                                Les Tiers
                                            </NavLink>
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

        theme: state.theme.items,
        structure_organisationnelles: state.structure_organisationnelles.items,
        structure_geographiques: state.structure_geographiques.items,
        structure_vehicules: state.structure_vehicules.items,


    }
  }

export default connect(mapStateToProps)(SidebarParametre)
