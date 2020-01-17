import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import MatriculeInput from '../../components/MatriculeInput';
import BudgetVehiculeItem from '../../components/vehicules/BudgetVehiculeItem';

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


  class BudgetVehicules extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
           
            budgetVehicules: [],
            loading: false,
        }   
    }

    // componentDidMount(){
    //     this.setState({
    //         budgetVehicules: this.props.budgetVehicules.filter(inter => inter.vehicule.id == this.props.vehiculeSeleted.id),
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

                const action = {type: "REMOVE_BUDGET_VEHICULE", value: id}
                this.props.dispatch(action)
                axios.delete('/api/supprimer_vehicule_budget_vehicule/' + id)
                
            }
           
        }

     

    onEdit = (id) => {
        const vehic = this.props.vehiculeSeleted
        this.props.history.push('/gestion_du_parc_automobile/parc/modification-budget-vehicules/' + vehic.id + '/' + vehic.immatriculation + '/budget-vehicule/' + id)
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
        const budgetVehicules = this.props.budgetVehicules.filter(inter => inter.vehicule.id == this.props.match.params.vehicule_id)
        return (  <table className="mb-0 table" id="export">
        <thead>
        <tr>
            <th className="sticky-col first-col">Année</th>
            <th className="sticky-col second-col">Véhicule</th>
            <th className="sticky-col third-col">Site</th>
            <th className="sticky-col thour-col">Imputation</th>
            <th>Nature dépenses/recettes</th>
            <th>Dépenses-budget</th>
            <th>Dépense-réalisation</th>
            <th>Dépense-%</th>
            <th>Dépense-reste</th>

            <th>Recette-budget</th>
            <th>Recette-réalisation</th>
            <th>Recette-%</th>
            <th>Recette-reste</th>



        </tr>
        </thead>
        <tbody>
          
     { budgetVehicules.map((item, index) => 
         <BudgetVehiculeItem
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
        if(this.props.vehiculeSeleted == undefined && this.props.vehicules.length){
            const action = {type: "EDIT_SELECTED", value:  this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}
              this.props.dispatch(action)
            }
        const vehiculeselect = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
        const budgetVehicules = this.props.budgetVehicules.filter(inter => inter.vehicule.id == this.props.match.params.vehicule_id)

       // console.log(vehiculeselect)
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des budgets du vehicules 
                          {vehiculeselect &&
                            <span className="pull-right">
                        
                            {/* <button title=" Ajouter une nouvelle ligne de budget"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-budget-vehicules/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button> */}

                                             { this.props.budgetVehicules.filter(inter => inter.vehicule.id == this.props.match.params.vehicule_id).length ?
                                             <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des budgets des véhicules"
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
                            !budgetVehicules.length ? this.renderEmpty() : this.renderList()}
                                  </div>
                              </div>
                        
                           
                       </div>
                   </div>

                   <Container>
                        <Button
                        tooltip="Ajouter une ligne de budget"
                        icon="fas fa-plus"
                    // rotate={true}
                        styles={{backgroundColor: 'green', color: 'white', cursor: 'pointer'}}

                        onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-budget-vehicules/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                        />
                </Container>
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        budgetVehicules: state.budgetVehicules.items,
        vehicules: state.vehicules.items,

        loading: state.budgetVehicules.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(BudgetVehicules)
//export default TypeEntite

