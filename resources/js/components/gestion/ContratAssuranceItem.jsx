import React, { Component } from 'react'
import {connect} from 'react-redux'

 class ContratAssuranceItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }
        
    }


   
    render() {

        const {item, index} = this.props

        return (
            
             <tr > 
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule ?  item.vehicule.entite_physique.entite : ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule ? item.vehicule.immatriculation : 'Tous'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_contrat_police || 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.compagnie_assurance ? item.compagnie_assurance.code : 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_contrat || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_prise_effet || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.periode_date_debut  || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.periode_date_fin  || 'Non renseigné'}</td>

            <td>

                <span className="pull-right">
                    <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                    <i className="fa fa-trash"></i>
                </button>
              
                </span>
        </td>
            


        </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(ContratAssuranceItem)
