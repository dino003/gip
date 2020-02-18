import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format';
import today from '../../../utils/today'
import Select from 'react-select';
import { colourStyles } from '../../../utils/Repository';
import inputStyle from '../../../utils/inputStyle'

import GoogleMapreact from 'google-map-react'




class ModifierVehicule extends Component {

    static defaultProps = {
        center: {
            lat: 5.316667,
            lng: -4.033333
        },

        zoom: 11
    }

    constructor(props) {
        super(props);
        this.state = {
            isFormSubmitted: false,
            file: null,
            previewFile: null
        }
    }

    setFieldSelect(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }

    setFieldPrixHT = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.getValueQuantite() );
    }

    setFieldTTC = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.acquisition_achat_prix_ht.value = ''
            this.acquisition_achat_taux_tva.value = ''

    } );
    }



    getValueQuantite(){
      //  const {objetEdit} = this.state
        let valeurTva = ( Number(this.acquisition_achat_prix_ht.value ? this.acquisition_achat_prix_ht.value : 0)  * Number(this.acquisition_achat_taux_tva.value ? this.acquisition_achat_taux_tva.value : 0) ) / 100
         //this.valorisation_hors_taxe.value = Number(this.prix_article.value ? this.prix_article.value : 0) * Number(this.quantite_disponible_stock.value)
      // console.log(valeurTva)
         this.acquisition_achat_prix_ttc.value = this.acquisition_achat_prix_ht.value ?  Number(this.acquisition_achat_prix_ht.value) + Number(valeurTva) : 0
    }



    setField = (event) => {
        //  this.setState({[e.target.name]: e.target.value})
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleFile = () => {
        this.setState({
            previewFile: URL.createObjectURL(event.target.files[0]),
           file: event.target.files[0]

          })
    }



    verificationFormulaire() {
        const objetEdit = this.props.vehicules.find(vehicule => vehicule.id == this.props.match.params.vehicule_id)
        var vehculeExiste = this.props.vehicules.find(ve => ve.id != objetEdit.id && ve.immatriculation.toLowerCase() == this.immatriculation.value.toLocaleLowerCase())

        if (this.immatriculation.value == '' ) {
            return "L'immatriculation est obligatoire !"
        }else if ( vehculeExiste ) {
            return "Un Véhicule Portant la même immatriculation exites déja !"
        } else if (this.state.affectation_organisationnel_id == undefined && !objetEdit.affectation_organisationnel_id && this.props.param_vehicule.zone_organisationnelle_obligatoire) {
            return "L'affectation organisationnelle est obligatoire"
        } else if (this.state.affectation_geographique_id == undefined && !objetEdit.affectation_geographique_id && this.props.param_vehicule.zonne_geographique_obligatoire) {
            return "L'affectation géographique est obligatoire"
        }  else if (this.state.plan_vehicule_id == undefined && !objetEdit.plan_vehicule_id) {
            return `Vous n'avez pas sélectionné de ${this.getStructureVehiculeDernierNiveau().libelle}`
        }  else if (this.state.tiers == undefined && !objetEdit.tiers) {
            return "Le Tiers d'acquisition n'a pas été défini dans l'onglet Acquisition !"
        }else if (this.state.contrat_assurance_id == undefined && this.props.contrat_assurances.length) {
            if(!this.props.contrat_assurances.find(contrat => contrat.defaut)) return "Le Véhicule doit être lié à contrat d'assurance"

        } else if (this.date_entree_au_parc.value == '' ) {
            return "La date d'entrée au parc est obligatoire"
        }
        else {
            return null
        }

    }

    photoUpload(vehicule_id){
        var formData = new FormData();
        formData.append("photo", this.state.file)
       // var options = { photo: formData };
        var url = '/api/modifier_photo_vehicule/' + vehicule_id
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        console.log(formData);

         axios.post(url, formData, config).then(response => {
            const action5 = { type: "EDIT_VEHICULE", value: response.data }
            this.props.dispatch(action5)
        })
    }

    sendData(){
        this.setState({ isFormSubmitted: true })
        const objetEdit = this.props.vehicules.find(vehicule => vehicule.id == this.props.match.params.vehicule_id)

        axios.post('/api/modifier_vehicule/' + objetEdit.id, {
            immatriculation: this.immatriculation.value,
            affectation_organisationnel_id: this.state.affectation_organisationnel_id ? this.state.affectation_organisationnel_id.id : objetEdit.affectation_organisationnel_id ? objetEdit.affectation_organisationnel_id.id : null,
            affectation_geographique_id: this.state.affectation_geographique_id ? this.state.affectation_geographique_id.id : objetEdit.affectation_geographique_id ? objetEdit.affectation_geographique_id.id : null,
            type_vehicule_statut: this.type_vehicule_statut.value,
            etat_vehicule_status: this.etat_vehicule_status.value,
            date_commande: this.date_commande.value,
            // vehicule propre a faire
            //  vehicule_propre: this.state.vehicule_propre,
            mode_acquisition: this.mode_acquisition.value,
            date_livraison_previsionelle: this.date_livraison_previsionelle.value,
            date_livraison_reele: this.date_livraison_reele.value,
            numero_commande: this.numero_commande.value,
            demandeur: this.state.demandeur ? this.state.demandeur.id : objetEdit.demandeur ? objetEdit.demandeur.id : null,

          //  neuf_occasion: this.neuf_occasion.checked, //booleen a faire*************
            date_entree_au_parc: this.date_entree_au_parc.value,
            annee_mise_circulation: this.annee_mise_circulation.value,
            premiere_mise_circulation: this.premiere_mise_circulation.value,
            //categorie: this.state.categorie ? this.state.categorie.id : objetEdit.categorie ? objetEdit.categorie.id : null,
          //  marque: this.state.marque ? this.state.marque.id : objetEdit.marque ? objetEdit.marque.id : null,
            tiers: this.state.tiers ? this.state.tiers.id : objetEdit.tiers ? objetEdit.tiers.id : null,
            detenteur: this.state.detenteur ? this.state.detenteur.id : objetEdit.detenteur ? objetEdit.detenteur.id : null,
            chauffeur_atitre: this.state.chauffeur_atitre ? this.state.chauffeur_atitre.id : objetEdit.chauffeur_atitre ? objetEdit.chauffeur_atitre.id : null,
            plan_vehicule_id: this.state.plan_vehicule_id ? this.state.plan_vehicule_id.id : objetEdit.plan_vehicule_id ? objetEdit.plan_vehicule_id : null,

            precision_energie: this.precision_energie.value,
          // modele: this.modele.value,
           // code_modele: this.code_modele.value,
            energie: this.state.energie ? this.state.energie.id : objetEdit.energie ? objetEdit.energie.id : null,
            type_vehicule_carte_grise: this.type_vehicule_carte_grise.value,
            numero_carte_grise: this.numero_carte_grise.value,
            cout_carte_grise: this.cout_carte_grise.value,
            detenu_depuis: this.detenu_depuis.value,

            garantie_annee: this.garantie_annee.value,
            grantie_date_fin: this.grantie_date_fin.value,
            garantie_en_cours: this.garantie_en_cours.value,
            amortissement_calcul: this.amortissement_calcul.value,
            amortissement_annee: this.amortissement_annee.value,
            amortissement_date_fin: this.amortissement_date_fin.value,
            amortissement_etat: this.amortissement_etat.value,
            // prix_ttc: this.prix_ttc.value, reservable a faire *************
            //vehicule_prioritaire
            //vehicule_usage_exclusif
            //vehicule_lie_astreinte
            reservable: this.reservable.checked,
            vehicule_prioritaire: this.vehicule_prioritaire.checked,
            vehicule_usage_exclusif: this.vehicule_usage_exclusif.checked,
            vehicule_lie_astreinte: this.vehicule_lie_astreinte.checked,

            lieu_prise_en_charge_vehicule: this.lieu_prise_en_charge_vehicule.value,
           // kilometrage_nouvelle_acquisition: this.kilometrage_nouvelle_acquisition.value,
            kilometrage_actuel: this.kilometrage_actuel.value,
            lieu_restitution: this.lieu_restitution.value,
            lieu_stockage_double: this.lieu_stockage_double.value,
            type_permis: this.type_permis.value,
            etat_vehicule_physique: this.etat_vehicule_physique.value,
            mode_acquisition_etat_vehicule: this.mode_acquisition_etat_vehicule.value,
            tech_chevaux_fiscaux: this.tech_chevaux_fiscaux.value,
            tech_couleur: this.tech_couleur.value,
            tech_couleur_interieure: this.tech_couleur_interieure.value,
            tech_numero_serie: this.tech_numero_serie.value,
            tech_information_moteur: this.tech_information_moteur.value,
            tech_numero_moteur: this.tech_numero_moteur.value,
            tech_taille_pneu: this.tech_taille_pneu.value,
            tech_pression_avant: this.tech_pression_avant.value,
            tech_pression_arriere: this.tech_pression_arriere.value,
            tech_poids_vide: this.tech_poids_vide.value,
            tech_en_charge: this.tech_en_charge.value,
            tech_capacite_reservoire: this.tech_capacite_reservoire.value,
            tech_taux_emmission_co2: this.tech_taux_emmission_co2.value,
            tech_volume_interieur: this.tech_volume_interieur.value,
            tech_longueur: this.tech_longueur.value,
            tech_largeur: this.tech_largeur.value,
            tech_hauteur: this.tech_hauteur.value,
            mode_acquisition_type_vehicule: this.mode_acquisition_type_vehicule.value,
            /**
             * partie acquisition
             *
             */
            // acquisition prêt
            acquisition_pret_date_debut: this.mode_acquisition && this.mode_acquisition.value == '2' ? this.acquisition_pret_date_debut.value : null,
            acquisition_pret_date_fin: this.mode_acquisition && this.mode_acquisition.value == '2' ? this.acquisition_pret_date_fin.value : null,
            acquisition_pret_kilometrage_debut: this.mode_acquisition && this.mode_acquisition.value == '2' ? this.acquisition_pret_kilometrage_debut.value : null,
            acquisition_pret_kilometrage_fin: this.mode_acquisition && this.mode_acquisition.value == '2' ? this.acquisition_pret_kilometrage_fin.value : null,
            acquisition_pret_motif: this.mode_acquisition && this.mode_acquisition.value == '2' ? this.acquisition_pret_motif.value : null,

            // acquisition achat
            acquisition_achat_prix_ht: this.mode_acquisition && this.mode_acquisition.value == '0' ? this.acquisition_achat_prix_ht.value : null,
            acquisition_achat_prix_ttc: this.mode_acquisition && this.mode_acquisition.value == '0' ? this.acquisition_achat_prix_ttc.value : null,
            acquisition_achat_taux_tva: this.mode_acquisition && this.mode_acquisition.value == '0' ? this.acquisition_achat_taux_tva.value : null,
            acquisition_achat_numero_facture: this.mode_acquisition && this.mode_acquisition.value == '0' ? this.acquisition_achat_numero_facture.value : null,
            acquisition_achat_date_facture: this.mode_acquisition && this.mode_acquisition.value == '0' ? this.acquisition_achat_date_facture.value : null,
            acquisition_achat_reglee_le: this.mode_acquisition && this.mode_acquisition.value == '0' ? this.acquisition_achat_reglee_le.value : null,



            // acquisition leasing
            acquisition_leasing_numero_contrat: this.mode_acquisition && this.mode_acquisition.value == '1' ? this.acquisition_leasing_numero_contrat.value : null,
            acquisition_leasing_duree_annee: this.mode_acquisition && this.mode_acquisition.value == '1' ? this.acquisition_leasing_duree_annee.value : null,
            acquisition_leasing_apport_initial: this.mode_acquisition && this.mode_acquisition.value == '1' ? this.acquisition_leasing_apport_initial.value : null,
            acquisition_leasing_loyer_mensuel: this.mode_acquisition && this.mode_acquisition.value == '1' ? this.acquisition_leasing_loyer_mensuel.value : null,
            acquisition_leasing_valeur_rachat: this.mode_acquisition && this.mode_acquisition.value == '1' ? this.acquisition_leasing_valeur_rachat.value : null,
            acquisition_leasing_deja_paye: this.mode_acquisition && this.mode_acquisition.value == '1' ? this.acquisition_leasing_deja_paye.value : null,

            /**
             * fin acquisition
             */

            /**
             *  Assurance
             */
           // assurance_valeur_assuree_contrat: this.assurance_valeur_assuree_contrat.value,
           // assurance_valeur_assuree_specifique: this.assurance_valeur_assuree_specifique.value,
          //  assurance_prime_annuelle_contrat: this.assurance_prime_annuelle_contrat.value,
          //  assurance_prime_annuelle_specifique: this.assurance_prime_annuelle_specifique.value,
           // contrat_assurance_id: this.state.contrat_assurance_id ? this.state.contrat_assurance_id.id : objetEdit.contrat_assurance ? objetEdit.contrat_assurance.id : this.props.contrat_assurances.length ? this.props.contrat_assurances.find(contrat => contrat.defaut).id : null,

        }).then(response => {
            if(this.state.file != null){
                this.photoUpload(response.data.id)
            }

            const action = { type: "EDIT_VEHICULE", value: response.data }
            this.props.dispatch(action)
            const action2 = {type: "EDIT_SELECTED", value: response.data}
            this.props.dispatch(action2)
            this.setState({ isFormSubmitted: false })
            this.props.history.goBack();
        }).catch(error => {
            this.setState({ isFormSubmitted: false })
            console.log(error)
        })
    }

    confirmAlertBefore(){
        let message
        if (this.mode_acquisition.value == '0' && this.acquisition_achat_prix_ttc.value == '' ) {
            message = "Vous N'avez pas renseigné le montant T T C de l'achat"
           // if(confirm(message)) return this.sendData()
           // return;
           window.alert(message)
        }else if(this.mode_acquisition.value == '1' && this.acquisition_leasing_loyer_mensuel.value == ''){
            message = "Vous N'avez pas renseigné le loyer mensuel du leasing"
           // if(confirm(message)) return this.sendData()
           // return;
           window.alert(message)

        }else{
            this.sendData()
        }
        /* else if(  this.kilometrage_nouvelle_acquisition.value == ''){
            message = "Vous N'avez pas renseigné le Kilometrage lors de l'entrée au parc "
           // if(confirm(message)) return this.sendData()
           window.alert(message)

        } */

    }

    enregistrerVehicule = (e) => {
        e.preventDefault()
        if (this.verificationFormulaire() == null) {

         this.confirmAlertBefore();
         //this.sendData()
        } else {
            //console.log(this.verificationFormulaire())
            toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }


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
        const objetEdit = this.props.vehicules.find(vehicule => vehicule.id == this.props.match.params.vehicule_id)
        const contrat_en_cour = this.props.contrat_assurances.find(contrat => contrat.vehicule_id == objetEdit.id && contrat.encour_vehicule) ? this.props.contrat_assurances.find(contrat => contrat.vehicule_id == objetEdit.id && contrat.encour_vehicule) : this.props.contrat_assurances.find(contrat => contrat.defaut) ? this.props.contrat_assurances.find(contrat => contrat.defaut) : null
        const {param_vehicule} = this.props;
        return (
            <div className="app-main__inner">
                {objetEdit ?  <React.Fragment>
                <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
                    <li className="nav-item">
                        <a role="tab" className="nav-link active" id="tab-0"
                            data-toggle="tab" href="#tab_description1">
                            <span>Description 1</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-1"
                            data-toggle="tab" href="#tab_description2">
                            <span>Description 2</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-2"
                            data-toggle="tab" href="#tab_technique">
                            <span>Technique/Kms</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-3"
                            data-toggle="tab" href="#tab_acquisition">
                            <span>Acquisition</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-4"
                            data-toggle="tab" href="#tab_assurance">
                            <span>Assurance</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-4"
                            data-toggle="tab" href="#tab_photo_vehicule">
                            <span>Photo du véhicule</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-4"
                            data-toggle="tab" href="#tab_geolocalisation">
                            <span>Géolocalisation</span>
                        </a>
                    </li>
                    {/*
                    <li className="nav-item">
                        <button type="submit" className="mt-2 btn btn-info">Enregistrer</button>

                    </li>
                    */}
                </ul>
                <form className="" onChange={this.setField} onSubmit={this.enregistrerVehicule}>

                    <div className="tab-content">
                        <div className="tab-pane tabs-animation fade show active"
                            id="tab_description1" role="tabpanel">

                            <div className="main-card mb-3 card">
                                <div className="card-body"><h5 className="card-title">Fichier des véhicules

                        </h5>

                        <div className="form-row">

                            <div className="col-md-2">
                            <div className="position-relative form-group">
                                                <label >Immatriculation *</label>
                                                <input name="immatriculation"
                                                    defaultValue={objetEdit.immatriculation}
                                                    ref={immatriculation => this.immatriculation = immatriculation}
                                                    type="text"
                                                    style={inputStyle}
                                                    className="form-control" />
                                                    </div>
                            </div>
                            {this.getStructureGeographiqueDernierNiveau() ?
                            <div className="col-md-5">
                                <label className="">{this.getStructureGeographiqueDernierNiveau().libelle}  </label>


                                <Select
                                    name="affectation_geographique_id"
                                    isDisabled={!this.getStructureGeographiqueDernierNiveau()}
                                    placeholder={`Sélection de ${this.getStructureGeographiqueDernierNiveau().libelle}`}
                                    noOptionsMessage={() => `Pas de ${this.getStructureGeographiqueDernierNiveau().libelle} pour l'instant`}
                                    options={this.getPlanGeographiquesDerniersNiveau()}
                                    getOptionLabel={option => option.libelle}
                                    getOptionValue={option => option.id}
                                    defaultValue={objetEdit.affectation_geographique ? objetEdit.affectation_geographique : null}

                                    // formatOptionLabel={formatOptionVehicule}
                                    onChange={this.setFieldSelect.bind(this, "affectation_geographique_id")}
                                    styles={param_vehicule.zonne_geographique_obligatoire && colourStyles}
                                />

                            </div> :


                            <div className="col-md-5">
                                <label className=""> Affectation Géographique</label>

                                <input readOnly className="form-control" value="Veuillez creer la structure Géographique" />

                            </div>}

                            {this.getStructureOrganisationnelDernierNiveau() ?
                            <div className="col-md-5">
                                <label className="">{this.getStructureOrganisationnelDernierNiveau().libelle} d'affectation *</label>


                                <Select
                                    name="affectation_organisationnel_id"
                                    isDisabled={!this.getStructureOrganisationnelDernierNiveau()}
                                    placeholder={`Sélection de ${this.getStructureOrganisationnelDernierNiveau().libelle}`}
                                    noOptionsMessage={() => `Pas de ${this.getStructureOrganisationnelDernierNiveau().libelle} pour l'instant`}
                                    options={this.getPlanOrgaDernierNiveau()}
                                    getOptionLabel={option => option.libelle}
                                    getOptionValue={option => option.id}
                                    defaultValue={objetEdit.affectation_organisationnel ? objetEdit.affectation_organisationnel : null}

                                    // formatOptionLabel={formatOptionVehicule}
                                    onChange={this.setFieldSelect.bind(this, "affectation_organisationnel_id")}
                                    styles={param_vehicule.zone_organisationnelle_obligatoire && colourStyles }
                                />

                            </div> :


                            <div className="col-md-5">
                                <label className=""> Affectation Organisationnelle</label>

                                <input readOnly className="form-control" value="Veuillez creer la structure Organisationnelle" />

                            </div>}


                        </div>



                                    <div className="form-row">

                                    {this.getStructureVehiculeDernierNiveau() ?
                                        <div className="col-md-4">
                                            <label className="">{this.getStructureVehiculeDernierNiveau().libelle} </label>


                                            <Select
                                                name="plan_vehicule_id"
                                                isDisabled={!this.getStructureVehiculeDernierNiveau()}
                                                placeholder={`Sélection de ${this.getStructureVehiculeDernierNiveau().libelle}`}
                                                noOptionsMessage={() => `Pas de ${this.getStructureVehiculeDernierNiveau().libelle} pour l'instant`}
                                                options={this.getPlanVehiculesDerniersNiveau()}
                                                getOptionLabel={option => option.libelle}
                                                getOptionValue={option => option.id}
                                                defaultValue={objetEdit.plan_vehicule ? objetEdit.plan_vehicule : null}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "plan_vehicule_id")}
                                                styles={colourStyles}
                                            />

                                        </div> :


                                        <div className="col-md-4">
                                            <label className=""> Catégorie véhicule</label>

                                            <input readOnly className="form-control" value="Veuillez creer la structure véhicule" />

                                        </div>}



                                        <div className="col-md-2">
                                            <label className="">Type de véhicule</label>
                                            <select name="type_vehicule_statut"
                                                defaultValue={objetEdit.type_vehicule_statut}

                                                ref={type_vehicule_statut => this.type_vehicule_statut = type_vehicule_statut}
                                                className="form-control">
                                                <option value="Service">Service</option>
                                                <option value="Fonction">Fonction</option>
                                                <option value="Flotte">Flotte (Location Longue Durée)</option>

                                            </select>

                                        </div>

                                        <div className="col-md-2">
                                            <label className=""> Etat du véhicule *</label>
                                            <select name="etat_vehicule_status"
                                                 defaultValue={objetEdit.etat_vehicule_status}

                                                ref={etat_vehicule_status => this.etat_vehicule_status = etat_vehicule_status}
                                                className="form-control">
                                                <option value="En service">En Service</option>
                                                <option value="Commande">Commande</option>
                                                <option value="Vendu">Vendu</option>
                                                <option value="Restitué">Restitué</option>
                                                <option value="Sorti">Sorti</option>


                                            </select>

                                        </div>


                                        <div className="col-md-2">
                                            <label className="">Etat </label>
                                            <select name="mode_acquisition_etat_vehicule"
                                                    defaultValue={objetEdit.immatriculation}

                                                ref={mode_acquisition_etat_vehicule => this.mode_acquisition_etat_vehicule = mode_acquisition_etat_vehicule}
                                                className="form-control">
                                                <option value="Neuf">Neuf</option>
                                                <option value="Occasion">Occasion</option>


                                            </select>

                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Type </label>
                                            <select name="mode_acquisition_type_vehicule"
                                                    defaultValue={objetEdit.mode_acquisition_type_vehicule}

                                                ref={mode_acquisition_type_vehicule => this.mode_acquisition_type_vehicule = mode_acquisition_type_vehicule}
                                                className="form-control">
                                                <option value="Véhicule de la société">Véhicule de la société</option>
                                                <option value="Véhicule personnel">Véhicule personnel</option>


                                            </select>

                                        </div>



                                    </div>


                                    <div className="form-row">



                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Commandé le</label>
                                                <input name="date_commande"
                                                    defaultValue={objetEdit.date_commande}

                                                    ref={date_commande => this.date_commande = date_commande}
                                                    type="date" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Numero de la commande</label>
                                                <input name="numero_commande"
                                                    defaultValue={objetEdit.numero_commande}

                                                    ref={numero_commande => this.numero_commande = numero_commande}
                                                    type="text" className="form-control" /></div>
                                        </div>



                                        <div className="col-md-3">
                                            <label className="">Demandeur </label>

                                            <Select
                                                name="demandeur"
                                                placeholder="Selectionnez une personne"
                                                noOptionsMessage={() => "Aucune personne pour l'instant"}
                                                options={this.props.personnels}
                                                getOptionLabel={option => `${option.nom} ${option.prenom.slice(0, 15)}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                defaultValue={objetEdit.demandeur ? objetEdit.demandeur : null}

                                                onChange={this.setFieldSelect.bind(this, "demandeur")}
                                            />

                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Livraison prévue</label>
                                                <input name="date_livraison_previsionelle"
                                                    defaultValue={objetEdit.date_livraison_previsionelle}

                                                    ref={date_livraison_previsionelle => this.date_livraison_previsionelle = date_livraison_previsionelle}
                                                    type="date" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Livré le</label>
                                                <input name="date_livraison_reele"
                                                    defaultValue={objetEdit.date_livraison_reele}

                                                    ref={date_livraison_reele => this.date_livraison_reele = date_livraison_reele}
                                                    type="date" className="form-control" /></div>
                                        </div>






                                    </div>

                                    <div className="form-row">



                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Entrée au parc</label>
                                                <input name="date_entree_au_parc"
                                                    defaultValue={objetEdit.date_entree_au_parc}

                                                    style={inputStyle}
                                                    defaultValue={today}
                                                    ref={date_entree_au_parc => this.date_entree_au_parc = date_entree_au_parc}
                                                    type="date" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Année mise en circulation</label>
                                                <input name="annee_mise_circulation"
                                                    defaultValue={objetEdit.annee_mise_circulation}

                                                    ref={annee_mise_circulation => this.annee_mise_circulation = annee_mise_circulation}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >1ère mise en circulation</label>
                                                <input name="premiere_mise_circulation"
                                                    defaultValue={objetEdit.premiere_mise_circulation}

                                                    ref={premiere_mise_circulation => this.premiere_mise_circulation = premiere_mise_circulation}
                                                    type="date" className="form-control" /></div>
                                        </div>



                                    </div>

                                 {/*    <div className="form-row">


                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label > Modèle du véhicule *</label>
                                                <input name="modele"
                                                    style={inputStyle}
                                                    defaultValue={objetEdit.modele}

                                                    ref={modele => this.modele = modele}
                                                    type="text"

                                                    className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Catégorie de véhicule *</label>


                                            <Select
                                                name="categorie"
                                                placeholder="Selectionnez une catégorie"
                                                noOptionsMessage={() => "Aucune catégorie pour l'instant"}
                                                options={this.props.categories_vehicules}
                                                getOptionLabel={option => `${option.nom_type}`}
                                                getOptionValue={option => option.id}
                                                defaultValue={objetEdit.categorie ? objetEdit.categorie : null}

                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "categorie")}
                                                styles={colourStyles}
                                            />

                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Marque *</label>

                                            <Select
                                                name="marque"
                                                placeholder="Selectionnez une marque"
                                                noOptionsMessage={() => "Aucune marque pour l'instant"}
                                                options={this.props.marques}
                                                getOptionLabel={option => `${option.nom_marque}`}
                                                getOptionValue={option => option.id}
                                                defaultValue={objetEdit.marque ? objetEdit.marque : null}

                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "marque")}
                                                styles={colourStyles}
                                            />

                                        </div>





                                    </div> */}

                                    <div className="form-row">



                                        <div className="col-md-3">
                                            <label className="">Energie *</label>



                                            <Select
                                                name="energie"
                                                placeholder="Selectionnez une energie"
                                                noOptionsMessage={() => "Aucune energie pour l'instant"}
                                                options={this.props.natures_energies}
                                                getOptionLabel={option => `${option.nom_energie}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                defaultValue={objetEdit.energie ? objetEdit.energie : null}

                                                onChange={this.setFieldSelect.bind(this, "energie")}
                                                styles={colourStyles}
                                            />
                                        </div>



                                        <div className="col-md-3">
                                            <label className="">Chauffeur attitré</label>


                                            <Select
                                                name="chauffeur_atitre"
                                                placeholder="Selectionnez une Personne"
                                                noOptionsMessage={() => "Aucune Personne pour l'instant"}
                                                options={this.props.personnels}
                                                getOptionLabel={option => `${option.nom} ${option.prenom.slice(0, 15)}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                defaultValue={objetEdit.chauffeur_atitre ? objetEdit.chauffeur_atitre : null}

                                                onChange={this.setFieldSelect.bind(this, "chauffeur_atitre")}
                                            />

                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Détenteur </label>


                                            <Select
                                                name="detenteur"
                                                placeholder="Selectionnez une Personne"
                                                noOptionsMessage={() => "Aucune Personne pour l'instant"}
                                                options={this.props.personnels}
                                                getOptionLabel={option => `${option.nom} ${option.prenom.slice(0, 15)}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                defaultValue={objetEdit.detenteur ? objetEdit.detenteur : null}

                                                onChange={this.setFieldSelect.bind(this, "detenteur")}
                                            />


                                        </div>





                                    </div>

                                    <div className="form-row">

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Précision énergie</label>
                                                <input name="precision_energie"
                                                 defaultValue={objetEdit.precision_energie}

                                                    ref={precision_energie => this.precision_energie = precision_energie}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Type vehicule (carte grise)</label>
                                                <input name="type_vehicule_carte_grise"
                                                    defaultValue={objetEdit.type_vehicule_carte_grise}

                                                    ref={type_vehicule_carte_grise => this.type_vehicule_carte_grise = type_vehicule_carte_grise}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >N° carte grise</label>
                                                <input name="numero_carte_grise"
                                                    defaultValue={objetEdit.numero_carte_grise}

                                                    ref={numero_carte_grise => this.numero_carte_grise = numero_carte_grise}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Coût de la carte grise</label>
                                                <input name="cout_carte_grise"
                                                    defaultValue={objetEdit.cout_carte_grise}

                                                    ref={cout_carte_grise => this.cout_carte_grise = cout_carte_grise}
                                                    type="text" className="form-control" /></div>
                                        </div>



                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Détenu depuis le</label>
                                                <input name="detenu_depuis"
                                                    defaultValue={objetEdit.detenu_depuis}

                                                    ref={detenu_depuis => this.detenu_depuis = detenu_depuis}
                                                    type="date" className="form-control" /></div>
                                        </div>






                                    </div>



                                </div>
                            </div>
                        </div>


                        <div className="tab-pane tabs-animation fade" id="tab_description2" role="tabpanel">


                            <div className="main-card mb-3 card">
                                <div className="card-body"><h5 className="card-title">Description 2

                        </h5>

                                    <div className="form-row">

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label className="center">Garantie</label>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Durée en année</label>
                                                <input name="garantie_annee"
                                                    defaultValue={objetEdit.garantie_annee}

                                                    ref={garantie_annee => this.garantie_annee = garantie_annee}
                                                    type="number" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Date de fin</label>
                                                <input name="grantie_date_fin"
                                                    defaultValue={objetEdit.grantie_date_fin}

                                                    ref={grantie_date_fin => this.grantie_date_fin = grantie_date_fin}
                                                    type="date" className="form-control" /></div>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="">Etat garantie</label>
                                            <select name="garantie_en_cours"
                                                    defaultValue={objetEdit.garantie_en_cours}

                                                ref={garantie_en_cours => this.garantie_en_cours = garantie_en_cours}
                                                className="form-control">
                                                <option value="Garantie en cours">Garantie en cours</option>

                                                <option value="Garantie terminée">Garantie terminée</option>

                                            </select>

                                        </div>


                                    </div>

                                    <div className="form-row">

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label className="center">Amortissement</label>
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <label className="">Amortissement</label>
                                            <select name="amortissement_calcul"
                                                    defaultValue={objetEdit.amortissement_calcul}

                                                ref={amortissement_calcul => this.amortissement_calcul = amortissement_calcul}
                                                className="form-control">
                                                <option value="Pas Calcul">Pas Calcul</option>
                                                <option value="Dégressif">Dégressif</option>
                                                <option value="Linéaire">Linéaire</option>


                                            </select>

                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Durée en année</label>
                                                <input name="amortissement_annee"
                                                    defaultValue={objetEdit.amortissement_annee}

                                                    ref={amortissement_annee => this.amortissement_annee = amortissement_annee}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Date de fin</label>
                                                <input name="amortissement_date_fin"
                                                defaultValue={objetEdit.amortissement_date_fin}

                                                    ref={amortissement_date_fin => this.amortissement_date_fin = amortissement_date_fin}
                                                    type="date" className="form-control" /></div>
                                        </div>


                                        <div className="col-md-3">
                                            <label className="">Etat de l'amortissement</label>
                                            <select name="amortissement_etat"
                                                    defaultValue={objetEdit.amortissement_etat}

                                                ref={amortissement_etat => this.amortissement_etat = amortissement_etat}
                                                className="form-control">
                                                <option value="Amortissement en cours">Amortissement en cours</option>
                                                <option value="Amorti">Amorti</option>


                                            </select>

                                        </div>


                                    </div>

                                    <div className="form-row">

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label className="center">Usage</label>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label className="form-check-label">
                                                    Véhicule a usage exclusif ? {' '}
                                                    <input type="checkbox"
                                                    defaultChecked={objetEdit.vehicule_usage_exclusif}
                                                        ref={vehicule_usage_exclusif => this.vehicule_usage_exclusif = vehicule_usage_exclusif}
                                                        onChange={this.setField}
                                                        defaultChecked={false}
                                                        name="vehicule_usage_exclusif" className="" /></label>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label className="form-check-label">
                                                    Ce véhicule est prioritaire {' '}
                                                    <input type="checkbox"
                                                    defaultChecked={objetEdit.vehicule_prioritaire}
                                                        ref={vehicule_prioritaire => this.vehicule_prioritaire = vehicule_prioritaire}
                                                        onChange={this.setField}
                                                        defaultChecked={false}
                                                        name="vehicule_prioritaire" className="" /></label>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label className="form-check-label">
                                                    Ce véhicule est lié a une astreinte {' '}
                                                    <input type="checkbox"
                                                    defaultChecked={objetEdit.vehicule_lie_astreinte}
                                                        ref={vehicule_lie_astreinte => this.vehicule_lie_astreinte = vehicule_lie_astreinte}
                                                        onChange={this.setField}
                                                        defaultChecked={false}
                                                        name="vehicule_lie_astreinte" className="" /></label>
                                            </div>
                                        </div>


                                    </div>


                                    <div className="form-row">
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label >Lieu de prise en charge  véhicule et clés</label>
                                                <input name="lieu_prise_en_charge_vehicule"
                                                    defaultValue={objetEdit.lieu_prise_en_charge_vehicule}

                                                    ref={lieu_prise_en_charge_vehicule => this.lieu_prise_en_charge_vehicule = lieu_prise_en_charge_vehicule}
                                                    type="text" className="form-control" /></div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">

                                                <label className="">Lieu de restitution véhicule et clés</label>
                                                <input name="lieu_restitution"
                                                    defaultValue={objetEdit.lieu_restitution}

                                                    ref={lieu_restitution => this.lieu_restitution = lieu_restitution}
                                                    type="text" className="form-control" />
                                            </div>
                                        </div>




                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label >Lieu stockage double des clés</label>
                                                <input name="lieu_stockage_double"
                                                    defaultValue={objetEdit.lieu_stockage_double}

                                                    ref={lieu_stockage_double => this.lieu_stockage_double = lieu_stockage_double}
                                                    type="text" className="form-control" />
                                            </div>
                                        </div>




                                    </div>

                                    <div className="form-row">

                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label className="form-check-label">
                                                    A prendre en compte dans la gestion des réservations {' '}
                                                    <input type="checkbox"
                                                    defaultChecked={objetEdit.reservable}
                                                        ref={reservable => this.reservable = reservable}
                                                        onChange={this.setField}
                                                        defaultChecked={true}
                                                        name="reservable" className="" /></label>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="">Type de permis nécessaire pour ce véhicule</label>
                                            <select name="type_permis"
                                                defaultValue={objetEdit.type_permis}

                                                ref={type_permis => this.type_permis = type_permis}
                                                className="form-control">
                                                <option value="A1">A1</option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="C1">C1</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                                <option value="F">F</option>
                                                <option value="BCDE">BCDE</option>


                                            </select>

                                        </div>




                                        <div className="col-md-3">
                                            <label className="">Etat du véhicule</label>
                                            <select name="etat_vehicule_physique"
                                                    defaultValue={objetEdit.etat_vehicule_physique}

                                                ref={etat_vehicule_physique => this.etat_vehicule_physique = etat_vehicule_physique}
                                                className="form-control">
                                                <option value="Excellent">Excellent</option>
                                                <option value="Bon">Bon</option>
                                                <option value="Moyen">Moyen</option>
                                                <option value="Passable">Passable</option>
                                                <option value="Mauvais">Mauvais</option>


                                            </select>

                                        </div>


                                    </div>
                                    <div>


                                    </div>





                                </div>
                            </div>
                        </div>

                        {/*  technique */}

                        <div className="tab-pane tabs-animation fade" id="tab_technique" role="tabpanel">


                            <div className="main-card mb-3 card">
                                <div className="card-body"><h5 className="card-title">Technique/Kms

                        </h5>




                                    <div className="form-row">



                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Chevaux fiscaux</label>
                                                <input name="tech_chevaux_fiscaux"
                                                    defaultValue={objetEdit.tech_chevaux_fiscaux}

                                                    ref={tech_chevaux_fiscaux => this.tech_chevaux_fiscaux = tech_chevaux_fiscaux}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="position-relative form-group">
                                                <label >Couleur</label>
                                                <input name="tech_couleur"
                                                    defaultValue={objetEdit.tech_couleur}

                                                    ref={tech_couleur => this.tech_couleur = tech_couleur}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Couleur intérieure</label>
                                                <input name="tech_couleur_interieure"
                                                    defaultValue={objetEdit.tech_couleur_interieure}

                                                    ref={tech_couleur_interieure => this.tech_couleur_interieure = tech_couleur_interieure}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >N° de série</label>
                                                <input name="tech_numero_serie"
                                                    defaultValue={objetEdit.tech_numero_serie}

                                                    ref={tech_numero_serie => this.tech_numero_serie = tech_numero_serie}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Information moteur</label>
                                                <input name="tech_information_moteur"
                                                    defaultValue={objetEdit.tech_information_moteur}

                                                    ref={tech_information_moteur => this.tech_information_moteur = tech_information_moteur}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >N° du moteur</label>
                                                <input name="tech_numero_moteur"
                                                    defaultValue={objetEdit.tech_numero_moteur}

                                                    ref={tech_numero_moteur => this.tech_numero_moteur = tech_numero_moteur}
                                                    type="text" className="form-control" /></div>
                                        </div>


                                    </div>


                                    <div className="form-row">



                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Poids à vide</label>
                                                <input name="tech_poids_vide"
                                                    defaultValue={objetEdit.tech_poids_vide}

                                                    ref={tech_poids_vide => this.tech_poids_vide = tech_poids_vide}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="position-relative form-group">
                                                <label >En charge</label>
                                                <input name="tech_en_charge"
                                                    defaultValue={objetEdit.tech_en_charge}

                                                    ref={tech_en_charge => this.tech_en_charge = tech_en_charge}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Capacité réservoire (litres)</label>
                                                <input name="tech_capacite_reservoire"
                                                    defaultValue={objetEdit.tech_capacite_reservoire}

                                                    ref={tech_capacite_reservoire => this.tech_capacite_reservoire = tech_capacite_reservoire}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Taux émission CO2</label>
                                                <input name="tech_taux_emmission_co2"
                                                    defaultValue={objetEdit.tech_taux_emmission_co2}

                                                    ref={tech_taux_emmission_co2 => this.tech_taux_emmission_co2 = tech_taux_emmission_co2}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Volume intérieur (M3)</label>
                                                <input name="tech_volume_interieur"
                                                    defaultValue={objetEdit.tech_volume_interieur}

                                                    ref={tech_volume_interieur => this.tech_volume_interieur = tech_volume_interieur}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="position-relative form-group">
                                                <label >Longueur</label>
                                                <input name="tech_longueur"
                                                    defaultValue={objetEdit.tech_longueur}

                                                    ref={tech_longueur => this.tech_longueur = tech_longueur}
                                                    type="text" className="form-control" /></div>
                                        </div>






                                    </div>


                                    <div className="form-row">

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Largeur</label>
                                                <input name="tech_largeur"
                                                    defaultValue={objetEdit.tech_largeur}

                                                    ref={tech_largeur => this.tech_largeur = tech_largeur}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="position-relative form-group">
                                                <label >Hauteur</label>
                                                <input name="tech_hauteur"
                                                    defaultValue={objetEdit.tech_hauteur}

                                                    ref={tech_hauteur => this.tech_hauteur = tech_hauteur}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Taille des pneus</label>
                                                <input name="tech_taille_pneu"
                                                    defaultValue={objetEdit.tech_taille_pneu}

                                                    ref={tech_taille_pneu => this.tech_taille_pneu = tech_taille_pneu}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Pression avant</label>
                                                <input name="tech_pression_avant"
                                                    defaultValue={objetEdit.tech_pression_avant}

                                                    ref={tech_pression_avant => this.tech_pression_avant = tech_pression_avant}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Pression arrière</label>
                                                <input name="tech_pression_arriere"
                                                    defaultValue={objetEdit.tech_pression_arriere}

                                                    ref={tech_pression_arriere => this.tech_pression_arriere = tech_pression_arriere}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                    </div>

                                    <div className="form-row">

                                 {/*        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Kilometrage lors de l'entrée au parc</label>
                                                </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <input name="kilometrage_nouvelle_acquisition"
                                                    defaultValue={objetEdit.kilometrage_nouvelle_acquisition}
                                                    ref={kilometrage_nouvelle_acquisition => this.kilometrage_nouvelle_acquisition = kilometrage_nouvelle_acquisition}
                                                    type="number" className="form-control" /></div>
                                        </div> */}

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Kilometrage actuel</label>

                                                    </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <input name="kilometrage_actuel"
                                                    defaultValue={objetEdit.kilometrage_actuel}

                                                    ref={kilometrage_actuel => this.kilometrage_actuel = kilometrage_actuel}
                                                    type="number" className="form-control" /></div>
                                        </div>





                                    </div>






                                </div>
                            </div>
                        </div>

                        {/** fin technique */}

                        {/*  acquisition */}

                        <div className="tab-pane tabs-animation fade" id="tab_acquisition" role="tabpanel">

                        <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <div className="form-row">
                                    <div className="col-md-3">
                                            <label className=""> Mode d'acquisition *</label>
                                            <select name="mode_acquisition"
                                                    defaultValue={objetEdit.mode_acquisition}
                                                    style={inputStyle}
                                                ref={mode_acquisition => this.mode_acquisition = mode_acquisition}
                                                className="form-control">
                                                <option value="0">Achat</option>
                                                <option value="1">Leasing</option>
                                                <option value="2">Prêt</option>
                                                {/* <option value="Location courte">Location courte</option>
                                                <option value="Location Longue Durée">Location Longue Durée</option> */}


                                            </select>

                                        </div>

                                        <div className="col-md-5">
                                            <label className="">Tiers d'acquisition *</label>

                                            <Select
                                                name="tiers"
                                                placeholder="Selectionnez un tiers"
                                                noOptionsMessage={() => "Aucun Tiers pour l'instant"}
                                                options={this.props.tiers}
                                                getOptionLabel={option => `${option.code} ${option.nom.slice(0, 15)}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                defaultValue={objetEdit.tiers ? objetEdit.tiers : null}

                                                onChange={this.setFieldSelect.bind(this, "tiers")}
                                                styles={colourStyles}
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="main-card mb-3 card">
                                <div className="card-body"><h5 className="card-title">Acquisition : {this.state.mode_acquisition == '0' ? 'Achat' : this.state.mode_acquisition == '1' ? 'Leasing' : this.state.mode_acquisition == '2' ? 'Prêt' : objetEdit.mode_acquisition == '0' ? 'Achat' : objetEdit.mode_acquisition == '1' ? 'Leasing' : objetEdit.mode_acquisition == '2' ? 'Prêt' : null}  </h5>



                                 {!this.state.mode_acquisition ?
                                    <React.Fragment>
                                           {objetEdit.mode_acquisition == '0' ?
                                        <div className="form-row">

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Prix HT</label>
                                                    <input name="acquisition_achat_prix_ht"
                                                    defaultValue={objetEdit.acquisition_achat_prix_ht}

                                                    onChange={this.setFieldPrixHT}
                                                        ref={acquisition_achat_prix_ht => this.acquisition_achat_prix_ht = acquisition_achat_prix_ht}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-1">
                                                <div className="position-relative form-group">
                                                    <label > TVA</label>


                                                    {this.props.tva.length ? <input name="acquisition_achat_taux_tva" type="number"
                                                        onChange={this.setFieldPrixHT}
                                                        defaultValue={objetEdit.acquisition_achat_taux_tva}
                                                        ref={acquisition_achat_taux_tva => this.acquisition_achat_taux_tva = acquisition_achat_taux_tva}
                                                        className="form-control" /> : <input name="acquisition_achat_taux_tva" type="number"
                                                            onChange={this.setField}
                                                            ref={acquisition_achat_taux_tva => this.acquisition_achat_taux_tva = acquisition_achat_taux_tva}
                                                            className="form-control" />}

                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >T T C</label>
                                                    <input name="acquisition_achat_prix_ttc"
                                                        onChange={this.setFieldTTC}
                                                        defaultValue={objetEdit.acquisition_achat_prix_ttc}

                                                        ref={acquisition_achat_prix_ttc => this.acquisition_achat_prix_ttc = acquisition_achat_prix_ttc}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >N° de Facture</label>
                                                    <input name="acquisition_achat_numero_facture"
                                                    defaultValue={objetEdit.acquisition_achat_numero_facture}

                                                        ref={acquisition_achat_numero_facture => this.acquisition_achat_numero_facture = acquisition_achat_numero_facture}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Date facture</label>
                                                    <input name="acquisition_achat_date_facture"
                                                    defaultValue={objetEdit.acquisition_achat_date_facture}

                                                        ref={acquisition_achat_date_facture => this.acquisition_achat_date_facture = acquisition_achat_date_facture}
                                                        type="date" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Réglée le</label>
                                                    <input name="acquisition_achat_reglee_le"
                                                    defaultValue={objetEdit.acquisition_achat_reglee_le}

                                                        ref={acquisition_achat_reglee_le => this.acquisition_achat_reglee_le = acquisition_achat_reglee_le}
                                                        type="date" className="form-control" /></div>
                                            </div>


                                        </div> : null
                                    }

                                    {objetEdit.mode_acquisition == '1'  ?
                                        <div className="form-row">

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >N° Contrat</label>
                                                    <input name="acquisition_leasing_numero_contrat"
                                                    defaultValue={objetEdit.acquisition_leasing_numero_contrat}

                                                        ref={acquisition_leasing_numero_contrat => this.acquisition_leasing_numero_contrat = acquisition_leasing_numero_contrat}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-1">
                                                <div className="position-relative form-group">
                                                    <label >Durée</label>
                                                    <select name="acquisition_leasing_duree_annee"
                                                    defaultValue={objetEdit.acquisition_leasing_duree_annee}

                                                        ref={acquisition_leasing_duree_annee => this.acquisition_leasing_duree_annee = acquisition_leasing_duree_annee}
                                                        className="form-control">
                                                        <option value="1">1 An</option>
                                                        <option value="2">2 Ans</option>
                                                        <option value="3">3 Ans</option>
                                                        <option value="4">4 Ans</option>
                                                        <option value="5">5 Ans</option>


                                                    </select>


                                                </div>


                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Apport initial</label>
                                                    <input name="acquisition_leasing_apport_initial"
                                                    defaultValue={objetEdit.acquisition_leasing_apport_initial}

                                                        ref={acquisition_leasing_apport_initial => this.acquisition_leasing_apport_initial = acquisition_leasing_apport_initial}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Loyer Mensuel</label>
                                                    <input name="acquisition_leasing_loyer_mensuel"
                                                    defaultValue={objetEdit.acquisition_leasing_loyer_mensuel}

                                                        ref={acquisition_leasing_loyer_mensuel => this.acquisition_leasing_loyer_mensuel = acquisition_leasing_loyer_mensuel}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Déja payé</label>
                                                    <input name="acquisition_leasing_deja_paye"
                                                    defaultValue={objetEdit.acquisition_leasing_deja_paye}

                                                        ref={acquisition_leasing_deja_paye => this.acquisition_leasing_deja_paye = acquisition_leasing_deja_paye}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Valeur Rachat</label>
                                                    <input name="acquisition_leasing_valeur_rachat"
                                                    defaultValue={objetEdit.acquisition_leasing_valeur_rachat}

                                                        ref={acquisition_leasing_valeur_rachat => this.acquisition_leasing_valeur_rachat = acquisition_leasing_valeur_rachat}
                                                        type="number" className="form-control" /></div>
                                            </div>


                                        </div> : null
                                    }

                                    { objetEdit.mode_acquisition =='2'  ?
                                        <div className="form-row">



                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Date de début</label>
                                                    <input name="acquisition_pret_date_debut"
                                                    defaultValue={objetEdit.acquisition_pret_date_debut}

                                                        ref={acquisition_pret_date_debut => this.acquisition_pret_date_debut = acquisition_pret_date_debut}
                                                        type="date" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Date de fin</label>
                                                    <input name="acquisition_pret_date_fin"
                                                    defaultValue={objetEdit.acquisition_pret_date_fin}

                                                        ref={acquisition_pret_date_fin => this.acquisition_pret_date_fin = acquisition_pret_date_fin}
                                                        type="date" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Kilometrage début</label>
                                                    <input name="acquisition_pret_kilometrage_debut"
                                                    defaultValue={objetEdit.acquisition_pret_kilometrage_debut}

                                                        ref={acquisition_pret_kilometrage_debut => this.acquisition_pret_kilometrage_debut = acquisition_pret_kilometrage_debut}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Kilometrage fin</label>
                                                    <input name="acquisition_pret_kilometrage_fin"
                                                    defaultValue={objetEdit.acquisition_pret_kilometrage_fin}

                                                        ref={acquisition_pret_kilometrage_fin => this.acquisition_pret_kilometrage_fin = acquisition_pret_kilometrage_fin}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Motif du prêt</label>
                                                    <textarea name="acquisition_pret_motif"
                                                    defaultValue={objetEdit.acquisition_pret_motif}

                                                        ref={acquisition_pret_motif => this.acquisition_pret_motif = acquisition_pret_motif}
                                                         className="form-control" /></div>
                                            </div>

                                        </div> : null
                                    }
                                    </React.Fragment> :

                                    <React.Fragment>
                                           {this.state.mode_acquisition == '0' ?
                                        <div className="form-row">

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Prix HT</label>
                                                    <input name="acquisition_achat_prix_ht"
                                                    defaultValue={objetEdit.acquisition_achat_prix_ht}

                                                    onChange={this.setFieldPrixHT}
                                                        ref={acquisition_achat_prix_ht => this.acquisition_achat_prix_ht = acquisition_achat_prix_ht}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-1">
                                                <div className="position-relative form-group">
                                                    <label >Taux de TVA</label>


                                                    {this.props.tva.length ? <input name="acquisition_achat_taux_tva" type="number"
                                                        onChange={this.setFieldPrixHT}
                                                        defaultValue={objetEdit.acquisition_achat_taux_tva}
                                                        ref={acquisition_achat_taux_tva => this.acquisition_achat_taux_tva = acquisition_achat_taux_tva}
                                                        className="form-control" /> : <input name="acquisition_achat_taux_tva" type="number"
                                                            onChange={this.setField}
                                                            ref={acquisition_achat_taux_tva => this.acquisition_achat_taux_tva = acquisition_achat_taux_tva}
                                                            className="form-control" />}

                                                </div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >T T C</label>
                                                    <input name="acquisition_achat_prix_ttc"
                                                        onChange={this.setFieldTTC}
                                                        defaultValue={objetEdit.acquisition_achat_prix_ttc}

                                                        ref={acquisition_achat_prix_ttc => this.acquisition_achat_prix_ttc = acquisition_achat_prix_ttc}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >N° de Facture</label>
                                                    <input name="acquisition_achat_numero_facture"
                                                    defaultValue={objetEdit.acquisition_achat_numero_facture}

                                                        ref={acquisition_achat_numero_facture => this.acquisition_achat_numero_facture = acquisition_achat_numero_facture}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Date facture</label>
                                                    <input name="acquisition_achat_date_facture"
                                                    defaultValue={objetEdit.acquisition_achat_date_facture}

                                                        ref={acquisition_achat_date_facture => this.acquisition_achat_date_facture = acquisition_achat_date_facture}
                                                        type="date" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Réglée le</label>
                                                    <input name="acquisition_achat_reglee_le"
                                                    defaultValue={objetEdit.acquisition_achat_reglee_le}

                                                        ref={acquisition_achat_reglee_le => this.acquisition_achat_reglee_le = acquisition_achat_reglee_le}
                                                        type="date" className="form-control" /></div>
                                            </div>


                                        </div> : null
                                    }

                                    {this.state.mode_acquisition == '1'  ?
                                        <div className="form-row">

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >N° Contrat</label>
                                                    <input name="acquisition_leasing_numero_contrat"
                                                    defaultValue={objetEdit.acquisition_leasing_numero_contrat}

                                                        ref={acquisition_leasing_numero_contrat => this.acquisition_leasing_numero_contrat = acquisition_leasing_numero_contrat}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-1">
                                                <div className="position-relative form-group">
                                                    <label >Durée</label>
                                                    <select name="acquisition_leasing_duree_annee"
                                                    defaultValue={objetEdit.acquisition_leasing_duree_annee}

                                                        ref={acquisition_leasing_duree_annee => this.acquisition_leasing_duree_annee = acquisition_leasing_duree_annee}
                                                        className="form-control">
                                                        <option value="1">1 An</option>
                                                        <option value="2">2 Ans</option>
                                                        <option value="3">3 Ans</option>
                                                        <option value="4">4 Ans</option>
                                                        <option value="5">5 Ans</option>


                                                    </select>


                                                </div>


                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Apport initial</label>
                                                    <input name="acquisition_leasing_apport_initial"
                                                    defaultValue={objetEdit.acquisition_leasing_apport_initial}

                                                        ref={acquisition_leasing_apport_initial => this.acquisition_leasing_apport_initial = acquisition_leasing_apport_initial}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Loyer Mensuel</label>
                                                    <input name="acquisition_leasing_loyer_mensuel"
                                                    defaultValue={objetEdit.acquisition_leasing_loyer_mensuel}

                                                        ref={acquisition_leasing_loyer_mensuel => this.acquisition_leasing_loyer_mensuel = acquisition_leasing_loyer_mensuel}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Déja payé</label>
                                                    <input name="acquisition_leasing_deja_paye"
                                                    defaultValue={objetEdit.acquisition_leasing_deja_paye}

                                                        ref={acquisition_leasing_deja_paye => this.acquisition_leasing_deja_paye = acquisition_leasing_deja_paye}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Valeur Rachat</label>
                                                    <input name="acquisition_leasing_valeur_rachat"
                                                    defaultValue={objetEdit.acquisition_leasing_valeur_rachat}

                                                        ref={acquisition_leasing_valeur_rachat => this.acquisition_leasing_valeur_rachat = acquisition_leasing_valeur_rachat}
                                                        type="number" className="form-control" /></div>
                                            </div>


                                        </div> : null
                                    }

                                    { this.state.mode_acquisition =='2'  ?
                                        <div className="form-row">



                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Date de début</label>
                                                    <input name="acquisition_pret_date_debut"
                                                    defaultValue={objetEdit.acquisition_pret_date_debut}

                                                        ref={acquisition_pret_date_debut => this.acquisition_pret_date_debut = acquisition_pret_date_debut}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-1">
                                                <div className="position-relative form-group">
                                                    <label >Date de fin</label>
                                                    <input name="acquisition_pret_date_fin"
                                                    defaultValue={objetEdit.acquisition_pret_date_fin}

                                                        ref={acquisition_pret_date_fin => this.acquisition_pret_date_fin = acquisition_pret_date_fin}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Kilometrage début</label>
                                                    <input name="acquisition_pret_kilometrage_debut"
                                                    defaultValue={objetEdit.acquisition_pret_kilometrage_debut}

                                                        ref={acquisition_pret_kilometrage_debut => this.acquisition_pret_kilometrage_debut = acquisition_pret_kilometrage_debut}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Kilometrage fin</label>
                                                    <input name="acquisition_pret_kilometrage_fin"
                                                    defaultValue={objetEdit.acquisition_pret_kilometrage_fin}

                                                        ref={acquisition_pret_kilometrage_fin => this.acquisition_pret_kilometrage_fin = acquisition_pret_kilometrage_fin}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Motif du prêt</label>
                                                    <textarea name="acquisition_pret_motif"
                                                    defaultValue={objetEdit.acquisition_pret_motif}

                                                        ref={acquisition_pret_motif => this.acquisition_pret_motif = acquisition_pret_motif}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                        </div> : null
                                    }
                                    </React.Fragment>
                                }






                                </div>
                            </div>

                        </div>

                        {/** fin acquisition */}


                        {/*  assurance */}

                        <div className="tab-pane tabs-animation fade" id="tab_assurance" role="tabpanel">

                        {contrat_en_cour ?
                            <div className="main-card mb-3 card">
                                <div className="card-body">

                                    <div className="form-row">


                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >N° de contrat/Police * </label>
                                            <input name="numero_contrat_police"  type="text"
                                            onChange={this.setField}
                                            defaultValue={contrat_en_cour.numero_contrat_police}
                                            readOnly
                                            style={inputStyle}
                                            ref={numero_contrat_police => this.numero_contrat_police = numero_contrat_police}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Date du contrat *</label>
                                            <input name="date_contrat"  type="date"
                                            style={inputStyle}
                                            defaultValue={contrat_en_cour.date_contrat}

                                            onChange={this.setFieldDateContrat}
                                            ref={date_contrat => this.date_contrat = date_contrat}
                                             className="form-control" />
                                             </div>
                                    </div>




                                </div>

                                <div className="form-row">
                                <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Période de validité ===></label>

                                             </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de debut *</label>
                                            <input name="periode_date_debut"  type="date"
                                            style={inputStyle}
                                            readOnly
                                            defaultValue={contrat_en_cour.periode_date_debut}
                                            readOnly
                                            onChange={this.setField}
                                            ref={periode_date_debut => this.periode_date_debut = periode_date_debut}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de fin *</label>
                                            <input name="periode_date_fin"  type="date"
                                            style={inputStyle}
                                            defaultValue={contrat_en_cour.periode_date_fin}
                                            readOnly
                                            onChange={this.setField}
                                            ref={periode_date_fin => this.periode_date_fin = periode_date_fin}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date de prise d'effet *</label>
                                            <input name="date_prise_effet"  type="date"
                                            style={inputStyle}
                                            onChange={this.setField}
                                            defaultValue={contrat_en_cour.date_prise_effet}
                                            readOnly
                                            ref={date_prise_effet => this.date_prise_effet = date_prise_effet}
                                             className="form-control" />
                                             </div>
                                    </div>

                                </div>

                                <div className="form-row">

                                <div className="col-md-3">
                                         <label  className="">Compagnie d'assurance</label>


                                        <Select
                                        name="compagnie_assurance"
                                        placeholder="Selectionnez la compagnie"
                                        noOptionsMessage={() => "Aucun Tiers pour l'instant"}
                                        options={this.props.tiers.filter(tier => tier.type_tiers == "ASSUREUR")}
                                        getOptionLabel={option => option.code}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldCompagnie}
                                        isDisabled
                                        defaultValue={contrat_en_cour.compagnie_assurance ? contrat_en_cour.compagnie_assurance : null}
                                        styles={colourStyles}
                                      />

                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Courtier</label>
                                        <select name="courtier" onChange={this.setField}
                                            ref={courtier => this.courtier = courtier}
                                            defaultValue={contrat_en_cour.courtier ? contrat_en_cour.courtier.id : null}
                                            readOnly
                                          className="form-control">

                                        <option defaultValue={null}></option>

                                        {this.props.tiers.filter(ti => ti.type_tiers == "COURSIER").map(tier =>
                                                <option key={tier.id} value={tier.id}>{tier.code} </option>

                                                )}
                                        </select>

                                        </div>


                                        <div className="col-md-3">
                                            <label >Valeur assurée</label>

                                            <input name="valeur_assuree"
                                             defaultValue={contrat_en_cour.valeur_assuree}
                                             readOnly
                                            ref={valeur_assuree => this.valeur_assuree = valeur_assuree}
                                              type="number" className="form-control" />
                                        </div>

                                        <div className="col-md-3">
                                            <label >Montant assuré des objets</label>

                                            <input name="montant_assuree"
                                            defaultValue={contrat_en_cour.montant_assuree}
                                            readOnly
                                                onChange={this.setField}
                                            ref={montant_assuree => this.montant_assuree = montant_assuree}
                                              type="number" className="form-control" />
                                        </div>


                                    </div>

                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant de la prime</label>
                                            <input name="montant_prime"  type="number"
                                            defaultValue={contrat_en_cour.montant_prime}
                                            readOnly
                                            ref={montant_prime => this.montant_prime = montant_prime}
                                             className="form-control" />
                                             </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Pourcentage assiète</label>

                                            <input name="pourcentage_assiete"
                                            defaultValue={contrat_en_cour.pourcentage_assiete}

                                            ref={pourcentage_assiete => this.pourcentage_assiete = pourcentage_assiete}
                                            readOnly
                                              type="number" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant franchise</label>

                                            <input name="montant_franchise"
                                            defaultValue={contrat_en_cour.montant_franchise}

                                            ref={montant_franchise => this.montant_franchise = montant_franchise}
                                            readOnly
                                              type="number" className="form-control" /></div>
                                    </div>


                                </div>






                                </div>
                            </div> : null }
                        </div>

                        {/** fin assurance */}

                            {/*  photo vehicule */}

                            <div className="tab-pane tabs-animation fade" id="tab_photo_vehicule" role="tabpanel">


                                <div className="main-card mb-3 card">
                                    <div className="card-body">


                                        <div className="form-row">

                                            <div className="col-md-5">
                                            <input type="file" className="form-control" onChange={this.handleFile} />
                                            </div>

                                            {this.state.file != null ?   <div className="col-md-2">
                                            <span className="mt-2 btn btn-danger" onClick={() => this.setState({
                                                file: null,
                                                previewFile: null
                                            })}>
                                                Annuler
                                            </span>
                                        </div> : null}


                                        </div>


                                    </div>
                                </div>
                                <div className="main-card mb-3 card">
                                     <img style={{ objectFit: 'contain'}} src={this.state.file == null ? `/uploads/vehicules_photos/${objetEdit.photo}` : this.state.previewFile}/>
                                </div>



                                </div>

                                {/** fin photo vehicule */}

                                   {/*  Géolocalisation */}

                           <div className="tab-pane tabs-animation fade" id="tab_geolocalisation" role="tabpanel">


                            <div className="main-card mb-3 card" style={{height: '100vh', width: '100%'}}>
                                <GoogleMapreact
                                    bootstrapURLKeys={{key: 'AIzaSyCnwSwHJCxLnNYvXf5EVJTpKyBbsIBS-rI'}}
                                defaultCenter={this.props.center}
                                defaultZoom={this.props.zoom}
                                >
                                    <Comp
                                    lat={5.357367}
                                    lng={-3.994934}
                                    text="Ma Position"
                                        />
                                </GoogleMapreact>
                            </div>




                            </div>

                            {/** fin Géolocalisation */}





                        <div className="d-block  card-footer">
                            <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
                            <span onClick={() => this.props.history.goBack()}
                                className="mt-2 btn btn-warning pull-right">Retour</span>
                        </div>
                    </div>



                </form>

                <ToastContainer autoClose={4000} />


                </React.Fragment> :
                <span style={{textAlign: 'center'}}>

                    <Loader

                        height={100}
                        width={100}
                    />
                    </span> }
            </div>
        )
    }
}

const Comp = ({text}) => <div>{text}</div>


const mapStateToProps = state => {
    return {
        categories_vehicules: state.categories_vehicules.items,
        tiers: state.tiers.items,
        marques: state.marques.items,
        entites: state.entites.items,
        natures_energies: state.natures_energies.items,
        personnels: state.personnels.items,
        tva: state.tva.items,
        contrat_assurances: state.contrat_assurances.items,
        vehicules: state.vehicules.items,
        plan_organisationnels: state.plan_organisationnels.items,
        plan_geographiques: state.plan_geographiques.items,
        structure_geographiques: state.structure_geographiques.items,
        structure_organisationnelles: state.structure_organisationnelles.items,
        structure_vehicules: state.structure_vehicules.items,
        plan_vehicules: state.plan_vehicules.items,
        param_vehicule: state.param_vehicule.items


    }
}

export default connect(mapStateToProps)(ModifierVehicule)
