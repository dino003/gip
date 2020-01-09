import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import today from '../../../../utils/today';
import moment from 'moment';
import { groupBy, calculSommeColonne, formatageNombre, formatageSomme } from '../../../../utils/Repository'
import VehiculeEtatForm from '../../forms/VehiculeEtatForm';

import jsPDF from 'jspdf';
import 'jspdf-autotable';



class VehiculesEtat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            show: false,
            isFormOpened: false,
            consommations: [],
            loading: false,
            vehs: this.props.vehicules

        }

        this.onFormVehiculeEtatSubmit = this.onFormVehiculeEtatSubmit.bind(this)
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

    createP = () => {

        var doc = new jsPDF('l', 'pt', 'a3');

        doc.autoTable({
            html: '#export',
           // theme: 'grid'
        });
        window.open(doc.output('bloburl'), '_blank')



    }

    onFormVehiculeEtatSubmit(data) {
        this.setState({ isFormOpened: false })
        var debut = data.date_entree_au_parc1 ? Date.parse(data.date_entree_au_parc1) : null
        var fin = data.date_entree_au_parc2 ? Date.parse(data.date_entree_au_parc2) : null

        const resultats = this.props.vehicules.filter(ut => {
            let date_entreeParc = Date.parse(ut.date_entree_au_parc)
            return (data.type_vehicule_statut != "Tous" ? ut.type_vehicule_statut == data.type_vehicule_statut : ut.type_vehicule_statut == "Service" || ut.type_vehicule_statut == "Fonction" || ut.type_vehicule_statut == "Flotte")
                &&
                (data.etat_vehicule_status != "Tous" ? ut.etat_vehicule_status == data.etat_vehicule_status : ut.etat_vehicule_status == "En service" || ut.etat_vehicule_status == "Commande" || ut.etat_vehicule_status == "Vendu" || ut.etat_vehicule_status == "Restitué" || ut.etat_vehicule_status == "Sorti")
                &&
                (data.mode_acquisition != "Tous" ? ut.mode_acquisition == data.mode_acquisition : ut.mode_acquisition == "0" || ut.mode_acquisition == "1" || ut.mode_acquisition == "2" || ut.mode_acquisition == "4" || ut.mode_acquisition == "5")
                &&
                (data.mode_acquisition_type_vehicule != "Tous" ? ut.mode_acquisition_type_vehicule == data.mode_acquisition_type_vehicule : ut.mode_acquisition_type_vehicule == "Véhicule de la société" || ut.mode_acquisition_type_vehicule == "Véhicule personnel")
                &&
                (debut && fin ? debut <= date_entreeParc && date_entreeParc <= fin : true)
                &&
                (data.marque ? ut.marque.id == data.marque : true)
                &&
                (data.tiers ? ut.tiers.id == data.tiers : true)
                &&
                (data.assureur ? ut.contrat_assurance ? ut.contrat_assurance.compagnie_assurance.id == data.assureur : true : true)
                &&
                (data.entite_physique ? ut.entite_physique ? ut.entite_physique.id == data.entite_physique : true : true)
                &&
                (data.entite_comptable ? ut.entite_comptable ? ut.entite_comptable.id == data.entite_comptable : true : true)
                &&
                (data.modele ? ut.modele == data.modele : true)
        }

        )

        this.setState({
            vehs: resultats
        })
    }



    toggleForm = () => {
        this.setState({ isFormOpened: !this.state.isFormOpened })
    }



    render() {

        //const vehs = this.props.vehicules
        const info_societe = this.props.info_societe
        // const vehicules = vehs.sort(function (a, b) {
        //     // Turn your strings into dates, and then subtract them
        //     // to get a value that is either negative, positive, or zero.
        //     return new Date(b.date_entree_au_parc) - new Date(a.date_entree_au_parc);
        // });
        const { isFormOpened, vehs } = this.state

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
                                        {!isFormOpened && vehs.length ? <React.Fragment>

                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des véhicules du parc"
                                                sheet="feuille1"
                                                buttonText="Etat -> Excel" />

                                            <button className="mb-2 mr-2 btn-transition btn btn-outline-info" onClick={this.createP}>Etat PDF</button>
                                        </React.Fragment> : null}
                                    </span>
                                </h5>



                                {/* {vehs.length ? <React.Fragment> */}
                                {isFormOpened ?

                                    <VehiculeEtatForm onFormVehiculeEtatSubmit={this.onFormVehiculeEtatSubmit} /> :


                                    <React.Fragment>
                                        {vehs.length ?
                                        <table className="mb-0 table table-bordered " id="export">

                                            <thead>
                                                <tr >
                                                    <th colSpan="6">{info_societe ? info_societe.societe.toUpperCase() : 'AGOSOFTPARC' + 'Véhicules'}</th>
                                                    <th colSpan="2">DATE: {moment(today).format('DD/MM/YYYY')}</th>
                                                    {/* <th colSpan="2">Référence: PA 00058</th> */}
                                                </tr>

                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <th>Date d'Entrée</th>

                                                    <th>Immatriculation</th>
                                                    <th>Type</th>
                                                    <th>Catégorie</th>

                                                    <th>Acquisition</th>
                                                    <th>Détenteur</th>
                                                    <th>Marque</th>

                                                    <th>Kms compteur</th>

                                                    {/* <th>Modèle</th>
                                                        <th>Couleur</th>
                                                        <th>Chauffeur</th>
                                                        <th>Acquis le</th>
                                                        <th>N° de carte grise</th>
                                                        <th>Nb CV</th>
                                                        <th>Energie</th>
                                                        <th>N° de série</th>
                                                        <th>N° de moteur</th>
                                                        <th>N° contrat assurance</th>
                                                        <th>Assureur</th>
                                                        <th>Prime assurance</th>
                                                        <th>Franchise</th> */}


                                                </tr>
                                            </tbody>



                                            <tbody>
                                                {vehs.map((item) =>
                                                    <React.Fragment key={item.id}>
                                                        <tr >
                                                            <td >{item.date_entree_au_parc ? moment(item.date_entree_au_parc).format('DD/MM/YYYY') : ''}</td>

                                                            <td >{item.immatriculation || ''}</td>
                                                            <td >{item.type_vehicule_statut || ''}</td>
                                                            <td >{item.categorie ? item.categorie.nom_type : ''}</td>

                                                            <td >{item.mode_acquisition == "0" ? 'Achat' : item.mode_acquisition == "1" ? 'Leasing' : 'Prêt'}</td>
                                                            <td >{item.detenteur ? `${item.detenteur.nom} ${item.detenteur.prenom.slice(0, 10)}` : 'PERSONNE PAR DEFAUT'}</td>

                                                            <td >{item.marque ? item.marque.nom_marque : ''}</td>
                                                            <td >{item.kilometrage_acquisition || ''}</td>


                                                        </tr>
                                                        {vehs[vehs.length - 1].id == item.id ?
                                                            <tr style={{ backgroundColor: 'yellow' }}>
                                                                <th colSpan="6">Nombre de véhicules <span style={{ color: 'red' }}><em>( {vehs.length.toString().length == 1 ? `0${vehs.length}` : vehs.length} )</em></span> </th>
                                                            </tr>
                                                            : null}

                                                        {/* //     <tr key={item.id}>
                                                            //     <td>{item.entite_comptable ? item.entite_comptable.nom_entite : ''}</td>
                                                            //     <td>{item.immatriculation || ''}</td>
                                                            //     <td>{item.type_vehicule_statut || ''}</td>
                                                            //     <td>{item.mode_acquisition == "0" ? 'Achat' : item.mode_acquisition == "1" ? 'Leasing' : 'Prêt'}</td>
                                                            //     <td>{item.marque ? item.marque.nom_marque : ''}</td>
                                                            //     <td>{item.modele || ''}</td>
                                                            //     <td>{item.tech_couleur || ''}</td>
                                                            //     <td>{item.detenteur ? `${item.detenteur.nom} ${item.detenteur.prenom.slice(0, 10)}` : ''}</td>
                                                            //     <td>{item.chauffeur_atitre ? `${item.chauffeur_atitre.nom} ${item.chauffeur_atitre.prenom.slice(0, 10)}` : ''}</td>
                                                            //     <td>{item.categorie.nom_type || ''}</td>
                                                            //     <td>{item.date_entree_au_parc ? moment(item.date_entree_au_parc).format('DD/MM/YYYY') : ''}</td>

                                                            //     <td>{item.numero_carte_grise || ''}</td>
                                                            //     <td>{item.kilometrage_acquisition || ''}</td>
                                                            //     <td>{item.tech_chevaux_fiscaux || ''}</td>
                                                            //     <td>{item.energie ? item.energie.nom_energie : ''}</td>
                                                            //     <td>{item.tech_numero_serie || ''}</td>
                                                            //     <td>{item.tech_numero_moteur || ''}</td>
                                                            //     <td>{item.contrat_assurance ? item.contrat_assurance.numero_contrat_police : 'Neant'}</td>
                                                            //     <td>{item.contrat_assurance ? item.contrat_assurance.compagnie_assurance ? item.contrat_assurance.compagnie_assurance.code : '' : ''}</td>
                                                            //     <td>{item.contrat_assurance ? item.contrat_assurance.montant_prime ? formatageSomme(item.contrat_assurance.montant_prime) : '' : ''}</td>
                                                            //     <td>{item.contrat_assurance ? item.contrat_assurance.montant_franchise ? formatageSomme(item.contrat_assurance.montant_franchise) : '' : ''}</td>

                                                            // </tr> */}
                                                    </React.Fragment>

                                                )}

                                            </tbody>



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



            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        utilisations: state.utilisations.items,
        vehicules: state.vehicules.items,
        info_societe: state.info_societe.items,

        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
}

export default connect(mapStateToProps)(VehiculesEtat)

