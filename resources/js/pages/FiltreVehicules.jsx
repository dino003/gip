import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Select from 'react-select';


import '../components/table.css'
import VehiculeFiltreItem from '../components/vehicules/VehiculeFiltreItem'
import { formatageNombre, formatageSomme } from '../utils/Repository';
import moment from 'moment';

const calculSommeColonneKilometrageVehicule = (tableau) => {
    return tableau.reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.kilometrage_acquisition || 0), 0)
  }

   const calculSommeColonneCoutAchat = (tableau) => {
    return tableau.filter(elm => elm.mode_acquisition == 0).reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.acquisition_achat_prix_ttc || 0), 0)
  }

  const calculSommeColonneCoutLeasing = (tableau) => {
    return tableau.filter(elm => elm.mode_acquisition == 1).reduce( (prec, curr) =>  parseFloat(prec) + (parseFloat(curr.acquisition_leasing_apport_initial || 0) + parseFloat(curr.acquisition_leasing_deja_paye || 0) + parseFloat(curr.acquisition_leasing_loyer_mensuel || 0) ), 0)
  }


  const calculSommeColonneCoutTotalFranchise = (tableau) => {
    return tableau.reduce( (prec, curr) =>  parseFloat(prec) + parseFloat(curr.contrat_assurance ? curr.contrat_assurance.montant_franchise || 0 : 0), 0)
  }

class FiltreVehicules extends Component {


    constructor(props) {
        super(props);

        this.state = {
            vehicules_visibles_actuelement: this.props.vehicules,
            obj: undefined,
            marque: null,
            entite_physique: null,
            tiers: null,
            mode_acquisition: "Tous",
            type_vehicule_statut: "Tous",
            modele: null,
            date_entree_au_parc1: null,
            date_entree_au_parc2: null,
            entite_comptable: null,
            assureur: null,
            contrat_assurance: null,
            affectation_geographique_id: [],
            affectation_organisationnel_id: [],
            premier_niveau_geographique: null,
            deuxieme_niveau_geographique: null,
            troisieme_niveau_geographique: null,
            quatrieme_niveau_geographique: null,
            cinquieme_niveau_geographique: null,
            sixieme_niveau_geographique: null,
            premier_niveau_vehicule: null,
            deuxieme_niveau_vehicule: null,
            troisieme_niveau_vehicule: null,
            quatrieme_niveau_vehicule: null,
            cinquieme_niveau_vehicule: null,
            sixieme_niveau_vehicule: null,
            premier_niveau_organisa: null,
            deuxieme_niveau_organisa: null,
            troisieme_niveau_organisa: null,
            quatrieme_niveau_organisa: null,
            cinquieme_niveau_organisa: null,
            sixieme_niveau_organisa: null


        }


        this.searchChange = this.searchChange.bind(this)
        this.changeState = this.changeState.bind(this)
        this.filtrerVehicule = this.filtrerVehicule.bind(this)
    }

    // componentWillUnmount(){
    //     const action = {type: "ADD_CODE_INCIDENT", value: response.this.state}
    //     this.props.dispatch(action)    }

    setFieldSelect(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj, () => this.filtrerVehicule());
    }

    setFieldLesPlanGeographiques(name, value) {
        let obj = {};
        obj[name] = value;
        this.setState(obj, () => this.checkOtherStateGeographique());
    }

    setFieldLesPlanVehicules(name, value) {
        let obj = {};
        obj[name] = value;
        this.setState(obj, () => this.checkOtherStateVehicules());
    }

    checkOtherStateVehicules(){
        if(this.state.premier_niveau_vehicule == null){
            this.setState({
                deuxieme_niveau_vehicule: null,
                troisieme_niveau_vehicule: null,
                quatrieme_niveau_vehicule: null,
                cinquieme_niveau_vehicule: null,
                sixieme_niveau_vehicule: null
            }, () => this.filtrerVehicule() )
        }else if(this.state.deuxieme_niveau_vehicule == null){
            this.setState({
               // deuxieme_niveau_vehicule: null,
                troisieme_niveau_vehicule: null,
                quatrieme_niveau_vehicule: null,
                cinquieme_niveau_vehicule: null,
                sixieme_niveau_vehicule: null
            }, () => this.filtrerVehicule() )
        }else if(this.state.troisieme_niveau_vehicule == null){
            this.setState({
               // deuxieme_niveau_vehicule: null,
               // troisieme_niveau_vehicule: null,
                quatrieme_niveau_vehicule: null,
                cinquieme_niveau_vehicule: null,
                sixieme_niveau_vehicule: null
            }, () => this.filtrerVehicule() )
        }else if(this.quatrieme_niveau_vehicule == null){
            this.setState({
               // deuxieme_niveau_vehicule: null,
               // troisieme_niveau_vehicule: null,
               // quatrieme_niveau_vehicule: null,
                cinquieme_niveau_vehicule: null,
                sixieme_niveau_vehicule: null
            }, () => this.filtrerVehicule() )
        }else if(this.state.cinquieme_niveau_vehicule == null){
            this.setState({
               // deuxieme_niveau_vehicule: null,
              //  troisieme_niveau_vehicule: null,
              //  quatrieme_niveau_vehicule: null,
               // cinquieme_niveau_vehicule: null,
                sixieme_niveau_vehicule: null
            }, () => this.filtrerVehicule() )
        }
    }

    checkOtherStateGeographique(){
        if(this.state.premier_niveau_geographique == null){
            this.setState({
                deuxieme_niveau_geographique: null,
                troisieme_niveau_geographique: null,
                quatrieme_niveau_geographique: null,
                cinquieme_niveau_geographique: null,
                sixieme_niveau_geographique: null
            }, () => this.filtrerVehicule() )
        }else if(this.state.deuxieme_niveau_geographique == null){
            this.setState({
               // deuxieme_niveau_geographique: null,
                troisieme_niveau_geographique: null,
                quatrieme_niveau_geographique: null,
                cinquieme_niveau_geographique: null,
                sixieme_niveau_geographique: null
            }, () => this.filtrerVehicule() )
        }else if(this.state.troisieme_niveau_geographique == null){
            this.setState({
               // deuxieme_niveau_geographique: null,
               // troisieme_niveau_geographique: null,
                quatrieme_niveau_geographique: null,
                cinquieme_niveau_geographique: null,
                sixieme_niveau_geographique: null
            }, () => this.filtrerVehicule() )
        }else if(this.quatrieme_niveau_geographique == null){
            this.setState({
               // deuxieme_niveau_geographique: null,
               // troisieme_niveau_geographique: null,
               // quatrieme_niveau_geographique: null,
                cinquieme_niveau_geographique: null,
                sixieme_niveau_geographique: null
            }, () => this.filtrerVehicule() )
        }else if(this.state.cinquieme_niveau_geographique == null){
            this.setState({
               // deuxieme_niveau_geographique: null,
              //  troisieme_niveau_geographique: null,
              //  quatrieme_niveau_geographique: null,
               // cinquieme_niveau_geographique: null,
                sixieme_niveau_geographique: null
            }, () => this.filtrerVehicule() )
        }
    }

    setFieldLesPlansOrga(name, value) {
        let obj = {};
        obj[name] = value;
        this.setState(obj, () => this.checkOtherStateOrga());
    }

    checkOtherStateOrga(){
        if(this.state.premier_niveau_organisa == null){
            this.setState({
                deuxieme_niveau_organisa: null,
                troisieme_niveau_organisa: null,
                quatrieme_niveau_organisa: null,
                cinquieme_niveau_organisa: null,
                sixieme_niveau_organisa: null
            }, () => this.filtrerVehicule() )
        }else if(this.state.deuxieme_niveau_organisa == null){
            this.setState({
               // deuxieme_niveau_organisa: null,
                troisieme_niveau_organisa: null,
                quatrieme_niveau_organisa: null,
                cinquieme_niveau_organisa: null,
                sixieme_niveau_organisa: null
            }, () => this.filtrerVehicule() )
        }else if(this.state.troisieme_niveau_organisa == null){
            this.setState({
               // deuxieme_niveau_organisa: null,
               // troisieme_niveau_organisa: null,
                quatrieme_niveau_organisa: null,
                cinquieme_niveau_organisa: null,
                sixieme_niveau_organisa: null
            }, () => this.filtrerVehicule() )
        }else if(this.quatrieme_niveau_organisa == null){
            this.setState({
               // deuxieme_niveau_organisa: null,
               // troisieme_niveau_organisa: null,
               // quatrieme_niveau_organisa: null,
                cinquieme_niveau_organisa: null,
                sixieme_niveau_organisa: null
            }, () => this.filtrerVehicule() )
        }else if(this.state.cinquieme_niveau_organisa == null){
            this.setState({
               // deuxieme_niveau_organisa: null,
              //  troisieme_niveau_organisa: null,
              //  quatrieme_niveau_organisa: null,
               // cinquieme_niveau_organisa: null,
                sixieme_niveau_organisa: null
            }, () => this.filtrerVehicule() )
        }
    }

    getIdsUtilisations = () => {
        const events = [];
        this.props.vehicules.map(event => {
            return events.push(event.modele)
        })

        return events
    }


    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.filtrerVehicule());
    }

    searchChange(search) {

        let vehicules_visibles_maintenant = this.props.vehicules.filter(vehicule => vehicule.immatriculation.includes(search.toLowerCase()))
        this.setState({
            vehicules_visibles_actuelement: vehicules_visibles_maintenant
        })
    }

   /*  fplan(){
        let i = 0;
        let tableau_derniers_niveaux = [];
        let element_courant = null;
        let end_boucle = 6;

        const events = [];
        element_courant.children.map(event => {
            if(event.vehicules){

            }
        })

        return events

    } */

    changeState() {
        this.setState({
            vehicules_visibles_actuelement: this.props.vehicules

        })
    }

    getIdOfPlanGeo(){
        const events = [];
        this.state.affectation_geographique_id.map(event => {
            return events.push(event.id)
        })

        return events
    }

    getIdOfPlanOrga(){
        const events = [];
        this.state.affectation_organisationnel_id.map(event => {
            return events.push(event.id)
        })

        return events
    }




    renderLoading() {
        return <span style={{ textAlign: 'center' }}>

            <Loader

                height={500}
                width={300}
            />
        </span>
    }

    renderEmpty() {
        return <span style={{ textAlign: 'center', color: 'red' }}>
            Aucun véhicule trouvé !
        </span>
    }

    filtrerVehicule(){
        //console.log(this.state.affectation_geographique_id)

        var debut = this.state.date_entree_au_parc1 ? Date.parse(this.state.date_entree_au_parc1) : null
        var fin = this.state.date_entree_au_parc2 ? Date.parse(this.state.date_entree_au_parc2) : null

        const resultats = this.props.vehicules.filter(ut => {
            let date_entreeParc = Date.parse(ut.date_entree_au_parc)
            return (this.state.type_vehicule_statut != "Tous" ? ut.type_vehicule_statut == this.state.type_vehicule_statut : ut.type_vehicule_statut == "Service" || ut.type_vehicule_statut == "Fonction" || ut.type_vehicule_statut == "Flotte")
                &&
                (this.state.mode_acquisition != "Tous" ? ut.mode_acquisition == this.state.mode_acquisition : ut.mode_acquisition == "0" || ut.mode_acquisition == "1" || ut.mode_acquisition == "2" || ut.mode_acquisition == "4" || ut.mode_acquisition == "5")
                &&
                (debut && fin ? debut <= date_entreeParc && date_entreeParc <= fin : true)
                &&
                ( this.state.premier_niveau_geographique ? this.state.deuxieme_niveau_geographique ? this.state.troisieme_niveau_geographique ? this.state.quatrieme_niveau_geographique ? this.state.cinquieme_niveau_geographique ? this.state.sixieme_niveau_geographique ? this.props.plan_geographiques.filter(pl => pl.niveau_1 == this.state.premier_niveau_geographique.id && pl.niveau_2 == this.state.deuxieme_niveau_geographique.id && pl.niveau_3 == this.state.troisieme_niveau_geographique.id && pl.niveau_4 == this.state.quatrieme_niveau_geographique.id && pl.niveau_5 == this.state.cinquieme_niveau_geographique.id && pl.niveau_6 == this.state.sixieme_niveau_geographique.id).map(elm => elm.id).includes(ut.affectation_geographique_id) : this.props.plan_geographiques.filter(pl => pl.niveau_1 == this.state.premier_niveau_geographique.id && pl.niveau_2 == this.state.deuxieme_niveau_geographique.id && pl.niveau_3 == this.state.troisieme_niveau_geographique.id && pl.niveau_4 == this.state.quatrieme_niveau_geographique.id && pl.niveau_5 == this.state.cinquieme_niveau_geographique.id).map(elm => elm.id).includes(ut.affectation_geographique_id) : this.props.plan_geographiques.filter(pl => pl.niveau_1 == this.state.premier_niveau_geographique.id && pl.niveau_2 == this.state.deuxieme_niveau_geographique.id && pl.niveau_3 == this.state.troisieme_niveau_geographique.id && pl.niveau_4 == this.state.quatrieme_niveau_geographique.id).map(elm => elm.id).includes(ut.affectation_geographique_id) : this.props.plan_geographiques.filter(pl => pl.niveau_1 == this.state.premier_niveau_geographique.id && pl.niveau_2 == this.state.deuxieme_niveau_geographique.id && pl.niveau_3 == this.state.troisieme_niveau_geographique.id).map(elm => elm.id).includes(ut.affectation_geographique_id) : this.props.plan_geographiques.filter(pl => pl.niveau_1 == this.state.premier_niveau_geographique.id && pl.niveau_2 == this.state.deuxieme_niveau_geographique.id).map(elm => elm.id).includes(ut.affectation_geographique_id)  : this.props.plan_geographiques.filter(pl => pl.niveau_1 == this.state.premier_niveau_geographique.id).map(elm => elm.id).includes(ut.affectation_geographique_id) : true )
                &&
                ( this.state.premier_niveau_organisa ? this.state.deuxieme_niveau_organisa ? this.state.troisieme_niveau_organisa ? this.state.quatrieme_niveau_organisa ? this.state.cinquieme_niveau_organisa ? this.state.sixieme_niveau_organisa ? this.props.plan_organisationnels.filter(pl => pl.niveau_1 == this.state.premier_niveau_organisa.id && pl.niveau_2 == this.state.deuxieme_niveau_organisa.id && pl.niveau_3 == this.state.troisieme_niveau_organisa.id && pl.niveau_4 == this.state.quatrieme_niveau_organisa.id && pl.niveau_5 == this.state.cinquieme_niveau_organisa.id && pl.niveau_6 == this.state.sixieme_niveau_organisa.id).map(elm => elm.id).includes(ut.affectation_organisationnel_id) : this.props.plan_organisationnels.filter(pl => pl.niveau_1 == this.state.premier_niveau_organisa.id && pl.niveau_2 == this.state.deuxieme_niveau_organisa.id && pl.niveau_3 == this.state.troisieme_niveau_organisa.id && pl.niveau_4 == this.state.quatrieme_niveau_organisa.id && pl.niveau_5 == this.state.cinquieme_niveau_organisa.id).map(elm => elm.id).includes(ut.affectation_organisationnel_id) : this.props.plan_organisationnels.filter(pl => pl.niveau_1 == this.state.premier_niveau_organisa.id && pl.niveau_2 == this.state.deuxieme_niveau_organisa.id && pl.niveau_3 == this.state.troisieme_niveau_organisa.id && pl.niveau_4 == this.state.quatrieme_niveau_organisa.id).map(elm => elm.id).includes(ut.affectation_organisationnel_id) : this.props.plan_organisationnels.filter(pl => pl.niveau_1 == this.state.premier_niveau_organisa.id && pl.niveau_2 == this.state.deuxieme_niveau_organisa.id && pl.niveau_3 == this.state.troisieme_niveau_organisa.id).map(elm => elm.id).includes(ut.affectation_organisationnel_id) : this.props.plan_organisationnels.filter(pl => pl.niveau_1 == this.state.premier_niveau_organisa.id && pl.niveau_2 == this.state.deuxieme_niveau_organisa.id).map(elm => elm.id).includes(ut.affectation_organisationnel_id)  : this.props.plan_organisationnels.filter(pl => pl.niveau_1 == this.state.premier_niveau_organisa.id).map(elm => elm.id).includes(ut.affectation_organisationnel_id) : true )
                &&
                ( this.state.premier_niveau_vehicule ? this.state.deuxieme_niveau_vehicule ? this.state.troisieme_niveau_vehicule ? this.state.quatrieme_niveau_vehicule ? this.state.cinquieme_niveau_vehicule ? this.state.sixieme_niveau_vehicule ? this.props.plan_vehicules.filter(pl => pl.niveau_1 == this.state.premier_niveau_vehicule.id && pl.niveau_2 == this.state.deuxieme_niveau_vehicule.id && pl.niveau_3 == this.state.troisieme_niveau_vehicule.id && pl.niveau_4 == this.state.quatrieme_niveau_vehicule.id && pl.niveau_5 == this.state.cinquieme_niveau_vehicule.id && pl.niveau_6 == this.state.sixieme_niveau_vehicule.id).map(elm => elm.id).includes(ut.plan_vehicule_id) : this.props.plan_vehicules.filter(pl => pl.niveau_1 == this.state.premier_niveau_vehicule.id && pl.niveau_2 == this.state.deuxieme_niveau_vehicule.id && pl.niveau_3 == this.state.troisieme_niveau_vehicule.id && pl.niveau_4 == this.state.quatrieme_niveau_vehicule.id && pl.niveau_5 == this.state.cinquieme_niveau_vehicule.id).map(elm => elm.id).includes(ut.plan_vehicule_id) : this.props.plan_vehicules.filter(pl => pl.niveau_1 == this.state.premier_niveau_vehicule.id && pl.niveau_2 == this.state.deuxieme_niveau_vehicule.id && pl.niveau_3 == this.state.troisieme_niveau_vehicule.id && pl.niveau_4 == this.state.quatrieme_niveau_vehicule.id).map(elm => elm.id).includes(ut.plan_vehicule_id) : this.props.plan_vehicules.filter(pl => pl.niveau_1 == this.state.premier_niveau_vehicule.id && pl.niveau_2 == this.state.deuxieme_niveau_vehicule.id && pl.niveau_3 == this.state.troisieme_niveau_vehicule.id).map(elm => elm.id).includes(ut.plan_vehicule_id) : this.props.plan_vehicules.filter(pl => pl.niveau_1 == this.state.premier_niveau_vehicule.id && pl.niveau_2 == this.state.deuxieme_niveau_vehicule.id).map(elm => elm.id).includes(ut.plan_vehicule_id)  : this.props.plan_vehicules.filter(pl => pl.niveau_1 == this.state.premier_niveau_vehicule.id).map(elm => elm.id).includes(ut.plan_vehicule_id) : true )

                &&
                (this.state.marque ? ut.marque.id == this.state.marque.id : true)
                &&
                (this.state.tiers ? ut.tiers.id == this.state.tiers.id : true)
                &&
                (this.state.assureur ? ut.contrat_assurance ? ut.contrat_assurance.compagnie_assurance.id == this.state.assureur.id : true : true)
                &&
                (this.state.entite_physique ? ut.entite_physique ? ut.entite_physique.id == this.state.entite_physique.id : true : true)
                &&
                (this.state.contrat_assurance ? ut.contrat_assurance ? ut.contrat_assurance.id == this.state.contrat_assurance.id : true : true)
                &&
                (this.state.entite_comptable ? ut.entite_comptable ? ut.entite_comptable.id == this.state.entite_comptable.id : true : true)
                &&
                (this.state.modele ? ut.modele.toLowerCase().includes(this.state.modele.toLowerCase()) : true)
        }

        )

        this.setState({
            vehicules_visibles_actuelement: resultats
        })

    }

    renderList() {
        const { vehicules_visibles_actuelement } = this.state
        return (<table className=" table" id="table-to-xls" >
            <thead>
                <tr>
                <th className="sticky-col first-col">Immatriculation</th>

                    <th className="sticky-col second-col">Affecté a</th>

                    <th className="sticky-col third-col">Type</th>
                    <th className="sticky-col thour-col">Acquisition</th>
                    <th>Modèle</th>
{/*                     <th>Modèle</th>
 */}                    <th>Couleur</th>
                    <th>Détenteur</th>
                    <th>Chauffeur</th>
{/*                     <th>Catégorie</th>
 */}                    <th>Acquis le</th>
                    <th>N° de carte grise</th>
                    <th>Kms compteur</th>
                    <th>Nb CV</th>
                    <th>Energie</th>
                    <th>N° de série</th>
                    <th>N° de moteur</th>
                    <th>N° contrat assurance</th>
                    <th>Assureur</th>
                    <th>Prime assurance</th>
                    <th>Franchise</th>


                </tr>
            </thead>
            <tbody>

                {vehicules_visibles_actuelement.map((item) =>
                    <VehiculeFiltreItem
                        key={item.id}

                        item={item} />
                )}
            </tbody>
        </table>)
    }

    // debut vehicules plan et structures


    getNiveauxPlanVehicules = () => {
        const events = [];
        this.props.structure_vehicules.map(event => {
            if(!event.niveau) return;
            return events.push(event.niveau)
        })

        return events
    }

    getMaximumNiveauPlanVehicule = () => {
        var niveau = Math.max(...this.getNiveauxPlanVehicules())
        if (niveau == 0) return 1;
        return Number(niveau );

    }

    getStructureVehiculeDernierNiveau = () => {
        if(!this.getPlanVehiculesDerniersNiveau().length) return undefined;
        else{
            return this.props.structure_vehicules.find(st => st.niveau == this.getPlanVehiculesDerniersNiveau()[0].structure_vehicule.niveau)
        }
    }

    getPlanVehiculesDerniersNiveau = () => {
        return this.props.plan_vehicules.filter(elm => elm.structure_vehicule ? elm.structure_vehicule.niveau == this.getMaximumNiveauPlanVehicule() : false)
    }



    getStructureVehiculePremierNiveau = () => {
        return this.props.structure_vehicules.find(st => st.niveau == 1) || null

   }


   getStructureVehiculeDeuxiemeNiveau = () => {

           return this.props.structure_vehicules.find(st => st.niveau == 2) || null

   }

   getStructureVehiculeTroisiemeNiveau = () => {

       return this.props.structure_vehicules.find(st => st.niveau == 3) || null

   }

   getStructureVehiculeQuatriemeNiveau = () => {

       return this.props.structure_vehicules.find(st => st.niveau == 4) || null

   }

   getStructureVehiculeCinquiemeNiveau = () => {

       return this.props.structure_vehicules.find(st => st.niveau == 5) || null

   }

   getStructureVehiculeSixiemeNiveau = () => {

       return this.props.structure_vehicules.find(st => st.niveau == 6) || null

   }

   // fin vehicules



    getNiveauxPlanGeographiques = () => {
        const events = [];
        this.props.structure_geographiques.map(event => {
            if(!event.niveau) return;
            return events.push(event.niveau)
        })

        return events
    }

    getMaximumNiveauPlanGeographique = () => {
        var niveau = Math.max(...this.getNiveauxPlanGeographiques())
        if (niveau == 0) return 1;
        return Number(niveau );

    }

    getStructureGeographiqueDernierNiveau = () => {
        if(!this.getPlanGeographiquesDerniersNiveau().length) return undefined;
        else{
            return this.props.structure_geographiques.find(st => st.niveau == this.getPlanGeographiquesDerniersNiveau()[0].structure_geographique.niveau)
        }
    }

    getPlanGeographiquesDerniersNiveau = () => {
        return this.props.plan_geographiques.filter(elm => elm.structure_geographique ? elm.structure_geographique.niveau == this.getMaximumNiveauPlanGeographique() : false)
    }



    getStructureGeographiquePremierNiveau = () => {
        return this.props.structure_geographiques.find(st => st.niveau == 1) || null

   }


   getStructureGeographiqueDeuxiemeNiveau = () => {

           return this.props.structure_geographiques.find(st => st.niveau == 2) || null

   }

   getStructureGeographiqueTroisiemeNiveau = () => {

       return this.props.structure_geographiques.find(st => st.niveau == 3) || null

   }

   getStructureGeographiqueQuatriemeNiveau = () => {

       return this.props.structure_geographiques.find(st => st.niveau == 4) || null

   }

   getStructureGeographiqueCinquiemeNiveau = () => {

       return this.props.structure_geographiques.find(st => st.niveau == 5) || null

   }

   getStructureGeographiqueSixiemeNiveau = () => {

       return this.props.structure_geographiques.find(st => st.niveau == 6) || null

   }




   getNiveauxPlanOrga = () => {
    const events = [];
    this.props.structure_organisationnelles.map(event => {
        if(!event.niveau) return;
        return events.push(event.niveau)
    })

    return events
}

    getMaximumNiveauPlanOrga = () => {
        var niveau = Math.max(...this.getNiveauxPlanOrga(), 0)
        if (niveau == 0) return 1;
        return Number(niveau );

    }

    getStructureOrganisationnellePremierNiveau = () => {
         return this.props.structure_organisationnelles.find(st => st.niveau == 1) || null

    }


    getStructureOrganisationnelleDeuxiemeNiveau = () => {

            return this.props.structure_organisationnelles.find(st => st.niveau == 2) || null

    }

    getStructureOrganisationnelleTroisiemeNiveau = () => {

        return this.props.structure_organisationnelles.find(st => st.niveau == 3) || null

    }

    getStructureOrganisationnelleQuatriemeNiveau = () => {

        return this.props.structure_organisationnelles.find(st => st.niveau == 4) || null

    }

    getStructureOrganisationnelleCinquiemeNiveau = () => {

        return this.props.structure_organisationnelles.find(st => st.niveau == 5) || null

    }

    getStructureOrganisationnelleSixiemeNiveau = () => {

        return this.props.structure_organisationnelles.find(st => st.niveau == 6) || null

    }

    getStructureOrganisationnelDernierNiveau = () => {
        if(!this.getPlanOrgaDernierNiveau().length) return undefined;
        else{
            return this.props.structure_organisationnelles.find(st => st.niveau == this.getPlanOrgaDernierNiveau()[0].structure_organisationnel.niveau)
        }
    }

    getPlanOrgaDernierNiveau = () => {
        return this.props.plan_organisationnels.filter(elm => elm.structure_organisationnel ? elm.structure_organisationnel.niveau == this.getMaximumNiveauPlanOrga() : false)
    }



    render() {
       // console.log(this.getIdsUtilisations())

        return (
            <div className="app-main__inner">
                <div className="row">
                    <div className={this.props.vehicules.length ? 'col-lg-8' : 'col-lg-12'}>
                        <div className="main-card mb-3 card" style={{width: '1000px'}}>

                            <div className="card-body" >
                                <h5 className="card-title">Application de filtres <span >{ `: ${this.state.vehicules_visibles_actuelement.length} Véhicule${this.state.vehicules_visibles_actuelement.length == 0 || this.state.vehicules_visibles_actuelement.length == 1 ? '' : 's'}` }</span>



                                    <span className="pull-right">



                                        {this.state.vehicules_visibles_actuelement.length ?
                                            <ReactHTMLTableToExcel

                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="table-to-xls"
                                                filename="Liste des véhicules"
                                                sheet="Véhicules"
                                                buttonText="Ecran -> Liste" /> :
                                                <button disabled className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                    Ecran -> Liste
                                                    </button>}



                                    </span> {'  '}



                                </h5>
                                <br />
                                <div className="row">

                                {this.getStructureGeographiquePremierNiveau() ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureGeographiquePremierNiveau().libelle} </label>


                                            <Select
                                                name="premier_niveau_geographique"

                                                isClearable
                                                isDisabled={!this.getStructureGeographiquePremierNiveau()}
                                                placeholder={`Sélection de ${this.getStructureGeographiquePremierNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureGeographiquePremierNiveau().libelle} pour l'instant`}
                                                options={  this.props.plan_geographiques.filter(pl => pl.parent == null)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldLesPlanGeographiques.bind(this, "premier_niveau_geographique")}

                                            />

                                        </div> : null}

                                        {this.getStructureGeographiqueDeuxiemeNiveau() && this.state.premier_niveau_geographique ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureGeographiqueDeuxiemeNiveau().libelle} </label>


                                            <Select
                                                name="deuxieme_niveau_geographique"

                                                isClearable
                                                isDisabled={!this.getStructureGeographiqueDeuxiemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureGeographiqueDeuxiemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureGeographiqueDeuxiemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.premier_niveau_geographique ? this.props.plan_geographiques.filter(pl => pl.parent == this.state.premier_niveau_geographique.id) : this.props.plan_geographiques.filter(pl => pl.structure_geographique.niveau == 2)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldLesPlanGeographiques.bind(this, "deuxieme_niveau_geographique")}

                                            />

                                        </div> : null}

                                        {this.getStructureGeographiqueTroisiemeNiveau() && this.state.premier_niveau_geographique && this.state.deuxieme_niveau_geographique ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureGeographiqueTroisiemeNiveau().libelle} </label>


                                            <Select
                                                name="troisieme_niveau_geographique"

                                                isClearable
                                                isDisabled={!this.getStructureGeographiqueTroisiemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureGeographiqueTroisiemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureGeographiqueTroisiemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.deuxieme_niveau_geographique ? this.props.plan_geographiques.filter(pl => pl.parent == this.state.deuxieme_niveau_geographique.id) : this.props.plan_geographiques.filter(pl => pl.structure_geographique.niveau == 3)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldLesPlanGeographiques.bind(this, "troisieme_niveau_geographique")}

                                            />

                                        </div> : null}

                                </div>




                                <div className="row">

                                {this.getStructureGeographiqueQuatriemeNiveau() && this.state.premier_niveau_geographique && this.state.deuxieme_niveau_geographique && this.state.troisieme_niveau_geographique ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureGeographiqueQuatriemeNiveau().libelle} </label>


                                            <Select
                                                name="quatrieme_niveau_geographique"

                                                isClearable
                                                isDisabled={!this.getStructureGeographiqueQuatriemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureGeographiqueQuatriemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureGeographiqueQuatriemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.troisieme_niveau_geographique ? this.props.plan_geographiques.filter(pl => pl.parent == this.state.troisieme_niveau_geographique.id) : this.props.plan_geographiques.filter(pl => pl.structure_geographique.niveau == 4)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldLesPlanGeographiques.bind(this, "quatrieme_niveau_geographique")}

                                            />

                                        </div> : null}

                                {this.getStructureGeographiqueCinquiemeNiveau() && this.state.premier_niveau_geographique && this.state.deuxieme_niveau_geographique && this.state.troisieme_niveau_geographique && this.state.quatrieme_niveau_geographique ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureGeographiqueCinquiemeNiveau().libelle} </label>


                                            <Select
                                                name="cinquieme_niveau_geographique"

                                                isClearable
                                                isDisabled={!this.getStructureGeographiqueCinquiemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureGeographiqueCinquiemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureGeographiqueCinquiemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.quatrieme_niveau_geographique ? this.props.plan_geographiques.filter(pl => pl.parent == this.state.quatrieme_niveau_geographique.id) : this.props.plan_geographiques.filter(pl => pl.structure_geographique.niveau == 5)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldLesPlanGeographiques.bind(this, "cinquieme_niveau_geographique")}

                                            />

                                        </div> : null}

                                        {this.getStructureGeographiqueSixiemeNiveau() && this.state.premier_niveau_geographique && this.state.deuxieme_niveau_geographique && this.state.troisieme_niveau_geographique && this.state.quatrieme_niveau_geographique && this.state.cinquieme_niveau_geographique ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureGeographiqueSixiemeNiveau().libelle} </label>


                                            <Select
                                                name="sixieme_niveau_geographique"

                                                isClearable
                                                isDisabled={!this.getStructureGeographiqueSixiemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureGeographiqueSixiemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureGeographiqueSixiemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.cinquieme_niveau_geographique ? this.props.plan_geographiques.filter(pl => pl.parent == this.state.cinquieme_niveau_geographique.id) : this.props.plan_geographiques.filter(pl => pl.structure_geographique.niveau == 6)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldLesPlanGeographiques.bind(this, "sixieme_niveau_geographique")}

                                            />

                                        </div> : null}

                                </div>

                                <div className="row">
                                {this.getStructureOrganisationnellePremierNiveau()  ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureOrganisationnellePremierNiveau().libelle} </label>

                                            <Select
                                                name="premier_niveau_organisa"
                                                isClearable
                                                isDisabled={!this.getStructureOrganisationnellePremierNiveau()}
                                                placeholder={`Sélection de ${this.getStructureOrganisationnellePremierNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureOrganisationnellePremierNiveau().libelle} pour l'instant`}
                                                options={  this.props.plan_organisationnels.filter(pl => pl.parent == null )}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "premier_niveau_organisa")}

                                            />

                                        </div> : null}

                                        {this.getStructureOrganisationnelleDeuxiemeNiveau() && this.state.premier_niveau_organisa ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureOrganisationnelleDeuxiemeNiveau().libelle} </label>


                                            <Select
                                                name="deuxieme_niveau_organisa"

                                                isClearable
                                                isDisabled={!this.getStructureOrganisationnelleDeuxiemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureOrganisationnelleDeuxiemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureOrganisationnelleDeuxiemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.premier_niveau_organisa ? this.props.plan_organisationnels.filter(pl => pl.parent == this.state.premier_niveau_organisa.id) : this.props.plan_organisationnels.filter(pl => pl.structure_organisationnel.niveau == 2)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "deuxieme_niveau_organisa")}

                                            />

                                        </div> : null}

                                        {this.getStructureOrganisationnelleTroisiemeNiveau() && this.state.premier_niveau_organisa && this.state.deuxieme_niveau_organisa ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureOrganisationnelleTroisiemeNiveau().libelle} </label>

                                            <Select
                                                name="troisieme_niveau_organisa"
                                                isClearable
                                                isDisabled={!this.getStructureOrganisationnelleTroisiemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureOrganisationnelleTroisiemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureOrganisationnelleTroisiemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.deuxieme_niveau_organisa ? this.props.plan_organisationnels.filter(pl => pl.parent == this.state.deuxieme_niveau_organisa.id) : this.props.plan_organisationnels.filter(pl => pl.structure_organisationnel.niveau == 3)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "troisieme_niveau_organisa")}

                                            />

                                        </div> : null}
                                </div>


                                <div className="row">
                                {this.getStructureOrganisationnelleQuatriemeNiveau() && this.state.premier_niveau_organisa && this.state.deuxieme_niveau_organisa && this.state.troisieme_niveau_organisa ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureOrganisationnelleQuatriemeNiveau().libelle} d'affectation *</label>


                                            <Select
                                                name="quatrieme_niveau_organisa"

                                                isClearable
                                                isDisabled={!this.getStructureOrganisationnelleQuatriemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureOrganisationnelleQuatriemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureOrganisationnelleQuatriemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.troisieme_niveau_organisa ? this.props.plan_organisationnels.filter(pl => pl.parent == this.state.troisieme_niveau_organisa.id) : this.props.plan_organisationnels.filter(pl => pl.structure_organisationnel.niveau == 4)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "quatrieme_niveau_organisa")}

                                            />

                                        </div> : null}

                                {this.getStructureOrganisationnelleCinquiemeNiveau() && this.state.premier_niveau_organisa && this.state.deuxieme_niveau_organisa && this.state.troisieme_niveau_organisa && this.state.quatrieme_niveau_organisa ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureOrganisationnelleCinquiemeNiveau().libelle} </label>

                                            <Select
                                                name="cinquieme_niveau_organisa"
                                                isClearable
                                                isDisabled={!this.getStructureOrganisationnelleCinquiemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureOrganisationnelleCinquiemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureOrganisationnelleCinquiemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.quatrieme_niveau_organisa ? this.props.plan_organisationnels.filter(pl => pl.parent == this.state.quatrieme_niveau_organisa.id) : this.props.plan_organisationnels.filter(pl => pl.structure_organisationnel.niveau == 5)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "cinquieme_niveau_organisa")}

                                            />

                                        </div> : null}

                                        {this.getStructureOrganisationnelleSixiemeNiveau() && this.state.premier_niveau_organisa && this.state.deuxieme_niveau_organisa && this.state.troisieme_niveau_organisa && this.state.quatrieme_niveau_organisa && this.state.cinquieme_niveau_organisa ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureOrganisationnelleSixiemeNiveau().libelle} d'affectation *</label>


                                            <Select
                                                name="sixieme_niveau_organisa"

                                                isClearable
                                                isDisabled={!this.getStructureOrganisationnelleSixiemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureOrganisationnelleSixiemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureOrganisationnelleSixiemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.cinquieme_niveau_organisa ? this.props.plan_organisationnels.filter(pl => pl.parent == this.state.cinquieme_niveau_organisa.id) : this.props.plan_organisationnels.filter(pl => pl.structure_organisationnel.niveau == 6)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "sixieme_niveau_organisa")}

                                            />

                                        </div> : null}
                                </div>



                                <div className="row">

                                    {this.getStructureVehiculePremierNiveau() ?
                                            <div className="col-md-4">
                                                <label className="">{this.getStructureVehiculePremierNiveau().libelle} </label>


                                                <Select
                                                    name="premier_niveau_vehicule"

                                                    isClearable
                                                    isDisabled={!this.getStructureVehiculePremierNiveau()}
                                                    placeholder={`Sélection de ${this.getStructureVehiculePremierNiveau().libelle}`}
                                                    noOptionsMessage={() => `Pas de ${this.getStructureVehiculePremierNiveau().libelle} pour l'instant`}
                                                    options={  this.props.plan_vehicules.filter(pl => pl.parent == null)}
                                                    getOptionLabel={option => option.libelle}
                                                    getOptionValue={option => option.id}
                                                    // formatOptionLabel={formatOptionVehicule}
                                                    onChange={this.setFieldLesPlanVehicules.bind(this, "premier_niveau_vehicule")}

                                                />

                                            </div> : null}

                                            {this.getStructureVehiculeDeuxiemeNiveau() && this.state.premier_niveau_vehicule ?
                                            <div className="col-md-4">
                                                <label className="">{this.getStructureVehiculeDeuxiemeNiveau().libelle} </label>


                                                <Select
                                                    name="deuxieme_niveau_vehicule"

                                                    isClearable
                                                    isDisabled={!this.getStructureVehiculeDeuxiemeNiveau()}
                                                    placeholder={`Sélection de ${this.getStructureVehiculeDeuxiemeNiveau().libelle}`}
                                                    noOptionsMessage={() => `Pas de ${this.getStructureVehiculeDeuxiemeNiveau().libelle} pour l'instant`}
                                                    options={ this.state.premier_niveau_vehicule ? this.props.plan_vehicules.filter(pl => pl.parent == this.state.premier_niveau_vehicule.id) : this.props.plan_geographiques.filter(pl => pl.structure_vehicule.niveau == 2)}
                                                    getOptionLabel={option => option.libelle}
                                                    getOptionValue={option => option.id}
                                                    // formatOptionLabel={formatOptionVehicule}
                                                    onChange={this.setFieldLesPlanVehicules.bind(this, "deuxieme_niveau_vehicule")}

                                                />

                                            </div> : null}

                                            {this.getStructureVehiculeTroisiemeNiveau() && this.state.premier_niveau_vehicule && this.state.deuxieme_niveau_vehicule ?
                                            <div className="col-md-4">
                                                <label className="">{this.getStructureVehiculeTroisiemeNiveau().libelle} </label>


                                                <Select
                                                    name="troisieme_niveau_vehicule"

                                                    isClearable
                                                    isDisabled={!this.getStructureVehiculeTroisiemeNiveau()}
                                                    placeholder={`Sélection de ${this.getStructureVehiculeTroisiemeNiveau().libelle}`}
                                                    noOptionsMessage={() => `Pas de ${this.getStructureVehiculeTroisiemeNiveau().libelle} pour l'instant`}
                                                    options={ this.state.deuxieme_niveau_vehicule ? this.props.plan_vehicules.filter(pl => pl.parent == this.state.deuxieme_niveau_vehicule.id) : this.props.plan_vehicules.filter(pl => pl.structure_vehicule.niveau == 3)}
                                                    getOptionLabel={option => option.libelle}
                                                    getOptionValue={option => option.id}
                                                    // formatOptionLabel={formatOptionVehicule}
                                                    onChange={this.setFieldLesPlanVehicules.bind(this, "troisieme_niveau_vehicule")}

                                                />

                                            </div> : null}

                                    </div>

                                    <div className="row">
                                    {this.getStructureVehiculeQuatriemeNiveau() && this.state.premier_niveau_vehicule && this.state.deuxieme_niveau_vehicule && this.state.troisieme_niveau_vehicule ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureVehiculeQuatriemeNiveau().libelle} </label>


                                            <Select
                                                name="quatrieme_niveau_vehicule"

                                                isClearable
                                                isDisabled={!this.getStructureVehiculeQuatriemeNiveau()}
                                                placeholder={`Sélection de ${this.getStructureVehiculeQuatriemeNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureVehiculeQuatriemeNiveau().libelle} pour l'instant`}
                                                options={ this.state.troisieme_niveau_vehicule ? this.props.plan_vehicules.filter(pl => pl.parent == this.state.troisieme_niveau_vehicule.id) : this.props.plan_vehicules.filter(pl => pl.structure_vehicule.niveau == 4)}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldLesPlanVehicules.bind(this, "quatrieme_niveau_vehicule")}

                                            />

                                        </div> : null}
                                    </div>


                                <div className="row">
                                   {/*  <div className="col-md-3">
                                    <label htmlFor="">Marque</label>

                                        <Select
                                                name="marque"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Marque pour l'instat"}
                                                options={this.props.marques}
                                                getOptionLabel={option => option.nom_marque}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "marque")}
                                            />
                                    </div> */}

                        {/*             <div className="col-md-4">
                                    <label htmlFor="">Entité physique</label>

                                        <Select
                                                name="entite_physique"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Entité pour l'instat"}
                                                options={this.props.entites}
                                                getOptionLabel={option => option.entite}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "entite_physique")}
                                            />
                                    </div> */}

                                    <div className="col-md-5">
                                        <label htmlFor="">Tiers d'acquisition</label>
                                        <Select
                                                name="tiers"
                                                isClearable
                                                placeholder="Selectionnez"
                                                noOptionsMessage={() => "Aucune Tiers pour l'instat"}
                                                options={this.props.tiers.filter(tier => tier.type_tiers == "CONCESIONNAIRE")}
                                                getOptionLabel={option => `${option.code}--${option.nom}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "tiers")}
                                            />
                                    </div>

                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-4">
                                    <label htmlFor="">Type d'acquisition</label>

                                    <select name="mode_acquisition" onChange={this.setField} id="" className="form-control">
                                        <option value="Tous">Tous</option>
                                        <option value="0">Achat</option>
                                        <option value="1">Leasing</option>
                                        <option value="2">Prêt</option>

                                    </select>
                                    </div>

                           {/*          <div className="col-md-4">
                                        <label htmlFor="">Modèle</label>

                                        <select name="modele" id="" onChange={this.setField} className="form-control">
                                        <option value=""></option>
                                        {this.getIdsUtilisations().map((item, index) => <option key={index} value={item}>{item}</option>)}

                                    </select>
                                    </div> */}

                                    <div className="col-md-4">
                                    <label htmlFor="">Type de Véhicule</label>

                                    <select name="type_vehicule_statut" id="" onChange={this.setField} className="form-control">
                                        <option value="Tous">Tous</option>
                                        <option value="Service">Service</option>
                                        <option value="Fonction">Fonction</option>
                                        <option value="Flotte">Flotte</option>

                                    </select>
                                    </div>
                                </div>
                                <br />

                                <div className="row">
                                    <div className="col-md-5">
                                    <label htmlFor="">Assureur</label>

                                        <Select
                                                name="assureur"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Tiers pour l'instat"}
                                                options={this.props.tiers.filter(tier => tier.type_tiers == "ASSUREUR")}
                                                getOptionLabel={option => `${option.code}--${option.nom}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "assureur")}
                                            />
                                    </div>

                                    <div className="col-md-3">
                                    <label htmlFor="">Contrat d'Assurance</label>

                                        <Select
                                                name="contrat_assurance"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Entité pour l'instat"}
                                                options={this.props.contrat_assurances}
                                                getOptionLabel={option => option.numero_contrat_police}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "contrat_assurance")}
                                            />
                                    </div>

                         {/*            <div className="col-md-4">
                                    <label htmlFor="">Entité D'affectation Comptable</label>

                                        <Select
                                                name="entite_comptable"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Entité pour l'instat"}
                                                options={this.props.entites}
                                                getOptionLabel={option => option.entite}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "entite_comptable")}
                                            />
                                    </div> */}

                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="">Date d'entrée au parc comprise entre :</label>
                                    </div>

                                    <div className="col-md-3">
                                        <input type="date" onChange={this.setField} className="form-control" name="date_entree_au_parc1" id=""/>
                                    </div>
                                        <div className="col-md-1">
                                            <label htmlFor="">ET</label>
                                        </div>
                                    <div className="col-md-3">
                                        <input type="date" onChange={this.setField} className="form-control" name="date_entree_au_parc2" id=""/>
                                    </div>
                                </div>

                                <br />
                                {/* <div className="table-responsive"> */}
                                {/* {this.props.loading ? this.renderLoading() :
                            !this.props.vehicules.length ? this.renderEmpty() : this.renderList()} */}
                                <div className="view">
                                <div className="wrapper" style={{height: '500px', overflowY: 'scroll'}}>
                                    {this.props.loading ? this.renderLoading() :
                            !this.state.vehicules_visibles_actuelement.length ? this.renderEmpty() : this.renderList()}
                                    </div>
                                </div>
                                <hr />
                                <div className="main-card mb-3 card">
                                    <div className="card-heading">
                                        Filtres appliqués :
                                    </div>
                        <div className="no-gutters row">
                            <div className="col-md-4">
                                <div className="pt-0 pb-0 card-body">
                                    <ul className="list-group list-group-flush">

                                      {this.state.marque ?   <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Marque</div>
                                    <div className="widget-subheading">{this.state.marque.nom_marque}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> : null}
                                      {this.state.entite_physique ?   <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Etité Physique</div>
                                    <div className="widget-subheading">{this.state.entite_physique.entite}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> : null}
                                        {this.state.entite_comptable ?
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Entité Comptable</div>
                                                            <div className="widget-subheading">{this.state.entite_comptable.entite}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> : null}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pt-0 pb-0 card-body">
                                    <ul className="list-group list-group-flush">

                                        {this.state.mode_acquisition && this.state.mode_acquisition != "Tous" ? <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Type d'acquisition</div>
                                                            <div className="widget-subheading">{this.state.mode_acquisition == 0 ? 'Achat' : this.state.mode_acquisition == 1 ? 'Leasing' : this.state.mode_acquisition == 2 ?  'Prêt' : 'Tous'}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> : null}
                                      {this.state.tiers ?   <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Tiers d'acquisition</div>
                                                            <div className="widget-subheading">{this.state.tiers.code}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> : null}

                                        {this.state.modele ?
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Modèle</div>
                                                            <div className="widget-subheading">{this.state.modele}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> : null}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pt-0 pb-0 card-body">
                                    <ul className="list-group list-group-flush">

                                 {this.state.date_entree_au_parc1 && this.state.date_entree_au_parc2 ? <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Date d'entré au parc</div>
                                        <div className="widget-subheading">du {moment(this.state.date_entree_au_parc1).format('DD/MM/YYYY')} au {moment(this.state.date_entree_au_parc2).format('DD/MM/YYYY')}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> : null}

                                      {this.state.type_vehicule_statut && this.state.type_vehicule_statut != "Tous" ?   <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Type de véhicule</div>
                                                            <div className="widget-subheading">{this.state.type_vehicule_statut}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> : null}

                                       {this.state.assureur ?  <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Assureur</div>
                                                            <div className="widget-subheading">{this.state.assureur.code}</div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> : null}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>


                {this.state.vehicules_visibles_actuelement.length ?
                 <div className="row">
                        <div className="divider mt-0" style={{marginBottom: '30px'}}></div>

                    <div className="main-card mb-3 card">
                        <div className="no-gutters row">
                            <div className="col-md-4">
                                <div className="pt-0 pb-0 card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Nbre de véhicule</div>
                                                            <span className="text-success" style={{fontSize: '1.4em'}}>
                                                            {this.state.vehicules_visibles_actuelement.length}
                                                            </span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Coût total franchise</div>
                                                            <span className="text-success" style={{fontSize: '1.2em'}}>
                                                                {formatageSomme( calculSommeColonneCoutTotalFranchise(this.state.vehicules_visibles_actuelement) )}
                                                                </span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pt-0 pb-0 card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Kilometrage</div>
                                                            <span className="text-success" style={{fontSize: '1.4em'}}>
                                                            {formatageNombre( calculSommeColonneKilometrageVehicule(this.state.vehicules_visibles_actuelement)  )}
                                                            </span>
                                                             </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Coût total Leasing</div>
                                                            <span className="text-success" style={{fontSize: '1.2em'}}>
                                                                {formatageSomme( calculSommeColonneCoutLeasing(this.state.vehicules_visibles_actuelement) )}
                                                                </span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pt-0 pb-0 card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Coût total d'achat</div>
                                                            <span className="text-success" style={{fontSize: '1.2em'}}>
                                                                {formatageSomme( calculSommeColonneCoutAchat(this.state.vehicules_visibles_actuelement) )}
                                                                </span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                      {/*   <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Coût total franchise</div>
                                                            <span className="text-success" style={{fontSize: '1.2em'}}>
                                                                250.9856.158.025 F CFA
                                                                </span>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null}

                                {/* </div> */}
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
        vehicules: state.vehicules.items,
        contrat_assurances: state.contrat_assurances.items,
        marques: state.marques.items,
        tiers: state.tiers.items,
        entites: state.entites.items,
        loading: state.vehicules.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        plan_organisationnels: state.plan_organisationnels.items,
        plan_geographiques: state.plan_geographiques.items,
        structure_geographiques: state.structure_geographiques.items,
        structure_organisationnelles: state.structure_organisationnelles.items,
        structure_vehicules: state.structure_vehicules.items,
        plan_vehicules: state.plan_vehicules.items



    }
}

export default connect(mapStateToProps)(FiltreVehicules)




