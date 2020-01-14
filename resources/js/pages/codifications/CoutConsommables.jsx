import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import CoutConsommableItem from '../../components/codifications/CoutConsommableItem'

  class CoutConsommables extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            libelle: '',
            cout_unitaire: '',
        //     couts_consommables: [
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
        
            const action = {type: "REMOVE_COUT_CONSOMMABLE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_cout_consomable/' + id)
        }
       
    }

    onEditSubmit(libelle, cout_unitaire, id){
        axios.post('/api/modifier_cout_consomable/' + id, {
            libelle: libelle,
            cout_unitaire: cout_unitaire
        }).then(response => {
            const action = {type: "EDIT_COUT_CONSOMMABLE", value: response.data}
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

      const response =  await axios.post('/api/ajouter_cout_consomable', {
            libelle: this.libelle.value,
            cout_unitaire: this.cout_unitaire.value
        })

       const action = {type: "ADD_COUT_CONSOMMABLE", value: response.data}
       this.props.dispatch(action)
       this.setState({libelle: '', cout_unitaire: ''})
       this.cout_unitaire.value = '';
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
           
            height={500}
            width={300}
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
            <th>Libéllé</th>
            <th>Coût unitaire HT</th>

        </tr>
        </thead>
        <tbody>
          
     { this.props.couts_consommables.map((item, index) => 
         <CoutConsommableItem
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
        // console.log(Array.isArray(this.props.couts_consommables))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Tarif des consommables
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter"
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
                                                   
                                                    {this.libelle && this.libelle.value != '' && this.cout_unitaire && this.cout_unitaire.value != '' ? (
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
                                     ref={cout_unitaire => this.cout_unitaire = cout_unitaire} 

                                     onChange={this.handleChange}
                                     style={{width: '30%'}} name="cout_unitaire"
                                      placeholder="Coût unitaire "
                                     type="number" className="form-control pull-right" />

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
                            !this.props.couts_consommables.length ? this.renderEmpty() : this.renderList()}


                             
                           </div>
                       </div>
                   </div>

          
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        couts_consommables: state.couts_consommables.items,
        loading: state.couts_consommables.loading,

    }
  }

export default connect(mapStateToProps)(CoutConsommables)
//export default TypeEntite

