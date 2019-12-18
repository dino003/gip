import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format';
import today from '../../../utils/today'

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
          reservable: false,
           //vehicule_prioritaire
               //vehicule_usage_exclusif
               //vehicule_lie_astreinte
               vehicule_prioritaire: false, 
               vehicule_usage_exclusif: false,
               vehicule_lie_astreinte: false,
        }
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
        } else if (this.entite_comptable.value == undefined || !this.entite_comptable.value.length) {
            return "L'entité d'affectation comptable est obligatoire"
        } else if (this.entite_physique.value == undefined || !this.entite_physique.value.length) {
            return "L'entité d'affectation physique est obligatoire"
        } else if (this.categorie.value == undefined || !this.categorie.value.length) {
            return "La catégorie est obligatoire"
        } else if (this.marque.value == undefined || !this.marque.value.length) {
            return "La marque est obligatoire"
        }else if (this.modele.value == undefined || !this.modele.value.length) {
            return "Le modèle est obligatoire"
        }else if (this.code_modele.value == undefined || !this.code_modele.value.length) {
            return "Le code modèle est obligatoire"
        }else if (this.tiers.value == undefined || !this.tiers.value.length) {
            return "Le Tiers d'acquisition est obligatoire"
        }else if (this.date_entree_au_parc.value == undefined || !this.date_entree_au_parc.value.length) {
            return "La date d'entrée au parc est obligatoire"
        }
        else {
            return null
        }

    }

    enregistrerPersonnel = (e) => {
        e.preventDefault()
       // console.log(this.date_entree_au_parc.value)
        if (this.verificationFormulaire() == null) {
            // console.log(this.state)
            // console.log(this.prix_ht)

            axios.post('/api/ajouter_vehicule', {
                immatriculation: this.immatriculation.value,
                entite_comptable: this.entite_comptable.value,
                entite_physique: this.entite_physique.value,
                type_vehicule_statut: this.type_vehicule_statut.value,
                etat_vehicule_status: this.etat_vehicule_status.value,
                date_commande: this.date_commande.value,
                // vehicule propre a faire
              //  vehicule_propre: this.state.vehicule_propre,
                mode_acquisition: this.mode_acquisition.value,
                date_livraison_previsionelle: this.date_livraison_previsionelle.value,
                date_livraison_reele: this.date_livraison_reele.value,
                numero_commande: this.numero_commande.value,
                demandeur: this.demandeur.value,
                neuf_occasion: this.state.neuf_occasion, //booleen a faire*************
                date_entree_au_parc: this.date_entree_au_parc.value,
                annee_mise_circulation: this.annee_mise_circulation.value,
                premiere_mise_circulation: this.premiere_mise_circulation.value,
                categorie: this.categorie.value,
                marque: this.marque.value,

                tiers: this.tiers.value,
                detenteur: this.detenteur.value,
                precision_energie: this.precision_energie.value,
                chauffeur_atitre: this.chauffeur_atitre.value,
                modele: this.modele.value,
                code_modele: this.code_modele.value,
                energie: this.energie.value,
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
               reservable: this.state.reservable,
               vehicule_prioritaire: this.state.vehicule_prioritaire,
               vehicule_usage_exclusif: this.state.vehicule_usage_exclusif,
               vehicule_lie_astreinte: this.state.vehicule_lie_astreinte,

                lieu_prise_en_charge_vehicule: this.lieu_prise_en_charge_vehicule.value,

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


              

            }).then(response => {

                const action = { type: "ADD_VEHICULE", value: response.data }
                this.props.dispatch(action)

                this.props.history.goBack();
            }).catch(error => console.log(error))

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
        return (
            <div className="app-main__inner">
                <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
                    <li className="nav-item">
                        <a role="tab" className="nav-link active" id="tab-0"
                            data-toggle="tab" href="#tab-content-0">
                            <span>Description 1</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-1"
                            data-toggle="tab" href="#tab-content-1">
                            <span>Description 2</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-2"
                            data-toggle="tab" href="#tab-content-2">
                            <span>Technique/Kms</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-3"
                            data-toggle="tab" href="#tab-content-3">
                            <span>Acquisition</span>
                        </a>
                    </li>

                    <li className="nav-item">
                        <a role="tab" className="nav-link" id="tab-4"
                            data-toggle="tab" href="#tab-content-4">
                            <span>Assurance</span>
                        </a>
                    </li>
                    {/*
                    <li className="nav-item">
                        <button type="submit" className="mt-2 btn btn-info">Enregistrer</button>

                    </li>
                    */}
                </ul>
                <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>
                    <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>

                    <div className="tab-content">
                        <div className="tab-pane tabs-animation fade show active"
                            id="tab-content-0" role="tabpanel">

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
                                            <select name="entite_comptable"
                                             style={inputStyle}

                                                ref={entite_comptable => this.entite_comptable = entite_comptable}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.entites.map(ent =>
                                                    <option key={ent.id} value={ent.id}>{ent.entite} _ {ent.nom_entite}</option>
                                                )}

                                            </select>

                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Entité d'affectation physique *</label>
                                            <select name="entite_physique"
                                                    style={inputStyle}

                                                ref={entite_physique => this.entite_physique = entite_physique}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.entites.map(ent =>
                                                    <option key={ent.id} value={ent.id}>{ent.entite} _ {ent.nom_entite}</option>
                                                )}

                                            </select>

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
                                                ref={mode_acquisition => this.mode_acquisition = mode_acquisition}
                                                className="form-control">
                                                <option value="Achat">Achat</option>
                                                <option value="Leasing">Leasing</option>
                                                <option value="Pret">Prêt</option>
                                                <option value="Location courte">Location courte</option>
                                                <option value="Location Longue Durée">Location Longue Durée</option>


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

                                            <select name="demandeur"
                                                ref={demandeur => this.demandeur = demandeur}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.personnels.map(per =>
                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom}</option>
                                                )}

                                            </select>

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
                                                    style={inputStyle}

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
                                            <select name="categorie"
                                                style={inputStyle}

                                                ref={categorie => this.categorie = categorie}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.categories_vehicules.map(cat =>
                                                    <option key={cat.id} value={cat.id}>{cat.nom_type}</option>
                                                )}

                                            </select>

                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Marque *</label>
                                            <select name="marque"
                                                 style={inputStyle}

                                                ref={marque => this.marque = marque}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.marques.map(marque =>
                                                    <option key={marque.id} value={marque.id}>{marque.nom_marque}</option>
                                                )}

                                            </select>

                                        </div>





                                    </div>

                                    <div className="form-row">



                                        <div className="col-md-3">
                                            <label className="">Energie *</label>

                                            <select name="energie"
                                                    style={inputStyle}

                                                ref={energie => this.energie = energie}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.natures_energies.map(energie =>
                                                    <option key={energie.id} value={energie.id}>{energie.nom_energie}</option>
                                                )}

                                            </select>
                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Tiers d'acquisition *</label>
                                            <select name="tiers"
                                                    style={inputStyle}

                                                ref={tiers => this.tiers = tiers}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.tiers.map(tier =>
                                                    <option key={tier.id} value={tier.id}>{tier.code} {tier.nom}</option>
                                                )}

                                            </select>

                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Chauffeur attitré</label>
                                            <select name="chauffeur_atitre"
                                                ref={chauffeur_atitre => this.chauffeur_atitre = chauffeur_atitre}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.personnels.map(per =>
                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom}</option>
                                                )}

                                            </select>

                                        </div>

                                        <div className="col-md-3">
                                            <label className="">Détenteur </label>
                                            <select name="detenteur"
                                                ref={detenteur => this.detenteur = detenteur}
                                                className="form-control">
                                                <option value={null}></option>
                                                {this.props.personnels.map(per =>
                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom}</option>
                                                )}

                                            </select>

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


                        <div className="tab-pane tabs-animation fade" id="tab-content-1" role="tabpanel">


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
                                                        checked={this.state.vehicule_usage_exclusif}
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
                                                        checked={this.state.vehicule_prioritaire}
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
                                                        checked={this.state.vehicule_lie_astreinte}
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
                                                        checked={this.state.reservable}
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
                                                ref={etat_vehicule_physique  => this.etat_vehicule_physique   = etat_vehicule_physique }
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

                        <div className="tab-pane tabs-animation fade" id="tab-content-2" role="tabpanel">


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






                                </div>
                            </div>
                        </div>

                        {/** fin technique */}

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
        personnels: state.personnels.items

    }
}

export default connect(mapStateToProps)(AjouterVehicule)