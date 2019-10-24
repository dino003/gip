import React, { Component } from 'react'

export default class NatureInterventionItem extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {item, index} = this.props
        return (
            
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.nom_intervention || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.categorie || 'Non renseigné'}</td>
            <td>
              {/*  <input type="checkbox" readOnly checked={item.sinistre} /> */}
              <span>{item.sinistre ? 'oui' : 'non'}</span>
            </td>

            <td>
               {/* <input type="checkbox" readOnly checked={item.operation} /> */}
               <span>{item.operation ? 'oui' : 'non'}</span>

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
