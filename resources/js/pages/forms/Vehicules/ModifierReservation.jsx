import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



 class ModifierReservation extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            objetEdit: undefined,
            isFormSubmitted: false
        }
      
    }

    // componentDidMount(){
    //     this.setState({
    //         objetEdit: this.props.reservations.find(reser => reser.id == this.props.match.params.reservation_id)
    //     })
    //     // console.log(  )
    //     }

        setVehiculeSelectedAuRechargement = () => {
            if(this.props.vehiculeSeleted == undefined){
                if(this.props.vehicules.length){
                    let vehicule = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
                
                    const action = {type: "EDIT_SELECTED", value: vehicule}
                    this.props.dispatch(action)
                }
            }
        }

   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    setFieldDateDebutReservation = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


      verificationFormulaire () {
          if(this.objet_reservation.value == ''){
              return "L'objet de la reservation obligatoire !"
          }else if(this.heure_debut_reservation.value == ''){
              return "L'heure de début de réservation est obligatoire !"
          }else if(this.date_fin_reservation.value == ''){
            return "La date de fin est obligatoire !"
          }else if(this.date_debut_reservation.value == ''){
            return "La date de debut est obligatoire !"
          }else if(this.heure_fin_reservation.value == ''){
            return "L'heure de fin est obligatoire !"
          } else{
              return null
          }
      }

      checkIfReservationIsPossible = (debut, fin) => {
        var vehicule = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
        var lesReservationsDuVehicule = this.props.reservations.filter(reser => reser.vehicule.id == vehicule.id && reser.id !== this.state.objetEdit.id && !reser.abandonne && !reser.transforme_en_utilisation)
       
        var tab = []
        var debut = Date.parse(debut)
        var fin = Date.parse(fin)

        lesReservationsDuVehicule.map(reserv => {
                let dateDebutDejaReserve = Date.parse(reserv.date_debut_reservation)
                let dateFinDejaReserve = Date.parse(reserv.date_fin_reservation)
                tab.push(debut >= dateDebutDejaReserve && debut <= dateFinDejaReserve)
                tab.push(fin >= dateDebutDejaReserve && fin <= dateFinDejaReserve)
                tab.push(debut <= dateDebutDejaReserve && fin >= dateFinDejaReserve)
        })
 
        return (tab.includes(true)) ? 'Il y\'a déja une réservation pour ce véhicule et pour cette période' : null 
      }

      getEntiteDuPerrsonnelReservant = () => {
          if(this.personne_reservant != undefined){
            var personne = this.props.personnels.find(per => per.id == this.personne_reservant.value)
            return (personne.default) ? 'SIEGE' : personne.entite_affectation.entite
          }
         
      }

      modifierReservation = (e) => {
         const objetEdit = this.props.reservations.find(reser => reser.id == this.props.match.params.reservation_id)

        e.preventDefault()

       // var vehicule = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
        if( this.checkIfReservationIsPossible(this.date_debut_reservation.value, this.date_fin_reservation.value) == null ){
            if(this.verificationFormulaire() == null){
                this.setState({isFormSubmitted: true})
                axios.post('/api/modifier_vehicule_reservation/' + objetEdit.id, {
                    personne_reservant: this.personne_reservant.value,
                    date_fin_reservation: this.date_fin_reservation.value,
                    heure_fin_reservation: this.heure_fin_reservation.value,
                    vehicule_parti: this.vehicule_parti.value,
                    vehicule_retourne: this.vehicule_retourne.value,
                    entite_personne_reservant: this.entite_personne_reservant.value,
                    objet_reservation: this.objet_reservation.value,
                    date_debut_reservation: this.date_debut_reservation.value,
                    heure_debut_reservation: this.heure_debut_reservation.value,
                    lieu_depart: this.lieu_depart.value,
                    nombre_personne_dans_vehicule: this.nombre_personne_dans_vehicule.value,
                    kilometrage_prevu: this.kilometrage_prevu.value,
                    destination_ville: this.destination_ville.value,
                    destination_departement: this.destination_departement.value,
                    destination_pays: this.destination_pays.value,
                    vehicule_avec_chauffeur: this.vehicule_avec_chauffeur.value,
                    carte_carburant: this.carte_carburant.value,
                    carte_autoroute: this.carte_autoroute.value,
                    kilometrage_vehicule_a_la_reservation: this.kilometrage_vehicule_a_la_reservation.value,
                    numero_carte_carburant: this.numero_carte_carburant.value,
                    numero_carte_peage: this.numero_carte_peage.value,
                    infos_complementaire: this.infos_complementaire.value,
                    date_reservation: today,
                   
                })
                .then(response => { 
                   const action = {type: "EDIT_RESERVATION", value: response.data}
                     this.props.dispatch(action)
                    this.setState({isFormSubmitted: false})
                   this.props.history.goBack();
    
                 
                }).catch(error => { 
                    this.setState({isFormSubmitted: false})
                    console.log(error)
                 } )
               
    
              }else{
                  //console.log(this.verificationFormulaire())
                  toast.error(this.verificationFormulaire(), {
                    position: toast.POSITION.BOTTOM_CENTER
                  });
              }
        }else{
            toast.error(this.checkIfReservationIsPossible(this.date_debut_reservation.value, this.date_fin_reservation.value), {
                position: toast.POSITION.BOTTOM_CENTER
              });  
        }
       

       // console.log(this.date_debut.value)
      }
    

    render() {
        const personeParDefaut = this.props.personnels.find(per => per.default)
        const objetEdit = this.props.reservations.find(reser => reser.id == this.props.match.params.reservation_id)

      if(objetEdit != undefined){
        return (
            <div className="app-main__inner">
              {this.setVehiculeSelectedAuRechargement()}
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Gestion des Reservations du véhicule
                           
                            {this.props.vehicules.length && 
                            <MatriculeInput text_attente={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id).immatriculation}/>
                            }                              
                          </h5>
                          <br />
                            <form className="" onChange={this.setField}  onSubmit={this.modifierReservation}>
                                <div className="form-row">
                                <div className="col-md-3">
                                    <label  className="">Personne reservant</label>
                                        <select name="personne_reservant" onChange={this.setField}
                                            ref={personne_reservant => this.personne_reservant = personne_reservant}
                                            style={inputStyle}
                                            defaultValue={objetEdit.personne_reservant ? objetEdit.personne_reservant.id : null}
                                          className="form-control">
                                            {personeParDefaut != undefined && <option value={personeParDefaut.id}>{personeParDefaut.nom} {personeParDefaut.prenom}</option>}
                                        {this.props.personnels.map(pers => {
                                            if(!pers.default){
                                                return <option key={pers.id} value={pers.id}>{pers.nom} {pers.prenom}</option>

                                            }
                                        }

                                                )}
                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Entité de la personne </label>
                                            <input name="entite_personne_reservant"  type="text"
                                             readOnly
                                             defaultValue={objetEdit.entite_personne_reservant}
                                            onChange={this.setField}
                                            ref={entite_personne_reservant => this.entite_personne_reservant = entite_personne_reservant}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                    <label  className="">Objet de la réservation</label>
                                        <select name="objet_reservation" onChange={this.setField}
                                            ref={objet_reservation => this.objet_reservation = objet_reservation}
                                            style={inputStyle}
                                            defaultValue={objetEdit.objet_reservation ? objetEdit.objet_reservation.id : null}
                                          className="form-control">
                                        <option defaultValue={null}></option>
                                        
                                        {this.props.natures_reservations.map(nature => 
                                                <option key={nature.id} value={nature.id}>{nature.libelle}</option>

                                                )}
                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Numero de l'ordre de mission </label>
                                            <input name="numero_ordre_mission"  type="text"
                                            defaultValue={objetEdit.numero_ordre_mission}
                                            onChange={this.setField}
                                            ref={numero_ordre_mission => this.numero_ordre_mission = numero_ordre_mission}
                                             className="form-control" />
                                             </div>
                                    </div>
                                  

                                  
                                </div>

                                <div className="form-row">
                                <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de debut de la réservation *</label>
                                            <input name="date_debut_reservation"  type="date"
                                            style={inputStyle}
                                            min={today}
                                            defaultValue={objetEdit.date_debut_reservation}
                                            onChange={this.setFieldDateDebutReservation}
                                            ref={date_debut_reservation => this.date_debut_reservation = date_debut_reservation}
                                             className="form-control" />
                                             </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Heure de début *</label>
                                            <InputMask mask="99:99" maskChar={null} 
                                            style={inputStyle}
                                            defaultValue={objetEdit.heure_debut_reservation}
                                            inputRef={heure_debut_reservation => this.heure_debut_reservation = heure_debut_reservation}
                                            className="form-control"
                                            name="heure_debut_reservation"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de fin de la réservation *</label>
                                            <input name="date_fin_reservation"  type="date"
                                            style={inputStyle}
                                            min={this.date_debut_reservation ? this.date_debut_reservation.value : today}
                                            defaultValue={objetEdit.date_fin_reservation}
                                            onChange={this.setField}
                                            ref={date_fin_reservation => this.date_fin_reservation = date_fin_reservation}
                                             className="form-control" />
                                             </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Heure de fin *</label>
                                            <InputMask mask="99:99" maskChar={null} 
                                            style={inputStyle}
                                            defaultValue={objetEdit.heure_fin_reservation}
                                            inputRef={heure_fin_reservation => this.heure_fin_reservation = heure_fin_reservation}
                                            className="form-control"
                                            name="heure_fin_reservation"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                    <label  className="">Véhicule parti</label>
                                        <select name="vehicule_parti" onChange={this.setField}
                                            ref={vehicule_parti => this.vehicule_parti = vehicule_parti}
                                            defaultValue={objetEdit.vehicule_parti}
                                          className="form-control">
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                        </select>
                                
                                        </div>

                                        <div className="col-md-1">
                                    <label  className="">Véh. retourné</label>
                                        <select name="vehicule_retourne" onChange={this.setField}
                                        defaultValue={objetEdit.vehicule_retourne}
                                            ref={vehicule_retourne => this.vehicule_retourne = vehicule_retourne}
                                          className="form-control">
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                        </select>
                                
                                        </div>

                                    
                                </div>

                    

                                <div className="form-row">
                                     
                                   
                                        <div className="col-md-3">
                                            <label >Lieu de Départ</label>

                                            <input name="lieu_depart"
                                            defaultValue={objetEdit.lieu_depart}
                                            ref={lieu_depart => this.lieu_depart = lieu_depart}
                                             
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                            <label >Destination: Ville</label>

                                            <input name="destination_ville"
                                            defaultValue={objetEdit.destination_ville}

                                            ref={destination_ville => this.destination_ville = destination_ville}
                                             
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                            <label >Destination: Département</label>

                                            <input name="destination_departement"
                                            defaultValue={objetEdit.destination_departement}

                                                onChange={this.setField}
                                            ref={destination_departement => this.destination_departement = destination_departement}
                                              type="text" className="form-control" />
                                        </div>
                                        <div className="col-md-3">
                                            <label >Destination: Pays</label>

                                            <input name="destination_pays"
                                            defaultValue={objetEdit.destination_pays}

                                                onChange={this.setField}
                                            ref={destination_pays => this.destination_pays = destination_pays}
                                              type="text" className="form-control" />
                                        </div>

                                     
                                    </div>

                                    <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >nbr pers dans vehicule</label>
                                            <input name="nombre_personne_dans_vehicule"  type="number"
                                            defaultValue={objetEdit.nombre_personne_dans_vehicule}

                                            ref={nombre_personne_dans_vehicule => this.nombre_personne_dans_vehicule = nombre_personne_dans_vehicule}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Kilometrage prévu</label>
                                            <input name="kilometrage_prevu"  type="number"
                                            defaultValue={objetEdit.kilometrage_prevu}

                                            ref={kilometrage_prevu => this.kilometrage_prevu = kilometrage_prevu}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Kilometrage actuel</label>
                                            <input name="kilometrage_vehicule_a_la_reservation"
                                            defaultValue={objetEdit.kilometrage_vehicule_a_la_reservation}
                                            readOnly
                                              type="number"
                                            ref={kilometrage_vehicule_a_la_reservation => this.kilometrage_vehicule_a_la_reservation = kilometrage_vehicule_a_la_reservation}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                    <label  className="">Véh. avec chauffeur</label>
                                        <select name="vehicule_avec_chauffeur" onChange={this.setField}
                                        defaultValue={objetEdit.vehicule_avec_chauffeur}
                                            ref={vehicule_avec_chauffeur => this.vehicule_avec_chauffeur = vehicule_avec_chauffeur}
                                          className="form-control">
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                        </select>
                                
                                        </div>

                                        <div className="col-md-2">
                                    <label  className="">Carte carburant</label>
                                        <select name="carte_carburant" onChange={this.setField}
                                            defaultValue={objetEdit.carte_carburant}

                                            ref={carte_carburant => this.carte_carburant = carte_carburant}
                                          className="form-control">
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                        </select>
                                
                                        </div>

                                        <div className="col-md-2">
                                    <label  className="">Carte autoroute</label>
                                        <select name="carte_autoroute" onChange={this.setField}
                                            defaultValue={objetEdit.carte_autoroute}

                                            ref={carte_autoroute => this.carte_autoroute = carte_autoroute}
                                          className="form-control">
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                        </select>
                                
                                        </div>

                                  
                                </div>
                                <div className="form-row">
                                <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >N° de carte carburant attribuée</label>

                                            <input name="numero_carte_carburant"
                                            defaultValue={objetEdit.numero_carte_carburant}

                                            ref={numero_carte_carburant => this.numero_carte_carburant = numero_carte_carburant}

                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >N° de carte carburant attribuée</label>
                                            <input name="numero_carte_peage"
                                            defaultValue={objetEdit.numero_carte_peage}

                                            ref={numero_carte_peage => this.numero_carte_peage = numero_carte_peage}

                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >infos complémentaires</label>
                                            <textarea name="infos_complementaire"
                                            defaultValue={objetEdit.infos_complementaire}

                                            ref={infos_complementaire => this.infos_complementaire = infos_complementaire}

                                              className="form-control" />
                                        </div>
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
      }
        else{
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
        natures_reservations: state.natures_reservations.items,
        personnels: state.personnels.items,
        reservations: state.reservations.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        vehicules: state.vehicules.items

    }
  }

export default connect(mapStateToProps)(ModifierReservation)
