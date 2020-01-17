import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import MatriculeInput from '../../components/MatriculeInput';
import AmendeItem from '../../components/vehicules/AmendeItem';

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


  class Amendes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
           
            amendes: [],
            loading: false,
        }   
    }

    // componentDidMount(){
    //     this.setState({
    //         amendes: this.props.amendes.filter(inter => inter.vehicule.id == this.props.vehiculeSeleted.id),
    //         //loading: false
    //      })
    
    //      if(this.props.vehiculeSeleted == undefined){
    //       const action = {type: "EDIT_SELECTED", value: this.props.location.state.veh}
    //       this.props.dispatch(action)
    
    //      }
    
    //     }
    
    
        onDelete = (id) => {
    
            let conf = confirm('Voulez-vous vraiment supprimer ?')
            if(conf === true){

                const action = {type: "REMOVE_AMENDE", value: id}
                this.props.dispatch(action)
                axios.delete('/api/supprimer_vehicule_amende/' + id)
                
            }
           
        }

     

    onEdit = (id) => {
        const vehic = this.props.vehiculeSeleted
        this.props.history.push('/gestion_du_parc_automobile/parc/modification-amendes-vehicules/' + vehic.id + '/' + vehic.immatriculation + '/amende/' + id)
    }

    handleChange = (e) =>{
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
        const amendes = this.props.amendes.filter(inter => inter.vehicule.id == this.props.match.params.vehicule_id)
        return (  <table className="mb-0 table" id="export" >
        <thead>
        <tr>
            <th className="sticky-col first-col">Véhicule</th>
            <th className="sticky-col second-col">Date</th>
            <th className="sticky-col third-col">Heure</th>
            <th className="sticky-col thour-col">Nature</th>

            <th >Réception</th>
            <th>Conducteur</th>
            <th>Lieu</th>
            <th>Réglée par</th>
            <th>Montant</th>
            <th>Fourière ?</th>
            <th>Montant fourière ?</th>



        </tr>
        </thead>
        <tbody>
          
     { amendes.map((item, index) => 
         <AmendeItem
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
        if(this.props.vehiculeSeleted == undefined && this.props.vehicules.length ){
        const action = {type: "EDIT_SELECTED", value:  this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}
          this.props.dispatch(action)
        }
        const vehiculeselect = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
        const amendes = this.props.amendes.filter(inter => inter.vehicule.id == this.props.match.params.vehicule_id)

        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des Amendes 
                          {vehiculeselect &&
                            <span className="pull-right">
                        
                            {/* <button title=" Ajouter une nouvelle intervention"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-amendes-vehicules/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button> */}


                                             { this.props.amendes.filter(inter => inter.vehicule.id == this.props.match.params.vehicule_id).length ?
                                             <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des Amendes véhicules"
                                                sheet="feuille1"
                                                buttonText="Ecran -> Liste"/> : null }
                                </span>
                                }
                             
                                
  
                                {this.props.vehicules.length && 
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/>
                            }                                              
                                
                            </h5>
                            <br />
                         
                           <div className="view">
                                    <div className="wrapper">
                                    {!this.props.vehicules.length ? this.renderLoading() : 
                            !amendes.length ? this.renderEmpty() : this.renderList()}
                                    </div>
                                </div>
                           
                       </div>
                   </div>

                   <Container>
                        <Button
                        tooltip="Ajouter une Amende"
                        icon="fas fa-plus"
                    // rotate={true}
                        styles={{backgroundColor: 'green', color: 'white', cursor: 'pointer'}}

                        onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-amendes-vehicules/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                        />
                </Container>
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        amendes: state.amendes.items,
        vehicules: state.vehicules.items,

        loading: state.amendes.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(Amendes)
//export default TypeEntite

