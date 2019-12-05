import React, { Component } from 'react'

class ReservationOrdreMissionForm extends Component {

    constructor(props) {
        super(props);
        
        
    }

    enregisterParamReservationOrdre = (e) =>{
        e.preventDefault();
        let objet = {
            vehicule_fonction_reservable: this.vehicule_fonction_reservable.value,
            admin_seul_modif: this.admin_seul_modif.value,
            admin_seul_supp: this.admin_seul_supp.value,
            edition_automatique: this.edition_automatique.value,
            interdire_chevauchement: this.interdire_chevauchement.value,
            nombre_jour_a_ne_pas_depasser: this.nombre_jour_a_ne_pas_depasser.value,
            jour_par_date: this.jour_par_date.value,
        }
        this.props.onSubmitParamReservationOrdreMission( objet )
     }
    


    render() {
        const {item} = this.props
        return (
            <div className="main-card mb-3 card">
            <div className="card-body">
            {item != {} && <form className="" onSubmit={this.enregisterParamReservationOrdre}>
                                <div className="form-row">
                                   
                                    <div className="col-md-7">
                                        <div className="position-relative form-group">
                                            <label >Un véhicule de fonction peut-il être pris en compte lors d'une reservation ?</label>
                                           
                                        </div>
                                    </div>


                                    <div className="col-md-2">
                                      
                                           <select name="vehicule_fonction_reservable" 
                                            ref={vehicule_fonction_reservable => this.vehicule_fonction_reservable = vehicule_fonction_reservable}
                                            defaultValue={item.vehicule_fonction_reservable}
                                            className="form-control">
                                                
                                               <option value={0}>Non</option>
                                               <option value={1}>OUI</option>

                                           </select>
                                    </div>
                                  
                                </div>

                                <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Faut-il que seul l'administrateur puisse modifier une réservation enregistrée ?</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="admin_seul_modif" 
                                        ref={admin_seul_modif => this.admin_seul_modif = admin_seul_modif}
                                        defaultValue={item.admin_seul_modif}

                                           className="form-control">
                                              <option value={0}>Non</option>
                                              <option value={1}>OUI</option>

                                          </select>
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Faut-il que seul l'administrateur puisse supprimer une réservation enregistrée ?</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="admin_seul_supp" 
                                        ref={admin_seul_supp => this.admin_seul_supp = admin_seul_supp}
                                        defaultValue={item.admin_seul_supp}

                                           className="form-control">
                                              <option value="0">Non</option>
                                              <option value="1">OUI</option>

                                          </select>
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Suite à la création d'une réservation, faut-il systématiquement éditer la fiche réservation ?</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="edition_automatique" 
                                        ref={edition_automatique => this.edition_automatique = edition_automatique}
                                        defaultValue={item.edition_automatique}

                                           className="form-control">
                                              <option value={0}>Non</option>
                                              <option value={1}>OUI</option>

                                          </select>
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Lors de la création d'une réservation, si celle-ci chevauche une autre, faut-il systématiquement interdire ce chevauchement ou demander
                                               l'autorisation à l'utilisateur ?</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="interdire_chevauchement" 
                                        ref={interdire_chevauchement => this.interdire_chevauchement = interdire_chevauchement}
                                        defaultValue={item.interdire_chevauchement}

                                           className="form-control">
                                              <option value={0}>Interdire</option>
                                              <option value={1}>Autoriser</option>

                                          </select>
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Pour les réservations et ordres de missions, un contrôle permet le blocage d'une demande supérieure à la date de début 
                                               + le nombre de jours ci-contre ! si zero pas de contrôle </label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                   <input name="nombre_jour_a_ne_pas_depasser"  type="number"

                                            ref={nombre_jour_a_ne_pas_depasser => this.nombre_jour_a_ne_pas_depasser = nombre_jour_a_ne_pas_depasser}
                                            defaultValue={item.nombre_jour_a_ne_pas_depasser}

                                             className="form-control" />
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Pour les réservations, un contrôle permet le blocage d'une réservation dont le nombre de jours 
                                               est supérieur au nombre de jours indiqué ci-contre ! si zero pas de contrôle </label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                   <input name="jour_par_date"  type="number"
                                            ref={jour_par_date => this.jour_par_date = jour_par_date}
                                            defaultValue={item.jour_par_date}

                                             className="form-control" />
                                   </div>
                                 
                               </div>

                                 

                                    {/* <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Code postal </label>
                                            <input name="code_postal"  type="text"
                                            ref={code_postal => this.code_postal = code_postal}

                                             className="form-control" />
                                             </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Ville </label>
                                            <input name="ville" type="text" 
                                            ref={ville => this.ville = ville}

                                            className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Téléphonne </label>
                                            <input name="telephonne"
                                            ref={telephonne => this.telephonne = telephonne}

                                             type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Fax </label>
                                            <input name="fax" type="text"
                                            ref={fax => this.fax = fax}

                                             className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Site internet </label>
                                            <input name="internet" type="text"
                                            ref={internet => this.internet = internet}

                                             className="form-control" />
                                        </div>
                                    </div>
                                  
                                </div> */}
                               
                             
                               {!this.props.isFormReservationOrdreSubmitted ? <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button> : <button disabled  className="mt-2 btn btn-warning">Merci de patienter ...</button>}
                           
                                
                            </form>}
            </div>
        </div>
        )
    }
}


export default ReservationOrdreMissionForm