import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'


 class AjouterTier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode_reglement: 'Virement',
            fournisseur: 'Fournisseur Interne'
        }
      
    }

    componentDidMount(){
   
    }

    // componentWillUnmount(){
    //     this.props.history.push('/gestion-des-entites', {ent : this.props.entites})

    // }

 

   

    setField = (event) => {
          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;
      
          this.setState({
            [name]: value
          });
        }

      verificationFormulaire () {
          if(this.state.code == undefined || !this.state.code.length){
              return "Le code est obligatoire !"
          }else if(this.state.nom == undefined || !this.state.nom.length){
              return "Le nom du Tiers est obligatoire !"
          } else{
              return null
          }
      }

      enregistrerPersonnel = (e) => {
        e.preventDefault()
     // console.log(this.verificationFormulaire())

          if(this.verificationFormulaire() == null){
           // console.log(this.state)
            axios.post('/api/ajouter_tier', this.state)
            .then(response => {
       
               const action = {type: "ADD_ENTITE", value: response.data}
                 this.props.dispatch(action)

               this.props.history.push('/gestion-des-tiers')

             
            }).catch(error => console.log(error))
           

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }

        console.log(this.state)
      }
    

    render() {
        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Gestion des Tiers</h5>
                            <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>
                                <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Code *</label>
                                            <input name="code"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Nom *</label>
                                            <input name="nom"  type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Metier Principal </label>
                                            <input name="metier_principal"  type="text" className="form-control" />
                                        </div>
                                    </div>
                                  
                                </div>

                                 

                                    <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Adresse </label>
                                            <input name="adresse1"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Adresse </label>
                                            <input name="adresse2" type="text" className="form-control" />
                                        </div>
                                    </div>
                                  
                                </div>
                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Autre métier</label>
                                            <input name="autre_metier1"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Autre métier</label>
                                            <input name="autre_metier2"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Code postal</label>
                                            <input name="code_postal" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Ville</label>
                                            <input name="ville" type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Pays</label>
                                            <input name="pays"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Télephonne</label>
                                            <input name="telephonne"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Fax</label>
                                            <input name="fax" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Adresse internet de messagerie</label>
                                            <input name="adresse_messagerie" type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Numero de siret</label>
                                            <input name="numero_de_siret"  type="text" className="form-control" /></div>
                                    </div>
                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Fournisseur Interne 
                                             <input onChange={this.setField}
                                               type="radio"
                                               checked={this.state.fournisseur === "Fournisseur Interne"}
                                               value="Fournisseur Interne"
                                                 name="fournisseur" className="" /> </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Fournisseur Externe  <input onChange={this.setField}
                                             type="radio" value="Fournisseur Externe"
                                             checked={this.state.fournisseur === "Fournisseur Externe"}
                                              name="fournisseur" className="" /> </label>
                                        </div>
                                    </div>
                                 
                                   
                                 
                                </div>

                                <div className="form-row">
                                   
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="center">Mode de règlement</label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           Virement  <input type="radio"
                                             onChange={this.setField}
                                              name="mode_reglement"
                                              checked={this.state.mode_reglement === "Virement"}
                                               value="Virement"  className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Chèque  <input type="radio"
                                            onChange={this.setField} 
                                            name="mode_reglement"
                                            checked={this.state.mode_reglement === "Chèque"}
                                             value="Chèque" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Carte bancaire  <input type="radio"
                                            onChange={this.setField} name="mode_reglement"
                                            checked={this.state.mode_reglement === "Carte bancaire"}

                                             value="Carte bancaire" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Espèces  <input type="radio" onChange={this.setField}
                                            name="mode_reglement"
                                            checked={this.state.mode_reglement === "Espèces"}
                                             value="Espèces" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Traite  <input type="radio" onChange={this.setField} 
                                           name="mode_reglement" 
                                           checked={this.state.mode_reglement === "Traite"}
                                           value="Traite" className="" /></label>
                                       </div>
                                   </div>
                               </div>

                          

                                    <div className="form-row">
                                        <div className="col-md-4">
                                    <label  className="">N° de client de l'établissement chez ce Tiers</label>
                                    <input name="numero_client_etablissement" type="text" className="form-control" />

                                        </div>
                                      
                                        <div className="col-md-6">
                                            <label >N° compte du Tiers en comptabilité générale</label>

                                            <input name="numero_compte" type="text" className="form-control" />
                                        </div>

                                    
                                    </div>

                                    <div className="form-row">
                                    <div className="col-md-4">
                                            <label >Delai de règlement</label>

                                            <input  name="delai_reglement" type="text" className="form-control" />
                                        </div>
                                      
                                        <div className="col-md-4">
                                            <label >Nom de la banque du Tiers</label>

                                            <input name="nom_banque" type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-4">
                                            <label >RIB Bancaire</label>

                                            <input name="rib" type="text" className="form-control" />
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
    }
}

const mapStateToProps = state => {
    return {
        types_entites: state.types_entites.types_entites,
        structures_etablissements: state.structures_etablissements.structures_etablissements,
    }
  }

export default connect(mapStateToProps)(AjouterTier)
