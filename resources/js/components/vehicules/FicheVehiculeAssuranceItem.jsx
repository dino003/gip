import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import today from '../../utils/today';
import { formatageSomme } from '../../utils/Repository';

 class FicheVehiculeAssuranceItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }
        this.onDeclencherContratEnCourVehicule = this.onDeclencherContratEnCourVehicule.bind(this)
        this.isContratExpired = this.isContratExpired.bind(this);
    }

    onDeclencherContratEnCourVehicule(){
        const {item, onContratEncour} = this.props
        let confi = confirm(`Voulez-vous definir le contrat N° ${item.numero_contrat_police} comme contrat courant du véhicule ?`);
        if(confi) {
           // this.setState({isDefautDeclench: !this.state.isDefautDeclench})
            onContratEncour(item.id)

        }
    }

    isContratExpired(item) {
        let date_de_fin = Date.parse(item.periode_date_fin);
        let date_du_jour = Date.parse(today);

        return date_du_jour > date_de_fin;


    }



    render() {

        const {item, isDefautDeclench } = this.props

        return (

             <tr >

             <td className="" >{item.numero_contrat_police || ''}</td>

            <td className="" >{item.compagnie_assurance ? item.compagnie_assurance.libelle : ''}</td>
            <td className="" >{item.periode_date_debut ? moment(item.periode_date_debut).format('DD/MM/YYYY')  : ''}</td>
            <td className="" >{item.periode_date_fin ? moment(item.periode_date_fin).format('DD/MM/YYYY')  : ''}</td>

            <td >{item.date_contrat ? moment(item.date_contrat).format('DD/MM/YYYY') : ''}</td>
            <td >{item.date_prise_effet ? moment(item.date_prise_effet).format('DD/MM/YYYY') : ''}</td>
            <td className="" >{item.montant_franchise ? formatageSomme(item.montant_franchise) : ''}</td>

             <td><span >{this.isContratExpired(item) ? <em style={{color: 'red'}}>Expiré</em> : <em style={{color: 'lime'}}>Valable</em>}</span></td>



            <td>

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

export default connect(mapStateToProps)(FicheVehiculeAssuranceItem)
