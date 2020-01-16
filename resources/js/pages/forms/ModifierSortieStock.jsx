import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'

import inputStyle from '../../utils/inputStyle'
import Loader from 'react-loader-spinner'



 class ModifierSortieStock extends Component {
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
        const article = this.props.articles.find(article => article.id == this.props.match.params.article_id)
        const objetEdit = this.props.sorties_stock.find(sortie => sortie.id == this.props.match.params.sortie_stock_id)

          if(this.quantite_sortie.value == ''){
              return "Veuillez renseinger la quantité sortie !"
          }else if(this.date_sortie.value == ''){
              return "Veuillez renseigner la date de sortie stock !"
          }else if(Number(this.quantite_sortie.value) > (Number(article.quantite_disponible_stock) + Number(objetEdit.quantite_sortie) ) ){
            return "La quantité disponible en stock est insuffisante pour couvrir cette sortie !"
          }else if(this.prix_article.value == ''){
            return "Veuillez renseinger le prix de l'article !"
          } else{
              return null
          }
      }

  

      enregistrerSortieStock = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            const objetEdit = this.props.sorties_stock.find(sortie => sortie.id == this.props.match.params.sortie_stock_id)

            axios.post('/api/modifier_sortie_stock/' + objetEdit.id, {
                vehicule_id: this.vehicule_id.value,
                date_sortie: this.date_sortie.value,
                quantite_sortie: this.quantite_sortie.value,
                prix_article: this.prix_article.value,
              
            })
            .then(response => { 
               const action = {type: "EDIT_SORTIE_STOCK", value: response.data.sortie}
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
        const objetEdit = this.props.sorties_stock.find(sortie => sortie.id == this.props.match.params.sortie_stock_id)

       // console.log(this.numero_contrat_police)
       if(objetEdit != undefined){
        const article = this.props.articles.find(article => article.id == this.props.match.params.article_id)

        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Modification d'une Sortie du Stock</h5>
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerSortieStock}>
                          
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
                                <hr/>

                                
                                <div className="form-row">
                                                        <div className="col-md-3">
                                                            <label className="">Quantités</label>

                                                        </div>

                                                        
                                                        <div className="col-md-2">
                                                            <label className="">Physique en stock</label>

                                                        </div>


                                                        <div className="col-md-2">
                                                            <input name="quantite_phisique_stock" type="number"
                                                                onChange={this.setField}
                                                                readOnly
                                                                style={inputStyle}
                                                                defaultValue={article.quantite_phisique_stock + objetEdit.quantite_sortie}
                                                                ref={quantite_phisique_stock => this.quantite_phisique_stock = quantite_phisique_stock}
                                                                className="form-control" />

                                                        </div>



                                                        <div className="col-md-2">
                                                            <label className="">Disponible en stock</label>

                                                        </div>


                                                        <div className="col-md-2">
                                                            <input name="quantite_disponible_stock" type="number"
                                                                onChange={this.setField}
                                                                readOnly
                                                                style={inputStyle}
                                                                defaultValue={article.quantite_disponible_stock + objetEdit.quantite_sortie}
                                                                ref={quantite_disponible_stock => this.quantite_disponible_stock = quantite_disponible_stock}
                                                                className="form-control" />

                                                        </div>

                                                    </div>
                                                    <hr />


                                <div className="form-row">
                               <label >Sortie </label>
  
                               </div>
                               <hr/>

                                <div className="form-row">

                                    <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Date de sortie  </label>
                                                <input name="date_sortie"  type="date"
                                                onChange={this.setField}
                                                style={inputStyle}
                                                defaultValue={objetEdit.date_sortie}
                                                ref={date_sortie => this.date_sortie = date_sortie}
                                                className="form-control" />
                                                </div>
                                        </div>

                                 
                                     
                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Quantité sortie</label>
                                                <input name="quantite_sortie"  type="number"
                                                onChange={this.setField}
                                                defaultValue={objetEdit.quantite_sortie}
                                                max={article.quantite_disponible_stock + objetEdit.quantite_sortie}
                                                style={inputStyle}
                                                ref={quantite_sortie => this.quantite_sortie = quantite_sortie}
                                                className="form-control" />
                                                </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Prix Article</label>
                                                <input name="prix_article"  type="number"
                                                onChange={this.setField}
                                                readOnly
                                                style={inputStyle}
                                                defaultValue={article.prix_article}
                                                ref={prix_article => this.prix_article = prix_article}
                                                className="form-control" />
                                                </div>
                                        </div>

                                        <div className="col-md-4">
                                            <label  className="">Véhicule pour lequel a été faite la sortie</label>
                                            <select name="vehicule_id" onChange={this.setField}
                                                ref={vehicule_id => this.vehicule_id = vehicule_id}
                                                defaultValue={objetEdit.vehicule_id}

                                            className="form-control">
                                            <option value={null}></option>

                                            {this.props.vehicules.map(vehicule => 
                                                        <React.Fragment key={vehicule.id}>
                                                            <option  value={vehicule.id}>{vehicule.immatriculation}  </option>
                                                            <option value={null} disabled>------------------</option>

                                                        </React.Fragment>

                                                    )}
                                            </select>

                                            </div>

                                    
                                    </div>


                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                          
                                <span onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
                            </form>
                        </div>
                    </div>
                
                    <ToastContainer autoClose={4000} />
       </div>
        )
       }else{
        return ( <span style={{textAlign: 'center'}}>

        <Loader
            
            height={500}
            width={300}
         />
         </span>)
       }
    }
}

const mapStateToProps = state => {
    return {
        vehicules: state.vehicules.items,
        sorties_stock: state.sorties_stock.items,
        articles: state.articles.items,
    }
  }

export default connect(mapStateToProps)(ModifierSortieStock)
