import React, { Component } from 'react'
import { formatageSomme } from '../../utils/Repository';
import {connect} from 'react-redux'

 class ArticleItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }
        
    }

    render() {

        const {item, index} = this.props
        const textColor = this.props.articleSelected == undefined ? '' : this.props.articleSelected.id == item.id ? 'orange' : null;

        return (
            
            <tr style={{backgroundColor: textColor}} onClick={this.props.onSelectArticle.bind(this, item)}> 
             <td className="sticky-col first-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.famille ?  item.famille.famille : ''}</td>
             <td className="sticky-col second-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_article ? item.numero_article : ''}</td>


            
             <td className="sticky-col third-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.type_article == 1 ? 'P D' :  'Conso'}</td>

             <td className="sticky-col thour-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.marque ? item.marque.nom_marque : ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.modele || ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.libelle_article || ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.quantite_phisique_stock || 0}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.quantite_disponible_stock || 0}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.seuil_alerte || 0}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.prix_article ? formatageSomme(item.prix_article) : 0}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.tva || 0} %</td>
            
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.fournisseur ? item.fournisseur.code : ''}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.valorisation_hors_taxe ? formatageSomme(item.valorisation_hors_taxe) : 0}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.valorisation_ttc ? formatageSomme(item.valorisation_ttc) : 0}</td>
         
            <td>

                <span className="pull-right">
                    <button onClick={this.props.onDelete.bind(this, item.id)} 
                    className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
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
        articleSelected: state.articleSelected.article

    }
  }

export default connect(mapStateToProps)(ArticleItem)