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
           
            type_vehicule_statut: 'Tous',
            mode_acquisition: 'Tous',
            etat_vehicule_status: 'Tous',
            mode_acquisition_type_vehicule: 'Tous',

        }

        this.submitVehiculeEtatForm = this.submitVehiculeEtatForm.bind(this);

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

    submitVehiculeEtatForm(e){
        e.preventDefault()
        let data = {
            type_vehicule_statut: this.state.type_vehicule_statut,
            etat_vehicule_status: this.state.etat_vehicule_status,
            mode_acquisition: this.state.mode_acquisition,
            mode_acquisition_type_vehicule: this.state.mode_acquisition_type_vehicule,
            date_entree_au_parc1: this.date_entree_au_parc1.value,
            date_entree_au_parc2: this.date_entree_au_parc2.value,
            entite_physique: this.state.entite_physique ? this.state.entite_physique.id : undefined,
            entite_comptable: this.state.entite_comptable ? this.state.entite_comptable.id : undefined,

            tiers: this.state.tiers ? this.state.tiers.id : undefined,
            assureur: this.state.assureur ? this.state.assureur.id : undefined,
            marque: this.state.marque ? this.state.marque.id : undefined,
            modele: this.modele.value
        }

        this.props.onFormVehiculeEtatSubmit(data)

    //    console.log(this.filterData(data))
    //    console.log(data)
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
          
                        <form className="" onChange={this.setField} onSubmit={this.submitVehiculeEtatForm}>
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
                                                checked={this.state.mode_acquisition === "0"}
                                                value="0" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Loués  <input type="radio" name="mode_acquisition"

                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "4"}
                                                value="4" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Leasing  <input type="radio" name="mode_acquisition"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "1"}
                                                value="1" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Loués longue durée  <input type="radio" name="mode_acquisition"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "5"}
                                                value="5" className="" /></label>
                                    </div>
                                </div>
                                <div className="col-md-1">
                                    <div className="position-relative form-group">
                                        <label className="form-check-label">
                                            Prêt  <input type="radio" name="mode_acquisition"
                                                onChange={this.setField}
                                                checked={this.state.mode_acquisition === "2"}
                                                value="2" className="" /></label>
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
                                    <label className="">Sélection entité Comptable</label>
                                
                                    <Select
                                        name="entite_comptatble"
                                        placeholder="Selectionnez une entité"
                                        noOptionsMessage={() => "Aucune Entité pour l'instant"}
                                        options={this.props.entites}
                                        getOptionLabel={option => option.entite}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldSelect.bind(this, "entite_comptatble")}
                                        
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
                                    <label className="">Sélection d'un Tiers: Achât/location</label>

                                    <Select
                                        name="tiers"
                                        placeholder="Selectionnez un Tiers"
                                        noOptionsMessage={() => "Aucun Tiers trouvé"}
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


                            </div>

                            <div className="form-row">
                          

                          

                                <div className="col-md-3">
                                    <label className="">Sélection d'une marque</label>
                                 

                                    <Select
                                        name="marque"
                                        placeholder="Selectionnez une marque"
                                        noOptionsMessage={() => "Aucune donnée pour l'instant"}
                                        options={this.props.marques}
                                        getOptionLabel={option => `${option.nom_marque}`}
                                        getOptionValue={option => option.id}
                                        onChange={this.setFieldSelect.bind(this, "marque")}
                                        
                                      />

                                </div>

                                <div className="col-md-3">
                                    <div className="position-relative form-group">
                                        <label >Modèle</label>
                                        <input name="modele"
                                            ref={modele => this.modele = modele}
                                            type="text" className="form-control" />
                                    </div>
                                </div>


                            </div>

                            {/* <div className="form-row">

                                <div className="col-md-4">
                                    <div className="position-relative form-group">
                                        <label className="center">Date dernier contrôle technique compris entre</label>
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


                            </div> */}

                            {/* <div className="form-row">

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


                            </div> */}

                            {/* <div className="form-row">
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
                            </div> */}




                            {/* <div className="form-row">

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
                              
                            </div>
                            <hr /> */}


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