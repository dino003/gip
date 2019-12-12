import React, { Component } from 'react'

export default class ModifierNatureIntervention extends Component {

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
            this.props.onEditSubmit(this.nom_intervention_modif.value,
                 this.categorie_modif.value,
                  this.sinistre_modif.checked,
                  this.operation_modif.checked
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
                        <h3 className="themeoptions-heading">Modifier 
                        </h3>
                        <form className="p-3" onSubmit={this.editing}>
                            <br />
                              
                            <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature des interventions</label>
                                    <input 
                                     ref={nom_intervention_modif => this.nom_intervention_modif = nom_intervention_modif}
                                     defaultValue={item.nom_intervention}
                                    name="nom_intervention_modif"
                                     type="text" className="form-control" />
                                    </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Catégorie</label>
                                    <select className="form-control"
                                        name="categorie_modif"
                                     ref={categorie_modif => this.categorie_modif = categorie_modif}
                                        defaultValue={item.categorie}
                                        onChange={this.setField}
                                        >
                                        <option value="Entretien">Entretien</option>
                                        <option value="Réparation">Réparation</option>
                                        <option value="Rep.Sinistre">Rep.Sinistre</option>
                                        <option value="Matériel/Consomable">Matériel/Consomable</option>
                                        <option value="Divers">Divers</option>
                                        <option value="Rappel constructeur">Rappel constructeur</option>

                                    </select>
                                </div>
                                 
                                    <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress2" className="">
                                        Sinistre ?
                                        <input type="checkbox"
                                         defaultChecked={item.sinistre}
                                        ref={sinistre_modif => this.sinistre_modif = sinistre_modif}
                                        onChange={this.setField}

                                         name="sinistre" />
                                        </label>
                                </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress2" className="">
                                        Opérations ? 
                                        <input type="checkbox" 
                                         ref={operation_modif => this.operation_modif = operation_modif}
                                         onChange={this.setField}

                                         defaultChecked={item.operation}
                                        name="operation" />
                                        </label>
                                </div>
                            
                            
                                <button type="submit" className="mt-2 btn btn-primary">Modifier</button>
                        
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
