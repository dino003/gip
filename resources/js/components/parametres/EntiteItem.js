import React, { Component } from 'react'

export default class EntiteItem extends Component {
    constructor(props) {
        super(props);
        
    }
    
    

    render() {
        const {item, index} = this.props
        return (
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.entite}</td>
            {/*
            <td>
            <Link to={`/modification-entite/${item.id}`}>{item.entite}</Link>

            </td>
            */}
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nom_entite}</td>
            <td>{item.type_entite.type_entite}</td>
            <td>{item.regroupement.regroupement_appartenance}</td>
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
