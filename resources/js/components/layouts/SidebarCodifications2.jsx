import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


const active = {
    backgroundColor: 'orange'
}

 class SidebarCodifications2 extends Component {
    render() {
        return (
            <div className={this.props.theme && this.props.theme.sidebar ? `${this.props.theme.sidebar}` : 'app-sidebar sidebar-shadow'}>
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
                                <li className="app-sidebar__heading">Codifications (2)</li>










                            </ul>
                        </div>
                    </div>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {

        theme: state.theme.items


    }
  }

export default connect(mapStateToProps)(SidebarCodifications2)
