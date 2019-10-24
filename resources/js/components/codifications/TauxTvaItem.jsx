import React, { Component } from 'react'

export default class TauxTvaItem extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {item, index} = this.props
        return (
            
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>
            {item.code || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.taux || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>
                {item.libelle || 'Non renseigné'}
            </td>

            <td onDoubleClick={this.props.onEdit.bind(this, index)}>
                {item.defaut ? 'Oui' : 'Non'}

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
