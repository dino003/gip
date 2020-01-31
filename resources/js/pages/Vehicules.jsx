import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import VehiculeItem from '../components/vehicules/VehiculeItem'
import MatriculeInput from '../components/MatriculeInput'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Container, Button, Link } from 'react-floating-action-button'

import { groupBy } from '../utils/Repository'
import TableHeader from '../components/TableHeader'
import '../components/table.css'



class Vehicules extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicules_visibles_actuelement: this.props.vehicules,
            obj: undefined,
            //  selected: (new Map(): Map<string, boolean>)      
        }

        this.searchChange = this.searchChange.bind(this)
        this.changeState = this.changeState.bind(this)
    }

    // componentWillUnmount(){
    //     const action = {type: "ADD_CODE_INCIDENT", value: response.data}
    //     this.props.dispatch(action)    }


    searchChange() {

        let vehicules_visibles_maintenant = this.props.vehicules.filter(vehicule => vehicule.immatriculation.toLowerCase().includes(this.search.value.toLowerCase()))
        this.setState({
            vehicules_visibles_actuelement: vehicules_visibles_maintenant
        })
    }

    changeState() {
        this.setState({
            vehicules_visibles_actuelement: this.props.vehicules

        })
    }

    onDelete = (id) => {
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if (conf === true) {

            const action = { type: "REMOVE_VEHICULE", value: id }
            this.props.dispatch(action)
            // const itemIndex = this.state.personnelState.findIndex(item => item.id === id)

            // this.setState({personnelState: this.state.personnelState.filter((item, index) => index !== itemIndex)})
            axios.delete('/api/supprimer_vehicule/' + id)
        }

    }

    onEdit = (id) => {

        this.props.history.push('/gestion_du_parc_automobile/modification_vehicule/' + id)

    }

    handleChange = (e) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
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
            Aucune véhicule trouvé !
        </span>
    }

    onSelect = id => {
        const obj = this.props.vehicules.find(veh => veh.id === id)

        // console.log(obj)
        this.setState({ obj: obj }, () => {
            const action = { type: "EDIT_SELECTED", value: this.state.obj }
            this.props.dispatch(action)
        })

    }

    renderList() {
        const { vehicules_visibles_actuelement } = this.state
        return (<table className=" table" id="table-to-xls" >
            <thead>
                <tr>
                <th className="sticky-col first-col">Immatriculation</th>

                    <th className="sticky-col second-col">Affecté a</th>

                    <th className="sticky-col third-col">Type</th>
                    <th className="sticky-col thour-col">Acquisition</th>
                    <th>Marque</th>
                    <th>Modèle</th>
                    <th>Couleur</th>
                    <th>Détenteur</th>
                    <th>Chauffeur</th>
                    <th>Catégorie</th>
                    <th>Acquis le</th>
                    <th>N° de carte grise</th>
                    <th>Kms compteur</th>
                    <th>Nb CV</th>
                    <th>Energie</th>
                    <th>N° de série</th>
                    <th>N° de moteur</th>
                    <th>N° contrat assurance</th>
                    <th>Assureur</th>
                    <th>Prime assurance</th>
                    <th>Franchise</th>


                </tr>
            </thead>
            <tbody>

                {vehicules_visibles_actuelement.map((item, index) =>
                    <VehiculeItem
                        index={index}
                        key={item.id}
                        onEdit={this.onEdit}
                        onDelete={this.onDelete}
                        onSelect={this.onSelect}
                        obj={this.state.obj}
                        item={item} />
                )}
            </tbody>
        </table>)
    }



    render() {
        // console.log(Array.isArray(this.props.vehicule))
        // console.log(this.props.vehiculeSeleted)

        // const etat = this.props.utilisations.length ? groupBy(this.props.utilisations, 'utilisateur_id') : null
        // const  etat2 = etat != null ? groupBy(etat, 'vehicule_id') : null
        // if(etat != null){
        //     etat.forEach(currentItem => {
        //         console.log(groupBy(currentItem, 'vehicule_id'))

        //     });

        // }
        return (
            <div className="app-main__inner">
                <div className="row">
                    <div className={this.props.vehicules.length ? 'col-lg-8' : 'col-lg-12'}>
                        <div className="main-card mb-3 card" style={{width: '1000px'}}>

                            <div className="card-body" >
                                <h5 className="card-title">Gestion des véhicules <span >{ `: ${this.state.vehicules_visibles_actuelement.length} Véhicule${this.state.vehicules_visibles_actuelement.length == 0 || this.state.vehicules_visibles_actuelement.length == 1 ? '' : 's'}`}</span>



                                    <span className="pull-right">



                                        {this.state.vehicules_visibles_actuelement.length ?
                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="table-to-xls"
                                                filename="Liste des véhicules"
                                                sheet="Véhicules"
                                                buttonText="Ecran -> Liste" /> : <button disabled className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                Ecran -> Liste
                                                </button>}



                                    </span> {'  '}
                             

                                    {this.props.vehiculeSeleted ? <MatriculeInput vehicule={this.props.vehiculeSeleted} text_attente="Aucune sélection" /> : null}

                                </h5>
                                <br />
                                {this.props.vehicules.length > 2 ?

                                <div className="row">
                                    <div className="col-md-3"></div>
                                    <div className="col-md-6">
                                    
                                  <input
                                     ref={search => this.search = search}
                                  onChange={this.searchChange}
                                 type="text"  className="form-control pull-right" placeholder="Rechercher par Immatriculation" />
               
                                    </div>
                                    <div className="col-md-3"></div>
                                </div>
                                : null}
                                <br />
                              
                                <div className="view">
                                    <div className="wrapper" style={{height: '500px', overflowY: 'scroll'}}>
                                    {this.props.loading ? this.renderLoading() : 
                            !this.state.vehicules_visibles_actuelement.length ? this.renderEmpty() : this.renderList()}  
                                    </div>
                                </div>

                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                <Container>
                    <Button
                        tooltip="Ajouter un Véhicule"
                        icon="fas fa-plus"
                        // rotate={true}
                        styles={{ backgroundColor: 'green', color: 'white', cursor: 'pointer' }}

                        onClick={() => this.props.history.push('/gestion_du_parc_automobile/creation-de-vehicule')}
                    />
                </Container>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehicules: state.vehicules.items,
        utilisations: state.utilisations.items,

        loading: state.vehicules.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
}

export default connect(mapStateToProps)(Vehicules)
//export default TypeEntite

