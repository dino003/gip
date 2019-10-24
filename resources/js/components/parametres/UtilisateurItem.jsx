import React, { Component } from 'react'
import moment from 'moment'


export default class UtilisateurItem extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {item, index} = this.props
        return (
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.username || 'Non Renseigné'}</td>
         
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.name || 'Non Renseigné'}</td>
            <td   onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.email || 'Non Renseigné'}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{moment(item.date_creation).format('DD/MM/YYYY') || 'Non Renseigné'}</td>

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
