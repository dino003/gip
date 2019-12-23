import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import 'react-toastify/dist/ReactToastify.css';
import TauxTvaItem from '../../components/codifications/TauxTvaItem';
import ModifierTauxTva from '../forms/ModifierTauxTva';
import inputStyle from '../../utils/inputStyle';


 class TauxTva extends Component {

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
        
            const action = {type: "REMOVE_TVA", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_taux_tva/' + id)
        }
       
    }
    onTvaDefaut = (id) => {
         this.setState({isDefautDeclench: !this.state.isDefautDeclench})

        axios.get('/api/modifier_taux_tva_defaut/' + id).then(response => {
            const action = {type: "GET_TVA", value: response.data}
            this.props.dispatch(action) 
         this.setState({isDefautDeclench: !this.state.isDefautDeclench})
 
        })
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
        var structures = this.props.tva
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

      onEditSubmit = ( taux, libelle) => {
       //  e.preventDefault()
        let modif = this.state.objetModif


          axios.post('/api/modifier_taux_tva/' + modif.id, {
            taux: taux,
            libelle: libelle,
           // defaut: defaut,
            
          }).then(response => {
            const action = {type: "EDIT_TVA", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    
           // console.log(sin)
      }

      verificationFormulaire () {
        if(this.taux.value == ''){
            return "Le taux est obligatoire !"
        } else{
            return null
        }
    }

      enregistrerOperation = (e) => {
          e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/ajouter_taux_tva', 
               {
                  // code: this.code.value,
                   taux: this.taux.value,
                   libelle: this.libelle.value,
                 //  defaut: this.defaut.value,
            }
            ).then(response => {
                const action = {type: "ADD_TVA", value: response.data}
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
             <th>Libéllé</th>
              <th>Taux</th>
              <th>Défaut ? </th>
          </tr>
          </thead>
          <tbody>
           {this.props.tva.map((st, index) => 
               <TauxTvaItem
                key={st.id} 
                index={index}
                item={st}
                onEdit={this.onEdit}
                onTvaDefaut={this.onTvaDefaut}
                isDefautDeclench={this.state.isDefautDeclench}
                onDelete={this.onDelete}
                 />
               )}
        
          </tbody>
      </table>)
      }

      renderLoading(){
          return  <span style={{textAlign: 'center'}}>

          <Loader
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
                           <h5 className="card-title">Gestion des Taux de T.V.A
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
                              
                                    
                                <div className="form-row">
                                 

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Taux</label>
                                            <input name="taux"
                                            style={inputStyle}
                                            ref={taux => this.taux = taux}
                                              type="number" step="0.1" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Libéllé</label>
                                            <input name="libelle"
                                            ref={libelle => this.libelle = libelle}
                                              type="text" className="form-control" /></div>
                                    </div>
                                   
                                </div>

                                {/* <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Libéllé</label>
                                            <input name="libelle"
                                            ref={libelle => this.libelle = libelle}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Par Défaut</label>
                                            <select className="form-control"
                                     ref={defaut => this.defaut = defaut}
                                        onChange={this.setField}
                                     name="defaut">
                                         <option value={0}>Non</option>
                                         <option value={1}>Oui</option>
                                    </select>
                                              
                                         </div>
                                    </div>
                                   
                                </div> */}
                            

                             
                            
                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div> ) 
        : 
        <ModifierTauxTva 
        item={this.state.objetModif}
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
        tva: state.tva.items,
        loading: state.tva.loading,

    }
  }

export default connect(mapStateToProps)(TauxTva)
