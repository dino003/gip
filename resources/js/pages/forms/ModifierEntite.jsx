import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import { getTypeEntites } from '../../actions/codifications/TypeEntiteActions';
import {getStructuresEtablissements} from '../../actions/parametres/StructureRegroupementActions'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


 class ModifierEntite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            entiteModif: undefined
        }
      
    }

    componentDidMount(){
      //  this.props.dispatch(getTypeEntites());
      //  this.props.dispatch(getStructuresEtablissements());
        //this.props.dispatch(getEntites())
        axios.get('/api/voir_entite/' + this.props.match.params.entite_id).then(response => {
           // const action = {type: "GET_ENTITE", value: response.data}
           //  this.props.dispatch(action)
           this.setState({entiteModif: response.data})
     })

       // console.log(this.props.dispatch(getEntites()))

       //console.log(this.props.match.params.entite_id)
    }

    // componentWillUnmount(){
    //     this.props.history.push('/gestion-des-entites', {ent : this.props.entites})

    // }

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

    toggleActif = () => {
        this.setState(prevState => {
            return {actif: !prevState.actif}
        })
    }

    togglePersonnePrioritaire = () => {
        this.setState(prevState => {
            return {personne_prioritaire: !prevState.personne_prioritaire}
        })
    }

    toggleStatutChauffeur = () => {
        this.setState(prevState => {
            return {statut_chaufeur: !prevState.statut_chaufeur}
        })
    }

    setField = (e) => {
        this.setState({[e.target.name]: e.target.value}) 
      }

      verificationFormulaire () {
          if(this.entite.value == undefined || !this.entite.value.length){
              return "L'entité est obligatoire !"
          }else if(this.nom_entite.value == undefined || !this.nom_entite.value.length){
              return "Le nom de l'entité est obligatoire !"
          }else if(!this.type_entite.value || this.type_entite.value == null){
            return "Le type d'entité est obligatoire !"
          }else if(!this.regroupement.value || this.regroupement.value == null){
            return "Le Regroupement est obligatoire !"
          } else{
              return null
          }
      }

      enregistrerPersonnel = (e) => {
        e.preventDefault()
     // console.log(this.verificationFormulaire())
    // console.log(this.entite.value, this.responsable.value, this.telephonne1.value)
   // console.log(this.type_entite.value)

          if(this.verificationFormulaire() == null){
             // console.log('test')
            axios.post('/api/modifier_entite/' + this.state.entiteModif.id, {
                entite: this.entite.value,
                nom_entite: this.nom_entite.value,
                adresse1: this.adresse1.value,
                adresse2: this.adresse2.value,
                adresse_email: this.adresse_email.value,
                code_postal: this.code_postal.value,
                ville: this.ville.value,
                telephonne1: this.telephonne1.value,
                fax: this.fax.value,
                type_entite: this.type_entite.value,
                regroupement: this.regroupement.value,
                rattachement: this.rattachement.value,
                responsable: this.responsable.value,
                telephonne_responsable: this.telephonne_responsable.value,
                fax_responsable: this.fax_responsable.value,
                numero_siret_entite: this.numero_siret_entite.value,
                numero_centre_analytique: this.numero_centre_analytique.value,
                numero_comptable: this.numero_comptable.value,
                lieu_prise_en_charge: this.lieu_prise_en_charge.value,
                lieu_restitution: this.lieu_restitution.value,
                lieu_stockage_double_cle: this.lieu_stockage_double_cle.value,

            })
            .then(response => {
              
               const action = {type: "EDIT_ENTITE", value: response.data}
                 this.props.dispatch(action)
             //  this.props.dispatch(getEntites())

               this.props.history.push('/gestion-des-entites')

             
            }).catch(error => console.log(error))           

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
      }
    

    render() {
        const {entiteModif} = this.state
        console.log(entiteModif)
        return (
            <div className="app-main__inner">
                {this.state.entiteModif != undefined ? 
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Modification </h5>
                            <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Entité *</label>
                                            <input name="entite"
                                             ref={entite => this.entite = entite}
                                             defaultValue={entiteModif.entite}  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="position-relative form-group">
                                            <label >nom *</label>
                                            <input name="nom_entite"
                                             ref={nom_entite => this.nom_entite = nom_entite}
                                             defaultValue={entiteModif.nom_entite}  type="text" className="form-control" />
                                        </div>
                                    </div>
                                  
                                </div>
                                 

                                    <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Adresse 1</label>
                                            <input name="adresse1"
                                             ref={adresse1 => this.adresse1 = adresse1}
                                             defaultValue={entiteModif.adresse1}  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Adresse 2</label>
                                            <input name="adresse2"
                                             ref={adresse2 => this.adresse2 = adresse2}
                                             defaultValue={entiteModif.adresse2} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="position-relative form-group">
                                            <label >Nom de boite la boîte aux lettres de messagerie de l'entité</label>
                                            <input name="adresse_email"
                                             ref={adresse_email => this.adresse_email = adresse_email}
                                             defaultValue={entiteModif.adresse_email}  type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Code postal</label>
                                            <input name="code_postal"
                                             ref={code_postal => this.code_postal = code_postal}
                                             defaultValue={entiteModif.code_postal}  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Ville</label>
                                            <input name="ville"
                                             ref={ville => this.ville = ville}
                                             defaultValue={entiteModif.ville}  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Telephonne</label>
                                            <input name="telephonne1"
                                             ref={telephonne1 => this.telephonne1 = telephonne1}
                                             defaultValue={entiteModif.telephonne1} type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="position-relative form-group">
                                            <label >Fax</label>
                                            <input name="fax"
                                             ref={fax => this.fax = fax}
                                             defaultValue={entiteModif.fax} type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                        <div className="col-md-3">
                                    <label  className="">Type d'entité</label>
                                        <select name="type_entite"
                                         ref={type_entite => this.type_entite = type_entite}
                                         defaultValue={entiteModif.type_entite.id}
                                          onChange={this.setField}  className="form-control">
                                        <option value={null}></option>

                                        {this.props.types_entites.map(ent => 
                                                <option key={ent.id} value={ent.id}>{ent.type_entite}</option>

                                                )}
                                        </select>
                                
                                        </div>
                                        <div className="col-md-4">
                                    <label  className="">Regroupement</label>
                                        <select name="regroupement"
                                         ref={regroupement => this.regroupement = regroupement}
                                         defaultValue={entiteModif.regroupement.id}
                                          onChange={this.setField}  className="form-control">
                                            <option value={null}></option>
                                          {this.props.structures_etablissements.map(st => 
                                            <option key={st.id} value={st.id}>{st.code_regroupement}</option> )}
                                        </select>
                                
                                        </div>
                                        <div className="col-md-5">
                                            <label >Rattachement dans la structure</label>

                                            <input name="rattachement"
                                             ref={rattachement => this.rattachement = rattachement}
                                             defaultValue={entiteModif.rattachement} readOnly type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-3">
                                    <label  className="">Responsable</label>
                                        <select name="responsable"
                                         ref={responsable => this.responsable = responsable}
                                         defaultValue={entiteModif.responsable}  className="form-control">
                                          <option value={null}></option>
                                          {this.props.personnels.map(per => 
                                            <option key={per.id} value={per.id}>{per.nom} {per.prenom}</option> )}
                                        </select>
                                
                                        </div>
                                      
                                        <div className="col-md-5">
                                            <label >Telephonne portable (Responsable)</label>

                                            <input name="telephonne_responsable"
                                             ref={telephonne_responsable => this.telephonne_responsable = telephonne_responsable}
                                             defaultValue={entiteModif.telephonne_responsable} type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-4">
                                            <label >Fax (Responsable)</label>

                                            <input name="fax_responsable"
                                             ref={fax_responsable => this.fax_responsable = fax_responsable}
                                             defaultValue={entiteModif.fax_responsable} type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-2">
                                    <label  className="">N SIRET de l'entité</label>
                                    <input name="numero_siret_entite"
                                     ref={numero_siret_entite => this.numero_siret_entite = numero_siret_entite}
                                     defaultValue={entiteModif.numero_siret_entite} type="text" className="form-control" />

                                
                                        </div>
                                      
                                        <div className="col-md-5">
                                            <label >N de Centre Analytique (de responsabilité, de profit)</label>

                                            <input name="numero_centre_analytique"
                                             ref={numero_centre_analytique => this.numero_centre_analytique = numero_centre_analytique}
                                             defaultValue={entiteModif.numero_centre_analytique} type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-5">
                                            <label >N Comptable (Compte de comptabilité générale) de l'entité</label>

                                            <input name="numero_comptable"
                                             ref={numero_comptable => this.numero_comptable = numero_comptable}
                                             defaultValue={entiteModif.numero_comptable} type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-4">
                                    <label  className="">Lieu de prise en charge du Véhicule et des clés</label>
                                    <input name="lieu_prise_en_charge"
                                     ref={lieu_prise_en_charge => this.lieu_prise_en_charge = lieu_prise_en_charge}
                                     defaultValue={entiteModif.lieu_prise_en_charge} type="text" className="form-control" />

                                
                                        </div>
                                      
                                        <div className="col-md-4">
                                            <label >Lieu de restitution du véhicule et des clés</label>

                                            <input name="lieu_restitution"
                                             ref={lieu_restitution => this.lieu_restitution = lieu_restitution}
                                             defaultValue={entiteModif.lieu_restitution} type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-4">
                                            <label >Lieu de stockage du double des clés</label>

                                            <input name="lieu_stockage_double_cle"
                                             ref={lieu_stockage_double_cle => this.lieu_stockage_double_cle = lieu_stockage_double_cle}
                                             defaultValue={entiteModif.lieu_stockage_double_cle} type="text" className="form-control" />
                                        </div>
                                    </div>

                              

                          

                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                           
                                <span onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
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
        types_entites: state.types_entites.items,
        structures_etablissements: state.structures_etablissements.items,
        personnels: state.personnels.items,

    }
  }

export default connect(mapStateToProps)(ModifierEntite)
