import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import 'react-toastify/dist/ReactToastify.css';
import StructureEtablissementItem from '../../components/codifications/StructureEtablissementItem'

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



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
            regroupement_appartenance: ''
        }

        this.formRef = null;
        this.base = this.state

        
    }

  
   

    onDelete = (id) => {

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_STRUCTURE_ETABLISSEMENT", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('api/supprimer_structure_etablissement/' + id)
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
        if(this.state.code_regroupement == undefined || !this.state.code_regroupement.length){
            return "Le Code du Regroupement est obligatoire !"
        }else if(this.state.nom_regroupement == undefined || !this.state.nom_regroupement.length){
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

      onEditSubmit = (e) => {
          e.preventDefault()
        let modif = this.state.objetModif
        //   var structures = this.props.structures_etablissements.map(item => {
        //       if(item.id === modif.id){
        //         modif['code_regroupement'] = this.modifCodeRegroupementInput.value
        //         modif['nom_regroupement'] = this.modifNomRegroupementInput.value
        //         modif['regroupement_appartenance'] = this.modifRegroupAppartenanceInput.value
        //       }
        //      return item 
        //   })

          axios.post('api/modifier_structure_etablissement/' + modif.id, {
            code_regroupement: this.modifCodeRegroupementInput.value,
            nom_regroupement: this.modifNomRegroupementInput.value,
            regroupement_appartenance: this.modifRegroupAppartenanceInput.value
          }).then(response => {
            const action = {type: "EDIT_STRUCTURE_ETABLISSEMENT", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
        // console.log(modif)
       // console.log(this.modifCodeRegroupementInput.value)
      // this.resetForm();

      }

      enregistrerStructure = async (e) => {
          e.preventDefault()

          if(this.verificationFormulaire() == null){
        //     delete this.state.isOpen
        //     delete this.state.isEdit
        //     delete this.state.objetModif
        //    // console.log(this.state)
           await axios.post('api/ajouter_structure_etablissement', 
               {
                   code_regroupement: this.state.code_regroupement,
                   nom_regroupement: this.state.nom_regroupement,
                   regroupement_appartenance: this.state.regroupement_appartenance
            }
            ).then(response => {
                const action = {type: "ADD_STRUCTURE_ETABLISSEMENT", value: response.data}
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
                                    <label htmlFor="exampleAddress" className="">Code Regroupement</label>
                                    <input name="code_regroupement" defaultValue={this.state.code_regroupement}  type="text" className="form-control" />
                                    </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nom du Regroupement</label>
                                    <input name="nom_regroupement" defaultValue={this.state.nom_regroupement}  type="text" className="form-control" />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress2" className="">Regroupement d'Appartenance</label>
                                    <input name="regroupement_appartenance" defaultValue={this.state.regroupement_appartenance} type="text" className="form-control" />
                                </div>
                            
                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
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
                                     ref={modifCodeRegroupementInput => this.modifCodeRegroupementInput = modifCodeRegroupementInput} defaultValue={this.state.objetModif.code_regroupement}  type="text" className="form-control" />
                                    </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nom du Regroupement</label>
                                    <input 
                                    ref={modifNomRegroupementInput => this.modifNomRegroupementInput = modifNomRegroupementInput}
                                     defaultValue={this.state.objetModif.nom_regroupement}  type="text" className="form-control" />
                                </div>
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress2" className="">Regroupement d'Appartenance</label>
                                    <input 
                                    ref={modifRegroupAppartenanceInput => this.modifRegroupAppartenanceInput = modifRegroupAppartenanceInput}
                                     defaultValue={this.state.objetModif.regroupement_appartenance} type="text" className="form-control" />
                                </div>
                            
                                <button type="submit" className="mt-2 btn btn-primary">Modifier</button>
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

const mapStateToProps = state => {
    return {
        structures_etablissements: state.structures_etablissements.items,
        loading: state.structures_etablissements.loading,

    }
  }

export default connect(mapStateToProps)(StructureEtablissement)
