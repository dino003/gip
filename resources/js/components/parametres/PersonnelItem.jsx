import React, { Component } from 'react'

export default class PersonnelItem extends Component {
    constructor(props) {
        super(props);
        
    }
      

    render() {
        const {item, index} = this.props
        return (
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nom || ''}</td>
         
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.prenom || ''}</td>
            <td   onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.matricule || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.entite_affectation ? item.entite_affectation.entite : ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.portable || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.telephone || ''}</td>

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
