import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';
import InputMask from 'react-input-mask';

import inputStyle from '../../../utils/inputStyle'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Select from 'react-select'
import { colourStyles, calculSommeColonneSommeIntervention, calculSommeColonneSommeAmende, calculSommeColonneSommeConso, formatageSomme } from '../../../utils/Repository';



 class ModifierConsommation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objetEdit: undefined,
            isFormSubmitted: false

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
    //         objetEdit: this.props.consommations.find(conso => conso.id == this.props.match.params.consommation_id)
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



    setFieldPrixTTC = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            //if(this.quantite_consomee.value == '' && this.prix_unitaire_ht.value != ''){
                let result = Number(this.montant_ttc.value) / Number(this.prix_unitaire_ht.value)
                this.quantite_consomee.value = parseFloat(result).toFixed(2)
           // }
        } );
    }

    setFieldPrix(id){
        const cout_conso = this.props.couts_consommables.find(conso => conso.id == id)
        this.setState({
            prix_unitaire_ht: cout_conso.cout_unitaire,
        })
    }

    setFieldConsomable = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.getPrixUnitaire(this.consomable.value)
            this.montant_ttc.value = 0;
            this.quantite_consomee.value = 0;
        } );
    }

    getPrixUnitaire(id){
        if(id){
            const cout_conso = this.props.couts_consommables.find(conso => conso.id == id)

            this.prix_unitaire_ht.value = cout_conso.cout_unitaire
            // if(this.quantite_consomee.value){
            //     this.montant_ttc.value = Number(this.quantite_consomee.value) * Number(this.prix_unitaire_ht.value)
            // }


        }else{
            this.prix_unitaire_ht.value = ''

        }

    }


      verificationFormulaire () {
        const objetEdit = this.props.consommations.find(conso => conso.id == this.props.match.params.consommation_id)
        const plan = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id : objetEdit.plan_budgetaire ? objetEdit.plan_budgetaire : null
        const budget_du_plan_selectionne_et_du_vehicule = plan ? plan.budget.find(bud => bud.vehicule.id == this.props.match.params.vehicule_id) : null

        const {param_vehicule} = this.props
        if(param_vehicule && param_vehicule.depense_impute_sur_budget && !this.state.plan_budgetaire_id && !objetEdit.plan_budgetaire_id){
          return "Vous n'avez pas saisi la ligne d'imputation budgétaire"
        }else if(this.type_consomation.value == ''){
              return "Le type de consommation est obligatoire obligatoire !"
          }else if(this.tiers.value == ''){
              return "Le tiers est obligatoire !"
          }else if(this.date_conso.value == ''){
            return "La date  est obligatoire !"
          }else if(this.montant_ttc.value == '' || Number(this.montant_ttc.value) <= 0){
            return "Vous n'avez pas renseigné le Montant total !"
          }else if(param_vehicule && param_vehicule.depense_impute_sur_budget && Number(this.montant_ttc.value) > Number(budget_du_plan_selectionne_et_du_vehicule.depense_reste)){
            return `Il n'y a pas assez de fonds sur la ligne ${plan.libelle} pour couvrir cette dépense
            Fonds disponible: ${formatageSomme(budget_du_plan_selectionne_et_du_vehicule.depense_reste)}`
          } else{
              return null
          }
      }

      miseAJourDotationBudgetaire(){
        const objetEdit = this.props.consommations.find(conso => conso.id == this.props.match.params.consommation_id)

        var id = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.id : objetEdit.plan_budgetaire_id
      let somme_total_interventions = calculSommeColonneSommeIntervention(this.props.interventions.filter(elm => elm.plan_budgetaire_id == id))
      let somme_total_amendes = calculSommeColonneSommeAmende(this.props.amendes.filter(elm => elm.plan_budgetaire_id == id))
      let somme_total_consos = calculSommeColonneSommeConso(this.props.consommations.filter(elm => elm.plan_budgetaire_id == id))

      return Number(somme_total_amendes + somme_total_consos + somme_total_interventions);
  }

      modifierConsommation = (e) => {
          const objetEdit = this.props.consommations.find(conso => conso.id == this.props.match.params.consommation_id)

        e.preventDefault()

          if(this.verificationFormulaire() == null){
            this.setState({isFormSubmitted: true})

            axios.post('/api/modifier_vehicule_consommation/' + objetEdit.id, {
               // vehicule: this.props.vehiculeSeleted.id,
                type_consomation: this.type_consomation.value,
                tiers: this.tiers.value,
                plan_budgetaire_id: this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.id : objetEdit.plan_budgetaire_id,

                date_conso: this.date_conso.value ,
                libelle: this.libelle.value,
                numero_carte: this.numero_carte.value,
                numero_conducteur: this.numero_conducteur.value,
                conducteur: this.conducteur.value,
                kilometrage_au_compteur: this.kilometrage_au_compteur.value,
                quantite_consomee: this.quantite_consomee.value,
               // unite_mesure: this.unite_mesure.value,
                consomable: this.consomable.value,
                prix_unitaire_ht: this.prix_unitaire_ht.value,
                montant_ttc: this.montant_ttc.value,
              //  montant_tva: this.montant_tva.value,
               // montant_ht: this.montant_ht.value,

            })
            .then(response => {
               const action = {type: "EDIT_CONSOMMATION", value: response.data}
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
                 this.setState({isFormSubmitted: false})

               this.props.history.goBack();


            }).catch(error => {
                this.setState({isFormSubmitted: false})

                console.log(error)} )


          }else{
              //console.log(this.verificationFormulaire())
             /*  toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              }); */
              window.alert(this.verificationFormulaire());
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
        var tab = vehicule_courant.budgets.map(bud => bud.plan_budgetaire_id)

        return this.props.plan_budgetaires.filter(elm => {
            return (elm.structure_budgetaire ? elm.structure_budgetaire.niveau == this.getMaximumNiveauPlanBudgetaire() : false)
            &&
            (vehicule_courant.budgets.length ? tab.indexOf(elm.id) != -1 : false)
        })
    }


    render() {
        const objetEdit = this.props.consommations.find(conso => conso.id == this.props.match.params.consommation_id)
        const {param_vehicule} = this.props

        const plan = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id : objetEdit.plan_budgetaire ? objetEdit.plan_budgetaire : null
        const budget_du_plan_selectionne_et_du_vehicule = plan ? plan.budget.find(bud => bud.vehicule.id == this.props.match.params.vehicule_id) : null


        if(objetEdit !== undefined){
                return (
                    <div className="app-main__inner">

                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <h5 className="card-title">Gestion des consommations du véhicule

                                    {this.props.vehicules.length &&
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/>
                            }
                                  </h5>
                                  <br />
                                    <form className="" onChange={this.setField}  onSubmit={this.modifierConsommation}>
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
                                            <label  className="">Type de consommation</label>
                                                <select name="type_consomation" onChange={this.setField}
                                                    ref={type_consomation => this.type_consomation = type_consomation}
                                                    style={inputStyle}
                                                    defaultValue={objetEdit.type_consomation ? objetEdit.type_consomation.id : null}
                                                  className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.natures_consommations.map(nature =>
                                                        <option key={nature.id} value={nature.id}>{nature.nature_consomation}</option>

                                                        )}
                                                </select>

                                                </div>

                                                <div className="col-md-3">
                                                 <label  className="">Tiers</label>
                                                <select name="tiers" onChange={this.setField}
                                                    ref={tiers => this.tiers = tiers}
                                                    style={inputStyle}
                                                    defaultValue={objetEdit.tiers ? objetEdit.tiers.id : null}
                                                  className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.tiers.filter(el => el.type_tiers == "STATION ESSENCE").map(tier =>
                                                <option key={tier.id} value={tier.id}>{tier.code} </option>

                                                )}
                                                </select>

                                                </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Date *</label>
                                                    <input name="date_conso"  type="date"
                                                    style={inputStyle}
                                                    defaultValue={objetEdit.date_conso}
                                                    onChange={this.setField}
                                                    ref={date_conso => this.date_conso = date_conso}
                                                     className="form-control" />
                                                     </div>
                                            </div>

                                            <div className="col-md-3">
                                                    <label >Libéllé Consommation</label>

                                                    <input name="libelle"
                                                    ref={libelle => this.libelle = libelle}
                                                    defaultValue={objetEdit.libelle}
                                                      type="text" className="form-control" />
                                                </div>



                                        </div>


                                        <div className="form-row">

                                                <div className="col-md-3">
                                                    <label >Numero de la carte</label>

                                                    <input name="numero_carte"
                                                    defaultValue={objetEdit.numero_carte}
                                                        onChange={this.setField}
                                                    ref={numero_carte => this.numero_carte = numero_carte}
                                                      type="text" className="form-control" />
                                                </div>

                                                <div className="col-md-3">
                                            <label  className="">Conducteur</label>
                                                <select name="conducteur"
                                                defaultValue={objetEdit.conducteur ? objetEdit.conducteur.id : null}
                                                    ref={conducteur => this.conducteur = conducteur}

                                                  className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.personnels.map(pers =>
                                                        <option key={pers.id} value={pers.id}>{pers.nom} {pers.prenom}</option>

                                                        )}
                                                </select>

                                                </div>
                                                <div className="col-md-3">
                                                    <label >Numero du conducteur</label>

                                                    <InputMask mask="99:99" mask="(+225) 99 99 99 99"
                                                    onChange={this.setField}
                                                    defaultValue={objetEdit.numero_conducteur}
                                                    inputRef={numero_conducteur => this.numero_conducteur = numero_conducteur}
                                                    className="form-control"
                                                    name="numero_conducteur"
                                                    />
                                                </div>

                                                <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Kilometrage</label>
                                                    <input name="kilometrage_au_compteur"  type="number"
                                                    readOnly
                                                    defaultValue={objetEdit.kilometrage_au_compteur}
                                                    onChange={this.setField}
                                                    ref={kilometrage_au_compteur => this.kilometrage_au_compteur = kilometrage_au_compteur}
                                                     className="form-control" /></div>
                                            </div>


                                            </div>


                                            <div className="form-row">



                                            {/* <div className="col-md-3">
                                            <label  className="">Unité de mesure</label>
                                                <select name="unite_mesure"
                                                    ref={unite_mesure => this.unite_mesure = unite_mesure}
                                                    defaultValue={objetEdit.unite_mesure}
                                                  className="form-control">
                                                <option >Litre</option>
                                                <option >Montant</option>
                                                <option >Kva</option>
                                                <option >Nombre</option>
                                                <option >Kgs</option>
                                                <option >Autre</option>

                                                </select>

                                                </div> */}

                                                <div className="col-md-3">
                                            <label  className="">Consommable</label>
                                                <select name="consomable"
                                                    onChange={this.setFieldConsomable}
                                                    ref={consomable => this.consomable = consomable}
                                                    defaultValue={objetEdit.consomable ? objetEdit.consomable.id : null}
                                                  className="form-control">
                                                 <option defaultValue={null}></option>

                                                {this.props.couts_consommables.map(conso =>
                                                        <option key={conso.id} value={conso.id}>{conso.libelle}</option>

                                                        )}

                                                </select>

                                                </div>

                                                <div className="col-md-2">
                                                <div className="position-relativeconsomable form-group">
                                                    <label >Prix unitaire </label>

                                                    <input name="prix_unitaire_ht"
                                                    readOnly
                                                    defaultValue={objetEdit.prix_unitaire_ht}
                                                    onChange={this.setField}
                                                    ref={prix_unitaire_ht => this.prix_unitaire_ht = prix_unitaire_ht}

                                                     type="number" className="form-control" />
                                                </div>
                                            </div>

                                                <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Quantité </label>
                                                    <input name="quantite_consomee"
                                                    defaultValue={objetEdit.quantite_consomee}
                                                        style={inputStyle}
                                                    readOnly
                                                    onChange={this.setField}
                                                    ref={quantite_consomee => this.quantite_consomee = quantite_consomee}

                                                     type="number" className="form-control" />
                                                </div>
                                            </div>



                                            <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant TTC</label>
                                            <input name="montant_ttc"  type="number"
                                            style={inputStyle}
                                            defaultValue={objetEdit.montant_ttc}
                                            readOnly={!objetEdit.consomable}

                                            onChange={this.setFieldPrixTTC}
                                            ref={montant_ttc => this.montant_ttc = montant_ttc}
                                             className="form-control" />
                                             </div>
                                    </div>


                                        </div>

                                        {/* <div className="form-row">
                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Montant TTC</label>
                                                    <input name="montant_ttc"  type="number"
                                                    defaultValue={objetEdit.montant_ttc}
                                                    ref={montant_ttc => this.montant_ttc = montant_ttc}
                                                     className="form-control" />
                                                     </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Montant TVA</label>
                                                    <input name="montant_tva"  type="number"
                                                    defaultValue={objetEdit.montant_tva}
                                                    ref={montant_tva => this.montant_tva = montant_tva}
                                                     className="form-control" />
                                                     </div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Montant HT</label>
                                                    <input name="montant_ht"  type="number"
                                                    defaultValue={objetEdit.montant_ht}
                                                    ref={montant_ht => this.montant_ht = montant_ht}
                                                     className="form-control" />
                                                     </div>
                                            </div>


                                        </div> */}


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
        natures_consommations: state.natures_consommations.items,
        tiers: state.tiers.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        vehicules: state.vehicules.items,

        couts_consommables: state.couts_consommables.items,
        personnels: state.personnels.items,
        consommations: state.consommations.items,
        param_vehicule: state.param_vehicule.items,
        plan_budgetaires: state.plan_budgetaires.items,
        structure_budgetaires: state.structure_budgetaires.items,
        amendes: state.amendes.items,
        interventions: state.interventions.items,
        budgetVehicules: state.budgetVehicules.items,

    }
  }

export default connect(mapStateToProps)(ModifierConsommation)
