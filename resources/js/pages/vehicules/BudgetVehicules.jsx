import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import MatriculeInput from '../../components/MatriculeInput';
import BudgetVehiculeItem from '../../components/vehicules/BudgetVehiculeItem';


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
            type="BallTriangle"
            color="#00BFFF"
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
        const budgetVehicules = this.props.budgetVehicules.filter(inter => inter.vehicule.id == this.props.match.params.vehicule_id)
        return (  <table className="mb-0 table" >
        <thead>
        <tr>
            <th>Année</th>
            <th>Véhicule</th>
            <th>Site</th>
            <th>Imputation</th>
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
                        
                            <button title=" Ajouter une nouvelle ligne de budget"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-budget-vehicules/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                                </span>
                                }
                             
                                
                                {this.props.vehicules.length && 
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/>
                            }                                               
                                
                            </h5>
                           <div className="table-responsive">
                           {!this.props.vehicules.length ? this.renderLoading() : 
                            !budgetVehicules.length ? this.renderEmpty() : this.renderList()}


                             
                           </div>
                       </div>
                   </div>

          
                
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

