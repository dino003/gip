import React, { Component } from 'react'

export default class NatureConsommationItem extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {item, index} = this.props
        return (
            
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.nature_consomation || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.categorie || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.unite_mesure || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.carte_associe || 'Non renseigné'}</td>

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
