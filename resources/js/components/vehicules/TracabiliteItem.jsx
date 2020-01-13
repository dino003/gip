import React, { Component } from 'react'
import {connect} from 'react-redux'
import { formatageSomme } from '../../utils/Repository';
import moment from 'moment'


 class TracabiliteItem extends Component {

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
                   
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule.immatriculation || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tiers.nom || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_debut ? moment(item.date_debut).format('DD/MM/YYYY') : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_fin_reele ? moment(item.date_fin_reele).format('DD/MM/YYYY') : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nature_intervention ? item.nature_intervention.nom_intervention : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nature_intervention ? item.nature_intervention.categorie : ''}</td>
           
            {/* <td>

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

export default connect(mapStateToProps)(TracabiliteItem)
