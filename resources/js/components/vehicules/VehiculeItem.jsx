import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import { formatageSomme, formatageNombre } from '../../utils/Repository';

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
            selectIndex: this.props.index
        })
    }




    render() {

        const {item, index} = this.props

        const textColor = this.props.vehiculeSeleted == undefined ? '' : this.props.vehiculeSeleted.id === item.id ? 'orange' : null;
        return (

             <tr style={{backgroundColor: textColor}} onClick={this.props.onSelect.bind(this, item.id)}>
            <td className="sticky-col first-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.immatriculation || ''}</td>

            <td className="sticky-col second-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.affectation_geographique ? item.affectation_geographique.libelle : ''}</td>
            <td className="sticky-col third-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.type_vehicule_statut || ''}</td>
            <td className="sticky-col thour-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.mode_acquisition == "0" ? 'Achat' : item.mode_acquisition == "1" ? 'Leasing' : 'Prêt'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.plan_vehicule ? item.plan_vehicule.libelle : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tech_couleur || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.detenteur ? item.detenteur.prenom ? `${ item.detenteur.nom} ${ item.detenteur.prenom.slice(0, 10)}` : `${ item.detenteur.nom} ` : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.chauffeur_atitre ? item.chauffeur_atitre.prenom ? `${ item.chauffeur_atitre.nom} ${ item.chauffeur_atitre.prenom.slice(0, 10)}` : `${ item.detenteur.nom} ` : ''}</td>


            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_entree_au_parc ? moment(item.date_entree_au_parc).format('DD/MM/YYYY') : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_carte_grise || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.kilometrage_acquisition ? formatageNombre(item.kilometrage_acquisition) : 0}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tech_chevaux_fiscaux || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.energie ? item.energie.nom_energie : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tech_numero_serie || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tech_numero_moteur || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.contrat_assurance ? item.contrat_assurance.numero_contrat_police : 'Neant'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.contrat_assurance ? item.contrat_assurance.compagnie_assurance ? item.contrat_assurance.compagnie_assurance.code : '' : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.contrat_assurance ? item.contrat_assurance.montant_prime ? formatageSomme(item.contrat_assurance.montant_prime) : '' : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.contrat_assurance ? item.contrat_assurance.montant_franchise ? formatageSomme(item.contrat_assurance.montant_franchise) : '' : ''}</td>


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
