import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import AnneeBudgetaireItem from '../../components/codifications/AnneeBudgetaireItem'

  class AnneeBudgetaires extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            annee_budgetaire: '',
        //     annees_budgetaires: [
        //         'Siege',
        //         'Ditrection'
        
        //    ],
            selection: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onEditSubmit = this.onEditSubmit.bind(this)
        
    }

  



    onDelete = (id) => {
     
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_ANNEE_BUDGETAIRE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('api/supprimer_annee_budgetaire/' + id)
        }
       
    }

    onEditSubmit(newValue, id){
        axios.post('api/modifier_annee_budgetaire/' + id, {
            annee_budgetaire: newValue
        }).then(response => {
            const action = {type: "EDIT_ANNEE_BUDGETAIRE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange(e){
        this.setState({
            annee_budgetaire: e.target.value
        })
    }

  

  async handleSubmit(e){
        e.preventDefault();

      const response =  await axios.post('api/ajouter_annee_budgetaire', {
            annee_budgetaire: this.state.annee_budgetaire
        })

       // console.log(response.data)


       // alert(this.state.annee_budgetaire)
       const action = {type: "ADD_ANNEE_BUDGETAIRE", value: response.data}
       this.props.dispatch(action)
       this.setState({annee_budgetaire: ''})
       
    //    this.setState(state => {
    //         const annees_budgetaires = [state.annee_budgetaire, ...state.annees_budgetaires];
    //         return {
    //             annees_budgetaires,
    //             annee_budgetaire: ''
    //         }
    //     })

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

    onChangeEnCours = (id) => {
        const action = { type: "EDIT_ENCOURS", value: id }
        this.props.dispatch(action)
    }
    
    

    render() {
        // console.log(Array.isArray(this.props.annees_budgetaires))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des années budgétaires
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter une année budgétaire"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={this.toggleVisibleInput}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>) : (
                                                           <button title=" Ajouter une année budgétaire"
                                                           className="mb-2 mr-2 btn-transition btn btn-outline-warning"
                                                           onClick={this.toggleVisibleInput}
                                                           >
                                                           <i className="fa fa-times"></i> {' '}
                          
                                                               Annuler
                                                                  </button>
                                             )}
                                
                              
                                                {!this.state.inputOpen ? null
                                                                        
                                                 : (
                                                    <span>
                                                   
                                                    { this.state.annee_budgetaire.length == 4 ? (
                                                         <button onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                             <i className="fa fa-send"></i> {' '}

                                                         Enregistrer
                                                     </button>
                                                    ) : null}
                                                    </span>
                                                )}
                                </span>
                                {this.state.inputOpen ? (
                                     <input value={this.state.annee_budgetaire} 
                                     onChange={this.handleChange}
                                     style={{width: '40%'}} name="annee_budgetaire"
                                      placeholder=""
                                     type="number" className="form-control pull-right" />
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                                {!this.props.loading ? (
                                           <table className="mb-0 table" >
                                           <thead>
                                           <tr>
                                               <th>Années </th>
                                               <th>Année en cours</th>

                                           </tr>
                                           </thead>
                                           <tbody>
                                             
                                        { this.props.annees_budgetaires.map((item, index) => 
                                            <AnneeBudgetaireItem
                                            index={index}
                                             key={item.id} 
                                             onEditItem={this.onEditSubmit}              
                                             onDelete={this.onDelete}
                                             onChangeEnCours={this.onChangeEnCours}
                                            item={item} />
                                       )  }         
                                           </tbody>
                                       </table>
                                ) : (
                                    <span style={{textAlign: 'center'}}>

                                    <Loader
                                        type="BallTriangle"
                                        color="#00BFFF"
                                        height={100}
                                        width={100}
                                     />
                                     </span>
                                )}

                             
                           </div>
                       </div>
                   </div>

          
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        annees_budgetaires: state.annees_budgetaires.items,
        loading: state.annees_budgetaires.loading,

    }
  }

export default connect(mapStateToProps)(AnneeBudgetaires)
//export default TypeEntite

