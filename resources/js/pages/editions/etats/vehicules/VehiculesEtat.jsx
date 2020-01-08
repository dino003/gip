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
        // const vehicules = this.props.vehicules.sort(function (a, b) {
        //     // Turn your strings into dates, and then subtract them
        //     // to get a value that is either negative, positive, or zero.
        //     return new Date(b.date_entree_au_parc) - new Date(a.date_entree_au_parc);
        // });
        // var doc= new jsPDF('l', 'pt', 'a0');
        //  var res = doc.autoTableHtmlToJson(document.getElementById("export"));


        //  doc.autoTable(res.columns, res.data, {
        //     margin: {top: 40, horizontal: 10}, startY: false, theme: 'grid', pageBreak: 
        //    'always', tableWidth: 'auto', columnWidth: 'wrap', showHeader: 'everyPage',
        //     tableLineColor: 200, tableLineWidth: 0,
        //     columnStyles: {
        //     0: {columnWidth: 'auto'}, 1: {columnWidth: 'auto'}, 2: {columnWidth: 'auto'}, 3: 
        //         {columnWidth: 'auto'}, 4: {columnWidth: 'auto'},
        //     5: {columnWidth: 'auto'}, 6: {columnWidth: 'auto'}, 7: {columnWidth: 'auto'}, 8: 
        //         {columnWidth: 'auto'}, 9: {columnWidth: 'auto'}, 10: {columnWidth: 'auto'}, 11: {columnWidth: 'auto'}
        //     },
        //     headerStyles: {theme: 'grid'},
        //     styles: {overflow: 'linebreak', columnWidth: 'wrap', font: 'arial', fontSize: 10, 
        //     cellPadding: 8, overflowColumns: 'linebreak'},
        //     });

      //  var res = doc.autoTableHtmlToJson(document.getElementById("export"));
    //     doc.autoTable(res.columns, res.data, {
    //     startY: doc.autoTableEndPosY() + 40,
    //     margin: {horizontal: 20},
    //     styles: {overflow: 'linebreak', font: 'arial', fontSize: 10, cellPadding: 8},
    //     headerStyles: {fillColor: [65, 85, 99], valign: 'middle'},
    //     bodyStyles: {valign: 'middle', fillColor: [255, 255, 255]}
    // });
        // var json = doc.autoTableHtmlToJson(document.getElementById("export"));
       
        // var cols = [], data = [];

        // for (let i = 0; i < vehicules.length; i++) {
        //     var row = json[i];
        //      var newRow = [];   
        //      console.log(row)
        //      return;
        //      for (let i = 0; i < vehicules.length; i++) {
                
        //         if (row.hasOwnProperty(key)) {
        //             if(i === 0) {
        //                 cols.push(key);
        //             }
        //             newRow.push(row[key]);
        //         }
        //      }
        //      data.push(newRow);

        // }
        // doc.autoTable(cols, data, {startY: 60});

        // doc.autoTable({
        //     html: '#export',
        //     theme: 'grid',
        //     columnStyles: {
        //         0: {columnWidth: 100},
        //         1: {columnWidth: 80},
        //         2: {columnWidth: 80},
        //         3: {columnWidth: 80},
        //         4: {columnWidth: 80},
        //         5: {columnWidth: 80},
        //         6: {columnWidth: 80},
        //         7: {columnWidth: 80},
        //         8: {columnWidth: 80},
        //         9: {columnWidth: 80},
        //         10: {columnWidth: 80},
        //         11: {columnWidth: 80},
        //         12: {columnWidth: 80},

        //         // etc
        //       }
        // });
        //doc.autoTable({startY: 30, head: this.headRows(), body: this.bodyRows(25)});
        //   for (var j = 0; j < etatVehiculeUtilisationParVehicule.length; j++) {
        //     doc.autoTable({
        //       //  head: headRows(), 
        //         head: [['Date de Début', 'Heure', 'Date de fin', 'Heure', 'Kms cmptr', 'Kms Parcourus', 'But de l\'utilisation', 'Départ', 'Destination']],
        //         body: etatVehiculeUtilisationParVehicule[0],
        //         startY: doc.autoTable.previous.finalY + 10,
        //         pageBreak: 'avoid',
        //     });
        // }
        //  doc.save('table.pdf');
        //  doc.output('dataurlnewwindow');
        // doc.output('datauri');              //opens the data uri in current window

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
                                                buttonText="Ecran -> Excel" />

                                            <button className="mb-2 mr-2 btn-transition btn btn-outline-info" onClick={this.createP}>Imprimer</button>
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

