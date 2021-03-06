import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import InterventionItem from '../../components/vehicules/InterventionItem';
import MatriculeInput from '../../components/MatriculeInput';


import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../../components/table.css'
import Select from 'react-select'
import moment from 'moment';
import FicheVehiculeItem from '../../components/vehicules/FicheVehiculeItem';
import { formatageSomme, calculSommeColonneSommeIntervention, calculSommeColonneSommeAssurance, calculSommeColonneSommeAmende, calculSommeColonneSommeConso } from '../../utils/Repository';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FicheVehiculeAmendeItem from '../../components/vehicules/FicheVehiculeAmendeItem';
import FicheVehiculeConsoItem from '../../components/vehicules/FicheVehiculeConsoItem';
import FicheVehiculeAssuranceItem from '../../components/vehicules/FicheVehiculeAssuranceItem';

const date = new Date();

 const today = date.getDate().toString().padStart(2, 0) + '/' + (date.getMonth() + 1).toString().padStart(2, 0) + '/' + date.getFullYear().toString();

  class FicheVehicule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,

            interventions_visibles: [],
            amendes_visibles: [],
            conso_visibles: [],
            assurances_visibles: [],
            loading: false,
            vehicule: null,
            date_traite1: null,
            date_traite2: null,
            type_cout: "0",
            date_amende_1: null,
            date_amende_2: null,
            date_conso_1: null,
            date_conso_2: null
        }
        this.filtreVehicule = this.filtreVehicule.bind(this)
        this.filtreAmendes = this.filtreAmendes.bind(this)
        this.filtreConsos = this.filtreConsos.bind(this)



    }

    setFieldSelect(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj, () => this.filtreVehicule());
    }

    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        }, () => this.filtreVehicule());
      }


    createP = () => {

        //var doc = new jsPDF('l', 'pt', 'a3');
        var doc = new jsPDF('l');

        doc.autoTable({
            html: '#complex-table',
            theme: 'grid'
        });

        window.open(doc.output('bloburl'), '_blank')

    }

    filtreVehicule(){

      if(this.state.vehicule == null){
        this.setState({
            interventions_visibles: null,
            amendes_visibles: null,
            conso_visibles: null,
            assurances_visibles: null,
            date_traite1: null,
            date_traite2: null,
            date_amende_1: null,
            date_amende_2: null,
            date_assur_1: null,
            date_assur_2: null
        })
      }else{
        var debut = this.state.date_traite1 ? Date.parse(this.state.date_traite1) : null
        var fin = this.state.date_traite2 ? Date.parse(this.state.date_traite2) : null

        const resultat_interventions = this.props.interventions.filter(ut => {
            let date_debut_intervention = Date.parse(ut.date_debut)
            let date_fin_intervention = Date.parse(ut.date_fin_reele)

            return (ut.vehicule.id == this.state.vehicule.id)
            &&
             (debut && fin ? debut >= date_debut_intervention && debut <= date_fin_intervention || fin >= date_debut_intervention && fin <= date_fin_intervention || debut <= date_debut_intervention && fin >= date_fin_intervention : true )

        })


        var debutA = this.state.date_amende_1 ? Date.parse(this.state.date_amende_1) : null
        var finA = this.state.date_amende_2 ? Date.parse(this.state.date_amende_2) : null

        const resultat_amendes = this.props.amendes.filter(ut => {
            let date_de_amende = Date.parse(ut.date)

            return (ut.vehicule.id == this.state.vehicule.id)
            &&
            (debutA && finA ? debutA <= date_de_amende && date_de_amende <= finA  : true )


        })

        var debutC = this.state.date_conso_1 ? Date.parse(this.state.date_conso_1) : null
        var finC = this.state.date_conso_2 ? Date.parse(this.state.date_conso_2) : null

        const resultat_conso = this.props.consommations.filter(ut => {
            let date_de_conso = Date.parse(ut.date_conso)

            return (ut.vehicule.id == this.state.vehicule.id)
            &&
            (debutC && finC ? debutC <= date_de_conso && date_de_conso <= finC  : true )


        })

        let debutCont = this.state.date_assur_1 ? Date.parse(this.state.date_assur_1) : null
        let finCont = this.state.date_assur_2 ? Date.parse(this.state.date_assur_2) : null

        const resultat_assurances = this.props.contrat_assurances.filter(ut => {
            let date_du_contrat = Date.parse(ut.periode_date_debut)

            return (ut.vehicule_id == this.state.vehicule.id)
            &&
            (debutCont && finCont ? debutCont <= date_du_contrat && date_du_contrat <= finCont  : true )


        })

        this.setState({
            interventions_visibles: resultat_interventions,
            amendes_visibles: resultat_amendes,
            conso_visibles: resultat_conso,
            assurances_visibles: resultat_assurances

        })
      }

    }

    filtreAmendes(){

        if(this.state.vehicule == null){
          this.setState({
              amendes_visibles: null,
              date_amende_1: null,
              date_amende_2: null
          })
        }else{
          var debut = this.state.date_amende_1 ? Date.parse(this.state.date_amende_1) : null
          var fin = this.state.date_amende_2 ? Date.parse(this.state.date_amende_2) : null

          const resultats = this.props.amendes.filter(ut => {
              let date_de_amende = Date.parse(ut.date_debut)

              return (ut.vehicule.id == this.state.vehicule.id)
              &&
              (debut && fin ? debut <= date_de_amende && date_de_amende <= fin  : true )


          })

          this.setState({
              amendes_visibles: resultats
          })
        }

      }

      filtreConsos(){

        if(this.state.vehicule == null){
          this.setState({
              conso_visibles: null,
              date_conso_1: null,
              date_conso_2: null
          })
        }else{
          var debut = this.state.date_conso_1 ? Date.parse(this.state.date_conso_1) : null
          var fin = this.state.date_conso_2 ? Date.parse(this.state.date_conso_2) : null

          const resultats = this.props.consommations.filter(ut => {
              let date_de_conso = Date.parse(ut.date_conso)

              return (ut.vehicule.id == this.state.vehicule.id)
              &&
              (debut && fin ? debut <= date_de_conso && date_de_conso <= fin  : true )


          })

          this.setState({
              conso_visibles: resultats
          })
        }

      }




    render() {
        const {vehicule, interventions_visibles, date_traite1, date_traite2, amendes_visibles, date_amende_2, date_amende_1, conso_visibles, date_conso_1, date_conso_2, assurances_visibles, date_assur_1, date_assur_2 } = this.state
        let pourcentage_global = 0
       let cout_de_reviens_global = 0
       let cout_de_reviens_periode = 0 //intervention
       let cout_acquisition_vehicule =  0
       let les_interventions_globales_du_vehicule = []


       let les_amendes_globales_du_vehicules = [];
       let pourcentage_periode_amende = 0;
      let pourcentage_global_amende = 0;
        let cout_de_reviens_periode_amende = 0
       let pourcentage_periode = 0

       let les_conso_globales_du_vehicules = [];
       let pourcentage_periode_conso = 0;
       let pourcentage_global_conso = 0;
       let cout_de_reviens_periode_conso = 0

       let les_assurance_globales_du_vehicules = [];
       let pourcentage_periode_assurance = 0;
       let pourcentage_global_assurance = 0;
       let cout_de_reviens_periode_assurance = 0


      if(vehicule){
        cout_acquisition_vehicule = vehicule.mode_acquisition == 0 ? Number(vehicule.acquisition_achat_prix_ttc) || 0 : vehicule.mode_acquisition == 1 ? Number(vehicule.acquisition_leasing_apport_initial ) + Number(vehicule.acquisition_leasing_deja_paye) + Number(vehicule.acquisition_leasing_loyer_mensuel) || 0 : 0

         // conso
         les_conso_globales_du_vehicules = this.props.consommations.filter(am => am.vehicule.id == this.state.vehicule.id)
         let sommeTotalConso = calculSommeColonneSommeConso(les_conso_globales_du_vehicules)

         let rapport_pourcentage_global_conso = cout_acquisition_vehicule > 0 ? (Number(sommeTotalConso) * 100) / Number(cout_acquisition_vehicule) : 0
         pourcentage_global_conso = parseFloat(rapport_pourcentage_global_conso).toFixed(1);

         let sommeTotalConsoPeriode = calculSommeColonneSommeConso(conso_visibles)

         let rapport_pourcentage_periode_conso = cout_acquisition_vehicule > 0 ? (Number(sommeTotalConsoPeriode) * 100) / Number(cout_acquisition_vehicule) : 0
         pourcentage_periode_conso = parseFloat(rapport_pourcentage_periode_conso).toFixed(1);

         if(date_conso_1 && date_conso_2){
             cout_de_reviens_periode_conso = parseFloat(Number(cout_acquisition_vehicule) + Number(sommeTotalConsoPeriode))

         }
         // fin conso

            // assurances
            les_assurance_globales_du_vehicules = this.props.contrat_assurances.filter(am => am.vehicule_id == this.state.vehicule.id)
            let sommeTotalAssurance = calculSommeColonneSommeAssurance(les_assurance_globales_du_vehicules)

            let rapport_pourcentage_global_assurance = cout_acquisition_vehicule > 0 ? (Number(sommeTotalAssurance) * 100) / Number(cout_acquisition_vehicule) : 0
            pourcentage_global_conso = parseFloat(rapport_pourcentage_global_assurance).toFixed(1);

            let sommeTotalAssurancePeriode = calculSommeColonneSommeAssurance(assurances_visibles)

            let rapport_pourcentage_periode_assurance = cout_acquisition_vehicule > 0 ? (Number(sommeTotalAssurancePeriode) * 100) / Number(cout_acquisition_vehicule) : 0
            pourcentage_periode_conso = parseFloat(rapport_pourcentage_periode_assurance).toFixed(1);

            if(date_assur_1 && date_assur_2){
                cout_de_reviens_periode_assurance = parseFloat(Number(cout_acquisition_vehicule) + Number(sommeTotalAssurancePeriode))

            }
            // fin assurances

        // amendes
        les_amendes_globales_du_vehicules = this.props.amendes.filter(am => am.vehicule.id == this.state.vehicule.id)
        let sommeTotalAmende = calculSommeColonneSommeAmende(les_amendes_globales_du_vehicules)

        let rapport_pourcentage_global_amende = cout_acquisition_vehicule > 0 ? (Number(sommeTotalAmende) * 100) / Number(cout_acquisition_vehicule) : 0
        pourcentage_global_amende = parseFloat(rapport_pourcentage_global_amende).toFixed(1);

        let sommeTotalAmendePeriode = calculSommeColonneSommeAmende(amendes_visibles)

        let rapport_pourcentage_periode_amende = cout_acquisition_vehicule > 0 ? (Number(sommeTotalAmendePeriode) * 100) / Number(cout_acquisition_vehicule) : 0
        pourcentage_periode_amende = parseFloat(rapport_pourcentage_periode_amende).toFixed(1);

        if(date_amende_1 && date_amende_2){
            cout_de_reviens_periode_amende = parseFloat(Number(cout_acquisition_vehicule) + Number(sommeTotalAmendePeriode))

        }
        // fin amendes

        // interventions

        les_interventions_globales_du_vehicule = this.props.interventions.filter(inter => inter.vehicule.id == this.state.vehicule.id)
          let sommeTotalIntervention = calculSommeColonneSommeIntervention(les_interventions_globales_du_vehicule)


        let rapport_pourcentage = cout_acquisition_vehicule > 0 ? (Number(sommeTotalIntervention + sommeTotalAmende + sommeTotalConso + sommeTotalAssurance) * 100) / Number(cout_acquisition_vehicule) : 0
        pourcentage_global = parseFloat(rapport_pourcentage).toFixed(1);

        let sommeTotalInterventionPeriode = calculSommeColonneSommeIntervention(interventions_visibles)

        let rapport_pourcentage_periode = cout_acquisition_vehicule > 0 ? (Number(sommeTotalInterventionPeriode + sommeTotalAmendePeriode + sommeTotalConsoPeriode + sommeTotalAssurancePeriode) * 100) / Number(cout_acquisition_vehicule) : 0
        pourcentage_periode = parseFloat(rapport_pourcentage_periode).toFixed(1);


        cout_de_reviens_global = parseFloat(Number(cout_acquisition_vehicule) + Number(sommeTotalIntervention + sommeTotalAmende + sommeTotalConso + sommeTotalAssurance))
        // fin interventions
        if(date_traite1 && date_traite2){
            cout_de_reviens_periode = parseFloat(Number(cout_acquisition_vehicule) + Number(sommeTotalInterventionPeriode))

        }
    }
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Fiche de dépense des véhicules

                         {/*   <span className="pull-right">


                                             <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename={`Interventions de véhicule`}
                                                sheet="feuille1"
                                                buttonText="Ecran -> Liste"/>
                            </span> */}

                            </h5>
                            <br />

                            {/* formulaire de filtre */}
                                <div className="row">
                                    <div className="col-md-10">
                                        <label htmlFor="">Sélectionnez un véhicule</label>
                                        <Select
                                                name="vehicule"

                                                placeholder="taper l'immatriculation"

                                                noOptionsMessage={() => "Aucun véhicule pour l'instat"}
                                                options={this.props.vehicules}
                                                getOptionLabel={option => {
                                                  return `${option.immatriculation} --- Interventions.(${this.props.interventions.filter(veh => veh.vehicule.id == option.id).length}) --- Amendes.(${this.props.amendes.filter(veh => veh.vehicule.id == option.id).length}) --- Consommations.(${this.props.consommations.filter(veh => veh.vehicule.id == option.id).length}) --- Assurances.(${this.props.contrat_assurances.filter(cont => cont.vehicule_id == option.id).length})`
                                                }}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "vehicule")}
                                            />
                                    </div>



                                </div>
                                <br />

                                    <div className="row">
                                    {this.state.vehicule ? <React.Fragment>
                                        <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="center">Type de dépense</label>
                                    </div>
                                </div>


                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="">
                                            Interventions  <input type="radio"
                                                onChange={this.setField}
                                                checked={this.state.type_cout === "0"}

                                                name="type_cout" value="0" className="" /> </label>
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Amendes  <input type="radio" name="type_cout"
                                                onChange={this.setField}
                                                checked={this.state.type_cout === "1"}
                                                value="1" className="" /></label>
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Consommations  <input type="radio" name="type_cout"
                                                onChange={this.setField}
                                                checked={this.state.type_cout === "3"}
                                                value="3" className="" /></label>
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Assurances  <input type="radio" name="type_cout"
                                                onChange={this.setField}
                                                checked={this.state.type_cout === "4"}
                                                value="4" className="" /></label>
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Tous  <input type="radio" name="type_cout"

                                                onChange={this.setField}
                                                checked={this.state.type_cout === "2"}
                                                value="2" className="" /></label>
                                    </div>
                                </div>
                                    </React.Fragment> : null}

                                    </div>

                                <br />

                                {this.state.vehicule ?
                                <React.Fragment>
                                    {this.state.type_cout == "2" || this.state.type_cout == "0" ?    <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="">Date de l'intervention est comprise entre :</label>
                                    </div>

                                    <div className="col-md-3">
                                        <input type="date"  onChange={this.setField} className="form-control" name="date_traite1" id=""/>
                                    </div>
                                        <div className="col-md-1">
                                            <label htmlFor="">ET</label>
                                        </div>
                                    <div className="col-md-3">
                                        <input type="date"  onChange={this.setField} className="form-control" name="date_traite2" id=""/>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div> : null}
                                <br />

                                {this.state.type_cout == "2" || this.state.type_cout == "1" ?    <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="">Date de l'amende est comprise entre :</label>
                                    </div>

                                    <div className="col-md-3">
                                        <input type="date"  onChange={this.setField} className="form-control" name="date_amende_1" id=""/>
                                    </div>
                                        <div className="col-md-1">
                                            <label htmlFor="">ET</label>
                                        </div>
                                    <div className="col-md-3">
                                        <input type="date"  onChange={this.setField} className="form-control" name="date_amende_2" id=""/>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div> : null}
                                <br />

                                {this.state.type_cout == "2" || this.state.type_cout == "3" ?    <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="">Date de la consommation est comprise entre :</label>
                                    </div>

                                    <div className="col-md-3">
                                        <input type="date"  onChange={this.setField} className="form-control" name="date_conso_1" id=""/>
                                    </div>
                                        <div className="col-md-1">
                                            <label htmlFor="">ET</label>
                                        </div>
                                    <div className="col-md-3">
                                        <input type="date"  onChange={this.setField} className="form-control" name="date_conso_2" id=""/>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div> : null}
                                <br />

                                {this.state.type_cout == "2" || this.state.type_cout == "4" ?    <div className="row">
                                    <div className="col-md-4">
                                        <label htmlFor="">Date du Contrat d'assurance est comprise entre :</label>
                                    </div>

                                    <div className="col-md-3">
                                        <input type="date"  onChange={this.setField} className="form-control" name="date_assur_1" id=""/>
                                    </div>
                                        <div className="col-md-1">
                                            <label htmlFor="">ET</label>
                                        </div>
                                    <div className="col-md-3">
                                        <input type="date"  onChange={this.setField} className="form-control" name="date_assur_2" id=""/>
                                    </div>
                                    <div className="col-md-1"></div>
                                </div> : null}
                                <br />
                                </React.Fragment>
                                : null}

                                <br />

                            {/* fin formulaire de filtre */}

                                {/* premiere row */}
                                {this.state.vehicule ?
                            <React.Fragment>
                                    <div className="row">
                            <div className="col-md-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Coût d'acquisition du véhicule</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                               { formatageSomme(cout_acquisition_vehicule )}
                                                </span> : null}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">%  dépenses</div>
                                                <div className="widget-subheading"><span style={{fontSize: '0.8em'}}>Par rapport au coût d'acquisition</span></div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-danger">
                                                   {this.state.vehicule ?  <span>
                                                    { pourcentage_global}%
                                                    </span> : null}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                                <div className="widget-heading">Coût de revient du véhicule</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    { formatageSomme(cout_de_reviens_global)}
                                                </span> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="row">
                            {this.state.type_cout == "2" || this.state.type_cout == "0" ?    <div className="col-md-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                                <div className="widget-heading">Coût global des interventions</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    {les_interventions_globales_du_vehicule.length ? formatageSomme(calculSommeColonneSommeIntervention(les_interventions_globales_du_vehicule) ) : 0}
                                                </span> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}
                            {this.state.type_cout == "2" || this.state.type_cout == "1" ?    <div className="col-md-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                                <div className="widget-heading">Coût global des amendes</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    { formatageSomme( calculSommeColonneSommeAmende(les_amendes_globales_du_vehicules) )}
                                                </span> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}

                            {this.state.type_cout == "2" || this.state.type_cout == "3" ?    <div className="col-md-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                                <div className="widget-heading">Coût global des Consommations</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    { formatageSomme( calculSommeColonneSommeConso(les_conso_globales_du_vehicules) )}
                                                </span> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}

                            {this.state.type_cout == "2" || this.state.type_cout == "4" ?    <div className="col-md-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                                <div className="widget-heading">Coût global des Contrats d'assurances</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    { formatageSomme( calculSommeColonneSommeAssurance(les_assurance_globales_du_vehicules) )}
                                                </span> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : null}
                        </div>
                            </React.Fragment> : null }

                        <br />


                        {this.state.date_traite1 && this.state.date_traite2 && (this.state.type_cout == "0" || this.state.type_cout == "2") ? <React.Fragment>
                            <hr />
                        <p style={{textAlign: 'center'}}>Les Interventions Pour la période du {moment(this.state.date_traite1).format('DD/MM/YYYY')} au {moment(this.state.date_traite2).format('DD/MM/YYYY')}</p>
                        <hr />
                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Coût de revient du véhicule</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    { formatageSomme(cout_de_reviens_periode ) }
                                                </span> : null}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                                <div className="widget-heading">Coût total des interventions</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    {formatageSomme(calculSommeColonneSommeIntervention(this.state.interventions_visibles) )}
                                                </span> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">% des dépenses</div>
                                                <div className="widget-subheading">Par rapport au cout d'acquisition</div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-danger">
                                                   {this.state.vehicule ?  <span>
                                                    { pourcentage_periode}%
                                                    </span> : null}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <br />
                        </React.Fragment> : null}

                        {this.state.date_amende_1 && this.state.date_amende_2 && (this.state.type_cout == "1" || this.state.type_cout == "2") ? <React.Fragment>
                            <hr />
                        <p style={{textAlign: 'center'}}>Les Amendes Pour la période du {moment(this.state.date_amende_1).format('DD/MM/YYYY')} au {moment(this.state.date_amende_2).format('DD/MM/YYYY')}</p>
                        <hr />
                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Coût de revient du véhicule</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    { formatageSomme(cout_de_reviens_periode_amende ) }
                                                </span> : null}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                                <div className="widget-heading">Coût total des amendes</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    {formatageSomme(calculSommeColonneSommeAmende(this.state.amendes_visibles) )}
                                                </span> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">%  dépenses</div>
                                                <div className="widget-subheading"><span style={{fontSize: '0.8em'}}>Par rapport au cout d'acquisition</span></div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-danger">
                                                   {this.state.vehicule ?  <span>
                                                    { pourcentage_periode_amende}%
                                                    </span> : null}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <br />
                        </React.Fragment> : null}


                        {this.state.date_conso_1 && this.state.date_conso_2 && (this.state.type_cout == "3" || this.state.type_cout == "2") ? <React.Fragment>
                            <hr />
                        <p style={{textAlign: 'center'}}>Les Consommations Pour la période du {moment(this.state.date_conso_1).format('DD/MM/YYYY')} au {moment(this.state.date_conso_2).format('DD/MM/YYYY')}</p>
                        <hr />
                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Coût de revient du véhicule</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    { formatageSomme(cout_de_reviens_periode_conso ) }
                                                </span> : null}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                                <div className="widget-heading">Coût total des Consommations</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    {formatageSomme(calculSommeColonneSommeConso(this.state.conso_visibles) )}
                                                </span> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">%  dépenses</div>
                                                <div className="widget-subheading"><span style={{fontSize: '0.8em'}}>Par rapport au cout d'acquisition</span></div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-danger">
                                                   {this.state.vehicule ?  <span>
                                                    { pourcentage_periode_conso}%
                                                    </span> : null}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <br />
                        </React.Fragment> : null}

                        {this.state.date_assur_1 && this.state.date_assur_2 && (this.state.type_cout == "4" || this.state.type_cout == "2") ? <React.Fragment>
                            <hr />
                        <p style={{textAlign: 'center'}}>Les Contrats d'assurances Pour la période du {moment(this.state.date_assur_1).format('DD/MM/YYYY')} au {moment(this.state.date_assur_2).format('DD/MM/YYYY')}</p>
                        <hr />
                        <div className="row">
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">Coût de revient du véhicule</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    { formatageSomme(cout_de_reviens_periode_assurance ) }
                                                </span> : null}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                                <div className="widget-heading">Coût total des Contrats d'assurances</div>
                                               {this.state.vehicule ?  <span className="text-success" style={{fontSize: '1.2em'}}>
                                                    {formatageSomme(calculSommeColonneSommeAssurance(this.state.assurances_visibles) )}
                                                </span> : null}
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-xl-4">
                                <div className="card mb-3 widget-content">
                                    <div className="widget-content-outer">
                                        <div className="widget-content-wrapper">
                                            <div className="widget-content-left">
                                                <div className="widget-heading">%  dépenses</div>
                                                <div className="widget-subheading"><span style={{fontSize: '0.8em'}}>Par rapport au cout d'acquisition</span></div>
                                            </div>
                                            <div className="widget-content-right">
                                                <div className="widget-numbers text-danger">
                                                   {this.state.vehicule ?  <span>
                                                    { pourcentage_periode_assurance}%
                                                    </span> : null}
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <br />
                        </React.Fragment> : null}

                                {/* fin premiere row */}

                                {/* Deuxieme row tableau */}

                                    <React.Fragment>
                                        {this.state.type_cout == "0" ?     <div className="row">
                            <div className="col-md-12">
                                {this.state.vehicule ?
                                <div className="main-card mb-3 card">
                                    <div className="card-header">Interventions correspondantes {this.state.interventions_visibles ? this.state.interventions_visibles.length : null}
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                               {/*  <button className="active btn btn-focus">Last Week</button>
                                                <button className="btn btn-focus">All Month</button> */}
                                                 <button disabled={!this.state.interventions_visibles || !this.state.interventions_visibles.length} onClick={this.createP} className="btn-wide btn btn-success">Exporter</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="mb-0 table table-bordered" id="complex-table">
                                    {this.state.vehicule ?
                                     <thead>
                                <tr>
                                    <th colSpan="4" >Vehicule : {this.state.vehicule.immatriculation}</th>
                                    <th colSpan="4" >Fiche de Dépense du {today} </th>
                                 </tr>

                                 <tr>
                                  {this.state.date_traite1 && this.state.date_traite2 ? <td >
                                 <strong>Période traitée:  </strong>
                                    du {this.state.date_traite1 && this.state.date_traite2 ? moment(this.state.date_traite1).format('DD/MM/YYYY') + ' au ' + moment(this.state.date_traite2).format('DD/MM/YYYY')  : null}
                                   </td> : null}


                                </tr>


                                </thead> : null}

                                <tbody>
                                    <tr>
                                    <th>Date de début</th>
                                    <th className="">Tiers</th>
                                    <th>Nature intervention</th>
                                    <th>Catégorie intervention</th>
                                    <th className="">Coût</th>

                             </tr>
                                    </tbody>

                                {this.state.interventions_visibles && this.state.interventions_visibles.length ?

                                <React.Fragment>

                                <tbody>
                                      {this.state.interventions_visibles.map(inter =>
                                        <React.Fragment key={inter.id}>
                                              <FicheVehiculeItem  item={inter} />
                                      {this.state.interventions_visibles[this.state.interventions_visibles.length - 1].id == inter.id ?
                                        <tr style={{ backgroundColor: 'yellow' }}>
                                            <th colSpan="6">Coût Total des interventions : {' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                { formatageSomme( calculSommeColonneSommeIntervention(this.state.interventions_visibles) )}
                                                </span> </th>
                                        </tr>
                                        : null}
                                        </React.Fragment>
                                      )}


                                    </tbody>

                                </React.Fragment> : <span>Aucune intervention trouvée</span>}




                            </table>
                                    </div>

                                </div> : null }
                            </div>
                        </div> : null}

                            {/* tableau amende */}
                                    {this.state.type_cout == "1" ?     <div className="row">
                            <div className="col-md-12">
                                {this.state.vehicule ?
                                <div className="main-card mb-3 card">
                                    <div className="card-header">Amendes {this.state.amendes_visibles ? this.state.amendes_visibles.length : null}
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                               {/*  <button className="active btn btn-focus">Last Week</button>
                                                <button className="btn btn-focus">All Month</button> */}
                                                 <button disabled={!this.state.amendes_visibles || !this.state.amendes_visibles.length} onClick={this.createP} className="btn-wide btn btn-success">Exporter</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="mb-0 table table-bordered" id="complex-table">
                                    {this.state.vehicule ?
                                     <thead>
                                <tr>
                                    <th colSpan="4" >Vehicule : {this.state.vehicule.immatriculation}</th>
                                    <th colSpan="4" >Fiche de Dépense du {today} </th>
                                 </tr>

                                 <tr>
                                  {this.state.date_amende_1 && this.state.date_amende_2 ? <td >
                                 <strong>Période traitée:  </strong>
                                    du {this.state.date_amende_1 && this.state.date_amende_2 ? moment(this.state.date_amende_1).format('DD/MM/YYYY') + ' au ' + moment(this.state.date_amende_2).format('DD/MM/YYYY')  : null}
                                   </td> : null}


                                </tr>


                                </thead> : null}

                                <tbody>
                                    <tr>
                                    <th>Date </th>
                                    <th >Nature</th>
                                    <th>Conducteur</th>
                                    <th>Lieu</th>
                                    <th >Montant</th>

                             </tr>
                                    </tbody>

                                {this.state.amendes_visibles && this.state.amendes_visibles.length ?

                                <React.Fragment>

                                <tbody>
                                      {this.state.amendes_visibles.map(am =>
                                        <React.Fragment key={am.id}>
                                              <FicheVehiculeAmendeItem  item={am} />
                                      {this.state.amendes_visibles[this.state.amendes_visibles.length - 1].id == am.id ?
                                        <tr style={{ backgroundColor: 'yellow' }}>
                                            <th colSpan="6">Coût Total des amendes : {' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                { formatageSomme( calculSommeColonneSommeAmende(this.state.amendes_visibles) )}
                                                </span> </th>
                                        </tr>
                                        : null}
                                        </React.Fragment>
                                      )}


                                    </tbody>

                                </React.Fragment> : <span>Aucune amende trouvée</span>}




                            </table>
                                    </div>

                                </div> : null }
                            </div>
                        </div> : null}
                            {/* Fin tableau amende */}


                               {/* tableau consommation */}
                               {this.state.type_cout == "3" ?     <div className="row">
                            <div className="col-md-12">
                                {this.state.vehicule ?
                                <div className="main-card mb-3 card">
                                    <div className="card-header">Consommations {this.state.conso_visibles ? this.state.conso_visibles.length : null}
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                               {/*  <button className="active btn btn-focus">Last Week</button>
                                                <button className="btn btn-focus">All Month</button> */}
                                                 <button disabled={!this.state.conso_visibles || !this.state.conso_visibles.length} onClick={this.createP} className="btn-wide btn btn-success">Exporter</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="mb-0 table table-bordered" id="complex-table">
                                    {this.state.vehicule ?
                                     <thead>
                                <tr>
                                    <th colSpan="4" >Vehicule : {this.state.vehicule.immatriculation}</th>
                                    <th colSpan="4" >Fiche de Dépense du {today} </th>
                                 </tr>

                                 <tr>
                                  {this.state.date_conso_1 && this.state.date_conso_2 ? <td >
                                 <strong>Période traitée:  </strong>
                                    du {this.state.date_conso_1 && this.state.date_conso_2 ? moment(this.state.date_conso_1).format('DD/MM/YYYY') + ' au ' + moment(this.state.date_conso_2).format('DD/MM/YYYY')  : null}
                                   </td> : null}


                                </tr>


                                </thead> : null}

                                <tbody>
                                    <tr>
                                    <th>Date </th>
                                    <th >Type de consommation</th>
                                    <th>Conducteur</th>
                                    <th>Quantité</th>
                                    <th >Montant</th>
                                    <th>Tiers</th>

                             </tr>
                                    </tbody>

                                {this.state.conso_visibles && this.state.conso_visibles.length ?

                                <React.Fragment>

                                <tbody>
                                      {this.state.conso_visibles.map(am =>
                                        <React.Fragment key={am.id}>
                                              <FicheVehiculeConsoItem  item={am} />
                                      {this.state.conso_visibles[this.state.conso_visibles.length - 1].id == am.id ?
                                        <tr style={{ backgroundColor: 'yellow' }}>
                                            <th colSpan="6">Coût Total des Consommation : {' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                { formatageSomme( calculSommeColonneSommeConso(this.state.conso_visibles) )}
                                                </span> </th>
                                        </tr>
                                        : null}
                                        </React.Fragment>
                                      )}


                                    </tbody>

                                </React.Fragment> : <span>Aucune Consommation trouvée</span>}




                            </table>
                                    </div>

                                </div> : null }
                            </div>
                        </div> : null}
                            {/* Fin tableau consommations */}


                                 {/* tableau Assurances */}
                                 {this.state.type_cout == "4" ?     <div className="row">
                            <div className="col-md-12">
                                {this.state.vehicule ?
                                <div className="main-card mb-3 card">
                                    <div className="card-header">Contrats d'assurances {this.state.assurances_visibles ? this.state.assurances_visibles.length : null}
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                               {/*  <button className="active btn btn-focus">Last Week</button>
                                                <button className="btn btn-focus">All Month</button> */}
                                                 <button disabled={!this.state.assurances_visibles || !this.state.assurances_visibles.length} onClick={this.createP} className="btn-wide btn btn-success">Exporter</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="mb-0 table table-bordered" id="complex-table">
                                    {this.state.vehicule ?
                                     <thead>
                                <tr>
                                    <th colSpan="4" >Vehicule : {this.state.vehicule.immatriculation}</th>
                                    <th colSpan="4" >Fiche de Dépense du {today} </th>
                                 </tr>

                                 <tr>
                                  {this.state.date_assur_1 && this.state.date_assur_2 ? <td >
                                 <strong>Période traitée:  </strong>
                                    du {this.state.date_assur_1 && this.state.date_assur_2 ? moment(this.state.date_assur_1).format('DD/MM/YYYY') + ' au ' + moment(this.state.date_assur_2).format('DD/MM/YYYY')  : null}
                                   </td> : null}


                                </tr>


                                </thead> : null}

                                <tbody>
                                    <tr>
                                    <th className="">Numero de contrat</th>
                                    <th className="">Compagnie</th>
                                    <th className="">Début</th>

                                    <th className="">Fin</th>
                                    <th>Date Contrat</th>
                                    <th>Effet</th>
                                    <th>Montant franchise</th>

                                    <th>Status</th>

                             </tr>
                                    </tbody>

                                {this.state.assurances_visibles && this.state.assurances_visibles.length ?

                                <React.Fragment>

                                <tbody>
                                      {this.state.assurances_visibles.map(contrat =>
                                        <React.Fragment key={contrat.id}>
                                              <FicheVehiculeAssuranceItem  item={contrat} />
                                      {this.state.assurances_visibles[this.state.assurances_visibles.length - 1].id == contrat.id ?
                                        <tr style={{ backgroundColor: 'yellow' }}>
                                            <th colSpan="6">Coût Total des Franchises : {' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                { formatageSomme( calculSommeColonneSommeAssurance(this.state.assurances_visibles) )}
                                                </span> </th>
                                        </tr>
                                        : null}
                                        </React.Fragment>
                                      )}


                                    </tbody>

                                </React.Fragment> : <span>Aucun Contrat d'assurance trouvé</span>}




                            </table>
                                    </div>

                                </div> : null }
                            </div>
                        </div> : null}
                            {/* Fin tableau Assurances */}

                            {/* les 2 tableaux */}
                                {this.state.type_cout == "2" ? <React.Fragment>

                <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
                    <li className="nav-item">
                        <a role="tab" className="nav-link active" id="tab-0"
                            data-toggle="tab" href="#tab_interventions">
                            <span>Interventions</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-1"
                            data-toggle="tab" href="#tab_amendes">
                            <span>Amendes</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-1"
                            data-toggle="tab" href="#tab_consommations">
                            <span>Consommations</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a href="#tab_assurances" data-toggle="tab" role="tab" className="nav-link">
                            <span>Assurances</span>
                        </a>
                    </li>




                </ul>

                        <div className="tab-content">

                            <div className="tab-pane tabs-animation fade show active" id="tab_interventions" role="tabpanel">
                            <div className="row">
                            <div className="col-md-12">
                                {this.state.vehicule ?
                                <div className="main-card mb-3 card">
                                    <div className="card-header">Interventions correspondantes {this.state.interventions_visibles ? this.state.interventions_visibles.length : null}
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                               {/*  <button className="active btn btn-focus">Last Week</button>
                                                <button className="btn btn-focus">All Month</button> */}
                                                 <button disabled={!this.state.interventions_visibles || !this.state.interventions_visibles.length} onClick={this.createP} className="btn-wide btn btn-success">Exporter</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="mb-0 table table-bordered" id="complex-table">
                                    {this.state.vehicule ?
                                     <thead>
                                <tr>
                                    <th colSpan="4" >Vehicule : {this.state.vehicule.immatriculation}</th>
                                    <th colSpan="4" >Fiche de Dépense du {today} </th>
                                 </tr>

                                 <tr>
                                  {this.state.date_traite1 && this.state.date_traite2 ? <td >
                                 <strong>Période traitée:  </strong>
                                    du {this.state.date_traite1 && this.state.date_traite2 ? moment(this.state.date_traite1).format('DD/MM/YYYY') + ' au ' + moment(this.state.date_traite2).format('DD/MM/YYYY')  : null}
                                   </td> : null}


                                </tr>


                                </thead> : null}

                                <tbody>
                                    <tr>
                                    <th>Date de début</th>
                                    <th className="">Tiers</th>
                                    <th>Nature intervention</th>
                                    <th>Catégorie intervention</th>
                                    <th className="">Coût</th>

                             </tr>
                                    </tbody>

                                {this.state.interventions_visibles && this.state.interventions_visibles.length ?

                                <React.Fragment>

                                <tbody>
                                      {this.state.interventions_visibles.map(inter =>
                                        <React.Fragment key={inter.id}>
                                              <FicheVehiculeItem  item={inter} />
                                      {this.state.interventions_visibles[this.state.interventions_visibles.length - 1].id == inter.id ?
                                        <tr style={{ backgroundColor: 'yellow' }}>
                                            <th colSpan="6">Coût Total des interventions : {' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                { formatageSomme( calculSommeColonneSommeIntervention(this.state.interventions_visibles) )}
                                                </span> </th>
                                        </tr>
                                        : null}
                                        </React.Fragment>
                                      )}


                                    </tbody>

                                </React.Fragment> : <span>Aucune intervention trouvée</span>}




                            </table>
                                    </div>

                                </div> : null }
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane tabs-animation fade show " id="tab_amendes" role="tabpanel">
                            <div className="row">
                            <div className="col-md-12">
                                {this.state.vehicule ?
                                <div className="main-card mb-3 card">
                                    <div className="card-header">Amendes {this.state.amendes_visibles ? this.state.amendes_visibles.length : null}
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                               {/*  <button className="active btn btn-focus">Last Week</button>
                                                <button className="btn btn-focus">All Month</button> */}
                                                 <button disabled={!this.state.amendes_visibles || !this.state.amendes_visibles.length} onClick={this.createP} className="btn-wide btn btn-success">Exporter</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="mb-0 table table-bordered" id="complex-table">
                                    {this.state.vehicule ?
                                     <thead>
                                <tr>
                                    <th colSpan="4" >Vehicule : {this.state.vehicule.immatriculation}</th>
                                    <th colSpan="4" >Fiche de Dépense du {today} </th>
                                 </tr>

                                 <tr>
                                  {this.state.date_amende_1 && this.state.date_amende_2 ? <td >
                                 <strong>Période traitée:  </strong>
                                    du {this.state.date_amende_1 && this.state.date_amende_2 ? moment(this.state.date_amende_1).format('DD/MM/YYYY') + ' au ' + moment(this.state.date_amende_2).format('DD/MM/YYYY')  : null}
                                   </td> : null}


                                </tr>


                                </thead> : null}

                                <tbody>
                                    <tr>
                                    <th>Date </th>
                                    <th >Nature</th>
                                    <th>Conducteur</th>
                                    <th>Lieu</th>
                                    <th >Montant</th>

                             </tr>
                                    </tbody>

                                {this.state.amendes_visibles && this.state.amendes_visibles.length ?

                                <React.Fragment>

                                <tbody>
                                      {this.state.amendes_visibles.map(am =>
                                        <React.Fragment key={am.id}>
                                              <FicheVehiculeAmendeItem  item={am} />
                                      {this.state.amendes_visibles[this.state.amendes_visibles.length - 1].id == am.id ?
                                        <tr style={{ backgroundColor: 'yellow' }}>
                                            <th colSpan="6">Coût Total des amendes : {' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                { formatageSomme( calculSommeColonneSommeAmende(this.state.amendes_visibles) )}
                                                </span> </th>
                                        </tr>
                                        : null}
                                        </React.Fragment>
                                      )}


                                    </tbody>

                                </React.Fragment> : <span>Aucune amende trouvée</span>}




                            </table>
                                    </div>

                                </div> : null }
                            </div>
                        </div>
                    </div>

                    <div className="tab-pane tabs-animation fade show " id="tab_consommations" role="tabpanel">
                    <div className="row">
                            <div className="col-md-12">
                                {this.state.vehicule ?
                                <div className="main-card mb-3 card">
                                    <div className="card-header">Consommations {this.state.conso_visibles ? this.state.conso_visibles.length : null}
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                               {/*  <button className="active btn btn-focus">Last Week</button>
                                                <button className="btn btn-focus">All Month</button> */}
                                                 <button disabled={!this.state.conso_visibles || !this.state.conso_visibles.length} onClick={this.createP} className="btn-wide btn btn-success">Exporter</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="mb-0 table table-bordered" id="complex-table">
                                    {this.state.vehicule ?
                                     <thead>
                                <tr>
                                    <th colSpan="4" >Vehicule : {this.state.vehicule.immatriculation}</th>
                                    <th colSpan="4" >Fiche de Dépense du {today} </th>
                                 </tr>

                                 <tr>
                                  {this.state.date_conso_1 && this.state.date_conso_2 ? <td >
                                 <strong>Période traitée:  </strong>
                                    du {this.state.date_conso_1 && this.state.date_conso_2 ? moment(this.state.date_conso_1).format('DD/MM/YYYY') + ' au ' + moment(this.state.date_conso_2).format('DD/MM/YYYY')  : null}
                                   </td> : null}


                                </tr>


                                </thead> : null}

                                <tbody>
                                    <tr>
                                    <th>Date </th>
                                    <th >Type de consommation</th>
                                    <th>Conducteur</th>
                                    <th>Quantité</th>
                                    <th >Montant</th>
                                    <th>Tiers</th>

                             </tr>
                                    </tbody>

                                {this.state.conso_visibles && this.state.conso_visibles.length ?

                                <React.Fragment>

                                <tbody>
                                      {this.state.conso_visibles.map(am =>
                                        <React.Fragment key={am.id}>
                                              <FicheVehiculeConsoItem  item={am} />
                                      {this.state.conso_visibles[this.state.conso_visibles.length - 1].id == am.id ?
                                        <tr style={{ backgroundColor: 'yellow' }}>
                                            <th colSpan="6">Coût Total des Consommation : {' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                { formatageSomme( calculSommeColonneSommeConso(this.state.conso_visibles) )}
                                                </span> </th>
                                        </tr>
                                        : null}
                                        </React.Fragment>
                                      )}


                                    </tbody>

                                </React.Fragment> : <span>Aucune Consommation trouvée</span>}




                            </table>
                                    </div>

                                </div> : null }
                            </div>
                        </div>
                    </div>


                    <div className="tab-pane tabs-animation fade show " id="tab_assurances" role="tabpanel">

                           {/* tableau Assurances */}
                             <div className="row">
                            <div className="col-md-12">
                                {this.state.vehicule ?
                                <div className="main-card mb-3 card">
                                    <div className="card-header">Contrats d'assurances {this.state.assurances_visibles ? this.state.assurances_visibles.length : null}
                                        <div className="btn-actions-pane-right">
                                            <div role="group" className="btn-group-sm btn-group">
                                               {/*  <button className="active btn btn-focus">Last Week</button>
                                                <button className="btn btn-focus">All Month</button> */}
                                                 <button disabled={!this.state.assurances_visibles || !this.state.assurances_visibles.length} onClick={this.createP} className="btn-wide btn btn-success">Exporter</button>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                    <table className="mb-0 table table-bordered" id="complex-table">
                                    {this.state.vehicule ?
                                     <thead>
                                <tr>
                                    <th colSpan="4" >Vehicule : {this.state.vehicule.immatriculation}</th>
                                    <th colSpan="4" >Fiche de Dépense du {today} </th>
                                 </tr>

                                 <tr>
                                  {this.state.date_assur_1 && this.state.date_assur_2 ? <td >
                                 <strong>Période traitée:  </strong>
                                    du {this.state.date_assur_1 && this.state.date_assur_2 ? moment(this.state.date_assur_1).format('DD/MM/YYYY') + ' au ' + moment(this.state.date_assur_2).format('DD/MM/YYYY')  : null}
                                   </td> : null}


                                </tr>


                                </thead> : null}

                                <tbody>
                                    <tr>
                                    <th className="">Numero de contrat</th>
                                    <th className="">Compagnie</th>
                                    <th className="">Début</th>

                                    <th className="">Fin</th>
                                    <th>Date Contrat</th>
                                    <th>Effet</th>
                                    <th>Montant franchise</th>

                                    <th>Status</th>

                             </tr>
                                    </tbody>

                                {this.state.assurances_visibles && this.state.assurances_visibles.length ?

                                <React.Fragment>

                                <tbody>
                                      {this.state.assurances_visibles.map(contrat =>
                                        <React.Fragment key={contrat.id}>
                                              <FicheVehiculeAssuranceItem  item={contrat} />
                                      {this.state.assurances_visibles[this.state.assurances_visibles.length - 1].id == contrat.id ?
                                        <tr style={{ backgroundColor: 'yellow' }}>
                                            <th colSpan="6">Coût Total des Franchises : {' '}
                                            <span style={{ fontWeight: 'bold' }}>
                                                { formatageSomme( calculSommeColonneSommeAssurance(this.state.assurances_visibles) )}
                                                </span> </th>
                                        </tr>
                                        : null}
                                        </React.Fragment>
                                      )}


                                    </tbody>

                                </React.Fragment> : <span>Aucun Contrat d'assurance trouvé</span>}




                            </table>
                                    </div>

                                </div> : null }
                            </div>
                        </div>
                            {/* Fin tableau Assurances */}


                    </div>

                         </div>





                                </React.Fragment> : null}
                            {/* fin deux tableau */}
                                    </React.Fragment>


                                {/* fin deuxieme row */}

                                {/* troisieme row progressbar */}
                             {/*    <div className="row">
                            <div className="col-md-6 col-lg-3">
                                <div className="card-shadow-danger mb-3 widget-chart widget-chart2 text-left card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left pr-2 fsize-1">
                                                    <div className="widget-numbers mt-0 fsize-3 text-danger">71%</div>
                                                </div>
                                                <div className="widget-content-right w-100">
                                                    <div className="progress-bar-xs progress">
                                                        <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="71" aria-valuemin="0" aria-valuemax="100" style={{width: '71'}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-content-left fsize-1">
                                                <div className="text-muted opacity-6">Income Target</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="card-shadow-success mb-3 widget-chart widget-chart2 text-left card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left pr-2 fsize-1">
                                                    <div className="widget-numbers mt-0 fsize-3 text-success">54%</div>
                                                </div>
                                                <div className="widget-content-right w-100">
                                                    <div className="progress-bar-xs progress">
                                                        <div className="progress-bar bg-success" role="progressbar" aria-valuenow="54" aria-valuemin="0" aria-valuemax="100" style={{width: '54%'}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-content-left fsize-1">
                                                <div className="text-muted opacity-6">Expenses Target</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="card-shadow-warning mb-3 widget-chart widget-chart2 text-left card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left pr-2 fsize-1">
                                                    <div className="widget-numbers mt-0 fsize-3 text-warning">32%</div>
                                                </div>
                                                <div className="widget-content-right w-100">
                                                    <div className="progress-bar-xs progress">
                                                        <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="32" aria-valuemin="0" aria-valuemax="100" style={{width: '32%'}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-content-left fsize-1">
                                                <div className="text-muted opacity-6">Spendings Target</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-3">
                                <div className="card-shadow-info mb-3 widget-chart widget-chart2 text-left card">
                                    <div className="widget-content">
                                        <div className="widget-content-outer">
                                            <div className="widget-content-wrapper">
                                                <div className="widget-content-left pr-2 fsize-1">
                                                    <div className="widget-numbers mt-0 fsize-3 text-info">89%</div>
                                                </div>
                                                <div className="widget-content-right w-100">
                                                    <div className="progress-bar-xs progress">
                                                        <div className="progress-bar bg-info" role="progressbar" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100" style={{width: '89%'}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-content-left fsize-1">
                                                <div className="text-muted opacity-6">Totals Target</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                                {/* fin troisieme row */}

                       </div>
                   </div>


       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        interventions: state.interventions.items,
        vehicules: state.vehicules.items,
        amendes: state.amendes.items,
        consommations: state.consommations.items,
        contrat_assurances: state.contrat_assurances.items,

        loading: state.interventions.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(FicheVehicule)
//export default TypeEntite

