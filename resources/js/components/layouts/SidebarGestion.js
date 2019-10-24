import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

const active = {
    backgroundColor: 'orange'
}

export default class SidebarGestion extends Component {

    render() {
        return (
            <div className="app-sidebar sidebar-shadow ">
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
                                <li className="app-sidebar__heading">Gestion</li>
                            

                                  
                                 
                                <li>
                                    <NavLink activeStyle={active} exact to="/gestion_du_parc_automobile/parc">
                                        <i className="metismenu-icon pe-7s-home"></i>
                                        Le Parc de véhicule
                                        <i className="metismenu-state-icon "></i>
                                    </NavLink>

                                </li>

                             
                                        <li>
                                            <NavLink activeStyle={active}  to="/gestion_du_parc_automobile/gt">
                                            <i className="metismenu-icon pe-7s-safe"></i>
                                                Gestion des ordres de missions
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/gestion-des-contrats-assurances">
                                            <i className="metismenu-icon pe-7s-wallet"></i>
                                                Les Contrats d'assurances
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/r">
                                            <i className="metismenu-icon pe-7s-target"></i>
                                                Les Commandes
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink activeStyle={active} to="/gestion_du_parc_automobile/parc/budgets-entites">
                                            <i className="metismenu-icon pe-7s-display2"></i>
                                                Les Budgets des entités
                                            </NavLink>
                                        </li>

                                        
                           
                                        <li>
                                        <a href="#">
                                            <i className="metismenu-icon pe-7s-diamond"></i>
                                            Les Stocks de pièces
                                            <i className="metismenu-state-icon pe-7s-angle-down caret-left"></i>
                                        </a>
                                        <ul>
                                 
                                            <li>
                                                <a href="elements-buttons-standard.html">
                                                    <i className="metismenu-icon"></i>
                                                    Les Articles
                                                </a>
                                            </li>
                                            <li>
                                                <a href="elements-dropdowns.html">
                                                    <i className="metismenu-icon">
                                                    </i>Les Entrées en stock
                                                </a>
                                            </li>
                                            <li>
                                                <a href="elements-icons.html">
                                                    <i className="metismenu-icon">
                                                    </i>Les Sorties du stock
                                                </a>
                                            </li>
                                            <li>
                                                <a href="elements-badges-labels.html">
                                                    <i className="metismenu-icon">
                                                    </i>Les Commandes d'articles
                                                </a>
                                            </li>
                                        
                                        </ul>
                                    </li>
                                       

                                   
                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}
