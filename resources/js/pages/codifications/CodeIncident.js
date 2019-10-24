import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import CodeIncidentItem from '../../components/codifications/CodeIncidentItem'

  class CodeIncident extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            libelle: '',
            code: '',
        //     code_incidents: [
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
        
            const action = {type: "REMOVE_CODE_INCIDENT", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('api/supprimer_code_incident/' + id)
        }
       
    }

    onEditSubmit(libelle, code, id){
        axios.post('api/modifier_code_incident/' + id, {
            libelle: libelle,
            code: code
        }).then(response => {
            const action = {type: "EDIT_CODE_INCIDENT", value: response.data}
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

      const response =  await axios.post('api/ajouter_code_incident', {
            libelle: this.libelle.value,
            code: this.code.value
        })

       const action = {type: "ADD_CODE_INCIDENT", value: response.data}
       this.props.dispatch(action)
       this.setState({libelle: '', code: ''})
       this.code.value = '';
       this.libelle.value = '';

   // console.log(this.libelle.value)
       

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
            <th>Libéllés incidents</th>
            <th>Code Réduit</th>

        </tr>
        </thead>
        <tbody>
          
     { this.props.code_incidents.map((item, index) => 
         <CodeIncidentItem
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
        // console.log(Array.isArray(this.props.code_incidents))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des incidents
                        
                          
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
                          
                                                               Quitter
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
                                    <div>
                                           <input 
                                     ref={code => this.code = code} 

                                     onChange={this.handleChange}
                                     style={{width: '30%'}} name="code"
                                      placeholder="Code réduit"
                                     type="text" className="form-control pull-right" />

                                     <input 
                                     ref={libelle => this.libelle = libelle} 
                                     onChange={this.handleChange}
                                     style={{width: '30%'}} name="libelle"
                                      placeholder="Libéllé"
                                     type="text" className="form-control pull-right" />

                                  
                                     </div>
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                           {this.state.loading ? this.renderLoading() : 
                            !this.props.code_incidents.length ? this.renderEmpty() : this.renderList()}


                             
                           </div>
                       </div>
                   </div>

          
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        code_incidents: state.code_incidents.items,
        loading: state.code_incidents.loading,

    }
  }

export default connect(mapStateToProps)(CodeIncident)
//export default TypeEntite

