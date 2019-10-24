import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {ToastContainer, toast } from 'react-toastify';


import NatureDepenseRecetteItem from '../../components/codifications/NatureDepenseRecetteItem'

  class NatureDepenseRecette extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            nature_depense_recette: '',
            code: '',
        //     natures_depense_recettes: [
        //         'Siege',
        //         'Ditrection'
        
        //    ],
            selection: []
        }

       // this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onEditSubmit = this.onEditSubmit.bind(this)
        
    }

  



    onDelete = (id) => {
     
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_NATURE_DEPENSE_RECETTE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_nature_depense_recette/' + id)
        }
       
    }

    onEditSubmit(nature_depense_recette, code, id){
        axios.post('/api/modifier_nature_depense_recette/' + id, {
            nature_depense_recette: nature_depense_recette,
            code: code
        }).then(response => {
            const action = {type: "EDIT_NATURE_DEPENSE_RECETTE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange = (e) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }



  async handleSubmit(e){
        e.preventDefault();

        if(this.verificationFormulaire() == null){
            const response =  await axios.post('/api/ajouter_nature_depense_recette', {
                nature_depense_recette: this.nature_depense_recette.value,
                code: this.code.value
            })
    
           const action = {type: "ADD_NATURE_DEPENSE_RECETTE", value: response.data}
           this.props.dispatch(action)
           this.setState({nature_depense_recette: '', code: ''})
           this.code.value = '';
           this.nature_depense_recette.value = '';
        }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }

 

   // console.log(this.nature_depense_recette.value)
       

    } 

    
    verificationFormulaire () {
        if(this.nature_depense_recette.value == undefined || !this.nature_depense_recette.value.length){
            return "La nature de dépense est obligatoire !"
        }else if(this.code.value == undefined || !this.code.value.length){
          return "Le code est obligatoire !"
        } else{
            return null
        }
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
        return (  <table className="mb-0 table" >
        <thead>
        <tr>
        <th>Code Nature</th>

            <th>Nature des dépenses / Recettes</th>

        </tr>
        </thead>
        <tbody>
          
     { this.props.natures_depense_recettes.map((item, index) => 
         <NatureDepenseRecetteItem
         index={index}
          key={item.id} 
          onEditItem={this.onEditSubmit}              
          onDelete={this.onDelete}
         item={item} />
    )  }         
        </tbody>
    </table>)
    }
    
    

    render() {
        // console.log(Array.isArray(this.props.natures_depense_recettes))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des Natures de dépenses et recettes
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter une nouvelle nature de depense"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={this.toggleVisibleInput}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>) : (
                                                           <button title=" Quitter"
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
                                                   
                                                    {this.state.nature_depense_recette && this.state.nature_depense_recette.length > 2 ? (
                                                         <button onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success">
                                                             <i className="fa fa-send"></i> {' '}

                                                         Enregistrer
                                                     </button>
                                                    ) : null}
                                                    </span>
                                                )}
                                </span>
                                {this.state.inputOpen ? (
                                    <div>
                                           <input 
                                     ref={nature_depense_recette => this.nature_depense_recette = nature_depense_recette} 
                                     onChange={this.handleChange}
                                     style={{width: '30%'}} name="nature_depense_recette"
                                      placeholder="Nature de dépense"
                                     type="text" className="form-control pull-right" />
                                           <input 
                                     ref={code => this.code = code} 

                                     onChange={this.handleChange}
                                     style={{width: '30%'}} name="code"
                                      placeholder="Code nature"
                                     type="text" className="form-control pull-right" />

                                  

                                  
                                     </div>
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                           {this.state.loading ? this.renderLoading() : 
                            !this.props.natures_depense_recettes.length ? this.renderEmpty() : this.renderList()}


                             
                           </div>
                       </div>
                   </div>

                   <ToastContainer autoClose={4000} />

                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        natures_depense_recettes: state.natures_depense_recettes.items,
        loading: state.natures_depense_recettes.loading,

    }
  }

export default connect(mapStateToProps)(NatureDepenseRecette)
//export default TypeEntite

