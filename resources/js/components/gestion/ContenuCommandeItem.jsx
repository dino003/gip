import React, { Component } from 'react'

export default class ContenuCommandeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }

    }

    render() {

        const { item, index } = this.props

        return (

            <tr >
                <td onDoubleClick={this.props.onEditContenu.bind(this, item)} scope="row">{item.contenu_libelle_commande}</td>
                <td onDoubleClick={this.props.onEditContenu.bind(this, item)}>{item.contenu_date_livraison_souhaite}</td>
                <td onDoubleClick={this.props.onEditContenu.bind(this, item)}>{item.contenu_etat_commande}</td>
                <td onDoubleClick={this.props.onEditContenu.bind(this, item)}>{item.contenu_quantite_commande}</td>
                <td onDoubleClick={this.props.onEditContenu.bind(this, item)}>{item.contenu_quantite_livree}</td>
                <td onDoubleClick={this.props.onEditContenu.bind(this, item)}>{item.contenu_date_livraison}</td>
                <td onDoubleClick={this.props.onEditContenu.bind(this, item)}>{item.contenu_montant_ttc}</td>
                <td>

                    <span className="pull-right">
                        <button onClick={this.props.onDeleteContenu.bind(this, item.id)}
                            className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                            <i className="fa fa-trash"></i>
                        </button>

                    </span>
                </td>

            </tr>


        )
    }
}


