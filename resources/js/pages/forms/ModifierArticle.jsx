import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'

import inputStyle from '../../utils/inputStyle'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



 class ModifierArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {

             objetEdit: undefined
        }
    }

    componentDidMount(){
    
        this.setState({
           objetEdit: this.props.articles.find(article => article.id == this.props.match.params.article_id)
       })
   
       }
   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

  

    setFieldFamille = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.libelle_article.value = this.defaultLibelleArticleValue(this.famille_id.value) );
    }

    defaultLibelleArticleValue(famille_id){
        let famille = this.props.famille_pieces_detaches.find(fam => fam.id == famille_id)
       // console.log(famille)
        return famille.famille
    }

      verificationFormulaire () {
          if(this.famille_id.value == ''){
              return "Veuillez renseinger la famille de l'article !"
          }else if(this.libelle_article.value == ''){
              return "Le libéllé de l'article est obligatoire !"
          }else if(this.fournisseur_id.value == ''){
            return "Le Fournisseur est obligatoire !"
          }else if(this.prix_article.value == ''){
            return "Veuillez renseinger le prix de l'article !"
          } else{
              return null
          }
      }

      numeroArticle = () => {
        const { articles } = this.props
        if (articles.length == 0) return 1
        let miss = articles.map(a => a.id);
        return Math.max(...miss) + 1
    }

    generationNumeroArticle = () => {
        let numero = this.numeroArticle().toString();
        if(numero.length == 1) return  '0000' + numero
        else if(numero.length == 2) return  '000' + numero
        else if(numero.length == 3) return  '00' + numero
        else if(numero.length == 4) return  '0' + numero
        else  return  numero

    }

      enregistrerArticle = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/modifier_article_stock/' + this.state.objetEdit.id, {

                numero_article: this.numero_article.value,
                famille_id: this.famille_id.value,
                type_article: this.type_article.value,
                libelle_article: this.libelle_article.value,
                marque_id: this.marque_id.value ,
                modele: this.modele.value,
                fournisseur_id: this.fournisseur_id.value,
                numero_commande_fournisseur: this.numero_commande_fournisseur.value,
               // quantite_phisique_stock: this.quantite_phisique_stock.value,
                seuil_alerte: this.seuil_alerte.value,
               // quantite_disponible_stock: this.quantite_disponible_stock.value,
                prix_article: this.prix_article.value,
                tva: this.tva.value,
               // valorisation_hors_taxe: this.valorisation_hors_taxe.value,
               // valorisation_ttc: this.valorisation_ttc.value,

            })
            .then(response => { 
               const action = {type: "EDIT_ARTICLE", value: response.data}
                 this.props.dispatch(action)

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
       const {objetEdit} = this.state
       if(objetEdit !== undefined){
        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Ajout d'article
                                                         
                          </h5>
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerArticle}>
                          
                               
                                <div className="form-row">

                                <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >N° d'article * </label>
                                            <input name="numero_article"  type="text"
                                            onChange={this.setField}
                                            readOnly
                                            defaultValue={objetEdit.numero_article}
                                            ref={numero_article => this.numero_article = numero_article}
                                             className="form-control" />
                                             </div>
                                    </div>

                                <div className="col-md-3">
                                         <label  className="">Famille</label>
                                        <select name="famille_id" onChange={this.setFieldFamille}
                                            ref={famille_id => this.famille_id = famille_id}
                                            defaultValue={objetEdit.famille_id}

                                            style={inputStyle}

                                          className="form-control">
                                        <option value={null}></option>

                                        {this.props.famille_pieces_detaches.map(piece => 
                                                <option key={piece.id} value={piece.id}>{piece.famille} </option>

                                                )}
                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Type</label>
                                        <select name="type_article" onChange={this.setField}
                                            ref={type_article => this.type_article = type_article}
                                            defaultValue={objetEdit.type_article}

                                          className="form-control">
                                        <option value={1}>Pièce détachée</option>
                                        <option value={2}>Consommable</option>

                                       
                                        </select>
                                
                                        </div>

                                 

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Libéllé article *</label>
                                            <input name="libelle_article"  type="text"
                                                defaultValue={objetEdit.libelle_article}

                                            style={inputStyle}
                                            onChange={this.setField}
                                            ref={libelle_article => this.libelle_article = libelle_article}
                                             className="form-control" />
                                             </div>
                                    </div>

                                  
                                </div>

                                <div className="form-row">

                                <div className="col-md-3">
                                            <label  className="">Marque</label>
                                            <select name="marque_id" onChange={this.setField}
                                                defaultValue={objetEdit.marque_id}

                                                ref={marque_id => this.marque_id = marque_id}
                                            className="form-control">
                                            <option value={null}></option>

                                            {this.props.marques.map(marque => 
                                                    <option key={marque.id} value={marque.id}>{marque.nom_marque}  </option>

                                                    )}
                                            </select>

                                            </div>

                                    <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Modèle </label>
                                                <input name="modele"  type="text"
                                                onChange={this.setField}
                                                defaultValue={objetEdit.modele}

                                                ref={modele => this.modele = modele}
                                                className="form-control" />
                                                </div>
                                        </div>

                                 
                                        <div className="col-md-3">
                                            <label  className="">Fournisseur</label>
                                            <select name="fournisseur_id" onChange={this.setField}
                                                ref={fournisseur_id => this.fournisseur_id = fournisseur_id}
                                                style={inputStyle}
                                                defaultValue={objetEdit.fournisseur_id}

                                            className="form-control">
                                            <option value={null}></option>

                                            {this.props.tiers.map(tier => 
                                                    <option key={tier.id} value={tier.id}>{tier.code}  </option>

                                                    )}
                                            </select>

                                            </div>
                                          

                                    

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >N° commande fournisseur</label>
                                                <input name="numero_commande_fournisseur"  type="text"
                                                defaultValue={objetEdit.numero_commande_fournisseur}
                                                onChange={this.setField}
                                                ref={numero_commande_fournisseur => this.numero_commande_fournisseur = numero_commande_fournisseur}
                                                className="form-control" />
                                                </div>
                                        </div>

                                    
                                    </div>

                                <div className="form-row">
                                <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Quantités ===></label>
                                           
                                             </div>
                                    </div>
                                     <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Physique en stock</label>
                                            <input name="quantite_phisique_stock"  type="number"
                                            readOnly
                                            onChange={this.setField}
                                            defaultValue={objetEdit.quantite_phisique_stock ? objetEdit.quantite_phisique_stock : 0}

                                            ref={quantite_phisique_stock => this.quantite_phisique_stock = quantite_phisique_stock}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Disponible en stock</label>
                                            <input name="quantite_disponible_stock"  type="number"
                                            readOnly
                                            defaultValue={objetEdit.quantite_disponible_stock ? objetEdit.quantite_disponible_stock : 0}

                                            onChange={this.setField}
                                            ref={quantite_disponible_stock => this.quantite_disponible_stock = quantite_disponible_stock}
                                             className="form-control" />
                                             </div>
                                    </div> 

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Seuil Alerte</label>
                                            <input name="seuil_alerte"  type="number"
                                            onChange={this.setField}
                                            defaultValue={objetEdit.seuil_alerte}

                                            ref={seuil_alerte => this.seuil_alerte = seuil_alerte}
                                             className="form-control" />
                                             </div>
                                    </div>

                                  
                                   
                                </div>

                                <div className="form-row">

                                <div className="col-md-3">
                                        <div className="position-relative form-group">
                                           
                                             </div>
                                    </div>
                                        
                                    <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Prix de l'article </label>
                                                <input name="prix_article"  type="number"
                                                onChange={this.setField}
                                                style={inputStyle}
                                                defaultValue={objetEdit.prix_article}

                                                ref={prix_article => this.prix_article = prix_article}
                                                className="form-control" />
                                                </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Taux TVA</label>
                                                <input name="tva"  type="number"
                                                onChange={this.setField}
                                                defaultValue={objetEdit.tva}
                                                ref={tva => this.tva = tva}
                                                className="form-control" />
                                                </div>
                                        </div>


                                    </div>

                                 <div className="form-row">

                                <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Valorisation du stock ===></label>
                                           
                                             </div>
                                    </div>

                                        <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Hors Taxes </label>
                                                    <input name="valorisation_hors_taxe"  type="number"
                                                    onChange={this.setField}
                                                    defaultValue={objetEdit.valorisation_hors_taxe ? objetEditvalorisation_hors_taxe : 0}
                                                    readOnly
                                                    ref={valorisation_hors_taxe => this.valorisation_hors_taxe = valorisation_hors_taxe}
                                                    className="form-control" />
                                                    </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >T T C</label>
                                                    <input name="valorisation_ttc"  type="number"
                                                    readOnly
                                                    onChange={this.setField}
                                                    defaultValue={objetEdit.valorisation_hors_taxe ? objetEditvalorisation_hors_taxe : 0}

                                                    ref={valorisation_ttc => this.valorisation_ttc = valorisation_ttc}
                                                    className="form-control" />
                                                    </div>
                                            </div>

                                    
                                        </div> 

                                      

                            
                          

                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                          
                                <button type="submit" onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</button>
                            </form>
                        </div>
                    </div>
                
                    <ToastContainer autoClose={4000} />
       </div>
        )
       } else{
        return ( <span style={{textAlign: 'center'}}>

        <Loader
            
            height={100}
            width={100}
         />
         </span>)
    }
        
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

export default connect(mapStateToProps)(ModifierArticle)
