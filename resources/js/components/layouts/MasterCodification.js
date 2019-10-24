import React from 'react'
import {NavLink, Route} from 'react-router-dom'

import NavBar from './NavBar'
import SidebarCodification from './SidebarCodification'

export default function MasterCodification({component: Component, ...rest}) {
    return (
        <Route {...rest} render={matchProps => (
            <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
            <NavBar />
        <div className="app-main">
            <SidebarCodification />
            <div className="app-main__outer "> 
            <Component {...matchProps} />

            </div>
            
        </div>

        </div>
        )} />
            
    )
}

