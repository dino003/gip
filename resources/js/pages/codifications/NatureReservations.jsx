import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {ToastContainer, toast } from 'react-toastify';

import NatureReservationItem from '../../components/codifications/NatureReservationItem';

  class NatureReservation extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            libelle: '',
            priorite: '',
        //     natures_reservations: [
        //         'Siege',
        //         'Ditrection'
        
        //    ],
            selection: [],
            isFormSubmitted: false
        }

       // this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onEditSubmit = this.onEditSubmit.bind(this)
        
    }

  



    onDelete = (id) => {
     
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_NATURE_RESERVATION", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_nature_reservation/' + id)
        }
       
    }

    onEditSubmit(libelle, priorite, id){
        axios.post('/api/modifier_nature_reservation/' + id, {
            libelle: libelle,
            priorite: priorite
        }).then(response => {
            const action = {type: "EDIT_NATURE_RESERVATION", value: response.data}
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
            this.setState({isFormSubmitted : true})
            const response =  await axios.post('/api/ajouter_nature_reservation', {
                libelle: this.libelle.value,
                priorite: this.priorite.value
            })
    
           const action = {type: "ADD_NATURE_RESERVATION", value: response.data}
           this.props.dispatch(action)
           this.setState({libelle: '', priorite: ''})
           this.priorite.value = '';
           this.libelle.value = '';
           this.setState({isFormSubmitted : false})

        }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }

 

   // console.log(this.libelle.value)
       

    } 

    
    verificationFormulaire () {
        if(this.libelle.value == '' ){
            return "La nature de réservation est obligatoire !"
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

            <th>Libéllé natures des réservations et utilisations</th>
            <th>priorite </th>


        </tr>
        </thead>
        <tbody>
          
     { this.props.natures_reservations.map((item, index) => 
         <NatureReservationItem
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
        // console.log(Array.isArray(this.props.natures_reservations))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des Natures de réservations / utilisations
                        
                          
                            <span className="pull-right">
                        
                            {!this.state.inputOpen ? ( <button title=" Ajouter une nouvelle nature de réservation"
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
                                                   
                                                    {this.state.libelle && this.state.libelle.length > 2 ? (
                                                            <button disabled={this.state.isFormSubmitted}  onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success" >{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>

                                                    ) : null}
                                                    </span>
                                                )}
                                </span>
                                {this.state.inputOpen ? (
                                    <div>
                                           <input 
                                     ref={libelle => this.libelle = libelle} 
                                     onChange={this.handleChange}
                                     style={{width: '30%'}} name="libelle"
                                      placeholder="Nature de réservation"
                                     type="text" className="form-control pull-right" />
                                           <input 
                                     ref={priorite => this.priorite = priorite} 

                                     onChange={this.handleChange}
                                     style={{width: '30%'}} name="priorite"
                                      placeholder="priorite "
                                     type="number" className="form-control pull-right" />

                                  

                                  
                                     </div>
                                ) : null}
                               
                            </h5>
                           <div className="table-responsive">
                           {this.state.loading ? this.renderLoading() : 
                            !this.props.natures_reservations.length ? this.renderEmpty() : this.renderList()}


                             
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
        natures_reservations: state.natures_reservations.items,
        loading: state.natures_reservations.loading,

    }
  }

export default connect(mapStateToProps)(NatureReservation)
//export default TypeEntite

