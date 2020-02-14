import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';
import InputMask from 'react-input-mask';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { colourStyles } from '../../../utils/Repository';
import Select from 'react-select';


 class ModifierBudgetVehicule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objetEdit: undefined
        }
    }

    // componentDidMount(){

    //      if(this.props.vehiculeSeleted == undefined){
    //       const action = {type: "EDIT_SELECTED", value: this.props.location.state.veh}
    //       this.props.dispatch(action)

    //      }

    //      this.setState({
    //         objetEdit: this.props.budgetVehicules.find(bud => bud.id == this.props.match.params.budgetVehicule_id)
    //     })


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
        }, () => this.setFieldResteEtPourcentageDepense(this.depense_budget.value, this.depense_realisation.value) );
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
        var total = Number(total);
        var partiel = Number(partiel);
       // var reste = Number(total) - Number(partiel)
        var resParse = parseInt(total - partiel)

        if(isNaN(resParse) || !isFinite(resParse)){
            this.depense_reste.value = 0;

        }else{
            this.depense_reste.value = resParse;

        }

        let pourcentage = (partiel * 100) / total;
        let pour = parseFloat(pourcentage).toFixed(2);
        if(isNaN(pour) || !isFinite(pour)){
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

        let pour = parseFloat(pourcentage)

        if(isNaN(pour)){
            this.recette_pourcentage.value = 0

        }else{
            this.recette_pourcentage.value = pour

        }


    }


    verificationFormulaire () {
        const objetEdit = this.props.budgetVehicules.find(bud => bud.id == this.props.match.params.budgetVehicule_id)

        if(!this.state.plan_budgetaire_id && !objetEdit.plan_budgetaire_id){
          return "Vous n'avez pas saisi la ligne budgétaire"
        } else if(Number(this.depense_budget.value) <= 0){
          return "Vous n'avez pas saisi le montant"
        } else if(Number(this.depense_budget.value) < Number(this.depense_realisation.value)){
            return "Le Montant saisi ne peut-être validé"
        }else{
            return null
        }
    }

      enregistrerIntervention = (e) => {
       const objetEdit = this.props.budgetVehicules.find(bud => bud.id == this.props.match.params.budgetVehicule_id)

        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/modifier_vehicule_budget_vehicule/' + objetEdit.id, {
                annee_budgetaire: objetEdit.annee_budgetaire.id,
                vehicule: this.props.match.params.vehicule_id,
               // entite_vehicule: this.entite_vehicule.value,
                //nature_ligne_budget: this.nature_ligne_budget.value,
               // imputation_interne: this.imputation_interne.value ,
                depense_budget: this.depense_budget.value,
                depense_realisation: this.depense_realisation.value,
                depense_pourcentage: parseFloat( (Number(this.depense_realisation.value) * 100 ) / Number(this.depense_budget.value)  ).toFixed(2),
                depense_reste: Number(this.depense_budget.value) - Number(this.depense_realisation.value),
               // recette_budget: this.recette_budget.value,
               // recette_realisation: this.recette_realisation.value,
              //  recette_pourcentage: this.recette_pourcentage.value,
               // recette_reste: this.recette_reste.value,


            })
            .then(response => {
               const action = {type: "EDIT_BUDGET_VEHICULE", value: response.data.budget}
                 this.props.dispatch(action)

                 const action2 = {type: "EDIT_VEHICULE", value: response.data.vehicule}
                 this.props.dispatch(action2)

                 axios.get('/api/plan_budgetaires').then((response) => {

                    const action12 = {type: "GET_PLAN_BUDGETAIRE", value: response.data}
                    this.props.dispatch(action12)
                } )

                 const action3 = {type: "EDIT_SELECTED", value: response.data.vehicule}
                 this.props.dispatch(action3)

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

      getNiveauxPlanBudgetaire = () => {
        const events = [];
        this.props.structure_budgetaires.map(event => {
            if(!event.niveau) return;
            return events.push(event.niveau)
        })

        return events
    }

    getMaximumNiveauPlanBudgetaire = () => {
        var niveau = Math.max(...this.getNiveauxPlanBudgetaire(), 0)
        if (niveau == 0) return 1;
        return Number(niveau );

    }

    getStructureBudgetaireDernierNiveau = () => {
        if(!this.getPlanBudgetaireDernierNiveau().length) return undefined;
        else{
            return this.props.structure_budgetaires.find(st => st.niveau == this.getPlanBudgetaireDernierNiveau()[0].structure_budgetaire.niveau)
        }
    }

    getPlanBudgetaireDernierNiveau = () => {
        return this.props.plan_budgetaires.filter(elm => elm.structure_budgetaire ? elm.structure_budgetaire.niveau == this.getMaximumNiveauPlanBudgetaire() : false)
    }

    setFieldSelect(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }


    render() {
      const  objetEdit = this.props.budgetVehicules.find(bud => bud.id == this.props.match.params.budgetVehicule_id)
      const vehiculeSelect = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
      if(objetEdit !== undefined){
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
    {/*
                                    <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Entité </label>
                                                <input name="entite_vehicule"  type="text"
                                                onChange={this.setField}
                                                readOnly
                                                defaultValue={vehiculeSelect.entite_physique ? vehiculeSelect.entite_physique.entite : null}
                                                ref={entite_vehicule => this.entite_vehicule = entite_vehicule}
                                                 className="form-control" />
                                                 </div>
                                        </div> */}

                                       {/*      <div className="col-md-4">
                                             <label  className="">Nature de la ligne Budget</label>
                                            <select name="nature_ligne_budget"
                                             onChange={this.setFieldNatureDepenseRecette}
                                                ref={nature_ligne_budget => this.nature_ligne_budget = nature_ligne_budget}
                                                style={inputStyle}
                                                defaultValue={objetEdit.nature_ligne_budget ? objetEdit.nature_ligne_budget.id : null}
                                              className="form-control">
                                            <option defaultValue={null}></option>

                                            {this.props.natures_depense_recettes.map(nat =>
                                                    <option key={nat.id} value={nat.id}> {nat.nature_depense_recette} </option>

                                                    )}
                                            </select>

                                            </div> */}

                                    {/*     <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label >Imputation interne </label>
                                                <input name="imputation_interne"  type="text"
                                                readOnly
                                                defaultValue={objetEdit.imputation_interne}
                                                ref={imputation_interne => this.imputation_interne = imputation_interne}
                                                 className="form-control" />
                                                 </div>
                                        </div> */}

                        {this.getStructureBudgetaireDernierNiveau() ?
                            <div className="col-md-5">
                                <label className="">{this.getStructureBudgetaireDernierNiveau().libelle}  </label>


                                <Select
                                    name="plan_budgetaire_id"
                                    isDisabled
                                    placeholder={`Sélection de ${this.getStructureBudgetaireDernierNiveau().libelle}`}
                                    noOptionsMessage={() => `Pas de ${this.getStructureBudgetaireDernierNiveau().libelle} pour l'instant`}
                                    options={this.getPlanBudgetaireDernierNiveau()}
                                    getOptionLabel={option => option.libelle}
                                    getOptionValue={option => option.id}
                                    defaultValue={objetEdit.plan_budgetaire || null}
                                   // defaultValue={objetEdit.affectation_geographique ? objetEdit.affectation_geographique : null}

                                    // formatOptionLabel={formatOptionVehicule}
                                    onChange={this.setFieldSelect.bind(this, "plan_budgetaire_id")}
                                    styles={ colourStyles}
                                />

                            </div> :


                            <div className="col-md-5">
                                <label className=""> Structure Budgétaire</label>

                                <input readOnly className="form-control" value="Veuillez creer la structure Budgétaire" />

                            </div>}



                                    </div>


                                    <div className="form-row">


                                            <div className="col-md-2">
                                                <label >Dépenses</label>

                                            </div>

                                            <div className="col-md-3">
                                                <label >Budget</label>

                                                <input name="depense_budget"
                                                    onChange={this.setFieldDepense}
                                                    defaultValue={objetEdit.depense_budget}
                                                    ref={depense_budget => this.depense_budget = depense_budget}
                                                  type="text" className="form-control" />
                                            </div>

                                            <div className="col-md-3">
                                                <label >Réalisation</label>

                                                <input name="depense_realisation"
                                                    defaultValue={objetEdit.depense_realisation}
                                                    readOnly
                                                ref={depense_realisation => this.depense_realisation = depense_realisation}
                                                  type="text" className="form-control" />
                                            </div>

                                            <div className="col-md-1">
                                                <label >%</label>

                                                <input name="depense_pourcentage"
                                                readOnly
                                                defaultValue={objetEdit.depense_pourcentage}

                                                ref={depense_pourcentage => this.depense_pourcentage = depense_pourcentage}
                                                  type="text" className="form-control" />
                                            </div>

                                            <div className="col-md-2">
                                                <label >Reste</label>

                                                <input name="depense_reste"
                                                    defaultValue={objetEdit.depense_reste}

                                                readOnly
                                                ref={depense_reste => this.depense_reste = depense_reste}
                                                  type="text" className="form-control" />
                                            </div>


                                        </div>

                                 {/*        <div className="form-row">


                                        <div className="col-md-2">
                                            <label >Recettes</label>

                                        </div>

                                        <div className="col-md-3">
                                            <label >Budget</label>

                                            <input name="recette_budget"
                                                    defaultValue={objetEdit.recette_budget}

                                                onChange={this.setFieldRecette}
                                            ref={recette_budget => this.recette_budget = recette_budget}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                            <label >Réalisation</label>

                                            <input name="recette_realisation"
                                                    defaultValue={objetEdit.recette_realisation}
                                                onChange={this.setFieldRecette}
                                            ref={recette_realisation => this.recette_realisation = recette_realisation}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-1">
                                            <label >%</label>

                                            <input name="recette_pourcentage"
                                                 defaultValue={objetEdit.recette_pourcentage}

                                                readOnly
                                            ref={recette_pourcentage => this.recette_pourcentage = recette_pourcentage}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-2">
                                            <label >Reste</label>

                                            <input name="recette_reste"
                                                readOnly
                                                defaultValue={objetEdit.recette_reste}
                                            ref={recette_reste => this.recette_reste = recette_reste}
                                              type="text" className="form-control" />
                                        </div>


                                    </div> */}

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

        else{
            return ( <span style={{textAlign: 'center'}}>

            <Loader

                height={100}
                width={100}
             />
             </span>)
        }
    }
}

const mapStateToProps = state => {
    return {
        natures_depense_recettes: state.natures_depense_recettes.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        vehicules: state.vehicules.items,
        structure_budgetaires: state.structure_budgetaires.items,
        plan_budgetaires: state.plan_budgetaires.items,

        budgetVehicules: state.budgetVehicules.items
    }
  }

export default connect(mapStateToProps)(ModifierBudgetVehicule)
