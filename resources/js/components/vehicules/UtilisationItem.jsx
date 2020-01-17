import React, { Component } from 'react'
import moment from 'moment';
import {formatageNombre} from '../../utils/Repository'

export default class UtilisationItem extends Component {

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

        const {item} = this.props

        return (
            
               <tr>   
                {/* <tr style={{backgroundColor: textColor}} onClick={this.onSelect}> */}
                   
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule ? item.vehicule.immatriculation : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.utilisateur ? item.utilisateur.entite_affectation ? item.utilisateur.entite_affectation.entite : '' : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.utilisateur ? item.utilisateur.nom  : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.chauffeur ? item.chauffeur.nom : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.utilisatation_normal_ou_pret || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nature_utilisation ? item.nature_utilisation.libelle : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_debut_utilisation ? moment(item.date_debut_utilisation).format('DD/MM/YYYY') : ''}</td>
            
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.heure_debut ? item.heure_debut.slice(0, 5) : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_fin_utilisation ? moment(item.date_fin_utilisation).format('DD/MM/YYYY') : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.heure_de_fin ? item.heure_de_fin.slice(0, 5) : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.kilometrage_compteur_debut ? formatageNombre(item.kilometrage_compteur_debut)  : 0}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.kilometres_parcourus ? formatageNombre(item.kilometres_parcourus) : 0}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.kilometrage_compteur_retour ? formatageNombre(item.kilometrage_compteur_retour) : 0}</td>

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
