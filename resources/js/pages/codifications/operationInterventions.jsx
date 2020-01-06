import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import 'react-toastify/dist/ReactToastify.css';
import OperationInterventionItem from '../../components/codifications/OperationInterventionItem';
import ModifierOperationIntervention from '../forms/ModifierOperationIntervention';


 class NatureOperationIntervention extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isEdit: false,
            objetModif: undefined,
            editIndex: undefined,
            nom_intervention: '',
            categorie: 'Réparation',
            sinistre: false,
            operation: false
        }

        this.formRef = null;
        this.base = this.state

        
    }

  
   

    onDelete = (id) => {

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_OPERATION_INTERVENTION", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_operation_intervention/' + id)
        }
       
    }

    passEdit(){
        this.setState({
            isEdit: true,
            isOpen: true
        })
    }

    closeEdit = () => {
        this.setState({
            isEdit: false,
            objetModif: undefined,
            editIndex: undefined
        }, () => this.toggleVisible())
    }

    onEdit = ( index) => {
        var structures = this.props.natures_operation_interventions
       // var struc = structures[index]


        this.setState({
            objetModif: structures[index],
            editIndex: index
        }, () => this.passEdit())


    }

   

    toggleVisible = () => {
        this.setState(prevState => {
            return {

                isOpen: !prevState.isOpen
            }
        })

        this.formRef.reset()
       // this.formRefo.reset()

    }

    verificationFormulaire () {
        if(this.nature_intervention.value == undefined || !this.nature_intervention.value.length){
            return "La nature d'intervention est obligatoire !"
        }else if(this.categorie_operation.value == undefined || !this.categorie_operation.value.length){
          return "La catégorie d'opération est obligatoire !"
        } else{
            return null
        }
    }

    setField = (event) => {
        //  this.setState({[e.target.name]: e.target.value})
          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;
      
          this.setState({
            [name]: value
          });
        }

      resetForm(){
          this.setState(this.base)
      }

      onEditSubmit = ( nature_intervention, categorie_vehicule, categorie_operation, nature_operation, temps_minute, cout_moyen) => {
       //  e.preventDefault()
        let modif = this.state.objetModif


          axios.post('/api/modifier_operation_intervention/' + modif.id, {
            nature_intervention: nature_intervention,
            categorie_vehicule: categorie_vehicule,
            categorie_operation: categorie_operation,
            nature_operation: nature_operation,
            temps_minute: temps_minute,
            cout_moyen: cout_moyen
          }).then(response => {
            const action = {type: "EDIT_OPERATION_INTERVENTION", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    
           // console.log(sin)
      }

      verificationFormulaire () {
        if(this.nature_intervention.value == undefined || !this.nature_intervention.value.length){
            return "La nature d'intervention est obligatoire !"
        }else if(this.categorie_operation.value == undefined || !this.categorie_operation.value.length){
          return "La catégorie d'opération est obligatoire !"
        }else if(this.categorie_vehicule.value == undefined || !this.categorie_vehicule.value.length){
            return "La catégorie de véhicule est obligatoire !"
          }else if(this.nature_operation.value == undefined || !this.nature_operation.value.length){
            return "La nature d'opération est obligatoire !"
          } else{
            return null
        }
    }

      enregistrerOperation = async (e) => {
          e.preventDefault()

          if(this.verificationFormulaire() == null){
           await axios.post('/api/ajouter_operation_intervention', 
               {
                   nature_intervention: this.nature_intervention.value,
                   categorie_vehicule: this.categorie_vehicule.value,
                   categorie_operation: this.categorie_operation.value,
                   nature_operation: this.nature_operation.value,
                   temps_minute: this.temps_minute.value,
                   cout_moyen: this.cout_moyen.value

            }
            ).then(response => {
                const action = {type: "ADD_OPERATION_INTERVENTION", value: response.data}
                this.props.dispatch(action)
               // this.toggleVisible()
                this.resetForm();

            })
             .catch(error => console.log(error));
        

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
      }

      renderList(){
          return ( <table className="mb-0 table" >
          <thead>
          <tr>
              <th>Nature d'intervention</th>
              <th>Catégorie de véhicule</th>
              <th>Catégorie d'opération </th>
              <th>Nature opération </th>
              <th>Temps (en mn) </th>
              <th>Coût moyen </th>

          </tr>
          </thead>
          <tbody>
           {this.props.natures_operation_interventions.map((st, index) => 
               <OperationInterventionItem
                key={st.id} 
                index={index}
                item={st}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
                 />
               )}
        
          </tbody>
      </table>)
      }

      renderLoading(){
          return  <span style={{textAlign: 'center'}}>

          <Loader
           
              height={500}
              width={300}
           />
           </span>
      }
    

    render() {
       // console.log(this.state.code_regroupement)
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des natures d'interventions
                           <button title=" Ajouter une nouvelle nature d'intervention"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary pull-right"
                                      onClick={this.closeEdit}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                           </h5>
                           <div className="table-responsive">
                              {!this.props.loading ? this.renderList() : this.renderLoading()}
                           </div>
                       </div>
                   </div>


       
    {!this.state.isEdit ? (
   <div className={this.state.isOpen ? "ui-theme-settings settings-open" : "ui-theme-settings"}>
            {this.state.isOpen &&   <button type="button" onClick={this.closeEdit}  className="btn-open-options btn btn-warning">
                <i className="fa fa-times fa-w-16 fa-spin fa-2x"></i>
            </button>}
            <div className="theme-settings__inner">
                <div className="scrollbar-container">
                    <div className="theme-settings__options-wrapper">
                        <h3 className="themeoptions-heading">Ajouter 
                        </h3>
                        <form ref={(ref) => this.formRef = ref} className="p-3" onChange={this.setField} onSubmit={this.enregistrerOperation}>
                            <br />
                              
                               

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature d'intervention</label>
                                    <select className="form-control"
                                     ref={nature_intervention => this.nature_intervention = nature_intervention}
                                        onChange={this.setField}
                                     name="nature_intervention">
                                         <option value={null}></option>

                                         {this.props.natures_interventions.map(nat => 
                                        <option key={nat.id} value={nat.id}>{nat.nom_intervention}</option>

                                            )}
                                       

                                    </select>
                                </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Catégorie de véhicule</label>
                                    <select className="form-control"
                                     ref={categorie_vehicule => this.categorie_vehicule = categorie_vehicule}
                                        onChange={this.setField}
                                     name="categorie_vehicule">
                                         <option value={null}></option>
                                         {this.props.categories_vehicules.map(cat => 
                                        <option key={cat.id} value={cat.id}>{cat.nom_type}</option>

                                            )}
                                       

                                    </select>
                                </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Catégorie d'opération</label>
                                    <input name="categorie_operation"
                                     ref={categorie_operation => this.categorie_operation = categorie_operation}
                                      type="text" className="form-control" />
                                    </div>

                                    <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature Opération</label>
                                    <input name="nature_operation"
                                     ref={nature_operation => this.nature_operation = nature_operation}
                                      type="text" className="form-control" />
                                    </div>

                                    
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Temps en minutes</label>
                                            <input name="temps_minute"
                                            ref={temps_minute => this.temps_minute = temps_minute}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Coût moyen</label>
                                            <input name="cout_moyen"
                                            ref={cout_moyen => this.cout_moyen = cout_moyen}
                                              type="text" className="form-control" /></div>
                                    </div>
                                   
                                   
                                    
                                 
                                </div>
                            

                             
                            
                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div> ) 
        : 
        <ModifierOperationIntervention 
        item={this.state.objetModif}
        natures_interventions={this.props.natures_interventions}
        categories_vehicules={this.props.categories_vehicules}
        closeEdit={this.closeEdit}
        onEditSubmit={this.onEditSubmit}
         isOpen={this.state.isOpen} />

       

    }
  

        <ToastContainer autoClose={4000} />

       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        natures_operation_interventions: state.natures_operation_interventions.items,
        loading: state.natures_operation_interventions.loading,
        categories_vehicules: state.categories_vehicules.items,
        natures_interventions: state.natures_interventions.items

    }
  }

export default connect(mapStateToProps)(NatureOperationIntervention)
