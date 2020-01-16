import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'


import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import inputStyle from '../../utils/inputStyle';




 class ModifierUtilisateur extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
            isFormSubmitted: false,
            hidePassword: true,
            userNameIsUsed: false
        }
    }

    // componentDidMount(){
    //     axios.get('/api/voir_user/' + this.props.match.params.utilisateur_id).then(response => {
    //         // const action = {type: "GET_ENTITE", value: response.data}
    //         //  this.props.dispatch(action)
    //         this.setState({utilisateurModif: response.data})
    //   })
    // }

 

    setField = (event) => {
      //  this.setState({[e.target.name]: e.target.value})
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

    managePasswordVisibility = () =>
    {
    // function used to change password visibility
        this.setState({ hidePassword: !this.state.hidePassword });

    }

    checkUser = async() => {
        if(this.username.value){
            const response = await axios.post('/api/verif_edit_user/'
             + this.state.utilisateurModif.id, {username : this.username.value})

            const res = response.data;

            if(res == true){
                this.setState({userNameIsUsed: false})
                return true;
            }
            this.setState({userNameIsUsed: true})

            return false;
        }

    }

    renderUserNameConfirm = () => {
        if(this.username.value){
            if(this.checkUser()){

            }
        }
    }

      verificationFormulaire () {
       if(this.checkUser()){
        if(this.username.value == undefined || !this.username.value.length){
            return "Le Code utilisateur est obligatoire !"
        }else if(this.name.value == undefined || !this.name.value.length){
            return "Le Nom est obligatoire !"
        }else if(this.entite.value == undefined || !this.entite.value.length){
          return "L' entité d'affectation est obligatoire !"
        }else if(this.password.value == undefined || !this.password.value.length){
            return "Le Mot de passe est obligatoire !"
        }
        else{
            return null
        }
       }else{
           return "Ce code utilisateur est déja utilisé !"
       }
      }

      enregistrerPersonnel = (e) => {
        e.preventDefault()
          if(this.verificationFormulaire() == null){
              this.setState({isFormSubmitted: true})
            const utilisateurModif = this.props.utilisateurs.find(ut => ut.id == this.props.match.params.utilisateur_id)

            axios.post('/api/modifier_user_fonction/' + utilisateurModif.autorisation.id, {
                creation_vehicule: this.creation_vehicule.checked,
                modification_vehicule: this.modification_vehicule.checked,
                suppresion_vehicule: this.suppresion_vehicule.checked,
                commande_vehicule: this.commande_vehicule.checked,
                utilisation_vehicule: this.utilisation_vehicule.checked,
                reservations: this.reservations.checked,
                intervention: this.intervention.checked,
                contrat_assurance: this.contrat_assurance.checked,
                ordre_de_mission: this.ordre_de_mission.checked,
                consomation_vehicule: this.consomation_vehicule.checked,
                cout_vehicule: this.cout_vehicule.checked,
                gestion_stock_piece: this.gestion_stock_piece.checked,
                amende_vehicule: this.amende_vehicule.checked,
                module_des_commandes: this.module_des_commandes.checked,
            }).catch(error => console.log(error))
           // console.log(this.state)
            axios.post('/api/modifier_user/' + utilisateurModif.id, {
                name: this.name.value,
                username: this.username.value,
                email: this.email.value,
                date_creation: this.date_creation.value,
                date_modification: this.date_modification.value,
                entite: this.entite.value,
                matricule: this.matricule.value,
                telephonne_bureau: this.telephonne_bureau.value,
                portable: this.portable.value,
                password: this.password.value,
             
            }).then(response => {
                
               const action = {type: "EDIT_UTILISATEUR", value: response.data}
               this.props.dispatch(action)
               this.setState({isFormSubmitted: false})

             this.props.history.goBack()
            }).catch(error => {
                this.setState({isFormSubmitted: false})

                console.log(error) 
            } )

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
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
        //console.log(this.checkUser())
       // const {utilisateurModif} = this.state  
        const utilisateurModif = this.props.utilisateurs.find(ut => ut.id == this.props.match.params.utilisateur_id)
      
        return (
            <div className="app-main__inner">
                {utilisateurModif != undefined ? 
              
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Fichier des Utilisateurs

                        </h5>
                            <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>

                                <div className="form-row">
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Code utilisateur *</label>
                                            <input name="username"
                                            style={inputStyle}
                                            ref={username => this.username = username}
                                            defaultValue={utilisateurModif.username}
                                              type="text" className={this.state.userNameIsUsed ?
                                                 "form-control is-invalid" : "form-control"} /></div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Mot de passe * {'              '}  
                                                <span onClick={this.managePasswordVisibility} style={{cursor: 'pointer'}}>
                                                <i className={this.state.hidePassword ?
                                                 "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                </span>
                                                 </label>
                                          
                                            <input name="password"
                                            style={inputStyle}

                                            defaultValue={utilisateurModif.password}
                                            ref={password => this.password = password}
                                              type={this.state.hidePassword ? "password" : "text"} className="form-control" />

                                        </div>
                                    </div>
                                   
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Nom et Prénom *</label>
                                            <input name="name"
                                            style={inputStyle}

                                            defaultValue={utilisateurModif.name}
                                            ref={name => this.name = name}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                 
                                </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                    <label  className="">Affectation (entité d'appartenance)</label>
                                        <select name="entite" 
                                        ref={entite => this.entite = entite}
                                        defaultValue={utilisateurModif.entite ? utilisateurModif.entite.entite : null }
                                         className="form-control">
                                            <option value={null}></option>
                                            {this.props.entites.map((ent, index) => 
                                             <option key={ent.id} value={ent.id}>{ent.entite} || {ent.nom_entite}</option>

                                                )}
                                        </select>
                                
                                        </div>
                                        <div className="col-md-3">
                                            <label >Créé le</label>

                                            <input name="date_creation"
                                            ref={date_creation => this.date_creation = date_creation}
                                            defaultValue={utilisateurModif.date_creation}
                                            readOnly
                                              type="date" 
                                              className="form-control" />
                                        </div>
                                        <div className="col-md-3">
                                            <label >Modifié le</label>

                                            <input name="date_modification"
                                            defaultValue={utilisateurModif.date_modification}
                                            ref={date_modification => this.date_modification = date_modification}
                                              type="date" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Matricule de l'utilisateur dans l'établissement</label>
                                            <input name="matricule"
                                            defaultValue={utilisateurModif.matricule}
                                            ref={matricule => this.matricule = matricule}
                                             type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Telephonne bureau</label>
                                            <input name="telephonne_bureau" 
                                            defaultValue={utilisateurModif.telephonne_bureau}
                                            ref={telephonne_bureau => this.telephonne_bureau = telephonne_bureau}
                                             type="text" className="form-control" /></div>
                                    </div>
                                  
                                    <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            <label >Telephonne Portable</label>
                                            <input name="portable"
                                            defaultValue={utilisateurModif.portable}
                                            ref={portable => this.portable = portable}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                    <div className="position-relative form-group">
                                            <label >Adresse email</label>
                                            <input name="email"
                                            defaultValue={utilisateurModif.email}
                                            ref={email => this.email = email}
                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>


                              
                                <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Création de véhicule ? </label>
                                       </div>
                                   </div>

                                   
                                   <div className="col-md-2">
                                   <div className="position-relative form-group">
                                           
                                   <input type="checkbox"
                                       ref={creation_vehicule => this.creation_vehicule = creation_vehicule}
                                       onChange={this.setField}
                                       defaultChecked={utilisateurModif.autorisation.creation_vehicule}
                                       name="creation_vehicule" className="" />
                                       </div>
                                   </div>

                                 
                                   <div className="col-md-2"></div>
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Modification de véhicule ?</label>
                                       </div>
                                   </div>

                                   <div className="col-md-2">
                                   <div className="position-relative form-group">
                                           
                                   <input type="checkbox"
                                       ref={modification_vehicule => this.modification_vehicule = modification_vehicule}
                                       onChange={this.setField}
                                       defaultChecked={utilisateurModif.autorisation.modification_vehicule}
                                       name="modification_vehicule" className="" />
                                       </div>
                                   </div>
                              

                               </div>
                                <hr />

                                <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Suppression de véhicule ? </label>
                                       </div>
                                   </div>
                                 
                                    
                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={suppresion_vehicule => this.suppresion_vehicule = suppresion_vehicule}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.suppresion_vehicule}
                                        name="suppresion_vehicule" className="" />
                                        </div>
                                    </div>

                                   <div className="col-md-2"></div>
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Commande de véhicule ?</label>
                                       </div>
                                   </div>
                                
                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={commande_vehicule => this.commande_vehicule = commande_vehicule}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.commande_vehicule}
                                        name="commande_vehicule" className="" />
                                        </div>
                                    </div>
                           
                               </div>
                               <hr />

                               <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Utilisation des véhicules ? </label>
                                       </div>
                                   </div>
                                 
                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={utilisation_vehicule => this.utilisation_vehicule = utilisation_vehicule}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.utilisation_vehicule}
                                        name="utilisation_vehicule" className="" />
                                        </div>
                                    </div>
                                 

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Réservation des véhicules ? </label>
                                       </div>
                                   </div>
                                
                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={reservations => this.reservations = reservations}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.reservations}
                                        name="reservations" className="" />
                                        </div>
                                    </div>
                                
                               
                               </div>
                               <hr />

                               <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Interventions dur les véhicules ? </label>
                                       </div>
                                   </div>
                                
                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={intervention => this.intervention = intervention}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.intervention}
                                        name="intervention" className="" />
                                        </div>
                                    </div>
                                
                                

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Contrats Assurances et Sinistres ? </label>
                                       </div>
                                   </div>
                                 

                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={contrat_assurance => this.contrat_assurance = contrat_assurance}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.contrat_assurance}
                                        name="contrat_assurance" className="" />
                                        </div>
                                    </div>
                               

                               
                               </div>
                               <hr />

                               <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Ordres de missions ? </label>
                                       </div>
                                   </div>
                              
                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={ordre_de_mission => this.ordre_de_mission = ordre_de_mission}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.ordre_de_mission}
                                        name="ordre_de_mission" className="" />
                                        </div>
                                    </div>
                                  

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Consomation des véhicules ? </label>
                                       </div>
                                   </div>
                              
                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={consomation_vehicule => this.consomation_vehicule = consomation_vehicule}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.consomation_vehicule}
                                        name="consomation_vehicule" className="" />
                                        </div>
                                    </div>
                                

                               
                               </div>
                               <hr />
                               <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Coûts des véhicules ? </label>
                                       </div>
                                   </div>
                                 

                               
                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={cout_vehicule => this.cout_vehicule = cout_vehicule}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.cout_vehicule}
                                        name="cout_vehicule" className="" />
                                        </div>
                                    </div>
                              

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Gestion des stocks: pièces détachées ? </label>
                                       </div>
                                   </div>
                       

                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={gestion_stock_piece => this.gestion_stock_piece = gestion_stock_piece}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.gestion_stock_piece}
                                        name="gestion_stock_piece" className="" />
                                        </div>
                                    </div>
                             
                               </div>
                               <hr />

                               <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Amendes des véhicules ? </label>
                                       </div>
                                   </div>
                              

                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={amende_vehicule => this.amende_vehicule = amende_vehicule}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.amende_vehicule}
                                        name="amende_vehicule" className="" />
                                        </div>
                                    </div>
                        

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Module des commandes ? </label>
                                       </div>
                                   </div>
                                
                                   <div className="col-md-2">
                                    <div className="position-relative form-group">
                                            
                                    <input type="checkbox"
                                        ref={module_des_commandes => this.module_des_commandes = module_des_commandes}
                                        onChange={this.setField}
                                        defaultChecked={utilisateurModif.autorisation.module_des_commandes}
                                        name="module_des_commandes" className="" />
                                        </div>
                                    </div>
                                 

                               </div>
                               <hr />

                            

                               <button disabled={this.state.isFormSubmitted} type="submit" className="mt-2 btn btn-primary">{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>
                           
                                <span onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
                            </form>
                        </div>
                    </div>
                : this.renderLoading() }
                    <ToastContainer autoClose={8000} />
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        entites: state.entites.items,
        utilisateurs: state.utilisateurs.items
    }
  }

export default connect(mapStateToProps)(ModifierUtilisateur)