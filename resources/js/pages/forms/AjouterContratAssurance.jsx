import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'

import today from '../../utils/today'
import inputStyle from '../../utils/inputStyle'



 class AjouterContratAssurance extends Component {
    constructor(props) {
        super(props);
        this.state = {}
      
    }

   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    setFieldDateContrat = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setAutreDate(this.date_contrat.value) );
    }

    setFieldCompagnieEtCourtier = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.courtier.value = this.compagnie_assurance.value );
    }

    checkCompagnie = () => {
        if(this.compagnie_assurance.value !== '') return false
       return true 
    }

    setAutreDate = (date) => {
        this.periode_date_debut.value = date;
        this.date_prise_effet.value = date;

        let h = new Date(date)
        var annee_fin = h.getFullYear() + 1
        var annee = annee_fin.toString()

        var jour = h.getDate() - 1
        var jour1 = jour.toString();

         const date_fin = annee + '-' + (h.getMonth() + 1).toString().padStart(2, 0) + 
         '-' + jour1.padStart(2, 0);

         this.periode_date_fin.value = date_fin
    }



      verificationFormulaire () {
          if(this.date_contrat.value == ''){
              return "La date du contrat est obligatoire !"
          }else if(this.numero_contrat_police.value == ''){
              return "Le numero du contrat ou police est obligatoire !"
          }else if(this.compagnie_assurance.value == ''){
            return "La Compagnie d\'assurance est obligatoire !"
          } else{
              return null
          }
      }

      enregistrerIntervention = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/ajouter_contrat_assurance', {
                vehicule: this.vehicule.value,
                numero_contrat_police: this.numero_contrat_police.value,
                date_contrat: this.date_contrat.value,
                periode_date_debut: this.periode_date_debut.value ,
                periode_date_fin: this.periode_date_fin.value,
                date_prise_effet: this.date_prise_effet.value,
                compagnie_assurance: this.compagnie_assurance.value,
                courtier: this.courtier.value,
                valeur_assuree: this.valeur_assuree.value,
                montant_assuree: this.montant_assuree.value,
                montant_prime: this.montant_prime.value,
                pourcentage_assiete: this.pourcentage_assiete.value,
                montant_franchise: this.montant_franchise.value,
               
            })
            .then(response => { 
               const action = {type: "ADD_CONTRAT_ASSURANCE", value: response.data}
                 this.props.dispatch(action)

               this.props.history.goBack();

             
            }).catch(error => console.log(error))
           

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
     

       // console.log(yea)
      }
    

    render() {
        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Ajout de Contrat d'assurance
                                                         
                          </h5>
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerIntervention}>
                          
                               
                                <div className="form-row">

                                <div className="col-md-3">
                                         <label  className="">Véhicule</label>
                                        <select name="vehicule" onChange={this.setField}
                                            ref={vehicule => this.vehicule = vehicule}
                                            style={inputStyle}

                                          className="form-control">
                                        <option value="">Tous</option>

                                        {this.props.vehicules.map(vehicule => 
                                                <option key={vehicule.id} value={vehicule.id}>{vehicule.immatriculation} {vehicule.modele} </option>

                                                )}
                                        </select>
                                
                                        </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >N° de contrat/Police * </label>
                                            <input name="numero_contrat_police"  type="text"
                                            onChange={this.setField}
                                            style={inputStyle}
                                            ref={numero_contrat_police => this.numero_contrat_police = numero_contrat_police}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date du contrat *</label>
                                            <input name="date_contrat"  type="date"
                                            style={inputStyle}
                                            onChange={this.setFieldDateContrat}
                                            ref={date_contrat => this.date_contrat = date_contrat}
                                             className="form-control" />
                                             </div>
                                    </div>

                                  
                                </div>

                                <div className="form-row">
                                <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Période ===></label>
                                           
                                             </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de debut *</label>
                                            <input name="periode_date_debut"  type="date"
                                            style={inputStyle}
                                            readOnly
                                            onChange={this.setField}
                                            ref={periode_date_debut => this.periode_date_debut = periode_date_debut}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de fin *</label>
                                            <input name="periode_date_fin"  type="date"
                                            style={inputStyle}
                                            onChange={this.setField}
                                            ref={periode_date_fin => this.periode_date_fin = periode_date_fin}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de prise d'effet *</label>
                                            <input name="date_prise_effet"  type="date"
                                            style={inputStyle}
                                            onChange={this.setField}
                                            ref={date_prise_effet => this.date_prise_effet = date_prise_effet}
                                             className="form-control" />
                                             </div>
                                    </div>
                                   
                                </div>

                                <div className="form-row">

                                <div className="col-md-3">
                                         <label  className="">Compagnie d'assurance</label>
                                        <select name="compagnie_assurance" onChange={this.setFieldCompagnieEtCourtier}
                                            ref={compagnie_assurance => this.compagnie_assurance = compagnie_assurance}
                                            style={inputStyle}

                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.tiers.map(tier => 
                                                <option key={tier.id} value={tier.id}>{tier.code} </option>

                                                )}
                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Courtier</label>
                                        <select name="courtier" onChange={this.setField}
                                            ref={courtier => this.courtier = courtier}
                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.tiers.map(tier => 
                                                <option key={tier.id} value={tier.id}>{tier.code} </option>

                                                )}
                                        </select>
                                
                                        </div>
                                    
                                   
                                        <div className="col-md-3">
                                            <label >Valeur assurée</label>

                                            <input name="valeur_assuree"
                                            ref={valeur_assuree => this.valeur_assuree = valeur_assuree}
                                              type="number" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                            <label >Montant assuré des objets</label>

                                            <input name="montant_assuree"
                                                onChange={this.setField}
                                            ref={montant_assuree => this.montant_assuree = montant_assuree}
                                              type="number" className="form-control" />
                                        </div>

                                      
                                    </div>
                                 
                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant de la prime</label>
                                            <input name="montant_prime"  type="number"
                                            ref={montant_prime => this.montant_prime = montant_prime}
                                             className="form-control" />
                                             </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Pourcentage assiète</label>

                                            <input name="pourcentage_assiete"
                                            ref={pourcentage_assiete => this.pourcentage_assiete = pourcentage_assiete}

                                              type="number" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant franchise</label>

                                            <input name="montant_franchise"
                                            ref={montant_franchise => this.montant_franchise = montant_franchise}

                                              type="number" className="form-control" /></div>
                                    </div>
                                
                                   
                                </div>
                          

                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
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
        vehicules: state.vehicules.items,
        tiers: state.tiers.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule
    }
  }

export default connect(mapStateToProps)(AjouterContratAssurance)
