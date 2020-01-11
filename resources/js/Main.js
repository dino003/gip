import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom';
// import store from './store/Store'
import {compose} from 'redux'
import {connect} from 'react-redux'



import NavBack from './routes/Routes'
import withSplashScreen from './components/withSplashScreen.jsx'


 class Main extends Component {

    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
        // console.log(this.props)
        // if(this.props.user_id){

        // }
    }
    

    render() {
       // console.log(store.getState())

        return (
            <Router>
                <NavBack />
            </Router>    
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         user: state.auth.user
      
//     }
//   }

//   const composeField = compose(
//       connect(mapStateToProps, null),
//       withSplashScreen
//   )

export default withSplashScreen(Main)

// let $app = document.querySelector('#react')

// if($app) {
//     ReactDOM.render( 
//         <Provider store={store}>
//             <Main />
//         </Provider>
//         , document.getElementById('react'))
// }


