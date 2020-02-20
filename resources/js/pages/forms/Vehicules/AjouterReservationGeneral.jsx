import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'

import Select from 'react-select';
import { colourStyles } from '../../../utils/Repository';



 class AjouterReservationGeneral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormSubmitted: false
         }

    }

    setFieldSelectDepartEtDestination(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }


    getNiveauxPlanGeographiques = () => {
        const events = [];
        this.props.structure_geographiques.map(event => {
            if(!event.niveau) return;
            return events.push(event.niveau)
        })

        return events
    }

    getMaximumNiveauPlanGeographique = () => {
        var niveau = Math.max(...this.getNiveauxPlanGeographiques())
        if (niveau == 0) return 1;
        return Number(niveau );

    }

    getStructureGeographiqueDernierNiveau = () => {
        if(!this.getPlanGeographiquesDerniersNiveau().length) return undefined;
        else{
            return this.props.structure_geographiques.find(st => st.niveau == this.getPlanGeographiquesDerniersNiveau()[0].structure_geographique.niveau)
        }
    }

    getPlanGeographiquesDerniersNiveau = () => {
        return this.props.plan_geographiques.filter(elm => elm.structure_geographique ? elm.structure_geographique.niveau == this.getMaximumNiveauPlanGeographique() : false)
    }



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
        }, () => this.date_fin_reservation.value = this.date_debut_reservation.value);
    }


      verificationFormulaire () {
        let dateDebut = Date.parse(this.date_debut_reservation.value)
        let dateFin = Date.parse(this.date_fin_reservation.value)
          if(this.state.objet_reservation == undefined){
              return "L'objet de la reservation obligatoire !"
          }if(this.state.vehicule == undefined){
            return "Vous devez sélectionner un véhicule !"
        }else if(this.heure_debut_reservation.value == ''){
              return "L'heure de début de réservation est obligatoire !"
          }else if(this.date_fin_reservation.value == ''){
            return "La date de fin est obligatoire !"
          }else if(this.date_debut_reservation.value == ''){
            return "La date de debut est obligatoire !"
          }else if(this.heure_fin_reservation.value == ''){
            return "L'heure de fin est obligatoire !"
          }else if(dateDebut > dateFin){
            return "La date de début ne peut être supérieure à la date de fin !"
          } else{
              return null
          }
      }

      checkIfReservationIsPossible = (debut, fin) => {
        var vehicule = this.state.vehicule
        var lesReservationsDuVehicule = this.props.reservations.filter(reser => reser.vehicule.id == vehicule.id && !reser.abandonne && !reser.transforme_en_utilisation)

        var tab = []
        var debut = Date.parse(debut)
        var fin = Date.parse(fin)

        lesReservationsDuVehicule.map(veh => {
            let dateDebutDejaReserve = Date.parse(veh.date_debut_reservation)
            let dateFinDejaReserve = Date.parse(veh.date_fin_reservation)
            tab.push(debut >= dateDebutDejaReserve && debut <= dateFinDejaReserve)
            tab.push(fin >= dateDebutDejaReserve && fin <= dateFinDejaReserve)
            tab.push(debut <= dateDebutDejaReserve && fin >= dateFinDejaReserve)
        })

        return (tab.includes(true)) ? 'Il y\'a déja une réservation pour ce véhicule et pour cette période' : null
      }

      getEntiteDuPerrsonnelReservant = () => {
          if(this.personne_reservant != undefined){
              if(this.props.personnels.length){
                var personne = this.props.personnels.find(per => per.id == this.personne_reservant.value)
               if(personne) return (personne.default) ? 'SIEGE' : personne.entite_affectation.entite
              }

          }

      }

      enregistrerReservation = (e) => {
        e.preventDefault()
        const mission = this.props.match.params.ordre_mission_id != undefined ? this.props.missions.find(miss => miss.id == this.props.match.params.ordre_mission_id) : undefined
        const personeParDefaut = this.props.personnels.find(per => per.default)

        if( this.checkIfReservationIsPossible(this.date_debut_reservation.value, this.date_fin_reservation.value) == null ){
            if(this.verificationFormulaire() == null){
                this.setState({isFormSubmitted: true})
                axios.post('/api/ajouter_vehicule_reservation', {
                    vehicule: this.state.vehicule.id,
                    vehicule_id: this.state.vehicule.id,

                    personne_reservant: this.state.personne_reservant ? this.state.personne_reservant.id : personeParDefaut.id,
                    date_fin_reservation: this.date_fin_reservation.value,
                    heure_fin_reservation: this.heure_fin_reservation.value,
                   // vehicule_parti: this.vehicule_parti.value,
                   // vehicule_retourne: this.vehicule_retourne.value,
                    entite_personne_reservant: this.entite_personne_reservant.value,
                    objet_reservation: this.state.objet_reservation.id,
                    date_debut_reservation: this.date_debut_reservation.value,
                    heure_debut_reservation: this.heure_debut_reservation.value,
                    lieu_depart_id: this.state.lieu_depart ? this.state.lieu_depart.id : null,
                    destination_id: this.state.destination ? this.state.destination.id : null,
                   // lieu_depart: this.lieu_depart.value,
                    nombre_personne_dans_vehicule: this.nombre_personne_dans_vehicule.value,
                    kilometrage_prevu: this.kilometrage_prevu.value,
                  //  destination_ville: this.destination_ville.value,
                  //  destination_departement: this.destination_departement.value,
                  //  destination_pays: this.destination_pays.value,
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
                   const action = {type: "ADD_RESERVATION", value: response.data}
                     this.props.dispatch(action)
                     if(mission != undefined){
                        let conf = confirm('Souhaitez vous considérer l\'ordre de mission comme étant terminé ?')
                        if(conf){
                            axios.get('/api/marquer_ordre_mission_termine/' + mission.id).then(response => {
                               const action2 = {type: "EDIT_MISSION", value: response.data}
                                this.props.dispatch(action2)
                            })
                            this.setState({isFormSubmitted: false})
                            this.props.history.goBack();

                        }else{
                            this.setState({isFormSubmitted: false})
                            this.props.history.goBack();

                        }
                     }else{
                         this.setState({isFormSubmitted: false})
                        this.props.history.goBack();

                     }

                }).catch(error => console.log(error))

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

      setFieldSelect(name, value) {
        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }

    setFieldSelectPersonneReservant(name, value) {
        let obj = {};
        obj[name] = value;
        this.setState(obj, () => {
            const persone = this.props.personnels.find(per => per.id == this.state.personne_reservant.id)
            this.entite_personne_reservant.value = persone.entite_affectation ? persone.entite_affectation.entite : null
        });
    }

    setFieldSelectVehicule(name, value) {
        let obj = {};
        obj[name] = value;
        this.setState(obj, () => {
            const vehicule = this.props.vehicules.find(veh => veh.id == this.state.vehicule.id)
            this.kilometrage_vehicule_a_la_reservation.value = vehicule.kilometrage_acquisition
        });
    }


    render() {
        const personeParDefaut = this.props.personnels.find(per => per.default)
        const mission = this.props.match.params.ordre_mission_id != undefined ? this.props.missions.find(miss => miss.id == this.props.match.params.ordre_mission_id) : undefined
        return (
            <div className="app-main__inner">
              {this.setVehiculeSelectedAuRechargement()}
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Gestion des Reservations du véhicule Agos


                          </h5>
                          <br />


                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerReservation}>
                                <div className="form-row">


                                <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Véhicule </label>
                                                <Select
                                                name="vehicule"
                                                placeholder="Selectionnez un Véhicule"
                                                noOptionsMessage={() => "Aucun véhicule pour l'instant"}
                                                options={this.props.vehicules}
                                                getOptionLabel={option => option.immatriculation}
                                                getOptionValue={option => option.id}
                                                isOptionDisabled={option => !this.props.param_generaux_reservation_ordre.vehicule_fonction_reservable && option.type_vehicule_statut === 'Fonction'}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelectVehicule.bind(this, "vehicule")}
                                                styles={colourStyles}
                                            />
                                             </div>
                                    </div>

                                <div className="col-md-3">
                                    <label  className="">Personne reservant</label>

                                        <Select
                                                name="personne_reservant"
                                                placeholder="Selectionnez une personne"
                                                noOptionsMessage={() => "Personnel introuvable"}
                                                options={this.props.personnels}
                                                getOptionLabel={option => `${option.nom} ${option.prenom.slice(0,15)}`}
                                                getOptionValue={option => option.id}
                                                defaultValue={personeParDefaut ? personeParDefaut : null}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelectPersonneReservant.bind(this, "personne_reservant")}
                                                styles={colourStyles}
                                            />

                                        </div>

                                        <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Entité de la personne </label>
                                            <input name="entite_personne_reservant"  type="text"
                                             readOnly
                                             defaultValue={personeParDefaut.entite_affectation ? personeParDefaut.entite_affectation.entite : null}
                                            onChange={this.setField}
                                            ref={entite_personne_reservant => this.entite_personne_reservant = entite_personne_reservant}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                    <label  className="">Objet de la réservation</label>


                                        <Select
                                                name="objet_reservation"
                                                placeholder="Selectionnez L'objet de réservation"
                                                noOptionsMessage={() => "Liste vide"}
                                                options={this.props.natures_reservations}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}

                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "objet_reservation")}
                                                styles={colourStyles}
                                            />

                                        </div>




                                </div>

                                <div className="form-row">
                                <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Date de debut de la réservation *</label>
                                            <input name="date_debut_reservation"  type="date"
                                            style={inputStyle}
                                            min={mission != undefined ? null : today}
                                            defaultValue={mission != undefined ? mission.date_debut_misssion : today}
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
                                            defaultValue={mission != undefined ? mission.heure_debut_mission.slice(0, 5) : '08:00'}
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
                                            defaultValue={mission != undefined ? mission.date_fin_mission : this.date_debut_reservation ? this.date_debut_reservation.value: today}

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
                                            defaultValue={mission != undefined ? mission.heure_fin_mission.slice(0, 5) : '18:00'}
                                            inputRef={heure_fin_reservation => this.heure_fin_reservation = heure_fin_reservation}
                                            className="form-control"
                                            name="heure_fin_reservation"
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="col-md-1">
                                    <label  className="">Véhicule parti</label>
                                        <select name="vehicule_parti" onChange={this.setField}
                                            ref={vehicule_parti => this.vehicule_parti = vehicule_parti}
                                          className="form-control">
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                        </select>

                                        </div>

                                        <div className="col-md-1">
                                    <label  className="">Véh. retourné</label>
                                        <select name="vehicule_retourne" onChange={this.setField}
                                            ref={vehicule_retourne => this.vehicule_retourne = vehicule_retourne}
                                          className="form-control">
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                        </select>

                                        </div> */}


                                </div>



                                <div className="form-row">


                                {this.getStructureGeographiqueDernierNiveau() ?
                                          <div className="col-md-6">
                                              <label >Lieu de Départ</label>


                                              <Select
                                                  name="lieu_depart"
                                                  isDisabled={!this.getStructureGeographiqueDernierNiveau()}
                                                  placeholder={`Sélection de ${this.getStructureGeographiqueDernierNiveau().libelle}`}
                                                  noOptionsMessage={() => `Pas de ${this.getStructureGeographiqueDernierNiveau().libelle} pour l'instant`}
                                                  options={this.getPlanGeographiquesDerniersNiveau()}
                                                  getOptionLabel={option => option.libelle}
                                                  getOptionValue={option => option.id}
                                                  onChange={this.setFieldSelectDepartEtDestination.bind(this, "lieu_depart")}
                                              />

                                          </div> :


                                          <div className="col-md-6">
                                              <label >Lieu Départ</label>

                                              <input readOnly className="form-control" value="Veuillez creer la structure Géographique" />

                                          </div>}


                                  {this.getStructureGeographiqueDernierNiveau() ?
                                          <div className="col-md-6">
                                              <label >Destination</label>


                                              <Select
                                                  name="destination"
                                                  isDisabled={!this.getStructureGeographiqueDernierNiveau()}
                                                  placeholder={`Sélection de ${this.getStructureGeographiqueDernierNiveau().libelle}`}
                                                  noOptionsMessage={() => `Pas de ${this.getStructureGeographiqueDernierNiveau().libelle} pour l'instant`}
                                                  options={this.getPlanGeographiquesDerniersNiveau()}
                                                  getOptionLabel={option => option.libelle}
                                                  getOptionValue={option => option.id}

                                                  defaultValue={mission != undefined ? mission.destination_mission ? mission.destination_mission : null : null}
                                                  onChange={this.setFieldSelectDepartEtDestination.bind(this, "destination")}
                                              />

                                          </div> :


                                          <div className="col-md-6">
                                              <label >Destination</label>

                                              <input readOnly className="form-control" value="Veuillez creer la structure Géographique" />

                                          </div>}



                                    </div>

                                    <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >nbr pers veh.</label>
                                            <input name="nombre_personne_dans_vehicule"  type="number"
                                                defaultValue={mission != undefined ? mission.nombre_personne : null}

                                            ref={nombre_personne_dans_vehicule => this.nombre_personne_dans_vehicule = nombre_personne_dans_vehicule}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Kilometrage prévu</label>
                                            <input name="kilometrage_prevu"  type="number"
                                                defaultValue={mission != undefined ? mission.kilometrage_prevu : null}

                                            ref={kilometrage_prevu => this.kilometrage_prevu = kilometrage_prevu}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Kilometrage actuel</label>
                                            <input name="kilometrage_vehicule_a_la_reservation"
                                            readOnly
                                              type="number"
                                            ref={kilometrage_vehicule_a_la_reservation => this.kilometrage_vehicule_a_la_reservation = kilometrage_vehicule_a_la_reservation}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                    <label  className="">Véh. avec chauffeur</label>
                                        <select name="vehicule_avec_chauffeur" onChange={this.setField}
                                            ref={vehicule_avec_chauffeur => this.vehicule_avec_chauffeur = vehicule_avec_chauffeur}
                                          className="form-control">
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                        </select>

                                        </div>

                                        <div className="col-md-2">
                                    <label  className="">Carte carburant</label>
                                        <select name="carte_carburant" onChange={this.setField}
                                            ref={carte_carburant => this.carte_carburant = carte_carburant}
                                          className="form-control">
                                        <option value="0">Non</option>
                                        <option value="1">Oui</option>
                                        </select>

                                        </div>

                                        <div className="col-md-2">
                                    <label  className="">Carte autoroute</label>
                                        <select name="carte_autoroute" onChange={this.setField}
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
                                            ref={numero_carte_carburant => this.numero_carte_carburant = numero_carte_carburant}

                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >N° de carte carburant attribuée</label>
                                            <input name="numero_carte_peage"
                                            ref={numero_carte_peage => this.numero_carte_peage = numero_carte_peage}

                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >infos complémentaires</label>
                                            <textarea name="infos_complementaire"
                                            ref={infos_complementaire => this.infos_complementaire = infos_complementaire}
                                            defaultValue={mission != undefined ? mission.description_mission || 'Reservation via ordre de mission' : null}

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
}

const mapStateToProps = state => {
    return {
        natures_reservations: state.natures_reservations.items,
        personnels: state.personnels.items,
        reservations: state.reservations.items,
        missions: state.missions.items,
        param_generaux_reservation_ordre: state.param_generaux_reservation_ordre.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        vehicules: state.vehicules.items,
        plan_geographiques: state.plan_geographiques.items,
        structure_geographiques: state.structure_geographiques.items

    }
  }

export default connect(mapStateToProps)(AjouterReservationGeneral)
