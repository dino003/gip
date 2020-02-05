import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';
import InputMask from 'react-input-mask';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'
import Select from 'react-select'
import { colourStyles } from '../../../utils/Repository';



 class AjouterAmende extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicule_en_fouriere: false,
            isFormSubmitted: false
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
          }else if(this.conducteur.value == ''){
            return "Le Conducteur est obligatoire !"
          }else if(this.organisme.value == ''){
            return "Vous n'avez pas saisi le montant de l'amende !"
          }else if(!this.state.lieu){
            return "Vous n'avez pas sélectionné le lieu !"
          } else{
              return null
          }
      }

      enregistrerIntervention = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
              this.setState({isFormSubmitted: true})
            axios.post('/api/ajouter_vehicule_amende', {
                vehicule: this.props.vehiculeSeleted.id,
                date: this.date.value,
                date_reception: this.date_reception.value ,
                heure: this.heure.value,
                nature_amende: this.nature_amende.value,
                lieu_id: this.state.lieu ? this.state.lieu.id : null,
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
                this.setState({isFormSubmitted: false})
               this.props.history.goBack();

             
            }).catch(error => { 
                this.setState({isFormSubmitted: false})
                console.log(error) } )
           

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }

       // console.log(this.date_debut.value)
      }

      setVehiculeSelectedAuRechargement = () => {
        if(this.props.vehiculeSeleted == undefined){
            if(this.props.vehicules.length){
                let vehicule = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
            
                const action = {type: "EDIT_SELECTED", value: vehicule}
                this.props.dispatch(action)
            }
        }
    }

    setFieldSelectDepartEtDestination(name, value) {
     
        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }

          
    getNiveauxPlanGeographiques = () => {
        const events = [];
        this.props.structure_geographiques.map(event => {
            if(!event.niveau) return;
            return events.push(event.niveau)
        })
        
        return events
    }

    getMaximumNiveauPlanGeographique = () => {
        var niveau = Math.max(...this.getNiveauxPlanGeographiques()) 
        if (niveau == 0) return 1;
        return Number(niveau );

    }

    getStructureGeographiqueDernierNiveau = () => {
        if(!this.getPlanGeographiquesDerniersNiveau().length) return undefined;
        else{
            return this.props.structure_geographiques.find(st => st.niveau == this.getPlanGeographiquesDerniersNiveau()[0].structure_geographique.niveau)
        }
    }

    getPlanGeographiquesDerniersNiveau = () => {
        return this.props.plan_geographiques.filter(elm => elm.structure_geographique ? elm.structure_geographique.niveau == this.getMaximumNiveauPlanGeographique() : false) 
    }
    

    render() {
        if(this.props.vehiculeSeleted == undefined){
            if(this.props.vehicules.length){
                let vehicule = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
            
                const action = {type: "EDIT_SELECTED", value: vehicule}
                this.props.dispatch(action)
            }
        }

        
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
                                            max={today}
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
                                            defaultValue={this.props.natures_amendes.length == 1 ? this.props.natures_amendes[0].id : null}

                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.natures_amendes.map(nature => 
                                                <option key={nature.id} value={nature.id}>{nature.nature_amende}</option>

                                                )}
                                        </select>
                                
                                        </div>
                                

                                  
                                </div>

                    
                                <div className="form-row">
                                    
                                   
                  

                                          <div className="col-md-4">
                                              <label >Lieu </label>
                                      

                                              <Select
                                                  name="lieu"
                                                  isDisabled={!this.getStructureGeographiqueDernierNiveau()}
                                                  placeholder={`Sélection de ${this.getStructureGeographiqueDernierNiveau().libelle}`}
                                                  noOptionsMessage={() => `Pas de ${this.getStructureGeographiqueDernierNiveau().libelle} pour l'instant`}
                                                  options={this.getPlanGeographiquesDerniersNiveau()}
                                                  getOptionLabel={option => option.libelle}
                                                  getOptionValue={option => option.id}
                                                  styles={colourStyles}
                                                  onChange={this.setFieldSelectDepartEtDestination.bind(this, "lieu")}
                                              />

                                          </div> 

                                        <div className="col-md-3">
                                    <label  className="">Conducteur</label>
                                        <select name="conducteur"
                                            ref={conducteur => this.conducteur = conducteur}
                                            defaultValue={this.props.vehiculeSeleted ? this.props.vehiculeSeleted.detenteur ?  this.props.vehiculeSeleted.detenteur.id : this.props.vehiculeSeleted.chauffeur_atitre ? this.props.vehiculeSeleted.chauffeur_atitre.id  : null : null}
                                            style={inputStyle}
                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.personnels.map(pers => 
                                                <option key={pers.id} value={pers.id}>{pers.nom} {pers.prenom}</option>

                                                )}
                                        </select>
                                
                                        </div>

                                        <div className="col-md-2">
                                    <label  className="">Réglée par</label>
                                        <select name="regle_par_conducteur_ou_etablissement"
                                            ref={regle_par_conducteur_ou_etablissement => this.regle_par_conducteur_ou_etablissement = regle_par_conducteur_ou_etablissement}

                                          className="form-control">
                                    <option value="Etablissement"> L'établissement</option>

                                    <option value="Conducteur">le Conducteur</option>

                                            
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
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Montant de l'amende</label>
                                            <input name="montant_amende"  type="number"
                                            onChange={this.setField}
                                            style={inputStyle}
                                            ref={montant_amende => this.montant_amende = montant_amende}
                                             className="form-control" /></div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label"></label>
                                             fourière ? 
                                             <input type="checkbox"
                                               onChange={this.setField}
                                                checked={this.state.vehicule_en_fouriere} 
                                                 name="vehicule_en_fouriere" className="form-control" />
                                        </div>
                                    </div>


                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant mis en fourière ? </label>
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
                        
                          

                                <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
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
        personnels: state.personnels.items,
        plan_geographiques: state.plan_geographiques.items,
        structure_geographiques: state.structure_geographiques.items
    }
  }

export default connect(mapStateToProps)(AjouterAmende)
