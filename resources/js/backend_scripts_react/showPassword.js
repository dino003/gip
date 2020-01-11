import React, { Component } from 'react'

import ReactDOM from 'react-dom';


export default class ShowPassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isPassword: true
        }

        this.toggleVisible = this.toggleVisible.bind(this)
    }

    changeVisibility() {

        var pass = document.querySelector("#password");
        var passConf = document.querySelector("#password-confirm");

        
        if(this.state.isPassword){
            pass.setAttribute("type", "password");
            passConf.setAttribute("type", "password");

        }else{
            pass.setAttribute("type", "text");
            passConf.setAttribute("type", "text");

        }


    }

    toggleVisible(){
        this.setState({
            isPassword: !this.state.isPassword
        }, () => this.changeVisibility())
    }
    

    render() {
        const { isPassword} = this.state
        return (
            
        <span onClick={this.toggleVisible} style={{cursor: 'pointer'}} className={isPassword ? 'input-group-text btn btn-success lnr lnr-eye' : 'input-group-text btn btn-info lnr lnr-lock'}> {!isPassword ? 'Masquer' : 'Voir'}</span>
      
        )
    }
}

ReactDOM.render(<ShowPassword />, document.getElementById('btn_show_register_password_react'));

