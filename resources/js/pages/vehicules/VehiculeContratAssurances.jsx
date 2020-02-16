import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../../components/table.css'
import MatriculeInput from '../../components/MatriculeInput';
import ContratAssuranceVehiculeItem from '../../components/vehicules/ContratAssuranceVehiculeItem';




  class VehiculeContratAssurances extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            isDefautDeclench: false,
            loading: false,
        }
    }


        onDelete = (id) => {

            let conf = confirm('Voulez-vous vraiment supprimer ?')
            if(conf === true){

                const action = {type: "REMOVE_CONTRAT_ASSURANCE", value: id}
                this.props.dispatch(action)
                axios.delete('/api/supprimer_contrat_assurance/' + id)

            }

        }

        onContratEncour = (id) => {
            this.setState({isDefautDeclench: !this.state.isDefautDeclench})
           axios.get('/api/modifier_contrat_assurance_encour_vehicule/' + id + '/' + this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id).id).then(response => {
               const action = {type: "GET_CONTRAT_ASSURANCE", value: response.data}
               this.props.dispatch(action)
            this.setState({isDefautDeclench: !this.state.isDefautDeclench})

           })
       }

       isAvailableContratEmpty = () => {
        const vehicule_courant = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)

        const contrat_en_cour = this.props.contrat_assurances.filter(cont => cont.vehicule_id == vehicule_courant.id && cont.encour_vehicule )
        console.log(contrat_en_cour)
        return !contrat_en_cour.length;
       }



    onEdit = (id) => {
        const vehic = this.props.vehiculeSeleted

        this.props.history.push('/gestion_du_parc_automobile/parc/modification-contrat_assurance_de_vehicule/' + vehic.id + '/' + vehic.immatriculation + '/contrat/' + id)
    }



    renderLoading(){
        return  <span style={{textAlign: 'center'}}>

        <Loader
            height={100}
            width={100}
         />
         </span>
    }

    renderEmpty(){
       return <span style={{textAlign: 'center', color: 'red'}}>
            Aucune donnée enregistrée !
        </span>
    }


    renderList(){
        const vehicule_courant = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)

        return (  <table className="mb-0 table" id="export">
        <thead>
        <tr>
        <th className="sticky-col first-col">Numero de contrat</th>
        <th className="sticky-col second-col">Compagnie</th>
        <th className="sticky-col third-col">Début</th>

        <th className="sticky-col thour-col">Fin</th>
        <th>Date Contrat</th>
         <th>Effet</th>
         <th>Montant franchise</th>

        <th>Status</th>
         <th>En cours</th>

        </tr>
        </thead>
        <tbody>

     { this.props.contrat_assurances.filter(cont => cont.vehicule_id == vehicule_courant.id || cont.global ).map((item, index) =>
         <ContratAssuranceVehiculeItem
         index={index}
          key={item.id}
          onEdit={this.onEdit}
          onDelete={this.onDelete}
          onContratEncour={this.onContratEncour}
          isDefautDeclench={this.state.isDefautDeclench}
          isAvailableContratEmpty={this.isAvailableContratEmpty}

         item={item} />
    )  }
        </tbody>
    </table>)
    }



    render() {
       // console.log(vehiculeselect)
       if(this.props.vehiculeSeleted == undefined && this.props.vehicules.length){
        const action = {type: "EDIT_SELECTED", value:  this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}
          this.props.dispatch(action)
        }
    const vehiculeselect = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
    const contrat_assurances = this.props.contrat_assurances.filter(cont => cont.vehicule_id == this.props.match.params.vehicule_id || cont.global)

        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                       <h5 className="card-title">Gestion des Contrats d'assurance

                            {vehiculeselect && <span className="pull-right">



                                        { contrat_assurances.length ?
                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename={`Contrats d'assurance du véhicule ${vehiculeselect.immatriculation}`}
                                                sheet="feuille1"
                                                buttonText="Ecran -> Liste"/> : null }
                            </span>}


                                {this.props.vehicules.length &&
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/>
                            }

                            </h5>

                            <br />
                            <div className="view">
                                  <div className="wrapper">
                                  {this.props.loading ? this.renderLoading() :
                            !contrat_assurances.length ? this.renderEmpty() : this.renderList()}

                                  </div>
                              </div>

                       </div>
                   </div>

                   <Container>
                        <Button
                        tooltip="Ajouter un Contrat"
                        icon="fas fa-plus"
                    // rotate={true}
                        styles={{backgroundColor: 'green', color: 'white', cursor: 'pointer'}}

                        onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-contrat_assurance_de_vehicule/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                        />
                </Container>

       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        contrat_assurances: state.contrat_assurances.items,
        loading: state.contrat_assurances.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        vehicules: state.vehicules.items,


    }
  }

export default connect(mapStateToProps)(VehiculeContratAssurances)
//export default TypeEntite

