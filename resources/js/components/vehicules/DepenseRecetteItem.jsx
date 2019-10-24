import React, { Component } from 'react'


export default class DepenseRecetteItem extends Component {

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
                <td onDoubleClick={this.props.onEdit.bind(this, item.id)}> {item.vehicule.entite_physique.entite}</td>
 
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule.immatriculation || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nature ? item.nature.nature_depense_recette : 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.imputation_interne || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_ou_recette || 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date || 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ttc || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.montant_ht || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tiers ? item.tiers.code : 'Non Renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_piece || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_piece  || 'Non renseigné'}</td>


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


