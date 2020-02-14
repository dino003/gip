import React, { Component } from 'react'
import {connect} from 'react-redux'

 class PlanBudgetaireItem extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        const {item, index} = this.props
       // const siege = this.props.structures_etablissements.find(el => el.code_regroupement == "SIEGE" && el.nom_regroupement == "SIEGE ETABLISSEMENT" && el.regroupement_appartenance == null)

        return (

            <tr>

            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.structure_geographique ? item.structure_geographique.libelle : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.libelle || ''}</td>
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

export default connect(mapStateToProps)(PlanBudgetaireItem)
