import React, { Component } from 'react'
import { connect } from 'react-redux'

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import today from '../../../../utils/today';
import moment from 'moment';
import { groupBy, calculSommeColonne, formatageNombre, formatageSomme, calculSommeColonneSommeIntervention } from '../../../../utils/Repository'
import VehiculeEtatForm from '../../forms/VehiculeEtatForm';

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ConsommationVehiculeEtatForm from '../../forms/ConsommationVehiculeEtatForm';

const red = {
    color: 'red'
}

 const calculSommeColonneConsommation = (tableau) => {
    return tableau.reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.montant_ttc || 0), 0)
  } 





class ConsommationVehiculeEtat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            show: false,
            isFormOpened: false,
            consommations: [],
            loading: false,
         etatVehiculeConsommation: this.props.consommations.length ? groupBy(this.props.consommations, 'vehicule_id') : []

        }
        this.onFormConsommationSubmit = this.onFormConsommationSubmit.bind(this)


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
        // console.log(etatVehiculeConsommation[0])
        // var doc = new jsPDF('l');
        var doc = new jsPDF('l', 'pt', 'a3');

        doc.autoTable({
            html: '#export',
            theme: 'grid'
        });
        //doc.autoTable({startY: 30, head: this.headRows(), body: this.bodyRows(25)});
        //   for (var j = 0; j < etatVehiculeConsommation.length; j++) {
        //     doc.autoTable({
        //       //  head: headRows(), 
        //         head: [['Date de Début', 'Heure', 'Date de fin', 'Heure', 'Kms cmptr', 'Kms Parcourus', 'But de l\'utilisation', 'Départ', 'Destination']],
        //         body: etatVehiculeConsommation[0],
        //         startY: doc.autoTable.previous.finalY + 10,
        //         pageBreak: 'avoid',
        //     });
        // }
        //  doc.save('table.pdf');
        //  doc.output('dataurlnewwindow');
        // doc.output('datauri');              //opens the data uri in current window
        window.open(doc.output('bloburl'), '_blank')



    }

    onFormConsommationSubmit(data){
        this.setState({isFormOpened: false})
        var entreeAuParcPremiere = data.date_entree_comprise_premiere ? Date.parse(data.date_entree_comprise_premiere) : null
        var entreeAuParcDeuxieme = data.date_entree_comprise_deuxieme ? Date.parse(data.date_entree_comprise_deuxieme) : null

        var dateConsoPremiere = data.date_conso_comprise_premiere ? Date.parse(data.date_conso_comprise_premiere) : null
        var dateConsoDeuxieme = data.date_conso_comprise_deuxieme ? Date.parse(data.date_conso_comprise_deuxieme) : null

       const resultats = this.props.consommations.filter(ut => {
           let dateEntreeParc = Date.parse(ut.vehicule.date_entree_au_parc)
           let dateConso = Date.parse(ut.date_conso)
           return  (data.type_vehicule_statut != "Tous" ? ut.vehicule.type_vehicule_statut == data.type_vehicule_statut : ut.vehicule.type_vehicule_statut == "Service" || ut.vehicule.type_vehicule_statut == "Fonction" || ut.vehicule.type_vehicule_statut == "Flotte") 
           &&
        (data.etat_vehicule_status != "Tous" ? ut.vehicule.etat_vehicule_status == data.etat_vehicule_status : ut.vehicule.etat_vehicule_status == "En service" || ut.vehicule.etat_vehicule_status == "Commande" || ut.vehicule.etat_vehicule_status == "Vendu" || ut.vehicule.etat_vehicule_status == "Restitué" || ut.vehicule.etat_vehicule_status == "Sorti") 
         &&
        (data.mode_acquisition != "Tous" ? ut.vehicule.mode_acquisition == data.mode_acquisition : ut.vehicule.mode_acquisition == "0" || ut.vehicule.mode_acquisition == "1" || ut.vehicule.mode_acquisition == "2" || ut.vehicule.mode_acquisition == "4" || ut.vehicule.mode_acquisition =="5" ) 
         &&
        (data.mode_acquisition_type_vehicule != "Tous" ? ut.vehicule.mode_acquisition_type_vehicule == data.mode_acquisition_type_vehicule : ut.vehicule.mode_acquisition_type_vehicule == "Véhicule de la société" || ut.vehicule.mode_acquisition_type_vehicule == "Véhicule personnel" )
         && 
         (entreeAuParcPremiere && entreeAuParcDeuxieme ? entreeAuParcPremiere <= dateEntreeParc && dateEntreeParc <= entreeAuParcDeuxieme  : true )
         && 
         (dateConsoPremiere && dateConsoDeuxieme ? dateConsoPremiere <= dateConso && dateConso <= dateConsoDeuxieme  : true )
         &&
         (data.vehicule ?  ut.vehicule.id  == data.vehicule : true )
          &&
     (data.conducteur ? ut.conducteur ? ut.conducteur.id == data.conducteur : true : true )
       &&
       (data.entite_physique ? ut.vehicule.entite_physique ? ut.vehicule.entite_physique.id == data.entite_physique : true : true) 
       &&
      (data.tiers ? ut.tiers ? ut.tiers.id == data.tiers : true : true ) 
      &&
      (data.type_consomation ? ut.type_consomation ? ut.type_consomation.id == data.type_consomation : true : true )
      &&
      (data.marque ? ut.vehicule.marque ? ut.vehicule.marque.id == data.marque : true : true )
      &&
      (data.energie ? ut.vehicule.energie ? ut.vehicule.energie.id == data.energie : true : true )
      &&
      (data.numero_carte ?  ut.numero_carte  == data.numero_carte : true )
      &&
      (data.numero_conducteur ?  ut.numero_conducteur  == data.numero_conducteur : true )

    }
         
       )

       this.setState({
        etatVehiculeConsommation: groupBy(resultats, 'vehicule_id')
       })
    }



    toggleForm = () => {
        this.setState({ isFormOpened: !this.state.isFormOpened })
    }



    render() {

       // const etatVehiculeConsommation = this.props.consommations.length ? groupBy(this.props.consommations, 'vehicule_id') : []
        // const etatVehiculeConsommation = etats.sort(function (a, b) {
        //     // Turn your strings into dates, and then subtract them
        //     // to get a value that is either negative, positive, or zero.
        //     return new Date(a.date_conso) - new Date(b.date_conso);
        // });
        const { isFormOpened, etatVehiculeConsommation } = this.state

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
                                            {etatVehiculeConsommation.length ? <React.Fragment>
                                        
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



                                {isFormOpened ? <ConsommationVehiculeEtatForm onFormConsommationSubmit={this.onFormConsommationSubmit} /> :
                                    <React.Fragment>
                                        {etatVehiculeConsommation.length ?
                                         <table className="mb-0 table table-bordered " id="export">
                                        {etatVehiculeConsommation.map((etatCourant, index) => <React.Fragment key={index} >
                                            <thead>
                                                <tr >
                                                    <th colSpan="6">{this.props.info_societe ? `${this.props.info_societe.societe.toUpperCase()} Etat Consommations des véhicules` : 'AGOSOFTPARC Etat Consommations des véhicules'}</th>
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
                                                    <th>Type</th>
                                                    <th>Date </th>
                                                    <th>Libellé Consommation</th>
                                                    <th>Kms cptr </th>
                                                    <th>Quantité </th>
                                                    <th>Coûts TTC</th>
                                                    <th>Tiers</th>



                                                </tr>
                                            </tbody>

                                            {etatCourant.map((conso, index) => <tbody key={index}>
                                                <tr>
                                                <td >{conso.vehicule ? conso.vehicule.immatriculation : null}</td>
                                                <td >{conso.type_consomation ? conso.type_consomation.nature_consomation : null}</td>
                                                    <td>{ conso.date_conso ? moment(conso.date_conso).format('DD/MM/YYYY') : null}</td>
                                                    <td >{conso.libelle ? conso.libelle : null}</td>
                                                    <td>{conso.kilometrage_au_compteur ? formatageNombre(conso.kilometrage_au_compteur) : null}</td>
                                                    <td >{conso.quantite_consomee ? formatageNombre(conso.quantite_consomee)  : null}</td>
                                                    <td >{conso.montant_ttc ? formatageSomme(conso.montant_ttc)  : null}</td>

                                                    <td >{conso.tiers ? conso.tiers.code : null}</td>
                                                   
                                                </tr>

                                                {etatCourant[etatCourant.length - 1].id == conso.id ?
                                                    <tr style={{ backgroundColor: 'yellow' }}>
                                                        <th colSpan="6">Nombre de ligne de consommations du véhicule <span style={red}><em >{etatCourant[0].vehicule.immatriculation}</em></span> ( {etatCourant.length.toString().length == 1 ? `0${etatCourant.length}` : etatCourant.length} )</th>
                                                        <th colSpan="6"> Coût Total <span style={{ color: 'red' }}><em>{etatCourant[0].vehicule.immatriculation}</em></span> ({formatageSomme(calculSommeColonneConsommation(etatCourant))})</th>

                                                    </tr> : null}

                                            </tbody>)}

                                        </React.Fragment>)}
                                    </table> : <p style={{ textAlign: 'center' }}><span>
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
        consommations: state.consommations.items,


    }
}

export default connect(mapStateToProps)(ConsommationVehiculeEtat)

