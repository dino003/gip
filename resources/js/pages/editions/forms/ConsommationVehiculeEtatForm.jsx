import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import Select from 'react-select';
import { colourStyles } from '../../../utils/Repository';





class ConsommationVehiculeEtatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // date_creation: new Date(),

            type_vehicule_statut: "Tous",
            mode_acquisition: "Tous",
            etat_vehicule_status: "Tous",
            mode_acquisition_type_vehicule: "Tous",
            utilisateur: undefined,
            entite_physique: undefined,
            connducteur: undefined,
            vehicule: undefined,
            type_consomation: undefined,
            tiers: undefined
        }

        this.submitConsommationEtatForm = this.submitConsommationEtatForm.bind(this);
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


    submitConsommationEtatForm(e) {
        e.preventDefault()
        let data = {
            type_vehicule_statut: this.state.type_vehicule_statut,
            etat_vehicule_status: this.state.etat_vehicule_status,
            mode_acquisition: this.state.mode_acquisition,
            mode_acquisition_type_vehicule: this.state.mode_acquisition_type_vehicule,
            date_entree_comprise_premiere: this.date_entree_comprise_premiere.value,
            date_entree_comprise_deuxieme: this.date_entree_comprise_deuxieme.value,
            date_conso_comprise_premiere: this.date_conso_comprise_premiere.value,
            date_conso_comprise_deuxieme: this.date_conso_comprise_deuxieme.value,
            numero_carte: this.numero_carte.value,
            numero_conducteur: this.numero_conducteur.value,

            entite_physique: this.state.entite_physique ? this.state.entite_physique.id : undefined,
            vehicule: this.state.vehicule ? this.state.vehicule.id : undefined,
            conducteur: this.state.conducteur ? this.state.conducteur.id : undefined,
            tiers: this.state.tiers ? this.state.tiers.id : undefined,
            marque: this.state.marque ? this.state.marque.id : undefined,
            energie: this.state.energie ? this.state.energie.id : undefined,
            type_consomation: this.state.type_consomation ? this.state.type_consomation.id : undefined,

        }

        this.props.onFormConsommationSubmit(data)

        //    console.log(this.filterData(data))
        //    console.log(data)
    }






    setFieldSelect(name, value) {

        let obj = {};
        obj[name] = value;
        this.setState(obj);
    }

    // filterData(data){

    //      var debut = data.date_comprise_premiere ? Date.parse(data.date_comprise_premiere) : null
    //      var fin = data.date_comprise_deuxieme ? Date.parse(data.date_comprise_deuxieme) : null



    //     return this.props.utilisations.filter(ut => {
    //         let dateDebutUtili = Date.parse(ut.date_debut_utilisation)
    //         let dateFinUtili = Date.parse(ut.date_fin_utilisation)
    //         return  (data.type_vehicule_statut != "Tous" ? ut.vehicule.type_vehicule_statut == data.type_vehicule_statut : ut.vehicule.type_vehicule_statut == "Service" || ut.vehicule.type_vehicule_statut == "Fonction" || ut.vehicule.type_vehicule_statut == "Flotte") 
    //         &&
    //      (data.etat_vehicule_status != "Tous" ? ut.vehicule.etat_vehicule_status == data.etat_vehicule_status : ut.vehicule.etat_vehicule_status == "En service" || ut.vehicule.etat_vehicule_status == "Commande" || ut.vehicule.etat_vehicule_status == "Vendu" || ut.vehicule.etat_vehicule_status == "Restitué" || ut.vehicule.etat_vehicule_status == "Sorti") 
    //       &&
    //      (data.mode_acquisition != "Tous" ? ut.vehicule.mode_acquisition == data.mode_acquisition : ut.vehicule.mode_acquisition == "0" || ut.vehicule.mode_acquisition == "1" || ut.vehicule.mode_acquisition == "2" || ut.vehicule.mode_acquisition == "4" || ut.vehicule.mode_acquisition =="5" ) 
    //       &&
    //      (data.mode_acquisition_type_vehicule != "Tous" ? ut.vehicule.mode_acquisition_type_vehicule == data.mode_acquisition_type_vehicule : ut.vehicule.mode_acquisition_type_vehicule == "Véhicule de la société" || ut.vehicule.mode_acquisition_type_vehicule == "Véhicule personnel" )
    //       && 
    //       (debut && fin ? debut >= dateDebutUtili && debut <= dateFinUtili || fin >= dateDebutUtili && fin <= dateFinUtili || debut <= dateDebutUtili && fin >= dateFinUtili : true )
    //      &&
    //       (data.vehicule ?  ut.vehicule.id  == data.vehicule : true )
    //        &&
    //   (data.chaufeur ? ut.chauffeur.id == data.chaufeur : true )
    //     &&
    //     (data.entite_physique ? ut.vehicule.entite_physique ? ut.vehicule.entite_physique.id == data.entite_physique : true : true) 
    //     &&
    //    (data.utilisateur ? ut.utilisateur ? ut.utilisateur.id == data.utilisateur : true : true ) 
    //     }

    //     )

    // }


    render() {

        return (
            // <div className="app-main__inner">

            <React.Fragment >

                <form className="" onChange={this.setField} onSubmit={this.submitConsommationEtatForm}>
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
                                <label className="center">Date entrée dans le parc comprise entre : </label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="position-relative form-group">
                                <input name="date_entree_comprise_premiere"
                                    ref={date_entree_comprise_premiere => this.date_entree_comprise_premiere = date_entree_comprise_premiere}

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


                                <input name="date_entree_comprise_deuxieme"
                                    ref={date_entree_comprise_deuxieme => this.date_entree_comprise_deuxieme = date_entree_comprise_deuxieme}
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
                            <label className="">Marque</label>

                            <Select
                                name="marque"
                                placeholder="Selectionnez une Marque"
                                noOptionsMessage={() => "Aucune Donnée trouvée"}
                                options={this.props.marques}
                                getOptionLabel={option => `${option.nom_marque}`}
                                getOptionValue={option => option.id}
                                onChange={this.setFieldSelect.bind(this, "marque")}

                            />

                        </div>

                        <div className="col-md-3">
                            <label className="">Energie</label>

                            <Select
                                name="energie"
                                placeholder="Selectionnez une Energie"
                                noOptionsMessage={() => "Aucune Donnée trouvée"}
                                options={this.props.natures_energies}
                                getOptionLabel={option => `${option.nom_energie}`}
                                getOptionValue={option => option.id}
                                onChange={this.setFieldSelect.bind(this, "energie")}

                            />

                        </div>



                    </div>
                    <hr />
                    <p style={{alignItems: 'center'}}>Choix sur les Consommations</p>
                    <hr />

                    <div className="form-row">
                        <div className="col-md-3">
                            <label className="">Choix d'un Tiers</label>

                            <Select
                                name="tiers"
                                placeholder="Selectionnez un Tiers"
                                noOptionsMessage={() => "Aucune donnée"}
                                options={this.props.tiers}
                                getOptionLabel={option => option.code}
                                getOptionValue={option => option.id}
                                onChange={this.setFieldSelect.bind(this, "tiers")}

                            />

                        </div>

                        <div className="col-md-3">
                            <label className=""> Type de Consommation</label>

                            <Select
                                name="type_consomation"
                                placeholder="Selectionnez une nature de consommation"
                                noOptionsMessage={() => "Aucune donnée"}
                                options={this.props.natures_consommations}
                                getOptionLabel={option => option.nature_consomation}
                                getOptionValue={option => option.id}
                                onChange={this.setFieldSelect.bind(this, "type_consomation")}

                            />

                        </div>

                        <div className="col-md-3">
                            <label className="">Conducteur</label>

                            <Select
                                name="conducteur"
                                placeholder="Selectionnez un Conducteur"
                                noOptionsMessage={() => "Aucune Donnée trouvée"}
                                options={this.props.personnels}
                                getOptionLabel={option => `${option.nom} ${option.prenom}`}
                                getOptionValue={option => option.id}
                                onChange={this.setFieldSelect.bind(this, "conducteur")}

                            />

                        </div>



                    </div>

                    <div className="form-row">

                            <div className="col-md-3">
                                <label className="center">Date Consommation comprise entre : </label>
                        </div>
                        <div className="col-md-3">
                                <input name="date_conso_comprise_premiere"
                                    ref={date_conso_comprise_premiere => this.date_conso_comprise_premiere = date_conso_comprise_premiere}

                                    type="date" className="form-control"
                                />
                        </div>

                        <div className="col-md-1">
                                <label className="center">ET</label>
                        </div>

                        <div className="col-md-3">


                                <input name="date_conso_comprise_deuxieme"
                                    ref={date_conso_comprise_deuxieme => this.date_conso_comprise_deuxieme = date_conso_comprise_deuxieme}
                                    type="date" className="form-control" />

                            
                        </div>


                    </div>

                    <div className="form-row">

                        <div className="col-md-3">
                                <label className="center">N° de la Carte </label>
                        </div>
                        <div className="col-md-3">
                                <input name="numero_carte"
                                    ref={numero_carte => this.numero_carte = numero_carte}

                                    type="text" className="form-control"
                                />
                        </div>

                        <div className="col-md-2">
                                <label className="center">N° du Conducteur</label>
                        </div>

                        <div className="col-md-3">
                                       <InputMask mask="99:99" mask="(+225) 99 99 99 99" 
                                                onChange={this.setField}
                                            inputRef={numero_conducteur => this.numero_conducteur = numero_conducteur}
                                            className="form-control"
                                            name="numero_conducteur"
                                            />

                        </div>


                    </div>



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
        personnels: state.personnels.items,
        vehicules: state.vehicules.items,
        utilisations: state.utilisations.items,
        marques: state.marques.items,
        natures_consommations: state.natures_consommations.items,
        natures_energies: state.natures_energies.items,






    }
}

export default connect(mapStateToProps)(ConsommationVehiculeEtatForm)