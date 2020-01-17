import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'


 class ResevationItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }
        
    }


   
    render() {

        const {item} = this.props
        const lineStyle = item.transforme_en_utilisation ? 'line-through' : 'none'

        return (
            
            <tr style={{textDecoration: lineStyle}} > 

                   
            <td className="sticky-col first-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule ? item.vehicule.immatriculation : ''}</td>
            <td className="sticky-col second-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_debut_reservation ? moment(item.date_debut_reservation).format('DD/MM/YYYY') : ''}</td>

            <td className="sticky-col third-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.heure_debut_reservation.slice(0, 5) || ''}</td>
            <td className="sticky-col thour-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_fin_reservation ? moment(item.date_fin_reservation).format('DD/MM/YYYY') : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.heure_fin_reservation.slice(0, 5) || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.entite_personne_reservant || ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.objet_reservation ? item.objet_reservation.libelle : ''}</td>

            <td > <input type="checkbox" disabled={true} checked={item.transforme_en_utilisation} /> </td>

            <td>

                {/* <span className="pull-right">
                <ul className="list-inline" style={{listStyle: 'none'}}> */}
                    
                <button onClick={this.props.onDelete.bind(this, item.id)}
                    title="Supprimer"
                     className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                    <i className="fa fa-trash"></i>
                </button>
                       {!item.transforme_en_utilisation && <button onClick={this.props.onTransformutilisation.bind(this, item.id)} 
                            title="Transformation d'une réservation d'un véhicule en utilisation"
                            className="mb-2 mr-2 btn-transition btn btn-outline-info pull-right">
                    <i className="fa fa-share"></i> Res->Utili.
                </button>}
                {!item.transforme_en_utilisation && <button onClick={this.props.onTransformationDepartReservation.bind(this, item.id)} 
                            title="Enregistrer le départ d'un véhicule"
                            className="mb-2 mr-2 btn-transition btn btn-outline-info pull-right">
                    <i className="fa fa-calendar"></i> Départ Util.
                </button>}
                {/* </ul>
                   
              
                </span> */}
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

export default connect(mapStateToProps)(ResevationItem)
