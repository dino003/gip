import React from 'react'
import {NavLink, Route} from 'react-router-dom'

import NavBar from './NavBar'
import SidebarCodifications2 from './SidebarCodifications2'

export default function MasterCodification2({component: Component, ...rest}) {
    return (
        <Route {...rest} render={matchProps => (
            <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
            <NavBar />
        <div className="app-main">
            <SidebarCodifications2 />
            <div className="app-main__outer "> 
            <Component {...matchProps} />

            </div>
            
        </div>

        </div>
        )} />
            
    )
}

