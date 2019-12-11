import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import MissionItem from '../../components/gestion/MissionItem';




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
        return (  <table className="mb-0 table" style={{width: '100%'}} >
        <thead>
        <tr>
            <th colSpan="2">Numero</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Demandeur</th>
            <th>Etat</th>
            <th>Urgence</th>
            <th>Décideur</th>
            <th>Signataire</th>
            <th>Bénéficiaire</th>
            <th>Nature mission</th>
            <th>Moyen de transport</th>
            <th>Mision</th>
            <th colSpan="2">Actions</th>

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

           <div className="main-card mb-3 card">
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des Ordres de missions
                          
                            <span className="pull-right">
                        
                            <button title=" Ajouter une nouvelle ligne de budget"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/ajouter-des-ordres-de-missions`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                                </span>
                             
                                
                                            
                                
                            </h5>
                           <div className="table-responsive">
                           {this.props.loading ? this.renderLoading() : 
                            !this.props.missions.length ? this.renderEmpty() : this.renderList()}

                             
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
        missions: state.missions.items,
        loading: state.missions.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(Missions)
//export default TypeEntite

