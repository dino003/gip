import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import today from '../../../../utils/today';
import moment from 'moment';
import { groupBy, calculSommeColonne, formatageNombre, formatageSomme, calculSommeColonneSommeIntervention } from '../../../../utils/Repository'
import VehiculeEtatForm from '../../forms/VehiculeEtatForm';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import InterventionVehiculeEtatForm from '../../forms/InterventionVehiculeEtatForm';

const red = {
    color: 'red'
}





class InterventionVehiculeEtat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            show: false,
            isFormOpened: false,
            consommations: [],
            loading: false,
             etatVehiculeInterventionParVehicule : this.props.interventions.length ? groupBy(this.props.interventions, 'vehicule_id') : []

        }

        this.onFormInterventionEtatSubmit = this.onFormInterventionEtatSubmit.bind(this)


    }


    componentDidMount() {

    }

    onFormInterventionEtatSubmit(data){
        this.setState({isFormOpened: false})
     
        var dateInterventionComprisePremiere = data.date_debut_intervention_comprise_premiere ? Date.parse(data.date_debut_intervention_comprise_premiere) : null
        var dateInterventionCompriseDeuxieme = data.date_debut_intervention_comprise_deuxieme ? Date.parse(data.date_debut_intervention_comprise_deuxieme) : null

       const resultats = this.props.interventions.filter(ut => {
           let date_debut_intervention = Date.parse(ut.date_debut)
           return  (data.type_vehicule_statut != "Tous" ? ut.vehicule.type_vehicule_statut == data.type_vehicule_statut : ut.vehicule.type_vehicule_statut == "Service" || ut.vehicule.type_vehicule_statut == "Fonction" || ut.vehicule.type_vehicule_statut == "Flotte") 
           &&
        (data.etat_vehicule_status != "Tous" ? ut.vehicule.etat_vehicule_status == data.etat_vehicule_status : ut.vehicule.etat_vehicule_status == "En service" || ut.vehicule.etat_vehicule_status == "Commande" || ut.vehicule.etat_vehicule_status == "Vendu" || ut.vehicule.etat_vehicule_status == "Restitué" || ut.vehicule.etat_vehicule_status == "Sorti") 
         &&
        (data.mode_acquisition != "Tous" ? ut.vehicule.mode_acquisition == data.mode_acquisition : ut.vehicule.mode_acquisition == "0" || ut.vehicule.mode_acquisition == "1" || ut.vehicule.mode_acquisition == "2" || ut.vehicule.mode_acquisition == "4" || ut.vehicule.mode_acquisition =="5" ) 
         &&
        (data.mode_acquisition_type_vehicule != "Tous" ? ut.vehicule.mode_acquisition_type_vehicule == data.mode_acquisition_type_vehicule : ut.vehicule.mode_acquisition_type_vehicule == "Véhicule de la société" || ut.vehicule.mode_acquisition_type_vehicule == "Véhicule personnel" )
         && 
         (data.categorie_intervention != "Tous" ? ut.nature_intervention.categorie == data.categorie_intervention : ut.nature_intervention.categorie == "Rappel constructeur" || ut.nature_intervention.categorie == "Divers" || ut.nature_intervention.categorie == "Matériel/Consomable" || ut.nature_intervention.categorie == "Rep.Sinistre" || ut.nature_intervention.categorie == "Réparation" || ut.nature_intervention.categorie == "Entretien" )
         && 
        
         (dateInterventionComprisePremiere && dateInterventionCompriseDeuxieme ? dateInterventionComprisePremiere <= date_debut_intervention && date_debut_intervention <= dateInterventionCompriseDeuxieme  : true )
         &&
         (data.vehicule ?  ut.vehicule.id  == data.vehicule : true )
          &&
     
       (data.entite_physique ? ut.vehicule.entite_physique ? ut.vehicule.entite_physique.id == data.entite_physique : true : true) 
       &&
      (data.tiers ? ut.tiers ? ut.tiers.id == data.tiers : true : true ) 
      &&
      (data.nature_intervention ? ut.nature_intervention ? ut.nature_intervention.id == data.nature_intervention : true : true )
  
    }
         
       )

       this.setState({
        etatVehiculeInterventionParVehicule: groupBy(resultats, 'vehicule_id')
       })
    }



    handleChange = (e) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    createP = () => {
       
        var doc = new jsPDF('l', 'pt', 'a3');

        doc.autoTable({
            html: '#export',
            theme: 'grid'
        });
       
        window.open(doc.output('bloburl'), '_blank')



    }



    toggleForm = () => {
        this.setState({ isFormOpened: !this.state.isFormOpened })
    }



    render() {

       // const etatVehiculeInterventionParVehicule = this.props.interventions.length ? groupBy(this.props.interventions, 'vehicule_id') : []

        const { isFormOpened, etatVehiculeInterventionParVehicule } = this.state

        return (
            <div className="">
                <br /><br /><br /><br />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="main-card mb-3 card">
                            <div className="card-body ">
                                <h5 className="card-title">
                                    <span className="pull-right">
                                        <button className="mb-2 mr-2 btn-transition btn btn-outline-warning" onClick={() => this.props.history.goBack()}>Retour</button>
                                        <button title={!isFormOpened ? 'Affinner' : 'Revenir aux Etats'}
                                                className={!isFormOpened ? 'mb-2 mr-2 btn-transition btn btn-outline-primary' : 'mb-2 mr-2 btn-transition btn btn-outline-warning'}
                                                onClick={this.toggleForm}
                                            >
                                                <i className={!isFormOpened ? 'fa fa-plus' : 'fa fa-times'}></i> {' '}

                                                {!isFormOpened ? 'Affinner' : 'Quitter'}
                                            </button>
                                        {!isFormOpened && etatVehiculeInterventionParVehicule.length ? <React.Fragment>
                        
                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des interventions des véhicules"
                                                sheet="feuille1"
                                                buttonText="Etat -> Excel" />

                                            <button className="mb-2 mr-2 btn-transition btn btn-outline-info" onClick={this.createP}>Etat PDF</button>
                                        </React.Fragment> : null}
                                    </span>
                                </h5>


                                {/* {etatVehiculeInterventionParVehicule.length ? <React.Fragment> */}

                                {isFormOpened ? <InterventionVehiculeEtatForm onFormInterventionEtatSubmit={this.onFormInterventionEtatSubmit} /> :
                                    <React.Fragment>
                                        {etatVehiculeInterventionParVehicule.length ?
                                         <table className="mb-0 table table-bordered " id="export">
                                        {etatVehiculeInterventionParVehicule.map((etatCourant, index) => <React.Fragment key={index} >
                                            <thead>
                                                <tr >
                                                    <th colSpan="6">{this.props.info_societe ? `${this.props.info_societe.societe.toUpperCase()} Etat Interventions sur les véhicules` : 'AGOSOFTPARC Etat Interventions sur les véhicules'}</th>
                                                    <th colSpan="2">DATE: {moment(today).format('DD/MM/YYYY')}</th>
                                                    {/* <th colSpan="2">Référence: PA 00058</th> */}
                                                </tr>

                                                <tr style={{ backgroundColor: 'gray' }}>
                                                    <th colSpan="12">Véhicule: {etatCourant[0].vehicule ? etatCourant[0].vehicule.immatriculation : null} </th>
                                                </tr>


                                            </thead>



                                            <tbody>
                                                <tr>
                                                <th >Véhicule </th>

                                                    <th >Type </th>
                                                    <th>Marque</th>
                                                    <th>Date </th>
                                                    <th>Intervention</th>
                                                    <th>Kms </th>
                                                    <th>Tiers </th>
                                                    <th>Coûts</th>
                                                   


                                                </tr>
                                            </tbody>

                                            {etatCourant.map((intervention, index) => <tbody key={index}>
                                                <tr>
                                                <td >{intervention.vehicule ? intervention.vehicule.immatriculation.toUpperCase() : null}</td>

                                                <td >{intervention.vehicule ? intervention.vehicule.type_vehicule_statut : null}</td>
                                                <td >{intervention.marque ? intervention.marque.nom_marque : null}</td>
                                                    <td>{ intervention.date_debut ? moment(intervention.date_debut).format('DD/MM/YYYY') : null}</td>
                                                    <td >{intervention.nature_intervention ? intervention.nature_intervention.nom_intervention : null}</td>
                                                    <td>{intervention.kilometrage ? formatageNombre(intervention.kilometrage) : null}</td>
                                                    <td >{intervention.tiers ? intervention.tiers.code : null}</td>
                                                    <td >{intervention.cout_ttc_intervention ? formatageSomme(intervention.cout_ttc_intervention)  : null}</td>
                                                   
                                                </tr>

                                                {etatCourant[etatCourant.length - 1].id == intervention.id ?
                                                    <tr style={{ backgroundColor: 'yellow' }}>
                                                        <th colSpan="6">Nombre d'interventions du véhicule <span style={red}><em >{etatCourant[0].vehicule.immatriculation}</em></span> ( {etatCourant.length.toString().length == 1 ? `0${etatCourant.length}` : etatCourant.length} )</th>
                                                        <th colSpan="6"> Coût Total <span style={{ color: 'red' }}><em>{etatCourant[0].vehicule.immatriculation}</em></span> ({formatageSomme(calculSommeColonneSommeIntervention(etatCourant))})</th>

                                                    </tr> : null}

                                            </tbody>)}

                                        </React.Fragment>)}
                                    </table> : <p style={{ textAlign: 'center' }}><span>
                                            Aucune donnée trouvée
                                    </span> </p>}
                                    </React.Fragment>
                                   }

                                    {/* </React.Fragment> : <p style={{ textAlign: 'center' }}><span>
                                            Aucune donnée trouvée
                                    </span> </p>} */}
                            
                            
                            
                            
                            </div>
                    </div>
                </div>
            </div>



            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        info_societe: state.info_societe.items,
        interventions: state.interventions.items,


    }
}

export default connect(mapStateToProps)(InterventionVehiculeEtat)

