import React, { Component } from 'react'
import {connect} from 'react-redux'

 class StructureEtablissementItem extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {item, index} = this.props
        return (
            
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.code_regroupement || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.nom_regroupement || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.regroupement_appartenance ? this.props.structures_etablissements.find(st => st.id == item.regroupement_appartenance).code_regroupement  :  'SIEGE'}</td>
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

const mapStateToProps = state => {
    return {
        structures_etablissements: state.structures_etablissements.items,

    }
  }

export default connect(mapStateToProps)(StructureEtablissementItem)
