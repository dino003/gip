import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'

import today from '../../utils/today'
import inputStyle from '../../utils/inputStyle'
import { heure } from '../../utils/Repository';
import year from '../../utils/Year';


class AjouterMission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contenu_commandes: [],
            objet_commande: undefined,
            showContenuForm: false,
            type_commande: 0,
        }

    }

   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }




    verificationFormulaire() {
        if (this.demandeur_id.value == '') {
            return "Vous n'avez pas sélectionné le demandeur !"
        } else if (this.nature_mission_id.value == '') {
            return "La nature de la mission est obligatoire!"
        }else if (this.signataire_id.value == '') {
            return "Vous n'avez pas sélectionné le Signataire !"
        }else if (this.decideur_id.value == '') {
            return "Vous n'avez pas sélectionné le Décideur !"
        }else if (this.beneficiaire_principal_id.value == '') {
            return "Vous n'avez pas sélectionné le Bénéficiaire principal !"
        }else if (this.date_debut_misssion.value == '') {
            return "Absence de la date de début de la mission !"
        }else if (this.date_fin_mission.value == '') {
            return "Absence de la date de fin de la mission !"
        }else if (this.heure_debut_mission.value == '') {
            return "Absence de l'heure de début de la mission !"
        }else if (this.heure_fin_mission.value == '') {
            return "Absence de l'heure de fin de la mission !"
        } else {
            return null
        }
    }

    calculMontantTTC = () => {
        if (this.type_commande && this.type_commande.value == 0) {
            if (this.montant_ht.value == '') return null
            if (this.tva.value == '') return this.montant_ht.value
            var taux = (Number(this.montant_ht.value) * Number(this.tva.value)) / 100
            return Number(this.montant_ht.value) + taux

        }
    }

    calculMontantTTCContenu = () => {
        if (this.contenu_montant_commande && this.contenu_taux_tva) {
            if (this.contenu_montant_commande.value == '') return null
            if (this.contenu_taux_tva.value == '') return this.contenu_montant_commande.value
            var taux = (Number(this.contenu_montant_commande.value) * Number(this.contenu_taux_tva.value)) / 100
            return Number(this.contenu_montant_commande.value) + taux
        }
    }

    enregistrerOrdreMission = (e) => {
        e.preventDefault()
       // console.log(this.moyen_transport.value)
        if (this.verificationFormulaire() == null) {
            axios.post('/api/ajouter_ordre_mission', {
                numero_ordre_mission: this.numero_ordre_mission.value,
                demandeur_id: this.demandeur_id.value,
                vehicule_id: this.vehicule_id.value,
                entite_demandeur: this.entite_demandeur.value,
                date_demande: this.date_demande.value,
                heure_demande: this.heure_demande.value,
                etat: this.etat.value,
               // vehicule_personnel_immatriculation: this.vehicule_personnel_immatriculation.value,
                // montant_ht: this.type_commande.value != 0 ? null : this.montant_ht.value,
                // loyer_mensuel_leasing: this.type_commande.value != 3 ? null : this.loyer_mensuel_leasing.value,

                // cout_ttc_location_annuelle: this.type_commande.value != 1 ? null : this.cout_ttc_location_annuelle.value,
                // cout_ttc_location_courte_duree: this.type_commande.value != 2 ? null : this.cout_ttc_location_courte_duree.value,
                // tva: this.type_commande.value != 0 ? null : this.tva.value,
                // montant_ttc: this.type_commande.value != 0 ? null : this.montant_ttc.value,
               // vehicule_personnel_marque: this.vehicule_personnel_marque.value,
               // vehicule_personnel_modele: this.vehicule_personnel_modele.value,
               // vehicule_personnel_cv: this.vehicule_personnel_cv.value,
               // vehicule_personnel_nombre_place: this.vehicule_personnel_nombre_place.value,
                urgence: this.urgence.value,
                nature_mission_id: this.nature_mission_id.value,
                moyen_transport: this.moyen_transport.value,
                moyen_transport_si_autre: this.moyen_transport_si_autre.value,
                decideur_id: this.decideur_id.value,
                signataire_id: this.signataire_id.value,
                beneficiaire_principal_id: this.beneficiaire_principal_id.value,
                beneficiaire1_id: this.beneficiaire1_id.value,
                beneficiaire2_id: this.beneficiaire2_id.value,
                beneficiaire3_id: this.beneficiaire3_id.value,
                beneficiaire4_id: this.beneficiaire4_id.value,
                beneficiaire5_id: this.beneficiaire5_id.value,
                beneficiaire6_id: this.beneficiaire6_id.value,
                date_debut_misssion: this.date_debut_misssion.value,
                date_fin_mission: this.date_fin_mission.value,
                heure_debut_mission: this.heure_debut_mission.value,
                heure_fin_mission: this.heure_fin_mission.value,
                destination_ville: this.destination_ville.value,
                destination_departement: this.destination_departement.value,
                destination_pays: this.destination_pays.value,
                kilometrage_prevu: this.kilometrage_prevu.value,
                nombre_personne: this.nombre_personne.value,
                description_mission: this.description_mission.value,
                prise_en_charge_cout: this.prise_en_charge_cout.value,
                tiers_prenant_en_charge_id: this.tiers_prenant_en_charge_id.value,


                nuitees: this.nuitees.value,
                repas: this.repas.value,
                peages: this.peages.value,
                billet_de_train: this.billet_de_train.value,
                billet_avion: this.billet_avion.value,
                taxis: this.taxis.value,
                billet_transport_commun: this.billet_transport_commun.value,
                puissance_vehicule_cv: this.puissance_vehicule_cv.value,
                kilometre_parcouru: this.kilometre_parcouru.value,
                cout_unitaire_kilometre: this.cout_unitaire_kilometre.value,
                cout_total_kms: this.cout_total_kms.value,
                cout_nuitee: this.cout_nuitee.value,
                cout_repas: this.cout_repas.value,
                cout_peage: this.cout_peage.value,
                cout_billet_train: this.cout_billet_train.value,
                cout_billet_avion: this.cout_billet_avion.value,
                cou_billet_taxis: this.cou_billet_taxis.value,
                cout_bilet_transport_commun: this.cout_bilet_transport_commun.value,
                frais_divers: this.frais_divers.value,
                cout_total_mission: this.cout_total_mission.value,

             
            })
                .then(response => {
                    const action = { type: "ADD_MISSION", value: response.data }
                    this.props.dispatch(action)

                    this.props.history.goBack();
                }).catch(error => console.log(error))


        } else {
            //console.log(this.verificationFormulaire())
            toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }


        // console.log(yea)
    }

    numeroAutoOrdreMission = () => {
        const { missions } = this.props
        if (missions.length == 0) return 1
        let miss = missions.map(a => a.id);
        return Math.max(...miss) + 1
    }

    generationNumeroOrdreMission = () => {
        let numero = this.numeroAutoOrdreMission().toString();
        if(numero.length == 1) return year + '-0000' + numero
        else if(numero.length == 2) return year + '-000' + numero
        else if(numero.length == 3) return year + '-00' + numero
        else if(numero.length == 4) return year + '-0' + numero
        else  return year + '-' + numero

    }

    setFieldDemandeur = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.entite_demandeur.value = this.entiteDuDemandeur()
            // this.contenu_libelle_commande.value = this.LibelleAutoDeCommannde()

        });
    }

    entiteDuDemandeur = () => {
        //  this.libelle_commande.value = this.type_commande.value 
        if (this.demandeur_id != undefined && this.demandeur_id.value != '') {
           var demandeur = this.props.personnels.find(pers => pers.id == this.demandeur_id.value)
           return demandeur.entite_affectation ? demandeur.entite_affectation.entite : null
        }

        return null

    }


    render() {
       // console.log(this.numeroAutoOrdreMission().toString().length)
        return (
            <div className="app-main__inner">
                <div className="main-card mb-3 card">
                    <div className="card-body">
                        <h5 className="card-title">Création d'ordre de mission</h5>
                        <form className="" onChange={this.setField} onSubmit={this.enregistrerOrdreMission}>
                            <div className="form-row">

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label >N° d'ordre de mission </label>
                                        <input name="numero_ordre_mission" type="text"
                                            onChange={this.setField}
                                            defaultValue={this.generationNumeroOrdreMission()}
                                            style={inputStyle}
                                            readOnly
                                            ref={(numero_ordre_mission) => { this.numero_ordre_mission = numero_ordre_mission }}
                                            className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label className="">Demandeur</label>
                                    <select name="demandeur_id" onChange={this.setFieldDemandeur}
                                        ref={demandeur_id => this.demandeur_id = demandeur_id}
                                        style={inputStyle}
                                        className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.personnels.map(per =>
                                            <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                        )}
                                    </select>

                                </div>

                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label >Son Entité</label>
                                        <input name="entite_demandeur" type="text"
                                        readOnly
                                            ref={entite_demandeur => this.entite_demandeur = entite_demandeur}
                                            className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label className="">Véhicule à réserver</label>
                                    <select name="vehicule_id" onChange={this.setField}
                                        ref={vehicule_id => this.vehicule_id = vehicule_id}
                                        style={inputStyle}
                                        className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.vehicules.map(vehicule =>
                                            <React.Fragment key={vehicule.id}>
                                            <option  value={vehicule.id}>{vehicule.immatriculation.toUpperCase()}  </option>
                                            <option disabled>----------------------</option>
                                            </React.Fragment>
                                            
                                        )}
                                    </select>

                                </div>



                            </div>

                            <div className="form-row">

                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label >Demande du </label>
                                        <input name="date_demande" type="date"
                                            onChange={this.setField}
                                            defaultValue={today}
                                            style={inputStyle}
                                            ref={(date_demande) => { this.date_demande = date_demande }}
                                            className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <label className="">à</label>
                                  

                                        <InputMask mask="99:99" maskChar={null} 
                                            style={inputStyle}
                                            defaultValue={heure}
                                            inputRef={heure_demande => this.heure_demande = heure_demande}
                                            className="form-control"
                                            name="heure_demande"
                                            />

                                </div>



                                <div className="col-md-3">
                                    <label className="">Etat</label>
                                    <select name="etat" onChange={this.setFieldTypeCommande}
                                        ref={etat => this.etat = etat}
                                        defaultValue={this.state.etat}
                                        className="form-control">
                                        <option >En Attente</option>
                                        <option >En cours</option>

                                        <option >Terminé</option>
                                        <option >Suspendu</option>
                                    </select>

                                </div>

                                <div className="col-md-3">
                                    <label className="">Urgence</label>
                                    <select name="urgence" onChange={this.setFieldTypeCommande}
                                        ref={urgence => this.urgence = urgence}
                                        defaultValue={this.state.urgence}
                                        className="form-control">
                                        <option >Basse</option>

                                        <option >Haute</option>
                                        <option >Moyenne</option>
                                    </select>

                                </div>


                            </div>




                            <div className="tab-content">
                                <div className="tab-pane tabs-animation fade show active" id="tab-content-0" role="tabpanel">
                                    <div className="main-card mb-3 card">
                                        <div className="card-header-tab card-header">

                                            <ul className="nav">
                                                <li className="nav-item"><a data-toggle="tab" href="#mission_tab" className="active nav-link">Mission</a></li>
                                                <li className="nav-item"><a data-toggle="tab" href="#cout_mission" className="nav-link">Coûts</a></li>

                                            </ul>


                                        </div>

                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="mission_tab" role="tabpanel">



                                                    <div className="form-row">

                                                        <div className="col-md-6">
                                                            <div className="position-relative form-group">
                                                                <label >Nature de la mission</label>
                                                                <select name="nature_mission_id" onChange={this.setField}
                                                                    ref={nature_mission_id => this.nature_mission_id = nature_mission_id}
                                                                    style={inputStyle}
                                                                    className="form-control">
                                                                    <option defaultValue={null}></option>

                                                                    {this.props.natures_reservations.map(nature =>
                                                                        <option key={nature.id} value={nature.id}>{nature.libelle}</option>

                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">Moyen de transport</label>
                                                            <select name="moyen_transport" onChange={this.setFieldTypeCommande}
                                                                ref={moyen_transport => this.moyen_transport = moyen_transport}
                                                                defaultValue={this.state.moyen_transport}
                                                                className="form-control">
                                                                <option >Véhicule du parc</option>
                                                                <option >Véhicule personnel</option>
                                                                <option >Train </option>
                                                                <option >Avion </option>
                                                                <option >Transport commun </option>
                                                                <option >Autre </option>


                                                            </select>

                                                        </div>

                                                        <div className="col-md-3">
                                                            <div className="position-relative form-group">
                                                                <label >Si autre</label>
                                                                <input name="moyen_transport_si_autre" type="text"
                                                                    onChange={this.setField}
                                                                    ref={moyen_transport_si_autre => this.moyen_transport_si_autre = moyen_transport_si_autre}
                                                                    className="form-control" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-row">

                                                        <div className="col-md-4">
                                                            <label className="">Décideur</label>
                                                            <select name="decideur_id" onChange={this.setField}
                                                                ref={decideur_id => this.decideur_id = decideur_id}
                                                                style={inputStyle}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(per =>
                                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                                                )}
                                                            </select>

                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="">Signataire</label>
                                                            <select name="signataire_id" onChange={this.setField}
                                                                ref={signataire_id => this.signataire_id = signataire_id}
                                                                style={inputStyle}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(per =>
                                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                                                )}
                                                            </select>

                                                        </div>

                                                        <div className="col-md-4">
                                                            <label className="">Bénéficiaire principal</label>
                                                            <select name="beneficiaire_principal_id" onChange={this.setField}
                                                                ref={beneficiaire_principal_id => this.beneficiaire_principal_id = beneficiaire_principal_id}
                                                                style={inputStyle}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(per =>
                                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                                                )}
                                                            </select>

                                                        </div>


                                                    </div>


                                                    <div className="form-row">

                                                        <div className="col-md-2">
                                                            <div className="position-relative form-group">
                                                                <label >Autres bénéficiaires</label>

                                                            </div>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">1</label>
                                                            <select name="beneficiaire1_id" onChange={this.setField}
                                                                ref={beneficiaire1_id => this.beneficiaire1_id = beneficiaire1_id}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(per =>
                                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                                                )}
                                                            </select>

                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">2</label>
                                                            <select name="beneficiaire2_id" onChange={this.setField}
                                                                ref={beneficiaire2_id => this.beneficiaire2_id = beneficiaire2_id}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(per =>
                                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                                                )}
                                                            </select>

                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">3</label>
                                                            <select name="beneficiaire3_id" onChange={this.setField}
                                                                ref={beneficiaire3_id => this.beneficiaire3_id = beneficiaire3_id}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(per =>
                                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                                                )}
                                                            </select>

                                                        </div>


                                                    </div>

                                                    <div className="form-row">

                                                        <div className="col-md-2">
                                                            <div className="position-relative form-group">
                                                                <label >Autres bénéficiaires</label>

                                                            </div>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">4</label>
                                                            <select name="beneficiaire4_id" onChange={this.setField}
                                                                ref={beneficiaire4_id => this.beneficiaire4_id = beneficiaire4_id}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(per =>
                                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                                                )}
                                                            </select>

                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">5</label>
                                                            <select name="beneficiaire5_id" onChange={this.setField}
                                                                ref={beneficiaire5_id => this.beneficiaire5_id = beneficiaire5_id}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(per =>
                                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                                                )}
                                                            </select>

                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">6</label>
                                                            <select name="beneficiaire6_id" onChange={this.setField}
                                                                ref={beneficiaire6_id => this.beneficiaire6_id = beneficiaire6_id}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(per =>
                                                                    <option key={per.id} value={per.id}>{per.nom} {per.prenom} </option>

                                                                )}
                                                            </select>

                                                        </div>


                                                    </div>

                                                    <div className="form-row">

                                                        <div className="col-md-3">
                                                            <div className="position-relative form-group">
                                                                <label >Date de début de la mission </label>
                                                                <input name="date_debut_misssion" type="date"
                                                                    onChange={this.setField}
                                                                    style={inputStyle}
                                                                    ref={(date_debut_misssion) => { this.date_debut_misssion = date_debut_misssion }}
                                                                    className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="">Heure</label>
                                                           

                                                            <InputMask mask="99:99" maskChar={null} 
                                                            style={inputStyle}
                                                            inputRef={heure_debut_mission => this.heure_debut_mission = heure_debut_mission}
                                                            className="form-control"
                                                            name="heure_debut_mission"
                                                            />

                                                        </div>

                                                        <div className="col-md-3">
                                                            <div className="position-relative form-group">
                                                                <label >Date de fin de la mission </label>
                                                                <input name="date_fin_mission" type="date"
                                                                    onChange={this.setField}
                                                                    style={inputStyle}
                                                                    ref={(date_fin_mission) => { this.date_fin_mission = date_fin_mission }}
                                                                    className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="">Heure</label>
                                                           

                                                            <InputMask mask="99:99" maskChar={null} 
                                                            style={inputStyle}
                                                            inputRef={heure_fin_mission => this.heure_fin_mission = heure_fin_mission}
                                                            className="form-control"
                                                            name="heure_fin_mission"
                                                            />
                                                                

                                                        </div>

                                                    </div>

                                                    <div className="form-row">

                                                        <div className="col-md-3">
                                                            <div className="position-relative form-group">
                                                                <label >Destination:  Ville </label>
                                                                <input name="destination_ville" type="text"
                                                                    onChange={this.setField}
                                                                    ref={(destination_ville) => { this.destination_ville = destination_ville }}
                                                                    className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">Département</label>
                                                            <input name="destination_departement" type="text"
                                                                onChange={this.setField}
                                                                ref={(destination_departement) => { this.destination_departement = destination_departement }}
                                                                className="form-control" />

                                                        </div>

                                                        <div className="col-md-3">
                                                            <div className="position-relative form-group">
                                                                <label >Pays </label>
                                                                <input name="destination_pays" type="pays"
                                                                    onChange={this.setField}
                                                                    ref={(destination_pays) => { this.destination_pays = destination_pays }}
                                                                    className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="">Kms prevu</label>
                                                            <input name="kilometrage_prevu" type="number"
                                                                onChange={this.setField}
                                                                ref={(kilometrage_prevu) => { this.kilometrage_prevu = kilometrage_prevu }}
                                                                className="form-control" />

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="" title="Nombre de personnes">Nbr pers</label>
                                                            <input name="nombre_personne" type="number"
                                                                onChange={this.setField}
                                                                ref={(nombre_personne) => { this.nombre_personne = nombre_personne }}
                                                                className="form-control" />

                                                        </div>

                                                    </div>

                                                    <div className="form-row">



                                                        <div className="col-md-3">
                                                            <label className="">Description Mission</label>
                                                            <textarea name="description_mission" type="number"
                                                                onChange={this.setField}
                                                                ref={(description_mission) => { this.description_mission = description_mission }}
                                                                className="form-control" />

                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">Prise en charge des coûts</label>
                                                            <select name="prise_en_charge_cout" onChange={this.setField}
                                                                ref={prise_en_charge_cout => this.prise_en_charge_cout = prise_en_charge_cout}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.personnels.map(tier =>
                                                                    <option key={tier.id} value={tier.id}>{tier.code} </option>

                                                                )}
                                                            </select>

                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">Tiers prenant en charge les coûts </label>
                                                            <select name="tiers_prenant_en_charge_id" onChange={this.setField}
                                                                ref={tiers_prenant_en_charge_id => this.tiers_prenant_en_charge_id = tiers_prenant_en_charge_id}
                                                                className="form-control">
                                                                <option defaultValue={null}></option>

                                                                {this.props.tiers.map(tier =>
                                                                    <option key={tier.id} value={tier.id}>{tier.code} </option>

                                                                )}
                                                            </select>

                                                        </div>


                                                    </div>






                                                </div>
                                               


                                                <div className="tab-pane" id="cout_mission" role="tabpanel">
                                                    <div className="form-row">
                                                        <div className="col-md-1">
                                                            <label className="">Nuitées</label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="" title="Quantité">Qté</label>
                                                            <input name="nuitees" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={nuitees => this.nuitees = nuitees}
                                                                className="form-control" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="">Coût unitaire</label>
                                                            <input name="cout_nuitee" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cout_nuitee => this.cout_nuitee = cout_nuitee}
                                                                className="form-control" />

                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className=""></label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="">Repas</label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="" title="Quantité">Qté</label>
                                                            <input name="repas" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={repas => this.repas = repas}
                                                                className="form-control" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="">Coût unitaire</label>
                                                            <input name="cout_repas" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cout_repas => this.cout_repas = cout_repas}
                                                                className="form-control" />

                                                        </div>

                                                    </div>
                                                    <hr />



                                                    <div className="form-row">
                                                        <div className="col-md-1">
                                                            <label className="">Péages</label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="" title="Quantité">Qté</label>
                                                            <input name="peages" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={peages => this.peages = peages}
                                                                className="form-control" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="">Coût unitaire</label>
                                                            <input name="cout_peage" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cout_peage => this.cout_peage = cout_peage}
                                                                className="form-control" />

                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className=""></label>

                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="">Billets de train</label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="" title="Quantité">Qté</label>
                                                            <input name="billet_de_train" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={billet_de_train => this.billet_de_train = billet_de_train}
                                                                className="form-control" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="">Coût unitaire</label>
                                                            <input name="cout_billet_train" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cout_billet_train => this.cout_billet_train = cout_billet_train}
                                                                className="form-control" />

                                                        </div>

                                                    </div>


                                                    <hr />


                                                    <div className="form-row">
                                                        <div className="col-md-2">
                                                            <label className="">Billet d'avion</label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="" title="Quantité">Qté</label>
                                                            <input name="billet_avion" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={billet_avion => this.billet_avion = billet_avion}
                                                                className="form-control" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="">Coût unitaire</label>
                                                            <input name="cout_billet_avion" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cout_billet_avion => this.cout_billet_avion = cout_billet_avion}
                                                                className="form-control" />

                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className=""></label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="">Taxis</label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="" title="Quantité">Qté</label>
                                                            <input name="taxis" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={taxis => this.taxis = taxis}
                                                                className="form-control" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="">Coût unitaire</label>
                                                            <input name="cou_billet_taxis" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cou_billet_taxis => this.cou_billet_taxis = cou_billet_taxis}
                                                                className="form-control" />

                                                        </div>

                                                    </div>
                                                    <hr />



                                                    <div className="form-row">
                                                        <div className="col-md-3">
                                                            <label className="">Billets transports en commnun</label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="" title="Quantité">Qté</label>
                                                            <input name="billet_transport_commun" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={billet_transport_commun => this.billet_transport_commun = billet_transport_commun}
                                                                className="form-control" />
                                                        </div>
                                                        <div className="col-md-2">
                                                            <label className="">Coût unitaire</label>
                                                            <input name="cout_bilet_transport_commun" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cout_bilet_transport_commun => this.cout_bilet_transport_commun = cout_bilet_transport_commun}
                                                                className="form-control" />

                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className=""></label>

                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="">Frais divers</label>

                                                        </div>


                                                        <div className="col-md-2">
                                                            <input name="frais_divers" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={frais_divers => this.frais_divers = frais_divers}
                                                                className="form-control" />

                                                        </div>

                                                    </div>
                                                    <hr />


                                                    <div className="form-row">
                                                        <div className="col-md-2">
                                                            <label className="">Puissance Véhicule CV</label>

                                                        </div>

                                                        <div className="col-md-1">
                                                            <input name="puissance_vehicule_cv" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={puissance_vehicule_cv => this.puissance_vehicule_cv = puissance_vehicule_cv}
                                                                className="form-control" />
                                                        </div>

                                                        <div className="col-md-2">
                                                            <label className="">Kilomètres parcourus</label>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <input name="kilometre_parcouru" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={kilometre_parcouru => this.kilometre_parcouru = kilometre_parcouru}
                                                                className="form-control" />

                                                        </div>

                                                        <div className="col-md-3">
                                                            <label className="">Coût Unitaire du Kilomètre</label>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <input name="cout_unitaire_kilometre" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cout_unitaire_kilometre => this.cout_unitaire_kilometre = cout_unitaire_kilometre}
                                                                className="form-control" />

                                                        </div>

                                                        <div className="col-md-1">
                                                            <label className="">Coût Kilomètres</label>

                                                        </div>
                                                        <div className="col-md-1">
                                                            <input name="cout_total_kms" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cout_total_kms => this.cout_total_kms = cout_total_kms}
                                                                className="form-control" />

                                                        </div>



                                                    </div>
                                                    <hr />
                                                    <div className="form-row">



                                                        <div className="col-md-2">
                                                            <label className="">Coût Total</label>


                                                        </div>




                                                        <div className="col-md-3">
                                                            <input name="cout_total_mission" type="number"
                                                                onChange={this.setField}
                                                                defaultValue={0}
                                                                ref={cout_total_mission => this.cout_total_mission = cout_total_mission}
                                                                className="form-control" />

                                                        </div>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-block text-right card-footer">
                                            <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <ToastContainer autoClose={4000} />



            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehicules: state.vehicules.items,
        tiers: state.tiers.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        personnels: state.personnels.items,
        natures_reservations: state.natures_reservations.items,

        entites: state.entites.items,
        marques: state.marques.items,
        natures_energies: state.natures_energies.items,
        missions: state.missions.items

    }
}

export default connect(mapStateToProps)(AjouterMission)
