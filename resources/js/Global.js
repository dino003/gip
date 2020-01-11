import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/Store'
import Main from './Main'

// import NavBack from './routes/Routes'
// import withSplashScreen from './components/withSplashScreen.jsx'

// let $app = document.querySelector('#react')

// const props = Object.assign({}, $element.dataset)


// if($app) {
//     ReactDOM.render( 
//         <Provider store={store}>
//             <Main />
//         </Provider>
//         , document.getElementById('react'))
// }

if (document.getElementById('react')) {
    // find element by id
    const element = document.getElementById('react')
      
    // create new props object with element's data-attributes
    // result: {tsId: "1241"}
    const props = Object.assign({}, element.dataset)

    // render element with props (using spread)
    ReactDOM.render(<Provider store={store}>
        <Main {...props} />
    </Provider>, element);
}