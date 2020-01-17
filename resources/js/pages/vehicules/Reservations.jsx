import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MatriculeInput from '../../components/MatriculeInput';
import ReservationItem from '../../components/vehicules/ReservationItem';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import today from '../../utils/today';


import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import { Calendar, Views, momentLocalizer } from 'react-big-calendar'

import moment from 'moment'
//import 'moment/locale/fr'
import 'react-big-calendar/lib/css/react-big-calendar.css'
const bigLocaliser = momentLocalizer(moment)

const allViews = Object.keys(Views).map(k => Views[k])

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
    })


class Reservations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            reservations_visible_actuelement: this.props.reservations,

        }
    }


    onDelete = (id) => {
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if (conf) {
            const action = { type: "REMOVE_RESERVATION", value: id }
            this.props.dispatch(action)

            axios.delete('/api/supprimer_vehicule_reservation/' + id).then(_ => toast.success("Supprimé avec succès !", {
                position: toast.POSITION.BOTTOM_CENTER
            }))
        }


    }

    onTransformutilisation = (id) => {
        let conf = confirm('Voulez-vous vraiment transformer cette reservation en utilisation ?')
        return (conf) ? this.transformationEnUtilisation(id) : null

    }

    transformationEnUtilisation = id => {
        var reservation = this.props.reservations.find(reser => reser.id == id)
        if (Date.parse(reservation.date_debut_reservation) > Date.parse(today)) {
            alert('La date de début de cette reservation est > a la date du jour \n elle ne peut pas être transformée en utilisation')

        } else {
            axios.get('/api/transformation_en_utilisation/' + id)
                .then(response => {

                    let reser = response.data
                    let personne = this.props.personnels.find(per => per.id == reser.personne_reservant.id)
                    var reservationTransformee = {
                        vehicule: reser.vehicule.id,
                        utilisateur: reser.personne_reservant.id,
                        entite_utilisateur: personne.entite_affectation ? personne.entite_affectation.id : null,
                        nature_utilisation: reser.objet_reservation.id,
                        chauffeur: reser.personne_reservant.id,
                        date_debut_utilisation: reser.date_debut_reservation,
                        date_fin_utilisation: reser.date_fin_reservation,
                        heure_debut: reser.heure_debut_reservation,
                        heure_de_fin: reser.heure_fin_reservation,
                        kilometrage_compteur_debut: reser.kilometrage_vehicule_a_la_reservation,
                        kilometrage_compteur_retour: reser.kilometrage_prevu > 0 ? parseFloat(reser.kilometrage_vehicule_a_la_reservation) + parseFloat(reser.kilometrage_prevu) : reser.kilometrage_vehicule_a_la_reservation,
                        kilometres_parcourus: reser.kilometrage_prevu,
                    }

                    this.ajoutUtilisation(reservationTransformee)
                    const action = { type: "TRANSFORMATION_RESERVATION_UTILISATION", value: response.data }
                    this.props.dispatch(action)
                    toast.success("La reservation a été transformée en utilisation !", {
                        position: toast.POSITION.BOTTOM_CENTER
                    })
                })
        }
        // console.log(Date.parse(reservation.date_debut_reservation) > Date.parse(today))
    }

    onTransformationDepartReservation = id => {
        let message = 'Etes vous sur de vouloir enregistrer le départ d\'un véhicule réservé ? \n Si vous répondez OUI : \n --- la date et l\'heure de début de cette reservation seront forcées a la date et l\'heure actuelle \n --- La réservation sera transformée en utilisation.'
        let conf = confirm(message)
        return (conf) ? this.transformationDepartReservation(id) : null
    }

    ajoutUtilisation = objet => {
        let vehicule = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)

        axios.post('/api/ajouter_vehicule_utilisation', objet).then(response => {
            const action = { type: "ADD_UTILISATION", value: response.data }
            this.props.dispatch(action)

            const val = { id: vehicule.id, kilometrage_acquisition: response.data.kilometrage_compteur_retour }

            const action2 = { type: "EDIT_VEHICULE_KILOMETRAGE", value: val }
            this.props.dispatch(action2)

            const action3 = { type: "EDIT_SELECTED", value: vehicule }
            this.props.dispatch(action3)

        })
    }

    transformationDepartReservation = id => {
        var da = new Date();
        let heure = da.getHours() + ":" + da.getMinutes()
        axios.post('/api/modifier_vehicule_reservation/' + id, {
            date_debut_reservation: today,
            heure_debut_reservation: heure,
            transforme_en_utilisation: true
        })
            .then(response => {
                let reser = response.data
                let personne = this.props.personnels.find(per => per.id == reser.personne_reservant.id)
                var reservationTransformee = {
                    vehicule: reser.vehicule.id,
                    utilisateur: reser.personne_reservant.id,
                    entite_utilisateur: personne.entite_affectation ? personne.entite_affectation.id : null,
                    nature_utilisation: reser.objet_reservation.id,
                    chauffeur: reser.personne_reservant.id,
                    date_debut_utilisation: reser.date_debut_reservation,
                    date_fin_utilisation: reser.date_fin_reservation,
                    heure_debut: reser.heure_debut_reservation,
                    heure_de_fin: reser.heure_fin_reservation,
                    kilometrage_compteur_debut: reser.kilometrage_vehicule_a_la_reservation,
                    kilometrage_compteur_retour: reser.kilometrage_prevu > 0 ? parseFloat(reser.kilometrage_vehicule_a_la_reservation) + parseFloat(reser.kilometrage_prevu) : reser.kilometrage_vehicule_a_la_reservation,
                    kilometres_parcourus: reser.kilometrage_prevu,
                }

                this.ajoutUtilisation(reservationTransformee)

                const action = { type: "TRANSFORMATION_RESERVATION_UTILISATION", value: response.data }
                this.props.dispatch(action)
                toast.success("La reservation a été transformée en utilisation !", {
                    position: toast.POSITION.BOTTOM_CENTER
                })
            })
    }



    onEdit = (id) => {
        const vehic = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(vehicule => vehicule.id == this.props.match.params.vehicule_id)
        this.props.history.push('/gestion_du_parc_automobile/parc/modification-reservation-vehicule/' + vehic.id + '/' + vehic.immatriculation + '/reservation/' + id)
   
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
            Aucune donnée enregistrée !
        </span>
    }

    setDates = () => {
        const events = [];
        this.state.reservations_visible_actuelement.filter(reser => reser.vehicule.id == this.props.match.params.vehicule_id).map(event => {
            return events.push({
                start: new Date(event.date_debut_reservation),
                end: new Date(event.date_fin_reservation),
                allDay: true,
                title: ` ${event.objet_reservation.libelle} par ${event.personne_reservant.prenom} ${event.personne_reservant.nom} `
            })
        })

        return events
    }


    renderList() {
        const reservations = this.props.reservations.filter(reser => reser.vehicule.id == this.props.match.params.vehicule_id && !reser.transforme_en_utilisation)
        return (<table className="mb-0 table" id="export">
            <thead>
                <tr>
                    <th>Véhicule</th>
                    <th>Entité de réservation</th>
                    <th>du</th>
                    <th>à</th>
                    <th>au</th>
                    <th>à</th>
                    <th>Objet de la réservation</th>
                    <th>Trans.Util ?</th>
                    <th>Actions</th>


                </tr>
            </thead>
            <tbody>

                {reservations.map((item, index) =>
                    <ReservationItem
                        index={index}
                        key={item.id}
                        onEdit={this.onEdit}
                        onDelete={this.onDelete}
                        onTransformutilisation={this.onTransformutilisation}
                        onTransformationDepartReservation={this.onTransformationDepartReservation}
                        item={item} />
                )}
            </tbody>
        </table>)
    }

    renderListHistoriques() {
        const reservations = this.props.reservations.filter(reser => reser.vehicule.id == this.props.match.params.vehicule_id && reser.transforme_en_utilisation)
        return (<table className="mb-0 table" >
            <thead>
                <tr>
                    <th>Véhicule</th>
                    <th>Entité de réservation</th>
                    <th>du</th>
                    <th>à</th>
                    <th>au</th>
                    <th>à</th>
                    <th>Objet de la réservation</th>
                    <th>Trans.Util ?</th>
                    <th>Actions</th>


                </tr>
            </thead>
            <tbody>

                {reservations.map((item, index) =>
                    <ReservationItem
                        index={index}
                        key={item.id}
                        onEdit={this.onEdit}
                        onDelete={this.onDelete}
                        onTransformutilisation={this.onTransformutilisation}
                        onTransformationDepartReservation={this.onTransformationDepartReservation}
                        item={item} />
                )}
            </tbody>
        </table>)
    }



    render() {
        if (this.props.vehiculeSeleted == undefined && this.props.vehicules.length) {
            const action = { type: "EDIT_SELECTED", value: this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id) }
            this.props.dispatch(action)
        }
        const vehiculeselect = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
        const reservations = this.props.reservations.filter(inter => inter.vehicule.id == this.props.match.params.vehicule_id)

        if (this.props.vehicules.length) {
            return (
                <div className="app-main__inner">
                    <div className="main-card card" >
                        <div className="card-body ">
                            <h5 className="card-title">Gestion des reservations
                          {vehiculeselect &&
                                    <span className="pull-right">

                                        {/* <button title=" Ajouter une nouvelle intervention"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-reservation-vehicules/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                </button> */}
                                        {this.props.reservations.length ?
                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename={`Réservations de véhicule ${vehiculeselect.immatriculation}`}
                                                sheet="feuille1"
                                                buttonText="Ecran -> Liste" /> : null}
                                    </span>
                                }


                                <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)} />


                            </h5>
                            <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
                                <li className="nav-item">
                                    <a role="tab" className="nav-link active" id="tab-0" data-toggle="tab" href="#tab_planning">
                                        <span>Planning</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a role="tab" className="nav-link " id="tab-1" data-toggle="tab" href="#tab_reservations_en_cours">

                                        <span>  Réservations en cours</span>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a role="tab" className="nav-link" id="tab-2" data-toggle="tab" href="#tab_historique_reservations">
                                        <span>Historiques</span>
                                    </a>
                                </li>
                            </ul>

                            <div className="tab-content">

                                <div className="tab-pane tabs-animation fade show active" id="tab_planning" role="tabpanel">

                                    <div className="table-responsive" style={{ height: '1000px' }}>
                                        <Calendar
                                            localizer={bigLocaliser}
                                            events={this.setDates()}
                                            startAccessor="start"
                                            endAccessor="end"
                                            culture='fr'
                                       
                                            views={['month', 'week', 'day']}
                                            messages={{
                                                month: 'Mensuel',
                                                day: 'Journalière',
                                                week: 'Hebdomadaire',
                                                today: 'Aujourd\'hui',
                                                next: 'Suivant',
                                                previous: 'Précédent'
                                            }}
                                        />

                                    </div>
                                </div>

                                <div className="tab-pane tabs-animation fade show " id="tab_reservations_en_cours" role="tabpanel">

                                    <div className="table-responsive">
                                        {this.props.loading ? this.renderLoading() :
                                            !reservations.length ? this.renderEmpty() : this.renderList()}



                                    </div>
                                </div>

                                <div className="tab-pane tabs-animation fade show" id="tab_historique_reservations" role="tabpanel">

                                    <div className="table-responsive">
                                        {this.props.loading ? this.renderLoading() :
                                            !reservations.length ? this.renderEmpty() : this.renderListHistoriques()}



                                    </div>
                                </div>

                            </div>


                        </div>
                    </div>

                    <ToastContainer autoClose={4000} />

                    <Container>
                        <Button
                            tooltip="Ajouter une ligne de réservation"
                            icon="fas fa-plus"
                            // rotate={true}
                            styles={{ backgroundColor: 'green', color: 'white', cursor: 'pointer' }}

                            onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-reservation-vehicules/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                        />
                    </Container>

                </div>
            )
        } else {
            return (<span style={{ textAlign: 'center' }}>

                <Loader
                    height={100}
                    width={100}
                />
            </span>)
        }
    }
}

const mapStateToProps = state => {
    return {
        reservations: state.reservations.items,
        loading: state.reservations.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        personnels: state.personnels.items,
        vehicules: state.vehicules.items


    }
}

export default connect(mapStateToProps)(Reservations)
//export default TypeEntite

