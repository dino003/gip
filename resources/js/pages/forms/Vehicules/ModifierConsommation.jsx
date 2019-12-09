import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';
import InputMask from 'react-input-mask';

import inputStyle from '../../../utils/inputStyle'

import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"



 class ModifierConsommation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objetEdit: undefined
        }
      
    }

    componentDidMount(){
    
         if(this.props.vehiculeSeleted == undefined){
          const action = {type: "EDIT_SELECTED", value: this.props.location.state.veh}
          this.props.dispatch(action)
         }

         this.setState({
            objetEdit: this.props.consommations.find(conso => conso.id == this.props.match.params.consommation_id)
        })
    
        }

   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    setFieldConsomable = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setFieldPrix(this.state.consomable) );
    }

    setFieldPrix(id){
        const cout_conso = this.props.couts_consommables.find(conso => conso.id == id)
        this.setState({
            prix_unitaire_ht: cout_conso.cout_unitaire,
        })
    }


      verificationFormulaire () {
          if(this.type_consomation.value == ''){
              return "Le type de consommation est obligatoire obligatoire !"
          }else if(this.tiers.value == ''){
              return "Le tiers est obligatoire !"
          }else if(this.date_conso.value == ''){
            return "La date  est obligatoire !"
          }else if(this.quantite_consomee.value == ''){
            return "La quantité consommée est obligatoire !"
          } else{
              return null
          }
      }

      modifierConsommation = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/modifier_vehicule_consommation/' + this.state.objetEdit.id, {
               // vehicule: this.props.vehiculeSeleted.id,
                type_consomation: this.type_consomation.value,
                tiers: this.tiers.value,
                date_conso: this.date_conso.value ,
                libelle: this.libelle.value,
                numero_carte: this.numero_carte.value,
                numero_conducteur: this.numero_conducteur.value,
                conducteur: this.conducteur.value,
                kilometrage_au_compteur: this.kilometrage_au_compteur.value,
                quantite_consomee: this.quantite_consomee.value,
                unite_mesure: this.unite_mesure.value,
                consomable: this.consomable.value,
                prix_unitaire_ht: this.prix_unitaire_ht.value,
                montant_ttc: this.montant_ttc.value,
                montant_tva: this.montant_tva.value,
                montant_ht: this.montant_ht.value,

            })
            .then(response => { 
               const action = {type: "EDIT_CONSOMMATION", value: response.data}
                 this.props.dispatch(action)

               this.props.history.goBack();

             
            }).catch(error => console.log(error))
           

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }

       // console.log(this.date_debut.value)
      }
    

    render() {
        const {objetEdit} = this.state
            if(objetEdit !== undefined){
                return (
                    <div className="app-main__inner">
                      
                            <div className="main-card mb-3 card">
                                <div className="card-body">
                                    <h5 className="card-title">Gestion des consommations du véhicule
                                   
                                      <MatriculeInput />
                                      
                                  </h5>
                                    <form className="" onChange={this.setField}  onSubmit={this.modifierConsommation}>
                                        <div className="form-row">
        
                                        <div className="col-md-4">
                                            <label  className="">Type de consommation</label>
                                                <select name="type_consomation" onChange={this.setField}
                                                    ref={type_consomation => this.type_consomation = type_consomation}
                                                    style={inputStyle}
                                                    defaultValue={objetEdit.type_consomation.id}
                                                  className="form-control">
                                                <option defaultValue={null}></option>
        
                                                {this.props.natures_consommations.map(nature => 
                                                        <option key={nature.id} value={nature.id}>{nature.nature_consomation}</option>
        
                                                        )}
                                                </select>
                                        
                                                </div>
        
                                                <div className="col-md-3">
                                                 <label  className="">Tiers</label>
                                                <select name="tiers" onChange={this.setField}
                                                    ref={tiers => this.tiers = tiers}
                                                    style={inputStyle}
                                                    defaultValue={objetEdit.tiers.id}
                                                  className="form-control">
                                                <option defaultValue={null}></option>
        
                                                {this.props.tiers.map(tier => 
                                                        <option key={tier.id} value={tier.id}>{tier.code} </option>
        
                                                        )}
                                                </select>
                                        
                                                </div>
        
                                            <div className="col-md-4">
                                                <div className="position-relative form-group">
                                                    <label >Date *</label>
                                                    <input name="date_conso"  type="date"
                                                    style={inputStyle}
                                                    defaultValue={objetEdit.date_conso}
                                                    onChange={this.setField}
                                                    ref={date_conso => this.date_conso = date_conso}
                                                     className="form-control" />
                                                     </div>
                                            </div>
                                        
        
                                          
                                        </div>
        
                            
                                        <div className="form-row">
                                            
                                           
                                                <div className="col-md-3">
                                                    <label >Libéllé</label>
        
                                                    <input name="libelle"
                                                    ref={libelle => this.libelle = libelle}
                                                    defaultValue={objetEdit.libelle}
                                                      type="text" className="form-control" />
                                                </div>
        
                                                <div className="col-md-3">
                                                    <label >Numero de la carte</label>
        
                                                    <input name="numero_carte"
                                                    defaultValue={objetEdit.numero_carte}
                                                        onChange={this.setField}
                                                    ref={numero_carte => this.numero_carte = numero_carte}
                                                      type="text" className="form-control" />
                                                </div>
        
                                                <div className="col-md-3">
                                            <label  className="">Conducteur</label>
                                                <select name="conducteur"
                                                defaultValue={objetEdit.conducteur.id}
                                                    ref={conducteur => this.conducteur = conducteur}
        
                                                  className="form-control">
                                                <option defaultValue={null}></option>
        
                                                {this.props.personnels.map(pers => 
                                                        <option key={pers.id} value={pers.id}>{pers.nom} {pers.prenom}</option>
        
                                                        )}
                                                </select>
                                        
                                                </div>
                                                <div className="col-md-3">
                                                    <label >Numero du conducteur</label>
        
                                                    <InputMask mask="99:99" mask="(+225) 99 99 99 99" 
                                                    onChange={this.setField}
                                                    defaultValue={objetEdit.numero_conducteur}
                                                    inputRef={numero_conducteur => this.numero_conducteur = numero_conducteur}
                                                    className="form-control"
                                                    name="numero_conducteur"
                                                    />
                                                </div>
        
                                              
                                            </div>
                                         
        
                                            <div className="form-row">
                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Kilometrage</label>
                                                    <input name="kilometrage_au_compteur"  type="number"
                                                    defaultValue={objetEdit.kilometrage_au_compteur}
                                                    onChange={this.setField}
                                                    ref={kilometrage_au_compteur => this.kilometrage_au_compteur = kilometrage_au_compteur}
                                                     className="form-control" /></div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Quantité </label>
                                                    <input name="quantite_consomee"
                                                    defaultValue={objetEdit.quantite_consomee}
                                                        style={inputStyle}
        
                                                    onChange={this.setField}
                                                    ref={quantite_consomee => this.quantite_consomee = quantite_consomee}
        
                                                     type="number" className="form-control" />
                                                </div>
                                            </div>
        
                                            <div className="col-md-3">
                                            <label  className="">Unité de mesure</label>
                                                <select name="unite_mesure"
                                                    ref={unite_mesure => this.unite_mesure = unite_mesure}
                                                    defaultValue={objetEdit.unite_mesure}
                                                  className="form-control">
                                                <option >Litre</option>
                                                <option >Montant</option>
                                                <option >Kva</option>
                                                <option >Nombre</option>
                                                <option >Kgs</option>
                                                <option >Autre</option>
        
                                                </select>
                                        
                                                </div>
        
                                                <div className="col-md-3">
                                            <label  className="">Consommable</label>
                                                <select name="consomable" 
                                                    ref={consomable => this.consomable = consomable}
                                                    defaultValue={objetEdit.consomable.id}
                                                  className="form-control">
                                                 <option defaultValue={null}></option>
        
                                                {this.props.couts_consommables.map(conso => 
                                                        <option key={conso.id} value={conso.id}>{conso.libelle}</option>
        
                                                        )}
        
                                                </select>
                                        
                                                </div>
        
                                                <div className="col-md-2">
                                                <div className="position-relative form-group">
                                                    <label >Prix unitaire </label>
                                                    <input name="prix_unitaire_ht"
                                                    defaultValue={objetEdit.prix_unitaire_ht}
                                                    onChange={this.setField}
                                                    ref={prix_unitaire_ht => this.prix_unitaire_ht = prix_unitaire_ht}
        
                                                     type="number" className="form-control" />
                                                </div>
                                            </div>
        
                                           
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Montant TTC</label>
                                                    <input name="montant_ttc"  type="number"
                                                    defaultValue={objetEdit.montant_ttc}
                                                    ref={montant_ttc => this.montant_ttc = montant_ttc}
                                                     className="form-control" />
                                                     </div>
                                            </div>
        
                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Montant TVA</label>
                                                    <input name="montant_tva"  type="number"
                                                    defaultValue={objetEdit.montant_tva}
                                                    ref={montant_tva => this.montant_tva = montant_tva}
                                                     className="form-control" />
                                                     </div>
                                            </div>
        
                                            <div className="col-md-3">
                                                <div className="position-relative form-group">
                                                    <label >Montant HT</label>
                                                    <input name="montant_ht"  type="number"
                                                    defaultValue={objetEdit.montant_ht}
                                                    ref={montant_ht => this.montant_ht = montant_ht}
                                                     className="form-control" />
                                                     </div>
                                            </div>
                                          
                                         
                                        </div>
                                  
        
                                        <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                                        <button type="submit" onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</button>
                                    </form>
                                </div>
                            </div>
                        
                            <ToastContainer autoClose={4000} />
               </div>
                )
            }
            else{
                return ( <span style={{textAlign: 'center'}}>
    
                <Loader
                    
                    height={100}
                    width={100}
                 />
                 </span>)
            }
    }
}

const mapStateToProps = state => {
    return {
        natures_consommations: state.natures_consommations.items,
        tiers: state.tiers.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        couts_consommables: state.couts_consommables.items,
        personnels: state.personnels.items,
        consommations: state.consommations.items
    }
  }

export default connect(mapStateToProps)(ModifierConsommation)
