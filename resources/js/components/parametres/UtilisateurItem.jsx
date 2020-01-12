import React, { Component } from 'react'
import moment from 'moment'
import {connect} from 'react-redux'


 class UtilisateurItem extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {item, index} = this.props
        const superAdmin = this.props.utilisateurs.find(el => el.isAdmin)

        return (
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.username || ''}</td>
         
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.name || ''}</td>
            <td   onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.email || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_creation ? moment(item.date_creation).format('DD/MM/YYYY') : ''}</td>

            <td>

                <span className="pull-right">
                   {item == superAdmin ? null : <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                    <i className="fa fa-trash"></i>
                </button>}

                </span>
                </td>
        
        </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        utilisateurs: state.utilisateurs.items,

    }
  }

export default connect(mapStateToProps)(UtilisateurItem)
