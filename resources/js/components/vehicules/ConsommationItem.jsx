import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {formatageSomme} from '../../utils/Repository'


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
                   
            <td className="sticky-col first-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule ? item.vehicule.immatriculation : ''}</td>
            <td className="sticky-col second-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.type_consomation ? item.type_consomation.nature_consomation : ''}</td>
            <td className="sticky-col third-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_conso ? moment(item.date_conso).format('DD/MM/YYYY') : ''}</td>

            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.conducteur ? item.conducteur.nom : 'PERSONNE PAR DEFAUT'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.quantite_consomee || '0'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ttc ? formatageSomme(item.montant_ttc) : ''}</td>
            {/* <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_tva ? formatageSomme(item.montant_tva) : 'Non renseigné'}</td> */}
            {/* <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ht ? formatageSomme(item.montant_ht) : 'Non renseigné'}</td> */}
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tiers ? item.tiers.code : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.libelle || ''}</td>


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
