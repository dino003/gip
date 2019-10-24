import React, { Component } from 'react'

export default class ModifierNatureConsommation extends Component {

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
            this.props.onEditSubmit(this.nature_consomation.value,
                 this.categorie.value,
                  this.carte_associe.value,
                  this.unite_mesure.value
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
                        <form ref={(ref) => this.formRef = ref} className="p-3" onSubmit={this.editing}>
                            <br />
                              
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature des consommations</label>
                                    <input name="nature_consomation"
                                    defaultValue={item.nature_consomation}
                                     ref={nature_consomation => this.nature_consomation = nature_consomation}
                                      type="text" className="form-control" />
                                    </div>

                                    <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Catégorie</label>
                                    <select className="form-control"
                                     ref={categorie => this.categorie = categorie}
                                        onChange={this.setField}
                                        defaultValue={item.categorie}

                                     name="categorie">
                                         <option value="Carburant">Carburant</option>
                                         <option value="Péage">Péage</option>

                                        <option value="Entretien">Entretien</option>
                                        <option value="Réparation">Réparation</option>
                                        <option value="Matériel/Consomable">Matériel/Consomable</option>
                                        <option value="Autres/Divers">Autres/Divers</option>
                                        <option value="Frais">Frais</option>

                                    </select>
                                </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Unité de mesure</label>
                                    <select className="form-control"
                                         defaultValue={item.unite_mesure}

                                     ref={unite_mesure => this.unite_mesure = unite_mesure}
                                        onChange={this.setField}
                                     name="unite_mesure">
                                        <option value="Litre">Litre</option>
                                        <option value="Nombre">Nombre</option>
                                        <option value="Kva">Kva</option>
                                        <option value="Kgs">Kgs</option>
                                        <option value="Montant">Montant</option>
                                        <option value="Autre">Autre</option>

                                    </select>
                                </div>

                                
                           

                                
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Carte associéé</label>
                                    <select className="form-control"
                                    defaultValue={item.carte_associe}

                                     ref={carte_associe => this.carte_associe = carte_associe}
                                        onChange={this.setField}
                                     name="carte_associe">
                                        <option value="Carte carburant">Carte carburant</option>
                                        <option value="Carte péage">Carte péage</option>
                                        <option value="Autre carte">Autre carte</option>

                                    </select>
                                </div>
                             
                            
                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
