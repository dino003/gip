import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import TypeEntiteItem from '../../components/codifications/TypeEntiteItem'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


  class TypeEntite extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            type_entite: '',
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
        
            const action = {type: "REMOVE_TYPE_ENTITE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_type_entite/' + id)
        }
       
    }

    onEditSubmit(newValue, id){
        axios.post('/api/modifier_type_entite/' + id, {
            type_entite: newValue
        }).then(response => {
            const action = {type: "EDIT_TYPE_ENTITE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange(e){
        this.setState({
            type_entite: e.target.value
        })
    }

   async getTypesEntites(){
    const response = await axios.get('/api/types_entites')

    const action = {type: "GET_TYPE_ENTITE", value: response.data}
    this.props.dispatch(action)
    }

  async handleSubmit(e){
        e.preventDefault();

      const response =  await axios.post('/api/ajouter_type_entite', {
            type_entite: this.state.type_entite
        })

       // console.log(response.data)


       // alert(this.state.type_entite)
       const action = {type: "ADD_TYPE_ENTITE", value: response.data}
       this.props.dispatch(action)
       this.setState({type_entite: ''})
       
    //    this.setState(state => {
    //         const types_entites = [state.type_entite, ...state.types_entites];
    //         return {
    //             types_entites,
    //             type_entite: ''
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
    
    

    render() {
        // console.log(Array.isArray(this.props.types_entites))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des types d'entités
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter un nouvel acteur"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={this.toggleVisibleInput}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>) : (
                                                           <button title=" Ajouter un nouvel acteur"
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
                                                   
                                                    {this.state.type_entite && this.state.type_entite.length > 2 ? (
                                                         <button onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                             <i className="fa fa-send"></i> {' '}

                                                         Enregistrer
                                                     </button>
                                                    ) : null}
                                                    </span>
                                                )}

                                            {this.props.types_entites.length ?
                                             <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename="Liste des types d'entités"
                                                sheet="feuille1"
                                                buttonText="Ecran -> Liste"/> : null }
                                </span>
                                {this.state.inputOpen ? (
                                     <input value={this.state.type_entite} 
                                     onChange={this.handleChange}
                                     style={{width: '40%'}} name="type_entite"
                                      placeholder="Ecrivez le nom du type d'entité"
                                     type="text" className="form-control pull-right" />
                                ) : null}
                               
                              
                            </h5>
                           <div className="table-responsive">
                                {!this.props.loading ? (
                                           <table className="mb-0 table" id="export">
                                           <thead>
                                           <tr>
                                               <th>Type d'entité</th>
                                           </tr>
                                           </thead>
                                           <tbody>
                                             
                                        { this.props.types_entites.map((item, index) => 
                                            <TypeEntiteItem
                                            index={index}
                                             key={item.id} 
                                             onEditItem={this.onEditSubmit}              
                                             onDelete={this.onDelete}
                                            item={item} />
                                       )  }         
                                           </tbody>
                                       </table>
                                ) : (
                                    <span style={{textAlign: 'center'}}>

                                    <Loader
                                      
                                        height={500}
                                        width={300}
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
        types_entites: state.types_entites.items,
        loading: state.types_entites.loading,

    }
  }

export default connect(mapStateToProps)(TypeEntite)
//export default TypeEntite

