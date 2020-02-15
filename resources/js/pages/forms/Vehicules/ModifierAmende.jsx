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

import Select from 'react-select'
import { colourStyles, formatageSomme, calculSommeColonneSommeIntervention, calculSommeColonneSommeAmende, calculSommeColonneSommeConso } from '../../../utils/Repository'

 class ModifierAmende extends Component {
    constructor(props) {
        super(props);
        this.state = {
           // vehicule_en_fouriere: false,
            objetEdit: undefined

        }



    }

    setFieldSelect(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }

    // componentDidMount(){

    //      if(this.props.vehiculeSeleted == undefined){
    //       const action = {type: "EDIT_SELECTED", value: this.props.location.state.veh}
    //       this.props.dispatch(action)

    //      }

    //      this.setState({
    //         objetEdit: this.props.amendes.find(amende => amende.id == this.props.match.params.amende_id)
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


      verificationFormulaire () {
        const objetEdit = this.props.amendes.find(amende => amende.id == this.props.match.params.amende_id)
        const plan = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id : objetEdit.plan_budgetaire ? objetEdit.plan_budgetaire : null
        const budget_du_plan_selectionne_et_du_vehicule = plan ? plan.budget.find(bud => bud.vehicule.id == this.props.match.params.vehicule_id) : null
        const {param_vehicule} = this.props

        if(param_vehicule && param_vehicule.depense_impute_sur_budget && !this.state.plan_budgetaire_id && !objetEdit.plan_budgetaire_id){
          return "Vous n'avez pas saisi la ligne d'imputation budgétaire"
        }else if(this.date.value == ''){
              return "La date est obligatoire obligatoire !"
          }else if(this.nature_amende.value == ''){
              return "La nature de l\'amende est obligatoire !"
          }else if(this.conducteur.value == ''){
            return "Le conducteur  est obligatoire !"
          }else if(!this.state.lieu && !objetEdit.lieu_id){
            return "Vous n'avez pas saisi le lieu !"
          }else if(this.organisme.value == ''){
            return "L\'organisme de réglement est obligatoire !"
          }else if(this.montant_amende.value == ''){
            return "Vous n'avez pas saisi le montant de l'amende !"
          }else if(param_vehicule && param_vehicule.depense_impute_sur_budget && Number(this.montant_amende.value) > Number(budget_du_plan_selectionne_et_du_vehicule.depense_reste)){
            return `Il n'y a pas assez de fonds sur la ligne ${plan.libelle} pour couvrir cette dépense
            Fonds disponible: ${formatageSomme(budget_du_plan_selectionne_et_du_vehicule.depense_reste)}`
          } else{
              return null
          }
      }

      miseAJourDotationBudgetaire(){
        const objetEdit = this.props.amendes.find(conso => conso.id == this.props.match.params.amende_id)

        var id = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.id : objetEdit.plan_budgetaire_id
      let somme_total_interventions = calculSommeColonneSommeIntervention(this.props.interventions.filter(elm => elm.plan_budgetaire_id == id))
      let somme_total_amendes = calculSommeColonneSommeAmende(this.props.amendes.filter(elm => elm.plan_budgetaire_id == id))
      let somme_total_consos = calculSommeColonneSommeConso(this.props.consommations.filter(elm => elm.plan_budgetaire_id == id))

      return Number(somme_total_amendes + somme_total_consos + somme_total_interventions);
  }

      enregistrerIntervention = (e) => {
          const objetEdit = this.props.amendes.find(amende => amende.id == this.props.match.params.amende_id)
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/modifier_vehicule_amende/' + objetEdit.id, {
               // vehicule: this.props.vehiculeSeleted.id,
                date: this.date.value,
                plan_budgetaire_id: this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.id : objetEdit.plan_budgetaire_id,

                date_reception: this.date_reception.value ,
                heure: this.heure.value,
                nature_amende: this.nature_amende.value,
                lieu: this.state.lieu ? this.state.lieu.id : objetEdit.lieu_id,
                conducteur: this.conducteur.value,
                regle_par_conducteur_ou_etablissement: this.regle_par_conducteur_ou_etablissement.value,
                date_reglement: this.date_reglement.value,
                montant_amende: this.montant_amende.value,
                vehicule_en_fouriere: this.vehicule_en_fouriere.checked,
                montant_mise_en_fouriere: this.montant_mise_en_fouriere.value,
                organisme: this.organisme.value,


            })
            .then(response => {
               const action = {type: "EDIT_AMENDE", value: response.data}
                 this.props.dispatch(action)


                 if(this.props.param_vehicule && this.props.param_vehicule.depense_impute_sur_budget) {
                    var plan_id = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.id : objetEdit.plan_budgetaire_id
                   var budget = this.props.budgetVehicules.find(elm => elm.plan_budgetaire_id == plan_id)

                   var pourcentage =  (this.miseAJourDotationBudgetaire() * 100 ) /  Number(budget.depense_budget)
                   var reste = Number(budget.depense_budget) - this.miseAJourDotationBudgetaire()
                  axios.post('/api/modifier_vehicule_budget_vehicule/' + budget.id, {
                       depense_realisation: this.miseAJourDotationBudgetaire(),
                       depense_pourcentage: parseFloat(pourcentage).toFixed(2),
                       depense_reste: reste

                   }).then(response => {
                       const action4 = {type: "EDIT_BUDGET_VEHICULE", value: response.data.budget}
                         this.props.dispatch(action4)

                         const action2 = {type: "EDIT_VEHICULE", value: response.data.vehicule}
                         this.props.dispatch(action2)

                         const action3 = {type: "EDIT_SELECTED", value: response.data.vehicule}
                         this.props.dispatch(action3)

                         axios.get('/api/plan_budgetaires').then((response) => {

                           const action42 = {type: "GET_PLAN_BUDGETAIRE", value: response.data}
                           this.props.dispatch(action42)
                       } )

                       axios.get('/api/interventions').then((response) => {

                        const action42 = {type: "GET_INTERVENTION", value: response.data}
                        this.props.dispatch(action42)
                    } )


                    axios.get('/api/consommations').then((response) => {

                        const action42 = {type: "GET_CONSOMMATION", value: response.data}
                        this.props.dispatch(action42)
                    } )


                    axios.get('/api/amendes').then((response) => {

                        const action42 = {type: "GET_AMENDE", value: response.data}
                        this.props.dispatch(action42)
                    } )

                    }).catch(error => console.log(error))
               }

               this.props.history.goBack();


            }).catch(error => console.log(error))


          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }

        // console.log(this.vehicule_en_fouriere.value)
        // console.log(this.state.vehicule_en_fouriere)

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
        const vehicule_courant = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
        var tab = vehicule_courant.budgets.map(bud => bud.plan_budgetaire_id)

        return this.props.plan_budgetaires.filter(elm => {
            return (elm.structure_budgetaire ? elm.structure_budgetaire.niveau == this.getMaximumNiveauPlanBudgetaire() : false)
            &&
            (vehicule_courant.budgets.length ? tab.indexOf(elm.id) != -1 : false)
        })
    }



    render() {
        const objetEdit = this.props.amendes.find(amende => amende.id == this.props.match.params.amende_id)
        const {param_vehicule} = this.props

        const plan = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id : objetEdit.plan_budgetaire ? objetEdit.plan_budgetaire : null
        const budget_du_plan_selectionne_et_du_vehicule = plan ? plan.budget.find(bud => bud.vehicule.id == this.props.match.params.vehicule_id) : null


       if(objetEdit !== undefined){
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

                            {param_vehicule && param_vehicule.depense_impute_sur_budget ?
                             <div className="form-row">

                                {this.getStructureBudgetaireDernierNiveau() ?
                            <div className="col-md-5">
                                <label className="">{this.getStructureBudgetaireDernierNiveau().libelle}  </label>


                                <Select
                                    name="plan_budgetaire_id"
                                    isDisabled={!this.getStructureBudgetaireDernierNiveau()}
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

                                <input readOnly className="form-control" value="Ce Véhicule n'a pas de dotation Budgétaire" />

                            </div>}

                            {budget_du_plan_selectionne_et_du_vehicule ? <React.Fragment>

                            <div className="col-md-3">
                            <label className="" htmlFor="">Dotation disponible</label>

                                { budget_du_plan_selectionne_et_du_vehicule ? <input readOnly className="form-control" value={ formatageSomme(budget_du_plan_selectionne_et_du_vehicule.depense_reste) } /> : null}
                            </div>
                                </React.Fragment> : null}
                         </div> : null }

                                <div className="form-row">

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date *</label>
                                            <input name="date"  type="date"
                                            style={inputStyle}
                                            defaultValue={objetEdit.date}
                                            onChange={this.setField}
                                            ref={date => this.date = date}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Heure </label>
                                            <InputMask mask="99:99" maskChar={null}
                                            defaultValue={objetEdit.heure}
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
                                            defaultValue={objetEdit.date_reception}
                                            onChange={this.setField}
                                            ref={date_reception => this.date_reception = date_reception}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-4">
                                    <label  className="">Nature de l'amende</label>
                                        <select name="nature_amende" onChange={this.setField}
                                            defaultValue={objetEdit.nature_amende ?  objetEdit.nature_amende.id : null}
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
                                                  defaultValue={objetEdit.lieu_amende ? objetEdit.lieu_amende : null}
                                                  styles={colourStyles}
                                                  onChange={this.setFieldSelectDepartEtDestination.bind(this, "lieu")}
                                              />

                                          </div>

                                        <div className="col-md-3">
                                    <label  className="">Conducteur</label>
                                        <select name="conducteur"
                                        defaultValue={objetEdit.nature_amende ? objetEdit.nature_amende.id : null}
                                            ref={conducteur => this.conducteur = conducteur}

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
                                        defaultValue={objetEdit.regle_par_conducteur_ou_etablissement}
                                            ref={regle_par_conducteur_ou_etablissement => this.regle_par_conducteur_ou_etablissement = regle_par_conducteur_ou_etablissement}

                                          className="form-control">
                                    <option value="Conducteur"> le Conducteur</option>
                                    <option value="Etablissement">l'établissement</option>


                                        </select>

                                        </div>

                                        <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de réglement </label>
                                            <input name="date_reglement"  type="date"
                                            defaultValue={objetEdit.date_reglement}
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
                                            defaultValue={objetEdit.montant_amende}
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
                                             ref={vehicule_en_fouriere => this.vehicule_en_fouriere = vehicule_en_fouriere}
                                               onChange={this.setField}
                                                defaultChecked={objetEdit.vehicule_en_fouriere}
                                                 name="vehicule_en_fouriere" className="form-control" />
                                        </div>
                                    </div>


                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant mis en fourière </label>
                                            <input name="montant_mise_en_fouriere"
                                            defaultValue={objetEdit.montant_mise_en_fouriere}
                                            onChange={this.setField}
                                            ref={montant_mise_en_fouriere => this.montant_mise_en_fouriere = montant_mise_en_fouriere}

                                             type="number" className="form-control" />
                                        </div>
                                    </div>


                                    <div className="col-md-3">
                                    <label  className="">Organisme de réglement</label>
                                        <select name="organisme"
                                            ref={organisme => this.organisme = organisme}
                                            defaultValue={objetEdit.organisme ? objetEdit.organisme.id : null}
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
        natures_amendes: state.natures_amendes.items,
        tiers: state.tiers.items,
        vehicules: state.vehicules.items,

        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        personnels: state.personnels.items,
        amendes: state.amendes.items,
        plan_geographiques: state.plan_geographiques.items,
        structure_geographiques: state.structure_geographiques.items,
        param_vehicule: state.param_vehicule.items,
        plan_budgetaires: state.plan_budgetaires.items,
        structure_budgetaires: state.structure_budgetaires.items,
        interventions: state.interventions.items,
        consommations: state.consommations.items,
        budgetVehicules: state.budgetVehicules.items,

    }
  }

export default connect(mapStateToProps)(ModifierAmende)
