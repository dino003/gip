import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import MissionItem from '../../components/gestion/MissionItem';


import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../../components/table.css'

  class Missions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
           
            loading: false,
        }   
    }

        
        onDelete = (id) => {
    
            let conf = confirm('Voulez-vous vraiment supprimer ?')
            if(conf === true){

                const action = {type: "REMOVE_MISSION", value: id}
                this.props.dispatch(action)
                axios.delete('/api/supprimer_ordre_mission/' + id)
                
            }
           
        }

     

    onEdit = (id) => {
        this.props.history.push('/gestion_du_parc_automobile/modification-ordre-de-mission/' + id)
    }

    onReservation = (item) => {
        if(item.vehicule_id == null){
            alert(`Cet Ordre de Mission N° ${item.numero_ordre_mission} \n n'est pas lié à un véhicule pour la réservation; \n Sélectionnez un véhicule à réserver pour cet ordre de mission pour ensuite passer a la création d'une réservation. `)
        }else{
            this.props.history.push('/gestion_du_parc_automobile/parc/creation-reservation-vehicules-via-ordre-mission/' + item.vehicule_id + '/' + item.vehicule.immatriculation + '/' + item.id )
  
        }
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
        return (  <table className="mb-0 table" id="export" style={{width: '100%'}} >
        <thead>
        <tr>
            <th className="sticky-col first-col">Numero</th>
            <th className="sticky-col second-col">Date</th>
            <th className="sticky-col third-col">Heure</th>
            <th className="sticky-col thour-col">Demandeur</th>
            <th>Etat</th>
            <th>Urgence</th>
            <th>Décideur</th>
            <th>Signataire</th>
            <th>Bénéficiaire</th>
            <th>Nature mission</th>
            <th>Moyen de transport</th>
            <th>Mision</th>
            <th >Reser.</th>

        </tr>
        </thead>
        <tbody>
          
     { this.props.missions.map((item, index) => 
         <MissionItem
         index={index}
          key={item.id} 
          onEdit={this.onEdit}              
          onDelete={this.onDelete}
          onReservation={this.onReservation}
         item={item} />
    )  }         
        </tbody>
    </table>)
    }
    
    

    render() {
       // console.log(vehiculeselect)
        return (
            <div className="app-main__inner">
           <div className="row">
           <div className={!this.props.missions == undefined ? 'col-lg-12' : 'col-lg-11'}>

           <div className="main-card mb-3 card" style={{width: '1000px'}}>
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des Ordres de missions
                          
                            <span className="pull-right">
                        
                            {/* <button title=" Ajouter une nouvelle ligne de budget"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/ajouter-des-ordres-de-missions`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button> */}

                                             {this.props.missions.length ?
                                             <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des Ordres de Missions"
                                                sheet="feuille1"
                                                buttonText="Ecran -> Liste"/> : null }
                                </span>
                             
                                
                                            
                                
                            </h5>

                            <br />
                         
                         <div className="view">
                                  <div className="wrapper">
                                  {this.props.loading ? this.renderLoading() : 
                            !this.props.missions.length ? this.renderEmpty() : this.renderList()}
                                  </div>
                              </div>
                         
                       </div>
                   </div>
                   </div>
           </div>

          
           <Container>
                        <Button
                        tooltip="Ajouter un Ordre de mission"
                        icon="fas fa-plus"
                    // rotate={true}
                        styles={{backgroundColor: 'green', color: 'white', cursor: 'pointer'}}

                        onClick={() => this.props.history.push(`/gestion_du_parc_automobile/ajouter-des-ordres-de-missions`)}
                        />
                </Container>
                
       </div>
        )
        

        
    }
}

const mapStateToProps = state => {
    return {
        missions: state.missions.items,
        loading: state.missions.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(Missions)
//export default TypeEntite

