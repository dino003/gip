import React, { Component } from 'react'

class ReservationOrdreMissionForm extends Component {

    constructor(props) {
        super(props);
        
        
    }

    enregisterParamReservationOrdre = (e) =>{
        e.preventDefault();
        let objet = {
            vehicule_fonction_reservable: this.vehicule_fonction_reservable.checked,
            admin_seul_modif: this.admin_seul_modif.checked,
            admin_seul_supp: this.admin_seul_supp.checked,
            edition_automatique: this.edition_automatique.checked,
            interdire_chevauchement: this.interdire_chevauchement.checked,
            nombre_jour_a_ne_pas_depasser: this.nombre_jour_a_ne_pas_depasser.value,
            jour_par_date: this.jour_par_date.value,
        }
        this.props.onSubmitParamReservationOrdreMission( objet )
     }

     setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }
    


    render() {
        const {item} = this.props
        return (
            <div className="main-card mb-3 card">
            <div className="card-body">
            {item != undefined && <form className="" onSubmit={this.enregisterParamReservationOrdre}>
                                <div className="form-row">
                                   
                                    <div className="col-md-7">
                                        <div className="position-relative form-group">
                                            <label >Un véhicule de fonction peut-il être pris en compte lors d'une reservation ?</label>
                                           
                                        </div>
                                    </div>


                                    <div className="col-md-2">
                                      
                      

                                           <input name="vehicule_fonction_reservable" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.vehicule_fonction_reservable}

                                            ref={vehicule_fonction_reservable => this.vehicule_fonction_reservable = vehicule_fonction_reservable} />
                                    </div>

                                  

                                  
                                </div>

                                <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Faut-il que seul l'administrateur puisse modifier une réservation enregistrée ?</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     

                                          <input name="admin_seul_modif" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.admin_seul_modif}

                                            ref={admin_seul_modif => this.admin_seul_modif = admin_seul_modif} />
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Faut-il que seul l'administrateur puisse supprimer une réservation enregistrée ?</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                   

                                          <input name="admin_seul_supp" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.admin_seul_supp}

                                            ref={admin_seul_supp => this.admin_seul_supp = admin_seul_supp} />
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Suite à la création d'une réservation, faut-il systématiquement éditer la fiche réservation ?</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <input name="edition_automatique" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.edition_automatique}

                                            ref={edition_automatique => this.edition_automatique = edition_automatique} />
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
                                     
                           

                                          <input name="interdire_chevauchement" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.interdire_chevauchement}

                                            ref={interdire_chevauchement => this.interdire_chevauchement = interdire_chevauchement} />
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

                                 

                               
                             
                               {!this.props.isFormReservationOrdreSubmitted ? <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button> : <button disabled  className="mt-2 btn btn-primary">Merci de patienter <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button>}
                           
                                
                            </form>}
            </div>
        </div>
        )
    }
}


export default ReservationOrdreMissionForm