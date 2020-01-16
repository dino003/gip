import React, { Component } from 'react'
import moment from 'moment'
import {formatageSomme} from '../../utils/Repository'


export default class DepenseRecetteItem extends Component {

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
                <td onDoubleClick={this.props.onEdit.bind(this, item.id)}> {item.vehicule.entite_physique ?  item.vehicule.entite_physique.entite : ''}</td>
 
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule ? item.vehicule.immatriculation : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nature ? item.nature.nature_depense_recette : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.imputation_interne || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_ou_recette || ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date ? moment(item.date).format('DD/MM/YYYY') : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ttc ? formatageSomme(item.montant_ttc) : 0}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ht ? formatageSomme(item.montant_ht) : 0}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tiers ? item.tiers.code : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_piece || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_piece ? moment(item.date_piece).format('DD/MM/YYYY') : ''}</td>


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


