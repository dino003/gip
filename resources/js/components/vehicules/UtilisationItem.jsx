import React, { Component } from 'react'
import moment from 'moment';

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

        const {item, index} = this.props

        const textColor = this.state.selectIndex === index ? 'orange' : null;
        return (
            
               <tr>   
                {/* <tr style={{backgroundColor: textColor}} onClick={this.onSelect}> */}
                   
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.vehicule.immatriculation || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.utilisateur.entite_affectation.entite || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.utilisateur.nom || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.chauffeur.nom || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.utilisatation_normal_ou_pret || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.nature_utilisation.libelle || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.date_debut_utilisation ? moment(item.date_debut_utilisation).format('DD/MM/YYYY') : 'Non Renseigné'}</td>
            
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.heure_debut.slice(0, 5) || 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.date_fin_utilisation ? moment(item.date_fin_utilisation).format('DD/MM/YYYY') : 'Non Renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.heure_de_fin.slice(0, 5) || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.kilometrage_compteur_debut || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.kilometres_parcourus || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.kilometrage_compteur_retour || 'Non renseigné'}</td>

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
