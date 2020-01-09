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
        }


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
       
        var doc= new jsPDF('l', 'pt', 'a3');

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

        const vehs = this.props.vehicules
        const info_societe = this.props.info_societe
        const vehicules = vehs.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date_entree_au_parc) - new Date(a.date_entree_au_parc);
        });
        const { isFormOpened } = this.state

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

                                        {vehs.length ? <React.Fragment>
                                            <button title={!isFormOpened ? 'Affinner' : 'Revenir aux Etats'}
                                                className={!isFormOpened ? 'mb-2 mr-2 btn-transition btn btn-outline-primary' : 'mb-2 mr-2 btn-transition btn btn-outline-warning'}
                                                onClick={this.toggleForm}
                                            >
                                                <i className={!isFormOpened ? 'fa fa-plus' : 'fa fa-times'}></i> {' '}

                                                {!isFormOpened ? 'Affinner' : 'Quitter'}
                                            </button>



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



                                {vehs.length ? <React.Fragment>
                                    {isFormOpened ?

                                        <VehiculeEtatForm /> :


                                        <div className="">


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
                                                    {vehicules.map((item) =>
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
                                                          {vehicules[vehicules.length - 1].id == item.id ?
                                                            <tr style={{ backgroundColor: 'yellow' }}>
                                                                <th colSpan="6">Nombre de véhicules <span style={{ color: 'red' }}><em>( {vehicules.length.toString().length == 1 ? `0${vehicules.length}` : vehicules.length} )</em></span> </th>
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






                                            </table>





                                        </div>}
                                </React.Fragment> : <p style={{ textAlign: 'center' }}><span>
                                    Aucune donnée trouvée
                                    </span> </p>}



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

