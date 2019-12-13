import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import inputStyle from '../../../utils/inputStyle'



export default class ModifierUtilisationVehicule extends Component {

    constructor(props) {
        super(props);
        this.state = {

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
            this.props.onEditSubmit(this.utilisatation_normal_ou_pret.value, this.nature_utilisation.value, this.utilisateur.value,this.chauffeur.value, this.date_debut_utilisation.value, this.heure_debut.value, this.date_fin_utilisation.value, this.heure_de_fin.value, this.kilometrage_compteur_debut.value,  this.kilometrage_compteur_retour.value, this.kilometres_parcourus.value, this.pourcentage_reservoire_debut.value, this.pourcentage_reservoire_retour.value, )
                  this.props.closeEdit();
        }
        setField2 = (event) => {
            //  this.setState({[e.target.name]: e.target.value})
              const target = event.target;
              const value = target.type === 'checkbox' ? target.checked : target.value;
              const name = target.name;
          
              this.setState({
                [name]: value
              }, () => {
                  //alert('ok')
                this.kilometres_parcourus.value = this.kilometrage_compteur_retour.value - this.kilometrage_compteur_debut.value 
              });
            }

            verificationFormulaire () {
                if(this.kilometres_parcourus.value < 0 && this.kilometres_parcourus.value.length){
                    return "Le nombre de kilomètre parcourus ne peut être négatif !"
                }else if(this.nature_utilisation.value == undefined || !this.nature_utilisation.value.length){
                  return "La nature d'utilisation est obligatoire !"
                } else if(this.utilisatation_normal_ou_pret.value == undefined || !this.utilisatation_normal_ou_pret.value.length){
                    return "Le type d'utilisation est obligatoire !"
                  }else if(this.utilisateur.value == undefined || !this.utilisateur.value.length){
                    return "L'utilisateur est obligatoire !"
                  }else if(this.date_debut_utilisation.value == undefined || !this.date_debut_utilisation.value.length){
                    return "La date de début d'utilisation est obligatoire !"
                  }else if(this.date_fin_utilisation.value == undefined || !this.date_fin_utilisation.value.length){
                    return "La date de fin d'utilisation est obligatoire !"
                  }else if(this.heure_debut.value == undefined || !this.heure_debut.value.length){
                    return "L'heure de début d'utilisation est obligatoire !"
                  }else if(this.heure_de_fin.value == undefined || !this.heure_de_fin.value.length){
                    return "L'heure de fin d'utilisation est obligatoire !"
                  }else{
                    return null
                }
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
                        <form  className="p-3" onSubmit={this.editing}>
                            <br />
                            <div className="form-row">
                                <div className="col-md-6">
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Type d'utilisation</label>
                                    <select className="form-control"
                                    style={inputStyle}
                                    defaultValue={item.utilisatation_normal_ou_pret}
                                     ref={utilisatation_normal_ou_pret => this.utilisatation_normal_ou_pret = utilisatation_normal_ou_pret}
                                        onChange={this.setField}
                                     name="utilisatation_normal_ou_pret">
                                        <option value="Utilisation normale">Utilisation normale</option>
                                        <option value="Prêt">Prêt</option>
                                      
                                    </select>
                                </div>
                                </div>
                           
                                <div className="col-md-6">
                             

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature Utilisation</label>
                                    <select className="form-control"
                                     style={inputStyle}
                                     defaultValue={item.nature_utilisation.id}

                                     ref={nature_utilisation => this.nature_utilisation = nature_utilisation}
                                        onChange={this.setField}
                                     name="nature_utilisation">
                                        <option value={null}></option>

                                         {this.props.natures_reservations.map(nat => 
                                        <option key={nat.id} value={nat.id}>{nat.libelle}</option>

                                         )}
                                      

                                    </select>
                                </div>
                                </div>
                               

                                </div>

                                <div className="form-row">
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Utilisateur</label>
                                    <select className="form-control"
                                     style={inputStyle}
                                        defaultValue={item.utilisateur.id}

                                     ref={utilisateur => this.utilisateur = utilisateur}
                                        onChange={this.setField}
                                     name="utilisateur">
                                         <option value={null}></option>
                                         {this.props.personnels.map(per => 
                                             <option key={per.id} value={per.id}>{per.prenom} {per.nom}</option>

                                         )}
                                      

                                    </select>
                                </div>
                                    </div>
                              

                              
                             <div className="col-md-6">
                                 {/*
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Entité de l'utilisateur</label>
                                    <select className="form-control"
                                        style={inputStyle}

                                     defaultValue={vehiculeSelect == undefined ?
                                        null : vehiculeSelect.entite_comptable ? vehiculeSelect.entite_comptable.id : null}
                                     ref={entite_utilisateur => this.entite_utilisateur = entite_utilisateur}
                                        onChange={this.setField}
                                     name="entite_utilisateur">
                                         <option value={null}></option>

                                        {this.props.entites.map(ent => 
                                             <option key={ent.id} value={ent.id}>{ent.entite}</option>

                                        )}                                      

                                    </select>
                                </div>
                                */}

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Chauffeur</label>
                                    <select className="form-control"
                                     ref={chauffeur => this.chauffeur = chauffeur}
                                        onChange={this.setField}
                                        defaultValue={item.chauffeur ? item.chauffeur.id : null}
                                         name="chauffeur">
                                             <option value={null}></option>
                                             {this.props.personnels.map(per => 
                                                 <option key={per.id} value={per.id}>{per.prenom} {per.nom}</option>
    
                                             )}

                                    </select>
                                </div>
                            </div>
                              
                                </div>
                              
                           
                             

                              
                              
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Date début utilisation</label>
                                            <input name="date_debut_utilisation"
                                            style={inputStyle}
                                            defaultValue={item.date_debut_utilisation}
                                            ref={date_debut_utilisation => this.date_debut_utilisation = date_debut_utilisation}
                                              type="date" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Heure début </label>
                                            <InputMask mask="99:99" maskChar={null} 
                                            style={inputStyle}
                                            defaultValue={item.heure_debut}
                                            inputRef={heure_debut => this.heure_debut = heure_debut}
                                            className="form-control"
                                            name="heure_debut"
                                            />
                                          
                                              </div>
                                    </div>
  
                                 
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Date fin utilisation</label>

                                            <input name="date_fin_utilisation"
                                                defaultValue={item.date_fin_utilisation}
                                                style={inputStyle}

                                            ref={date_fin_utilisation => this.date_fin_utilisation = date_fin_utilisation}
                                              type="date" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Heure de fin </label>
                                            <InputMask mask="99:99" maskChar={null} 
                                            style={inputStyle}
                                            defaultValue={item.heure_de_fin}
                                            inputRef={heure_de_fin => this.heure_de_fin = heure_de_fin}
                                            className="form-control"
                                            name="heure_de_fin"
                                            />
                                          
                                              </div>
                                    </div>

                                   
                                </div>

                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Kilomètrage début</label>
                                            <input name="kilometrage_compteur_debut"
                                            defaultValue={item.kilometrage_compteur_debut }
                                ref={kilometrage_compteur_debut => this.kilometrage_compteur_debut = kilometrage_compteur_debut}
                                              type="number" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label > au retour </label>
                                            <input name="kilometrage_compteur_retour"
                                            onBlur={this.setField2}
                                            defaultValue={item.kilometrage_compteur_retour }

                                            ref={kilometrage_compteur_retour => this.kilometrage_compteur_retour = kilometrage_compteur_retour}
                                              type="number" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label > parcourus </label>
                                            <input name="kilometres_parcourus"
                                            readOnly
                                            defaultValue={item.kilometres_parcourus }

                                            ref={kilometres_parcourus => this.kilometres_parcourus = kilometres_parcourus}
                                              type="number" className="form-control" /></div>
                                    </div>

                                   
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >% de remplissage reservoir en debut</label>
                                            <input name="pourcentage_reservoire_debut"
                                            defaultValue={item.pourcentage_reservoire_debut }

                                            ref={pourcentage_reservoire_debut => this.pourcentage_reservoire_debut = pourcentage_reservoire_debut}
                                              type="number" step="0.1" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >% de remplissage reservoir au retour </label>
                                            <input name="pourcentage_reservoire_retour"
                                            defaultValue={item.pourcentage_reservoire_retour }

                                            ref={pourcentage_reservoire_retour => this.pourcentage_reservoire_retour = pourcentage_reservoire_retour}
                                            type="number" step="0.1" className="form-control" /></div>
                                    </div>

                                   
                                </div>

                            
                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                      
                                <span  onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
