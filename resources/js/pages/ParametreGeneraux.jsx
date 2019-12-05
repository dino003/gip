import React, { Component } from 'react'
import EtablissementForm from '../components/parametre_generaux_forms/EtablissementForm'
import ReservationOrdreMissionForm from '../components/parametre_generaux_forms/ReservationOrdreMissionForm'
import {connect} from  'react-redux'

class ParametreGeneraux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFormEtablissementSubmitted: false,
            isFormReservationOrdreSubmitted: false 
 
        }
        this.onFormInfoEtablissemntSubmit = this.onFormInfoEtablissemntSubmit.bind(this)

        this.onSubmitParamReservationOrdreMission = this.onSubmitParamReservationOrdreMission.bind(this)
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
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <i className="fa fa-times"></i> 
                        <span> Stocks</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
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
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
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
                         onSubmitParamReservationOrdreMission={this.onSubmitParamReservationOrdreMission}
                          />
                        </div>
                    </div>
                </div>
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
        param_generaux_reservation_ordre: state.param_generaux_reservation_ordre.items
    }
  }

export default connect(mapStateToProps)(ParametreGeneraux)
