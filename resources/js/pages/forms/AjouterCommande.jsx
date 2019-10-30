import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'

import today from '../../utils/today'
import inputStyle from '../../utils/inputStyle'



 class AjouterCommande extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contenu_commandes: [],
            objet_commande: undefined
        }
      
    }

   
    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

  

    setFieldDateContrat = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.setAutreDate(this.date_contrat.value) );
    }

    setFieldCompagnieEtCourtier = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.courtier.value = this.compagnie_assurance.value );
    }

    checkCompagnie = () => {
        if(this.compagnie_assurance.value !== '') return false
       return true 
    }

    setAutreDate = (date) => {
        this.periode_date_debut.value = date;
        this.date_prise_effet.value = date;

        let h = new Date(date)
        var annee_fin = h.getFullYear() + 1
        var annee = annee_fin.toString()

        var jour = h.getDate() - 1
        var jour1 = jour.toString();

         const date_fin = annee + '-' + (h.getMonth() + 1).toString().padStart(2, 0) + 
         '-' + jour1.padStart(2, 0);

         this.periode_date_fin.value = date_fin
    }

    setContenuCommande = () => {
        const obj = {
            contenu_libelle_commande: this.contenu_libelle_commande.value,
            contenu_etat_commande: this.contenu_etat_commande.value,
            contenu_date_livraison_souhaite: this.contenu_date_livraison_souhaite.value,
            contenu_date_livraison: this.contenu_date_livraison.value,
            marque: this.marque.value,
            contenu_modele_vehicule: this.contenu_modele_vehicule.value,
            energie: this.energie.value,
            cv_fiscaux: this.cv_fiscaux.value,
            places: this.places.value,
            couleur: this.couleur.value,
            climatisation: this.climatisation.value,
            pneu_neige: this.pneu_neige.value,
            radio_cd: this.radio_cd.value,
            gps: this.gps.value,
            contenu_quantite_commande: this.contenu_quantite_commande.value,
            contenu_quantite_livree: this.contenu_quantite_livree.value,
            contenu_montant_commande: this.contenu_montant_commande.value,
            taux_tva: this.taux_tva.value,
            tva: this.tva.value,
            contenu_montant_ttc: this.contenu_montant_ttc.value,

        }

        this.setState({
            contenu_commandes: this.state.contenu_commandes.push(obj)
        })
    }



      verificationFormulaire () {
          if(this.date_contrat.value == ''){
              return "La date du contrat est obligatoire !"
          }else if(this.numero_contrat_police.value == ''){
              return "Le numero du contrat ou police est obligatoire !"
          }else if(this.compagnie_assurance.value == ''){
            return "La Compagnie d\'assurance est obligatoire !"
          } else{
              return null
          }
      }

      enregistrerIntervention = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/ajouter_contrat_assurance', {
                vehicule: this.vehicule.value,
                numero_contrat_police: this.numero_contrat_police.value,
                date_contrat: this.date_contrat.value,
                periode_date_debut: this.periode_date_debut.value ,
                periode_date_fin: this.periode_date_fin.value,
                date_prise_effet: this.date_prise_effet.value,
                compagnie_assurance: this.compagnie_assurance.value,
                courtier: this.courtier.value,
                valeur_assuree: this.valeur_assuree.value,
                montant_assuree: this.montant_assuree.value,
                montant_prime: this.montant_prime.value,
                pourcentage_assiete: this.pourcentage_assiete.value,
                montant_franchise: this.montant_franchise.value,
               
            })
            .then(response => { 
               const action = {type: "ADD_CONTRAT_ASSURANCE", value: response.data}
                 this.props.dispatch(action)

               this.props.history.goBack();

             
            }).catch(error => console.log(error))
           

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
     

       // console.log(yea)
      }
    

    render() {
        
        return (
            <div className="app-main__inner">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Création de commande</h5>
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerIntervention}>
                                <div className="form-row">

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >N° de la commande * </label>
                                            <input name="numero_commande" type="number"
                                            onChange={this.setField}
                                            style={inputStyle}
                                            ref={numero_commande => this.numero_commande = numero_commande}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date *</label>
                                            <input name="date"  type="date"
                                            style={inputStyle}
                                            defaultValue={today}
                                            ref={date => this.date = date}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                         <label  className="">Etat de la commande</label>
                                        <select name="etat_commande" onChange={this.setField}
                                            ref={etat_commande => this.etat_commande = etat_commande}
                                          className="form-control">
                                        <option value={0}>En préparation</option>
                                        <option value={1}>En Attente de livraison</option>
                                        <option value={2}>Terminée</option>


                                       
                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Type de commande</label>
                                        <select name="type_commande" onChange={this.setField}
                                            ref={type_commande => this.type_commande = type_commande}
                                          className="form-control">
                                        <option value={0}>Achat de véhicule</option>
                                        <option value={1}>Location longue durée</option>
                                        <option value={2}>Location courte durée</option>
                                        <option value={3}>Leasing</option>
                                        </select>
                                
                                        </div>

                                  
                                </div>

                                <div className="form-row">
                              
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Libéllé de la commande</label>
                                            <input name="libelle_commande"  type="text"
                                            onChange={this.setField}
                                            ref={libelle_commande => this.libelle_commande = libelle_commande}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                         <label  className="">Fournisseur</label>
                                        <select name="fournisseur" onChange={this.setFieldCompagnieEtCourtier}
                                            ref={fournisseur => this.fournisseur = fournisseur}
                                            style={inputStyle}
                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.tiers.map(tier => 
                                                <option key={tier.id} value={tier.id}>{tier.code} </option>

                                                )}
                                        </select>
                                
                                        </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Commande expédiée le</label>
                                            <input name="date_expedition"  type="date"
                                            onChange={this.setField}
                                            ref={date_expedition => this.date_expedition = date_expedition}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                         <label  className="">Mode d'expédition</label>
                                        <select name="mode_expedition" onChange={this.setField}
                                            ref={mode_expedition => this.mode_expedition = mode_expedition}
                                          className="form-control">
                                        <option value="0">Courrier</option>
                                        <option value="1">Fax</option>
                                        <option value="2">Mail</option>
                                        </select>
                                
                                        </div>

                                 
                                   
                                </div>

                                
                                <div className="form-row">
                              
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Livraison souhaitée</label>
                                            <input name="date_livraison_souhaite"  type="date"
                                            onChange={this.setField}
                                            ref={date_livraison_souhaite => this.date_livraison_souhaite = date_livraison_souhaite}
                                             className="form-control" />
                                             </div>
                                    </div>

                               

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Livraison</label>
                                            <input name="date_livraison"  type="date"
                                            onChange={this.setField}
                                            ref={date_livraison => this.date_livraison = date_livraison}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Montant HT</label>
                                            <input name="montant_ht"  type="number"
                                            onChange={this.setField}
                                            ref={montant_ht => this.montant_ht = montant_ht}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >TVA</label>
                                            <input name="tva"  type="number"
                                            onChange={this.setField}
                                            ref={tva => this.tva = tva}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >TTC</label>
                                            <input name="montant_ttc"  type="number"
                                            onChange={this.setField}
                                            ref={montant_ttc => this.montant_ttc = montant_ttc}
                                             className="form-control" />
                                             </div>
                                    </div>
   
                                </div>

                                <div className="form-row">
                              
                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Facture N°</label>
                                      <input name="numero_facture"  type="text"
                                      onChange={this.setField}
                                      ref={numero_facture => this.numero_facture = numero_facture}
                                       className="form-control" />
                                       </div>
                              </div>

                         

                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Date</label>
                                      <input name="date_facture"  type="date"
                                      onChange={this.setField}
                                      ref={date_facture => this.date_facture = date_facture}
                                       className="form-control" />
                                       </div>
                              </div>

                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Réglée le</label>
                                      <input name="date_facture_reglee"  type="date"
                                      onChange={this.setField}
                                      ref={date_facture_reglee => this.date_facture_reglee = date_facture_reglee}
                                       className="form-control" />
                                       </div>
                              </div>

                            

                             

                          </div>

                          
                                 
                              
                          

                           
                                <div className="tab-content">
                        <div className="tab-pane tabs-animation fade show active" id="tab-content-0" role="tabpanel">
                                <div className="main-card mb-3 card">
                                    <div className="card-header-tab card-header">
                                  
                                                <ul className="nav">
                                                    <li className="nav-item"><a data-toggle="tab" href="#demandeur_destinataire" className="active nav-link">Demandeur/Destintaire</a></li>
                                                    <li className="nav-item"><a data-toggle="tab" href="#contenu_commande" className="nav-link">Contenu commande</a></li>
                                                    <li className="nav-item"><a data-toggle="tab" href="#suivi_par" className="nav-link">Suivie par</a></li>
                                                </ul>
                                               
                    
                                            </div>

                                            <div className="card-body">
                                                <div className="tab-content">
                                                    <div className="tab-pane active" id="demandeur_destinataire" role="tabpanel">
                                                   
                                                    <div className="form-row">

                                        <div className="col-md-3">
                                                <label  className="">Demandeur/Destinataire</label>
                                            

                                                </div>

                                                <div className="col-md-3">
                                                <label  className="">Entité</label>
                                                <select name="livraison_entite" onChange={this.setField}
                                                    ref={livraison_entite => this.livraison_entite = livraison_entite}
                                                className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.entites.map(entite => 
                                                        <option key={entite.id} value={entite.id}>{entite.entite} </option>

                                                        )}
                                                </select>

                                                </div>

                                                <div className="col-md-3">
                                                <label  className="">Personne</label>
                                                <select name="personne" onChange={this.setField}
                                                    ref={personne => this.personne = personne}
                                                className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.personnels.map(personne => 
                                                        <option key={personne.id} value={personne.id}>{personne.nom} </option>

                                                        )}
                                                </select>

                                                </div>
                                        
                                            </div>
                                                    <div className="form-row">

                                        <div className="col-md-3">
                                                <label  className="">Livraison</label>
                                               

                                                </div>

                                                <div className="col-md-4">
                                                <label  className="">Adresse</label>
                                                <input name="livraison_adresse1"  type="text"
                                      onChange={this.setField}
                                      ref={livraison_adresse1 => this.livraison_adresse1 = livraison_adresse1}
                                       className="form-control" />

                                                </div>

                                                <div className="col-md-2">
                                                <label  className="">Code postal</label>
                                                <input name="livraison_code_postal"  type="text"
                                      onChange={this.setField}
                                      ref={livraison_code_postal => this.livraison_code_postal = livraison_code_postal}
                                       className="form-control" />

                                                </div>

                                                <div className="col-md-3">
                                                <label  className="">Ville</label>
                                                <input name="livraison_ville"  type="text"
                                      onChange={this.setField}
                                      ref={livraison_ville => this.livraison_ville = livraison_ville}
                                       className="form-control" />

                                                </div>

                                            </div>

                                            <div className="form-row">
                                            <div className="col-md-3">
                                                <label  className="">Livraison</label>
                                               

                                                </div>

                                            <div className="col-md-3">
                                                    <label  className="">Telephonne</label>
                                                    <input name="livraison_telephonne"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={livraison_telephonne => this.livraison_telephonne = livraison_telephonne}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Fax</label>
                                                    <input name="livraison_fax"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={livraison_fax => this.livraison_fax = livraison_fax}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Mail</label>
                                                    <input name="livraison_mail"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={livraison_mail => this.livraison_mail = livraison_mail}
                                                                                className="form-control" />

                                                    </div>

     

                                            </div>

                                            <div className="form-row">
                                            <div className="col-md-3">
                                                <label  className="">Livraison</label>
                                               

                                                </div>

                                            <div className="col-md-3">
                                                    <label  className="">Nom Interlocuteur</label>
                                                    <input name="livraison_nom_interlocuteur"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={livraison_nom_interlocuteur => this.livraison_nom_interlocuteur = livraison_nom_interlocuteur}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Portable</label>
                                                    <input name="livraison_potable"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={livraison_potable => this.livraison_potable = livraison_potable}
                                                                                className="form-control" />

                                                    </div>

                                                

     

                                            </div>

                                            <div className="form-row">
                                            <div className="col-md-2">
                                                <label  className="">Facturation</label>
                                               

                                                </div>

                                            <div className="col-md-3">
                                                    <label  className="">Nom de l'entité</label>
                                                    <select name="facturation_entite" onChange={this.setField}
                                                    ref={facturation_entite => this.facturation_entite = facturation_entite}
                                                className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.entites.map(entite => 
                                                        <option key={entite.id} value={entite.id}>{entite.entite} </option>

                                                        )}
                                                </select>

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Adresse</label>
                                                    <input name="facturation_adresse1"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={facturation_adresse1 => this.facturation_adresse1 = facturation_adresse1}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Code postal</label>
                                                    <input name="facturation_code_postal"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={facturation_code_postal => this.facturation_code_postal = facturation_code_postal}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Ville</label>
                                                    <input name="facturation_ville"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={facturation_ville => this.facturation_ville = facturation_ville}
                                                                                className="form-control" />

                                                    </div>

     

                                            </div>

                                            <div className="form-row">
                                            <div className="col-md-2">
                                                <label  className="">Facturation</label>
                                               

                                                </div>

                                           

                                                    <div className="col-md-2">
                                                    <label  className="">Telephonne</label>
                                                    <input name="facturation_telephonne"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={facturation_telephonne => this.facturation_telephonne = facturation_telephonne}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Fax</label>
                                                    <input name="facturation_fax"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={facturation_fax => this.facturation_fax = facturation_fax}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Mail</label>
                                                    <input name="facturation_mail"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={facturation_mail => this.facturation_mail = facturation_mail}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Nom Interlocuteur</label>
                                                    <input name="facturation_interlocuteur"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={facturation_interlocuteur => this.facturation_interlocuteur = facturation_interlocuteur}
                                                                                className="form-control" />

                                                    </div>

     

                                            </div>
                                                       
                                                        </div>
                                                    <div className="tab-pane" id="contenu_commande" role="tabpanel">
                                                    <span onClick={this.setContenuCommande} className="mt-2 btn btn-info pull-right" title="Ajouter le contenu de la commande">Ajouter</span>

                                           {this.state.contenu_commandes.length > 0 ? <table className="mb-0 table">
                                            <thead>
                                            <tr>
                                                <th>Libéllé</th>
                                                <th>Liv. Souhaitée</th>
                                                <th>Etat</th>
                                                <th>Quantité</th>
                                                <th>Quantité livrée</th>
                                                <th>Date livraison</th>
                                                <th>Montant TTC</th>



                                            </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.contenu_commandes.map(contenu =>  <tr>
                                                <th scope="row">{contenu.contenu_libelle_commande}</th>
                                                <td>{contenu.contenu_date_livraison_souhaite}</td>
                                                <td>{contenu.contenu_etat_commande}</td>
                                                <td>{contenu.contenu_quantite_commande}</td>
                                                <td>{contenu.contenu_quantite_livree}</td>
                                                <td>{contenu.contenu_date_livraison}</td>
                                                <td>{contenu.contenu_montant_ttc}</td>

                                            </tr>)}
                                          
                                          
                                            </tbody>
                                        </table> : null  }

                                        <div className="form-row">
                                        <div className="col-md-3">
                                                    <label  className="">Libéllé de la commande</label>
                                                    <input name="contenu_libelle_commande"  type="text"
                                                        onChange={this.setField}
                                                     ref={contenu_libelle_commande => this.contenu_libelle_commande = contenu_libelle_commande}
                                                        className="form-control" />

                                                    </div>
                                                    <div className="col-md-2">
                                                    <label  className="">Etat de la ligne</label>
                                                    <select name="contenu_etat_commande" onChange={this.setField}
                                                    ref={contenu_etat_commande => this.contenu_etat_commande = contenu_etat_commande}
                                                className="form-control">
                                                <option value={0}>En Attente</option>

                                                <option value={1}>Livrée</option>

                                                </select>
                                                    </div>

                                                  

                                                    <div className="col-md-3">
                                                    <label  className="">date de livraison souhaitée</label>
                                                    <input name="contenu_date_livraison_souhaite"  type="date"
                                                                                onChange={this.setField}
                                                                                ref={contenu_date_livraison_souhaite => this.contenu_date_livraison_souhaite = contenu_date_livraison_souhaite}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Date de livraison</label>
                                                    <input name="contenu_date_livraison"  type="date"
                                                                                onChange={this.setField}
                                                                                ref={contenu_date_livraison => this.contenu_date_livraison = contenu_date_livraison}
                                                                                className="form-control" />

                                                    </div>

     

                                            </div>

                                            
                                        <div className="form-row">
                                        <div className="col-md-3">
                                                    <label  className="">Marque du véhicule</label>
                                                    <select name="marque" onChange={this.setField}
                                                    ref={marque => this.marque = marque}
                                                className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.marques.map(marque => 
                                                        <option key={marque.id} value={marque.id}>{marque.nom_marque} </option>

                                                        )}

                                                </select>
                                                    </div>
                                        <div className="col-md-2">
                                                    <label  className="">Modèle du véhicule</label>
                                                    <input name="contenu_modele_vehicule"  type="text"
                                                        onChange={this.setField}
                                                     ref={contenu_modele_vehicule => this.contenu_modele_vehicule = contenu_modele_vehicule}
                                                        className="form-control" />

                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Energie</label>
                                                    <select name="energie" onChange={this.setField}
                                                    ref={energie => this.energie = energie}
                                                className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.natures_energies.map(nat => 
                                                        <option key={nat.id} value={nat.id}>{nat.nom_energie} </option>

                                                        )}

                                                </select>
                                                    </div>
                                                  

                                                  

                                                    <div className="col-md-2">
                                                    <label  className="">Cv Fiscaux</label>
                                                    <input name="cv_fiscaux"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={cv_fiscaux => this.cv_fiscaux = cv_fiscaux}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-1">
                                                    <label  className="">Place</label>
                                                    <input name="places"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={places => this.places = places}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Couleur</label>
                                                    <input name="couleur"  type="text"
                                                                                onChange={this.setField}
                                                                                ref={couleur => this.couleur = couleur}
                                                                                className="form-control" />

                                                    </div>

     

                                            </div>


                                            <div className="form-row">
                                        <div className="col-md-2">
                                                    <label  className="">Climatisation ?</label>
                                                    <select name="climatisation" onChange={this.setField}
                                                    ref={climatisation => this.climatisation = climatisation}
                                                className="form-control">
                                              <option value={0}>Non</option>
                                                <option value={1}>Oui</option>

                                                </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Pneus neige ?</label>
                                                    <select name="pneu_neige" onChange={this.setField}
                                                    ref={pneu_neige => this.pneu_neige = pneu_neige}
                                                className="form-control">
                                               <option value={0}>Non</option>
                                                <option value={1}>Oui</option>

                                                </select>
                                                    </div>
                                                    <div className="col-md-2">
                                                    <label  className="">Radio/Cd</label>
                                                    <select name="radio_cd" onChange={this.setField}
                                                    ref={radio_cd => this.radio_cd = radio_cd}
                                                className="form-control">
                                                <option value={0}>Non</option>
                                                <option value={1}>Oui</option>

                                                </select>
                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Gps</label>
                                                    <select name="gps" onChange={this.setField}
                                                    ref={gps => this.gps = gps}
                                                className="form-control">
                                                <option value={0}>Non</option>
                                                <option value={1}>Oui</option>

                                    
                                                </select>
                                                    </div>
                                        <div className="col-md-2">
                                                    <label  className="">Quantité commandée</label>
                                                    <input name="contenu_quantite_commande"  type="number"
                                                        onChange={this.setField}
                                                     ref={contenu_quantite_commande => this.contenu_quantite_commande = contenu_quantite_commande}
                                                        className="form-control" />

                                                    </div>
                                                    <div className="col-md-2">
                                                    <label  className="">Quantité livrée</label>
                                                    <input name="contenu_quantite_livree"  type="number"
                                                        onChange={this.setField}
                                                     ref={contenu_quantite_livree => this.contenu_quantite_livree = contenu_quantite_livree}
                                                        className="form-control" />

                                                    </div>
                                            </div>

                                            <div className="form-row">
                                      

                                        <div className="col-md-3">
                                                    <label  className="">Montant de la commande</label>
                                                    <input name="contenu_montant_commande"  type="number"
                                                        onChange={this.setField}
                                                     ref={contenu_montant_commande => this.contenu_montant_commande = contenu_montant_commande}
                                                        className="form-control" />

                                                    </div>
                                                    <div className="col-md-2">
                                                    <label  className="">Taux de TVA</label>
                                                    <input name="taux_tva"  type="number"
                                                        onChange={this.setField}
                                                     ref={taux_tva => this.taux_tva = taux_tva}
                                                        className="form-control" />

                                                    </div>
                                                    <div className="col-md-2">
                                                    <label  className=""> TVA</label>
                                                    <input name="tva"  type="number"
                                                        onChange={this.setField}
                                                     ref={tva => this.tva = tva}
                                                        className="form-control" />

                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Montant TTC</label>
                                                    <input name="contenu_montant_ttc"  type="number"
                                                        onChange={this.setField}
                                                     ref={contenu_montant_ttc => this.contenu_montant_ttc = contenu_montant_ttc}
                                                        className="form-control" />

                                                    </div>
                                            </div>
                                            <button type="submit" className="mt-2 btn btn-success">Valider</button>

                                            <span  className="mt-2 btn btn-danger">Fermer</span>


                                 </div>
                                                  
                                      <div className="tab-pane" id="suivi_par" role="tabpanel">
                                      <div className="form-row">
                                      

                                      <div className="col-md-3">
                                                  <label  className="">Nom</label>
                                                  <select name="nom" onChange={this.setField}
                                                    ref={nom => this.nom = nom}
                                                className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.personnels.map(tier => 
                                                        <option key={tier.id} value={tier.id}>{tier.nom} </option>

                                                        )}

                                                </select>
                                                  </div>
                                                  <div className="col-md-2">
                                                  <label  className="">Télephonne</label>
                                                  <input name="telephonne"  type="text"
                                                      onChange={this.setField}
                                                   ref={telephonne => this.telephonne = telephonne}
                                                      className="form-control" />

                                                  </div>
                                                  <div className="col-md-2">
                                                  <label  className=""> N° de fax</label>
                                                  <input name="fax"  type="text"
                                                      onChange={this.setField}
                                                   ref={fax => this.fax = fax}
                                                      className="form-control" />

                                                  </div>

                                                  <div className="col-md-2">
                                                  <label  className="">Messagerie</label>
                                                  <input name="messagerie"  type="text"
                                                      onChange={this.setField}
                                                   ref={messagerie => this.messagerie = messagerie}
                                                      className="form-control" />

                                                  </div>

                                                  <div className="col-md-3">
                                                  <label  className="">Entité/Service</label>
                                                  <input name="entite_service"  type="text"
                                                      onChange={this.setField}
                                                   ref={entite_service => this.entite_service = entite_service}
                                                      className="form-control" />

                                                  </div>
                                          </div>
                                            </div>
                                                </div>
                                            </div>  

                                             <div className="d-block text-right card-footer">
                                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>

                                            </div> 
                                </div>


                        </div>
                    </div>
                            </form>
                        </div>
                    </div>
                
                    <ToastContainer autoClose={4000} />

   

       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehicules: state.vehicules.items,
        tiers: state.tiers.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        personnels: state.personnels.items,
        entites: state.entites.items,
        marques: state.marques.items,
        natures_energies: state.natures_energies.items,

    }
  }

export default connect(mapStateToProps)(AjouterCommande)
