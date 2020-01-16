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
                   
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.vehicule ? item.vehicule.immatriculation : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.utilisateur ? item.utilisateur.entite_affectation ? item.utilisateur.entite_affectation.entite : '' : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.utilisateur ? item.utilisateur.nom  : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.chauffeur ? item.chauffeur.nom : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.utilisatation_normal_ou_pret || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.nature_utilisation ? item.nature_utilisation.libelle : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.date_debut_utilisation ? moment(item.date_debut_utilisation).format('DD/MM/YYYY') : ''}</td>
            
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.heure_debut ? item.heure_debut.slice(0, 5) : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.date_fin_utilisation ? moment(item.date_fin_utilisation).format('DD/MM/YYYY') : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.heure_de_fin ? item.heure_de_fin.slice(0, 5) : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.kilometrage_compteur_debut || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.kilometres_parcourus || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id, index)}>{item.kilometrage_compteur_retour || ''}</td>

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
