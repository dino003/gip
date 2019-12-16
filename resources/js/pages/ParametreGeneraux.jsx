import React, { Component } from 'react'
import EtablissementForm from '../components/parametre_generaux_forms/EtablissementForm'
import ReservationOrdreMissionForm from '../components/parametre_generaux_forms/ReservationOrdreMissionForm'
import {connect} from  'react-redux'
import ModulesForm from '../components/parametre_generaux_forms/ModulesForm';
import StockForm from '../components/parametre_generaux_forms/StockForm';
import PersonnelForm from '../components/parametre_generaux_forms/PersonnelForm';
import JournalEvenementForm from '../components/parametre_generaux_forms/JournalEvenementForm'

class ParametreGeneraux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormEtablissementSubmitted: false,
            isFormReservationOrdreSubmitted: false,
            isFormModuleSubmitted: false,
            isFormStockSubmitted: false,
            isFormPersonnelSubmitted: false 
 
        }
        this.onFormInfoEtablissemntSubmit = this.onFormInfoEtablissemntSubmit.bind(this)
        this.onSubmitModuleForm = this.onSubmitModuleForm.bind(this)
        this.onSubmitParamReservationOrdreMission = this.onSubmitParamReservationOrdreMission.bind(this)
        this.onFormStockSubmit = this.onFormStockSubmit.bind(this)
        this.onFormPersonnelSubmit = this.onFormPersonnelSubmit.bind(this)
        this.onJournalFormSubmit = this.onJournalFormSubmit.bind(this)
    }

    onFormInfoEtablissemntSubmit(objet){
        this.setState({isFormEtablissementSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_info_etablissement', objet)
        .then(response => { 
           const action = {type: "ADD_INFO_SOCIETE", value: response.data}
             this.props.dispatch(action)
             this.setState({isFormEtablissementSubmitted: false})

        }).catch(error => {
            console.log(error)
            this.setState({isFormEtablissementSubmitted: false})

        })
    }

    onSubmitParamReservationOrdreMission(objet){
        this.setState({isFormReservationOrdreSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_parametre_generaux_reservation_ordre', objet)
        .then(response => { 
           const action = {type: "ADD_PARAM_GENERAUX_RESERV", value: response.data}
             this.props.dispatch(action)
             this.setState({isFormReservationOrdreSubmitted: false})

        }).catch(error => {
            console.log(error)
            this.setState({isFormReservationOrdreSubmitted: false})

        })
    }
    
    onSubmitModuleForm(objet){
           this.setState({isFormModuleSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_parametre_modules', objet)
        .then(response => { 
           const action = {type: "ADD_PARAM_MODULE", value: response.data}
             this.props.dispatch(action)
             this.setState({isFormModuleSubmitted: false})

        }).catch(error => {
            console.log(error)
            this.setState({isFormModuleSubmitted: false})

        })
    }

    onFormStockSubmit(objet){
        this.setState({isFormStockSubmitted: true})
     axios.post('/api/ajouter_ou_modifier_parametre_stocks', objet)
     .then(response => { 
        const action = {type: "ADD_PARAM_STOCK", value: response.data}
          this.props.dispatch(action)
          this.setState({isFormStockSubmitted: false})

     }).catch(error => {
         console.log(error)
         this.setState({isFormStockSubmitted: false})

     })
 }

        onFormPersonnelSubmit(objet){
            this.setState({isFormPersonnelSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_parametre_personnels', objet)
        .then(response => { 
            const action = {type: "ADD_PARAM_PERSONNEL", value: response.data}
            this.props.dispatch(action)
            this.setState({isFormPersonnelSubmitted: false})

        }).catch(error => {
            console.log(error)
            this.setState({isFormPersonnelSubmitted: false})

        })
        }

        onJournalFormSubmit(objet){
            this.setState({isFormJournalSubmitted: true})
        axios.post('/api/ajouter_ou_modifier_parametre_journal', objet)
        .then(response => { 
            const action = {type: "ADD_PARAM_JOURNAL", value: response.data}
            this.props.dispatch(action)
            this.setState({isFormJournalSubmitted: false})

        }).catch(error => {
            console.log(error)
            this.setState({isFormJournalSubmitted: false})

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
                    <i className="fa fa-home"></i> 

                        <span>  Etablissement</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab_reservation_ordre_mission">
                        <span>Reservation/Ordres de missions</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                    <i className="fa fa-car"></i> 

                        <span> Véhicules</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Coûts</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Cartes Reservations/Ordres de missions</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab_stock">
                        <i className="fa fa-times"></i> 
                        <span> Stocks</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab_personnel">
                        <span>Personnel</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Assurances</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Techniques </span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Messagerie</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Alerte 1</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Alerte 2</span>
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
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li>
             
            </ul>
            <div className="tab-content">
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
       </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        info_societe: state.info_societe.items,
        param_stock: state.param_stock.items,
        param_personnels: state.param_personnels.items,
        param_journal: state.param_journal.items,
        param_generaux_reservation_ordre: state.param_generaux_reservation_ordre.items,
        param_generaux_modules: state.param_generaux_modules.items,
        entites: state.entites.items

    }
  }

export default connect(mapStateToProps)(ParametreGeneraux)
