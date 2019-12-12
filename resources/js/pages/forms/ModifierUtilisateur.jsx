import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'


import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"




 class ModifierUtilisateur extends Component {
    constructor(props) {
        super(props);
        this.state = {
           // date_creation: new Date(),
            hidePassword: true,
            userNameIsUsed: false,
            creation_vehicule : 'oui',
            modification_vehicule: 'oui',
            suppresion_vehicule: 'oui',
            commande_vehicule: 'oui',
            utilisation_vehicule: 'L/E',
            reservations: 'L/E',
            intervention: 'L/E',
            contrat_assurance: 'L/E',
            ordre_de_mission: 'L/E',
            consomation_vehicule: 'L/E',
            cout_vehicule: 'L/E',
            gestion_stock_piece: 'L/E',
            amende_vehicule: 'L/E',
            module_des_commandes: 'L/E',

            utilisateurModif: undefined

        }
    }

    componentDidMount(){
        axios.get('/api/voir_user/' + this.props.match.params.utilisateur_id).then(response => {
            // const action = {type: "GET_ENTITE", value: response.data}
            //  this.props.dispatch(action)
            this.setState({utilisateurModif: response.data})
      })
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

            axios.post('/api/modifier_user_fonction/' + this.state.utilisateurModif.autorisation.id, {
                creation_vehicule: this.state.creation_vehicule,
                modification_vehicule: this.state.modification_vehicule,
                suppresion_vehicule: this.state.suppresion_vehicule,
                commande_vehicule: this.state.commande_vehicule,
                utilisation_vehicule: this.state.utilisation_vehicule,
                reservations: this.state.reservations,
                intervention: this.state.intervention,
                contrat_assurance: this.state.contrat_assurance,
                ordre_de_mission: this.state.ordre_de_mission,
                consomation_vehicule: this.state.consomation_vehicule,
                cout_vehicule: this.state.cout_vehicule,
                gestion_stock_piece: this.state.gestion_stock_piece,
                amende_vehicule: this.state.amende_vehicule,
                module_des_commandes: this.state.module_des_commandes,
            }).catch(error => console.log(error))
           // console.log(this.state)
            axios.post('/api/modifier_user/' + this.state.utilisateurModif.id, {
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

             this.props.history.push('/gestion-des-utilisateurs')
            }).catch(error => console.log(error))

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
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
         />
         </span>
    }
    

    render() {
        //console.log(this.checkUser())
        const {utilisateurModif} = this.state        
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
                                            defaultValue={utilisateurModif.password}
                                            ref={password => this.password = password}
                                              type={this.state.hidePassword ? "password" : "text"} className="form-control" />

                                        </div>
                                    </div>
                                   
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Nom et Prénom *</label>
                                            <input name="name"
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
                                        defaultValue={utilisateurModif.entite}
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
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="creation_vehicule"
                                             onChange={this.setField}
                                             defaultChecked={this.state.utilisateurModif.autorisation.creation_vehicule === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="creation_vehicule"
                                             defaultChecked={this.state.utilisateurModif.autorisation.creation_vehicule === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Modification de véhicule ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="modification_vehicule"
                                             onChange={this.setField}
                                             defaultChecked={this.state.utilisateurModif.autorisation.modification_vehicule === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="modification_vehicule"
                                             defaultChecked={this.state.utilisateurModif.autorisation.modification_vehicule === "non"}

                                              value="non" className="" /></label>
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
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           Oui  <input type="radio"
                                            name="suppresion_vehicule"
                                            onChange={this.setField}
                                            defaultChecked={this.state.utilisateurModif.autorisation.suppresion_vehicule === "oui"}

                                             value="oui"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="suppresion_vehicule"
                                            defaultChecked={this.state.utilisateurModif.autorisation.suppresion_vehicule === "non"}

                                             value="non" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2"></div>
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Commande de véhicule ?</label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           Oui  <input type="radio"
                                            name="commande_vehicule"
                                            onChange={this.setField}
                                            defaultChecked={this.state.utilisateurModif.autorisation.commande_vehicule === "oui"}

                                             value="oui"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="commande_vehicule"
                                            defaultChecked={this.state.utilisateurModif.autorisation.commande_vehicule === "non"}

                                             value="non" className="" /></label>
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
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="utilisation_vehicule"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.utilisation_vehicule === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="utilisation_vehicule"
                                            defaultChecked={utilisateurModif.autorisation.utilisation_vehicule === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="utilisation_vehicule"
                                            defaultChecked={utilisateurModif.autorisation.utilisation_vehicule === "non"}

                                             value="non" className="" /></label>
                                       </div>
                                   </div>

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Réservation des véhicules ? </label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="reservations"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.reservations === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="reservations"
                                            defaultChecked={utilisateurModif.autorisation.reservations === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="reservations"
                                            defaultChecked={utilisateurModif.autorisation.reservations === "non"}

                                             value="non" className="" /></label>
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
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="intervention"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.intervention === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="intervention"
                                            defaultChecked={utilisateurModif.autorisation.intervention === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="intervention"
                                            defaultChecked={utilisateurModif.autorisation.intervention === "non"}

                                             value="non" className="" /></label>
                                       </div>
                                   </div>

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Contrats Assurances et Sinistres ? </label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="contrat_assurance"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.contrat_assurance === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="contrat_assurance"
                                            defaultChecked={utilisateurModif.autorisation.contrat_assurance === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="contrat_assurance"
                                            defaultChecked={utilisateurModif.autorisation.contrat_assurance === "non"}

                                             value="non" className="" /></label>
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
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="ordre_de_mission"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.ordre_de_mission === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="ordre_de_mission"
                                            defaultChecked={utilisateurModif.autorisation.ordre_de_mission === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="ordre_de_mission"
                                            defaultChecked={utilisateurModif.autorisation.ordre_de_mission === "non"}

                                             value="non" className="" /></label>
                                       </div>
                                   </div>

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Consomation des véhicules ? </label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="consomation_vehicule"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.consomation_vehicule === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="consomation_vehicule"
                                            defaultChecked={utilisateurModif.autorisation.consomation_vehicule === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="consomation_vehicule"
                                            defaultChecked={utilisateurModif.autorisation.consomation_vehicule === "non"}

                                             value="non" className="" /></label>
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
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="cout_vehicule"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.cout_vehicule === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="cout_vehicule"
                                            defaultChecked={utilisateurModif.autorisation.cout_vehicule === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="cout_vehicule"
                                            defaultChecked={utilisateurModif.autorisation.cout_vehicule === "non"}

                                             value="non" className="" /></label>
                                       </div>
                                   </div>

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Gestion des stocks: pièces détachées ? </label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="gestion_stock_piece"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.gestion_stock_piece === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="gestion_stock_piece"
                                            defaultChecked={utilisateurModif.autorisation.gestion_stock_piece === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="gestion_stock_piece"
                                            defaultChecked={utilisateurModif.autorisation.gestion_stock_piece === "non"}

                                             value="non" className="" /></label>
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
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="amende_vehicule"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.amende_vehicule === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="amende_vehicule"
                                            defaultChecked={utilisateurModif.autorisation.amende_vehicule === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="amende_vehicule"
                                            defaultChecked={utilisateurModif.autorisation.amende_vehicule === "non"}

                                             value="non" className="" /></label>
                                       </div>
                                   </div>

                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Module des commandes ? </label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           L/E  <input type="radio"
                                            name="module_des_commandes"
                                            onChange={this.setField}
                                            defaultChecked={utilisateurModif.autorisation.module_des_commandes === "L/E"}

                                             value="L/E"
                                              className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           L  <input type="radio"
                                           onChange={this.setField}
                                            name="module_des_commandes"
                                            defaultChecked={utilisateurModif.autorisation.module_des_commandes === "L"}

                                             value="L" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Non  <input type="radio"
                                           onChange={this.setField}
                                            name="module_des_commandes"
                                            defaultChecked={utilisateurModif.autorisation.module_des_commandes === "non"}

                                             value="non" className="" /></label>
                                       </div>
                                   </div>

                               
                               </div>
                               <hr />

                            

                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                           
                                <button onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</button>
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
    }
  }

export default connect(mapStateToProps)(ModifierUtilisateur)