import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import BudgetEntiteItem from '../../components/vehicules/BudgetEntiteItem';

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import '../../components/table.css'



  class BudgetEntites extends Component {

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

                const action = {type: "REMOVE_BUDGET_ENTITE", value: id}
                this.props.dispatch(action)
                axios.delete('/api/supprimer_budget_entite/' + id)
                
            }
           
        }

     

    onEdit = (id) => {
        const vehic = this.props.vehiculeSeleted
        this.props.history.push('/gestion_du_parc_automobile/parc/modification-budget-entites/' + id)
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
        return (  <table className="mb-0 table" id="export" >
        <thead>
        <tr>
            <th className="sticky-col first-col">Année</th>
            <th className="sticky-col second-col">Entité</th>
            <th className="sticky-col third-col">Imputation</th>
            <th className="sticky-col thour-col">Nature </th>
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
          
     { this.props.budget_entites.map((item, index) => 
         <BudgetEntiteItem
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
                <div className="row">
                <div className="col-lg-10">
                <div className="main-card mb-3 card" style={{width: '1000px'}}>
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des budgets des entités
                          
                            <span className="pull-right">
                        
                            {/* <button title=" Ajouter une nouvelle ligne de budget"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-budget-entites`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button> */}
                                            { this.props.budget_entites.length ?
                                             <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des budgets des entités"
                                                sheet="feuille1"
                                                buttonText="Ecran -> Liste"/> : null }
                                </span>
                             
                                
                                            
                                
                            </h5>
                            <br />
                         
                         <div className="view">
                         <div className="wrapper" style={{height: '500px', overflowY: 'scroll'}}>
                                  {this.props.loading ? this.renderLoading() : 
                            !this.props.budget_entites.length ? this.renderEmpty() : this.renderList()}
                                  </div>
                              </div>
                          
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

                        onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-budget-entites`)}
                        />
                </Container>
          
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        budget_entites: state.budget_entites.items,
        loading: state.budget_entites.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(BudgetEntites)
//export default TypeEntite

