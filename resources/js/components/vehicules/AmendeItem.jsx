import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {formatageSomme} from '../../utils/Repository'


 class AmendeItem extends Component {

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
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date ? moment(item.date).format('DD/MM/YYYY') : 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.heure || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_reception ? moment(item.date_reception).format('DD/MM/YYYY') : 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nature_amende ? item.nature_amende.nature_amende : 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.conducteur ? item.conducteur.nom : 'Non Renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.lieu || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.regle_par_conducteur_ou_etablissement || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_amende ? formatageSomme(item.montant_amende) : 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule_en_fouriere ? 'Oui' : 'Non'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_mise_en_fouriere ? formatageSomme(item.montant_mise_en_fouriere) : 'Non renseigné'}</td>


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

export default connect(mapStateToProps)(AmendeItem)
