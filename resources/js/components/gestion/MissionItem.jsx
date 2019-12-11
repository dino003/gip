import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

 class MissionItem extends Component {

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
             <td colSpan="2" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_ordre_mission ?  item.numero_ordre_mission : ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_demande ? moment(item.date_demande).format('DD/MM/YYYY') : 'Non renseigné'}</td>

             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.heure_demande ? item.heure_demande.slice(0, 5) : ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.demandeur ? item.demandeur.nom : ''}</td>

            
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.etat == 1 ? 'En Cours' : item.etat == 2 ? 'En Attente' : item.etat == 3 ? 'Terminé' : 'Suspendu'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.urgence == 1 ? 'Basse' : item.urgence == 2 ? 'Haute' : 'Moyenne'}</td>

             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.decideur ? item.decideur.nom : ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.signataire ? item.signataire.nom : ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.beneficiaire_principal ? item.beneficiaire_principal.nom : ''}</td>

             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nature_mission ? item.nature_mission.libelle : ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.moyen_transport == 1 ? 'Véhicule du parc' : item.moyen_transport == 2 ? 'Train' : item.moyen_transport == 3 ? 'Avion' : item.moyen_transport == 4 ? 'Transport commun' : 'Autre'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.description_mission || ''}</td>

         
            <td>

                <span className="pull-right">
                    <button onClick={this.props.onDelete.bind(this, item.id)} 
                    className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                    <i className="fa fa-trash"></i>
                </button>

               {item.etat != 3 &&  <button onClick={this.props.onReservation.bind(this, item)} 
                            title="Faire la réservation"
                            className="mb-2 mr-2 btn-transition btn btn-outline-info pull-right">
                    <i className="fa fa-calendar"></i>
                </button>}
              
                </span>
        </td>
            


        </tr>
        )
    }
}



export default MissionItem
