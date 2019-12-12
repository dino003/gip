import React, { Component } from 'react'

export default class ModifierOperationIntervention extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nom_intervention_modif: '',
            categorie_modif: '',
            // operation: false,
            // sinistre: false

        }
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

        editing = (e) => {
            e.preventDefault()
            this.props.onEditSubmit(this.nature_intervention.value,
                 this.categorie_vehicule.value,
                 this.categorie_operation.value,
                 this.nature_operation.value,
                 this.temps_minute.value,
                 this.cout_moyen.value,

                  )
                  this.props.closeEdit();
        }
    
    render() {
        const {item, isOpen} = this.props
        return (
            <div className={isOpen ? "ui-theme-settings settings-open" : "ui-theme-settings"}>
            {isOpen &&   <button type="button" onClick={this.props.closeEdit.bind(this)} 
             className="btn-open-options btn btn-warning">
                <i className="fa fa-times fa-w-16 fa-spin fa-2x"></i>
            </button>}
            <div className="theme-settings__inner">
                <div className="scrollbar-container">
                    <div className="theme-settings__options-wrapper">
                        <h3 className="themeoptions-heading">Ajouter 
                        </h3>
                        <form className="p-3" onSubmit={this.editing}>
                            <br />
                              
                               

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature d'intervention</label>
                                    <select className="form-control"
                                     ref={nature_intervention => this.nature_intervention = nature_intervention}
                                        onChange={this.setField}
                                        defaultValue={item.nature_intervention.id}
                                     name="nature_intervention">
                                         <option value={null}></option>

                                         {this.props.natures_interventions.map(nat => 
                                        <option key={nat.id} value={nat.id}>{nat.nom_intervention}</option>

                                            )}
                                       

                                    </select>
                                </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Catégorie de véhicule</label>
                                    <select className="form-control"
                                     ref={categorie_vehicule => this.categorie_vehicule = categorie_vehicule}
                                        onChange={this.setField}
                                        defaultValue={item.categorie_vehicule.id}

                                     name="categorie_vehicule">
                                         <option value={null}></option>
                                         {this.props.categories_vehicules.map(cat => 
                                        <option key={cat.id} value={cat.id}>{cat.nom_type}</option>

                                            )}
                                       

                                    </select>
                                </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Catégorie d'opération</label>
                                    <input name="categorie_operation"
                                    defaultValue={item.categorie_operation}
                                     ref={categorie_operation => this.categorie_operation = categorie_operation}
                                      type="text" className="form-control" />
                                    </div>

                                    <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature Opération</label>
                                    <input name="nature_operation"
                                    defaultValue={item.nature_operation}

                                     ref={nature_operation => this.nature_operation = nature_operation}
                                      type="text" className="form-control" />
                                    </div>

                                    
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Temps en minutes</label>
                                            <input name="temps_minute"
                                             defaultValue={item.temps_minute}

                                            ref={temps_minute => this.temps_minute = temps_minute}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Coût moyen</label>
                                            <input name="cout_moyen"
                                             defaultValue={item.cout_moyen}

                                            ref={cout_moyen => this.cout_moyen = cout_moyen}
                                              type="text" className="form-control" /></div>
                                    </div>
                                   
                                   
                                    
                                 
                                </div>
                        
                            
                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                       
                                <button onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
