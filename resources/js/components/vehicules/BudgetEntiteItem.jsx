import React, { Component } from 'react'
import {connect} from 'react-redux'
import {formatageSomme} from '../../utils/Repository'


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
             <td className="sticky-col first-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.annee_budgetaire || ''}</td>
       
            <td className="sticky-col second-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.entite ? item.entite.entite : ''}</td>
            <td className="sticky-col third-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.imputation_interne || ''}</td>

            <td className="sticky-col thour-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.nature_ligne_budget ? item.nature_ligne_budget.nature_depense_recette : ''}</td>


            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_budget ? formatageSomme(item.depense_budget) : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_realisation ? formatageSomme(item.depense_realisation) : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_pourcentage || ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.depense_reste ? formatageSomme(item.depense_reste) : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.recette_budget ? formatageSomme(item.recette_budget) : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.recette_realisation ? formatageSomme(item.recette_realisation) : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.recette_pourcentage || ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.recette_reste ? formatageSomme(item.recette_reste) : ''}</td>

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
