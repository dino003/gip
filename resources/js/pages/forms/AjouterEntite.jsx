import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import { getTypeEntites } from '../../actions/codifications/TypeEntiteActions';
import {getStructuresEtablissements} from '../../actions/parametres/StructureRegroupementActions'


 class AjouterEntite extends Component {
    constructor(props) {
        super(props);
        this.state = {}
      
    }

    componentDidMount(){
      //  this.props.dispatch(getTypeEntites());
       // this.props.dispatch(getStructuresEtablissements());
        //this.props.dispatch(getEntites())
    //     axios.get('api/entites').then(response => {
    //         const action = {type: "GET_ENTITE", value: response.data}
    //          this.props.dispatch(action)
    //  })

       // console.log(this.props.dispatch(getEntites()))
    }

    // componentWillUnmount(){
    //     this.props.history.push('/gestion-des-entites', {ent : this.props.entites})

    // }

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
          if(this.state.entite == undefined || !this.state.entite.length){
              return "L'entité est obligatoire !"
          }else if(this.state.nom_entite == undefined || !this.state.nom_entite.length){
              return "Le nom de l'entité est obligatoire !"
          }else if(this.state.type_entite == undefined || this.state.type_entite == null){
            return "Le type d'entité est obligatoire !"
          }else if(this.state.regroupement == undefined || this.state.regroupement == null){
            return "Le Regroupement est obligatoire !"
          } else{
              return null
          }
      }

      enregistrerPersonnel = (e) => {
        e.preventDefault()
     // console.log(this.verificationFormulaire())

          if(this.verificationFormulaire() == null){
           // console.log(this.state)
            axios.post('/api/ajouter_entite', this.state)
            .then(response => {
            //     if(response.Status == 200){
            //     //  const action = {type: "GET_ENTITE", payload: response.data}
            //   //  this.props.dispatch(action)
            //   this.props.dispatch(getEntites())

            //   this.props.history.push('/gestion-des-entites')
            // //console.log(this.props.entites)
            //     }

               const action = {type: "ADD_ENTITE", value: response.data}
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
        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Gestion des Entités</h5>
                            <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Entité *</label>
                                            <input name="entite"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="position-relative form-group">
                                            <label >nom *</label>
                                            <input name="nom_entite"  type="text" className="form-control" />
                                        </div>
                                    </div>
                                  
                                </div>
                                 

                                    <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Adresse 1</label>
                                            <input name="adresse1"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Adresse 2</label>
                                            <input name="adresse2" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="position-relative form-group">
                                            <label >Nom de boite la boîte aux lettres de messagerie de l'entité</label>
                                            <input name="adresse_email"  type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Code postal</label>
                                            <input name="code_postal"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Ville</label>
                                            <input name="ville"  type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Telephonne</label>
                                            <input name="telephonne1" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="position-relative form-group">
                                            <label >Fax</label>
                                            <input name="fax" type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                        <div className="col-md-3">
                                    <label  className="">Type d'entité</label>
                                        <select name="type_entite" onChange={this.setField}  className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.types_entites.map(ent => 
                                                <option key={ent.id} value={ent.id}>{ent.type_entite}</option>

                                                )}
                                        </select>
                                
                                        </div>
                                        <div className="col-md-4">
                                    <label  className="">Regroupement</label>
                                        <select name="regroupement" onChange={this.setField}  className="form-control">
                                            <option defaultValue={null}></option>
                                          {this.props.structures_etablissements.map(st => 
                                            <option key={st.id} value={st.id}>{st.code_regroupement}</option> )}
                                        </select>
                                
                                        </div>
                                        <div className="col-md-5">
                                            <label >Rattachement dans la structure</label>

                                            <input name="rattachement" readOnly type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-3">
                                    <label  className="">Responsable</label>
                                        <select name="responsable"  className="form-control">
                                          <option>ooopppp</option>
                                        </select>
                                
                                        </div>
                                      
                                        <div className="col-md-5">
                                            <label >Telephonne portable (Responsable)</label>

                                            <input name="telephonne_responsable" type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-4">
                                            <label >Fax (Responsable)</label>

                                            <input name="fax_responsable" type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-2">
                                    <label  className="">N SIRET de l'entité</label>
                                    <input name="numero_siret-entite" type="text" className="form-control" />

                                
                                        </div>
                                      
                                        <div className="col-md-5">
                                            <label >N de Centre Analytique (de responsabilité, de profit)</label>

                                            <input name="numero_centre_analytique" type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-5">
                                            <label >N Comptable (Compte de comptabilité générale) de l'entité</label>

                                            <input name="numero_comptable" type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="col-md-4">
                                    <label  className="">Lieu de prise en charge du Véhicule et des clés</label>
                                    <input name="lieu_prise_en_charge" type="text" className="form-control" />

                                
                                        </div>
                                      
                                        <div className="col-md-4">
                                            <label >Lieu de restitution du véhicule et des clés</label>

                                            <input name="lieu_restitution" type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-4">
                                            <label >Lieu de stockage du double des clés</label>

                                            <input name="lieu_stockage_double_cle" type="text" className="form-control" />
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
        types_entites: state.types_entites.items,
        structures_etablissements: state.structures_etablissements.items,
    }
  }

export default connect(mapStateToProps)(AjouterEntite)
