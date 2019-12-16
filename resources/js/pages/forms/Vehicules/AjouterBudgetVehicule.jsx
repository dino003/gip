import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';
import InputMask from 'react-input-mask';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'



 class AjouterBudgetVehicule extends Component {
    constructor(props) {
        super(props);
        this.state = {}
      
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
        }, () => this.setFieldImputationInterne(this.state.nature_ligne_budget));
    }

    setFieldImputationInterne(id){
        const nature_depense = this.props.natures_depense_recettes.find(nature => nature.id == id)
        
        this.imputation_interne.value = nature_depense.code
    }

    setFieldDepense = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setFieldResteEtPourcentageDepense(this.state.depense_budget, this.state.depense_realisation) );
    }

    setFieldRecette = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setFieldResteEtPourcentageRecette(this.state.recette_budget, this.state.recette_realisation) );
    }

    setFieldResteEtPourcentageDepense(total, partiel){
        var reste = total - partiel
        var resParse = parseFloat(reste)

        if(isNaN(resParse)){
            this.depense_reste.value = 0;

        }else{
            this.depense_reste.value = resParse;

        }

        let pourcentage = (partiel * 100) / total;
        let pour = parseFloat(pourcentage).toFixed(2)
        if(isNaN(pour)){
            this.depense_pourcentage.value = 0

        }else{
            this.depense_pourcentage.value = pour

        }
        
    }

    setFieldResteEtPourcentageRecette(total, partiel){
        var reste = total - partiel
        var resParse = parseFloat(reste)

        if(isNaN(resParse)){
            this.recette_reste.value = 0;

        }else{
            this.recette_reste.value = resParse;

        }

        let pourcentage = (partiel * 100) / total;

        let pour = parseFloat(pourcentage).toFixed(2)

        if(isNaN(pour)){
            this.recette_pourcentage.value = 0

        }else{
            this.recette_pourcentage.value = pour

        }
        
        
    }


      verificationFormulaire () {
          if(this.nature_ligne_budget.value == ''){
              return "La nature de la ligne Budget est obligatoire !"
          } else{
              return null
          }
      }

      enregistrerIntervention = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/ajouter_vehicule_budget_vehicule', {
                annee_budgetaire: 1,
                vehicule: this.props.vehiculeSeleted.id,
                entite_vehicule: this.entite_vehicule.value,
                nature_ligne_budget: this.nature_ligne_budget.value,
                imputation_interne: this.imputation_interne.value ,
                depense_budget: this.depense_budget.value,
                depense_realisation: this.depense_realisation.value,
                depense_pourcentage: this.depense_pourcentage.value,
                depense_reste: this.depense_reste.value,
                recette_budget: this.recette_budget.value,
                recette_realisation: this.recette_realisation.value,
                recette_pourcentage: this.recette_pourcentage.value,
                recette_reste: this.recette_reste.value,
                

            })
            .then(response => { 
               const action = {type: "ADD_BUDGET_VEHICULE", value: response.data}
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
                            <h5 className="card-title">Gestion des budgets du véhicule
                           
                            {this.props.vehicules.length && 
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/>
                            }                               
                          </h5>
                          <br />
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerIntervention}>
                                <div className="form-row">

                                <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Entité </label>
                                            <input name="entite_vehicule"  type="text"
                                            onChange={this.setField}
                                            readOnly
                                            defaultValue={this.props.vehiculeSeleted.entite_physique.entite}
                                            ref={entite_vehicule => this.entite_vehicule = entite_vehicule}
                                             className="form-control" />
                                             </div>
                                    </div>

                                        <div className="col-md-4">
                                         <label  className="">Nature de la ligne Budget</label>
                                        <select name="nature_ligne_budget"
                                         onChange={this.setFieldNatureDepenseRecette}
                                            ref={nature_ligne_budget => this.nature_ligne_budget = nature_ligne_budget}
                                            style={inputStyle}

                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.natures_depense_recettes.map(nat => 
                                                <option key={nat.id} value={nat.id}> {nat.nature_depense_recette} </option>

                                                )}
                                        </select>
                                
                                        </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Imputation interne </label>
                                            <input name="imputation_interne"  type="text"
                                            readOnly
                                            ref={imputation_interne => this.imputation_interne = imputation_interne}
                                             className="form-control" />
                                             </div>
                                    </div>
                                

                                  
                                </div>

                    
                                <div className="form-row">
                                    
                                   
                                        <div className="col-md-2">
                                            <label >Dépenses</label>

                                        </div>

                                        <div className="col-md-3">
                                            <label >Budget</label>

                                            <input name="depense_budget"
                                                onChange={this.setFieldDepense}
                                                defaultValue={0}
                                            ref={depense_budget => this.depense_budget = depense_budget}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                            <label >Réalisation</label>

                                            <input name="depense_realisation"
                                                onChange={this.setFieldDepense}
                                                defaultValue={0}

                                            ref={depense_realisation => this.depense_realisation = depense_realisation}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-1">
                                            <label >%</label>

                                            <input name="depense_pourcentage"
                                            readOnly
                                            defaultValue={0}

                                            ref={depense_pourcentage => this.depense_pourcentage = depense_pourcentage}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-2">
                                            <label >Reste</label>

                                            <input name="depense_reste"
                                                defaultValue={0}

                                            readOnly
                                            ref={depense_reste => this.depense_reste = depense_reste}
                                              type="text" className="form-control" />
                                        </div>

                                      
                                    </div>

                                    <div className="form-row">
                                    
                                   
                                    <div className="col-md-2">
                                        <label >Recettes</label>

                                    </div>

                                    <div className="col-md-3">
                                        <label >Budget</label>

                                        <input name="recette_budget"
                                                defaultValue={0}

                                            onChange={this.setFieldRecette}
                                        ref={recette_budget => this.recette_budget = recette_budget}
                                          type="text" className="form-control" />
                                    </div>

                                    <div className="col-md-3">
                                        <label >Réalisation</label>

                                        <input name="recette_realisation"
                                                defaultValue={0}
                                            onChange={this.setFieldRecette}
                                        ref={recette_realisation => this.recette_realisation = recette_realisation}
                                          type="text" className="form-control" />
                                    </div>

                                    <div className="col-md-1">
                                        <label >%</label>

                                        <input name="recette_pourcentage"
                                             defaultValue={0}

                                            readOnly
                                        ref={recette_pourcentage => this.recette_pourcentage = recette_pourcentage}
                                          type="text" className="form-control" />
                                    </div>

                                    <div className="col-md-2">
                                        <label >Reste</label>

                                        <input name="recette_reste"
                                            readOnly
                                            defaultValue={0}
                                        ref={recette_reste => this.recette_reste = recette_reste}
                                          type="text" className="form-control" />
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
        natures_depense_recettes: state.natures_depense_recettes.items,
        vehicules: state.vehicules.items,

        vehiculeSeleted: state.vehiculeSeleted.vehicule,
    }
  }

export default connect(mapStateToProps)(AjouterBudgetVehicule)
