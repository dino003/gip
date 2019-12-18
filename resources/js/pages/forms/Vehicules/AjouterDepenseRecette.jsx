import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';
import InputMask from 'react-input-mask';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'
import year from '../../../utils/Year'


 class AjouterDepenseRecette extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    setFieldNatureDepenseRecette = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setFieldImputationInterne(this.nature.value));
    }

    setFieldMontantHt = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setFieldTvaEtTaux(this.montant_ht.value, this.taux_tva.value));
    }

    setFieldImputationInterne(id){
        const nature_depense = this.props.natures_depense_recettes.find(nature => nature.id == id)
        
        this.imputation_interne.value = nature_depense.code
    }


    setFieldTvaEtTaux(total, taux){

        var tva = (total * taux) / 100;
        var tvaParse = parseFloat(tva).toFixed(2);

        var mttc = parseFloat(total) + parseFloat(tva)
        var mttcParse = parseFloat(mttc).toFixed(2);


        if(isNaN(tvaParse)){
            this.tva.value = 0;
            this.montant_ttc.value = 0;
        }else{
            this.tva.value = tvaParse;
            this.montant_ttc.value = mttcParse;

        }
        
        
    }


      verificationFormulaire () {
          if(this.nature.value == ''){
              return "La nature de la ligne Budget est obligatoire !"
          }else if(this.annee_budgetaire.value == ''){
            return "L'année budgétaire est obligatoire !"
        }else if(this.montant_ht.value == ''){
            return "Le montant Hors taxes est obligatoire !"
        }else if(this.tiers.value == ''){
            return "Le tiers est obligatoire !"
        } else{
              return null
          }
      }

      enregistrerIntervention = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
              this.setState({isFormSubmitted: true})
            axios.post('/api/ajouter_vehicule_depense_recette', {
                annee_budgetaire: this.annee_budgetaire.value,
                vehicule: this.props.vehiculeSeleted.id,
                depense_ou_recette: this.depense_ou_recette.value,
                date: this.date.value,
                nature: this.nature.value ,
                tiers: this.tiers.value,
                imputation_interne: this.imputation_interne.value,
                montant_ht: this.montant_ht.value,
                tva: this.tva.value,
                taux_tva: this.taux_tva.value,
                montant_ttc: this.montant_ttc.value,
                numero_piece: this.numero_piece.value,
                date_piece: this.date_piece.value,
                libelle: this.libelle.value,


            })
            .then(response => { 
               const action = {type: "ADD_DR", value: response.data}
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
    

    render() {
        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Gestion des budgets du véhicule
                           
                            {this.props.vehicules.length && 
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/>
                            }                               
                          </h5>
                          <br />
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerIntervention}>
                                <div className="form-row">

                                <div className="col-md-3">
                                         <label  className="">Dépense / Recette ?</label>
                                        <select name="depense_ou_recette"
                                         onChange={this.setField}
                                            ref={depense_ou_recette => this.depense_ou_recette = depense_ou_recette}
                                            style={inputStyle}

                                          className="form-control">
                                             <option value="Dépense">Dépense</option>
                                                 <option value="Recette">Recette</option>
                                        </select>
                                
                                        </div>

                                        <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Date </label>
                                            <input name="date"  type="date"
                                            defaultValue={today}
                                            style={inputStyle}
                                            ref={date => this.date = date}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Année budgétaire </label>
                                            <input name="annee_budgetaire"  type="number"
                                            defaultValue={year}
                                            style={inputStyle}
                                            ref={annee_budgetaire => this.annee_budgetaire = annee_budgetaire}
                                             className="form-control" />
                                             </div>
                                    </div>

                                   
                                </div>

                    
                                <div className="form-row">

                                <div className="col-md-4">
                                         <label  className="">Nature</label>
                                        <select name="nature"
                                         onChange={this.setFieldNatureDepenseRecette}
                                            ref={nature => this.nature = nature}
                                            style={inputStyle}

                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.natures_depense_recettes.map(nat => 
                                                <option key={nat.id} value={nat.id}> {nat.nature_depense_recette} </option>

                                                )}
                                        </select>
                                
                                        </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Imputation interne </label>
                                            <input name="imputation_interne"  type="text"
                                            readOnly
                                            ref={imputation_interne => this.imputation_interne = imputation_interne}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                         <label  className="">Tiers</label>
                                        <select name="tiers"
                                         onChange={this.setField}
                                            ref={tiers => this.tiers = tiers}
                                            style={inputStyle}

                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.tiers.map(tier => 
                                                <option key={tier.id} value={tier.id}> {tier.code} </option>

                                                )}
                                        </select>
                                
                                        </div>
                                     
                                    </div>

                                    <div className="form-row">

                                    <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label >Montant HT </label>
                                                    <input name="montant_ht"  type="number"
                                                    onChange={this.setFieldMontantHt}
                                                    ref={montant_ht => this.montant_ht = montant_ht}
                                                    className="form-control" />
                                                    </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Taux de TVA %</label>
                                                    
                                                {this.props.tva.length ?  <input name="taux_tva"  type="number"
                                                    onChange={this.setFieldMontantHt}
                                                    defaultValue={ this.props.tva.find(tva => tva.defaut).taux || 18}
                                                ref={taux_tva => this.taux_tva = taux_tva}
                                                className="form-control" /> :  <input name="taux_tva"  type="number"
                                                onChange={this.setFieldMontantHt}
                                                ref={taux_tva => this.taux_tva = taux_tva}
                                                className="form-control" />}
                                                    </div>
                                            </div>
                                                
                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >TVA </label>
                                                    <input name="tva"  type="number"
                                                    readOnly
                                                    ref={tva => this.tva = tva}
                                                    className="form-control" />
                                                    </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >T T C </label>
                                                    <input name="montant_ttc"  type="number"
                                                    readOnly
                                                    ref={montant_ttc => this.montant_ttc = montant_ttc}
                                                    className="form-control" />
                                                    </div>
                                            </div>

                                            </div>

                                            <div className="form-row">

                                            <div className="col-md-4">
                                                        <div className="position-relative form-group">
                                                            <label >N° de Pièce </label>
                                                            <input name="numero_piece"  type="text"
                                                            
                                                            ref={numero_piece => this.numero_piece = numero_piece}
                                                            className="form-control" />
                                                            </div>
                                                    </div>

                                         

                                                    <div className="col-md-3">
                                                        <div className="position-relative form-group">
                                                            <label >Date Pièce </label>
                                                            <input name="date_piece"  type="date"
                                                            
                                                            ref={date_piece => this.date_piece = date_piece}
                                                            className="form-control" />
                                                            </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="position-relative form-group">
                                                            <label >Libéllé </label>
                                                            <input name="libelle"  type="text"
                                                            
                                                            ref={libelle => this.libelle = libelle}
                                                            className="form-control" />
                                                            </div>
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
        natures_depense_recettes: state.natures_depense_recettes.items,
        vehicules: state.vehicules.items,
        tva: state.tva.items,

        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        tiers: state.tiers.items
    }
  }

export default connect(mapStateToProps)(AjouterDepenseRecette)
