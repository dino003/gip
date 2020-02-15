import React, { Component } from 'react'
import {connect} from 'react-redux'


class TierItem extends Component {
    constructor(props) {
        super(props);

    }



    render() {
        const {item, index} = this.props
        const fournisseurPardefaut = this.props.tiers.find(el => el.code == "FOURNISSEUR PAR DEFAUT")

        return (
            <tr>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.code || ''}</td>

            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nom || ''}</td>
            <td   onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.metier_principal || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.type_tiers || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.telephonne || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.fax || ''}</td>
            <td  onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.adresse1 || ''}</td>

            <td>

                <span className="pull-right">
                {item == fournisseurPardefaut ? null : <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
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
        tiers: state.tiers.items,

    }
  }

export default connect(mapStateToProps)(TierItem)
