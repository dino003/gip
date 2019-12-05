import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ReactHTMLTableToExcel from 'react-html-table-to-excel';


class VehiculeParEntiteVehicule extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            show: false,

            consommations: [],
            loading: false,
        }

     
    }


    componentDidMount() {

    }

    showModal = e => {
        this.setState({
          show: !this.state.show
        });
      };


    onDelete = (id) => {

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if (conf === true) {

            const action = { type: "REMOVE_INTERVENTION", value: id }
            this.props.dispatch(action)
            axios.delete('/api/supprimer_vehicule_intervention/' + id)

        }

    }



    onEdit = (id) => {
        const vehic = this.props.vehiculeSeleted
        this.props.history.push('/gestion_du_parc_automobile/parc/modification-consommations-vehicules/' + vehic.id + '/' + vehic.immatriculation + '/consommation/' + id)
    }

    handleChange = (e) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }





    toggleVisibleInput = () => {
        this.setState(prevState => {
            return {
                inputOpen: !prevState.inputOpen
            }
        })
    }

    toggleVisible = () => {
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen
            }
        })
    }


    renderLoading() {
        return <span style={{ textAlign: 'center' }}>

            <Loader
                type="BallTriangle"
                color="#00BFFF"
                height={100}
                width={100}
            />
        </span>
    }

    renderEmpty() {
        return <span style={{ textAlign: 'center', color: 'red' }}>
            Aucune donnée enregistrée !
        </span>
    }


    renderList() {
        const consommations = this.props.consommations.filter(inter => inter.vehicule.id == this.props.vehiculeSeleted.id)
        return (<table className="mb-0 table" >
            <thead>
                <tr>
                    <th>Nature</th>
                    <th>Libéllé Etat</th>
                    <th>Référence</th>
                    <th>Sélection ?</th>
                    <th>Quantité</th>
                    <th>TTC</th>
                    <th>TVA</th>
                    <th>HT</th>
                    <th>Tiers</th>
                    <th>Libéllé</th>


                </tr>
            </thead>
            <tbody>
                <tr>

                    <td onDoubleClick={this.onEdit}>{item.libelle}</td>
                    <td onDoubleClick={this.onEdit}>{item.cout_unitaire}</td>


                    <td>

                        <span className="pull-right">
                            <button onClick={this.props.onDelete.bind(this, item.id)}
                                className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                                <i className="fa fa-trash"></i>
                            </button>

                        </span>
                    </td>
                </tr>

            </tbody>
        </table>)
    }



    render() {
        return (
            <div className="app-main__inner">
                <div className="row">
                    <div className="col-lg-12">
                <div className="main-card mb-3 card">
                    <div className="card-body ">
                    {/* <button type="button" className="btn mr-2 mb-2 btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Small modal</button>

                    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="complex-table"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/> */}

   
                

                        <div className="table-responsive">
                           

                            <table className="mb-0 table table-bordered" id="complex-table">
                                <caption>Nom de l'etat</caption>
                                <thead>
                                <tr style={{backgroundColor: 'gray'}}> 
                                    <th colSpan="6">ENTITE : SIEGE</th>
                                    <th colSpan="6">PRAREP PROPACOM BOUAKE </th> 
                                 </tr>

                              


                                </thead>

                                <tbody> 
                                    <tr> 
                                        <th>Imatriculation</th> 
                                        <th>Type</th> 
                                        <th>Prix d'achat</th> 
                                        <th>Détenteur</th> 
                                        <th>Marque</th> 
                                        <th>Modèle </th> 
                                        <th>Fournisseur d'aquisition</th> 
                                        <th>Type acquisition</th> 
                                        <th>Date d'entrée</th> 

                                        </tr> 
                                        <tr> 
                                            <td>Paperclips</td> 
                                            <td>1000</td> 
                                            <td>0.01</td> 
                                            <td>10.00</td>
                                            <td>Paperclips</td> 
                                            <td>Paperclips</td> 
                                            <td>Paperclips</td> 
                                            <td>Paperclips</td> 
                                            <td>Paperclips</td> 

                                        </tr> 
                                             
                                       
                                    </tbody>

                                    <tfoot> 
                                        <tr> 
                                            <th colSpan="2">Nombre de véhicules ( 5 )</th> 
                                            <td> 110.00</td> 
                                            </tr> 
                                            
                                    </tfoot>


                            </table>

                         

                        </div>
                    </div>
                </div>
                </div>
                </div>


        




            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        consommations: state.consommations.items,
        loading: state.consommations.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
}

export default connect(mapStateToProps)(VehiculeParEntiteVehicule)
//export default TypeEntite

