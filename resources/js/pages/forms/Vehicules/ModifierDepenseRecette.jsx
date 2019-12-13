import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import MatriculeInput from '../../../components/MatriculeInput';

import inputStyle from '../../../utils/inputStyle'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

 class ModifierDepenseRecette extends Component {
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
            objetEdit: this.props.depense_recettes.find(vehi => vehi.id == this.props.match.params.depense_recette_id)
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

    setFieldNatureDepenseRecette = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setFieldImputationInterne(this.nature.value));
    }

    setFieldMontantHt = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setFieldTvaEtTaux(this.montant_ht.value, this.taux_tva.value));
    }

    setFieldImputationInterne(id){
        const nature_depense = this.props.natures_depense_recettes.find(nature => nature.id == id)
        
        this.imputation_interne.value = nature_depense.code
    }


    setFieldTvaEtTaux(total, taux){

        var tva = (total * taux) / 100;
        var tvaParse = parseFloat(tva).toFixed(2);

        var mttc = parseFloat(total) + parseFloat(tva)
        var mttcParse = parseFloat(mttc).toFixed(2);


        if(isNaN(tvaParse)){
            this.tva.value = 0;
            this.montant_ttc.value = 0;
        }else{
            this.tva.value = tvaParse;
            this.montant_ttc.value = mttcParse;

        }
        
        
    }


      verificationFormulaire () {
          if(this.nature.value == ''){
              return "La nature de la ligne Budget est obligatoire !"
          }else if(this.annee_budgetaire.value == ''){
            return "L'année budgétaire est obligatoire !"
        }else if(this.montant_ht.value == ''){
            return "Le montant Hors taxes est obligatoire !"
        }else if(this.tiers.value == ''){
            return "Le tiers est obligatoire !"
        } else{
              return null
          }
      }

      enregistrerIntervention = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/modifier_vehicule_depense_recette/' + this.state.objetEdit.id, {
                annee_budgetaire: this.annee_budgetaire.value,
               // vehicule: this.props.vehiculeSeleted.id,
                depense_ou_recette: this.depense_ou_recette.value,
                date: this.date.value,
                nature: this.nature.value ,
                tiers: this.tiers.value,
                imputation_interne: this.imputation_interne.value,
                montant_ht: this.montant_ht.value,
                tva: this.tva.value,
                taux_tva: this.taux_tva.value,
                montant_ttc: this.montant_ttc.value,
                numero_piece: this.numero_piece.value,
                date_piece: this.date_piece.value,
                libelle: this.libelle.value,


            })
            .then(response => { 
               const action = {type: "EDIT_DR", value: response.data}
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
                                <h5 className="card-title">Gestion des budgets du véhicule
                               
                                  <MatriculeInput />
                                  
                              </h5>
                              <br />
                                <form className="" onChange={this.setField}  onSubmit={this.enregistrerIntervention}>
                                    <div className="form-row">
    
                                    <div className="col-md-3">
                                             <label  className="">Dépense / Recette ?</label>
                                            <select name="depense_ou_recette"
                                             onChange={this.setField}
                                             defaultValue={objetEdit.depense_ou_recette}
                                                ref={depense_ou_recette => this.depense_ou_recette = depense_ou_recette}
                                                style={inputStyle}
    
                                              className="form-control">
                                                 <option value="Dépense">Dépense</option>
                                                     <option value="Recette">Recette</option>
                                            </select>
                                    
                                            </div>
    
                                            <div className="col-md-4">
                                            <div className="position-relative form-group">
                                                <label >Date </label>
                                                <input name="date"  type="date"
                                                defaultValue={objetEdit.date}
                                                style={inputStyle}
                                                ref={date => this.date = date}
                                                 className="form-control" />
                                                 </div>
                                        </div>
    
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Année budgétaire </label>
                                                <input name="annee_budgetaire"  type="number"
                                                defaultValue={objetEdit.annee_budgetaire}
                                                style={inputStyle}
                                                ref={annee_budgetaire => this.annee_budgetaire = annee_budgetaire}
                                                 className="form-control" />
                                                 </div>
                                        </div>
    
                                       
                                    </div>
    
                        
                                    <div className="form-row">
    
                                    <div className="col-md-4">
                                             <label  className="">Nature</label>
                                            <select name="nature"
                                            defaultValue={objetEdit.nature.id}
                                             onChange={this.setFieldNatureDepenseRecette}
                                                ref={nature => this.nature = nature}
                                                style={inputStyle}
    
                                              className="form-control">
                                            <option defaultValue={null}></option>
    
                                            {this.props.natures_depense_recettes.map(nat => 
                                                    <option key={nat.id} value={nat.id}> {nat.nature_depense_recette} </option>
    
                                                    )}
                                            </select>
                                    
                                            </div>
    
                                        <div className="col-md-3">
                                            <div className="position-relative form-group">
                                                <label >Imputation interne </label>
                                                <input name="imputation_interne"  type="text"
                                                readOnly
                                                defaultValue={objetEdit.imputation_interne}
                                                ref={imputation_interne => this.imputation_interne = imputation_interne}
                                                 className="form-control" />
                                                 </div>
                                        </div>
    
                                        <div className="col-md-3">
                                             <label  className="">Tiers</label>
                                            <select name="tiers"
                                            defaultValue={objetEdit.tiers.id}
                                             onChange={this.setField}
                                                ref={tiers => this.tiers = tiers}
                                                style={inputStyle}
    
                                              className="form-control">
                                            <option defaultValue={null}></option>
    
                                            {this.props.tiers.map(tier => 
                                                    <option key={tier.id} value={tier.id}> {tier.code} </option>
    
                                                    )}
                                            </select>
                                    
                                            </div>
                                         
                                        </div>
    
                                        <div className="form-row">
    
                                        <div className="col-md-4">
                                                    <div className="position-relative form-group">
                                                        <label >Montant HT </label>
                                                        <input name="montant_ht"  type="number"
                                                        onChange={this.setFieldMontantHt}
                                                        defaultValue={objetEdit.montant_ht}
                                                        ref={montant_ht => this.montant_ht = montant_ht}
                                                        className="form-control" />
                                                        </div>
                                                </div>
    
                                                <div className="col-md-2">
                                                    <div className="position-relative form-group">
                                                        <label >Taux de TVA </label>
                                                        <input name="taux_tva"  type="number"
                                                        defaultValue={objetEdit.taux_tva}
                                                        onChange={this.setFieldMontantHt}
                                                        ref={taux_tva => this.taux_tva = taux_tva}
                                                        className="form-control" />
                                                        </div>
                                                </div>
                                                    
                                                <div className="col-md-2">
                                                    <div className="position-relative form-group">
                                                        <label >TVA </label>
                                                        <input name="tva"  type="number"
                                                        readOnly
                                                        defaultValue={objetEdit.tva}
                                                        ref={tva => this.tva = tva}
                                                        className="form-control" />
                                                        </div>
                                                </div>
    
                                                <div className="col-md-3">
                                                    <div className="position-relative form-group">
                                                        <label >T T C </label>
                                                        <input name="montant_ttc"  type="number"
                                                        readOnly
                                                        defaultValue={objetEdit.montant_ttc}
                                                        ref={montant_ttc => this.montant_ttc = montant_ttc}
                                                        className="form-control" />
                                                        </div>
                                                </div>
    
                                                </div>
    
                                                <div className="form-row">
    
                                                <div className="col-md-4">
                                                            <div className="position-relative form-group">
                                                                <label >N° de Pièce </label>
                                                                <input name="numero_piece"  type="text"
                                                                defaultValue={objetEdit.numero_piece}
                                                                ref={numero_piece => this.numero_piece = numero_piece}
                                                                className="form-control" />
                                                                </div>
                                                        </div>
    
                                             
    
                                                        <div className="col-md-3">
                                                            <div className="position-relative form-group">
                                                                <label >Date Pièce </label>
                                                                <input name="date_piece"  type="date"
                                                                defaultValue={objetEdit.date_piece}
                                                                ref={date_piece => this.date_piece = date_piece}
                                                                className="form-control" />
                                                                </div>
                                                        </div>
    
                                                        <div className="col-md-4">
                                                            <div className="position-relative form-group">
                                                                <label >Libéllé </label>
                                                                <input name="libelle"  type="text"
                                                                defaultValue={objetEdit.libelle}
                                                                ref={libelle => this.libelle = libelle}
                                                                className="form-control" />
                                                                </div>
                                                        </div>
    
                                                
                                                        
                                                        </div>
    
    
                                     
                                    <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                                    <span  onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</span>
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
                type="BallTriangle"
                color="#00BFFF"
                height={100}
                width={100}
             />
             </span>)
        }
    }
}

const mapStateToProps = state => {
    return {
        natures_depense_recettes: state.natures_depense_recettes.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        tiers: state.tiers.items,
        depense_recettes: state.depense_recettes.items
    }
  }

export default connect(mapStateToProps)(ModifierDepenseRecette)
