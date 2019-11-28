import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {formatageSomme} from '../../utils/Repository'

 class CommandeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }
        
    }


   
    render() {

        const {item} = this.props

        return (
            
             <tr > 
                <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_commande || 'Non renseigné'}</td>
                <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date ? moment(item.date).format('DD/MM/YYYY')  : 'Non renseigné'}</td>

             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.fournisseur ? item.fournisseur.code : 'Non renseigné'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.type_commande == 0 ? 'Achat' : item.type_commande == 1 ? 'Location longue durée' : item.type_commande == 2 ? 'Location courte durée' : 'Leasing'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.libelle_commande  || 'Non renseigné'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.etat_commande ? 'Terminée' : 'Préparation'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_expedition ? moment(item.date_expedition).format('DD/MM/YYYY') : 'Non renseigné'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_livraison_souhaite ? moment(item.date_livraison_souhaite).format('DD/MM/YYYY')  : 'Non renseigné'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_livraison ? moment(item.date_livraison).format('DD/MM/YYYY') : 'Non renseigné'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ht ? formatageSomme(item.montant_ht) : 'Non renseigné'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ttc ? formatageSomme(item.montant_ttc) : 'Non renseigné'}</td>


            
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

export default connect(mapStateToProps)(CommandeItem)
