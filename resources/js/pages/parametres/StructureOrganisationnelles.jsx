import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {ToastContainer, toast } from 'react-toastify';

import StructureOrganisationnelleItem from '../../components/codifications/StructureOrganisationnelleItem';

  class StructureOrganisationnelle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            libelle: '',
            niveau: '',
        //     structure_organisationnelles: [
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

  



    onDelete = (item) => {
     
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
            if(item.plan_organisationnels && item.plan_organisationnels.length){
                let message = `${item.libelle} contient des éléments dans le plan Organisationnel
                en le supprimant cela supprimera toutes ses ramifications dans le plan organisationnel
                Souhaitez-vous continuer ?`

                if(confirm(message) ){
                    
                    axios.delete('/api/supprimer_structure_organisationelle/' + item.id)
                 
                    const action = {type: "REMOVE_STRUCTURE_ORGANISATIONNELLE", value: item.id}
                    this.props.dispatch(action)
                   axios.get('/api/plan_organisationelles').then((response) => {
            
                    const action2 = {type: "GET_PLAN_ORGANISATIONNEL", value: response.data}
                    this.props.dispatch(action2)
                } )
                }
            }else{
                const action = {type: "REMOVE_STRUCTURE_ORGANISATIONNELLE", value: item.id}
                this.props.dispatch(action)
               // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
                axios.delete('/api/supprimer_structure_organisationelle/' + item.id) 
                axios.get('/api/plan_organisationelles').then((response) => {
            
                    const action2 = {type: "GET_PLAN_ORGANISATIONNEL", value: response.data}
                    this.props.dispatch(action2)
                } )
            }
        
           
        }
  
    }


    onEditSubmit(libelle, niveau, id){
        if(!libelle.length) return window.alert('Le libéllé ne peut pas être vide')

        axios.post('/api/modifier_structure_organisationelle/' + id, {
            libelle: libelle,
            niveau: niveau
        }).then(response => {
            const action = {type: "EDIT_STRUCTURE_ORGANISATIONNELLE", value: response.data}
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
            const response =  await axios.post('/api/ajouter_structure_organisationelle', {
                libelle: this.libelle.value,
                niveau: this.niveau.value
            })
    
           const action = {type: "ADD_STRUCTURE_ORGANISATIONNELLE", value: response.data}
           this.props.dispatch(action)
           this.setState({libelle: '', niveau: ''})
           this.niveau.value = '';
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
            return "Le libéllé de la structure est obligatoire !"
        }else if(this.niveau.value == '' ){
            return "Le niveau est obligatoire !"
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
             <th>Niveau </th>

            <th>Libéllé de la Structure</th>


        </tr>
        </thead>
        <tbody>
          
     { this.props.structure_organisationnelles.sort((a, b) => a - b.niveau).map((item, index) => 
         <StructureOrganisationnelleItem
         index={index}
          key={item.id} 
          onEditItem={this.onEditSubmit}              
          onDelete={this.onDelete}
          dernierNiveau={Number( this.getNiveauAutomatique() - 1 )}

         item={item} />
    )  }         
        </tbody>
    </table>)
    }

    getNiveaus = () => {
        const events = [];
        this.props.structure_organisationnelles.map(event => {
            if(!event.niveau) return;
            return events.push(event.niveau)
        })
        
        return events
    }

    getNiveauAutomatique = () => {
        var niveau = Math.max(...this.getNiveaus(), 0) 
        if (niveau == 0) return 1;
        return Number(niveau + 1);

    }
    
    

    render() {
        // console.log(Array.isArray(this.props.structure_organisationnelles))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                       <h5 className="card-title">Gestion de la Structure Organisationelle
                        
                          
                        <span className="pull-right">
                    
                        {!this.state.inputOpen ? ( <button title=" Ajouter une nouvelle structure"
                                  className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                  onClick={this.toggleVisibleInput}
                                  >
                                  <i className="fa fa-plus"></i> {' '}
 
                                      Ajouter
                                         </button>) : null}
                            </span>
                         
                           
                        </h5>
                        <br />
                        {this.state.inputOpen ? (

                        <div className="row">

                            <div className="col-md-2">
                               <input 
                                 ref={niveau => this.niveau = niveau} 

                                 onChange={this.handleChange}
                                  name="niveau"
                                  readOnly
                                  value={this.getNiveauAutomatique()}
                                  placeholder="niveau"
                                 type="number" className="form-control " />
                               </div>

                              <div className="col-md-4">
                              <input 
                                 ref={libelle => this.libelle = libelle} 
                                 onChange={this.handleChange}
                                  name="libelle"
                                  placeholder="Libéllé de la Structure"
                                 type="text" className="form-control " />
                              </div>

                              <div className="col-md-2">
                                <button disabled={this.state.isFormSubmitted || !this.state.libelle.length}  onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success" >{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>

                              </div>

                              <div className="col-md-2">
                              <button title=" Quitter" className="mb-2 mr-2 btn-transition btn btn-outline-warning"
                                onClick={this.toggleVisibleInput}
                                >
                             <i className="fa fa-times"></i> {' '} Fermer
                                                    
                            </button>
                              </div>

                          

                                
                           
                        </div>  ) : null}
                           <div className="table-responsive">
                           {this.state.loading ? this.renderLoading() : 
                            !this.props.structure_organisationnelles.length ? this.renderEmpty() : this.renderList()}


                             
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
        structure_organisationnelles: state.structure_organisationnelles.items,
        loading: state.structure_organisationnelles.loading,
        plan_organisationnels: state.plan_organisationnels.items,

        
    }
  }

export default connect(mapStateToProps)(StructureOrganisationnelle)
//export default TypeEntite

