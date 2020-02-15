import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';
import InputMask from 'react-input-mask';

import today from '../../../utils/today'
import inputStyle from '../../../utils/inputStyle'
import Select from 'react-select';
import { colourStyles, calculSommeColonneSommeIntervention, calculSommeColonneSommeAmende, calculSommeColonneSommeConso, formatageSomme } from '../../../utils/Repository';



 class AjouterConsommation extends Component {
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

    setFieldTypeConso = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            const type = this.props.natures_consommations.find(nat => nat.id == this.state.type_consomation).nature_consomation
            this.libelle.value = type
        } );
    }

    setFieldPrixUnitaireEtQuantite = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            if(this.quantite_consomee.value != '' && this.prix_unitaire_ht.value != ''){
                this.montant_ttc.value = Number(this.quantite_consomee.value) * Number(this.prix_unitaire_ht.value)

            }
        } );
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

    setPrixTTc = () => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.prix_unitaire_ht.value = null
            this.quantite_consomee.value = null
         } );
    }

    setFieldSelect(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }

    calculMontantTTC = () => {
        if (this.type_commande && this.type_commande.value == 0) {
            if (this.montant_ht.value == '') return null
            if (this.tva.value == '') return this.montant_ht.value
            var taux = (Number(this.montant_ht.value) * Number(this.tva.value)) / 100
            return Number(this.montant_ht.value) + taux

        }
    }


      verificationFormulaire () {
          const budget_du_plan_selectionne_et_du_vehicule = this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.budget.find(bud => bud.vehicule.id == this.props.match.params.vehicule_id) : null
          const {param_vehicule} = this.props
          if(param_vehicule && param_vehicule.depense_impute_sur_budget && !this.state.plan_budgetaire_id){
            return "Vous n'avez pas saisi la ligne d'imputation budgétaire"
          }else if(this.type_consomation.value == ''){
              return "Le type de consommation est obligatoire obligatoire !"
          }else if(this.tiers.value == ''){
              return "Le tiers est obligatoire !"
          }else if(this.date_conso.value == ''){
            return "La date  est obligatoire !"
          } else if(this.montant_ttc.value == '' || Number(this.montant_ttc.value) <= 0){
            return "Vous n'avez pas renseigné le montant total !"
          }else if(param_vehicule && param_vehicule.depense_impute_sur_budget && Number(this.montant_ttc.value) > Number(budget_du_plan_selectionne_et_du_vehicule.depense_reste)){
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

      enregistrerConsommation = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            const vehiculeSelect = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)

              this.setState({isFormSubmitted: true})
            axios.post('/api/ajouter_vehicule_consommation', {
                vehicule: vehiculeSelect.id,
                vehicule_id: vehiculeSelect.id,
                plan_budgetaire_id: this.state.plan_budgetaire_id ? this.state.plan_budgetaire_id.id : null,
                type_consomation: this.type_consomation.value,
                tiers: this.tiers.value,
                date_conso: this.date_conso.value ,
                libelle: this.libelle.value,
                numero_carte: this.numero_carte.value,
                numero_conducteur: this.numero_conducteur.value,
                conducteur: this.conducteur.value,
                kilometrage_au_compteur: this.kilometrage_au_compteur.value,
                quantite_consomee: this.quantite_consomee.value,
              //  unite_mesure: this.unite_mesure.value,
                consomable: this.consomable.value,
                prix_unitaire_ht: this.prix_unitaire_ht.value,
                montant_ttc: this.montant_ttc.value,
               // montant_tva: this.montant_tva.value,
               // montant_ht: this.montant_ht.value,

            })
            .then(response => {


               const action = {type: "ADD_CONSOMMATION", value: response.data}
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
                 this.setState({isFormSubmitted: false})

               this.props.history.goBack();


            }).catch(error => {
                this.setState({isFormSubmitted: false})

                 console.log(error) } )


          }else{
              //console.log(this.verificationFormulaire())
             /*  toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              }); */
              window.alert( this.verificationFormulaire() );
          }

       // console.log(this.date_debut.value)
      }

    //   setFieldPrix = (event) => {
    //     const target = event.target;
    //     const value = target.type === 'checkbox' ? target.checked : target.value;
    //     const name = target.name;

    //     this.setState({
    //         [name]: value
    //     }, () => this.getValueQuantite() );
    // }

    // setFieldPrixUnitaire(id){
    //     const cout = this.props.couts_consommables.find(ct => ct.id == id)

    //     this.prix_unitaire_ht.value = cout.cout_unitaire

    // }



    getValueQuantite(){
      //  const {objetEdit} = this.state
        let valeurTva = ( (Number(this.prix_article.value ? this.prix_article.value : 0) * Number(this.quantite_disponible_stock.value)) * Number(this.tva.value) ) / 100
         this.valorisation_hors_taxe.value = Number(this.prix_article.value ? this.prix_article.value : 0) * Number(this.quantite_disponible_stock.value)
      // console.log(valeurTva)
         this.valorisation_ttc.value = this.prix_article.value ?  Number(this.valorisation_hors_taxe.value) + Number(valeurTva) : 0
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
        /*  if(this.state.plan_budgetaire_id){
            var budget = this.props.budgetVehicules.find(elm => elm.plan_budgetaire_id == this.state.plan_budgetaire_id.id)

            var pourcentage =  (this.miseAJourDotationBudgetaire() * 100 ) /  Number(budget.depense_budget)

            console.log(pourcentage)
        } */

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
                            <h5 className="card-title">Gestion des consommations du véhicule

                            {this.props.vehicules.length &&
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/>
                            }
                          </h5>
                          <br />
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerConsommation}>
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

                                <div className="col-md-3">
                                    <label  className="">Type de consommation</label>
                                        <select name="type_consomation" onChange={this.setFieldTypeConso}
                                            ref={type_consomation => this.type_consomation = type_consomation}
                                            style={inputStyle}

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
                                            defaultValue={today}
                                            onChange={this.setField}
                                            ref={date_conso => this.date_conso = date_conso}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                            <label >Libéllé Consommation</label>

                                            <input name="libelle"
                                            ref={libelle => this.libelle = libelle}
                                              type="text" className="form-control" />
                                        </div>



                                </div>


                                <div className="form-row">




                                        <div className="col-md-3">
                                            <label >Numero de la carte</label>
                                            <input name="numero_carte"
                                                onChange={this.setField}
                                            ref={numero_carte => this.numero_carte = numero_carte}
                                              type="text" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                     <label  className="">Conducteur</label>
                                            {vehiculeSelect ?      <select name="conducteur"
                                        defaultValue={ vehiculeSelect.chauffeur_atitre ? vehiculeSelect.chauffeur_atitre : null }
                                            ref={conducteur => this.conducteur = conducteur}
                                          className="form-control">
                                        <option defaultValue={null}></option>
                                        {this.props.personnels.map(pers =>
                                                <option key={pers.id} value={pers.id}>{pers.nom} {pers.prenom}</option>

                                                )}
                                        </select> :      <select name="conducteur"
                                            ref={conducteur => this.conducteur = conducteur}
                                          className="form-control">
                                        <option defaultValue={null}></option>
                                        {this.props.personnels.map(pers =>
                                                <option key={pers.id} value={pers.id}>{pers.nom} {pers.prenom}</option>

                                                )}
                                        </select>}

                                        </div>
                                        <div className="col-md-3">
                                            <label >Numero du conducteur</label>

                                            <InputMask mask="99:99" mask="(+225) 99 99 99 99"
                                                onChange={this.setField}

                                            inputRef={numero_conducteur => this.numero_conducteur = numero_conducteur}
                                            className="form-control"
                                            name="numero_conducteur"
                                            />
                                        </div>

                                        <div className="col-md-2">
                                       {vehiculeSelect &&  <div className="position-relative form-group">
                                            <label >Kilometrage au compteur</label>
                                            <input name="kilometrage_au_compteur"  type="number"
                                            readOnly
                                            defaultValue={vehiculeSelect.kilometrage_acquisition}
                                            onChange={this.setField}
                                            ref={kilometrage_au_compteur => this.kilometrage_au_compteur = kilometrage_au_compteur}
                                             className="form-control" />
                                             </div>}
                                    </div>
                                    </div>


                                    <div className="form-row">

                                    {/* <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Quantité </label>
                                            <input name="quantite_consomee"
                                                style={inputStyle}
                                            onChange={this.setField}
                                            ref={quantite_consomee => this.quantite_consomee = quantite_consomee}

                                             type="number" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                    <label  className="">Unité de mesure</label>
                                        <select name="unite_mesure"
                                            ref={unite_mesure => this.unite_mesure = unite_mesure}
                                          className="form-control">
                                        <option >Litre</option>
                                        <option >Montant</option>
                                        <option >Nombre</option>

                                        </select>

                                        </div> */}

                                        <div className="col-md-3">
                                    <label  className="">Consommable</label>
                                        <select name="consomable"
                                            style={inputStyle}
                                            ref={consomable => this.consomable = consomable}
                                            onChange={this.setFieldConsomable}
                                          className="form-control">
                                         <option defaultValue={null}></option>
                                        {this.props.couts_consommables.map(conso =>
                                                <option key={conso.id} value={conso.id}>{conso.libelle}</option>

                                                )}
                                        </select>

                                        </div>

                                        <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Prix unitaire </label>
                                            <input name="prix_unitaire_ht"
                                            defaultValue={this.state.prix_unitaire_ht}
                                            readOnly
                                            onChange={this.setFieldPrixUnitaireEtQuantite}
                                            ref={prix_unitaire_ht => this.prix_unitaire_ht = prix_unitaire_ht}

                                             type="number" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Quantité </label>
                                            <input name="quantite_consomee"
                                            readOnly
                                            onChange={this.setFieldPrixUnitaireEtQuantite}
                                            ref={quantite_consomee => this.quantite_consomee = quantite_consomee}

                                             type="number" className="form-control" />
                                        </div>
                                    </div>

                                       <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant TTC</label>
                                            <input name="montant_ttc"  type="number"
                                            style={inputStyle}
                                            readOnly={!this.state.consomable}
                                            onChange={this.setFieldPrixTTC}
                                            ref={montant_ttc => this.montant_ttc = montant_ttc}
                                             className="form-control" />
                                             </div>
                                    </div>


                                </div>
                                {/* <div className="form-row">


                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant HT</label>
                                            <input name="montant_ht"  type="number"
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

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant TVA</label>
                                            <input name="montant_tva"  type="number"
                                            ref={montant_tva => this.montant_tva = montant_tva}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant TTC</label>
                                            <input name="montant_ttc"  type="number"
                                            ref={montant_ttc => this.montant_ttc = montant_ttc}
                                             className="form-control" />
                                             </div>
                                    </div>


                                </div> */}


                            <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
                                <span onClick={() => this.props.history.goBack()}
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
        natures_consommations: state.natures_consommations.items,
        tiers: state.tiers.items,
        vehicules: state.vehicules.items,
        tva: state.tva.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        couts_consommables: state.couts_consommables.items,
        personnels: state.personnels.items,
        param_vehicule: state.param_vehicule.items,
        plan_budgetaires: state.plan_budgetaires.items,
        structure_budgetaires: state.structure_budgetaires.items,
        consommations: state.consommations.items,
        amendes: state.amendes.items,
        interventions: state.interventions.items,
        budgetVehicules: state.budgetVehicules.items,



    }
  }

export default connect(mapStateToProps)(AjouterConsommation)
