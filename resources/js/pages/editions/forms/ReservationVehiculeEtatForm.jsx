import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux'
import Select from 'react-select';
import { colourStyles } from '../../../utils/Repository';




class ReservationEtatForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // date_creation: new Date(),

            entite_physique: undefined,
            nature_intervention: undefined,
            vehicule: undefined,
            personne: undefined
        }

        this.submitReservationEtatForm = this.submitReservationEtatForm.bind(this);
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


    submitReservationEtatForm(e) {
        e.preventDefault()
        let data = {
          

            date_reservation_comprise_premiere: this.date_reservation_comprise_premiere.value,
            date_reservation_comprise_deuxieme: this.date_reservation_comprise_deuxieme.value,
            entite_physique: this.state.entite_physique ? this.state.entite_physique.id : undefined,
            vehicule: this.state.vehicule ? this.state.vehicule.id : undefined,
            personne: this.state.personne ? this.state.personne.id : undefined,
        }

        this.props.onFormReservationEtatSubmit(data)

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

                <form className="" onChange={this.setField} onSubmit={this.submitReservationEtatForm}>
              
                    <div className="form-row">

                        <div className="col-md-3">
                            <div className="position-relative form-group">
                                <label className="center">Période a traiter : Du</label>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="position-relative form-group">
                                <input name="date_reservation_comprise_premiere"
                                    ref={date_reservation_comprise_premiere => this.date_reservation_comprise_premiere = date_reservation_comprise_premiere}

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


                                <input name="date_reservation_comprise_deuxieme"
                                    ref={date_reservation_comprise_deuxieme => this.date_reservation_comprise_deuxieme = date_reservation_comprise_deuxieme}
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
                            <label className="">Choix d'une Personne</label>

                            <Select
                                name="personne"
                                placeholder="Selectionnez une Personne"
                                noOptionsMessage={() => "Aucune Donnée trouvée"}
                                options={this.props.personnels}
                                getOptionLabel={option => `${option.nom} ${option.prenom} `}
                                getOptionValue={option => option.id}
                                onChange={this.setFieldSelect.bind(this, "personne")}

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
        personnels: state.personnels.items,
        natures_interventions: state.natures_interventions.items,
        vehicules: state.vehicules.items,
        utilisations: state.utilisations.items,



    }
}

export default connect(mapStateToProps)(ReservationEtatForm)