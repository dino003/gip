import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


 class ModifierTiers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tiersModif: undefined
        }
      
    }

    componentDidMount(){
        axios.get('/api/voir_tier/' + this.props.match.params.tiers_id).then(response => {
            // const action = {type: "GET_ENTITE", value: response.data}
            //  this.props.dispatch(action)
            this.setState({tiersModif: response.data})
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

      verificationFormulaire () {
          if(this.code.value == undefined || !this.code.value.length){
              return "Le code est obligatoire !"
          }else if(this.nom.value == undefined || !this.nom.value.length){
              return "Le nom du Tiers est obligatoire !"
          } else{
              return null
          }
      }

      enregistrerPersonnel = (e) => {
        e.preventDefault()
        //console.log(this.state.fournisseur)
     // console.log(this.verificationFormulaire())

          if(this.verificationFormulaire() == null){
           // console.log(this.state)
            axios.post('/api/modifier_tier/' + this.state.tiersModif.id, {
                code: this.code.value,
                nom: this.nom.value,
                metier_principal: this.metier_principal.value,
                autre_metier1: this.autre_metier1.value,
                adresse1: this.adresse1.value,
                adresse2: this.adresse2.value,
                code_postal: this.code_postal.value,
                telephonne: this.telephonne.value,
                fax: this.fax.value,
                adresse_messagerie: this.adresse_messagerie.value,
                numero_de_siret: this.numero_de_siret.value,
                fournisseur: this.state.fournisseur,
                numero_client_etablissement: this.numero_client_etablissement.value,
                numero_compte: this.numero_compte.value,
                mode_reglement: this.state.mode_reglement,
                delai_reglement: this.delai_reglement.value,
                nom_banque: this.nom_banque.value,
                rib: this.rib.value,
                ville: this.ville.value,
                pays: this.pays.value,
                autre_metier2: this.autre_metier2.value
            })
            .then(response => {
       
               const action = {type: "EDIT_TIER", value: response.data}
                 this.props.dispatch(action)

               this.props.history.push('/gestion-des-tiers')

             
            }).catch(error => console.log(error))
           

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
      }

      renderLoading(){
        return  <span style={{textAlign: 'center'}}>

        <Loader
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
         />
         </span>
    }
    

    render() {
        const {tiersModif} = this.state
        return (
            <div className="app-main__inner">
             {this.state.tiersModif != undefined ? 

                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Modification du Tiers</h5>
                            <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>
                                <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Code *</label>
                                            <input name="code" 
                                             ref={code => this.code = code}
                                             defaultValue={tiersModif.code}
                                             type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Nom *</label>
                                            <input name="nom" 
                                              ref={nom => this.nom = nom}
                                              defaultValue={tiersModif.nom}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Metier Principal </label>
                                            <input name="metier_principal"
                                              ref={metier_principal => this.metier_principal = metier_principal}
                                              defaultValue={tiersModif.metier_principal}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                  
                                </div>
                                 

                                    <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Adresse </label>
                                            <input name="adresse1"
                                             ref={adresse1 => this.adresse1 = adresse1}
                                             defaultValue={tiersModif.adresse1}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Adresse </label>
                                            <input name="adresse2"
                                             ref={adresse2 => this.adresse2 = adresse2}
                                             defaultValue={tiersModif.adresse2}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                  
                                </div>
                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Autre métier</label>
                                            <input name="autre_metier1"
                                             ref={autre_metier1 => this.autre_metier1 = autre_metier1}
                                             defaultValue={tiersModif.autre_metier1}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Autre métier</label>
                                            <input name="autre_metier2" 
                                             ref={autre_metier2 => this.autre_metier2 = autre_metier2}
                                             defaultValue={tiersModif.autre_metier2}
                                             type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Code postal</label>
                                            <input name="code_postal"
                                             ref={code_postal => this.code_postal = code_postal}
                                             defaultValue={tiersModif.code_postal}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Ville</label>
                                            <input name="ville"
                                             ref={ville => this.ville = ville}
                                             defaultValue={tiersModif.ville}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Pays</label>
                                            <input name="pays"
                                             ref={pays => this.pays = pays}
                                             defaultValue={tiersModif.pays}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Télephonne</label>
                                            <input name="telephonne"
                                             ref={telephonne => this.telephonne = telephonne}
                                             defaultValue={tiersModif.telephonne}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Fax</label>
                                            <input name="fax"
                                             ref={fax => this.fax = fax}
                                             defaultValue={tiersModif.fax}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Adresse internet de messagerie</label>
                                            <input name="adresse_messagerie"
                                             ref={adresse_messagerie => this.adresse_messagerie = adresse_messagerie}
                                             defaultValue={tiersModif.adresse_messagerie}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Numero de siret</label>
                                            <input name="numero_de_siret"
                                             ref={numero_de_siret => this.numero_de_siret = numero_de_siret}
                                             defaultValue={tiersModif.numero_de_siret}
                                              type="text" className="form-control" /></div>
                                    </div>
                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Fournisseur Interne  <input onChange={this.setField}
                                              type="radio"
                                             value="Fournisseur Interne"
                                             defaultChecked={this.state.tiersModif.fournisseur === "Fournisseur Interne"}

                                             name="fournisseur" className="" /> </label>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Fournisseur Externe  <input 
                                            
                                            value="Fournisseur Externe"

                                            defaultChecked={this.state.tiersModif.fournisseur === "Fournisseur Externe"}

                                             onChange={this.setField}
                                              type="radio" name="fournisseur" className="" /> </label>
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
                                            value="Virement"
                                            defaultChecked={this.state.tiersModif.mode_reglement === "Virement"}

                                            name="mode_reglement" 
                                             className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Chèque  <input type="radio" onChange={this.setField}
                                            value="Chèque"
                                            defaultChecked={this.state.tiersModif.mode_reglement === "Chèque"}

                                            name="mode_reglement" 
                                            className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Carte bancaire  <input type="radio"
                                            onChange={this.setField} name="mode_reglement" 
                                            value="Carte bancaire"
                                            defaultChecked={this.state.tiersModif.mode_reglement === "Carte bancaire"}
                                            className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Espèces  <input type="radio"
                                            onChange={this.setField}
                                             name="mode_reglement"
                                             value="Espèces"
                                             defaultChecked={this.state.tiersModif.mode_reglement === "Espèces"}
                                           
                                            className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Traite  <input type="radio"
                                            onChange={this.setField}
                                             name="mode_reglement" 
                                             value="Traite"
                                             defaultChecked={this.state.tiersModif.mode_reglement === "Traite"}
                                           
                                            className="" /></label>
                                       </div>
                                   </div>
                               </div>

                          

                                    <div className="form-row">
                                        <div className="col-md-4">
                                    <label  className="">N° de client de l'établissement chez ce Tiers</label>
                                    <input name="numero_client_etablissement"
                                     ref={numero_client_etablissement => this.numero_client_etablissement = numero_client_etablissement}
                                     defaultValue={tiersModif.numero_client_etablissement}
                                     type="text" className="form-control" />

                                        </div>
                                      
                                        <div className="col-md-6">
                                            <label >N° compte du Tiers en comptabilité générale</label>

                                            <input name="numero_compte"
                                             ref={numero_compte => this.numero_compte = numero_compte}
                                             defaultValue={tiersModif.numero_compte}
                                             type="text" className="form-control" />
                                        </div>

                                    
                                    </div>

                                    <div className="form-row">
                                    <div className="col-md-4">
                                            <label >Delai de règlement</label>

                                            <input  name="delai_reglement"
                                             ref={delai_reglement => this.delai_reglement = delai_reglement}
                                             defaultValue={tiersModif.delai_reglement}
                                             type="text" className="form-control" />
                                        </div>
                                      
                                        <div className="col-md-4">
                                            <label >Nom de la banque du Tiers</label>

                                            <input name="nom_banque"
                                             ref={nom_banque => this.nom_banque = nom_banque}
                                             defaultValue={tiersModif.nom_banque}
                                             type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-4">
                                            <label >RIB Bancaire</label>

                                            <input name="rib"
                                             ref={rib => this.rib = rib}
                                             defaultValue={tiersModif.rib}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>

                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                            </form>
                        </div>
                    </div>
                    : this.renderLoading()}

                
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

export default connect(mapStateToProps)(ModifierTiers)
