import React, { Component } from 'react'
import {connect} from 'react-redux'

 class MatriculeInput extends Component {
    render() {
    const { vehicule} = this.props
      if(vehicule){
        return (
            <input
            style={{width: '30%', color: 'red', fontSize: '2em'}}
               readOnly
            value={vehicule != undefined ?  vehicule.immatriculation :
                 this.props.text_attente ? this.props.text_attente : 'Chargement....' }
            type="text" className="form-control pull-right" />
        )
      }
    }
}

const mapStateToProps = state => {
    return {
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(MatriculeInput)
