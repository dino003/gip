import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import inputStyle from '../../utils/inputStyle';


 class AjouterTier extends Component {
    constructor(props) {
        super(props);
        this.state = {
         isFormSubmitted: false
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

      enregistrerTiers = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
              this.setState({isFormSubmitted: true})
            axios.post('/api/ajouter_tier', {
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
                type_tiers: this.type_tiers.value,
                fournisseur: this.fournisseur.value,
                numero_client_etablissement: this.numero_client_etablissement.value,
                numero_compte: this.numero_compte.value,
                mode_reglement: this.mode_reglement.value,
                delai_reglement: this.delai_reglement.value,
                nom_banque: this.nom_banque.value,
                rib: this.rib.value,
                ville: this.ville.value,
                pays: this.pays.value,
                autre_metier2: this.autre_metier2.value
            })
            .then(response => {

               const action = {type: "ADD_TIER", value: response.data}
                 this.props.dispatch(action)
                this.setState({isFormSubmitted: false})
               this.props.history.goBack()


            }).catch(error => {
                    this.setState({isFormSubmitted: false})
                 console.log(error) } )


          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }

      }


    render() {
        return (
            <div className="app-main__inner">

                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Gestion des Tiers</h5>
                            <form className="" onChange={this.setField} onSubmit={this.enregistrerTiers}>
                                <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Code *</label>
                                            <input name="code"
                                            style={inputStyle}
                                            ref={code => this.code = code}
                                             type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Nom *</label>
                                            <input name="nom"
                                            style={inputStyle}
                                            ref={nom => this.nom = nom}

                                             type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Metier Principal </label>
                                            <input name="metier_principal"
                                            ref={metier_principal => this.metier_principal = metier_principal}

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

                                            type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Adresse </label>
                                            <input name="adresse2"
                                            ref={adresse2 => this.adresse2 = adresse2}

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

                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Autre métier</label>
                                            <input name="autre_metier2"
                                            ref={autre_metier2 => this.autre_metier2 = autre_metier2}

                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Code postal</label>
                                            <input name="code_postal"
                                            ref={code_postal => this.code_postal = code_postal}

                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Ville</label>
                                            <input name="ville"
                                            ref={ville => this.ville = ville}

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

                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Télephonne</label>
                                            <input name="telephonne"
                                            ref={telephonne => this.telephonne = telephonne}

                                             type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Fax</label>
                                            <input name="fax"
                                             ref={fax => this.fax = fax}

                                            type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Adresse internet de messagerie</label>
                                            <input name="adresse_messagerie"
                                            ref={adresse_messagerie => this.adresse_messagerie = adresse_messagerie}

                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label className="center">Type de Tiers</label>

                                            <select name="type_tiers"
                                            ref={type_tiers => this.type_tiers = type_tiers}

                                         onChange={this.setField}  className="form-control">
                                            <option ></option>

                                            <option >ASSUREUR</option>
                                            <option >CONCESIONNAIRE</option>

                                            <option >GARAGISTE</option>
                                            <option >STATION ESSENCE</option>



                                        </select>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Type de Fournisseur</label>

                                            <select name="fournisseur"
                                            ref={fournisseur => this.fournisseur = fournisseur}

                                         onChange={this.setField}  className="form-control">
                                            <option >Fournisseur Interne</option>
                                            <option >Fournisseur Externe</option>


                                        </select>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Mode de règlement</label>

                                            <select name="mode_reglement"
                                            ref={mode_reglement => this.mode_reglement = mode_reglement}

                                         onChange={this.setField}  className="form-control">
                                            <option >Virement</option>
                                            <option >Chèque</option>
                                            <option >Carte bancaire</option>
                                            <option >Espèces</option>
                                            <option >Traite</option>


                                        </select>
                                        </div>
                                    </div>

                                </div>


                                    <div className="form-row">
                                        <div className="col-md-4">
                                    <label  className="">N° de client de l'établissement chez ce Tiers</label>
                                    <input name="numero_client_etablissement"
                                            ref={numero_client_etablissement => this.numero_client_etablissement = numero_client_etablissement}

                                     type="text" className="form-control" />

                                        </div>

                                        <div className="col-md-6">
                                            <label >N° compte du Tiers en comptabilité générale</label>

                                            <input name="numero_compte"
                                            ref={numero_compte => this.numero_compte = numero_compte}

                                             type="text" className="form-control" />
                                        </div>


                                    </div>

                                    <div className="form-row">
                                    <div className="col-md-4">
                                            <label >Delai de règlement</label>

                                            <input  name="delai_reglement"
                                            ref={delai_reglement => this.delai_reglement = delai_reglement}

                                             type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-4">
                                            <label >Nom de la banque du Tiers</label>

                                            <input name="nom_banque"
                                            ref={nom_banque => this.nom_banque = nom_banque}

                                             type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-4">
                                            <label >RIB Bancaire</label>

                                            <input name="rib"
                                            ref={rib => this.rib = rib}

                                             type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>

                                <span onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
                            </form>
                        </div>
                    </div>

                    <ToastContainer autoClose={4000} />
       </div>
        )
    }
}



export default connect(null)(AjouterTier)
