import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import PersonnelItem from '../../../components/parametres/PersonnelItem'
//import {getEntites} from '../../reducers/EntitesReducer'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import TableHeader from '../../../components/TableHeader'

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FileUpload from '../../../components/FileUpload'

import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 class Personnels extends Component {

    constructor(props) {
        super(props);

        this.state = {
           // loading: true,
            isSearchInputVisible : false,
            personnelState: this.props.personnels
        }

        this.onErrorUpload = this.onErrorUpload.bind(this);
        this.onSuccesUpload = this.onSuccesUpload.bind(this);
        
    }

    componentDidMount(){
        
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
        return (    <table className="mb-0 table" id="export">
        <thead>
        <tr>
            <th>Nom</th>
            <th>Prenoms</th>
            <th>Matricule</th>
            <th>Entité</th>
            <th>Telephonne</th>
            <th>Téléphonne portable</th>
           
          

        </tr>
        </thead>
        <tbody>
         {this.props.personnels.map((personnel, index) =>  
         <PersonnelItem 
         key={personnel.id} 
         index={index}
         onDelete={this.onDelete}
         onEdit={this.onEdit}
         item={personnel} />
        )}
      
        </tbody>
    </table>)
    }

    onDelete = (id) => {
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_PERSONNEL", value: id}
            this.props.dispatch(action)
            const itemIndex = this.state.personnelState.findIndex(item => item.id === id)

            this.setState({personnelState: this.state.personnelState.filter((item, index) => index !== itemIndex)})
            axios.delete('api/supprimer_personnel/' + id)
        }
       
    }

    onEdit = (id) => {
    //     var entites = this.props.entites
    //    // var str entites[index],uc = structures[index]


    //     this.setState({
    //         objetModif:
    //         editIndex: index
    //     }, () => this.passEdit())

        
        this.props.history.push('/gestion_du_parc_automobile/gestion_du_personnel/' + id)

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
                       <h5 className="card-title">Gestion du Personnel
                          
                          <span className="pull-right">
                      
                          {/* <button title=" Ajouter une nouvelle ligne de budget"
                                    className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                    onClick={() => this.props.history.push(`/gestion_du_parc_automobile/creation-contrat-assurance`)}
                                    >
                                    <i className="fa fa-plus"></i> {' '}
   
                                        Ajouter
                                           </button> */}
                                            <FileUpload
                                             onRef={ref => (this.child = ref)}
                                             onErrorUpload={this.onErrorUpload}
                                             onSuccesUpload={this.onSuccesUpload}
                                              />

                                           {this.props.personnels.length ?
                                           <ReactHTMLTableToExcel
                                              id="test-table-xls-button"
                                              className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                              table="export"
                                              filename="Liste du personnel"
                                              sheet="feuille1"
                                              buttonText="Ecran -> Liste"/> : null }
                              </span>
                           
                              
                                          
                              
                          </h5>
                           {/* <TableHeader
                           isSearchInputVisible={isSearchInputVisible}
                           link="/gestion_du_parc_automobile/ajouter_personnel"
                           searchChange={this.searchChange}
                           titre="Gestion du personnel"
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
                            !this.props.personnels.length ? this.renderEmpty() : this.renderList()}

                           </div>
                       </div>
                   </div>
                
                   {/* <Container>
                        <Button
                        tooltip="Ajouter une personne"
                        icon="fas fa-plus"
                    // rotate={true}
                        styles={{backgroundColor: 'green', color: 'white', cursor: 'pointer'}}

                        onClick={() => this.props.history.push(`/gestion_du_parc_automobile/ajouter_personnel`)}
                        />
                </Container> */}

                <Container>
           
                <Button
                tooltip="Importer un fichier du personnel"
                icon="fas fa-download"
               // rotate={true}
               styles={{ cursor: 'pointer'}}

                onClick={() => this.onClick()} />

                <Button
                tooltip="Ajouter une personne!"
                icon="fas fa-plus"
               // rotate={true}
               styles={{ cursor: 'pointer'}}

               onClick={() => this.props.history.push(`/gestion_du_parc_automobile/ajouter_personnel`)}
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


       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        personnels: state.personnels.items,
        loading: state.personnels.loading,

    }
  }

export default connect(mapStateToProps)(Personnels)
