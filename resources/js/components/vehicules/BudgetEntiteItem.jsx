import React, { Component } from 'react'
import {connect} from 'react-redux'


 class BudgetEntiteItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }
        
    }


   
    render() {

        const {item, index} = this.props

        return (
            
             <tr > 
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.annee_budgetaire || 'Non renseigné'}</td>
       
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.entite ? item.entite.entite : 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.imputation_interne || 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nature_ligne_budget ? item.nature_ligne_budget.nature_depense_recette : 'Non renseigné'}</td>


            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_budget || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_realisation || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_pourcentage || 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_reste || 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.recette_budget || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.recette_realisation || 'Non renseigné'}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.recette_pourcentage || 'Non renseigné'}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.recette_reste || 'Non renseigné'}</td>

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
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(BudgetEntiteItem)
