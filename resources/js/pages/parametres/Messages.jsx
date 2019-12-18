import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import ContratAssuranceItem from '../../components/gestion/ContratAssuranceItem';


  class Messages extends Component {

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

                const action = {type: "REMOVE_CONTRAT_ASSURANCE", value: id}
                this.props.dispatch(action)
                axios.delete('/api/supprimer_contrat_assurance/' + id)
                
            }
           
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
        return (  <table className="mb-0 table" >
        <thead>
        <tr>
            <th>Code</th>
            <th>Libéllé Objet</th>
            <th>Origine</th>
            <th>Inactif</th>
            <th>Maj</th>

        </tr>
        </thead>
        <tbody>
          
     { this.props.contrat_assurances.map((item, index) => 
         <ContratAssuranceItem
         index={index}
          key={item.id} 
          onEdit={this.onEdit}              
          onDelete={this.onDelete}
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
                           <h5 className="card-title">Gestion des Messages
                          
                            <span className="pull-right">
                        
                            <button title=" Ajouter une nouvelle ligne de budget"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/creation-contrat-assurance`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                                </span>
                             
                                
                                            
                                
                            </h5>
                           <div className="table-responsive">
                           {this.props.loading ? this.renderLoading() : 
                            !this.props.contrat_assurances.length ? this.renderEmpty() : this.renderList()}


                             
                           </div>
                       </div>
                   </div>

          
                
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

export default connect(mapStateToProps)(Messages)
//export default TypeEntite

