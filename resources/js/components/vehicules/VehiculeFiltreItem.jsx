import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import { formatageSomme, formatageNombre } from '../../utils/Repository';

 class VehiculeFiltreItem extends Component {

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

        return (

             <tr >
            <td className="sticky-col first-col" >{item.immatriculation || ''}</td>

            <td className="sticky-col second-col" >{item.affectation_geographique ? item.affectation_geographique.libelle : ''}</td>
            <td className="sticky-col third-col" >{item.type_vehicule_statut || ''}</td>
            <td className="sticky-col thour-col" >{item.mode_acquisition == "0" ? 'Achat' : item.mode_acquisition == "1" ? 'Leasing' : 'Prêt'}</td>
            <td >{item.plan_vehicule ? item.plan_vehicule.libelle : ''}</td>
{/*             <td >{item.modele || ''}</td>
 */}            <td >{item.tech_couleur || ''}</td>
            <td >{item.detenteur ? item.detenteur.prenom ? `${ item.detenteur.nom} ${ item.detenteur.prenom.slice(0, 10)}` : `${ item.detenteur.nom} ` : ''}</td>
            <td >{item.chauffeur_atitre ? item.chauffeur_atitre.prenom ? `${ item.chauffeur_atitre.nom} ${ item.chauffeur_atitre.prenom.slice(0, 10)}` : `${ item.detenteur.nom} ` : ''}</td>


{/*             <td >{item.categorie ? item.categorie.nom_type : ''}</td>
 */}            <td >{item.date_entree_au_parc ? moment(item.date_entree_au_parc).format('DD/MM/YYYY') : ''}</td>

            <td >{item.numero_carte_grise || ''}</td>
            <td >{item.kilometrage_acquisition ? formatageNombre(item.kilometrage_acquisition) : 0}</td>
            <td >{item.tech_chevaux_fiscaux || ''}</td>
            <td >{item.energie ? item.energie.nom_energie : ''}</td>
            <td >{item.tech_numero_serie || ''}</td>
            <td >{item.tech_numero_moteur || ''}</td>
            <td >{item.contrat_assurance ? item.contrat_assurance.numero_contrat_police : 'Neant'}</td>
            <td >{item.contrat_assurance ? item.contrat_assurance.compagnie_assurance ? item.contrat_assurance.compagnie_assurance.code : '' : ''}</td>
            <td >{item.contrat_assurance ? item.contrat_assurance.montant_prime ? formatageSomme(item.contrat_assurance.montant_prime) : '' : ''}</td>
            <td >{item.contrat_assurance ? item.contrat_assurance.montant_franchise ? formatageSomme(item.contrat_assurance.montant_franchise) : '' : ''}</td>


            <td>

                <span className="pull-right">
                    <button disabled  className=" pull-right">
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

export default connect(mapStateToProps)(VehiculeFiltreItem)
