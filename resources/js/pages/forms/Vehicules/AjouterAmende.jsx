import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';
import InputMask from 'react-input-mask';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'



 class AjouterAmende extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicule_en_fouriere: false
        }
      
    }

    // componentDidMount(){
    
    //      if(this.props.vehiculeSeleted == undefined){
    //       const action = {type: "EDIT_SELECTED", value: this.props.location.state.veh}
    //       this.props.dispatch(action)
    
    //      }
    
    //     }

   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }


      verificationFormulaire () {
          if(this.date.value == ''){
              return "La date est obligatoire obligatoire !"
          }else if(this.nature_amende.value == ''){
              return "La nature de l\'amende est obligatoire !"
          }else if(this.conducteur.value == ''){
            return "Le conducteur  est obligatoire !"
          }else if(this.organisme.value == ''){
            return "L\'organisme de réglement est obligatoire !"
          } else{
              return null
          }
      }

      enregistrerIntervention = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/ajouter_vehicule_amende', {
                vehicule: this.props.vehiculeSeleted.id,
                date: this.date.value,
                date_reception: this.date_reception.value ,
                heure: this.heure.value,
                nature_amende: this.nature_amende.value,
                lieu: this.lieu.value,
                conducteur: this.conducteur.value,
                regle_par_conducteur_ou_etablissement: this.regle_par_conducteur_ou_etablissement.value,
                date_reglement: this.date_reglement.value,
                montant_amende: this.montant_amende.value,
                vehicule_en_fouriere: this.state.vehicule_en_fouriere,
                montant_mise_en_fouriere: this.montant_mise_en_fouriere.value,
                organisme: this.organisme.value,
                

            })
            .then(response => { 
               const action = {type: "ADD_AMENDE", value: response.data}
                 this.props.dispatch(action)

               this.props.history.goBack();

             
            }).catch(error => console.log(error))
           

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }

       // console.log(this.date_debut.value)
      }
    

    render() {
        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Gestion des amendes du véhicule
                           
                            {this.props.vehicules.length && 
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/>
                            }                               
                          </h5>
                          <br />
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerIntervention}>
                                <div className="form-row">

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date *</label>
                                            <input name="date"  type="date"
                                            style={inputStyle}
                                            defaultValue={today}
                                            onChange={this.setField}
                                            ref={date => this.date = date}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Heure </label>
                                            <InputMask mask="99:99" maskChar={null} 
                                            inputRef={heure => this.heure = heure}
                                            className="form-control"
                                            name="heure"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date réception </label>
                                            <input name="date_reception"  type="date"
                                            onChange={this.setField}
                                            ref={date_reception => this.date_reception = date_reception}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-4">
                                    <label  className="">Nature de l'amende</label>
                                        <select name="nature_amende" onChange={this.setField}
                                            ref={nature_amende => this.nature_amende = nature_amende}
                                            style={inputStyle}

                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.natures_amendes.map(nature => 
                                                <option key={nature.id} value={nature.id}>{nature.nature_amende}</option>

                                                )}
                                        </select>
                                
                                        </div>
                                

                                  
                                </div>

                    
                                <div className="form-row">
                                    
                                   
                                        <div className="col-md-3">
                                            <label >Lieu</label>

                                            <input name="lieu"
                                            ref={lieu => this.lieu = lieu}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                    <label  className="">Conducteur</label>
                                        <select name="conducteur"
                                            ref={conducteur => this.conducteur = conducteur}

                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.personnels.map(pers => 
                                                <option key={pers.id} value={pers.id}>{pers.nom} {pers.prenom}</option>

                                                )}
                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                    <label  className="">Réglement</label>
                                        <select name="regle_par_conducteur_ou_etablissement"
                                            ref={regle_par_conducteur_ou_etablissement => this.regle_par_conducteur_ou_etablissement = regle_par_conducteur_ou_etablissement}

                                          className="form-control">
                                    <option value="Conducteur">Réglée par le Conducteur</option>
                                    <option value="Etablissement">Réglée par l'établissement</option>

                                            
                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de réglement </label>
                                            <input name="date_reglement"  type="date"
                                            onChange={this.setField}
                                            ref={date_reglement => this.date_reglement = date_reglement}
                                             className="form-control" />
                                             </div>
                                    </div>

                                      
                                    </div>
                                 

                                    <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Montant amende</label>
                                            <input name="montant_amende"  type="number"
                                            onChange={this.setField}
                                            ref={montant_amende => this.montant_amende = montant_amende}
                                             className="form-control" /></div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label"></label>
                                            Véhicule mis en fourière 
                                             <input type="checkbox"
                                               onChange={this.setField}
                                                checked={this.state.vehicule_en_fouriere} 
                                                 name="vehicule_en_fouriere" className="form-control" />
                                        </div>
                                    </div>


                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant mis en fourière </label>
                                            <input name="montant_mise_en_fouriere"
                                            onChange={this.setField}
                                            ref={montant_mise_en_fouriere => this.montant_mise_en_fouriere = montant_mise_en_fouriere}

                                             type="number" className="form-control" />
                                        </div>
                                    </div>

                                     
                                    <div className="col-md-3">
                                    <label  className="">Organisme de réglement</label>
                                        <select name="organisme"
                                            ref={organisme => this.organisme = organisme}

                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.tiers.map(tier => 
                                                <option key={tier.id} value={tier.id}>{tier.code}</option>

                                                )}
                                        </select>
                                
                                        </div> 
                                </div>
                        
                          

                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
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
        natures_amendes: state.natures_amendes.items,
        tiers: state.tiers.items,
        vehicules: state.vehicules.items,

        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        personnels: state.personnels.items
    }
  }

export default connect(mapStateToProps)(AjouterAmende)
