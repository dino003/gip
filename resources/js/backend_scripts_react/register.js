

import React, { Component } from 'react'

import ReactDOM from 'react-dom';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormSubmitted: false
        }
    }
    

    render() {
        return (
          <React.Fragment>
         

        {this.state.isFormSubmitted ?
        <div className="col-md-12">
            <span >
                <em style={{color: 'red'}}> Configuration et préparation de vos données; Cette opération peut prendre quelques minutes.</em>
                <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Chargement...</span>
                    </div>
            </span>
        </div>
               :  <div className="col-md-6">
       <button disabled={this.state.isFormSubmitted} 
       type="submit"
        className="btn btn-primary">
           {this.state.isFormSubmitted ? 'Traitement en cours...' : 'Valider'}
       </button> 

   </div> }
          </React.Fragment>
        )
    }
}

ReactDOM.render(<Register />, document.getElementById('register_button_for_react'));

