import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format';
import today from '../../../utils/today'
import Select from 'react-select';
import { colourStyles } from '../../../utils/Repository';


const formatOptionVehicule = data => (
    <div style={groupStyles}>
        <span>{data.immatriculation}</span>
    </div>
);

const formatOptionTiers = data => (
    <div style={groupStyles}>
        <span>{data.code}</span>
    </div>
);

const inputStyle = {
    // backgroundColor: '#85b9e9' FEBFD2
    backgroundColor: '#FEBFD2'

}

// const date = new Date();

//  const today = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString().padStart(2, 0) + 
//     '-' + date.getDate().toString().padStart(2, 0);


class AjouterVehicule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormSubmitted: false,
            mode_acquisition: '0',
        }
    }

    setFieldSelect(name, value) {
        // this.setState({ vehicule });
        //console.log(`Option selected:`, selectedOption.code);
        // this.setState({[event.target.name]: value}, () => console.log(this.state.entite_comptable));
        //this.setState({[name]: e.value})
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



    verificationFormulaire() {
        if (this.immatriculation.value == undefined || !this.immatriculation.value.length) {
            return "L'immatriculation est obligatoire !"
        } else if (this.state.entite_comptable == undefined ) {
            return "L'entité d'affectation comptable est obligatoire"
        } else if (this.state.entite_physique == undefined) {
            return "L'entité d'affectation physique est obligatoire"
        } else if (this.state.categorie == undefined ) {
            return "La catégorie est obligatoire"
        } else if (this.state.marque == undefined ) {
            return "La marque est obligatoire"
        } else if (this.modele.value == undefined || !this.modele.value.length) {
            return "Le modèle est obligatoire"
        } else if (this.state.tiers == undefined ) {
            return "Le Tiers d'acquisition est obligatoire"
        }else if (this.state.contrat_assurance_id == undefined && this.props.contrat_assurances.length) {
            if(!this.props.contrat_assurances.find(contrat => contrat.defaut)) return "Le Véhicule doit être lié à contrat d'assurance"
            
        } else if (this.date_entree_au_parc.value == undefined || !this.date_entree_au_parc.value.length) {
            return "La date d'entrée au parc est obligatoire"
        }
        else {
            return null
        }

    }

    sendData(){
        this.setState({ isFormSubmitted: true })
        axios.post('/api/ajouter_vehicule', {
            immatriculation: this.immatriculation.value,
            entite_comptable: this.state.entite_comptable ? this.state.entite_comptable.id : null,
            entite_physique: this.state.entite_physique ? this.state.entite_physique.id : null,
            type_vehicule_statut: this.type_vehicule_statut.value,
            etat_vehicule_status: this.etat_vehicule_status.value,
            date_commande: this.date_commande.value,
            // vehicule propre a faire
            //  vehicule_propre: this.state.vehicule_propre,
            mode_acquisition: this.mode_acquisition.value,
            date_livraison_previsionelle: this.date_livraison_previsionelle.value,
            date_livraison_reele: this.date_livraison_reele.value,
            numero_commande: this.numero_commande.value,
            demandeur: this.state.demandeur ? this.state.demandeur.id : null,

          //  neuf_occasion: this.neuf_occasion.checked, //booleen a faire*************
            date_entree_au_parc: this.date_entree_au_parc.value,
            annee_mise_circulation: this.annee_mise_circulation.value,
            premiere_mise_circulation: this.premiere_mise_circulation.value,
            categorie: this.state.categorie ? this.state.categorie.id : null,
            marque: this.state.marque ? this.state.marque.id : null,
            tiers: this.state.tiers ? this.state.tiers.id : null,
            detenteur: this.state.detenteur ? this.state.detenteur.id : null,
            chauffeur_atitre: this.state.chauffeur_atitre ? this.state.chauffeur_atitre.id : null,

            precision_energie: this.precision_energie.value,
            modele: this.modele.value,
            code_modele: this.code_modele.value,
            energie: this.state.energie ? this.state.energie.id : null,
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
            kilometrage_nouvelle_acquisition: this.kilometrage_nouvelle_acquisition.value,
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
            assurance_valeur_assuree_contrat: this.assurance_valeur_assuree_contrat.value,
            assurance_valeur_assuree_specifique: this.assurance_valeur_assuree_specifique.value,
            assurance_prime_annuelle_contrat: this.assurance_prime_annuelle_contrat.value,
            assurance_prime_annuelle_specifique: this.assurance_prime_annuelle_specifique.value,
            contrat_assurance_id: this.state.contrat_assurance_id ? this.state.contrat_assurance_id.id : this.props.contrat_assurances.length ? this.props.contrat_assurances.find(contrat => contrat.defaut).id : null,

        }).then(response => {

            const action = { type: "ADD_VEHICULE", value: response.data }
            this.props.dispatch(action)
            this.setState({ isFormSubmitted: false })
            this.props.history.goBack();
        }).catch(error => {
            this.setState({ isFormSubmitted: false })
            console.log(error)
        })
    }

    confirmAlertBefore(){
        let message 
        if (this.state.mode_acquisition == '0' && this.acquisition_achat_prix_ttc.value == '' ) {
            message = "Vous N'avez pas renseigné le montant T T C de l'achat, Souhaitez-vous continuer ?"
            if(confirm(message)) return this.sendData()
        }else if(this.state.mode_acquisition == '1' && this.acquisition_leasing_loyer_mensuel.value == ''){
            message = "Vous N'avez pas renseigné le loyer mensuel du leasing, Souhaitez-vous continuer ?"
            if(confirm(message)) return this.sendData()
        }else if(  this.kilometrage_nouvelle_acquisition.value == ''){
            message = "Vous N'avez pas renseigné le Kilometrage lors de l'entrée au parc Souhaitez-vous continuer ?"
            if(confirm(message)) return this.sendData()
        }

        return this.sendData() 
    }

    enregistrerVehicule = (e) => {
        e.preventDefault()
        if (this.verificationFormulaire() == null) {
         
         this.confirmAlertBefore();
        } else {
            //console.log(this.verificationFormulaire())
            toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }


    render() {
        //console.log(this.checkUser())
        //  console.log(new Date())
       // console.log(this.state.demandeur)
        // if(this.props.contrat_assurances.length){
        //     this.setState({
        //         contrat_assurance_id: this.props.contrat_assurances.find(contrat => contrat.defaut) ? this.props.contrat_assurances.find(contrat => contrat.defaut) : null

        //     })
        // }
        return (
            <div className="app-main__inner">
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

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Immatriculation *</label>
                                                <input name="immatriculation"
                                                    ref={immatriculation => this.immatriculation = immatriculation}
                                                    type="text"
                                                    style={inputStyle}
                                                    className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Entité d'affectation comptable *</label>
                                            {/* <select name="entite_comptable"
                                                style={inputStyle}

                                                ref={entite_comptable => this.entite_comptable = entite_comptable}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.entites.map(ent =>
                                                    <option key={ent.id} value={ent.id}>{ent.entite} _ {ent.nom_entite}</option>
                                                )}

                                            </select> */}

                                            <Select
                                                name="entite_comptable"
                                                placeholder="Selectionnez une Entité"
                                                noOptionsMessage={() => "Aucune Entité pour l'instant"}
                                                options={this.props.entites}
                                                getOptionLabel={option => option.entite}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "entite_comptable")}
                                                styles={colourStyles}
                                            />

                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Entité d'affectation physique *</label>


                                            <Select
                                                name="entite_physique"
                                                placeholder="Selectionnez une Entité"
                                                noOptionsMessage={() => "Aucune Entité pour l'instant"}
                                                options={this.props.entites}
                                                getOptionLabel={option => option.entite}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "entite_physique")}
                                                styles={colourStyles}
                                            />

                                        </div>




                                    </div>

                                    <div className="form-row">



                                        <div className="col-md-2">
                                            <label className="">Type de véhicule</label>
                                            <select name="type_vehicule_statut"
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
                                                ref={etat_vehicule_status => this.etat_vehicule_status = etat_vehicule_status}
                                                className="form-control">
                                                <option value="En service">En Service</option>
                                                <option value="Commande">Commande</option>
                                                <option value="Vendu">Vendu</option>
                                                <option value="Restitué">Restitué</option>
                                                <option value="Sorti">Sorti</option>


                                            </select>

                                        </div>

                                        <div className="col-md-3">
                                            <label className=""> Mode d'acquisition *</label>
                                            <select name="mode_acquisition"
                                                defaultValue="0"
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

                                        <div className="col-md-2">
                                            <label className="">Etat </label>
                                            <select name="mode_acquisition_etat_vehicule"
                                                ref={mode_acquisition_etat_vehicule => this.mode_acquisition_etat_vehicule = mode_acquisition_etat_vehicule}
                                                className="form-control">
                                                <option value="Neuf">Neuf</option>
                                                <option value="Occasion">Occasion</option>


                                            </select>

                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Type </label>
                                            <select name="mode_acquisition_type_vehicule"
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
                                                    ref={date_commande => this.date_commande = date_commande}
                                                    type="date" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Numero de la commande</label>
                                                <input name="numero_commande"
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
                                                onChange={this.setFieldSelect.bind(this, "demandeur")}
                                            />

                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Livraison prévue</label>
                                                <input name="date_livraison_previsionelle"
                                                    ref={date_livraison_previsionelle => this.date_livraison_previsionelle = date_livraison_previsionelle}
                                                    type="date" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Livré le</label>
                                                <input name="date_livraison_reele"
                                                    ref={date_livraison_reele => this.date_livraison_reele = date_livraison_reele}
                                                    type="date" className="form-control" /></div>
                                        </div>






                                    </div>

                                    <div className="form-row">



                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Entrée au parc</label>
                                                <input name="date_entree_au_parc"
                                                    style={inputStyle}
                                                    defaultValue={today}
                                                    ref={date_entree_au_parc => this.date_entree_au_parc = date_entree_au_parc}
                                                    type="date" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Année mise en circulation</label>
                                                <input name="annee_mise_circulation"
                                                    ref={annee_mise_circulation => this.annee_mise_circulation = annee_mise_circulation}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >1ère mise en circulation</label>
                                                <input name="premiere_mise_circulation"
                                                    ref={premiere_mise_circulation => this.premiere_mise_circulation = premiere_mise_circulation}
                                                    type="date" className="form-control" /></div>
                                        </div>



                                    </div>

                                    <div className="form-row">

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Code modèle *</label>
                                                <input name="code_modele"

                                                    ref={code_modele => this.code_modele = code_modele}
                                                    type="text"

                                                    className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label > Modèle *</label>
                                                <input name="modele"
                                                    style={inputStyle}

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
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "marque")}
                                                styles={colourStyles}
                                            />

                                        </div>





                                    </div>

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
                                                onChange={this.setFieldSelect.bind(this, "energie")}
                                                styles={colourStyles}
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Tiers d'acquisition *</label>


                                            <Select
                                                name="tiers"
                                                placeholder="Selectionnez un tiers"
                                                noOptionsMessage={() => "Aucun Tiers pour l'instant"}
                                                options={this.props.tiers}
                                                getOptionLabel={option => `${option.code} ${option.nom.slice(0, 15)}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "tiers")}
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
                                                onChange={this.setFieldSelect.bind(this, "detenteur")}
                                            />


                                        </div>





                                    </div>

                                    <div className="form-row">

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Précision énergie</label>
                                                <input name="precision_energie"
                                                    ref={precision_energie => this.precision_energie = precision_energie}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Type vehicule (carte grise)</label>
                                                <input name="type_vehicule_carte_grise"
                                                    ref={type_vehicule_carte_grise => this.type_vehicule_carte_grise = type_vehicule_carte_grise}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >N° carte grise</label>
                                                <input name="numero_carte_grise"
                                                    ref={numero_carte_grise => this.numero_carte_grise = numero_carte_grise}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Coût de la carte grise</label>
                                                <input name="cout_carte_grise"
                                                    ref={cout_carte_grise => this.cout_carte_grise = cout_carte_grise}
                                                    type="text" className="form-control" /></div>
                                        </div>



                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Détenu depuis le</label>
                                                <input name="detenu_depuis"
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
                                                    ref={garantie_annee => this.garantie_annee = garantie_annee}
                                                    type="number" className="form-control" />
                                            </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Date de fin</label>
                                                <input name="grantie_date_fin"
                                                    ref={grantie_date_fin => this.grantie_date_fin = grantie_date_fin}
                                                    type="date" className="form-control" /></div>
                                        </div>
                                        <div className="col-md-3">
                                            <label className="">Etat garantie</label>
                                            <select name="garantie_en_cours"
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
                                                    ref={amortissement_annee => this.amortissement_annee = amortissement_annee}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Date de fin</label>
                                                <input name="amortissement_date_fin"
                                                    ref={amortissement_date_fin => this.amortissement_date_fin = amortissement_date_fin}
                                                    type="date" className="form-control" /></div>
                                        </div>


                                        <div className="col-md-3">
                                            <label className="">Etat de l'amortissement</label>
                                            <select name="amortissement_etat"
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
                                                    ref={lieu_prise_en_charge_vehicule => this.lieu_prise_en_charge_vehicule = lieu_prise_en_charge_vehicule}
                                                    type="text" className="form-control" /></div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="position-relative form-group">

                                                <label className="">Lieu de restitution véhicule et clés</label>
                                                <input name="lieu_restitution"
                                                    ref={lieu_restitution => this.lieu_restitution = lieu_restitution}
                                                    type="text" className="form-control" />
                                            </div>
                                        </div>




                                        <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label >Lieu stockage double des clés</label>
                                                <input name="lieu_stockage_double"
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
                                                        ref={reservable => this.reservable = reservable}
                                                        onChange={this.setField}
                                                        defaultChecked={true}
                                                        name="reservable" className="" /></label>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="">Type de permis nécessaire pour ce véhicule</label>
                                            <select name="type_permis"
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
                                            <select name="etat_vehicule_physique    "
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
                                                    ref={tech_chevaux_fiscaux => this.tech_chevaux_fiscaux = tech_chevaux_fiscaux}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="position-relative form-group">
                                                <label >Couleur</label>
                                                <input name="tech_couleur"
                                                    ref={tech_couleur => this.tech_couleur = tech_couleur}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Couleur intérieure</label>
                                                <input name="tech_couleur_interieure"
                                                    ref={tech_couleur_interieure => this.tech_couleur_interieure = tech_couleur_interieure}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >N° de série</label>
                                                <input name="tech_numero_serie"
                                                    ref={tech_numero_serie => this.tech_numero_serie = tech_numero_serie}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Information moteur</label>
                                                <input name="tech_information_moteur"
                                                    ref={tech_information_moteur => this.tech_information_moteur = tech_information_moteur}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >N° du moteur</label>
                                                <input name="tech_numero_moteur"
                                                    ref={tech_numero_moteur => this.tech_numero_moteur = tech_numero_moteur}
                                                    type="text" className="form-control" /></div>
                                        </div>


                                    </div>


                                    <div className="form-row">



                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Poids à vide</label>
                                                <input name="tech_poids_vide"
                                                    ref={tech_poids_vide => this.tech_poids_vide = tech_poids_vide}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="position-relative form-group">
                                                <label >En charge</label>
                                                <input name="tech_en_charge"
                                                    ref={tech_en_charge => this.tech_en_charge = tech_en_charge}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Capacité réservoire (litres)</label>
                                                <input name="tech_capacite_reservoire"
                                                    ref={tech_capacite_reservoire => this.tech_capacite_reservoire = tech_capacite_reservoire}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Taux émission CO2</label>
                                                <input name="tech_taux_emmission_co2"
                                                    ref={tech_taux_emmission_co2 => this.tech_taux_emmission_co2 = tech_taux_emmission_co2}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Volume intérieur (M3)</label>
                                                <input name="tech_volume_interieur"
                                                    ref={tech_volume_interieur => this.tech_volume_interieur = tech_volume_interieur}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="position-relative form-group">
                                                <label >Longueur</label>
                                                <input name="tech_longueur"
                                                    ref={tech_longueur => this.tech_longueur = tech_longueur}
                                                    type="text" className="form-control" /></div>
                                        </div>






                                    </div>


                                    <div className="form-row">

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Largeur</label>
                                                <input name="tech_largeur"
                                                    ref={tech_largeur => this.tech_largeur = tech_largeur}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-1">
                                            <div className="position-relative form-group">
                                                <label >Hauteur</label>
                                                <input name="tech_hauteur"
                                                    ref={tech_hauteur => this.tech_hauteur = tech_hauteur}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Taille des pneus</label>
                                                <input name="tech_taille_pneu"
                                                    ref={tech_taille_pneu => this.tech_taille_pneu = tech_taille_pneu}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Pression avant</label>
                                                <input name="tech_pression_avant"
                                                    ref={tech_pression_avant => this.tech_pression_avant = tech_pression_avant}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Pression arrière</label>
                                                <input name="tech_pression_arriere"
                                                    ref={tech_pression_arriere => this.tech_pression_arriere = tech_pression_arriere}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                    </div>

                                    <div className="form-row">

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Kilometrage lors de l'entrée au parc</label>
                                                </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <input name="kilometrage_nouvelle_acquisition"
                                                defaultValue="0"
                                                    ref={kilometrage_nouvelle_acquisition => this.kilometrage_nouvelle_acquisition = kilometrage_nouvelle_acquisition}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Kilometrage actuel</label>
                                                
                                                    </div>
                                        </div>

                                        <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <input name="kilometrage_actuel"
                                                    ref={kilometrage_actuel => this.kilometrage_actuel = kilometrage_actuel}
                                                    type="text" className="form-control" /></div>
                                        </div>

                                     

                                      

                                    </div>






                                </div>
                            </div>
                        </div>

                        {/** fin technique */}

                        {/*  acquisition */}

                        <div className="tab-pane tabs-animation fade" id="tab_acquisition" role="tabpanel">

                            <div className="main-card mb-3 card">
                                <div className="card-body"><h5 className="card-title">Acquisition : {this.state.mode_acquisition == '0' ? 'Achat' : this.state.mode_acquisition == '1' ? 'Leasing' : this.state.mode_acquisition == '2' ? 'Prêt' : 'Achat'} </h5>



                                    {this.state.mode_acquisition == '0' &&
                                        <div className="form-row">

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Prix HT</label>
                                                    <input name="acquisition_achat_prix_ht"
                                                    onChange={this.setFieldPrixHT}
                                                        ref={acquisition_achat_prix_ht => this.acquisition_achat_prix_ht = acquisition_achat_prix_ht}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-1">
                                                <div className="position-relative form-group">
                                                    <label >Taux de TVA</label>


                                                    {this.props.tva.length ? <input name="acquisition_achat_taux_tva" type="number"
                                                        onChange={this.setFieldPrixHT}
                                                        defaultValue={this.props.tva.find(tva => tva.defaut).taux || 18}
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

                                                        ref={acquisition_achat_prix_ttc => this.acquisition_achat_prix_ttc = acquisition_achat_prix_ttc}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >N° de Facture</label>
                                                    <input name="acquisition_achat_numero_facture"
                                                        ref={acquisition_achat_numero_facture => this.acquisition_achat_numero_facture = acquisition_achat_numero_facture}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Date facture</label>
                                                    <input name="acquisition_achat_date_facture"
                                                        ref={acquisition_achat_date_facture => this.acquisition_achat_date_facture = acquisition_achat_date_facture}
                                                        type="date" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Réglée le</label>
                                                    <input name="acquisition_achat_reglee_le"
                                                        ref={acquisition_achat_reglee_le => this.acquisition_achat_reglee_le = acquisition_achat_reglee_le}
                                                        type="date" className="form-control" /></div>
                                            </div>


                                        </div>
                                    }

                                    {this.state.mode_acquisition == '1' &&
                                        <div className="form-row">

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >N° Contrat</label>
                                                    <input name="acquisition_leasing_numero_contrat"
                                                        ref={acquisition_leasing_numero_contrat => this.acquisition_leasing_numero_contrat = acquisition_leasing_numero_contrat}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-1">
                                                <div className="position-relative form-group">
                                                    <label >Durée</label>
                                                    <select name="acquisition_leasing_duree_annee"
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
                                                        ref={acquisition_leasing_apport_initial => this.acquisition_leasing_apport_initial = acquisition_leasing_apport_initial}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Loyer Mensuel</label>
                                                    <input name="acquisition_leasing_loyer_mensuel"
                                                        ref={acquisition_leasing_loyer_mensuel => this.acquisition_leasing_loyer_mensuel = acquisition_leasing_loyer_mensuel}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Déja payé</label>
                                                    <input name="acquisition_leasing_deja_paye"
                                                        ref={acquisition_leasing_deja_paye => this.acquisition_leasing_deja_paye = acquisition_leasing_deja_paye}
                                                        type="number" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Valeur Rachat</label>
                                                    <input name="acquisition_leasing_valeur_rachat"
                                                        ref={acquisition_leasing_valeur_rachat => this.acquisition_leasing_valeur_rachat = acquisition_leasing_valeur_rachat}
                                                        type="number" className="form-control" /></div>
                                            </div>


                                        </div>
                                    }

                                    {this.state.mode_acquisition == '2' &&
                                        <div className="form-row">



                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Date de début</label>
                                                    <input name="acquisition_pret_date_debut"
                                                        ref={acquisition_pret_date_debut => this.acquisition_pret_date_debut = acquisition_pret_date_debut}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-1">
                                                <div className="position-relative form-group">
                                                    <label >Date de fin</label>
                                                    <input name="acquisition_pret_date_fin"
                                                        ref={acquisition_pret_date_fin => this.acquisition_pret_date_fin = acquisition_pret_date_fin}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Kilometrage début</label>
                                                    <input name="acquisition_pret_kilometrage_debut"
                                                        ref={acquisition_pret_kilometrage_debut => this.acquisition_pret_kilometrage_debut = acquisition_pret_kilometrage_debut}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Kilometrage fin</label>
                                                    <input name="acquisition_pret_kilometrage_fin"
                                                        ref={acquisition_pret_kilometrage_fin => this.acquisition_pret_kilometrage_fin = acquisition_pret_kilometrage_fin}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Motif du prêt</label>
                                                    <textarea name="acquisition_pret_motif"
                                                        ref={acquisition_pret_motif => this.acquisition_pret_motif = acquisition_pret_motif}
                                                        type="text" className="form-control" /></div>
                                            </div>

                                        </div>
                                    }






                                </div>
                            </div>

                        </div>

                        {/** fin acquisition */}


                        {/*  assurance */}

                        <div className="tab-pane tabs-animation fade" id="tab_assurance" role="tabpanel">


                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <h5 className="card-title">Assurance</h5>
                                    {!this.props.contrat_assurances.length ?
                                    <h4>Les éléments du contrat doivent obligatoirement voir été creés dans la gestion des contrats,
                                        Vous pouvez cependant saisir hors contrat les valeur assurées et primes spécifiques
                                    </h4> : null }

                                    <div className="form-row">

                                        <div className="col-md-5">
                                            <div className="position-relative form-group">
                                                <label >N° Contrat Assurance</label>
                                                {this.props.contrat_assurances.length ?
                                                    <Select
                                                        name="contrat_assurance_id"
                                                        placeholder="Selectionnez un Contrat"
                                                        noOptionsMessage={() => "Aucun Aucun contrat pour l'instant"}
                                                        options={this.props.contrat_assurances}
                                                        getOptionLabel={option => `${option.numero_contrat_police}`}
                                                        getOptionValue={option => option.id}
                                                        defaultValue={this.props.contrat_assurances.find(contrat => contrat.defaut)  || null}
                                                        styles={colourStyles}
                                                        // formatOptionLabel={formatOptionVehicule}
                                                        onChange={this.setFieldSelect.bind(this, "contrat_assurance_id")}
                                                    /> : <input name="tech_couleur"
                                                        readOnly
                                                        defaultValue="Vous devez creer un contrat d'assurance"
                                                        type="text" className="form-control" />}
                                            </div>
                                        </div>

                                        {/* <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label >Compagnie</label>

                                                {this.contrat_assurance_id && this.props.contrat_assurances.length && this.contrat_assurance_id.value != '' ? <input name="tech_couleur"
                                                    readOnly
                                                    defaultValue={this.props.contrat_assurances.find(cont => cont.id == this.contrat_assurance_id.value).compagnie_assurance.code}
                                                    type="text" className="form-control" /> : <input name="tech_couleur"
                                                        readOnly
                                                        type="text" className="form-control" />}
                                            </div>
                                        </div> */}

                                        {/* <div className="col-md-2">
                                            <div className="position-relative form-group">
                                                <label >Courtier</label>
                                                <input name="tech_couleur_interieure"
                                                readOnly
                                                    ref={tech_couleur_interieure => this.tech_couleur_interieure = tech_couleur_interieure}
                                                    type="text" className="form-control" /></div>
                                        </div> */}



                                    </div>



                                    <div className="form-row">



                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Valeur Assurée (contrat)</label>
                                                <input name="assurance_valeur_assuree_contrat"
                                                    ref={assurance_valeur_assuree_contrat => this.assurance_valeur_assuree_contrat = assurance_valeur_assuree_contrat}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Valeur Assurée (si spécifique)</label>
                                                <input name="assurance_valeur_assuree_specifique"
                                                    ref={assurance_valeur_assuree_specifique => this.assurance_valeur_assuree_specifique = assurance_valeur_assuree_specifique}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Prime annuelle d'Assurance (contrat)</label>
                                                <input name="assurance_prime_annuelle_contrat"
                                                    ref={assurance_prime_annuelle_contrat => this.assurance_prime_annuelle_contrat = assurance_prime_annuelle_contrat}
                                                    type="number" className="form-control" /></div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Prime annuelle d'Assurance (Si spécifique)</label>
                                                <input name="assurance_prime_annuelle_specifique"
                                                    ref={assurance_prime_annuelle_specifique => this.assurance_prime_annuelle_specifique = assurance_prime_annuelle_specifique}
                                                    type="number" className="form-control" /></div>
                                        </div>


                                    </div>






                                </div>
                            </div>
                        </div>

                        {/** fin assurance */}





                        <div className="d-block  card-footer">
                            <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
                            <span onClick={() => this.props.history.goBack()}
                                className="mt-2 btn btn-warning pull-right">Retour</span>
                        </div>
                    </div>



                </form>

                <ToastContainer autoClose={4000} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories_vehicules: state.categories_vehicules.items,
        tiers: state.tiers.items,
        marques: state.marques.items,
        entites: state.entites.items,
        natures_energies: state.natures_energies.items,
        personnels: state.personnels.items,
        tva: state.tva.items,
        contrat_assurances: state.contrat_assurances.items

    }
}

export default connect(mapStateToProps)(AjouterVehicule)