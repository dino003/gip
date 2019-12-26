import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'

import today from '../../utils/today'
import inputStyle from '../../utils/inputStyle'



 class AjouterEntreeStock extends Component {
    constructor(props) {
        super(props);
        this.state = {}
      
    }

   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

  

      verificationFormulaire () {
          if(this.quantite_entree.value == ''){
              return "Veuillez renseinger la quantité entrée !"
          }else if(this.date_entree_stock.value == ''){
              return "Veuillez renseigner la date de l'entrée en stock !"
          }else if(this.fournisseur_id.value == ''){
            return "Le Fournisseur est obligatoire !"
          }else if(this.prix_article.value == ''){
            return "Veuillez renseinger le prix de l'article !"
          } else{
              return null
          }
      }

  

      enregistrerEntreeStock = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/ajouter_entree_stock', {

                article_id: this.props.match.params.article_id,
                fournisseur_id: this.fournisseur_id.value,
                date_entree_stock: this.date_entree_stock.value,
                quantite_entree: this.quantite_entree.value,
                prix_article: this.prix_article.value ,
              
            })
            .then(response => { 
               const action = {type: "ADD_ENTREE_STOCK", value: response.data.entree}
                 this.props.dispatch(action)

                 const action2 = {type: "EDIT_ARTICLE", value: response.data.article}
                 this.props.dispatch(action2)
                 const action3 = {type: "EDIT_ARTICLE_SELECTED", value: response.data.article  }
                 this.props.dispatch(action3)

               this.props.history.goBack();

             
            }).catch(error => console.log(error))
           

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
     

       // console.log(yea)
      }
    

    render() {
       // console.log(this.numero_contrat_police)
       const article = this.props.articles.find(article => article.id == this.props.match.params.article_id)
        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Entrée en  Stock
                                                         
                          </h5>
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerEntreeStock}>
                          
                               <div className="form-row">
                               <label >Article </label>
  
                               </div>
                               <hr/>

                                <div className="form-row">

                                <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >N° d'article  </label>
                                            <input  type="text"
                                            readOnly
                                            defaultValue={article.numero_article}
                                             className="form-control" />
                                             </div>
                                    </div>

                                <div className="col-md-3">
                                         <label  className="">Famille</label>
                                         <input type="text"
                                            readOnly
                                            defaultValue={article.famille ? article.famille.famille : null}
                                             className="form-control" />
                                
                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Libéllé Article</label>
                                         <input type="text"
                                            readOnly
                                            defaultValue={article.libelle_article}
                                             className="form-control" />
                                
                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Marque</label>
                                         <input type="text"
                                            readOnly
                                            defaultValue={article.marque ? article.marque.nom_marque : null}
                                             className="form-control" />
                                
                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Modèle</label>
                                         <input type="text"
                                            readOnly
                                            defaultValue={article.modele}
                                             className="form-control" />
                                
                                        </div>


                                  
                                </div>
                                <div className="form-row">
                               <label >Entrée </label>
  
                               </div>
                               <hr/>

                                <div className="form-row">

                                <div className="col-md-3">
                                            <label  className="">Fournisseur</label>
                                            <select name="fournisseur_id" onChange={this.setField}
                                                ref={fournisseur_id => this.fournisseur_id = fournisseur_id}
                                                style={inputStyle}
                                                defaultValue={article.fournisseur_id}
                                            className="form-control">
                                            <option value={null}></option>

                                            {this.props.tiers.map(tier => 
                                                    <option key={tier.id} value={tier.id}>{tier.code}  </option>

                                                    )}
                                            </select>

                                            </div>


                                    <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Date de l'entrée  </label>
                                                <input name="date_entree_stock"  type="date"
                                                onChange={this.setField}
                                                style={inputStyle}
                                                defaultValue={today}
                                                ref={date_entree_stock => this.date_entree_stock = date_entree_stock}
                                                className="form-control" />
                                                </div>
                                        </div>

                                 
                                     
                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Quantité entrée</label>
                                                <input name="quantite_entree"  type="number"
                                                onChange={this.setField}
                                                style={inputStyle}
                                                ref={quantite_entree => this.quantite_entree = quantite_entree}
                                                className="form-control" />
                                                </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Prix Article</label>
                                                <input name="prix_article"  type="number"
                                                onChange={this.setField}
                                                style={inputStyle}
                                                readOnly
                                                defaultValue={article.prix_article}
                                                ref={prix_article => this.prix_article = prix_article}
                                                className="form-control" />
                                                </div>
                                        </div>

                                    
                                    </div>


                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                          
                                <span  onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
                            </form>
                        </div>
                    </div>
                
                    <ToastContainer autoClose={4000} />
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tiers: state.tiers.items,
        marques: state.marques.items,
        famille_pieces_detaches: state.famille_pieces_detaches.items,
        articles: state.articles.items,
    }
  }

export default connect(mapStateToProps)(AjouterEntreeStock)
