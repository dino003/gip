import React, { Component } from 'react'
import {connect} from 'react-redux'
import { formatageSomme } from '../../utils/Repository';
import moment from 'moment'


 class FicheVehiculeConsoItem extends Component {

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
            <td className="" >{item.date_conso ? moment(item.date_conso).format('DD/MM/YYYY') : ''}</td>

            <td className="" >{item.type_consomation ? item.type_consomation.nature_consomation : ''}</td>

            <td  >{item.conducteur ? item.conducteur.nom : 'PERSONNE PAR DEFAUT'}</td>

            <td >{item.quantite_consomee || '0'}</td>
            <td >{item.montant_ttc ? formatageSomme(item.montant_ttc) : ''}</td>

            <td >{item.tiers ? item.tiers.code : ''}</td>



        </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(FicheVehiculeConsoItem)
