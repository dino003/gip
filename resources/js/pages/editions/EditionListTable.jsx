import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import MyModal from '../../components/MyModal'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';




class EditionListTable extends Component {

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
                    <h5 className="card-title">Effectuez un Double-clic sur la ligne de l'état a exécuter </h5>
                    <button type="button" className="btn mr-2 mb-2 btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Small modal</button>
                    <button  onClick={e => { this.showModal(e);}}> Le modal </button>

                    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="complex-table"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>

                    {/* <div style={{position: 'absolute'}}>
    <div className="modal-dialog modal-sm">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
            </div>
        </div>
    </div>
</div> */}
                    <MyModal onClose={this.showModal} show={this.state.show}>
                    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>

                         </MyModal>

                        <div className="table-responsive">
                            <table className="mb-0 table table-bordered" >
                                <thead>
                                    <tr>
                                        <th>Nature</th>
                                        <th>Libéllé Etat</th>
                                        <th>Référence</th>
                                        <th>Sélection ?</th>
                                      

                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th colSpan="12" style={{ backgroundColor: 'gray' }} >  Les Vehicules </th>

                                    </tr>
                                    <tr>

                                        <td >Véhicules</td>
                                        <td >Liste du parc de véhicule</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>
                                      

                                    </tr>

                                    <tr onDoubleClick={() => this.props.history.push('/gestion_du_parc_automobile/edition-vehicules-par-entites-vehicules')}>
                                        <td >Véhicules</td>
                                        <td >Liste des véhicules par Entité et Véhicule</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>

                                    </tr>
                                    
                                    <tr >
                                        <td >Véhicules</td>
                                        <td >Liste des véhicules par Tiers, Entité, Véhicule</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>

                                    </tr>

                                    <tr>
                                        <td >Véhicules</td>
                                        <td >Liste des véhicules par Tiers, Véhicule</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>

                                    </tr>

                                    <tr>
                                        <td >Véhicules</td>
                                        <td >Liste des véhicules par Tiers Assureur, Entité, Véhicule</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>

                                    </tr>

                                </tbody>

                                <tbody>
                                    <tr>
                                        <th colSpan="12" style={{ backgroundColor: 'gray' }} >  LES UTILISATIONS DES VEHICULES ( UTILISATION DU COMPTEUR KILOMETRIQUE) </th>

                                    </tr>
                                    <tr>

                                        <td >Utilisations (Kms)</td>
                                        <td > Utilisations des véhicules par Entités</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>
                                      

                                    </tr>

                                    <tr >
                                        <td >Utilisations (Kms)</td>
                                        <td >Utilisations des véhicules</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>

                                    </tr>
                                    
                                    <tr onDoubleClick={() => this.props.history.push('/gestion_du_parc_automobile/edition-utilisations-par-utilisateur-vehicules')}>
                                        <td >Utilisations (Kms)</td>
                                        <td >Utilisations des véhicules par Utilisateurs</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>

                                    </tr>

                                    <tr>
                                        <td >Utilisations (Kms)</td>
                                        <td >Liste des Utilisation (Kms) par Tiers, Véhicule</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>

                                    </tr>

                                    <tr>
                                        <td >Utilisations (Kms)</td>
                                        <td >Liste des véhicules par Tiers Assureur, Entité, Véhicule</td>
                                        <td >PA_000</td>
                                        <td >Oui</td>

                                    </tr>

                                </tbody>
                            </table>

                            <table className="mb-0 table table-bordered" id="complex-table">
                                <caption>Nom de l'etat</caption>
                                <thead>
                                <tr style={{backgroundColor: 'gray'}}> 
                                    <th colSpan="6">ENTITE : SIEGE</th>
                                    <th colSpan="6">PRAREP PROPACOM BOUAKE </th> 
                                 </tr>

                                 {/* <tr>
                                      <td colSpan="2"> 
                                 <strong>Pay to:</strong><br />
                                  Acme Billing Co.<br /> 123 Main St.<br />
                                   Cityville, NA 12345 
                                   </td> 
                                   <td colSpan="2"> 
                                   <strong>Customer:</strong><br />
                                    John Smith<br /> 321 Willow Way<br />
                                     Southeast Northwestershire, MA 54321 
                                     </td> 
                                     
                                </tr> */}


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
                                            
                                            <tr> 
                                                <th colSpan="2">Tax</th> 
                                                <td> 8% </td> 
                                                <td>8.80</td>
                                            </tr> 
                                            
                                            <tr> 
                                                <th colSpan="3">Grand Total</th> 
                                                <td>$ 118.80</td>
                                            </tr> 
                                    </tfoot>


                            </table>

                            {/* <table className="mb-0 table table-bordered" id="complex-table">
                                <caption>Nom de l'etat</caption>
                                <thead>
                                <tr> 
                                    <th colSpan="3">Invoice #123456789</th>
                                    <th>14 January 2025 </th> 
                                 </tr>

                                 <tr>
                                      <td colSpan="2"> 
                                 <strong>Pay to:</strong><br />
                                  Acme Billing Co.<br /> 123 Main St.<br />
                                   Cityville, NA 12345 
                                   </td> 
                                   <td colSpan="2"> 
                                   <strong>Customer:</strong><br />
                                    John Smith<br /> 321 Willow Way<br />
                                     Southeast Northwestershire, MA 54321 
                                     </td> 
                                     
                                </tr>


                                </thead>

                                <tbody> 
                                    <tr> 
                                        <th>Name / Description</th> 
                                        <th>Qty.</th> 
                                        <th>@</th> 
                                        <th>Cost</th> 
                                        </tr> 
                                        <tr> 
                                            <td>Paperclips</td> 
                                            <td>1000</td> 
                                            <td>0.01</td> 
                                            <td>10.00</td>
                                        </tr> 
                                             
                                        <tr> 
                                            <td>Staples (box)</td> 
                                            <td>100</td> 
                                            <td>1.00</td> 
                                            <td>100.00</td> 
                                        </tr> 
                                    </tbody>

                                    <tfoot> 
                                        <tr> 
                                            <th colSpan="3">Subtotal</th> 
                                            <td> 110.00</td> 
                                            </tr> 
                                            
                                            <tr> 
                                                <th colSpan="2">Tax</th> 
                                                <td> 8% </td> 
                                                <td>8.80</td>
                                            </tr> 
                                            
                                            <tr> 
                                                <th colSpan="3">Grand Total</th> 
                                                <td>$ 118.80</td>
                                            </tr> 
                                    </tfoot>


                            </table> */}

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

export default connect(mapStateToProps)(EditionListTable)
//export default TypeEntite

