import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import SortieStockItem from '../../components/gestion/SortieStockItem';


  class SortieStock extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
           
            loading: false,
        }   
    }

        
        onDelete = (id) => {
    
            let conf = confirm('Voulez-vous vraiment supprimer ?')
            if(conf === true){
                const action = {type: "REMOVE_ARTICLE", value: id}
                this.props.dispatch(action)
                axios.delete('/api/supprimer_article_stock/' + id)
                
            }
           
        }

     

    onEdit = (id) => {
        
        this.props.history.push('/gestion_du_parc_automobile/sorties-stock/' + this.props.match.params.article_id + '/article/' + this.props.match.params.numero_article + '/edit/' + id)
    }

  
  

    
    renderLoading(){
        return  <span style={{textAlign: 'center'}}>

        <Loader
            height={100}
            width={100}
         />
         </span>
    }

    renderEmpty(){
       return <span style={{textAlign: 'center', color: 'red'}}>
            Aucune donnée enregistrée !            
        </span>
    }


    renderList(){
        const sorties = this.props.sorties_stock.filter(sortie => sortie.article_id == this.props.match.params.article_id)
        return ( <table className="mb-0 table" style={{width: '100%'}} >
        <thead>
        <tr>
            <th >Date de sortie</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Véhicule</th>
        </tr>
        </thead>
        <tbody>
          
     { sorties.map((item, index) => 
         <SortieStockItem
         index={index}
          key={item.id} 
          onEdit={this.onEdit}              
          onDelete={this.onDelete}
         item={item} />
    )  }         
        </tbody>
    </table>)
    }
    
    

    render() {
       // console.log(vehiculeselect)
       const articleSelected = this.props.articles.find(art => art.id == this.props.match.params.article_id)
       const isSortiePossible = articleSelected.quantite_phisique_stock > 0
       return (
            <div className="app-main__inner">
           <div className="row">
           <div className="col-lg-11">

           <div className="main-card mb-3 card">
                       <div className="card-body ">
       <h5 className="card-title">Sorties du stock ==> <span style={{fontSize: '0.8em'}}> Article N° {articleSelected.numero_article} | Famille: {articleSelected.famille.famille} |  Modele: {articleSelected.modele} | </span> <span style={{fontSize: '0.8em'}}>Disponible en stock: <em style={{color: 'red'}}>{articleSelected.quantite_phisique_stock ? articleSelected.quantite_phisique_stock : 0}</em></span>
                          
                            <span className="pull-right">
                        
                            <button title={isSortiePossible ? 'Enregistrer une nouvelle sortie de stock' : 'Sortie du stock impossible'}
                            disabled={!isSortiePossible}
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/sorties-stock/${articleSelected.id}/article/${articleSelected.numero_article}/ajout`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                                </span>
                               
                            </h5>
                           <div className="table-responsive">
                           {this.props.loading ? this.renderLoading() : 
                            !this.props.sorties_stock.length ? this.renderEmpty() : this.renderList()}

                             
                           </div>
                       </div>
                   </div>
                   </div>
           </div>

          
                
       </div>
        )
        

        
    }
}

const mapStateToProps = state => {
    return {
        sorties_stock: state.sorties_stock.items,
        articles: state.articles.items,
        loading: state.sorties_stock.loading,

    }
  }

export default connect(mapStateToProps)(SortieStock)
//export default TypeEntite

