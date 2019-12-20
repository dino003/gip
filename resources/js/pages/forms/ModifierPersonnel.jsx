import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import inputStyle from '../../utils/inputStyle';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"


 class AjouterPersonnel extends Component {
    constructor(props) {
        super(props);
        this.state = {
         isFormSubmitted: false
        }
    }

    // componentDidMount(){
    //     axios.get('/api/voir_personnel/' + this.props.match.params.personnel_id).then(response => {
    //         // const action = {type: "GET_ENTITE", value: response.data}
    //         //  this.props.dispatch(action)
    //         this.setState({personneModif: response.data})
    //   })
    // }

    renderLoading(){
        return  <span style={{textAlign: 'center'}}>

        <Loader
          
          height={500}
          width={300}
         />
         </span>
    }

 

    setField = (event) => {
      //  this.setState({[e.target.name]: e.target.value})
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      setFieldEntiteAffectation = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.nom_entite_affectation.value = this.nomEntiteAffectation()
            // this.contenu_libelle_commande.value = this.LibelleAutoDeCommannde()

        });
    }

    nomEntiteAffectation = () => {
        //  this.libelle_commande.value = this.type_commande.value 
        if (this.entite_affectation != undefined && this.entite_affectation.value != '') {
           var enti = this.props.entites.find(ent => ent.id == this.entite_affectation.value)
           return  enti.nom_entite || null
        }

        return null

    }

      verificationFormulaire () {
          if(this.nom.value == ''){
              return "Le Nom est obligatoire !"
          }else if(this.prenom.value == ''){
              return "Le prenom est obligatoire !"
          }else if(this.entite_affectation.value == ''){
            return "L' entité d'affectation est obligatoire !"
          }else{
              return null
          }
      }

      enregistrerPersonnel = (e) => {
        e.preventDefault()
          if(this.verificationFormulaire() == null){
              this.setState({isFormSubmitted: true})
              const personneModif = this.props.personnels.find(per => per.id == this.props.match.params.personnel_id)

            axios.post('/api/modifier_personnel/' + personneModif.id, {
                nom: this.nom.value,
                prenom: this.prenom.value,
                actif: this.actif.checked,
                fonction: this.fonction.value,
                matricule: this.matricule.value,
                telephone: this.telephone.value,
                portable: this.portable.value,
                fax: this.fax.value,
                adresse_email: this.adresse_email.value,
                nationalite: this.nationalite.value,
                date_naissance: this.date_naissance.value,
                personne_prioritaire: this.personne_prioritaire.checked,
                statut_chaufeur: this.statut_chaufeur.checked,
                duree_contrat: this.duree_contrat.value,
                college: this.college.value,
                numero_permis_conduire: this.numero_permis_conduire.value,
                date_delivrance: this.date_delivrance.value,
                lieu_delivrance: this.lieu_delivrance.value,
                type_permis: this.type_permis.value,
                numero_conducteur_pour_gestion_carte: this.numero_conducteur_pour_gestion_carte.value,
                categorie: this.categorie.value,
                entite_affectation: this.entite_affectation.value,
                montant_aen: this.montant_aen.value,
                numero_autorisation_octroye: this.numero_autorisation_octroye.value,
                nom_entite_affectation: this.nom_entite_affectation.value,
                date_autorisation: this.date_autorisation.value
            }).then(response => {
                
               const action = {type: "EDIT_PERSONNEL", value: response.data}
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
        const personneModif = this.props.personnels.find(per => per.id == this.props.match.params.personnel_id)
        const {param_personnels} = this.props
        return (
            <div className="app-main__inner">
                {personneModif != undefined ? 
              
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Fichier du personnel</h5>
                            <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Nom</label>
                                            <input name="nom"
                                            style={inputStyle}
                                            ref={nom => this.nom = nom}
                                            defaultValue={personneModif.nom}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Prénom</label>
                                            <input name="prenom"
                                             style={inputStyle}

                                            ref={prenom => this.prenom = prenom}
                                            defaultValue={personneModif.prenom}

                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Décochez si inactif  <input type="checkbox"
                                             onChange={this.setField}
                                             defaultChecked={personneModif.actif}
                                             ref={actif => this.actif = actif}

                                               name="actif"  className="" /> </label>
                                        </div>
                                    </div>
                                </div>
                                    <div className="form-row">
                                        <div className="col-md-4">
                                    <label  className="">Entité d'affectation</label>
                                        <select name="entite_affectation" 
                                        defaultValue={personneModif.entite_affectation.id}
                                        style={inputStyle}
                                        onChange={this.setFieldEntiteAffectation}
                                        ref={entite_affectation => this.entite_affectation = entite_affectation}
                                         className="form-control">
                                            <option value={null}></option>
                                            {this.props.entites.map((ent, index) => 
                                             <option key={ent.id} value={ent.id}>{ent.entite} </option>

                                                )}
                                        </select>
                                
                                        </div>
                                        <div className="col-md-8">
                                            <label >Entité d'affectation</label>

                                            <input name="nom_entite_affectation"
                                             defaultValue={personneModif.nom_entite_affectation}
                                             style={inputStyle}

                                            ref={nom_entite_affectation => this.nom_entite_affectation = nom_entite_affectation}
                                             readOnly type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Fonction</label>
                                            <input name="fonction" 
                                            defaultValue={personneModif.fonction}

                                            ref={fonction => this.fonction = fonction}
                                             type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Matricule</label>
                                            <input name="matricule"
                                            defaultValue={personneModif.matricule}
                                            style={param_personnels.matricule_obligatoire ? inputStyle : null}
                                            required={param_personnels.matricule_obligatoire}
                                            ref={matricule => this.matricule = matricule}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="position-relative form-group">
                                            <label >Nom de la boite aux lettres de messagerie</label>
                                            <input name="adresse_email"
                                            defaultValue={personneModif.adresse_email}
                                            style={param_personnels.boite_lettre ? inputStyle : null}
                                            required={param_personnels.boite_lettre}
                                            ref={adresse_email => this.adresse_email = adresse_email}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Télephonne</label>
                                            <input name="telephone"
                                            defaultValue={personneModif.telephone}

                                            ref={telephone => this.telephone = telephone}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Portable</label>
                                            <input name="portable"
                                            defaultValue={personneModif.portable}

                                            ref={portable => this.portable = portable}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="position-relative form-group">
                                            <label >Fax</label>
                                            <input name="fax"
                                            defaultValue={personneModif.fax}

                                            ref={fax => this.fax = fax}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Nationnalité</label>
                                            <input name="nationalite"
                                            defaultValue={personneModif.nationalite}

                                            ref={nationalite => this.nationalite = nationalite}
                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >date de naissance</label>
                                            <input name="date_naissance"
                                            defaultValue={personneModif.date_naissance}

                                            ref={date_naissance => this.date_naissance = date_naissance}
                                             type="date" className="form-control" />
                                           {/* <InputMask name="date_naissance" className="form-control" mask="99/99/9999" /> */}
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Personne prioritaire (pour reservation) 
                                             <input type="checkbox"
                                              onChange={this.setField}
                                               defaultChecked={personneModif.personne_prioritaire}
                                               ref={personne_prioritaire => this.personne_prioritaire = personne_prioritaire}

                                                name="personne_prioritaire" className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Cette personne a un statut de chauffeur 
                                             <input type="checkbox"  onChange={this.setField}
                                            ref={statut_chaufeur => this.statut_chaufeur = statut_chaufeur}

                                                defaultChecked={personneModif.statut_chaufeur} 
                                                 name="statut_chaufeur" className="" /></label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                   
                                   <div className="col-md-6">
                                       <div className="position-relative form-group">
                                           <label className="center">Durée du contrat</label>

                                           <select name="duree_contrat"
                                           ref={duree_contrat => this.duree_contrat = duree_contrat}
                                            defaultValue={personneModif.duree_contrat}
                                        onChange={this.setField}  className="form-control">
                                           <option >Indéterminé</option>
                                           <option >Déterminé</option>
                                       </select>
                                       </div>
                                   </div>

                                   <div className="col-md-6">
                                       <div className="position-relative form-group">
                                           <label className="center">Collège</label>

                                           <select name="college"
                                           ref={college => this.college = college}
                                           defaultValue={personneModif.college}

                                        onChange={this.setField}  className="form-control">
                                           <option >Indéterminé</option>
                                           <option >Cadre</option>
                                           <option >Non Cadre</option>
                                           <option >Non Cadre, fait office de Cadre</option>

                                       </select>
                                       </div>
                                   </div>
                                

                                 
                               </div>

                          

                               <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Numero du permis de conduire</label>
                                            <input name="numero_permis_conduire"
                                             style={param_personnels.info_permis ? inputStyle : null}
                                             required={param_personnels.info_permis}
                                            ref={numero_permis_conduire => this.numero_permis_conduire = numero_permis_conduire}
                                              type="text"
                                              defaultValue={personneModif.numero_permis_conduire}
                                               className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de délivrance</label>
                                            <input name="date_delivrance"
                                                style={param_personnels.info_permis ? inputStyle : null}
                                                required={param_personnels.info_permis}
                                              defaultValue={personneModif.date_delivrance}

                                            ref={date_delivrance => this.date_delivrance = date_delivrance}
                                             type="date"  className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Lieu de délivrance</label>
                                            <input name="lieu_delivrance"
                                             defaultValue={personneModif.lieu_delivrance}
                                             style={param_personnels.info_permis ? inputStyle : null}
                                             required={param_personnels.info_permis}
                                            ref={lieu_delivrance => this.lieu_delivrance = lieu_delivrance}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Type de permis</label>

                                            <select name="type_permis"
                                            ref={type_permis => this.type_permis = type_permis}
                                                defaultValue={personneModif.type_permis}
                                         onChange={this.setField}  className="form-control">
                                            <option >BCDE</option>
                                            <option >A1</option>
                                            <option >A</option>
                                            <option >B</option>
                                            <option >C</option>
                                            <option >C1</option>
                                            <option >D</option>
                                            <option >E</option>
                                            <option >F</option>

                                        </select>
                                        </div>
                                    </div>
                                </div>

                             

                               <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Numero du conducteur (pour la gestion des cartes)</label>
                                            <input name="numero_conducteur_pour_gestion_carte"
                                            defaultValue={personneModif.numero_conducteur_pour_gestion_carte}
                                            ref={numero_conducteur_pour_gestion_carte => this.numero_conducteur_pour_gestion_carte = numero_conducteur_pour_gestion_carte}
                                             type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Catégorie de véhicule associé au statut de la personne</label>
                                            <select name="categorie"
                                        defaultValue={personneModif.categorie}

                                            ref={categorie => this.categorie = categorie}
                                             className="form-control">
                                            <option ></option>
                                        </select>                                        
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            <label >Montant AEN</label>
                                            <input name="montant_aen"
                                            defaultValue={personneModif.montant_aen}

                                            ref={montant_aen => this.montant_aen = montant_aen}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                
                               <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Autorisation d'utilisation de son véhicule personnel 
                                                pour des trajets professionnels
                                            </label>
                                           
                                             </div>
                                    </div>
                                    <div className="col-md-4">
                                    <div className="position-relative form-group">
                                            <label >N° autorisation octroyé</label>
                                            <input name="numero_autorisation_octroye"
                                            defaultValue={personneModif.numero_autorisation_octroye}

                                            ref={numero_autorisation_octroye => this.numero_autorisation_octroye = numero_autorisation_octroye}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Date de l'autorisation</label>
                                            <input name="date_autorisation"
                                            defaultValue={personneModif.date_autorisation}

                                            ref={date_autorisation => this.date_autorisation = date_autorisation}
                                              type="date" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
                           
                                <span onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
                            </form>
                        </div>
                    </div>
                    : this.renderLoading() }
                    <ToastContainer autoClose={8000} />
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        entites: state.entites.items,
        personnels: state.personnels.items,
        param_personnels: state.param_personnels.items

    }
  }

export default connect(mapStateToProps)(AjouterPersonnel)