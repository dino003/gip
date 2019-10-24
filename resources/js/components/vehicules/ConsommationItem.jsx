import React, { Component } from 'react'
import {connect} from 'react-redux'


 class ConsommationItem extends Component {

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
                   
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule.immatriculation || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.type_consomation ? item.type_consomation.nature_consomation : 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_conso || 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.conducteur ? item.conducteur.nom : 'Non Renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.quantite_consomee || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ttc || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_tva || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ht || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tiers ? item.tiers.code : 'Non Renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.libelle || 'Non renseigné'}</td>


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

export default connect(mapStateToProps)(ConsommationItem)
