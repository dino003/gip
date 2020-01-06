import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import Select from 'react-select';
import { colourStyles } from '../../../utils/Repository';




class VehiculeEtatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // date_creation: new Date(),
            hidePassword: true,
            userNameIsUsed: false,
            type_vehicule_statut: 'Tous',
            mode_acquisition: 'Tous',
            etat_vehicule_status: 'Tous',
            mode_acquisition_type_vehicule: 'Tous',

            modification_vehicule: 'oui',
            suppresion_vehicule: 'oui',
            commande_vehicule: 'oui',
            utilisation_vehicule: 'L/E',
            reservations: 'L/E',
            intervention: 'L/E',
            contrat_assurance: 'L/E',
            ordre_de_mission: 'L/E',
            consomation_vehicule: 'L/E',
            cout_vehicule: 'L/E',
            gestion_stock_piece: 'L/E',
            amende_vehicule: 'L/E',
            module_des_commandes: 'L/E',



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

    managePasswordVisibility = () => {
        // function used to change password visibility
        this.setState({ hidePassword: !this.state.hidePassword });

    }

    checkUser = async () => {
        if (this.username.value) {
            const response = await axios.post('/api/verif_user', { username: this.username.value })

            const res = response.data;

            if (res == true) {
                this.setState({ userNameIsUsed: false })
                return true;
            }
            this.setState({ userNameIsUsed: true })

            return false;
        }

    }

    renderUserNameConfirm = () => {
        if (this.username.value) {
            if (this.checkUser()) {

            }
        }
    }

    verificationFormulaire() {
        if (this.checkUser()) {
            if (this.username.value == undefined || !this.username.value.length) {
                return "Le Code utilisateur est obligatoire !"
            } else if (this.name.value == undefined || !this.name.value.length) {
                return "Le Nom est obligatoire !"
            } else if (this.entite.value == undefined || !this.entite.value.length) {
                return "L' entité d'affectation est obligatoire !"
            } else if (this.password.value == undefined || !this.password.value.length) {
                return "Le Mot de passe est obligatoire !"
            }
            else {
                return null
            }
        } else {
            return "Ce code utilisateur est déja utilisé !"
        }
    }

    enregistrerPersonnel = (e) => {
        e.preventDefault()
        if (this.verificationFormulaire() == null) {
            // console.log(this.state)
            axios.post('/api/ajouter_user', {
                name: this.name.value,
                username: this.username.value,
                email: this.email.value,
                date_creation: this.date_creation.value,
                date_modification: this.date_modification.value,
                entite: this.entite.value,
                matricule: this.matricule.value,
                telephonne_bureau: this.telephonne_bureau.value,
                portable: this.portable.value,
                password: this.password.value,
                creation_vehicule: this.state.creation_vehicule,
                modification_vehicule: this.state.modification_vehicule,
                suppresion_vehicule: this.state.suppresion_vehicule,
                commande_vehicule: this.state.commande_vehicule,
                utilisation_vehicule: this.state.utilisation_vehicule,
                reservations: this.state.reservations,
                intervention: this.state.intervention,
                contrat_assurance: this.state.contrat_assurance,
                ordre_de_mission: this.state.ordre_de_mission,
                consomation_vehicule: this.state.consomation_vehicule,
                cout_vehicule: this.state.cout_vehicule,
                gestion_stock_piece: this.state.gestion_stock_piece,
                amende_vehicule: this.state.amende_vehicule,
                module_des_commandes: this.state.module_des_commandes,



            }).then(response => {

                const action = { type: "ADD_UTILISATEUR", value: response.data }
                this.props.dispatch(action)

                this.props.history.push('/gestion-des-utilisateurs')
            }).catch(error => console.log(error))

        } else {
            //console.log(this.verificationFormulaire())
            toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
            });
        }
    }
    setFieldSelect(name, value) {
     
        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }


    render() {
        //console.log(this.checkUser())
        // console.log(this.state.date_creation)
        return (
            // <div className="app-main__inner">

                <React.Fragment >
          
                        <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>
                            <div className="form-row">

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="center">Type de véhicule </label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="">
                                            Tous  <input type="radio"
                                                onChange={this.setField}
                                                checked={this.state.type_vehicule_statut === "Tous"}

                                                name="type_vehicule_statut" value="Tous" className="" /> </label>
                                    </div>
                                </div>

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            de Service  <input type="radio" name="type_vehicule_statut"
                                                onChange={this.setField}
                                                checked={this.state.type_vehicule_statut === "Service"}
                                                value="Service" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            de Fonction  <input type="radio" name="type_vehicule_statut"

                                                onChange={this.setField}
                                                checked={this.state.type_vehicule_statut === "Fonction"}
                                                value="Fonction" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Flotte  <input type="radio" name="type_vehicule_statut"
                                                onChange={this.setField}
                                                checked={this.state.type_vehicule_statut === "Flotte"}
                                                value="Flotte" className="" /></label>
                                    </div>
                                </div>


                            </div>
                            <hr />

                            <div className="form-row">

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="center">Etat</label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="">
                                            Tous  <input type="radio"
                                                onChange={this.setField}
                                                checked={this.state.etat_vehicule_status === "Tous"}

                                                name="etat_vehicule_status" value="Tous" className="" /> </label>
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Actif  <input type="radio" name="etat_vehicule_status"
                                                onChange={this.setField}
                                                checked={this.state.etat_vehicule_status === "En service"}
                                                value="En service" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            En Commande  <input type="radio" name="etat_vehicule_status"

                                                onChange={this.setField}
                                                checked={this.state.etat_vehicule_status === "Commande"}
                                                value="Commande" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Vendu  <input type="radio" name="etat_vehicule_status"
                                                onChange={this.setField}
                                                checked={this.state.etat_vehicule_status === "Vendu"}
                                                value="Vendu" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Restitué  <input type="radio" name="etat_vehicule_status"
                                                onChange={this.setField}
                                                checked={this.state.etat_vehicule_status === "Restitué"}
                                                value="Restitué" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Sortie  <input type="radio" name="etat_vehicule_status"
                                                onChange={this.setField}
                                                checked={this.state.etat_vehicule_status === "Sorti"}
                                                value="Sorti" className="" /></label>
                                    </div>
                                </div>



                            </div>
                            <hr />

                            <div className="form-row">

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="center">Type d'Acquisition</label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="">
                                            Tous  <input type="radio"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "Tous"}

                                                name="mode_acquisition" value="Tous" className="" /> </label>
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Achetés  <input type="radio" name="mode_acquisition"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "Achat"}
                                                value="Achat" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Loués  <input type="radio" name="mode_acquisition"

                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "Location courte"}
                                                value="Location courte" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Leasing  <input type="radio" name="mode_acquisition"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "Leasing"}
                                                value="Leasing" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Loués longue durée  <input type="radio" name="mode_acquisition"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "Location Longue Durée"}
                                                value="Location Longue Durée" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Prêt  <input type="radio" name="mode_acquisition"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "Pret"}
                                                value="Pret" className="" /></label>
                                    </div>
                                </div>

                            </div>
                            <hr />

                            <div className="form-row">

                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label className="center">Origine</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label className="">
                                            Tous les véhicules <input type="radio"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition_type_vehicule === "Tous"}

                                                name="mode_acquisition_type_vehicule" value="Tous" className="" /> </label>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Véhicules de la société  <input type="radio" name="mode_acquisition_type_vehicule"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition_type_vehicule === "Véhicule de la société"}
                                                value="Véhicule de la société" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Véhicules du Personnel  <input type="radio" name="mode_acquisition_type_vehicule"

                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition_type_vehicule === "Véhicule personnel"}
                                                value="Véhicule personnel" className="" /></label>
                                    </div>
                                </div>

                            </div>
                            <hr />



                            <div className="form-row"> 

                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label className="center">Date d'entrée dans le parc compris entre</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <input name="date_entree_au_parc1"
                                            ref={date_entree_au_parc1 => this.date_entree_au_parc1 = date_entree_au_parc1}

                                            type="date" className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="center">ET</label>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="position-relative form-group">


                                        <input name="date_entree_au_parc2"
                                            ref={date_entree_au_parc2 => this.date_entree_au_parc2 = date_entree_au_parc2}
                                            type="date" className="form-control" />

                                    </div>
                                </div>


                            </div>

                            <div className="form-row">

                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label className="center">Date de sortie du parc compris entre</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <input name="username"
                                            ref={username => this.username = username}

                                            type="date" className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="center">ET</label>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="position-relative form-group">


                                        <input name="password"
                                            ref={password => this.password = password}
                                            type="date" className="form-control" />

                                    </div>
                                </div>


                            </div>


                            <div className="form-row">
                                <div className="col-md-3">
                                    <label className="">Sélection entité Comptable</label>
                                
                                    <Select
                                        name="entite"
                                        placeholder="Selectionnez une entité"
                                        noOptionsMessage={() => "Aucune Entité pour l'instant"}
                                        options={this.props.entites}
                                        getOptionLabel={option => option.entite}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldSelect.bind(this, "entite")}
                                        
                                      />

                                </div>

                                <div className="col-md-3">
                                    <label className="">Sélection entité Physique</label>
                                
                                    <Select
                                        name="entite_physique"
                                        placeholder="Selectionnez une entité"
                                        noOptionsMessage={() => "Aucune Entité pour l'instant"}
                                        options={this.props.entites}
                                        getOptionLabel={option => option.entite}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldSelect.bind(this, "entite_physique")}
                                        
                                      />

                                </div>

                                <div className="col-md-3">
                                    <label className="">Sélection Regroupement entités Comptables</label>
                                 
                                    <Select
                                        name="structure_comptable"
                                        placeholder="Selectionnez une structure"
                                        noOptionsMessage={() => "Aucune Entité pour l'instant"}
                                        options={this.props.structures_etablissements}
                                        getOptionLabel={option => option.code_regroupement}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldSelect.bind(this, "structure_comptable")}
                                        
                                      />

                                </div>

                                <div className="col-md-3">
                                    <label className="">Sélection Regroupement entités Physiques</label>

                                    <Select
                                        name="structure_physique"
                                        placeholder="Selectionnez une structure"
                                        noOptionsMessage={() => "Aucune Entité pour l'instant"}
                                        options={this.props.structures_etablissements}
                                        getOptionLabel={option => option.code_regroupement}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldSelect.bind(this, "structure_physique")}
                                        
                                      />

                                </div>



                            </div>

                            <div className="form-row">
                                <div className="col-md-3">
                                    <label className="">Sélection d'un Tiers: achat/location</label>

                                    <Select
                                        name="tiers"
                                        placeholder="Selectionnez une entité"
                                        noOptionsMessage={() => "Aucune Entité pour l'instant"}
                                        options={this.props.tiers}
                                        getOptionLabel={option => `${option.code} ${option.nom}`}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldSelect.bind(this, "tiers")}
                                        
                                      />

                                </div>

                                <div className="col-md-3">
                                    <label className="">Sélection d'un Assureur</label>
                                 

                                    <Select
                                        name="assureur"
                                        placeholder="Selectionnez un Assureur"
                                        noOptionsMessage={() => "Aucune donnée pour l'instant"}
                                        options={this.props.tiers}
                                        getOptionLabel={option => `${option.code} ${option.nom}`}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldSelect.bind(this, "assureur")}
                                        
                                      />

                                </div>

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label >Marque</label>
                                        <input name="telephonne_bureau"
                                            ref={telephonne_bureau => this.telephonne_bureau = telephonne_bureau}
                                            type="text" className="form-control" /></div>
                                </div>

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label >Modèle</label>
                                        <input name="portable"
                                            ref={portable => this.portable = portable}
                                            type="text" className="form-control" />
                                    </div>
                                </div>


                            </div>

                            <div className="form-row">

                                <div className="col-md-4">
                                    <div className="position-relative form-group">
                                        <label className="center">Date dernier controle technique compris entre</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <input name="username"
                                            ref={username => this.username = username}

                                            type="date" className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="center">ET</label>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="position-relative form-group">


                                        <input name="password"
                                            ref={password => this.password = password}
                                            type="date" className="form-control" />

                                    </div>
                                </div>


                            </div>

                            <div className="form-row">

                                <div className="col-md-4">
                                    <div className="position-relative form-group">
                                        <label className="center">Date dernier controle technique  compris entre</label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <input name="username"
                                            ref={username => this.username = username}

                                            type="date" className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="center">ET</label>
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="position-relative form-group">


                                        <input name="password"
                                            ref={password => this.password = password}
                                            type="date" className="form-control" />

                                    </div>
                                </div>


                            </div>

                            <div className="form-row">
                                <div className="col-md-5">
                                    <div className="position-relative form-group">
                                        <label >Matricule de l'utilisateur dans l'établissement</label>
                                        <input name="matricule"
                                            ref={matricule => this.matricule = matricule}
                                            type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label >Telephonne bureau</label>
                                        <input name="telephonne_bureau"
                                            ref={telephonne_bureau => this.telephonne_bureau = telephonne_bureau}
                                            type="text" className="form-control" /></div>
                                </div>

                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label >Telephonne Portable</label>
                                        <input name="portable"
                                            ref={portable => this.portable = portable}
                                            type="text" className="form-control" />
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label >Adresse email</label>
                                        <input name="email"
                                            ref={email => this.email = email}
                                            type="text" className="form-control" />
                                    </div>
                                </div>
                            </div>




                            <div className="form-row">

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="center">Climatisation  </label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="">
                                            Avec ou sans  <input type="radio"
                                                name="creation_vehicule"
                                                onChange={this.setField}
                                                checked={this.state.creation_vehicule === "oui"}

                                                value="oui"
                                                className="" /> </label>
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="">
                                            Sans  <input type="radio"
                                                name="creation_vehicule"
                                                onChange={this.setField}
                                                checked={this.state.creation_vehicule === "oui"}

                                                value="oui"
                                                className="" /> </label>
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Avec  <input type="radio"
                                                onChange={this.setField}
                                                name="creation_vehicule"
                                                checked={this.state.creation_vehicule === "non"}

                                                value="non" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-2"></div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="center">Pneus neige</label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="">
                                            Avec ou sans  <input type="radio"
                                                name="modification_vehicule"
                                                onChange={this.setField}
                                                checked={this.state.modification_vehicule === "oui"}

                                                value="oui"
                                                className="" /> </label>
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Sans  <input type="radio"
                                                onChange={this.setField}
                                                name="modification_vehicule"
                                                checked={this.state.modification_vehicule === "non"}

                                                value="non" className="" /></label>
                                    </div>
                                </div>

                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Avec  <input type="radio"
                                                onChange={this.setField}
                                                name="modification_vehicule"
                                                checked={this.state.modification_vehicule === "non"}

                                                value="non" className="" /></label>
                                    </div>
                                </div>
                            </div>
                            <hr />


                            <button type="submit" className="mt-2 btn btn-primary">Valider</button>
{/* 
                            <button type="submit" onClick={() => this.props.history.goBack()}
                                className="mt-2 btn btn-warning pull-right">Retour</button> */}
                        </form>
                 </React.Fragment>

            //     <ToastContainer autoClose={8000} />
            // </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        entites: state.entites.items,
        tiers: state.tiers.items,
        structures_etablissements: state.structures_etablissements.items

    }
}

export default connect(mapStateToProps)(VehiculeEtatForm)