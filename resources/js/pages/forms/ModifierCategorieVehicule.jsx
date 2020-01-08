import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"





 class ModifierCategorieVehicule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categorieVehiculeModif : undefined,
           // date_creation: new Date(),
           typeSelected: 'Véhicule',
           montant_forfait: 0.00,
           cout: 0.00,
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
            isFormSubmitted: false

        }
    }

    
    componentDidMount(){
        axios.get('/api/voir_categorie_vehicule/' + this.props.match.params.categorie_vehicule_id).then(response => {
            // const action = {type: "GET_ENTITE", value: response.data}
            //  this.props.dispatch(action)
            this.setState({categorieVehiculeModif: response.data})
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

      renderLoading(){
        return  <span style={{textAlign: 'center'}}>

        <Loader
          
            height={500}
            width={300}
         />
         </span>
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
              this.setState({isFormSubmitted: true})
           // console.log(this.state)
            axios.post('/api/modifier_categorie_vehicule/' + this.state.categorieVehiculeModif.id, {
                nom_type: this.nom_type.value,
                type: this.type.value,
                cout: this.cout.value,
                montant_forfait: this.montant_forfait.value,
                // encombrement: this.state.encombrement,
                // cartes: this.state.cartes,
                // entretien_planifies: this.state.entretien_planifies,
                // amortissement: this.state.amortissement,
                // garantie: this.state.garantie,
                // nombre_place: this.state.nombre_place,
                // puissance: this.state.puissance,
                // kilometrage: this.state.kilometrage,
                // compteur_horraire: this.state.compteur_horraire,
                // option: this.state.option,
                // etat: this.state.etat,
                // roues: this.state.roues,
                // liens: this.state.liens,
                // taxes: this.state.taxes,
                // historique_detenteur: this.state.historique_detenteur,
                // avant_nature: this.state.avant_nature,

            }).then(response => {
                
               const action = {type: "EDIT_CATEGORIE_VEHICULE", value: response.data}
               this.props.dispatch(action)
               this.setState({isFormSubmitted: false})


             this.props.history.goBack()
            }).catch(error => {
                this.setState({isFormSubmitted: true})
                 console.log(error)
            } )

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
      }
    

    render() {
        //console.log(this.checkUser())
        const {categorieVehiculeModif} = this.state
        return (
            <div className="app-main__inner">
              
              {categorieVehiculeModif != undefined ? 
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
                                            defaultValue={categorieVehiculeModif.nom_type}
                                              type="text" className="form-control" /></div>
                                    </div>
                                   
                                   
                                    <div className="col-md-6">
                                    <label  className="">Type</label>
                                        <select 
                                            defaultValue={categorieVehiculeModif.type}

                                         name="type" 
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
                                            defaultValue={categorieVehiculeModif.cout}

                                             className="form-control" /></div>
                                    </div>
                                   
                                   
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Montan forfait AEN</label>
                                            <input name="montant_forfait"
                                            defaultValue={categorieVehiculeModif.montant_forfait}

                                            ref={montant_forfait => this.montant_forfait = montant_forfait}
                                            defaultValue={this.state.montant_forfait}
                                              type="text" className="form-control" /></div>
                                    </div>
                                 
                                </div>
                                   

                                 


                              

                                {/* <div className="form-row">
                                   
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
                                             defaultChecked={categorieVehiculeModif.encombrement === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.encombrement === "non"}

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
                                             defaultChecked={categorieVehiculeModif.cartes === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.cartes === "non"}

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
                                             defaultChecked={categorieVehiculeModif.entretien_planifies === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.entretien_planifies === "non"}

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
                                             defaultChecked={categorieVehiculeModif.amortissement === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.amortissement === "non"}

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
                                             defaultChecked={categorieVehiculeModif.garantie === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.garantie === "non"}

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
                                             defaultChecked={categorieVehiculeModif.nombre_place === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.nombre_place === "non"}

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
                                             defaultChecked={categorieVehiculeModif.puissance === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.puissance === "non"}

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
                                             defaultChecked={categorieVehiculeModif.kilometrage === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.kilometrage === "non"}

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
                                             defaultChecked={categorieVehiculeModif.compteur_horraire === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.compteur_horraire === "non"}

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
                                             defaultChecked={categorieVehiculeModif.option === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.option === "non"}

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
                                             defaultChecked={categorieVehiculeModif.etat === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.etat === "non"}

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
                                             defaultChecked={categorieVehiculeModif.roues === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.roues === "non"}

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
                                             defaultChecked={categorieVehiculeModif.liens === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.liens === "non"}

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
                                             defaultChecked={categorieVehiculeModif.taxes === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.taxes === "non"}

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
                                             defaultChecked={categorieVehiculeModif.historique_detenteur === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.historique_detenteur === "non"}

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
                                             defaultChecked={categorieVehiculeModif.avant_nature === "oui"}

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
                                             defaultChecked={categorieVehiculeModif.avant_nature === "non"}

                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr /> */}
                            

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
    }
  }

export default connect(mapStateToProps)(ModifierCategorieVehicule)