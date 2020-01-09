import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import today from '../../../../utils/today';
import moment from 'moment';
import { groupBy, calculSommeColonne, formatageNombre } from '../../../../utils/Repository'
import VehiculeEtatForm from '../../forms/VehiculeEtatForm';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import UtilisationVehiculeEtatForm from '../../forms/UtilisationVehiculeEtatForm';

const red = {
    color: 'red'
}



class UtilisationVehiculeEtat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            show: false,
            isFormOpened: false,
            consommations: [],
            loading: false,
             etatVehiculeUtilisationParVehicule : this.props.utilisations.length ? groupBy(this.props.utilisations, 'vehicule_id') : []
        }

        this.onFormUtilisationSubmit = this.onFormUtilisationSubmit.bind(this)


    }


    componentDidMount() {

    }



    handleChange = (e) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onFormUtilisationSubmit(data){
        this.setState({isFormOpened: false})
        var debut = data.date_comprise_premiere ? Date.parse(data.date_comprise_premiere) : null
        var fin = data.date_comprise_deuxieme ? Date.parse(data.date_comprise_deuxieme) : null

       const resultats = this.props.utilisations.filter(ut => {
           let dateDebutUtili = Date.parse(ut.date_debut_utilisation)
           let dateFinUtili = Date.parse(ut.date_fin_utilisation)
           return  (data.type_vehicule_statut != "Tous" ? ut.vehicule.type_vehicule_statut == data.type_vehicule_statut : ut.vehicule.type_vehicule_statut == "Service" || ut.vehicule.type_vehicule_statut == "Fonction" || ut.vehicule.type_vehicule_statut == "Flotte") 
           &&
        (data.etat_vehicule_status != "Tous" ? ut.vehicule.etat_vehicule_status == data.etat_vehicule_status : ut.vehicule.etat_vehicule_status == "En service" || ut.vehicule.etat_vehicule_status == "Commande" || ut.vehicule.etat_vehicule_status == "Vendu" || ut.vehicule.etat_vehicule_status == "Restitué" || ut.vehicule.etat_vehicule_status == "Sorti") 
         &&
        (data.mode_acquisition != "Tous" ? ut.vehicule.mode_acquisition == data.mode_acquisition : ut.vehicule.mode_acquisition == "0" || ut.vehicule.mode_acquisition == "1" || ut.vehicule.mode_acquisition == "2" || ut.vehicule.mode_acquisition == "4" || ut.vehicule.mode_acquisition =="5" ) 
         &&
        (data.mode_acquisition_type_vehicule != "Tous" ? ut.vehicule.mode_acquisition_type_vehicule == data.mode_acquisition_type_vehicule : ut.vehicule.mode_acquisition_type_vehicule == "Véhicule de la société" || ut.vehicule.mode_acquisition_type_vehicule == "Véhicule personnel" )
         && 
         (debut && fin ? debut >= dateDebutUtili && debut <= dateFinUtili || fin >= dateDebutUtili && fin <= dateFinUtili || debut <= dateDebutUtili && fin >= dateFinUtili : true )
        &&
         (data.vehicule ?  ut.vehicule.id  == data.vehicule : true )
          &&
     (data.chaufeur ? ut.chauffeur.id == data.chaufeur : true )
       &&
       (data.entite_physique ? ut.vehicule.entite_physique ? ut.vehicule.entite_physique.id == data.entite_physique : true : true) 
       &&
      (data.utilisateur ? ut.utilisateur ? ut.utilisateur.id == data.utilisateur : true : true ) 
       }
         
       )

       this.setState({
           etatVehiculeUtilisationParVehicule: groupBy(resultats, 'vehicule_id')
       })
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

        // const etatVehiculeUtilisationParVehicule = this.props.utilisations.length ? groupBy(this.props.utilisations, 'vehicule_id') : []
        const { isFormOpened, etatVehiculeUtilisationParVehicule } = this.state

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
                                        {etatVehiculeUtilisationParVehicule.length ? <React.Fragment>
                                         
                                            {!isFormOpened ? <React.Fragment>
                                                <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des utilisations des véhicules"
                                                sheet="feuille1"
                                                buttonText="Etat -> Excel" />

                                            <button className="mb-2 mr-2 btn-transition btn btn-outline-info" onClick={this.createP}>Etat PDF</button>
                                            
                                            </React.Fragment> : null}
                                          
                                       
                                        </React.Fragment> : null}
                                    </span>
                                </h5>


                                {/* {etatVehiculeUtilisationParVehicule.length ? <React.Fragment> */}

                                {isFormOpened ? <UtilisationVehiculeEtatForm onFormUtilisationSubmit={this.onFormUtilisationSubmit} /> :
                                 
                                 <React.Fragment>
                                     {etatVehiculeUtilisationParVehicule.length ?
                                       <table className="mb-0 table table-bordered " id="export">
                                        {etatVehiculeUtilisationParVehicule.map((etatCourant, index) => <React.Fragment key={index} >
                                            <thead>
                                                <tr >
                                                    <th colSpan="6">{this.props.info_societe ? `${this.props.info_societe.societe.toUpperCase()} Etat Utilisations des véhicules` : 'AGOSOFTPARC Etat Utilisations des véhicules'}</th>
                                                    <th colSpan="2">DATE: {moment(today).format('DD/MM/YYYY')}</th>
                                                    {/* <th colSpan="2">Référence: PA 00058</th> */}
                                                </tr>

                                                <tr style={{ backgroundColor: 'gray' }}>
                                                    <th colSpan="12">Véhicule: {etatCourant[0].vehicule ? etatCourant[0].vehicule.immatriculation : null} </th>
                                                </tr>


                                            </thead>



                                            <tbody>
                                                <tr>
                                                <th >Véhicule</th>

                                                    <th >Date Début</th>
                                                    {/* <th>Heure</th> */}
                                                    <th>Date Fin</th>
                                                    {/* <th>Heure</th> */}
                                                    <th>Kms cmptr</th>
                                                    <th>Kms parcourus </th>
                                                    <th>But de l'utilisation</th>
                                                    <th>Départ</th>
                                                    <th>Destination</th>


                                                </tr>
                                            </tbody>

                                            {etatCourant.map((utilisation, index) => <tbody key={index}>
                                                <tr>
                                                <td >{utilisation.vehicule ? utilisation.vehicule.immatriculation.toUpperCase() : null}</td>

                                                    <td >{moment(utilisation.date_debut_utilisation).format('DD/MM/YYYY')}</td>
                                                    {/* <td>{utilisation.heure_debut.slice(0, 5)}</td> */}
                                                    <td>{moment(utilisation.date_fin_utilisation).format('DD/MM/YYYY')}</td>
                                                    {/* <td>{utilisation.heure_de_fin.slice(0, 5)}</td> */}
                                                    <td>{utilisation.kilometrage_compteur_debut ? formatageNombre(utilisation.kilometrage_compteur_debut) : null}</td>
                                                    <td>{utilisation.kilometres_parcourus ? formatageNombre(utilisation.kilometres_parcourus) : null}</td>
                                                    <td >{utilisation.nature_utilisation ? utilisation.nature_utilisation.libelle : null}</td>
                                                    <td>{utilisation.lieu_depart}</td>
                                                    <td>{utilisation.destination}</td>


                                                </tr>

                                                {etatCourant[etatCourant.length - 1].id == utilisation.id ?
                                                    <tr style={{ backgroundColor: 'yellow' }}>
                                                        <th colSpan="6">Nombre d'utilisations du véhicule <span style={red}><em >{etatCourant[0].vehicule.immatriculation}</em></span> ( {etatCourant.length.toString().length == 1 ? `0${etatCourant.length}` : etatCourant.length} )</th>
                                                        <th colSpan="6"> Kms parcourus Véhicule <span style={{ color: 'red' }}><em>{etatCourant[0].vehicule.immatriculation}</em></span> ({formatageNombre(calculSommeColonne(etatCourant))})</th>

                                                    </tr> : null}

                                            </tbody>)}

                                        </React.Fragment>)}
                                    </table>
                                    : <p style={{ textAlign: 'center' }}><span>
                                    Aucune donnée trouvée
                                     </span> </p>} 
                                  </React.Fragment> 
                                 }

                                
                            
                            
                            
                            
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
        utilisations: state.utilisations.items,


    }
}

export default connect(mapStateToProps)(UtilisationVehiculeEtat)

