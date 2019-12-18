import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

 class VehiculeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }
        
    }

    onSelect = () => {
        this.setState({
          //  isSelect: !this.state.isSelect
            selectIndex: this.props.index
        }, () =>   console.log(this.state.selectIndex)
        )
    }



   
    render() {

        const {item, index} = this.props

        const textColor = this.props.vehiculeSeleted == undefined ? '' : this.props.vehiculeSeleted.id === item.id ? 'orange' : null;
        return (
            
             <tr style={{backgroundColor: textColor}} onClick={this.props.onSelect.bind(this, item.id)}> 
                   
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.entite_comptable.nom_entite || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.immatriculation || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.type_vehicule_statut || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.mode_acquisition || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.marque.nom_marque || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.modele || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.couleur || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.detenteur.nom || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.chauffeur_atitre ? item.chauffeur_atitre.nom : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.categorie.nom_type || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_entree_au_parc ? moment(item.date_entree_au_parc).format('DD/MM/YYYY') : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_carte_grise || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.kilometrage_acquisition || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tech_chevaux_fiscaux || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.energie ? item.energie.nom_energie : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tech_numero_serie || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tech_numero_moteur || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_contrat || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.assureur || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.prime_assurance || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.franchise || ''}</td>

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

export default connect(mapStateToProps)(VehiculeItem)
