import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import Select from 'react-select';
import { colourStyles } from '../../../utils/Repository';




class InterventionEtatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // date_creation: new Date(),

            type_vehicule_statut: "Tous",
            mode_acquisition: "Tous",
            etat_vehicule_status: "Tous",
            mode_acquisition_type_vehicule: "Tous",
            tiers: undefined,
            entite_physique: undefined,
            nature_intervention: undefined,
            vehicule: undefined,
            categorie_intervention: "Tous"
        }

        this.submitInterventionEtatForm = this.submitInterventionEtatForm.bind(this);
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


    submitInterventionEtatForm(e) {
        e.preventDefault()
        let data = {
            type_vehicule_statut: this.state.type_vehicule_statut,
            etat_vehicule_status: this.state.etat_vehicule_status,
            mode_acquisition: this.state.mode_acquisition,
            mode_acquisition_type_vehicule: this.state.mode_acquisition_type_vehicule,
            categorie_intervention: this.state.categorie_intervention,

            date_debut_intervention_comprise_premiere: this.date_debut_intervention_comprise_premiere.value,
            date_debut_intervention_comprise_deuxieme: this.date_debut_intervention_comprise_deuxieme.value,
            entite_physique: this.state.entite_physique ? this.state.entite_physique.id : undefined,
            vehicule: this.state.vehicule ? this.state.vehicule.id : undefined,
            tiers: this.state.tiers ? this.state.tiers.id : undefined,
            nature_intervention: this.state.nature_intervention ? this.state.nature_intervention.id : undefined
        }

        this.props.onFormInterventionEtatSubmit(data)

        //    console.log(this.filterData(data))
        //    console.log(data)
    }






    setFieldSelect(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }



    render() {

        return (
            // <div className="app-main__inner">

            <React.Fragment >

                <form className="" onChange={this.setField} onSubmit={this.submitInterventionEtatForm}>
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
                                <label className="center">Date de début d'intervention comprise entre : Du</label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="position-relative form-group">
                                <input name="date_debut_intervention_comprise_premiere"
                                    ref={date_debut_intervention_comprise_premiere => this.date_debut_intervention_comprise_premiere = date_debut_intervention_comprise_premiere}

                                    type="date" className="form-control"
                                />
                            </div>
                        </div>

                        <div className="col-md-1">
                            <div className="position-relative form-group">
                                <label className="center">Au</label>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="position-relative form-group">


                                <input name="date_debut_intervention_comprise_deuxieme"
                                    ref={date_debut_intervention_comprise_deuxieme => this.date_debut_intervention_comprise_deuxieme = date_debut_intervention_comprise_deuxieme}
                                    type="date" className="form-control" />

                            </div>
                        </div>


                    </div>




                    <div className="form-row">
                        <div className="col-md-3">
                            <label className="">Choix d'un Véhicule</label>

                            <Select
                                name="vehicule"
                                placeholder="Selectionnez un véhicule"
                                noOptionsMessage={() => "Aucun Véhicule pour l'instant"}
                                options={this.props.vehicules}
                                getOptionLabel={option => option.immatriculation}
                                getOptionValue={option => option.id}
                                onChange={this.setFieldSelect.bind(this, "vehicule")}

                            />

                        </div>

                        <div className="col-md-3">
                            <label className=""> Entité Physique du Véhicule</label>

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
                            <label className="">Choix d'un Tiers</label>

                            <Select
                                name="tiers"
                                placeholder="Selectionnez un Tiers"
                                noOptionsMessage={() => "Aucune Donnée trouvée"}
                                options={this.props.tiers}
                                getOptionLabel={option => `${option.code} `}
                                getOptionValue={option => option.id}
                                onChange={this.setFieldSelect.bind(this, "tiers")}

                            />

                        </div>

                        <div className="col-md-3">
                            <label className="">Choix d'une nature d'intervention</label>

                            <Select
                                name="nature_intervention"
                                placeholder="Selectionnez une Nature"
                                noOptionsMessage={() => "Aucune Donnée trouvée"}
                                options={this.props.natures_interventions}
                                getOptionLabel={option => `${option.nom_intervention}`}
                                getOptionValue={option => option.id}
                                onChange={this.setFieldSelect.bind(this, "nature_intervention")}

                            />

                        </div>
                    </div>

                    <hr />

                    <div className="form-row">

                        <div className="col-md-2">
                            <div className="position-relative form-group">
                                <label className="center">Catégorie d'intervention</label>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="position-relative form-group">
                                <label className="">
                                    Toutes  <input type="radio"
                                        onChange={this.setField}
                                        checked={this.state.categorie_intervention === "Tous"}

                                        name="categorie_intervention" value="Tous" className="" /> </label>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="position-relative form-group">
                                <label className="form-check-label">
                                    Rép.Sinistre  <input type="radio" name="categorie_intervention"
                                        onChange={this.setField}
                                        checked={this.state.categorie_intervention === "Rep.Sinistre"}
                                        value="Rep.Sinistre" className="" /></label>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="position-relative form-group">
                                <label className="form-check-label">
                                    Entretien  <input type="radio" name="categorie_intervention"

                                        onChange={this.setField}
                                        checked={this.state.categorie_intervention === "Entretien"}
                                        value="Entretien" className="" /></label>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="position-relative form-group">
                                <label className="form-check-label">
                                    Réparation  <input type="radio" name="categorie_intervention"
                                        onChange={this.setField}
                                        checked={this.state.categorie_intervention === "Réparation"}
                                        value="Réparation" className="" /></label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="position-relative form-group">
                                <label className="form-check-label">
                                    Matériel/Consommable  <input type="radio" name="categorie_intervention"
                                        onChange={this.setField}
                                        checked={this.state.categorie_intervention === "Matériel/Consomable"}
                                        value="Matériel/Consomable" className="" /></label>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="position-relative form-group">
                                <label className="form-check-label">
                                    Rappel constructeur  <input type="radio" name="categorie_intervention"
                                        onChange={this.setField}
                                        checked={this.state.categorie_intervention === "Rappel constructeur"}
                                        value="Rappel constructeur" className="" /></label>
                            </div>
                        </div>

                        <div className="col-md-1">
                            <div className="position-relative form-group">
                                <label className="form-check-label">
                                    Divers  <input type="radio" name="categorie_intervention"
                                        onChange={this.setField}
                                        checked={this.state.categorie_intervention === "Divers"}
                                        value="Divers" className="" /></label>
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
        natures_interventions: state.natures_interventions.items,
        vehicules: state.vehicules.items,
        utilisations: state.utilisations.items,



    }
}

export default connect(mapStateToProps)(InterventionEtatForm)