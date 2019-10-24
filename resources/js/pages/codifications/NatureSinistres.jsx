import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import NatureSinistreItem from '../../components/codifications/NatureSinistreItem'
  class NatureSinistres extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            nature_sinistre: '',
        //     natures_sinistres: [
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
        
            const action = {type: "REMOVE_NATURE_SINISTRE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('api/supprimer_nature_sinistre/' + id)
        }
       
    }

    onEditSubmit(newValue, id){
        axios.post('api/modifier_nature_sinistre/' + id, {
            nature_sinistre: newValue
        }).then(response => {
            const action = {type: "EDIT_NATURE_SINISTRE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange(e){
        this.setState({
            nature_sinistre: e.target.value
        })
    }


  async handleSubmit(e){
        e.preventDefault();

      const response =  await axios.post('/api/ajouter_nature_sinistre', {
            nature_sinistre: this.state.nature_sinistre
        })

       // console.log(response.data)


       // alert(this.state.type_entite)
       const action = {type: "ADD_NATURE_SINISTRE", value: response.data}
       this.props.dispatch(action)
       this.setState({nature_sinistre: ''})
       
    //    this.setState(state => {
    //         const natures_sinistres = [state.type_entite, ...state.natures_sinistres];
    //         return {
    //             natures_sinistres,
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
        // console.log(Array.isArray(this.props.natures_sinistres))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des natures de sinistres
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter une nature de sinistre"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={this.toggleVisibleInput}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>) : (
                                                           <button title="Quitter"
                                                           className="mb-2 mr-2 btn-transition btn btn-outline-warning"
                                                           onClick={this.toggleVisibleInput}
                                                           >
                                                           <i className="fa fa-times"></i> {' '}
                          
                                                               Quitter
                                                                  </button>
                                             )}
                                
                              
                                                {!this.state.inputOpen ? null
                                                                        
                                                 : (
                                                    <span>
                                                   
                                                    {this.state.nature_sinistre && this.state.nature_sinistre.length > 2 ? (
                                                         <button onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                             <i className="fa fa-send"></i> {' '}

                                                         Enregistrer
                                                     </button>
                                                    ) : null}
                                                    </span>
                                                )}
                                </span>
                                {this.state.inputOpen ? (
                                     <input value={this.state.nature_sinistre} 
                                     onChange={this.handleChange}
                                     style={{width: '40%'}} name="nature_sinistre"
                                      placeholder="Ecrivez le type de sinistre"
                                     type="text" className="form-control pull-right" />
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                                {!this.props.loading ? (
                                           <table className="mb-0 table" >
                                           <thead>
                                           <tr>
                                               <th>Natures des sinistres</th>
                                           </tr>
                                           </thead>
                                           <tbody>
                                             
                                        { this.props.natures_sinistres.map((item, index) => 
                                            <NatureSinistreItem
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
        natures_sinistres: state.natures_sinistres.items,
        loading: state.natures_sinistres.loading,

    }
  }

export default connect(mapStateToProps)(NatureSinistres)
//export default TypeEntite

