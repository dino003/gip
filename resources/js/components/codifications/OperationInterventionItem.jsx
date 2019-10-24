import React, { Component } from 'react'

export default class OperationInterventionItem extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {item, index} = this.props
        return (
            
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>
            {item.nature_intervention.nom_intervention || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.categorie_vehicule.nom_type || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>
                {item.categorie_operation || 'Non renseigné'}
            </td>

            <td onDoubleClick={this.props.onEdit.bind(this, index)}>
                {item.nature_operation || 'Non renseigné'}

            </td>
            <td>
                {item.temps_minute || '0'}

            </td>
            <td>
                {item.cout_moyen || '0,00'}

            </td>
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
