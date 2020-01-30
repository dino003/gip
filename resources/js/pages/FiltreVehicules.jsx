import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Select from 'react-select';


import '../components/table.css'
import VehiculeFiltreItem from '../components/vehicules/VehiculeFiltreItem'



class FiltreVehicules extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicules_visibles_actuelement: this.props.vehicules,
            obj: undefined,
            marque: null,
            entite_physique: null,
            tiers: null,
            mode_acquisition: "Tous",
            type_vehicule_statut: "Tous",
            modele: null,
            date_entree_au_parc1: null,
            date_entree_au_parc2: null,
            entite_comptable: null,
            assureur: null,
            contrat_assurance: null

        }

        this.searchChange = this.searchChange.bind(this)
        this.changeState = this.changeState.bind(this)
        this.filtrerVehicule = this.filtrerVehicule.bind(this)
    }

    // componentWillUnmount(){
    //     const action = {type: "ADD_CODE_INCIDENT", value: response.this.state}
    //     this.props.dispatch(action)    }

    setFieldSelect(name, value) {
     
        let obj = {};
        obj[name] = value;
        this.setState(obj, () => this.filtrerVehicule());
    }

    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.filtrerVehicule());
    }

    searchChange(search) {

        let vehicules_visibles_maintenant = this.props.vehicules.filter(vehicule => vehicule.immatriculation.includes(search.toLowerCase()))
        this.setState({
            vehicules_visibles_actuelement: vehicules_visibles_maintenant
        })
    }

    changeState() {
        this.setState({
            vehicules_visibles_actuelement: this.props.vehicules

        })
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

    filtrerVehicule(){
        
        var debut = this.state.date_entree_au_parc1 ? Date.parse(this.state.date_entree_au_parc1) : null
        var fin = this.state.date_entree_au_parc2 ? Date.parse(this.state.date_entree_au_parc2) : null

        const resultats = this.props.vehicules.filter(ut => {
            let date_entreeParc = Date.parse(ut.date_entree_au_parc)
            return (this.state.type_vehicule_statut != "Tous" ? ut.type_vehicule_statut == this.state.type_vehicule_statut : ut.type_vehicule_statut == "Service" || ut.type_vehicule_statut == "Fonction" || ut.type_vehicule_statut == "Flotte")
                &&
                (this.state.mode_acquisition != "Tous" ? ut.mode_acquisition == this.state.mode_acquisition : ut.mode_acquisition == "0" || ut.mode_acquisition == "1" || ut.mode_acquisition == "2" || ut.mode_acquisition == "4" || ut.mode_acquisition == "5")
                &&
                (debut && fin ? debut <= date_entreeParc && date_entreeParc <= fin : true)
                &&
                (this.state.marque ? ut.marque.id == this.state.marque.id : true)
                &&
                (this.state.tiers ? ut.tiers.id == this.state.tiers.id : true)
                &&
                (this.state.assureur ? ut.contrat_assurance ? ut.contrat_assurance.compagnie_assurance.id == this.state.assureur.id : true : true)
                &&
                (this.state.entite_physique ? ut.entite_physique ? ut.entite_physique.id == this.state.entite_physique.id : true : true)
                &&
                (this.state.contrat_assurance ? ut.contrat_assurance ? ut.contrat_assurance.id == this.state.contrat_assurance.id : true : true)
                &&
                (this.state.entite_comptable ? ut.entite_comptable ? ut.entite_comptable.id == this.state.entite_comptable.id : true : true)
                &&
                (this.state.modele ? ut.modele.toLowerCase().includes(this.state.modele.toLowerCase()) : true)
        }

        )

        this.setState({
            vehicules_visibles_actuelement: resultats
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

                {vehicules_visibles_actuelement.map((item) =>
                    <VehiculeFiltreItem
                        key={item.id}
                       
                        item={item} />
                )}
            </tbody>
        </table>)
    }



    render() {
  
        return (
            <div className="app-main__inner">
                <div className="row">
                    <div className={this.props.vehicules.length ? 'col-lg-8' : 'col-lg-12'}>
                        <div className="main-card mb-3 card" style={{width: '1000px'}}>

                            <div className="card-body" >
                                <h5 className="card-title">Application de filtres <span >{this.state.vehicules_visibles_actuelement.length ? `: ${this.state.vehicules_visibles_actuelement.length} Véhicules` : null}</span>



                                    <span className="pull-right">



                                        {this.state.vehicules_visibles_actuelement.length ?
                                            <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="table-to-xls"
                                                filename="Liste des véhicules"
                                                sheet="Véhicules"
                                                buttonText="Ecran -> Liste" /> : null}



                                    </span> {'  '}
                             


                                </h5>
                                <br />
                                <div className="row">
                                    <div className="col-md-3">
                                    <label htmlFor="">Marque</label>

                                        <Select
                                                name="marque"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Marque pour l'instat"}
                                                options={this.props.marques}
                                                getOptionLabel={option => option.nom_marque}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "marque")}
                                            />
                                    </div>

                                    <div className="col-md-4">
                                    <label htmlFor="">Entité physique</label>

                                        <Select
                                                name="entite_physique"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Entité pour l'instat"}
                                                options={this.props.entites}
                                                getOptionLabel={option => option.entite}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "entite_physique")}
                                            />
                                    </div>

                                    <div className="col-md-5">
                                        <label htmlFor="">Tiers d'acquisition</label>
                                        <Select
                                                name="tiers"
                                                isClearable
                                                placeholder="Selectionnez"
                                                noOptionsMessage={() => "Aucune Tiers pour l'instat"}
                                                options={this.props.tiers}
                                                getOptionLabel={option => `${option.code}--${option.nom}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "tiers")}
                                            />
                                    </div>
                                   
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-4">
                                    <label htmlFor="">Type d'acquisition</label>

                                    <select name="mode_acquisition" onChange={this.setField} id="" className="form-control">
                                        <option value="Tous">Tous</option>
                                        <option value="0">Achat</option>
                                        <option value="1">Leasing</option>
                                        <option value="2">Prêt</option>

                                    </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="">Modèle</label>
                                        <input type="text" name="modele" onChange={this.setField} className="form-control"/>
                                    </div>

                                    <div className="col-md-4">
                                    <label htmlFor="">Type de Véhicule</label>

                                    <select name="type_vehicule_statut" id="" onChange={this.setField} className="form-control">
                                        <option value="Tous">Tous</option>
                                        <option value="Service">Service</option>
                                        <option value="Fonction">Fonction</option>
                                        <option value="Flotte">Flotte</option>

                                    </select>
                                    </div>
                                </div>
                                <br />

                                <div className="row">
                                    <div className="col-md-5">
                                    <label htmlFor="">Assureur</label>

                                        <Select
                                                name="assureur"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Tiers pour l'instat"}
                                                options={this.props.tiers}
                                                getOptionLabel={option => `${option.code}--${option.nom}`}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "assureur")}
                                            />
                                    </div>

                                    <div className="col-md-4">
                                    <label htmlFor="">Contrat d'Assurance</label>

                                        <Select
                                                name="contrat_assurance"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Entité pour l'instat"}
                                                options={this.props.contrat_assurances}
                                                getOptionLabel={option => option.numero_contrat_police}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "contrat_assurance")}
                                            />
                                    </div>

                                    <div className="col-md-4">
                                    <label htmlFor="">Entité D'affectation Comptable</label>

                                        <Select
                                                name="entite_comptable"
                                                isClearable
                                                placeholder="Selectionnez"

                                                noOptionsMessage={() => "Aucune Entité pour l'instat"}
                                                options={this.props.entites}
                                                getOptionLabel={option => option.entite}
                                                getOptionValue={option => option.id}
                                                // formatOptionLabel={formatOptionVehicule}
                                                onChange={this.setFieldSelect.bind(this, "entite_comptable")}
                                            />
                                    </div>
                                   
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-5">
                                        <label htmlFor="">Date d'entrée au parc comprise entre :</label>
                                    </div>

                                    <div className="col-md-3">
                                        <input type="date" onChange={this.setField} className="form-control" name="date_entree_au_parc1" id=""/>
                                    </div>
                                        <div className="col-md-1">
                                            <label htmlFor="">ET</label>
                                        </div>
                                    <div className="col-md-3">
                                        <input type="date" onChange={this.setField} className="form-control" name="date_entree_au_parc2" id=""/>
                                    </div>
                                </div>
                             
                                <br />
                                {/* <div className="table-responsive"> */}
                                {/* {this.props.loading ? this.renderLoading() : 
                            !this.props.vehicules.length ? this.renderEmpty() : this.renderList()} */}
                                <div className="view">
                                    <div className="wrapper">
                                    {this.props.loading ? this.renderLoading() : 
                            !this.props.vehicules.length ? this.renderEmpty() : this.renderList()}  
                                    </div>
                                </div>

                                {/* </div> */}
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
        vehicules: state.vehicules.items,
        contrat_assurances: state.contrat_assurances.items,
        marques: state.marques.items,
        tiers: state.tiers.items,
        entites: state.entites.items,
        loading: state.vehicules.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
}

export default connect(mapStateToProps)(FiltreVehicules)

