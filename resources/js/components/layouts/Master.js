import React from 'react'
import { Route} from 'react-router-dom'

import NavBar from './NavBar'
import NFooter from './NFooter'
import Sidebar from './Sidebar'


export default function Master({component: Component, ...rest}) {
    return (
        <Route {...rest} render={matchProps => (
          
            <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar">
            <NavBar />
        <div className="app-main">
            <Sidebar />
            <div className="app-main__outer "> 
            <Component {...matchProps} />

            </div>
            
        </div>

        </div>


        )} />
            
    )
}

