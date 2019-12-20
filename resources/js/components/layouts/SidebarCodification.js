import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

const active = {
    backgroundColor: 'orange'
}

export default class SidebarCodification extends Component {
    render() {
        return (
            <div className="app-sidebar sidebar-shadow">
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
                                <li className="app-sidebar__heading">Codifications</li>
                            

                                  
                                 
                                <li>
                                    <NavLink activeStyle={active} to="/gestion_du_parc_automobile/types_entites">
                                        <i className="metismenu-icon pe-7s-home"></i>
                                        Les Types D'entités
                                        <i className="metismenu-state-icon "></i>
                                    </NavLink>

                                </li>

                                <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/categories_véhicules">
                                            <i className="metismenu-icon pe-7s-car"></i>
                                                Catégories Véhicules
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active}  to="/gestion_du_parc_automobile/marques_de_véhicules">
                                            <i className="metismenu-icon pe-7s-safe"></i>
                                                Les Marques de véhicules
                                            </NavLink>
                                        </li>
                                        {/* <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/modeles_de_véhicules">
                                            <i className="metismenu-icon pe-7s-wallet"></i>
                                                Les Modeles de véhicules
                                            </NavLink>
                                        </li> */}
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/codes-incidents-vehicules">
                                            <i className="metismenu-icon pe-7s-target"></i>
                                                Les Codes incidents
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/natures-des-energies">
                                            <i className="metismenu-icon pe-7s-display2"></i>
                                                Les Natures d'énergies
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/natures-des-interventions">
                                            <i className="metismenu-icon pe-7s-edit"></i>
                                                Natures d'interventions
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/natures-des-operations-sur-interventions">
                                            <i className="metismenu-icon pe-7s-config"></i>
                                                Opérations des interventions
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/natures-des-consommations">
                                            <i className="metismenu-icon pe-7s-credit"></i>
                                                Natures des consommations
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/natures-des-amendes">
                                            <i className="metismenu-icon pe-7s-albums"></i>
                                                Natures des Amendes
                                            </NavLink>
                                        </li>
                                        <li >
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/natures-des-sinistres">
                                            <i className="metismenu-icon pe-7s-junk"></i>
                                                Natures des sinistres
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/natures-des-depenses-et-recettes">
                                            <i className="metismenu-icon pe-7s-note2"></i>
                                                Natures des dépenses et recettes
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/natures-des-reservations-utilisations">
                                            <i className="metismenu-icon pe-7s-tools"></i>
                                                Natures des réservations
                                            </NavLink>
                                        </li>
                                    
                                        

                               
                            
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}
