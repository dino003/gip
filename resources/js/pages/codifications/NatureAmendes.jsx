import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import NatureAmendeItem from '../../components/codifications/NatureAmendeItem'

  class NatureAmendes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            nature_amende: '',
        //     natures_amendes: [
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
        
            const action = {type: "REMOVE_NATURE_AMENDE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('api/supprimer_nature_amende/' + id)
        }
       
    }

    onEditSubmit(newValue, id){
        axios.post('api/modifier_nature_amende/' + id, {
            nature_amende: newValue
        }).then(response => {
            const action = {type: "EDIT_NATURE_AMENDE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange(e){
        this.setState({
            nature_amende: e.target.value
        })
    }

   async getTypesEntites(){
    const response = await axios.get('/api/natures_amendes')

    const action = {type: "GET_TYPE_ENTITE", value: response.data}
    this.props.dispatch(action)
    }

  async handleSubmit(e){
        e.preventDefault();

      const response =  await axios.post('/api/ajouter_nature_amende', {
            nature_amende: this.state.nature_amende
        })

       // console.log(response.data)


       // alert(this.state.type_entite)
       const action = {type: "ADD_NATURE_AMENDE", value: response.data}
       this.props.dispatch(action)
       this.setState({nature_amende: ''})
       
    //    this.setState(state => {
    //         const natures_amendes = [state.type_entite, ...state.natures_amendes];
    //         return {
    //             natures_amendes,
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
        // console.log(Array.isArray(this.props.natures_amendes))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des natures des amendes
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter une nature d'amende"
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
                                                   
                                                    {this.state.nature_amende && this.state.nature_amende.length > 2 ? (
                                                         <button onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                             <i className="fa fa-send"></i> {' '}

                                                         Enregistrer
                                                     </button>
                                                    ) : null}
                                                    </span>
                                                )}
                                </span>
                                {this.state.inputOpen ? (
                                     <input value={this.state.nature_amende} 
                                     onChange={this.handleChange}
                                     style={{width: '40%'}} name="nature_amende"
                                      placeholder="Ecrivez le type d'amende"
                                     type="text" className="form-control pull-right" />
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                                {!this.props.loading ? (
                                           <table className="mb-0 table" >
                                           <thead>
                                           <tr>
                                               <th>Natures des amendes</th>
                                           </tr>
                                           </thead>
                                           <tbody>
                                             
                                        { this.props.natures_amendes.map((item, index) => 
                                            <NatureAmendeItem
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
        natures_amendes: state.natures_amendes.items,
        loading: state.natures_amendes.loading,

    }
  }

export default connect(mapStateToProps)(NatureAmendes)
//export default TypeEntite

