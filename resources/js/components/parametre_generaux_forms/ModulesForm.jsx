import React, { Component } from 'react'

class ModulesForm extends Component {

    constructor(props) {
        super(props);
        
        
    }

    enregisterModules = (e) => {
        e.preventDefault();
        let objet = {
            utilisation_vehicules: this.utilisation_vehicules.value,
            consomation_vehicules: this.consomation_vehicules.value,
            budget_depenses_vehicules: this.budget_depenses_vehicules.value,
            gestion_ordre_de_mission: this.gestion_ordre_de_mission.value,
            intervention_vehicules: this.intervention_vehicules.value,
            reservations: this.reservations.value,
            contrat_assurance_sinistres: this.contrat_assurance_sinistres.value,
            journal_evenement: this.journal_evenement.value,
            amendes: this.amendes.value,
            stock_pieces_detache_consomable: this.stock_pieces_detache_consomable.value,
           
        }
        this.props.onSubmitModuleForm( objet )
     }

  
    


    render() {
        const {item} = this.props
        return (
            <div className="main-card mb-3 card">
            <div className="card-body">
            {item != undefined && <form className="" onSubmit={this.enregisterModules}>
                                <div className="form-row">
                                   
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Utilisations des véhicules</label>
                                           
                                        </div>
                                    </div>


                                    <div className="col-md-2">
                                      
                                           <select name="utilisation_vehicules" 
                                            ref={utilisation_vehicules => this.utilisation_vehicules = utilisation_vehicules}
                                            defaultValue={item.utilisation_vehicules}
                                            className="form-control">
                                                
                                               <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                           </select>
                                    </div>

                                    <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Réservations des véhicules</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="reservations" 
                                        ref={reservations => this.reservations = reservations}
                                        defaultValue={item.reservations}

                                           className="form-control">
                                             <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                          </select>
                                   </div>

                              

                                  
                                </div>

                                <div className="form-row">
                                   
                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Consommations des véhicules</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="consomation_vehicules" 
                                        ref={consomation_vehicules => this.consomation_vehicules = consomation_vehicules}
                                        defaultValue={item.consomation_vehicules}

                                           className="form-control">
                                              <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                          </select>
                                   </div>

                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Contrats d'assurances et sinistres</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="contrat_assurance_sinistres" 
                                        ref={contrat_assurance_sinistres => this.contrat_assurance_sinistres = contrat_assurance_sinistres}
                                        defaultValue={item.contrat_assurance_sinistres}

                                           className="form-control">
                                             <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                          </select>
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Interventions sur les véhicules</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="intervention_vehicules" 
                                        ref={intervention_vehicules => this.intervention_vehicules = intervention_vehicules}
                                        defaultValue={item.intervention_vehicules}

                                           className="form-control">
                                             <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                          </select>
                                   </div>

                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Journal des événements</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="journal_evenement" 
                                        ref={journal_evenement => this.journal_evenement = journal_evenement}
                                        defaultValue={item.journal_evenement}

                                           className="form-control">
                                             <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                          </select>
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Budgets / Dépenses-Recettes</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="budget_depenses_vehicules" 
                                        ref={budget_depenses_vehicules => this.budget_depenses_vehicules = budget_depenses_vehicules}
                                        defaultValue={item.budget_depenses_vehicules}

                                           className="form-control">
                                             <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                          </select>
                                   </div>

                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Gestion des Amendes</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="amendes" 
                                        ref={amendes => this.amendes = amendes}
                                        defaultValue={item.amendes}

                                           className="form-control">
                                             <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                          </select>
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Gestion des Ordres de mission</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="gestion_ordre_de_mission" 
                                        ref={gestion_ordre_de_mission => this.gestion_ordre_de_mission = gestion_ordre_de_mission}
                                        defaultValue={item.gestion_ordre_de_mission}

                                           className="form-control">
                                             <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                          </select>
                                   </div>

                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Stocks de pièces détachées</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <select name="stock_pieces_detache_consomable" 
                                        ref={stock_pieces_detache_consomable => this.stock_pieces_detache_consomable = stock_pieces_detache_consomable}
                                        defaultValue={item.stock_pieces_detache_consomable}

                                           className="form-control">
                                             <option value="0">Non</option>
                                               <option value="1">OUI</option>

                                          </select>
                                   </div>
                                 
                               </div>

            

                               
                             
                               {!this.props.isFormModuleSubmitted ? <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button> : <button disabled  className="mt-2 btn btn-warning">Merci de patienter ...</button>}
                           
                                
                            </form>}
            </div>
        </div>
        )
    }
}


export default ModulesForm