import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import 'react-toastify/dist/ReactToastify.css';
import NatureInterventionItem from '../../components/codifications/NatureInterventionItem';
import ModifierNatureIntervention from '../forms/ModifierNatureIntervention';


 class NatureInterventions extends Component {

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
            operation: false,
            isFormSubmitted: false
        }

        this.formRef = null;
        this.base = this.state

        
    }

  
   

    onDelete = (id) => {

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_NATURE_INTERVENTION", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_nature_intervention/' + id)
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
        var structures = this.props.natures_interventions
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
        if(this.nom_intervention_ajout.value == undefined || !this.nom_intervention_ajout.value.length){
            return "La nature d'intervention est obligatoire !"
        }else if(this.categorie_ajout.value == undefined || !this.categorie_ajout.value.length){
          return "La catégorie est obligatoire !"
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

      onEditSubmit = ( nom, cat, sin, op) => {
       //  e.preventDefault()
        let modif = this.state.objetModif
        this.setState({isFormSubmitted: true})

          axios.post('/api/modifier_nature_intervention/' + modif.id, {
            nom_intervention: nom,
            categorie: cat,
            sinistre: sin,
            operation: op
          }).then(response => {
            const action = {type: "EDIT_NATURE_INTERVENTION", value: response.data}
            this.props.dispatch(action)
            this.setState({isFormSubmitted: false})

          }).catch(error => {
            this.setState({isFormSubmitted: false})
            console.log(error)
          } )
    
           // console.log(sin)
      }

      enregistrerStructure = async (e) => {
          e.preventDefault()

          if(this.verificationFormulaire() == null){
              this.setState({isFormSubmitted: true})
           await axios.post('/api/ajouter_nature_intervention', 
               {
                   nom_intervention: this.nom_intervention_ajout.value,
                   categorie: this.categorie_ajout.value,
                   sinistre: this.sinistre.checked,
                   operation: this.operation.checked

            }
            ).then(response => {
                const action = {type: "ADD_NATURE_INTERVENTION", value: response.data}
                this.props.dispatch(action)
               // this.toggleVisible()
               this.setState({isFormSubmitted: false})

                this.resetForm();

            })
             .catch(error => {
                this.setState({isFormSubmitted: false})
                console.log(error)
             } );
        

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
              <th>Nature des interventions</th>
              <th>Catégorie</th>
              <th>Sinistre ?</th>
              <th>Opérations ?</th>
          </tr>
          </thead>
          <tbody>
           {this.props.natures_interventions.map((st, index) => 
               <NatureInterventionItem
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
                        <form ref={(ref) => this.formRef = ref} className="p-3" onChange={this.setField} onSubmit={this.enregistrerStructure}>
                            <br />
                              
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature des interventions</label>
                                    <input name="nom_intervention"
                                     ref={nom_intervention_ajout => this.nom_intervention_ajout = nom_intervention_ajout}
                                      type="text" className="form-control" />
                                    </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Catégorie</label>
                                    <select className="form-control"
                                     ref={categorie_ajout => this.categorie_ajout = categorie_ajout}
                                        value={this.state.categorie}
                                        onChange={this.setField}
                                     name="categorie">
                                        <option value="Entretien">Entretien</option>
                                        <option value="Réparation">Réparation</option>
                                        <option value="Rep.Sinistre">Rep.Sinistre</option>
                                        <option value="Matériel/Consomable">Matériel/Consomable</option>
                                        <option value="Divers">Divers</option>
                                        <option value="Rappel constructeur">Rappel constructeur</option>

                                    </select>
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress2" className="">
                                        Sinistre ?
                                      
                                        </label>

                                        <input type="checkbox"
                                         onChange={this.setField}
                                         ref={sinistre => this.sinistre = sinistre}

                                         name="sinistre" />
                                </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress2" className="">
                                        Opérations ?
                                       
                                        </label>

                                        <input type="checkbox" 
                                         onChange={this.setField}
                                         ref={operation => this.operation = operation}
                                        name="operation" />
                                </div>
                            
                                <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div> ) 
        : 
        <ModifierNatureIntervention item={this.state.objetModif}
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
        natures_interventions: state.natures_interventions.items,
        loading: state.natures_interventions.loading,

    }
  }

export default connect(mapStateToProps)(NatureInterventions)
