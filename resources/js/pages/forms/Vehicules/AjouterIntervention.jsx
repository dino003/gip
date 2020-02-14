import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'
import Select from 'react-select';
import { colourStyles, formatageSomme, calculSommeColonneSommeIntervention, calculSommeColonneSommeAmende, calculSommeColonneSommeConso } from '../../../utils/Repository';



 class AjouterIntervention extends Component {
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

    setFieldSelect(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj);
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
        const budget_du_plan_selectionne_et_du_vehicule = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.budget.find(bud => bud.vehicule.id == this.props.match.params.vehicule_id) : null
        const {param_vehicule} = this.props
        if(param_vehicule && param_vehicule.depense_impute_sur_budget && !this.state.plan_budgetaire_id){
          return "Vous n'avez pas saisi la ligne d'imputation budgétaire"
        }else if(this.date_debut.value == ''){
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
        }else if(this.cout_ttc_intervention.value == '' ){
            return "Vous n'avez pas saisi le coût de l'intervention !"
        }else if(param_vehicule && param_vehicule.depense_impute_sur_budget && Number(this.cout_ttc_intervention.value) > Number(budget_du_plan_selectionne_et_du_vehicule.depense_reste)){
            return `Il n'y a pas assez de fonds sur la ligne ${this.state.plan_budgetaire_id.libelle} pour couvrir cette dépense
            Fonds disponible: ${formatageSomme(budget_du_plan_selectionne_et_du_vehicule.depense_reste)}`
          } else{
              return null
          }
      }

      miseAJourDotationBudgetaire(){
        var id = this.state.plan_budgetaire_id.id
      let somme_total_interventions = calculSommeColonneSommeIntervention(this.props.interventions.filter(elm => elm.plan_budgetaire_id == id))
      let somme_total_amendes = calculSommeColonneSommeAmende(this.props.amendes.filter(elm => elm.plan_budgetaire_id == id))
      let somme_total_consos = calculSommeColonneSommeConso(this.props.consommations.filter(elm => elm.plan_budgetaire_id == id))

      return Number(somme_total_amendes + somme_total_consos + somme_total_interventions);
  }

      enregistrerIntervention = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            const vehiculeSelect = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)

              this.setState({isFormSubmitted : true})
            axios.post('/api/ajouter_vehicule_intervention', {
                vehicule: vehiculeSelect.id,
                vehicule_id: vehiculeSelect.id,
                plan_budgetaire_id: this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.id : null,

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
               const action = {type: "ADD_INTERVENTION", value: response.data}
                 this.props.dispatch(action)

                 if(this.props.param_vehicule && this.props.param_vehicule.depense_impute_sur_budget) {
                    var budget = this.props.budgetVehicules.find(elm => elm.plan_budgetaire_id == this.state.plan_budgetaire_id.id)
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

                this.setState({isFormSubmitted : false})
               this.props.history.goBack();


            }).catch(error => {
                this.setState({isFormSubmitted : false})
                 console.log(error) } )


          }else{
              //console.log(this.verificationFormulaire())
              /* toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              }); */
              window.alert( this.verificationFormulaire() );

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
        const vehicule_courant = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
        return this.props.plan_budgetaires.filter(elm => {
            return (elm.structure_budgetaire ? elm.structure_budgetaire.niveau == this.getMaximumNiveauPlanBudgetaire() : false)
            &&
            (elm.budget.length ? elm.budget.filter(bud => bud.vehicule ? bud.vehicule.id == vehicule_courant.id : false) : false)
        })
    }


    render() {
        if(this.props.vehiculeSeleted == undefined && this.props.vehicules.length){
            const action = {type: "EDIT_SELECTED", value:  this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}
              this.props.dispatch(action)
            }

        const vehiculeSelect = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
        const {param_vehicule} = this.props
        const budget_du_plan_selectionne_et_du_vehicule = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.budget.find(bud => bud.vehicule.id == this.props.match.params.vehicule_id) : null

        return (
            <div className="app-main__inner">

                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Gestion des interventions du véhicule

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
                                    placeholder={`Sélection  ${this.getStructureBudgetaireDernierNiveau().libelle}`}
                                    noOptionsMessage={() => `Pas de ${this.getStructureBudgetaireDernierNiveau().libelle} pour l'instant`}
                                    options={this.getPlanBudgetaireDernierNiveau()}
                                    getOptionLabel={option => option.libelle}
                                    getOptionValue={option => option.id}
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

                            {budget_du_plan_selectionne_et_du_vehicule ? <React.Fragment>

                                <div className="col-md-3">
                                <label className="" htmlFor="">Dotation disponible</label>

                                    { budget_du_plan_selectionne_et_du_vehicule ? <input readOnly className="form-control" value={ formatageSomme(budget_du_plan_selectionne_et_du_vehicule.depense_reste) } /> : null}
                                </div>
                                    </React.Fragment> : null}
                         </div> : null }

                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Date de debut *</label>
                                            <input name="date_debut"  type="date"
                                            style={inputStyle}
                                            defaultValue={today}
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
                                            defaultValue="08:00"
                                            inputRef={heure_debut => this.heure_debut = heure_debut}
                                            className="form-control"
                                            name="heure_debut"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Kilometrage </label>
                                            {vehiculeSelect &&  <input name="kilometrage"  type="number"
                                            readOnly
                                            defaultValue={vehiculeSelect.kilometrage_acquisition}
                                            ref={kilometrage => this.kilometrage = kilometrage}
                                             className="form-control" /> }

                                             </div>
                                    </div>


                                </div>

                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de fin (réelle) *</label>
                                            <input name="date_fin_reele"  type="date"
                                            style={inputStyle}
                                            defaultValue={today}
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
                                            defaultValue="18:00"
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
                                             readOnly
                                             defaultValue={this.state.categorie}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                            <label >Libéllé complémentaire</label>

                                            <input name="libelle_complementaire"
                                                style={inputStyle}
                                                onChange={this.setField}
                                                defaultValue={this.state.libelle_complementaire }
                                            ref={libelle_complementaire => this.libelle_complementaire = libelle_complementaire}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Tiers</label>
                                        <select name="tiers" onChange={this.setField}
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
                                            ref={numero_interne_document => this.numero_interne_document = numero_interne_document}
                                             className="form-control" /></div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Date émission</label>
                                            <input name="date_emission"
                                            onChange={this.setField}
                                            ref={date_emission => this.date_emission = date_emission}

                                             type="date" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Date de réception en retour</label>
                                            <input name="date_reception_retour"
                                            onChange={this.setField}
                                            ref={date_reception_retour => this.date_reception_retour = date_reception_retour}

                                             type="date" className="form-control" />
                                        </div>
                                    </div>

                                </div>
                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Coût TTC de l'intervention</label>
                                            <input name="cout_ttc_intervention"  type="number"
                                            ref={cout_ttc_intervention => this.cout_ttc_intervention = cout_ttc_intervention}
                                             className="form-control" />
                                             </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Numero facture fournisseur</label>

                                            <input name="numero_facture_fournisseur"
                                            ref={numero_facture_fournisseur => this.numero_facture_fournisseur = numero_facture_fournisseur}

                                              type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date</label>
                                            <input name="date"
                                            ref={date => this.date = date}

                                             type="date" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Réglée le</label>
                                            <input name="date_reglement"
                                            ref={date_reglement => this.date_reglement = date_reglement}

                                             type="date" className="form-control" />
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
        natures_interventions: state.natures_interventions.items,
        vehicules: state.vehicules.items,

        tiers: state.tiers.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        param_vehicule: state.param_vehicule.items,
        plan_budgetaires: state.plan_budgetaires.items,
        structure_budgetaires: state.structure_budgetaires.items,
        consommations: state.consommations.items,
        amendes: state.amendes.items,
        interventions: state.interventions.items,
        budgetVehicules: state.budgetVehicules.items,
    }
  }

export default connect(mapStateToProps)(AjouterIntervention)
