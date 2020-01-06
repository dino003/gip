import React, { Component } from 'react'

 class JournalEvenementForm extends Component {
     constructor(props) {
         super(props);
        
     }

     enregistrerInfoJournalEvenement = (e) =>{
        e.preventDefault();
        let objetInfo = {
            parc: this.parc.checked,
            contrat_assurance: this.contrat_assurance.checked,
            utilisation_vehicules: this.utilisation_vehicules.checked,
            intervention_vehicules: this.intervention_vehicules.checked,
            reservation_vehicules: this.reservation_vehicules.checked,
            consommation_vehicules: this.consommation_vehicules.checked,
            tiers: this.tiers.checked,
            personnels: this.personnels.checked,
            entites: this.entites.checked,
            stocks: this.stocks.checked,
            budgets: this.budgets.checked,
            depense_recettes: this.depense_recettes.checked,
        }
        this.props.onJournalFormSubmit( objetInfo )
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
                {item != undefined && 
            <form className="" onSubmit={this.enregistrerInfoJournalEvenement}>
                              
                        <div className="form-row">
                            <div className="col-md-12">
                                        <div className="position-relative form-group">
                                            <label >Le paramètrage ci-dessous vous permet de déterminer les évenements que vous souhaitez enregistrer dans le journal des événements </label>
                                         </div>
                                    </div>
                            </div>


                                    <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Parc de véhicules </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="parc" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.parc}

                                            ref={parc => this.parc = parc} />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label > Contrats d'assurances </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="contrat_assurance" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.contrat_assurance}

                                            ref={contrat_assurance => this.contrat_assurance = contrat_assurance} />
                                        </div>
                                    </div>

                                
                                  
                                </div>

                                
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Utilisations des véhicules </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="utilisation_vehicules" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.utilisation_vehicules}

                                            ref={utilisation_vehicules => this.utilisation_vehicules = utilisation_vehicules} />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label > Interventions sur Véhicules </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="intervention_vehicules" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.intervention_vehicules}

                                            ref={intervention_vehicules => this.intervention_vehicules = intervention_vehicules} />
                                        </div>
                                    </div>

                                
                                  
                                </div>



                                    <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Consommations des véhicules </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="consommation_vehicules" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.consommation_vehicules}

                                            ref={consommation_vehicules => this.consommation_vehicules = consommation_vehicules} />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label > Réservations des véhicules </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="reservation_vehicules" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.reservation_vehicules}

                                            ref={reservation_vehicules => this.reservation_vehicules = reservation_vehicules} />
                                        </div>
                                    </div>

                                
                                  
                                </div>



                                    <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Budgets </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="budgets" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.budgets}

                                            ref={budgets => this.budgets = budgets} />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label > Dépenses / Recettes </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="depense_recettes" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.depense_recettes}

                                            ref={depense_recettes => this.depense_recettes = depense_recettes} />
                                        </div>
                                    </div>

                                
                                  
                                </div>



                                    <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Les Tiers (fournisseurs...) </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="tiers" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.tiers}

                                            ref={tiers => this.tiers = tiers} />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label > Le personnel </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="personnels" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.personnels}

                                            ref={personnels => this.personnels = personnels} />
                                        </div>
                                    </div>

                                
                                  
                                </div>

                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Les Entités </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="entites" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.entites}

                                            ref={entites => this.entites = entites} />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label > Les Stocks </label>
                                   </div>
                                    </div>
                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <input name="stocks" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.stocks}

                                            ref={stocks => this.stocks = stocks} />
                                        </div>
                                    </div>

                                
                                  
                                </div>
                               
                             
                                {!this.props.isFormJournalSubmitted ? <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button> : <button disabled  className="mt-2 btn btn-primary">Merci de patienter  <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button>}
                           
                                
                            </form> }
            </div>
        </div> 
        )
    }
}


export default JournalEvenementForm
