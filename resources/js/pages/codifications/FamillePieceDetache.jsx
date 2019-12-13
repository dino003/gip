import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import FamillePieceDetacheItem from '../../components/codifications/FamillePieceDetacheItem'

  class FamillePieceDetache extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            famille: '',
        //     famille_pieces_detaches: [
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
        
            const action = {type: "EDIT_FAMILLE_PIECE_DETACHEE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_famille_pieces_detachee/' + id)
        }
       
    }

    onEditSubmit(newValue, id){
        axios.post('/api/modifier_famille_pieces_detachee/' + id, {
            famille: newValue
        }).then(response => {
            const action = {type: "REMOVE_FAMILLE_PIECE_DETACHEE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange(e){
        this.setState({
            famille: e.target.value
        })
    }



  async handleSubmit(e){
        e.preventDefault();

      const response =  await axios.post('/api/ajouter_famille_pieces_detachee', {
            famille: this.state.famille
        })

       // console.log(response.data)


       // alert(this.state.famille)
       const action = {type: "ADD_FAMILLE_PIECE_DETACHEE", value: response.data}
       this.props.dispatch(action)
       this.setState({famille: ''})
       
    //    this.setState(state => {
    //         const famille_pieces_detaches = [state.famille, ...state.famille_pieces_detaches];
    //         return {
    //             famille_pieces_detaches,
    //             famille: ''
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
        // console.log(Array.isArray(this.props.famille_pieces_detaches))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des familles des pièces détachées
                        
                          
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
                                                   
                                                    {this.state.famille && this.state.famille.length > 2 ? (
                                                         <button onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                             <i className="fa fa-send"></i> {' '}

                                                         Enregistrer
                                                     </button>
                                                    ) : null}
                                                    </span>
                                                )}
                                </span>
                                {this.state.inputOpen ? (
                                     <input value={this.state.famille} 
                                     onChange={this.handleChange}
                                     style={{width: '40%'}} name="famille"
                                      placeholder="Ecrivez le nom de la famille"
                                     type="text" className="form-control pull-right" />
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                                {!this.props.loading ? (
                                           <table className="mb-0 table" >
                                           <thead>
                                           <tr>
                                               <th>Familles</th>
                                           </tr>
                                           </thead>
                                           <tbody>
                                             
                                        { this.props.famille_pieces_detaches.map((item, index) => 
                                            <FamillePieceDetacheItem
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
        famille_pieces_detaches: state.famille_pieces_detaches.items,
        loading: state.famille_pieces_detaches.loading,

    }
  }

export default connect(mapStateToProps)(FamillePieceDetache)
//export default TypeEntite

