import React, { Component } from 'react'

class ModulesForm extends Component {

    constructor(props) {
        super(props);
        
        
    }

    enregisterModules = (e) => {
        e.preventDefault();
        let objet = {
            utilisation_vehicules: this.utilisation_vehicules.checked,
            consomation_vehicules: this.consomation_vehicules.checked,
            budget_depenses_vehicules: this.budget_depenses_vehicules.checked,
            gestion_ordre_de_mission: this.gestion_ordre_de_mission.checked,
            intervention_vehicules: this.intervention_vehicules.checked,
            reservations: this.reservations.checked,
            contrat_assurance_sinistres: this.contrat_assurance_sinistres.checked,
            journal_evenement: this.journal_evenement.checked,
            amendes: this.amendes.checked,
            stock_pieces_detache_consomable: this.stock_pieces_detache_consomable.checked,
           
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
                                <div className="col-md-12">
                                        <div className="position-relative form-group">
                                            <label >Le paramètrage ci-dessous détermine les fonctionnalités que vous souhaitez ou non utiliser ! </label>
                                   </div>
                            </div>
                                   
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Utilisations des véhicules</label>
                                           
                                        </div>
                                    </div>


                                    <div className="col-md-2">
                                      
                                      
                                            <input name="utilisation_vehicules" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.utilisation_vehicules}

                                            ref={utilisation_vehicules => this.utilisation_vehicules = utilisation_vehicules} />
                                    </div>

                                    <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Réservations des véhicules</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                       
                                            <input name="reservations" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.reservations}

                                            ref={reservations => this.reservations = reservations} />
                                   </div>

                              

                                  
                                </div>

                                <div className="form-row">
                                   
                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Consommations des véhicules</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     

                                          <input name="consomation_vehicules" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.consomation_vehicules}

                                            ref={consomation_vehicules => this.consomation_vehicules = consomation_vehicules} />
                                   </div>

                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Contrats d'assurances et sinistres</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                    
                                          
                                          <input name="contrat_assurance_sinistres" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.contrat_assurance_sinistres}

                                            ref={contrat_assurance_sinistres => this.contrat_assurance_sinistres = contrat_assurance_sinistres} />
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Interventions sur les véhicules</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                            

                                          <input name="intervention_vehicules" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.intervention_vehicules}

                                            ref={intervention_vehicules => this.intervention_vehicules = intervention_vehicules} />
                                   </div>

                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Journal des événements</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <input name="journal_evenement" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.journal_evenement}

                                            ref={journal_evenement => this.journal_evenement = journal_evenement} />
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Budgets / Dépenses-Recettes</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                

                                          <input name="budget_depenses_vehicules" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.budget_depenses_vehicules}

                                            ref={budget_depenses_vehicules => this.budget_depenses_vehicules = budget_depenses_vehicules} />
                                   </div>

                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Gestion des Amendes</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
          

                                          <input name="amendes" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.amendes}

                                            ref={amendes => this.amendes = amendes} />
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Gestion des Ordres de mission</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                                          <input name="gestion_ordre_de_mission" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.gestion_ordre_de_mission}

                                            ref={gestion_ordre_de_mission => this.gestion_ordre_de_mission = gestion_ordre_de_mission} />
                                   </div>

                                   <div className="col-md-4">
                                       <div className="position-relative form-group">
                                           <label >Stocks de pièces détachées</label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
          

                                          <input name="stock_pieces_detache_consomable" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.stock_pieces_detache_consomable}

                                            ref={stock_pieces_detache_consomable => this.stock_pieces_detache_consomable = stock_pieces_detache_consomable} />
                                   </div>
                                 
                               </div>

            

                               
                             
                               {!this.props.isFormModuleSubmitted ? <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button> : <button disabled  className="mt-2 btn btn-warning">Merci de patienter  <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button>}
                           
                                
                            </form>}
            </div>
        </div>
        )
    }
}


export default ModulesForm