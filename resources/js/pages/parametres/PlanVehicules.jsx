import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import 'react-toastify/dist/ReactToastify.css';
import PlanGeographiqueItem from '../../components/codifications/PlanGeographiqueItem'

import { Container, Button, Link } from 'react-floating-action-button'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { element } from 'prop-types';
import { unmountComponentAtNode } from 'react-dom';

// import '../../components/Tree.scss'





 class PlanVehicule extends Component {

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
            isFormSubmitted: false,
            premier_niveau_structure_vehicule: this.props.structure_vehicules[0] || null,
            isAjouterEnfant: false,
            prochain_type: null,
            libelle_nouveau_plan_enfant: null,
            parent_id: null,
            isEditEnfant: false,
            prochain_type_edit: null,
            libelle_nouveau_plan_enfant_edit: null,
            parent_id_edit: null,
            objetEditPlanEnfant: null
        }

        this.ajouterEnfant = this.ajouterEnfant.bind(this)
        this.toggleFormEnfant = this.toggleFormEnfant.bind(this)
        this.toggleFormEnfantEdit = this.toggleFormEnfantEdit.bind(this)

        this.handleSubmitFormPlanEnfant = this.handleSubmitFormPlanEnfant.bind(this)
        this.isAjoutPossible = this.isAjoutPossible.bind(this);
        this.onEditPlanEnfant = this.onEditPlanEnfant.bind(this);
        this.onSupprimerPlan = this.onSupprimerPlan.bind(this);

        this.formRef = null;
        this.base = this.state
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
        if(this.libelle.value == '' ){
            return "Le Libéllé est obligatoire !"
        } else{
            return null
        }
    }

    verificationFormulairePlanEnfant () {
        if(this.libelle_nouveau_plan_enfant.value == '' ){
            return "Le Libéllé est obligatoire !"
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



    ajouterEnfant(element){
      //  var plan = this.props.plan_vehicules.find(pl => pl.id == element.id)
      var structure_vehicule = element.structure_vehicule ? element.structure_vehicule : this.props.structure_vehicules.find(st => st.id == element.structure_vehicule_id)
        var structure_suivante = this.props.structure_vehicules.find(st => st.niveau == Number(structure_vehicule.niveau + 1))
        this.setState({
            isAjouterEnfant: true,
            isEditEnfant: false,
            prochain_type: structure_suivante,
            parent_id: element.id
        })
      //  this.closeEdit()
    }

    onEditPlanEnfant(element){
        var structure_vehicule = element.structure_vehicule ? element.structure_vehicule : this.props.structure_vehicules.find(st => st.id == element.structure_vehicule_id)
        var structure_suivante = this.props.structure_vehicules.find(st => st.niveau == Number(structure_vehicule.niveau ))
        this.setState({
            objetEditPlanEnfant: element,
            prochain_type_edit: structure_suivante,
            libelle_nouveau_plan_enfant_edit: element.libelle,
            isAjouterEnfant: false,
            isEditEnfant: true,

        })
    }

    onSupprimerPlan(element){

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
            if(element.children && element.children.length){
                let message = `${element.libelle} contient des ramifications
                en le supprimant cela supprimera toutes ses ramifications dans le plan Géographique
                Souhaitez-vous continuer ?`

                if(confirm(message) ){

                  axios.delete('/api/supprimer_plan_vehicule/' + element.id).then( _ => {
                    axios.get('/api/plan_vehicules').then((response) => {

                        const action2 = {type: "GET_PLAN_VEHICULE", value: response.data}
                        this.props.dispatch(action2)
                    } )

                })
                }
            }else{
              axios.delete('/api/supprimer_plan_vehicule/' + element.id).then( _ => {
                axios.get('/api/plan_vehicules').then((response) => {

                    const action2 = {type: "GET_PLAN_VEHICULE", value: response.data}
                    this.props.dispatch(action2)
                } )

            })
            }


        }
    }

    isAjoutPossible(element){


            var structure_correspondante = this.props.structure_vehicules.find(st => st.id == element.structure_vehicule_id)

            return  structure_correspondante.niveau != this.getMaxNiveau();

    }



    toggleFormEnfant(){
        this.setState({
            isAjouterEnfant: false,
            isEditEnfant: false,
            prochain_type: null,
            parent_id: null
        })
    }

    toggleFormEnfantEdit(){
        this.setState({
            objetEditPlanEnfant: null,
            isAjouterEnfant: false,
            isEditEnfant: false,
            prochain_type_edit: null,
            parent_id_edit: null
        })
    }

   async handleSubmitFormPlanEnfant(){
        if(this.verificationFormulairePlanEnfant() == null){
          var parent_direct = this.props.plan_vehicules.find(pl => pl.id == this.state.parent_id)
          var niveau_actuel = parent_direct.structure_vehicule.niveau
          var objet_a_envoyer = {}

          this.setState({isFormSubmitted: true})

             // const struc = this.props.structures_etablissements.find(st =>)
           await axios.post('/api/ajouter_plan_vehicule',
               {
                   libelle: this.libelle_nouveau_plan_enfant.value,
                   structure_vehicule_id: this.state.prochain_type.id,
                   parent: this.state.parent_id
            }
            ).then(response => {
              if(niveau_actuel == 1){
                objet_a_envoyer = {

                  niveau_1: this.state.parent_id,
                  niveau_2: response.data.id

                }
              }else if(niveau_actuel == 2){
                var pre_niveau1 = this.props.plan_vehicules.find(pl => pl.id == this.state.parent_id)
               var premier_niveau = this.props.plan_vehicules.find(pl => pl.id == pre_niveau1.parent)
                objet_a_envoyer = {
                  niveau_1: premier_niveau.id,
                  niveau_2: this.state.parent_id,
                  niveau_3: response.data.id

                }
              }else if(niveau_actuel == 3){
                var pre_niveau2 = this.props.plan_vehicules.find(pl => pl.id == this.state.parent_id)
                var deuxieme_niveau = this.props.plan_vehicules.find(pl => pl.id == pre_niveau2.parent)
                var troisieme_niveau = this.props.plan_vehicules.find(pl => pl.id == deuxieme_niveau.parent)

                objet_a_envoyer = {
                   niveau_1: troisieme_niveau.id,
                   niveau_2: deuxieme_niveau.id,
                   niveau_3: this.state.parent_id,
                   niveau_4: response.data.id

                 }

              }else if(niveau_actuel == 4){
                var pre_niveau2 = this.props.plan_vehicules.find(pl => pl.id == this.state.parent_id)
                var deuxieme_niveau = this.props.plan_vehicules.find(pl => pl.id == pre_niveau2.parent)
                var troisieme_niveau = this.props.plan_vehicules.find(pl => pl.id == deuxieme_niveau.parent)
                var quatrieme_niveau = this.props.plan_vehicules.find(pl => pl.id == troisieme_niveau.parent)

                objet_a_envoyer = {
                  niveau_1: quatrieme_niveau.id,
                   niveau_2: troisieme_niveau.id,
                   niveau_3: deuxieme_niveau.id,
                   niveau_4: this.state.parent_id,
                   niveau_5: response.data.id

                 }

              }else if(niveau_actuel == 5){
                var pre_niveau2 = this.props.plan_vehicules.find(pl => pl.id == this.state.parent_id)
                var deuxieme_niveau = this.props.plan_vehicules.find(pl => pl.id == pre_niveau2.parent)
                var troisieme_niveau = this.props.plan_vehicules.find(pl => pl.id == deuxieme_niveau.parent)
                var quatrieme_niveau = this.props.plan_vehicules.find(pl => pl.id == troisieme_niveau.parent)
                var cinquieme_niveau = this.props.plan_vehicules.find(pl => pl.id == quatrieme_niveau.parent)

                objet_a_envoyer = {
                  niveau_1: cinquieme_niveau.id,

                  niveau_2: quatrieme_niveau.id,
                   niveau_3: troisieme_niveau.id,
                   niveau_4: deuxieme_niveau.id,
                   niveau_5: this.state.parent_id,
                   niveau_6: response.data.id

                 }

              }

              axios.post('/api/modifier_plan_vehicule/' + response.data.id, objet_a_envoyer).then(_ => {
                axios.get('/api/plan_vehicules').then((response) => {

                  const action2 = {type: "GET_PLAN_VEHICULE", value: response.data}
                  this.props.dispatch(action2)
              } )
              })

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

    onEditSubmitPlanEnfant = (e) => {
        e.preventDefault()
      let modif = this.state.objetEditPlanEnfant
      this.setState({isFormSubmitted: true})
        axios.post('/api/modifier_plan_vehicule/' + modif.id, {
          libelle: this.libelle_nouveau_plan_enfant_edit.value,
        }).then(response => {
          // const action = {type: "EDIT_STRUCTURE_ETABLISSEMENT", value: response.data}
          // this.props.dispatch(action)
          axios.get('/api/plan_vehicules').then((response) => {

              const action2 = {type: "GET_PLAN_VEHICULE", value: response.data}
              this.props.dispatch(action2)
          } )
          this.setState({isFormSubmitted: false})
          this.toggleFormEnfantEdit();

        }).catch(error =>{
          this.setState({isFormSubmitted: false})
          console.log(error)
        } )


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

      getNiveaus = () => {
        const events = [];
        this.props.structure_vehicules.map(event => {
            if(!event.niveau) return;
            return events.push(event.niveau)
        })

        return events
    }

    getMaxNiveau = () => {
        var niveau = Math.max(...this.getNiveaus(), 0)
        if (niveau == 0) return 1;
        return Number(niveau );

    }

    getFirstStructure = () => {
        return this.props.structure_vehicules[0]
    }

      enregistrerPlanGeographique = async (e) => {
          e.preventDefault()

          if(this.verificationFormulaire() == null){
            this.setState({isFormSubmitted: true})

             // const struc = this.props.structures_etablissements.find(st =>)
           await axios.post('/api/ajouter_plan_vehicule',
               {
                   libelle: this.libelle.value,
                   structure_vehicule_id: this.state.premier_niveau_structure_vehicule.id,


            }
            ).then(response => {
              axios.post('/api/modifier_plan_vehicule/' + response.data.id, {
                niveau_1: response.data.id
              }).then(_ => {
                axios.get('/api/plan_vehicules').then((response) => {

                  const action2 = {type: "GET_PLAN_VEHICULE", value: response.data}
                  this.props.dispatch(action2)
              } )
              })

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
              <th>Type</th>
              <th>Libellé</th>
          </tr>
          </thead>
          <tbody>
           {this.props.plan_vehicules.map((st, index) =>
               <PlanGeographiqueItem
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
         options={this.props.plan_vehicules.filter(plan => plan.parent == null)}
         onChange={(selectedOptions) => this.setState({selectedOptions})}
         onPlusClicked={this.ajouterEnfant}
         onEditPlanEnfant={this.onEditPlanEnfant}
         isAjoutPossible={this.isAjoutPossible}
         onSupprimerPlan={this.onSupprimerPlan}
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

                           <h5 className="card-title">Gestion du plan des Véhicules

                   {/*        <span className="pull-right">


                                           {this.props.structures_etablissements.length ?
                                           <ReactHTMLTableToExcel
                                              id="test-table-xls-button"
                                              className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                              table="export"
                                              filename="Plan"
                                              sheet="feuille1"
                                              buttonText="Ecran -> Liste"/> : null }
                              </span>
                            */}



                          </h5>
                          <br />

                            {this.state.isAjouterEnfant ? <React.Fragment>
                                <div className="row">

                            <div className="col-md-4">
                                     <input
                                       ref={prochain_type => this.prochain_type = prochain_type}
                                       onChange={this.setField}
                                        name="prochain_type"
                                        readOnly
                                        value={this.state.prochain_type.libelle}
                                        placeholder="type"
                                       type="text" className="form-control" />
                                     </div>

                                    <div className="col-md-4">
                                    <input
                                       ref={libelle_nouveau_plan_enfant => this.libelle_nouveau_plan_enfant = libelle_nouveau_plan_enfant}
                                       onChange={this.setField}
                                        name="libelle_nouveau_plan_enfant"
                                        placeholder="Libéllé "
                                       type="text" className="form-control " />
                                    </div>

                                    <div className="col-md-2">
                                      <button
                                       disabled={this.state.isFormSubmitted || this.state.libelle_nouveau_plan_enfant == null || !this.state.libelle_nouveau_plan_enfant.length}
                                       onClick={this.handleSubmitFormPlanEnfant}
                                       className="mb-2 mr-2 btn-transition btn btn-outline-success" >{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>

                                    </div>

                                    <div className="col-md-2">
                                    <button title=" Quitter" className="mb-2 mr-2 btn-transition btn btn-outline-warning"
                                      onClick={this.toggleFormEnfant}
                                      >
                                   <i className="fa fa-times"></i> {' '} Fermer

                                  </button>
                                    </div>
                            </div>
                            <br />
                            </React.Fragment> : null}

                            {/* modification plan enfant */}

                            {this.state.isEditEnfant ? <React.Fragment>
                                <div className="row">

                            <div className="col-md-4">
                                     <input
                                       ref={prochain_type => this.prochain_type = prochain_type}
                                       onChange={this.setField}
                                        name="prochain_type"
                                        readOnly
                                        defaultValue={this.state.prochain_type_edit.libelle}
                                        placeholder="type"
                                       type="text" className="form-control" />
                                     </div>

                                    <div className="col-md-4">
                                    <input
                                       ref={libelle_nouveau_plan_enfant_edit => this.libelle_nouveau_plan_enfant_edit = libelle_nouveau_plan_enfant_edit}
                                       onChange={this.setField}
                                        name="libelle_nouveau_plan_enfant_edit"
                                        placeholder="Libéllé "
                                        defaultValue={this.state.libelle_nouveau_plan_enfant_edit}
                                       type="text" className="form-control " />
                                    </div>

                                    <div className="col-md-2">
                                      <button
                                       disabled={this.state.isFormSubmitted || this.state.libelle_nouveau_plan_enfant_edit == null || !this.state.libelle_nouveau_plan_enfant_edit.length}
                                       onClick={this.onEditSubmitPlanEnfant}
                                       className="mb-2 mr-2 btn-transition btn btn-outline-success" >{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>

                                    </div>

                                    <div className="col-md-2">
                                    <button title=" Quitter" className="mb-2 mr-2 btn-transition btn btn-outline-warning"
                                      onClick={this.toggleFormEnfantEdit}
                                      >
                                   <i className="fa fa-times"></i> {' '} Fermer

                                  </button>
                                    </div>
                            </div>
                            <br />
                            </React.Fragment> : null}

                            {/* Fin modification plan enfant */}

                          <div className="row">
                           {/*    <div className="col-md-7">
                              <div className="table-responsive">
                              {!this.props.loading ? this.renderlist() : this.renderLoading()}
                           </div>
                              </div> */}
                              <div className="col-md-12">
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
                        <form ref={(ref) => this.formRef = ref} className="p-3" onChange={this.setField} onSubmit={this.enregistrerPlanGeographique}>
                            <br />

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Type </label>
                                    <input name="type_plan"
                                    ref={type_plan => this.type_plan = type_plan}
                                    readOnly
                                    value={this.state.premier_niveau_structure_vehicule.libelle}
                                       type="text" className="form-control" />
                                    </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Libéllé</label>
                                    <input name="libelle"
                                    ref={libelle => this.libelle = libelle}

                                      type="text" className="form-control" />
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
                        tooltip="Ajouter un Plan Parent"
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


// Recursive component
const OptionsList = ({ options, selectedOptions, onChange, onPlusClicked, isAjoutPossible, onEditPlanEnfant, onSupprimerPlan }) => {

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

    const handleAjouterEnfant = (element) => {
     //   window.alert(element.libelle)
     onPlusClicked(element)
    }


    const handleSubOptionsListChange = (optionId, subSelections) => {
      // add sub selections to current optionId
      selectedOptions[optionId] = subSelections;
      // call onChange function given by parent
      onChange(selectedOptions);
    }

    return (
      <div>
        {options.map((option) => (
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
             </span> : null} {' '}

              {`${option.libelle} `} {' '}
                {isAjoutPossible(option) ? <span style={{cursor: 'pointer'}} onClick={() => {
                handleAjouterEnfant(option)
                 }}>
                    <i className="fa fa-plus-circle"></i>
             </span> : null} {' '}
                  <span style={{cursor: 'pointer'}} onClick={() => {
                onEditPlanEnfant(option)
                 }}>
                    <i className="fa fa-edit"></i>
             </span> {' '}
             <span style={{cursor: 'pointer'}} onClick={() => {
                onSupprimerPlan(option)
                 }}>
                    <i className="fa fa-trash"></i>
             </span>
            {/* <span title={`Ajouter une Structure Ayant pour Regroupement D'appartenance ${option.code_regroupement}`} style={{cursor: 'pointer'}} onClick={ajouterEnfant(option)}>  <i className="fa fa-plus-circle"></i> </span> */}
              </div>
            {/* Base Case */}
            {(option.children.length > 0 && selectedOptions[option.id]) &&
              <OptionsList
                options={option.children}
                isAjoutPossible={(option) => isAjoutPossible(option)}
                onPlusClicked={(option) => handleAjouterEnfant(option)}
                onEditPlanEnfant={(option) => onEditPlanEnfant(option)}
                onSupprimerPlan={(option) => onSupprimerPlan(option)}
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
        structure_vehicules: state.structure_vehicules.items,
        plan_vehicules: state.plan_vehicules.items


    }
  }

export default connect(mapStateToProps)(PlanVehicule)
