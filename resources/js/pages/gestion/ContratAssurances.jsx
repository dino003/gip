import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import ContratAssuranceItem from '../../components/gestion/ContratAssuranceItem';

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../../components/table.css'




  class ContratAssurances extends Component {

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

        onContratdefaut = (id) => {
            this.setState({isDefautDeclench: !this.state.isDefautDeclench})
           axios.get('/api/modifier_contrat_assurance_defaut/' + id).then(response => {
               const action = {type: "GET_CONTRAT_ASSURANCE", value: response.data}
               this.props.dispatch(action) 
            this.setState({isDefautDeclench: !this.state.isDefautDeclench})
    
           })
       }

     

    onEdit = (id) => {
        this.props.history.push('/gestion_du_parc_automobile/modification-contrat-assurance/' + id)
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
        return (  <table className="mb-0 table" id="export">
        <thead>
        <tr>
        <th className="sticky-col first-col">Numero de contrat</th>
        <th className="sticky-col second-col">Compagnie</th>
        <th className="sticky-col third-col">Début</th>

        <th className="sticky-col thour-col">Fin</th>
        <th>Date Contrat</th>
            <th>Effet</th>
        <th >Véhicule</th>

            <th>Défaut</th>
            
            
            <th>Global ?</th>
        </tr>
        </thead>
        <tbody>
          
     { this.props.contrat_assurances.map((item, index) => 
         <ContratAssuranceItem
         index={index}
          key={item.id} 
          onEdit={this.onEdit}              
          onDelete={this.onDelete}
          onContratdefaut={this.onContratdefaut}
          isDefautDeclench={this.state.isDefautDeclench}

         item={item} />
    )  }         
        </tbody>
    </table>)
    }
    
    

    render() {
       // console.log(vehiculeselect)
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des Contrats d'assurance
                          
                            <span className="pull-right">
                        
                            {/* <button title=" Ajouter une nouvelle ligne de budget"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/creation-contrat-assurance`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button> */}
                                             {this.props.contrat_assurances.length ?
                                             <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des contrats"
                                                sheet="feuille1"
                                                buttonText="Ecran -> Liste"/> : null }
                                </span>
                             
                                
                                            
                                
                            </h5>
                            <br />
                            <div className="view">
                                  <div className="wrapper">
                                  {this.props.loading ? this.renderLoading() : 
                            !this.props.contrat_assurances.length ? this.renderEmpty() : this.renderList()}

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

                        onClick={() => this.props.history.push(`/gestion_du_parc_automobile/creation-contrat-assurance`)}
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
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(ContratAssurances)
//export default TypeEntite

