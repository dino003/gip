import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



 class ModifierIntervention extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objetEdit: undefined
        }
      
    }

 
   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    setFieldNature = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setFieldCategorieETLicbelle(this.state.nature_intervention) );
    }

    setFieldCategorieETLicbelle(id){
        const nature = this.props.natures_interventions.find(natu => natu.id == id)
        this.setState({
            libelle_complementaire: nature.nom_intervention,
            categorie: nature.categorie
        })
    }

      verificationFormulaire () {
          if(this.date_debut.value == ''){
              return "La date de début est obligatoire obligatoire !"
          }else if(this.heure_debut.value == ''){
              return "L'heure de début est obligatoire !"
          }else if(this.date_fin_reele.value == ''){
            return "La date de fin est obligatoire !"
          }else if(this.heur_fin.value == ''){
            return "L'heure de fin est obligatoire !"
          }else if(this.tiers.value == ''){
            return "Le tiers est obligatoire !"
        }else if(this.libelle_complementaire.value == '' ){
            return "Le libéllé est obligatoire !"
        } else{
              return null
          }
      }

      enregistrerIntervention = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
              const objetEdit = this.props.interventions.find(inter => inter.id == this.props.match.params.intervention_id)
            axios.post('/api/modifier_vehicule_intervention/' + objetEdit.id, {
               // vehicule: this.props.vehiculeSeleted.id,
                nature_intervention: this.nature_intervention.value,
                categorie: this.categorie.value,
                libelle_complementaire: this.libelle_complementaire.value ,
                tiers: this.tiers.value,
                numero_interne_document: this.numero_interne_document.value,
                date_emission: this.date_emission.value,
                date_fin_prevue: this.date_fin_prevue.value,
                heur_fin: this.heur_fin.value,
                heure_fin_prevue: this.heure_fin_prevue.value,
                kilometrage: this.kilometrage.value,
                date_reception_retour: this.date_reception_retour.value,
                cout_ttc_intervention: this.cout_ttc_intervention.value,
                numero_facture_fournisseur: this.numero_facture_fournisseur.value,
                date: this.date.value,
                date_debut: this.date_debut.value,
                heure_debut: this.heure_debut.value,
                date_fin_reele: this.date_fin_reele.value,
                date_reglement: this.date_reglement.value


            })
            .then(response => { 
               const action = {type: "EDIT_INTERVENTION", value: response.data}
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
        const objetEdit = this.props.interventions.find(inter => inter.id == this.props.match.params.intervention_id)

        if(objetEdit !== undefined){
            return (
                <div className="app-main__inner">
                  
                        <div className="main-card mb-3 card">
                            <div className="card-body">
                                <h5 className="card-title">Gestion des interventions du véhicule
                               
                                {this.props.vehicules.length && 
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/>
                            }                                   
                              </h5>
                                <form className="" onChange={this.setField}  onSubmit={this.enregistrerIntervention}>
                                    <div className="form-row">
                                        <div className="col-md-5">
                                            <div className="position-relative form-group">
                                                <label >Date de debut *</label>
                                                <input name="date_debut"  type="date"
                                                style={inputStyle}
                                                defaultValue={objetEdit.date_debut}
                                                onChange={this.setField}
                                                ref={date_debut => this.date_debut = date_debut}
                                                 className="form-control" />
                                                 </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Heure de début *</label>
                                                <InputMask mask="99:99" maskChar={null} 
                                                style={inputStyle}
                                                defaultValue={objetEdit.heure_debut}
                                                inputRef={heure_debut => this.heure_debut = heure_debut}
                                                className="form-control"
                                                name="heure_debut"
                                                />
                                            </div>
                                        </div>
    
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Kilometrage </label>
                                                <input name="kilometrage"  type="number"
                                                defaultValue={objetEdit.kilometrage}
                                                readOnly
                                                onChange={this.setField}
                                                ref={kilometrage => this.kilometrage = kilometrage}
                                                 className="form-control" />
                                                 </div>
                                        </div>
    
                                      
                                    </div>
    
                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Date de fin (réelle) *</label>
                                                <input name="date_fin_reele"  type="date"
                                                style={inputStyle}
                                                defaultValue={objetEdit.date_fin_reele}
                                                onChange={this.setField}
                                                ref={date_fin_reele => this.date_fin_reele = date_fin_reele}
                                                 className="form-control" />
                                                 </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Heure de fin (réelle) *</label>
                                                <InputMask mask="99:99" maskChar={null} 
                                                style={inputStyle}
                                                defaultValue={objetEdit.heur_fin}
                                                inputRef={heur_fin => this.heur_fin = heur_fin}
                                                className="form-control"
                                                name="heur_fin"
                                                />
                                            </div>
                                        </div>
    
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Date fin prévue </label>
                                                <input name="date_fin_prevue"  type="date"
                                                onChange={this.setField}
                                                defaultValue={objetEdit.date_fin_prevue}
                                                ref={date_fin_prevue => this.date_fin_prevue = date_fin_prevue}
                                                 className="form-control" />
                                                 </div>
                                        </div>
    
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Heure fin prévue</label>
                                                <InputMask mask="99:99" maskChar={null} 
                                                inputRef={heure_fin_prevue => this.heure_fin_prevue = heure_fin_prevue}
                                                className="form-control"
                                                defaultValue={this.heure_fin_prevue}
                                                name="heure_fin_prevue"
                                                />
                                            </div>
                                        </div>
                                      
                                    </div>
    
                                    <div className="form-row">
                                            <div className="col-md-3">
                                        <label  className="">Nature intervention</label>
                                            <select name="nature_intervention" onChange={this.setFieldNature}
                                                ref={nature_intervention => this.nature_intervention = nature_intervention}
                                                defaultValue={objetEdit.nature_intervention ? objetEdit.nature_intervention.id : null}
                                              className="form-control">
                                            <option defaultValue={null}></option>
    
                                            {this.props.natures_interventions.map(nature => 
                                                    <option key={nature.id} value={nature.id}>{nature.nom_intervention}</option>
    
                                                    )}
                                            </select>
                                    
                                            </div>
                                       
                                            <div className="col-md-3">
                                                <label >Catégorie</label>
    
                                                <input name="categorie"
                                                ref={categorie => this.categorie = categorie}
                                                 defaultValue={objetEdit.categorie}
                                                  type="text" className="form-control" />
                                            </div>
    
                                            <div className="col-md-3">
                                                <label >Libéllé complémentaire</label>
    
                                                <input name="libelle_complementaire"
                                                    style={inputStyle}
                                                    onChange={this.setField}
                                                    defaultValue={objetEdit.libelle_complementaire }
                                                ref={libelle_complementaire => this.libelle_complementaire = libelle_complementaire}
                                                  type="text" className="form-control" />
                                            </div>
    
                                            <div className="col-md-3">
                                             <label  className="">Tiers</label>
                                            <select name="tiers" onChange={this.setField}
                                            defaultValue={objetEdit.tiers ? objetEdit.tiers.id : null}
                                                ref={tiers => this.tiers = tiers}
                                                style={inputStyle}
    
                                              className="form-control">
                                            <option defaultValue={null}></option>
    
                                            {this.props.tiers.map(tier => 
                                                    <option key={tier.id} value={tier.id}>{tier.code} </option>
    
                                                    )}
                                            </select>
                                    
                                            </div>
                                        </div>
                                     
    
                                        <div className="form-row">
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label >N° interne document ordre de travaux</label>
                                                <input name="numero_interne_document"  type="text"
                                                onChange={this.setField}
                                                defaultValue={objetEdit.numero_interne_document}
                                                ref={numero_interne_document => this.numero_interne_document = numero_interne_document}
                                                 className="form-control" /></div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label >Date émission</label>
                                                <input name="date_emission"
                                                onChange={this.setField}
                                                ref={date_emission => this.date_emission = date_emission}
                                                defaultValue={objetEdit.date_emission}
                                                 type="date" className="form-control" />
                                            </div>
                                        </div>
    
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label >Date de réception en retour</label>
                                                <input name="date_reception_retour"
                                                onChange={this.setField}
                                                ref={date_reception_retour => this.date_reception_retour = date_reception_retour}
                                                defaultValue={objetEdit.date_reception_retour}
                                                 type="date" className="form-control" />
                                            </div>
                                        </div>
                                       
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Coût TTC de l'intervention</label>
                                                <input name="cout_ttc_intervention"  type="number"
                                                defaultValue={objetEdit.cout_ttc_intervention}
                                                ref={cout_ttc_intervention => this.cout_ttc_intervention = cout_ttc_intervention}
                                                 className="form-control" />
                                                 </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Numero facture fournisseur</label>
    
                                                <input name="numero_facture_fournisseur"
                                                ref={numero_facture_fournisseur => this.numero_facture_fournisseur = numero_facture_fournisseur}
                                                defaultValue={objetEdit.numero_facture_fournisseur}
                                                  type="text" className="form-control" /></div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Date</label>
                                                <input name="date"
                                                ref={date => this.date = date}
                                                defaultValue={objetEdit.date}
                                                 type="date" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                        <div className="position-relative form-group">
                                                <label >Réglée le</label>
                                                <input name="date_reglement"
                                                ref={date_reglement => this.date_reglement = date_reglement}
                                                defaultValue={objetEdit.date_reglement}
                                                 type="date" className="form-control" />
                                            </div>
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
        }else{
            return ( <span style={{textAlign: 'center'}}>

            <Loader
               
                height={500}
                width={300}
             />
             </span>)
        }

      
    }
}

const mapStateToProps = state => {
    return {
        natures_interventions: state.natures_interventions.items,
        tiers: state.tiers.items,
        vehicules: state.vehicules.items,

        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        interventions: state.interventions.items,

    }
  }

export default connect(mapStateToProps)(ModifierIntervention)
