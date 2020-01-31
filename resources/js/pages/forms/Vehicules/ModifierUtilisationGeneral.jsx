
import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';

import inputStyle from '../../../utils/inputStyle'
import Select from 'react-select'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



 class ModifierUtilisationGeneral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormSubmitted: false,
            vehicule: null
        }
      
    }

    setFieldVehicule(name, value) {
        let obj = {};
        obj[name] = value;
        this.setState(obj, () => {
            if(this.state.vehicule){
                this.kilometrage_compteur_debut.value = this.state.vehicule.kilometrage_acquisition
                if(this.state.vehicule.detenteur){
                    this.utilisateur.value = this.state.vehicule.detenteur.id
                    this.chauffeur.value = this.state.vehicule.detenteur.id

                }else{
                    this.utilisateur.value = null
                    this.chauffeur.value = null 
                }
            }else{
                this.kilometrage_compteur_debut.value = 0
                this.utilisateur.value = null
                this.chauffeur.value = null
            }
        });
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

        getIdsUtilisations = () => {
          const events = [];
          this.props.utilisations.filter(ut => ut.vehicule.id == this.props.match.params.vehicule_id).map(event => {
              return events.push(event.id)
          })
  
          return events
      }

      checkUtilisationisPossible = (date_debut_utilisation, date_fin_utilisation) => {
        const item = this.props.utilisations.find(utilisat => utilisat.id == this.props.match.params.utilisation_id)

        var vehicule =  item.vehicule
        var lesUtilisationsDuVehicule = this.props.utilisations.filter(util => util.vehicule.id == vehicule.id && util.id != item.id )
       
        var debut = Date.parse(date_debut_utilisation)
        var fin = Date.parse(date_fin_utilisation)

   /*      lesUtilisationsDuVehicule.map(utilisation => {
            let dateDebutDejaUtilise = Date.parse(utilisation.date_debut_utilisation)
            let dateFinDejaUtilise = Date.parse(utilisation.date_fin_utilisation )
            tab.push(debut >= dateDebutDejaUtilise && debut <= dateFinDejaUtilise)
            tab.push(fin >= dateDebutDejaUtilise && fin <= dateFinDejaUtilise)
            tab.push(debut <= dateDebutDejaUtilise && fin >= dateFinDejaUtilise)
        }) */

        let deja = lesUtilisationsDuVehicule.find(uti => {
            let dateDebutDejaUtilise = Date.parse(uti.date_debut_utilisation)
            let dateFinDejaUtilise = Date.parse(uti.date_fin_utilisation )
            return (debut >= dateDebutDejaUtilise && debut <= dateFinDejaUtilise) ||
                    (fin >= dateDebutDejaUtilise && fin <= dateFinDejaUtilise) ||
                    (debut <= dateDebutDejaUtilise && fin >= dateFinDejaUtilise)
        })
        return (deja ) ? `Ce véhicule est en cours d'utilisation.
        sorti le : ${moment(deja.date_debut_utilisation).format('DD/MM/YYYY')} à ${deja.heure_debut.slice(0, 5)} *** Retour prévue le : ${moment(deja.date_fin_utilisation).format('DD/MM/YYYY')} à ${deja.heure_de_fin.slice(0, 5)} 
        Utilisateur : ${deja.utilisateur ? !deja.utilisateur.default ? deja.utilisateur.prenom + ' ' + deja.utilisateur.prenom : 'PERSONNE PAR DEFAUT' : ''} ` : null 

 
       // return (tab.includes(true)) ? 'Ce véhicule est déja en cours d\'utilisation !' : null 
      }
      

    
        
      onEditSubmit = (e) => {
          e.preventDefault()
            if(this.verificationFormulaire() == null){
                if(this.checkUtilisationisPossible(this.date_debut_utilisation.value, this.date_fin_utilisation.value) == null){

              const item = this.props.utilisations.find(utilisat => utilisat.id == this.props.match.params.utilisation_id)
      
              this.setState({isFormSubmitted: true})
             // var id_derniere_utilisation = Math.max(...this.getIdsUtilisations(), 0);
     
            //  var isDerniere = item.id == id_derniere_utilisation
           //   var url = isDerniere ? '/api/modifier_vehicule_utilisation_derniere/' : '/api/modifier_vehicule_utilisation/' ;
              const utili = this.props.personnels.find(per => per.id == this.utilisateur.value)
     
                axios.post('/api/modifier_vehicule_utilisation/' +  item.id, {
                        // vehicule: this.props.vehiculeSeleted.id,
                       // vehicule_id: vehicule.id,
                         utilisateur_id: this.utilisateur.value,
                         chauffeur_id: this.chauffeur.value,
                         utilisatation_normal_ou_pret: this.utilisatation_normal_ou_pret.value,
                         utilisateur: this.utilisateur.value,
                         entite_utilisateur: utili.entite_affectation ? utili.entite_affectation.id : null,
                         entite_utilisateur_id: utili.entite_affectation? utili.entite_affectation.id : null,
                         nature_utilisation: this.nature_utilisation.value,
                         chauffeur: this.chauffeur.value,
                         date_debut_utilisation: this.date_debut_utilisation.value,
                         date_fin_utilisation: this.date_fin_utilisation.value,
                         heure_debut: this.heure_debut.value,
                         heure_de_fin: this.heure_de_fin.value,
                         kilometrage_compteur_debut: this.kilometrage_compteur_debut.value,
                         kilometrage_compteur_retour: this.kilometrage_compteur_retour.value,
                         kilometres_parcourus: this.kilometres_parcourus.value,
                         lieu_depart: this.lieu_depart.value,
                         destination: this.destination.value,  
                }).then(response => {
                    if(response.data.utilisation && response.data.vehicule){
                      const action = {type: "EDIT_UTILISATION", value: response.data.utilisation}
                      this.props.dispatch(action)
      
                      const action2 = {type: "EDIT_VEHICULE", value: response.data.vehicule}
                      this.props.dispatch(action2)
                     
                      const action3 = {type: "EDIT_SELECTED", value: response.data.vehicule}
                      this.props.dispatch(action3)
      
                      this.setState({isFormSubmitted: false})
                      this.props.history.goBack();
     
                    }else{
                      const action = {type: "EDIT_UTILISATION", value: response.data}
                      this.props.dispatch(action)
                      this.setState({isFormSubmitted: false})
                      this.props.history.goBack();
     
                    }
                 
      
                }).catch(error => {
                  this.setState({isFormSubmitted: false})
                  console.log(error)
              } )
                }else{
                 window.alert( this.checkUtilisationisPossible(this.date_debut_utilisation.value, this.date_fin_utilisation.value)  )

                }


      
              }else{
                //console.log(this.verificationFormulaire())
                toast.error(this.verificationFormulaire(), {
                  position: toast.POSITION.BOTTOM_CENTER
                });
            }
        
      
     
       }
        setKilometrageRetour = (event) => {
            //  this.setState({[e.target.name]: e.target.value})
              const target = event.target;
              const value = target.type === 'checkbox' ? target.checked : target.value;
              const name = target.name;
          
              this.setState({
                [name]: value
              }, () => {
                  //alert('ok')
                  const item = this.props.utilisations.find(utilisat => utilisat.id == this.props.match.params.utilisation_id)

                  
                  if(item.kilometrage_compteur_debut == 0 || item.kilometrage_compteur_debut == null ){

                    this.kilometres_parcourus.value = parseInt(this.kilometrage_compteur_retour.value) 

                  }else{
                    this.kilometres_parcourus.value = parseInt(this.kilometrage_compteur_retour.value) - parseInt(item.kilometrage_compteur_debut)

                  }
              });
            }

            verificationFormulaire () {
                if(this.kilometres_parcourus.value < 0 && this.kilometres_parcourus.value.length){
                    return "Le nombre de kilomètre parcourus ne peut être négatif !"
                }else if(this.nature_utilisation.value == undefined || !this.nature_utilisation.value.length){
                  return "La nature d'utilisation est obligatoire !"
                } else if(this.utilisatation_normal_ou_pret.value == undefined || !this.utilisatation_normal_ou_pret.value.length){
                    return "Le type d'utilisation est obligatoire !"
                  }else if(this.utilisateur.value == undefined || !this.utilisateur.value.length){
                    return "L'utilisateur est obligatoire !"
                  }else if(this.date_debut_utilisation.value == undefined || !this.date_debut_utilisation.value.length){
                    return "La date de début d'utilisation est obligatoire !"
                  }else if(this.date_fin_utilisation.value == undefined || !this.date_fin_utilisation.value.length){
                    return "La date de fin d'utilisation est obligatoire !"
                  }else if(this.heure_debut.value == undefined || !this.heure_debut.value.length){
                    return "L'heure de début d'utilisation est obligatoire !"
                  }else if(this.heure_de_fin.value == undefined || !this.heure_de_fin.value.length){
                    return "L'heure de fin d'utilisation est obligatoire !"
                  }else{
                    return null
                }
            }
    

  

   

    render() {
        const item = this.props.utilisations.find(utilisat => utilisat.id == this.props.match.params.utilisation_id)
        
        if(item !== undefined){
          //  var id_derniere_utilisation = Math.max(...this.getIdsUtilisations(), 0)
           //  var isDerniereUtilisi = item.id == id_derniere_utilisation;
           //  var dernier = this.props.utilisations.filter(util => util.vehicule.id == this.props.match.vehicule_id).find(u => u.id == id_derniere_utilisation)
            // console.log(this.props.utilisations.filter(util => util.vehicule.id == this.props.match.vehicule_id).map(u => u.id))
           // console.log(this.getIdsUtilisations(), Math.max(...this.getIdsUtilisations(), 0) )
           
             return (
                <div className="app-main__inner">
                  
                        <div className="main-card mb-3 card">
                            <div className="card-body">
                                <h5 className="card-title">Modification Utilisation
                               
                                {this.props.vehicules.length && 
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == item.vehicule.id)}/>
                            }                                   
                              </h5>
                              <form  className="p-3" onSubmit={this.onEditSubmit}>
                            <br />
                            <div className="form-row">

                            <div className="col-md-4">
                                <div className="position-relative form-group">
                                <label htmlFor="exampleAddress" className="">Véhicule</label>

                                <input 
                                    readOnly
                                    defaultValue={item.vehicule.immatriculation }
                                    type="text" className="form-control" />
                                </div>
                                </div>
                                <div className="col-md-4">
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Type d'utilisation</label>
                                    <select className="form-control"
                                    style={inputStyle}
                                    defaultValue={item.utilisatation_normal_ou_pret}
                                     ref={utilisatation_normal_ou_pret => this.utilisatation_normal_ou_pret = utilisatation_normal_ou_pret}
                                        onChange={this.setField}
                                     name="utilisatation_normal_ou_pret">
                                        <option value="Utilisation normale">Utilisation normale</option>
                                        <option value="Prêt">Prêt</option>
                                      
                                    </select>
                                </div>
                                </div>
                           
                                <div className="col-md-4">
                             

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature Utilisation</label>
                                    <select className="form-control"
                                     style={inputStyle}
                                     defaultValue={item.nature_utilisation ? item.nature_utilisation.id : null}

                                     ref={nature_utilisation => this.nature_utilisation = nature_utilisation}
                                        onChange={this.setField}
                                     name="nature_utilisation">
                                        <option value={null}></option>

                                         {this.props.natures_reservations.map(nat => 
                                        <option key={nat.id} value={nat.id}>{nat.libelle}</option>

                                         )}
                                      

                                    </select>
                                </div>
                                </div>
                               

                                </div>

                                <div className="form-row">
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Utilisateur</label>
                                    <select className="form-control"
                                     style={inputStyle}
                                        defaultValue={item.utilisateur ? item.utilisateur.id : null}

                                     ref={utilisateur => this.utilisateur = utilisateur}
                                        onChange={this.setField}
                                     name="utilisateur">
                                         <option value={null}></option>
                                         {this.props.personnels.map(per => 
                                             <option key={per.id} value={per.id}>{per.prenom} {per.nom}</option>

                                         )}
                                      

                                    </select>
                                </div>
                                    </div>
                              

                              
                             <div className="col-md-6">
                                 {/*
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Entité de l'utilisateur</label>
                                    <select className="form-control"
                                        style={inputStyle}

                                     defaultValue={vehiculeSelect == undefined ?
                                        null : vehiculeSelect.entite_comptable ? vehiculeSelect.entite_comptable.id : null}
                                     ref={entite_utilisateur => this.entite_utilisateur = entite_utilisateur}
                                        onChange={this.setField}
                                     name="entite_utilisateur">
                                         <option value={null}></option>

                                        {this.props.entites.map(ent => 
                                             <option key={ent.id} value={ent.id}>{ent.entite}</option>

                                        )}                                      

                                    </select>
                                </div>
                                */}

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Chauffeur</label>
                                    <select className="form-control"
                                     ref={chauffeur => this.chauffeur = chauffeur}
                                        onChange={this.setField}
                                        defaultValue={item.chauffeur ? item.chauffeur.id : null}
                                         name="chauffeur">
                                             <option value={null}></option>
                                             {this.props.personnels.map(per => 
                                                 <option key={per.id} value={per.id}>{per.prenom} {per.nom}</option>
    
                                             )}

                                    </select>
                                </div>
                            </div>
                              
                                </div>
                              
                           
                             

                              
                              
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Date début utilisation</label>
                                            <input name="date_debut_utilisation"
                                            style={inputStyle}
                                            defaultValue={item.date_debut_utilisation}
                                            ref={date_debut_utilisation => this.date_debut_utilisation = date_debut_utilisation}
                                              type="date" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Heure début </label>
                                            <InputMask mask="99:99" maskChar={null} 
                                            style={inputStyle}
                                            defaultValue={item.heure_debut}
                                            inputRef={heure_debut => this.heure_debut = heure_debut}
                                            className="form-control"
                                            name="heure_debut"
                                            />
                                          
                                              </div>
                                    </div>
  
                                 
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Date fin utilisation</label>

                                            <input name="date_fin_utilisation"
                                                defaultValue={item.date_fin_utilisation}
                                                style={inputStyle}

                                            ref={date_fin_utilisation => this.date_fin_utilisation = date_fin_utilisation}
                                              type="date" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Heure de fin </label>
                                            <InputMask mask="99:99" maskChar={null} 
                                            style={inputStyle}
                                            defaultValue={item.heure_de_fin}
                                            inputRef={heure_de_fin => this.heure_de_fin = heure_de_fin}
                                            className="form-control"
                                            name="heure_de_fin"
                                            />
                                          
                                              </div>
                                    </div>

                                   
                                </div>

                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Kilomètrage début</label>
                                            <input name="kilometrage_compteur_debut"
                                            readOnly
                                            defaultValue={item.kilometrage_compteur_debut }
                                            ref={kilometrage_compteur_debut => this.kilometrage_compteur_debut = kilometrage_compteur_debut}
                                              type="number" className="form-control" />
                                              </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label > au retour </label>
                                            <input name="kilometrage_compteur_retour"
                                            onChange={this.setKilometrageRetour}
                                            defaultValue={item.kilometrage_compteur_retour }
                                            ref={kilometrage_compteur_retour => this.kilometrage_compteur_retour = kilometrage_compteur_retour}
                                              type="number" className={this.kilometres_parcourus && parseInt(this.kilometres_parcourus.value) < 0 ? 'form-control is-invalid' : 'form-control' } /></div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label > parcourus </label>
                                            <input name="kilometres_parcourus"
                                            readOnly
                                            defaultValue={item.kilometres_parcourus }

                                            ref={kilometres_parcourus => this.kilometres_parcourus = kilometres_parcourus}
                                              type="number" className="form-control" /></div>
                                    </div>

                                   
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Lieu de Départ</label>
                                            <input name="lieu_depart"
                                            defaultValue={item.lieu_depart }

                                            ref={lieu_depart => this.lieu_depart = lieu_depart}
                                              type="text"  className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Destination </label>
                                            <input name="destination"
                                            defaultValue={item.destination}

                                            ref={destination => this.destination = destination}
                                            type="text"  className="form-control" /></div>
                                    </div>

                                   
                                </div>

                            
                                <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
                      
                                <span  onClick={() => this.props.history.goBack()}
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
        natures_interventions: state.natures_interventions.items,
        vehicules: state.vehicules.items,
        natures_reservations: state.natures_reservations.items,
        personnels: state.personnels.items,

        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        utilisations: state.utilisations.items,

    }
  }

export default connect(mapStateToProps)(ModifierUtilisationGeneral)

