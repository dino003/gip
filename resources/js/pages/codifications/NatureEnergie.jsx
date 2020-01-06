import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import NatureEnergieItem from '../../components/codifications/NatureEnergieItem'

  class NatureEnergie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            nom_energie: '',
        //     natures_energies: [
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
        
            const action = {type: "REMOVE_NATURE_ENERGIE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_nature_energie/' + id)
        }
       
    }

    onEditSubmit(newValue, id){
        axios.post('/api/modifier_nature_energie/' + id, {
            nom_energie: newValue
        }).then(response => {
            const action = {type: "EDIT_NATURE_ENERGIE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange(e){
        this.setState({
            nom_energie: e.target.value
        })
    }


  async handleSubmit(e){
        e.preventDefault();

      const response =  await axios.post('/api/ajouter_nature_energie', {
            nom_energie: this.state.nom_energie
        })

       // console.log(response.data)


       // alert(this.state.nom_energie)
       const action = {type: "ADD_NATURE_ENERGIE", value: response.data}
       this.props.dispatch(action)
       this.setState({nom_energie: ''})
       
    //    this.setState(state => {
    //         const natures_energies = [state.nom_energie, ...state.natures_energies];
    //         return {
    //             natures_energies,
    //             nom_energie: ''
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
        // console.log(Array.isArray(this.props.natures_energies))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des types d'entités
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter une Nouvelle Energie"
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
                                                   
                                                    {this.state.nom_energie && this.state.nom_energie.length > 2 ? (
                                                         <button onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                             <i className="fa fa-send"></i> {' '}

                                                         Enregistrer
                                                     </button>
                                                    ) : null}
                                                    </span>
                                                )}
                                </span>
                                {this.state.inputOpen ? (
                                     <input value={this.state.nom_energie} 
                                     onChange={this.handleChange}
                                     style={{width: '40%'}} name="nom_energie"
                                      placeholder="Ecrivez le nom du type d'énergie"
                                     type="text" className="form-control pull-right" />
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                                {!this.props.loading ? (
                                           <table className="mb-0 table" >
                                           <thead>
                                           <tr>
                                               <th>Nature des énergies</th>
                                           </tr>
                                           </thead>
                                           <tbody>
                                             
                                        { this.props.natures_energies.map((item, index) => 
                                            <NatureEnergieItem
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
        natures_energies: state.natures_energies.items,
        loading: state.natures_energies.loading,

    }
  }

export default connect(mapStateToProps)(NatureEnergie)
//export default TypeEntite

