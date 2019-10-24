import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import 'react-toastify/dist/ReactToastify.css';
import NatureConsommationItem from '../../components/codifications/NatureConsommationItem';
import ModifierNatureConsommation from '../forms/ModifierNatureConsommation';


 class NatureConsommations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            isEdit: false,
            objetModif: undefined,
            editIndex: undefined,
          
        }

        this.formRef = null;
        this.base = this.state

        
    }

  
   

    onDelete = (id) => {

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_NATURE_CONSOMMATION", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_nature_consommation/' + id)
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
        var structures = this.props.natures_consommations
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

      onEditSubmit = ( nature_conso, cat, carte, unite ) => {
       //  e.preventDefault()
        let modif = this.state.objetModif


          axios.post('/api/modifier_nature_consommation/' + modif.id, {
            nature_consomation: nature_conso,
            categorie: cat,
            carte_associe: carte,
            unite_mesure: unite
          }).then(response => {
            const action = {type: "EDIT_NATURE_CONSOMMATION", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    
           // console.log(sin)
      }

      verificationFormulaire () {
        if(this.nature_consomation.value == undefined || !this.nature_consomation.value.length){
            return "La nature de consommation est obligatoire !"
        }else if(this.categorie.value == undefined || !this.categorie.value.length){
          return "La catégorie est obligatoire !"
        }else if(this.unite_mesure.value == undefined || !this.unite_mesure.value.length){
            return "L'unité de mesure est obligatoire !"
          }else if(this.carte_associe.value == undefined || !this.carte_associe.value.length){
            return "La carte associée est obligatoire !"
          } else{
            return null
        }
    }

      enregistrerNatureConsommation = async (e) => {
          e.preventDefault()

          if(this.verificationFormulaire() == null){
           await axios.post('/api/ajouter_nature_consommation', 
               {
                 nature_consomation: this.nature_consomation.value,
                 categorie:this.categorie.value,
                 unite_mesure: this.unite_mesure.value,
                 carte_associe: this.carte_associe.value

            }
            ).then(response => {
                const action = {type: "ADD_NATURE_CONSOMMATION", value: response.data}
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
              <th>Nature des consommations</th>
              <th>Catégorie</th>
              <th>Unité de mesure </th>
              <th>Carte associé </th>
          </tr>
          </thead>
          <tbody>
           {this.props.natures_consommations.map((st, index) => 
               <NatureConsommationItem
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
              type="BallTriangle"
              color="#00BFFF"
              height={100}
              width={100}
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
                        <form ref={(ref) => this.formRef = ref} className="p-3" onChange={this.setField} onSubmit={this.enregistrerNatureConsommation}>
                            <br />
                              
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature des consommations</label>
                                    <input name="nature_consomation"
                                     ref={nature_consomation => this.nature_consomation = nature_consomation}
                                      type="text" className="form-control" />
                                    </div>

                                    <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Catégorie</label>
                                    <select className="form-control"
                                     ref={categorie => this.categorie = categorie}
                                        onChange={this.setField}
                                     name="categorie">
                                         <option value="Carburant">Carburant</option>
                                         <option value="Péage">Péage</option>

                                        <option value="Entretien">Entretien</option>
                                        <option value="Réparation">Réparation</option>
                                        <option value="Matériel/Consomable">Matériel/Consomable</option>
                                        <option value="Autres/Divers">Autres/Divers</option>
                                        <option value="Frais">Frais</option>

                                    </select>
                                </div>

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Unité de mesure</label>
                                    <select className="form-control"
                                     ref={unite_mesure => this.unite_mesure = unite_mesure}
                                        onChange={this.setField}
                                     name="unite_mesure">
                                        <option value="Litre">Litre</option>
                                        <option value="Nombre">Nombre</option>
                                        <option value="Kva">Kva</option>
                                        <option value="Kgs">Kgs</option>
                                        <option value="Montant">Montant</option>
                                        <option value="Autre">Autre</option>

                                    </select>
                                </div>

                                
                           

                                
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Carte associéé</label>
                                    <select className="form-control"
                                     ref={carte_associe => this.carte_associe = carte_associe}
                                        onChange={this.setField}
                                     name="carte_associe">
                                        <option value="Carte carburant">Carte carburant</option>
                                        <option value="Carte péage">Carte péage</option>
                                        <option value="Autre carte">Autre carte</option>

                                    </select>
                                </div>
                             
                            
                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div> ) 
        : 
        <ModifierNatureConsommation item={this.state.objetModif}
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
        natures_consommations: state.natures_consommations.items,
        loading: state.natures_consommations.loading,

    }
  }

export default connect(mapStateToProps)(NatureConsommations)
