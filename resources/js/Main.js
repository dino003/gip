import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/Store'

import NavBack from './routes/Routes'
import withSplashScreen from './components/withSplashScreen.jsx'


 class Main extends Component {
    render() {
       // console.log(store.getState())

        return (
            <Router>
                <NavBack />
            </Router>    
        )
    }
}

export default withSplashScreen(Main)

// let $app = document.querySelector('#react')

// if($app) {
//     ReactDOM.render( 
//         <Provider store={store}>
//             <Main />
//         </Provider>
//         , document.getElementById('react'))
// }


