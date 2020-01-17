import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import ArticleItem from '../../components/gestion/ArticleItem';

import '../../components/table.css'
import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

  class Articles extends Component {

    constructor(props) {
        super(props);

        this.state = {
           
            loading: false,
            articleSelectionne: undefined
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
        this.props.history.push('/gestion_du_parc_automobile/modification-article/' + id)
    }

    onReservation = (item) => {
        if(item.vehicule_id == null){
            alert(`Cet Ordre de Mission N° ${item.numero_ordre_mission} \n n'est pas lié à un véhicule pour la réservation; \n Sélectionnez un véhicule à réserver pour cet ordre de mission pour ensuite passer a la création d'une réservation. `)
        }else{
            this.props.history.push('/gestion_du_parc_automobile/parc/creation-reservation-vehicules-via-ordre-mission/' + item.vehicule_id + '/' + item.vehicule.immatriculation + '/' + item.id )
  
        }
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

    onSelectArticle = item => {
        // console.log(id)
        // const articleSelectionne = this.props.articles.find(article => article.id == id)
        // const action = {type: "EDIT_ARTICLE_SELECTED", value: articleSelectionne}
        // this.props.dispatch(action)  
        // console.log(articleSelectionne)
        this.setState({articleSelectionne: item}, () => {
          const action = {type: "EDIT_ARTICLE_SELECTED", value: this.state.articleSelectionne}
          this.props.dispatch(action)
        })
    }


    renderList(){
        return (  <table className="mb-0 table" id="export" style={{width: '100%'}} >
        <thead>
        <tr>
            <th className="sticky-col first-col">Fammille</th>
            <th className="sticky-col second-col">N° d'article</th>
            <th className="sticky-col third-col">Type</th>
            <th className="sticky-col thour-col">Marque</th>
            <th>Modèle</th>
            <th>Libéllé</th>
            <th>Qté stock</th>
            <th>Qté dispo</th>
            <th>Seuil alerte</th>
            <th>Prix article</th>
            <th>Taux Tva</th>
            <th>Fournisseur</th>
            <th>Valorisation HT</th>
            <th>Valorisation TTC</th>

        </tr>
        </thead>
        <tbody>
          
     { this.props.articles.map((item, index) => 
         <ArticleItem
         index={index}
          key={item.id} 
          onEdit={this.onEdit}              
          onDelete={this.onDelete}
          onSelectArticle={this.onSelectArticle}
         item={item} />
    )  }         
        </tbody>
    </table>)
    }
    
    

    render() {
       // console.log(vehiculeselect)
       const {articleSelected, articles} = this.props
        return (
            <div className="app-main__inner">
           <div className="row">
           <div className="col-lg-11">

           <div className="main-card mb-3 card" style={{width: '1000px'}}>
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des Articles
                          
                            <span className="pull-right">
                                
                          {articleSelected &&  <React.Fragment>
                            <button 
                                      className="mb-2 mr-2 btn-transition btn"
                                      disabled
                                      >
     
                                         Article:  {articleSelected.numero_article} , Famille:  {articleSelected.famille.famille}
                                             </button>
                            <button title=" Ajouter une ligne d'entrée pour cet article"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/entrees-stock/${articleSelected.id}/article/${articleSelected.numero_article}`)}
                                      >
                                      <i className="fa fa-level-up-alt"></i> {' '}
     
                                          Entrées
                                             </button>
                                             {/* disabled={articleSelected.quantite_phisique_stock <= 0 } */}
                                             <button title="Les sortie de cet article"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-warning"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/sorties-stock/${articleSelected.id}/article/${articleSelected.numero_article}`)}
                                      >
                                      <i className="fa fa-level-down-alt"></i> {' '}
     
                                          Sorties
                                             </button>

                                             {/* <button title=" Ajouter une ligne de sortie pour cet article"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-info"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/commandes-stock/${articleSelected.id}/article/${articleSelected.numero_article}`)}
                                      >
                                      <i className="fa fa-file-invoice"></i> {' '}
     
                                          Commandes
                                             </button> */}
                            </React.Fragment>}
                        
                            {/* <button title=" Ajouter un article"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/ajouter-article`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button> */}
                                            {articles.length ?
                                             <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des Articles"
                                                sheet="feuille1"
                                                buttonText="Ecran -> Liste"/> : null }

                                </span>
                             
                                
                                            
                                
                            </h5>
                            <br />
                         
                         <div className="view">
                                  <div className="wrapper">
                                  {this.props.loading ? this.renderLoading() : 
                            !this.props.articles.length ? this.renderEmpty() : this.renderList()}
                                  </div>
                              </div>
                          
                       </div>
                   </div>
                   </div>
           </div>

           <Container>
                        <Button
                        tooltip="Ajouter un Article"
                        icon="fas fa-plus"
                    // rotate={true}
                        styles={{backgroundColor: 'green', color: 'white', cursor: 'pointer'}}

                        onClick={() => this.props.history.push(`/gestion_du_parc_automobile/ajouter-article`)}
                        />
                </Container>
                
       </div>
        )
        

        
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articles.items,
        loading: state.articles.loading,
        articleSelected: state.articleSelected.article

    }
  }

export default connect(mapStateToProps)(Articles)
//export default TypeEntite

