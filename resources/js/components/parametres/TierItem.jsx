import React, { Component } from 'react'

export default class EntiteItem extends Component {
    constructor(props) {
        super(props);
        
    }
    
    

    render() {
        const {item, index} = this.props
        return (
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.code || ''}</td>
         
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nom || ''}</td>
            <td   onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.metier_principal || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.ville || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.telephonne || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.fax || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.adresse1 || ''}</td>

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
