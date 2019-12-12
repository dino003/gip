import React, { Component } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import { formatageSomme } from '../../utils/Repository';

 class SortieStockItem extends Component {

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
            
            <tr>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_sortie ? moment(item.date_sortie).format('DD/MM/YYYY') : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.quantite_sortie || 0}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.prix_article ? formatageSomme(item.prix_article) : 0}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.vehicule ?  item.vehicule.immatriculation : ''}</td>

           
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
        articleSelected: state.articleSelected.vehicule

    }
  }

export default connect(mapStateToProps)(SortieStockItem)
