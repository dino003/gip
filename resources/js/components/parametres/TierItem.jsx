import React, { Component } from 'react'

export default class EntiteItem extends Component {
    constructor(props) {
        super(props);
        
    }
    
    

    render() {
        const {item, index} = this.props
        return (
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.code || 'Non Renseigné'}</td>
         
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nom || 'Non Renseigné'}</td>
            <td   onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.metier_principal || 'Non Renseigné'}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.ville || 'Non Renseigné'}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.telephonne || 'Non Renseigné'}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.fax || 'Non Renseigné'}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.adresse1 || 'Non Renseigné'}</td>

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
