import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import NumberFormat from 'react-number-format';





 class AjouterCategorieVehicule extends Component {
    constructor(props) {
        super(props);
        this.state = {
           // date_creation: new Date(),
           typeSelected: 'Véhicule',
          // montant_forfait: 0.00,
          // cout: 0.00,
            hidePassword: true,
            userNameIsUsed: false,
            encombrement : 'oui',
            cartes: 'oui',
            entretien_planifies: 'oui',
            amortissement: 'oui',
            garantie: 'oui',
            nombre_place: 'oui',
            puissance: 'oui',
            kilometrage: 'oui',
            compteur_horraire: 'oui',
            option: 'oui',
            etat: 'oui',
            roues: 'oui',
            liens: 'oui',
            taxes: 'oui',
            historique_detenteur: 'oui',
            avant_nature: 'oui',

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

  

      verificationFormulaire () {
        if(this.nom_type.value == undefined || !this.nom_type.value.length){
            return "Le Type est obligatoire !"
        }
        else{
            return null
        }
      
      }

      enregistrerPersonnel = (e) => {
        e.preventDefault()
          if(this.verificationFormulaire() == null){
           // console.log(this.state)
            axios.post('/api/ajouter_categorie_vehicule', {
                nom_type: this.nom_type.value,
                type: this.type.value,
                cout: this.cout.value,
                montant_forfait: this.montant_forfait.value,
                encombrement: this.state.encombrement,
                cartes: this.state.cartes,
                entretien_planifies: this.state.entretien_planifies,
                amortissement: this.state.amortissement,
                garantie: this.state.garantie,
                nombre_place: this.state.nombre_place,
                puissance: this.state.puissance,
                kilometrage: this.state.kilometrage,
                compteur_horraire: this.state.compteur_horraire,
                option: this.state.option,
                etat: this.state.etat,
                roues: this.state.roues,
                liens: this.state.liens,
                taxes: this.state.taxes,
                historique_detenteur: this.state.historique_detenteur,
                avant_nature: this.state.avant_nature,

            }).then(response => {
                
               const action = {type: "ADD_CATEGORIE_VEHICULE", value: response.data}
               this.props.dispatch(action)

             this.props.history.push('/categories_véhicules')
            }).catch(error => console.log(error))

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
      }
    

    render() {
        //console.log(this.checkUser())
        return (
            <div className="app-main__inner">
              
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Fichier des Catégories de véhicules

                        </h5>
                            <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Types</label>
                                            <input name="nom_type"
                                            ref={nom_type => this.nom_type = nom_type}
                                            
                                              type="text" className="form-control" /></div>
                                    </div>
                                   
                                   
                                    <div className="col-md-6">
                                    <label  className="">Type</label>
                                        <select  selected={this.state.typeSelected} name="type" 
                                        ref={type => this.type = type}
                                         className="form-control">
                                            <option value="Véhicule">Véhicule</option>
                                            <option value="Engin">Engin</option>

                                        </select>
                                
                                        </div>
                                 
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Coût</label>
                                            <input name="cout"
                                            ref={cout => this.cout = cout}
                                            type='text'
                                         
                                             className="form-control" /></div>
                                    </div>
                                   
                                   
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Montan forfait AEN</label>
                                            <input name="montant_forfait"
                                            ref={montant_forfait => this.montant_forfait = montant_forfait}
                                              type="text" className="form-control" /></div>
                                    </div>
                                 
                                </div>
                                   

                                 


                              

                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Encombrement ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="encombrement"
                                             onChange={this.setField}
                                             checked={this.state.encombrement === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="encombrement"
                                             checked={this.state.encombrement === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Cartes ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="cartes"
                                             onChange={this.setField}
                                             checked={this.state.cartes === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="cartes"
                                             checked={this.state.cartes === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                
                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Entretiens planifiés ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="entretien_planifies"
                                             onChange={this.setField}
                                             checked={this.state.entretien_planifies === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="entretien_planifies"
                                             checked={this.state.entretien_planifies === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Amortissements ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="amortissement"
                                             onChange={this.setField}
                                             checked={this.state.amortissement === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="amortissement"
                                             checked={this.state.amortissement === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                
                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Garantie ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="garantie"
                                             onChange={this.setField}
                                             checked={this.state.garantie === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="garantie"
                                             checked={this.state.garantie === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Nombre places ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="nombre_place"
                                             onChange={this.setField}
                                             checked={this.state.nombre_place === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="nombre_place"
                                             checked={this.state.nombre_place === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                
                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Puissance ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="puissance"
                                             onChange={this.setField}
                                             checked={this.state.puissance === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="puissance"
                                             checked={this.state.puissance === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Kilomètrage ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="kilometrage"
                                             onChange={this.setField}
                                             checked={this.state.kilometrage === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="kilometrage"
                                             checked={this.state.kilometrage === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                
                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Compteur horaire ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="compteur_horraire"
                                             onChange={this.setField}
                                             checked={this.state.compteur_horraire === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="compteur_horraire"
                                             checked={this.state.compteur_horraire === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Options ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="option"
                                             onChange={this.setField}
                                             checked={this.state.option === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="option"
                                             checked={this.state.option === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                
                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Etat ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="etat"
                                             onChange={this.setField}
                                             checked={this.state.etat === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="etat"
                                             checked={this.state.etat === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Roues ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="roues"
                                             onChange={this.setField}
                                             checked={this.state.roues === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="roues"
                                             checked={this.state.roues === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                
                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Liens ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="liens"
                                             onChange={this.setField}
                                             checked={this.state.liens === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="liens"
                                             checked={this.state.liens === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Taxes ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="taxes"
                                             onChange={this.setField}
                                             checked={this.state.taxes === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="taxes"
                                             checked={this.state.taxes === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                
                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Historique détenteurs ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="historique_detenteur"
                                             onChange={this.setField}
                                             checked={this.state.historique_detenteur === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="historique_detenteur"
                                             checked={this.state.historique_detenteur === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Avant Nature ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="avant_nature"
                                             onChange={this.setField}
                                             checked={this.state.avant_nature === "oui"}

                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="avant_nature"
                                             checked={this.state.avant_nature === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            

                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                            
                                <span type="submit" onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
                            </form>
                        </div>
                    </div>
                
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

export default connect(mapStateToProps)(AjouterCategorieVehicule)