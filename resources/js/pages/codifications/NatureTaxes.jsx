import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import NatureTaxeItem from '../../components/codifications/NatureTaxeItem'

  class NatureTaxes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            type_entite: '',
        //     natures_taxes: [
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
        
            const action = {type: "REMOVE_NATURE_TAXE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('api/supprimer_nature_taxe/' + id)
        }
       
    }

    onEditSubmit(newValue, id){
        axios.post('api/modifier_nature_taxe/' + id, {
            libelle: newValue
        }).then(response => {
            const action = {type: "EDIT_NATURE_TAXE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange(e){
        this.setState({
            libelle: e.target.value
        })
    }

 

  async handleSubmit(e){
        e.preventDefault();

      const response =  await axios.post('api/ajouter_nature_taxe', {
            libelle: this.state.libelle
        })

       // console.log(response.data)


       // alert(this.state.type_entite)
       const action = {type: "ADD_NATURE_TAXE", value: response.data}
       this.props.dispatch(action)
       this.setState({libelle: ''})
       
    //    this.setState(state => {
    //         const natures_taxes = [state.type_entite, ...state.natures_taxes];
    //         return {
    //             natures_taxes,
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
        // console.log(Array.isArray(this.props.natures_taxes))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des natures des taxes
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter une nature de taxe"
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
                          
                                                               Annuler
                                                                  </button>
                                             )}
                                
                              
                                                {!this.state.inputOpen ? null
                                                                        
                                                 : (
                                                    <span>
                                                   
                                                    {this.state.libelle && this.state.libelle.length > 2 ? (
                                                         <button onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                             <i className="fa fa-send"></i> {' '}

                                                         Enregistrer
                                                     </button>
                                                    ) : null}
                                                    </span>
                                                )}
                                </span>
                                {this.state.inputOpen ? (
                                     <input value={this.state.libelle} 
                                     onChange={this.handleChange}
                                     style={{width: '40%'}} name="libelle"
                                      placeholder="Libellé"
                                     type="text" className="form-control pull-right" />
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                                {!this.props.loading ? (
                                           <table className="mb-0 table" >
                                           <thead>
                                           <tr>
                                               <th>Nature des taxes</th>
                                           </tr>
                                           </thead>
                                           <tbody>
                                             
                                        { this.props.natures_taxes.map((item, index) => 
                                            <NatureTaxeItem
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
        natures_taxes: state.natures_taxes.items,
        loading: state.natures_taxes.loading,

    }
  }

export default connect(mapStateToProps)(NatureTaxes)
//export default TypeEntite

