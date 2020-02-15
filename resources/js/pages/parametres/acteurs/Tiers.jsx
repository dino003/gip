import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import TierItem from '../../../components/parametres/TierItem'
//import {getEntites} from '../../reducers/EntitesReducer'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import TableHeader from '../../../components/TableHeader'

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TierFileUpload from '../../../components/TierFileUpload'


 class Tiers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            isSearchInputVisible : false,
            tiersState: this.props.entites,
            isDocumentationVisible: false
        }

        this.onErrorUpload = this.onErrorUpload.bind(this);
        this.onSuccesUpload = this.onSuccesUpload.bind(this);
        this.toggleDocumentation = this.toggleDocumentation.bind(this);

    }

    toggleDocumentation(){
        this.setState((prevState) => {
            return {isDocumentationVisible: !prevState.isDocumentationVisible}
        })
    }

    onErrorUpload(file){
        alert(`L'importation a échoué veuillez vérifier le fichier ${file.name}`)
    }

    onSuccesUpload(){
        toast.success('Importé avec succès', {
            position: toast.POSITION.BOTTOM_CENTER
          });
    }

    onClick = () => {
        this.child.method() // do stuff
      }



    toggleSearchInput = () => {
        this.setState({isSearchInputVisible: !this.state.isSearchInputVisible})
    }

    handleSearchInputChange = (event) => {

    }



    renderLoading(){
        return  <span style={{textAlign: 'center'}}>

        <Loader

            height={500}
            width={300}
         />
         </span>
    }

    renderEmpty(){
       return <span style={{textAlign: 'center', color: 'red'}}>
            Aucune donnée enregistrée !
        </span>
    }

    renderList(){
        return (    <table className="mb-0 table" id="export" >
        <thead>
        <tr>
            <th>Code</th>
            <th>Nom</th>
            <th>Métier principal</th>
            <th>Type </th>
            <th>Telephonne</th>
            <th>Fax</th>
            <th>Adresse</th>





        </tr>
        </thead>
        <tbody>
         {this.props.tiers.map((entite, index) =>
         <TierItem
         key={entite.id}
         index={index}
         onDelete={this.onDelete}
         onEdit={this.onEdit}
         item={entite} />
        )}

        </tbody>
    </table>)
    }

    onDelete = (id) => {
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){

            const action = {type: "REMOVE_TIER", value: id}
            this.props.dispatch(action)
            const itemIndex = this.state.tiersState.findIndex(item => item.id === id)

            this.setState({tiersState: this.state.tiersState.filter((item, index) => index !== itemIndex)})
            axios.delete('api/supprimer_tier/' + id)
        }

    }

    onEdit = (id) => {
    //     var entites = this.props.entites
    //    // var str entites[index],uc = structures[index]


    //     this.setState({
    //         objetModif:
    //         editIndex: index
    //     }, () => this.passEdit())


        this.props.history.push('/gestion_du_parc_automobile/gestion-des-tiers/' + id)

    }

    searchChange = search => {

        const ents =  this.state.tiersState.filter((user) => {
            return user.entite.toLowerCase().includes(search)
           || user.nom_entite.toLowerCase().includes(search)

          }
        )

        this.setState({tiersState: ents})

    }


    render() {
    const {isSearchInputVisible} = this.state
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                       <h5 className="card-title">Gestion des Tiers

                          <span className="pull-right">

                          {/* <button title=" Ajouter une nouvelle ligne de budget"
                                    className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                    onClick={() => this.props.history.push(`/gestion_du_parc_automobile/creation-contrat-assurance`)}
                                    >
                                    <i className="fa fa-plus"></i> {' '}

                                        Ajouter
                                           </button> */}

                                           <TierFileUpload
                                            onRef={ref => (this.child = ref)}
                                            onErrorUpload={this.onErrorUpload}
                                            onSuccesUpload={this.onSuccesUpload}
                                            />

                                           {this.props.tiers.length ?
                                           <ReactHTMLTableToExcel
                                              id="test-table-xls-button"
                                              className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                              table="export"
                                              filename="Liste des Tiers"
                                              sheet="feuille1"
                                              buttonText="Ecran -> Liste"/> : null }
                              </span>




                          </h5>
                           {/* <TableHeader
                           isSearchInputVisible={isSearchInputVisible}
                           link="/gestion_du_parc_automobile/ajouter-tiers"
                           searchChange={this.searchChange}
                           titre="Gestion des Tiers"
                           toggleSearchInput={this.toggleSearchInput}
                            isLink /> */}
                           {/*
                           <h5 className="card-title">Gestion des entités
                           <span className="pull-right">
                           <NavLink title=" Ajouter un nouvel acteur"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary pull-right"
                                      to="/ajouter-entite"
                                      >
                                      <i className="fa fa-plus"></i> {' '}

                                          Ajouter
                                             </NavLink>
                                            {isSearchInputVisible ?  <button title="Quitter le mode recherche"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right"
                                      onClick={this.toggleSearchInput}
                                      >
                                      <i className="fa fa-times"></i> {' '}

                                             </button> :  <button title="Rechercher"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-info pull-right"
                                      onClick={this.toggleSearchInput}
                                      >
                                      <i className="fa fa-search"></i> {' '}

                                             </button>}
                                             </span>
                                           {isSearchInputVisible &&
                            <input
                            ref={search => this.search = search}

                             style={{width: '40%'}} type="text" className="form-control pull-right" placeholder="Taper pour rechercher" />
                            }
                           </h5> */}
                           <div className="table-responsive">
                           {this.props.loading ? this.renderLoading() :
                            !this.props.tiers.length ? this.renderEmpty() : this.renderList()}

                           </div>
                       </div>
                   </div>



                <Container>

                <Button
           tooltip="Documentation Pour l'importation du fichier de tiers"
           icon="fas fa-file"
          // rotate={true}
          styles={{ cursor: 'pointer'}}

           onClick={() => this.toggleDocumentation()} />

           <Button
           tooltip="Importer un fichier de tiers"
           icon="fas fa-file-excel"
          // rotate={true}
          styles={{ cursor: 'pointer'}}

           onClick={() => this.onClick()} />

           <Button
           tooltip="Ajouter un Tiers!"
           icon="fas fa-plus"
          // rotate={true}
          styles={{ cursor: 'pointer'}}

          onClick={() => this.props.history.push(`/gestion_du_parc_automobile/ajouter-tiers`)}
          />
       <Button
          // tooltip="The big plus button!"
           icon="fas fa-arrow-up"
           styles={{backgroundColor: 'green', color: 'white', cursor: 'pointer'}}

          // rotate={true}
          // onClick={() => alert('FAB Rocks!')}
            />
   </Container>
             <ToastContainer autoClose={3000} />



            {/* documentation importation */}
                {this.state.isDocumentationVisible ? <div className={this.state.isDocumentationVisible ? "ui-theme-settings settings-open" : "ui-theme-settings"}>
            {this.state.isDocumentationVisible &&   <button type="button" onClick={this.toggleDocumentation}  className="btn-open-options btn btn-warning">
                <i className="fa fa-times fa-w-16 fa-spin fa-2x"></i>
            </button>}
            <div className="theme-settings__inner">
                <div className="scrollbar-container">
                    <div className="theme-settings__options-wrapper">
                        <h3 className="themeoptions-heading">Documentation
                        </h3>
                      <br />
                      <div className="card-shadow-primary border mb-3 card card-body border-primary">
                          <h5 className="card-title">DOCUMENTATION</h5>
                          Importation d'un fichier Excel d'extension .xlsx</div>
                                        <div className="card-shadow-secondary border mb-3 card card-body border-secondary">
                                            <h5 className="card-title">Formattage prescrit</h5>
                                            <span><em style={{color: 'red'}}>A</em> ==> CODE</span> <br />
                                            <span><em style={{color: 'red'}}>B</em> ==> NOM</span> <br />
                                            <span><em style={{color: 'red'}}>C</em> ==> METIER</span> <br />
                                            <span><em style={{color: 'red'}}>D</em> ==> ADRESSE</span> <br />
                                            <span><em style={{color: 'red'}}>E</em> ==> CODE POSTAL</span> <br />
                                            <span><em style={{color: 'red'}}>F</em> ==> TELEPHONNE</span> <br />
                                            <span><em style={{color: 'red'}}>G</em> ==> FAX</span> <br />
                                            <span><em style={{color: 'red'}}>H</em> ==> ADRESSE MESSAGERIE</span> <br />
                                            <span><em style={{color: 'red'}}>I</em> ==> PAYS</span> <br />
                                            <span><em style={{color: 'red'}}>J</em> ==> VILLE</span> <br />

                                            </div>

                    </div>
                </div>
            </div>
        </div> : null}

            {/* fin documentation */}


       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        tiers: state.tiers.items,
        loading: state.tiers.loading,

    }
  }

export default connect(mapStateToProps)(Tiers)
