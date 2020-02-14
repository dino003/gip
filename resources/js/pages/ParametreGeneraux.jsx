import React, { Component } from 'react'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EtablissementForm from '../components/parametre_generaux_forms/EtablissementForm'
import ReservationOrdreMissionForm from '../components/parametre_generaux_forms/ReservationOrdreMissionForm'
import {connect} from  'react-redux'
import ModulesForm from '../components/parametre_generaux_forms/ModulesForm';
import StockForm from '../components/parametre_generaux_forms/StockForm';
import PersonnelForm from '../components/parametre_generaux_forms/PersonnelForm';
import JournalEvenementForm from '../components/parametre_generaux_forms/JournalEvenementForm'
import Alerte from '../components/parametre_generaux_forms/Alerte';
import Themes from '../components/parametre_generaux_forms/Themes';
import Vehiculeform from '../components/parametre_generaux_forms/VehiculeForm';



class ParametreGeneraux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpened: false,
            isFormEtablissementSubmitted: false,
            isFormReservationOrdreSubmitted: false,
            isFormModuleSubmitted: false,
            isFormStockSubmitted: false,
            isFormPersonnelSubmitted: false,
            isFormAlerteSubmitted: false,
            isThemsubmit: false,
            isFormVehiculeSubmitted: false

        }
        this.onFormInfoEtablissemntSubmit = this.onFormInfoEtablissemntSubmit.bind(this)
        this.onSubmitModuleForm = this.onSubmitModuleForm.bind(this)
        this.onSubmitParamReservationOrdreMission = this.onSubmitParamReservationOrdreMission.bind(this)
        this.onFormStockSubmit = this.onFormStockSubmit.bind(this)
        this.onFormPersonnelSubmit = this.onFormPersonnelSubmit.bind(this)
        this.onJournalFormSubmit = this.onJournalFormSubmit.bind(this)
        this.onSubmitAlerte = this.onSubmitAlerte.bind(this)
        this.toggleThemeScreen = this.toggleThemeScreen.bind(this);
        this.onThemeChangeSubmit = this.onThemeChangeSubmit.bind(this);
        this.onSubmitParamVehicule = this.onSubmitParamVehicule.bind(this);
    }

    toggleThemeScreen(){
       // e.preventDefault();
        this.setState({
            isOpened: !this.state.isOpened
        })
    }

    onThemeChangeSubmit(nav, sid){

        this.setState({isThemsubmit: true})
        axios.post('/api/ajouter_ou_modifier_theme_defaut', {
            navbar: nav,
            sidebar: sid
        })
        .then(response => {
           const action = {type: "ADD_THEME", value: response.data}
             this.props.dispatch(action)
             this.setState({isThemsubmit: false})
             toast.success('Sauvegardé avec succès', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        }).catch(error => {
            console.log(error)
            this.setState({isThemsubmit: false})
            toast.error('L\'Enregistrement a échoué', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        })

    }

    onSubmitParamVehicule(objet){
        this.setState({isFormVehiculeSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_parametre_vehicules', objet)
        .then(response => {
           const action = {type: "ADD_PARAM_VEHICULE", value: response.data}
             this.props.dispatch(action)
             this.setState({isFormVehiculeSubmitted: false})
             toast.success('Enrégistré avec succès', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        }).catch(error => {
            console.log(error)
            this.setState({isFormVehiculeSubmitted: false})
            toast.error('L\'Enregistrement a échoué', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        })
    }

    onFormInfoEtablissemntSubmit(objet){
        this.setState({isFormEtablissementSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_info_etablissement', objet)
        .then(response => {
           const action = {type: "ADD_INFO_SOCIETE", value: response.data}
             this.props.dispatch(action)
             this.setState({isFormEtablissementSubmitted: false})
             toast.success('Enrégistré avec succès', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        }).catch(error => {
            console.log(error)
            this.setState({isFormEtablissementSubmitted: false})
            toast.error('L\'Enregistrement a échoué', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        })
    }

    onSubmitParamReservationOrdreMission(objet){
        this.setState({isFormReservationOrdreSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_parametre_generaux_reservation_ordre', objet)
        .then(response => {
           const action = {type: "ADD_PARAM_GENERAUX_RESERV", value: response.data}
             this.props.dispatch(action)
             this.setState({isFormReservationOrdreSubmitted: false})
             toast.success('Enrégistré avec succès', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        }).catch(error => {
            console.log(error)
            this.setState({isFormReservationOrdreSubmitted: false})
            toast.error('L\'Enregistrement a échoué', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        })
    }

    onSubmitModuleForm(objet){
           this.setState({isFormModuleSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_parametre_modules', objet)
        .then(response => {
           const action = {type: "ADD_PARAM_MODULE", value: response.data}
             this.props.dispatch(action)
             this.setState({isFormModuleSubmitted: false})
             toast.success('Enrégistré avec succès', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        }).catch(error => {
            console.log(error)
            this.setState({isFormModuleSubmitted: false})
            toast.error('L\'Enregistrement a échoué', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        })
    }

    onSubmitAlerte(objet){
        this.setState({isFormAlerteSubmitted: true})
     axios.post('/api/ajouter_ou_modifier_alertes', objet)
     .then(response => {
        const action = {type: "ADD_PARAM_GENERAUX_ALERTE", value: response.data}
          this.props.dispatch(action)
          this.setState({isFormAlerteSubmitted: false})
          toast.success('Enrégistré avec succès', {
             position: toast.POSITION.BOTTOM_CENTER
           });

     }).catch(error => {
         console.log(error)
         this.setState({isFormAlerteSubmitted: false})
         toast.error('L\'Enregistrement a échoué', {
             position: toast.POSITION.BOTTOM_CENTER
           });

     })
 }

    onFormStockSubmit(objet){
        this.setState({isFormStockSubmitted: true})
     axios.post('/api/ajouter_ou_modifier_parametre_stocks', objet)
     .then(response => {
        const action = {type: "ADD_PARAM_STOCK", value: response.data}
          this.props.dispatch(action)
          this.setState({isFormStockSubmitted: false})
          toast.success('Enrégistré avec succès', {
            position: toast.POSITION.BOTTOM_CENTER
          });

     }).catch(error => {
         console.log(error)
         this.setState({isFormStockSubmitted: false})
         toast.error('L\'Enregistrement a échoué', {
            position: toast.POSITION.BOTTOM_CENTER
          });

     })
 }

        onFormPersonnelSubmit(objet){
            this.setState({isFormPersonnelSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_parametre_personnels', objet)
        .then(response => {
            const action = {type: "ADD_PARAM_PERSONNEL", value: response.data}
            this.props.dispatch(action)
            this.setState({isFormPersonnelSubmitted: false})
            toast.success('Enrégistré avec succès', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        }).catch(error => {
            console.log(error)
            this.setState({isFormPersonnelSubmitted: false})
            toast.error('L\'Enregistrement a échoué', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        })
        }

        onJournalFormSubmit(objet){
            this.setState({isFormJournalSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_parametre_journal', objet)
        .then(response => {
            const action = {type: "ADD_PARAM_JOURNAL", value: response.data}
            this.props.dispatch(action)
            this.setState({isFormJournalSubmitted: false})
            toast.success('Enrégistré avec succès', {
                position: toast.POSITION.BOTTOM_CENTER
              });

        }).catch(error => {
            console.log(error)
            this.setState({isFormJournalSubmitted: false})
            toast.error('L\'Enregistrement a échoué', {
                position: toast.POSITION.BOTTOM_CENTER
              });


        })
        }

    render() {
        return (
            <div className="app-main__inner">

            <div className="">
              <div className="col-md-12">

             <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
                <li className="nav-item">
                    <a role="tab" className="nav-link active" id="tab-0" data-toggle="tab" href="#tab_etablissement">

                        <span>  Etablissement</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a role="tab" className="nav-link " id="tab-0" data-toggle="tab" href="#tab_vehicule">

                        <span>  Véhicules</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab_reservation_ordre_mission">
                        <span>Reservation/Ordres de missions</span>
                    </a>
                </li>
                {/* <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                    <i className="fa fa-car"></i>

                        <span> Véhicules</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Coûts</span>
                    </a>
                </li> */}
                {/* <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Cartes Reservations/Ordres de missions</span>
                    </a>
                </li> */}
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab_stock">
                        <span> Stocks</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab_personnel">
                        <span>Personnel</span>
                    </a>
                </li>
                {/* <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Assurances</span>
                    </a>
                </li> */}
                {/* <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Techniques </span>
                    </a>
                </li> */}
                {/* <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Messagerie</span>
                    </a>
                </li> */}
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab_alertes">
                        <span>Alertes</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab_modules">
                        <span>Modules</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab_journal">
                        <span>Journal événements</span>
                    </a>
                </li>

                <li className="nav-item">
                    <a role="tab" onClick={this.toggleThemeScreen} className="nav-link" id="tab-1" data-toggle="tab" href="#tab_theme">
                        <span>Thèmes</span>
                    </a>
                </li>
                {/* <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li> */}

            </ul>
            <div className="tab-content">

                {/* etablissement */}

                <div className="tab-pane tabs-animation fade show active" id="tab_etablissement" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body">

                           <EtablissementForm
                           item={this.props.info_societe}
                           onFormInfoEtablissemntSubmit={this.onFormInfoEtablissemntSubmit}
                           isFormEtablissementSubmitted={this.state.isFormEtablissementSubmitted}
                             />
                        </div>
                    </div>

                </div>
                {/* fin etablissement */}

                    {/* vehicule */}

                    <div className="tab-pane tabs-animation fade active" id="tab_vehicule" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body">

                           <Vehiculeform
                           item={this.props.param_vehicule}
                           onSubmitParamVehicule={this.onSubmitParamVehicule}
                           isFormVehiculeSubmitted={this.state.isFormVehiculeSubmitted}
                             />
                        </div>
                    </div>

                </div>
                {/* fin vehicule */}

                {/* reservation ordres de missions */}

                <div className="tab-pane tabs-animation fade" id="tab_reservation_ordre_mission" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                         <ReservationOrdreMissionForm
                         item={this.props.param_generaux_reservation_ordre}
                         isFormReservationOrdreSubmitted={this.state.isFormReservationOrdreSubmitted}
                         onSubmitParamReservationOrdreMission={this.onSubmitParamReservationOrdreMission}
                          />
                        </div>
                    </div>
                </div>

                {/* fin reservation ordres de missions */}

                    {/* Alertes */}

                <div className="tab-pane tabs-animation fade" id="tab_alertes" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                         <Alerte
                         item={this.props.param_alerte}
                         isFormAlerteSubmitted={this.state.isFormAlerteSubmitted}
                         onSubmitAlerte={this.onSubmitAlerte}
                          />
                        </div>
                    </div>
                </div>

                {/* fin Alertes */}

                {/* Modules */}
                <div className="tab-pane tabs-animation fade" id="tab_modules" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                         <ModulesForm
                         item={this.props.param_generaux_modules}
                         isFormModuleSubmitted={this.state.isFormModuleSubmitted}
                         onSubmitModuleForm={this.onSubmitModuleForm}
                          />
                        </div>
                    </div>
                </div>
                    {/* fin modules */}

                    {/* stock */}
                    <div className="tab-pane tabs-animation fade" id="tab_stock" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                         <StockForm
                         item={this.props.param_stock}
                         entites={this.props.entites}
                         isFormStockSubmitted={this.state.isFormStockSubmitted}
                         onFormStockSubmit={this.onFormStockSubmit}
                          />
                        </div>
                    </div>
                </div>

                    {/* fin stock */}

                      {/* personnel */}
                      <div className="tab-pane tabs-animation fade" id="tab_personnel" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                         <PersonnelForm
                         item={this.props.param_personnels}
                         isFormPersonnelSubmitted={this.state.isFormPersonnelSubmitted}
                         onFormPersonnelSubmit={this.onFormPersonnelSubmit}
                          />
                        </div>
                    </div>
                </div>

                    {/* fin personnel */}

                       {/* journal */}
                       <div className="tab-pane tabs-animation fade" id="tab_journal" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                         <JournalEvenementForm
                         item={this.props.param_journal}
                         isFormJournalSubmitted={this.state.isFormJournalSubmitted}
                         onJournalFormSubmit={this.onJournalFormSubmit}
                          />
                        </div>
                    </div>
                </div>

                    {/* fin journal */}

            </div>
        </div>
        </div>

        {/* themes pas dans le tab */}
                <Themes isOpened={this.state.isOpened}
                toggleThemeScreen={this.toggleThemeScreen}
                onThemeChangeSubmit={this.onThemeChangeSubmit}
                isThemsubmit={this.state.isThemsubmit}
                 />

        {/* fin theme */}

        <ToastContainer autoClose={4000} />

       </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        info_societe: state.info_societe.items,
        param_vehicule: state.param_vehicule.items,
        param_alerte: state.param_alerte.items,
        param_stock: state.param_stock.items,
        param_personnels: state.param_personnels.items,
        param_journal: state.param_journal.items,
        param_generaux_reservation_ordre: state.param_generaux_reservation_ordre.items,
        param_generaux_modules: state.param_generaux_modules.items,
        entites: state.entites.items

    }
  }

export default connect(mapStateToProps)(ParametreGeneraux)
