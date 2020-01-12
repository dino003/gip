import React, { Component } from 'react'
import {connect} from 'react-redux'

 class StructureEtablissementItem extends Component {

    constructor(props) {
        super(props);
        
    }
    
    render() {
        const {item, index} = this.props
        const siege = this.props.structures_etablissements.find(el => el.code_regroupement == "SIEGE" && el.nom_regroupement == "SIEGE ETABLISSEMENT" && el.regroupement_appartenance == null)

        return (
            
            <tr>
                                      
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.code_regroupement || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.nom_regroupement || ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.regroupement_appartenance ? this.props.structures_etablissements.find(st => st.id == item.regroupement_appartenance).code_regroupement  :  ''}</td>
            <td>

                <span className="pull-right">
                {item == siege ? null : <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
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
        structures_etablissements: state.structures_etablissements.items,

    }
  }

export default connect(mapStateToProps)(StructureEtablissementItem)
