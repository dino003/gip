import React, { Component } from 'react'
import {connect} from 'react-redux'
import { formatageSomme } from '../../utils/Repository';
import moment from 'moment'


 class FicheVehiculeItem extends Component {

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
       
            <td className="" >{item.date ? moment(item.date).format('DD/MM/YYYY') : ''}</td>
            <td className="" >{item.nature_amende ? item.nature_amende.nature_amende : ''}</td>



            <td >{item.conducteur ? item.conducteur.nom : ''}</td>

            <td >{item.lieu_amende ? item.lieu_amende.libelle : ''}</td>
{/*             <td >{item.regle_par_conducteur_ou_etablissement || ''}</td>
 */}            <td >{item.montant_amende ? formatageSomme(item.montant_amende) : ''}</td>


    

        </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(FicheVehiculeItem)
