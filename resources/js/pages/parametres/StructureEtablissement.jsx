import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import 'react-toastify/dist/ReactToastify.css';
import StructureEtablissementItem from '../../components/codifications/StructureEtablissementItem'

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

// import '../../components/Tree.scss'





 class StructureEtablissement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isEdit: false,
            objetModif: undefined,
            editIndex: undefined,
            code_regroupement: '',
            nom_regroupement: '',
            regroupement_appartenance: '',
            data: this.props.structures_etablissements,
            selectedOptions: {},
            isFormSubmitted: false
        }

        this.ajouterEnfant = this.ajouterEnfant.bind(this)

        this.formRef = null;
        this.base = this.state   
    }

  
   

    onDelete = (id) => {

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            // const action = {type: "REMOVE_STRUCTURE_ETABLISSEMENT", value: id}
            // this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_structure_etablissement/' + id).then( _ => {
                axios.get('/api/structures_etablissements').then((response) => {
            
                    const action2 = {type: "GET_STRUCTURE_ETABLISSEMENT", value: response.data}
                    this.props.dispatch(action2)
                } )

            })
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
        var structures = this.props.structures_etablissements
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
        if(this.code_regroupement.value == '' ){
            return "Le Code du Regroupement est obligatoire !"
        }else if(this.nom_regroupement.value == ''){
          return "Le nom du Regroupement est obligatoire !"
        } else{
            return null
        }
    }

    setField = (e) => {
        this.setState({[e.target.name]: e.target.value}) 
      }

      resetForm(){
          this.setState(this.base)
      }

    

    ajouterEnfant(option){
        this.closeEdit()

    }

      onEditSubmit = (e) => {
          e.preventDefault()
        let modif = this.state.objetModif
        this.setState({isFormSubmitted: true})
          axios.post('/api/modifier_structure_etablissement/' + modif.id, {
            code_regroupement: this.modifCodeRegroupementInput.value,
            nom_regroupement: this.modifNomRegroupementInput.value,
            regroupement_appartenance: this.modifRegroupAppartenanceInput.value
          }).then(response => {
            // const action = {type: "EDIT_STRUCTURE_ETABLISSEMENT", value: response.data}
            // this.props.dispatch(action)
            axios.get('/api/structures_etablissements').then((response) => {
            
                const action2 = {type: "GET_STRUCTURE_ETABLISSEMENT", value: response.data}
                this.props.dispatch(action2)
            } )
            this.setState({isFormSubmitted: false})

          }).catch(error =>{
            this.setState({isFormSubmitted: false})
            console.log(error)
          } )
      

      }

      enregistrerStructure = async (e) => {
          e.preventDefault()

          if(this.verificationFormulaire() == null){
            this.setState({isFormSubmitted: true})

             // const struc = this.props.structures_etablissements.find(st =>)
           await axios.post('/api/ajouter_structure_etablissement', 
               {
                   code_regroupement: this.code_regroupement.value,
                   nom_regroupement: this.nom_regroupement.value,
                   regroupement_appartenance: this.regroupement_appartenance.value
            }
            ).then(response => {
                // const action = {type: "ADD_STRUCTURE_ETABLISSEMENT", value: response.data}
                // this.props.dispatch(action)
                axios.get('/api/structures_etablissements').then((response) => {
            
                    const action2 = {type: "GET_STRUCTURE_ETABLISSEMENT", value: response.data}
                    this.props.dispatch(action2)
                } )
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

      setEtablissement = () => {
        const events = [];
        this.props.structures_etablissements.map(event => {
            return events.push({
                label: event.code_regroupement,
                key: event.id,
                nodes: event.children,
                parent: event.parent

            })
        })

        return events.filter(ev => ev.parent == null)
    }

    renderlist(){
                  return ( <table className="mb-0 table" id="export" >
          <thead>
          <tr>
              <th>Code Regroupement</th>
              <th>Nom du Regroupement</th>
              <th>Regroupement d'Appartenance</th>
          </tr>
          </thead>
          <tbody>
           {this.props.structures_etablissements.map((st, index) => 
               <StructureEtablissementItem
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

      renderTree(){

        return (
     
         <OptionsList 
         options={this.props.structures_etablissements.filter(st => st.regroupement_appartenance == null)} 
         onChange={(selectedOptions) => this.setState({selectedOptions})}
        // ajouterEnfant={this.ajouterEnfant}
         selectedOptions={this.state.selectedOptions} 
       />
        )
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
     //  console.log(this.setEtablissement())
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           {/* <h5 className="card-title">Gestion de la structure de l'établissement
                           <button title=" Ajouter un nouvel acteur"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary pull-right"
                                      onClick={this.closeEdit}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                           </h5> */}

                           <h5 className="card-title">Gestion de la structure de l'établissement
                          
                          <span className="pull-right">
                      
                          {/* <button title=" Ajouter une nouvelle ligne de budget"
                                    className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                    onClick={() => this.props.history.push(`/gestion_du_parc_automobile/creation-contrat-assurance`)}
                                    >
                                    <i className="fa fa-plus"></i> {' '}
   
                                        Ajouter
                                           </button> */}
                                           {this.props.structures_etablissements.length ?
                                           <ReactHTMLTableToExcel
                                              id="test-table-xls-button"
                                              className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                              table="export"
                                              filename="Structure Etablissement"
                                              sheet="feuille1"
                                              buttonText="Ecran -> Liste"/> : null }
                              </span>
                           
                              
                                          
                              
                          </h5>
                          <br />
                          <div className="row">
                              <div className="col-md-7">
                              <div className="table-responsive">
                              {!this.props.loading ? this.renderlist() : this.renderLoading()}
                           </div>
                              </div>
                              <div className="col-md-5">
                              <div className="table-responsive">
                              {!this.props.loading ? this.renderTree() : this.renderLoading()}
                           </div>
                              </div>

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
                                    <label htmlFor="exampleAddress" className="">Code Regroupement</label>
                                    <input name="code_regroupement"
                                    ref={code_regroupement => this.code_regroupement = code_regroupement}

                                       type="text" className="form-control" />
                                    </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nom du Regroupement</label>
                                    <input name="nom_regroupement"
                                    ref={nom_regroupement => this.nom_regroupement = nom_regroupement}

                                      type="text" className="form-control" />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress2" className="">Regroupement d'Appartenance</label>
                                    <select name="regroupement_appartenance"
                                        ref={regroupement_appartenance => this.regroupement_appartenance = regroupement_appartenance}

                                     id=""  className="form-control">
                                         <option value=''>SIEGE</option>
                                        {this.props.structures_etablissements.map(st => 
                                        <option key={st.id} value={st.id}>{st.code_regroupement}</option> )}
                                    </select>
                                    {/* <input name="regroupement_appartenance"
                                     defaultValue={this.state.regroupement_appartenance} type="text" className="form-control" /> */}
                                </div>
                            
                                <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div> ) 
        : 
        
        <div className={this.state.isOpen ? "ui-theme-settings settings-open" : "ui-theme-settings"}>
            {this.state.isOpen &&   <button type="button" onClick={this.closeEdit}  className="btn-open-options btn btn-warning">
                <i className="fa fa-times fa-w-16 fa-spin fa-2x"></i>
            </button>}
            <div className="theme-settings__inner">
                <div className="scrollbar-container">
                    <div className="theme-settings__options-wrapper">
                        <h3 className="themeoptions-heading">Ajouter 
                        </h3>
                        <form ref={(ref) => this.formRef = ref} className="p-3" onSubmit={this.onEditSubmit}>
                            <br />
                              
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Code Regroupement</label>
                                    <input
                                     ref={modifCodeRegroupementInput => this.modifCodeRegroupementInput = modifCodeRegroupementInput}
                                      defaultValue={this.state.objetModif.code_regroupement}  type="text" className="form-control" />
                                    </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nom du Regroupement</label>
                                    <input 
                                    ref={modifNomRegroupementInput => this.modifNomRegroupementInput = modifNomRegroupementInput}
                                     defaultValue={this.state.objetModif.nom_regroupement}  type="text" className="form-control" />
                                </div>
                            

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress2" className="">Regroupement d'Appartenance</label>
                                    <select name="modifRegroupAppartenanceInput"
                                        ref={modifRegroupAppartenanceInput => this.modifRegroupAppartenanceInput = modifRegroupAppartenanceInput}
                                        defaultValue={this.state.objetModif.regroupement_appartenance}
                                       className="form-control">
                                        <option value=''>SIEGE</option>

                                        {this.props.structures_etablissements.map(st => 
                                        <option key={st.id} value={st.id}>{st.code_regroupement}</option> )}
                                    </select>
                                    {/* <input name="regroupement_appartenance"
                                     defaultValue={this.state.regroupement_appartenance} type="text" className="form-control" /> */}
                                </div>
                            
                                <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div> }
  

        <ToastContainer autoClose={4000} />

        <Container>
                        <Button
                        tooltip="Ajouter une Structure"
                        icon="fas fa-plus"
                    // rotate={true}
                        styles={{backgroundColor: 'green', color: 'white', cursor: 'pointer'}}

                        onClick={this.closeEdit}
                        />
                </Container>

       </div>
        )
    }
}

// Dumb checkbox component, completly controlled by parent
const Checkbox = ({ selected, label, onChange, cla }) => {
    return (
      <div>
       
        <div className="label"> <span style={{cursor: 'pointer'}} onClick={() => {
            onChange(!selected)
            console.log(selected)
        }}>
             <i className={cla}></i> </span> {label}</div>
      </div>
    )
  }

  
// Recursive component
const OptionsList = ({ options, selectedOptions, onChange, ajouterEnfant }) => {
 
    const handleCheckboxClicked = (selectedOptionId) => {
      // is currently selected
      if(selectedOptions[selectedOptionId]){
        // remove selected key from options list
        delete selectedOptions[selectedOptionId]; 
      } else { // is not currently selected
        // Add selected key to optionsList
        selectedOptions[selectedOptionId] = {} 
      }
      // call onChange function given by parent
      onChange(selectedOptions) 
    }
    
    const handleSubOptionsListChange = (optionId, subSelections) => {
      // add sub selections to current optionId
      selectedOptions[optionId] = subSelections;
      // call onChange function given by parent
      onChange(selectedOptions);
    }
    
    return (
      <div>
        {options.map(option => (
          <ul key={option.id}>
            {/* <Checkbox 
            cla={option.children.length ? 'fa fa-folder' : ''}
              selected={selectedOptions[option.id]} 
              label={`${option.code_regroupement} __ ${option.nom_regroupement}`} 
              onChange={() => {handleCheckboxClicked(option.id)}}
             /> */}
             <div className="label">
                  {option.children.length ? <span style={{cursor: 'pointer'}} onClick={() => {
            handleCheckboxClicked(option.id)
           // console.log(option)
                }}>
             <i className="fa fa-folder"></i> 
             </span> : null}

              {`${option.code_regroupement} __ ${option.nom_regroupement}`} {' '}
          {/*     <span style={{cursor: 'pointer'}} onClick={() => {
            //handleCheckboxClicked(option.id)
            console.log(option)
        }}>
             <i className="fa fa-plus-circle"></i> 
             </span> */}
            {/* <span title={`Ajouter une Structure Ayant pour Regroupement D'appartenance ${option.code_regroupement}`} style={{cursor: 'pointer'}} onClick={ajouterEnfant(option)}>  <i className="fa fa-plus-circle"></i> </span> */}
              </div>
            {/* Base Case */}
            {(option.children.length > 0 && selectedOptions[option.id]) &&
              <OptionsList
                options={option.children}
                selectedOptions={selectedOptions[option.id]} 
                onChange={(subSelections) => handleSubOptionsListChange(option.id, subSelections)}
               />
            }
          </ul>
        ))}
      </div>
    )
  }
  

const mapStateToProps = state => {
    return {
        structures_etablissements: state.structures_etablissements.items,
        loading: state.structures_etablissements.loading,

    }
  }

export default connect(mapStateToProps)(StructureEtablissement)
