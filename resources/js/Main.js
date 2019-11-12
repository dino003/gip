import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/Store'

import NavBack from './routes/Routes'


export default class Main extends Component {
    render() {
       // console.log(store.getState())

        return (
            <Router>
                <NavBack />
            </Router>    
        )
    }
}

let $app = document.querySelector('#react')

if($app) {
    ReactDOM.render( 
        <Provider store={store}>
            <Main />
        </Provider>
        , document.getElementById('react'))
}


