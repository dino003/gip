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
            <td  className="" >{item.date_debut ? moment(item.date_debut).format('DD/MM/YYYY') : ''}</td>

            <td  className="" >{item.tiers ? `${item.tiers.code} ${item.tiers.nom.slice(0, 15)}` : ''}</td>

{/*             <td >{item.date_fin_reele ? moment(item.date_fin_reele).format('DD/MM/YYYY') : ''}</td>
 */}
            <td >{item.nature_intervention ? item.nature_intervention.nom_intervention : ''}</td>
            <td >{item.nature_intervention ? item.nature_intervention.categorie : ''}</td>
{/*             <td >{item.kilometrage || ''}</td>
 */}            <td className="" >{item.cout_ttc_intervention ? formatageSomme(item.cout_ttc_intervention) : ''}</td>


          {/*   <td>

                <span className="pull-right">
                    <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                    <i className="fa fa-trash"></i>
                </button>
              
                </span>
        </td> */}
            


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
