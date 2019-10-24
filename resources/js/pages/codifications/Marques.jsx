import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import MarqueItem from '../../components/codifications/MarqueItem'

  class Marques extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            nom_marque: '',
        //     types_entites: [
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
        
            const action = {type: "REMOVE_MARQUE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('api/supprimer_marque/' + id)
        }
       
    }

    onEditSubmit(newValue, id){
        axios.post('api/modifier_marque/' + id, {
            nom_marque: newValue
        }).then(response => {
            const action = {type: "EDIT_MARQUE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange(e){
        this.setState({
            nom_marque: e.target.value
        })
    }

    renderEmpty(){
        return <span style={{textAlign: 'center', color: 'red'}}>
             Aucune donnée enregistrée !            
         </span>
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

    renderList(){
        return (    <table className="mb-0 table" >
        <thead>
        <tr>
            <th>Marques</th>
        </tr>
        </thead>
        <tbody>
          
     { this.props.marques.map((item, index) => 
         <MarqueItem
         index={index}
          key={item.id} 
          onEditItem={this.onEditSubmit}              
          onDelete={this.onDelete}
         item={item} />
    )  }         
        </tbody>
    </table>)
    }


  async handleSubmit(e){
        e.preventDefault();

      const response =  await axios.post('api/ajouter_marque', {
            nom_marque: this.state.nom_marque
        })


       // alert(this.state.type_entite)
       const action = {type: "ADD_MARQUE", value: response.data}
       this.props.dispatch(action)
       this.setState({nom_marque: ''})
       

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
    
    

    render() {
        // console.log(Array.isArray(this.props.types_entites))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des Marques
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter une nouvelle marque"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={this.toggleVisibleInput}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>) : (
                                                           <button title="Annuler"
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
                                                   
                                                    {this.state.nom_marque && this.state.nom_marque.length > 1 ? (
                                                         <button onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                             <i className="fa fa-send"></i> {' '}

                                                         Enregistrer
                                                     </button>
                                                    ) : null}
                                                    </span>
                                                )}
                                </span>
                                {this.state.inputOpen ? (
                                     <input value={this.state.nom_marque} 
                                     onChange={this.handleChange}
                                     style={{width: '40%'}} name="nom_marque"
                                      placeholder="Ecrivez le nom de la marque"
                                     type="text" className="form-control pull-right" />
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                           {this.state.loading ? this.renderLoading() : 
                            !this.props.marques.length ? this.renderEmpty() : this.renderList()}


                             
                           </div>
                       </div>
                   </div>

          
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        marques: state.marques.items,
        loading: state.marques.loading,

    }
  }

export default connect(mapStateToProps)(Marques)
//export default TypeEntite

