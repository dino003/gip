import React, { Component } from 'react'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'

import inputStyle from '../../utils/inputStyle'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import ContenuCommandeItem from '../../components/gestion/ContenuCommandeItem';




 class ModifierCommande extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contenu_commandes: [],
            objet_commande: undefined,
            showContenuForm: false,
            type_commande: 0,
            objetEdit: undefined
        }
      
    }

    componentDidMount(){
    
        this.setState({
           objetEdit: this.props.commandes.find(commande => commande.id == this.props.match.params.commande_id)
       })
   
       }

   toggleContenuCommande = () => {
       if(this.checkFournisseur()){
        toast.error('Vous n\'avez pas choisi le fournisseur !', {
            position: toast.POSITION.BOTTOM_CENTER
          });
       }else{
        this.setState({
            showContenuForm: !this.state.showContenuForm
        })
       }
      
   }

   onDeleteContenu = (id) => {
       console.log(id)
   }

   onEditContenu = item => {
       console.log(item)
   }

    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

  

    checkFournisseur = () => {
       return this.fournisseur.value === ''
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
            contenu_taux_tva: this.contenu_taux_tva.value,
            contenu_montant_ttc: this.contenu_montant_ttc.value,

        }

        this.setState(() => ({
            contenu_commandes: [
                obj, 
              ...this.state.contenu_commandes
            ],
            showContenuForm: false
          }))

        // this.setState({
        //     contenu_commandes: [...this.state.contenu_commandes, ...obj]
        // }, () => this.toggleContenuCommande())
    }



      verificationFormulaire () {
          if(this.fournisseur.value == ''){
              return "Vous n'avez pas sélectionné le fournisseur !"
          }else if(this.date.value == ''){
              return "La date est obligatoire !"
          }else{
              return null
          }
      }

      calculMontantTTC = () => {
          if( this.type_commande && this.type_commande.value == 0){
              if(this.montant_ht.value == '') return null
              if(this.tva.value == '') return this.montant_ht.value
              var taux = ( Number(this.montant_ht.value) * Number(this.tva.value) ) / 100
            return Number(this.montant_ht.value) + taux

          }
      }

      calculMontantTTCContenu = () => {
        if( this.contenu_montant_commande && this.contenu_taux_tva){
            if(this.contenu_montant_commande.value == '') return null
            if(this.contenu_taux_tva.value == '') return this.contenu_montant_commande.value
            var taux = ( Number(this.contenu_montant_commande.value) * Number(this.contenu_taux_tva.value) ) / 100
          return Number(this.contenu_montant_commande.value) + taux
        }   
    }

      enregistrerCommande = (e) => {
        e.preventDefault()

          if(this.verificationFormulaire() == null){
            axios.post('/api/ajouter_commande', {
                etat_commande: this.etat_commande.value, 
                type_commande: this.type_commande.value,
                libelle_commande: this.libelle_commande.value,
                fournisseur: this.fournisseur.value,
                date_expedition: this.date_expedition.value,
                mode_expedition: this.mode_expedition.value,
                date_livraison_souhaite: this.date_livraison_souhaite.value,
                date_livraison: this.date_livraison.value,
                montant_ht: this.type_commande.value != 0 ? null : this.montant_ht.value,
                loyer_mensuel_leasing: this.type_commande.value != 3 ? null : this.loyer_mensuel_leasing.value,

                cout_ttc_location_annuelle: this.type_commande.value != 1 ? null : this.cout_ttc_location_annuelle.value,
                cout_ttc_location_courte_duree: this.type_commande.value != 2 ? null : this.cout_ttc_location_courte_duree.value,
                tva: this.type_commande.value != 0 ? null : this.tva.value,
                montant_ttc: this.type_commande.value != 0 ? null : this.montant_ttc.value,
                numero_facture: this.numero_facture.value,
                date_facture: this.date_facture.value,
                date_facture_reglee: this.date_facture_reglee.value,
                date: this.date.value,
                numero_commande: this.numero_commande.value,
                livraison_entite: this.livraison_entite.value,
                personne: this.personne.value,
                livraison_adresse1: this.livraison_adresse1.value,
                livraison_code_postal: this.livraison_code_postal.value,
                livraison_ville: this.livraison_ville.value,
                livraison_telephonne: this.livraison_telephonne.value,
                livraison_fax: this.livraison_fax.value,
                livraison_mail: this.livraison_mail.value,
                livraison_nom_interlocuteur: this.livraison_nom_interlocuteur.value,
                livraison_potable: this.livraison_potable.value,
                facturation_entite: this.facturation_entite.value,
                facturation_adresse1: this.facturation_adresse1.value,
                facturation_code_postal: this.facturation_code_postal.value,
                facturation_ville: this.facturation_ville.value,
                facturation_telephonne: this.facturation_telephonne.value,
                facturation_fax: this.facturation_fax.value,
                facturation_mail: this.facturation_mail.value,
                facturation_interlocuteur: this.facturation_interlocuteur.value,
                contenu_commandes: !this.state.contenu_commandes.length ? null : this.state.contenu_commandes,

                suivi_nom: this.suivi_nom.value,
                suivi_telephone: this.suivi_telephone.value,
                suivi_fax: this.suivi_fax.value,
                suivi_messagerie: this.suivi_messagerie.value,
                suivi_entite_service: this.suivi_entite_service.value
            })
            .then(response => { 
               const action = {type: "ADD_COMMANDE", value: response.data}
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

      numeroAutoDeCommande = () => {
        const {commandes} = this.props
        if (commandes.length == 0) return 1
       // if (commandes.length == 1) return 2
        let coms = commandes.map(a => a.numero_commande);
        return Math.max(...coms) + 1
      }

      setFieldTypeCommande = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () =>  {
            this.libelle_commande.value = this.LibelleAutoDeCommannde()
           // this.contenu_libelle_commande.value = this.LibelleAutoDeCommannde()

        });
      }

      LibelleAutoDeCommannde = () => {
      //  this.libelle_commande.value = this.type_commande.value 
       if(this.type_commande != undefined){
            var res = this.type_commande.value
     
        if(res == 0) return "Commande d'achat de véhicule"
        else if(res == 1) return "Commande de véhicule en location longue durée"
        else if(res == 2) return "Commande de véhicule en location courte durée"
        else return "Commande de véhicule en leasing" 
       }

      }
    

    render() {
       // console.log(this.numeroAutoDeCommande())
       const {objetEdit} = this.state
       if(objetEdit !== undefined){

        return (
            <div className="app-main__inner">
                    <div className="main-card mb-3 card">
                        <div className="card-body">
                            <h5 className="card-title">Création de commande</h5>
                            <form className="" onChange={this.setField}  onSubmit={this.enregistrerCommande}>
                                <div className="form-row">

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >N° de la commande * </label>
                                            <input name="numero_commande" type="number"
                                            onChange={this.setField}
                                            defaultValue={objetEdit.numero_commande}
                                            readOnly
                                            style={inputStyle}
                                            ref={(numero_commande) => { this.numero_commande = numero_commande }} 
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Date *</label>
                                            <input name="date"  type="date"
                                            style={inputStyle}
                                            defaultValue={objetEdit.date}
                                            ref={date => this.date = date}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                         <label  className="">Etat de la commande</label>
                                        <select name="etat_commande" onChange={this.setField}
                                        defaultValue={objetEdit.etat_commande}
                                            ref={etat_commande => this.etat_commande = etat_commande}
                                          className="form-control">
                                        <option value={0}>En préparation</option>
                                        <option value={1}>En Attente de livraison</option>
                                        <option value={2}>Terminée</option>


                                       
                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                         <label  className="">Type de commande</label>
                                        <select name="type_commande" onChange={this.setFieldTypeCommande}
                                            ref={type_commande => this.type_commande = type_commande}
                                            defaultValue={objetEdit.type_commande}
                                          className="form-control">
                                        <option value={0}>Achat de véhicule</option>
                                        <option value={1}>Location longue durée</option>
                                        <option value={2}>Location courte durée</option>
                                        <option value={3}>Leasing</option>
                                        </select>
                                
                                        </div>

                                  
                                </div>

                                <div className="form-row">
                              
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Libéllé de la commande</label>
                                            <input name="libelle_commande"  type="text"
                                            defaultValue={objetEdit.libelle_commande}
                                            defaultValue="Commande d'achat de véhicule"
                                            onChange={this.setField}
                                            ref={libelle_commande => this.libelle_commande = libelle_commande}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-5">
                                         <label  className="">Fournisseur</label>
                                        <select name="fournisseur" onChange={this.setField}
                                            ref={fournisseur => this.fournisseur = fournisseur}
                                            defaultValue={objetEdit.fournisseur.id}
                                            style={inputStyle}
                                          className="form-control">
                                        <option defaultValue={null}></option>

                                        {this.props.tiers.map(tier => 
                                                <option key={tier.id} value={tier.id}>{tier.code} </option>

                                                )}
                                        </select>
                                
                                        </div> 
                                </div>

                                
                                <div className="form-row">

                                <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Commande expédiée le</label>
                                            <input name="date_expedition"  type="date"
                                            defaultValue={objetEdit.date_expedition}
                                            onChange={this.setField}
                                            ref={date_expedition => this.date_expedition = date_expedition}
                                             className="form-control" />
                                             </div>
                                    </div>

                                <div className="col-md-2">
                                         <label  className="">Mode d'expédition</label>
                                        <select name="mode_expedition" onChange={this.setField}
                                        defaultValue={objetEdit.mode_expedition}
                                            ref={mode_expedition => this.mode_expedition = mode_expedition}
                                          className="form-control">
                                        <option value="0">Courrier</option>
                                        <option value="1">Fax</option>
                                        <option value="2">Mail</option>
                                        </select>
                                
                                        </div>
                              
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Livraison souhaitée</label>
                                            <input name="date_livraison_souhaite"  type="date"
                                            defaultValue={objetEdit.date_livraison_souhaite}
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
                                            defaultValue={objetEdit.date_livraison}
                                            ref={date_livraison => this.date_livraison = date_livraison}
                                             className="form-control" />
                                             </div>
                                    </div>
                                    
                                
   
                                </div>

                                { this.state.type_commande == 0 ? <div className="form-row">
                                <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant HT</label>
                                            <input name="montant_ht"  type="number"
                                            defaultValue={objetEdit.montant_ht}
                                            onChange={this.setField}
                                            ref={montant_ht => this.montant_ht = montant_ht}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Taux TVA %</label>
                                            <input name="tva"  type="number"
                                            defaultValue={objetEdit.tva}
                                            onChange={this.setField}
                                            ref={tva => this.tva = tva}
                                             className="form-control" />
                                             </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Montant TTC</label>
                                            <input name="montant_ttc"  type="number"
                                            readOnly
                                            defaultValue={this.calculMontantTTC()}
                                            ref={montant_ttc => this.montant_ttc = montant_ttc}
                                             className="form-control" />
                                             </div>
                                    </div>
                                </div> : null}

                                {this.state.type_commande == 1 ? <div className="form-row">
                                <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Coût TTC location annuelle</label>
                                            <input name="cout_ttc_location_annuelle"  type="number"
                                            defaultValue={objetEdit.cout_ttc_location_annuelle}
                                            onChange={this.setField}
                                            ref={cout_ttc_location_annuelle => this.cout_ttc_location_annuelle = cout_ttc_location_annuelle}
                                             className="form-control" />
                                             </div>
                                    </div>

                                
                                </div> : null}

                                {this.state.type_commande == 2 ? <div className="form-row">
                                <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Coût TTC location </label>
                                            <input name="cout_ttc_location_courte_duree"  type="number"
                                            defaultValue={objetEdit.cout_ttc_location_courte_duree}
                                            onChange={this.setField}
                                            ref={cout_ttc_location_courte_duree => this.cout_ttc_location_courte_duree = cout_ttc_location_courte_duree}
                                             className="form-control" />
                                             </div>
                                    </div>

                                
                                </div> : null}

                                {this.state.type_commande == 3 ? <div className="form-row">
                                <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Loyer mensuel </label>
                                            <input name="loyer_mensuel_leasing"  type="number"
                                            defaultValue={objetEdit.loyer_mensuel_leasing}
                                            onChange={this.setField}
                                            ref={loyer_mensuel_leasing => this.loyer_mensuel_leasing = loyer_mensuel_leasing}
                                             className="form-control" />
                                             </div>
                                    </div>

                                
                                </div> : null}

                                <div className="form-row">
                              
                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Facture N°</label>
                                      <input name="numero_facture"  type="text"
                                      defaultValue={objetEdit.numero_facture}
                                      onChange={this.setField}
                                      ref={numero_facture => this.numero_facture = numero_facture}
                                       className="form-control" />
                                       </div>
                              </div>

                         

                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Date</label>
                                      <input name="date_facture"  type="date"
                                      defaultValue={objetEdit.date_facture}
                                      onChange={this.setField}
                                      ref={date_facture => this.date_facture = date_facture}
                                       className="form-control" />
                                       </div>
                              </div>

                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Réglée le</label>
                                      <input name="date_facture_reglee"  type="date"
                                      defaultValue={objetEdit.date_facture_reglee}
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
                                                <select name="livraison_entite"
                                                defaultValue={objetEdit.livraison_entite.id}
                                                 onChange={this.setField}
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
                                                    defaultValue={objetEdit.personne.id}
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
                                                <input name="livraison_adresse1"
                                                defaultValue={objetEdit.livraison_adresse1}  type="text"
                                      onChange={this.setField}
                                      ref={livraison_adresse1 => this.livraison_adresse1 = livraison_adresse1}
                                       className="form-control" />

                                                </div>

                                                <div className="col-md-2">
                                                <label  className="">Code postal</label>
                                                <input name="livraison_code_postal"  type="text"
                                                defaultValue={objetEdit.livraison_code_postal}
                                      onChange={this.setField}
                                      ref={livraison_code_postal => this.livraison_code_postal = livraison_code_postal}
                                       className="form-control" />

                                                </div>

                                                <div className="col-md-3">
                                                <label  className="">Ville</label>
                                                <input name="livraison_ville"  type="text"
                                                defaultValue={objetEdit.livraison_ville}
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
                                                    defaultValue={objetEdit.livraison_telephonne}
                                                                                onChange={this.setField}
                                                                                ref={livraison_telephonne => this.livraison_telephonne = livraison_telephonne}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Fax</label>
                                                    <input name="livraison_fax"  type="text"
                                                    defaultValue={objetEdit.livraison_fax}
                                                                                onChange={this.setField}
                                                                                ref={livraison_fax => this.livraison_fax = livraison_fax}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Mail</label>
                                                    <input name="livraison_mail"  type="text"
                                                    defaultValue={objetEdit.livraison_mail}
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
                                                    defaultValue={objetEdit.livraison_nom_interlocuteur}
                                                                                onChange={this.setField}
                                                                                ref={livraison_nom_interlocuteur => this.livraison_nom_interlocuteur = livraison_nom_interlocuteur}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Portable</label>
                                                    <input name="livraison_potable"  type="text"
                                                    defaultValue={objetEdit.livraison_potable}
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
                                                    defaultValue={objetEdit.facturation_entite}
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
                                                    defaultValue={objetEdit.facturation_adresse1}
                                                                                onChange={this.setField}
                                                                                ref={facturation_adresse1 => this.facturation_adresse1 = facturation_adresse1}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Code postal</label>
                                                    <input name="facturation_code_postal"  type="text"
                                                    defaultValue={objetEdit.facturation_code_postal}
                                                                                onChange={this.setField}
                                                                                ref={facturation_code_postal => this.facturation_code_postal = facturation_code_postal}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Ville</label>
                                                    <input name="facturation_ville"  type="text"
                                                    defaultValue={objetEdit.facturation_code_postal}
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
                                                    defaultValue={objetEdit.facturation_telephonne}
                                                                                onChange={this.setField}
                                                                                ref={facturation_telephonne => this.facturation_telephonne = facturation_telephonne}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-2">
                                                    <label  className="">Fax</label>
                                                    <input name="facturation_fax"  type="text"
                                                    defaultValue={objetEdit.facturation_fax}
                                                                                onChange={this.setField}
                                                                                ref={facturation_fax => this.facturation_fax = facturation_fax}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Mail</label>
                                                    <input name="facturation_mail"  type="text"
                                                    defaultValue={objetEdit.facturation_mail}
                                                                                onChange={this.setField}
                                                                                ref={facturation_mail => this.facturation_mail = facturation_mail}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-3">
                                                    <label  className="">Nom Interlocuteur</label>
                                                    <input name="facturation_interlocuteur"  type="text"
                                                    defaultValue={objetEdit.facturation_interlocuteur}
                                                                                onChange={this.setField}
                                                                                ref={facturation_interlocuteur => this.facturation_interlocuteur = facturation_interlocuteur}
                                                                                className="form-control" />

                                                    </div>

     

                                            </div>
                                                       
                                                        </div>
                                                    <div className="tab-pane" id="contenu_commande" role="tabpanel">
                                                   {!this.state.showContenuForm &&  <span onClick={this.toggleContenuCommande} className="mt-2 btn btn-info pull-right"
                                                     title="Ajouter le contenu de la commande">Ajouter</span>}

                                           {!this.state.showContenuForm && <table className="mb-0 table">
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
                                            {objetEdit.contenu_commandes.map(contenu => <ContenuCommandeItem 
                                            key={contenu.id} 
                                            onEditContenu={this.onEditContenu}
                                            onDeleteContenu={this.onDeleteContenu}
                                            item={contenu} /> )}
                                          
                                          
                                            </tbody>
                                        </table> }
                                        {this.state.showContenuForm &&
                                        <div>
                                        <div className="form-row">
                                        <div className="col-md-5">
                                                    <label  className="">Libéllé de la commande</label>
                                                    <input name="contenu_libelle_commande"  type="text"
                                                        defaultValue={this.LibelleAutoDeCommannde()}

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

                                                    <div className="col-md-2">
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
                                                    <input name="cv_fiscaux"  type="number"
                                                                                onChange={this.setField}
                                                                                ref={cv_fiscaux => this.cv_fiscaux = cv_fiscaux}
                                                                                className="form-control" />

                                                    </div>

                                                    <div className="col-md-1">
                                                    <label  className="">Places</label>
                                                    <input name="places"  type="number"
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
                                                    <input name="contenu_taux_tva"  type="number"
                                                        onChange={this.setField}
                                                     ref={contenu_taux_tva => this.contenu_taux_tva = contenu_taux_tva}
                                                        className="form-control" />

                                                    </div>
                                         

                                                    <div className="col-md-2">
                                                    <label  className="">Montant TTC</label>
                                                    <input name="contenu_montant_ttc"  type="number"
                                                    defaultValue={this.calculMontantTTCContenu()}
                                                    readOnly
                                                     ref={contenu_montant_ttc => this.contenu_montant_ttc = contenu_montant_ttc}
                                                        className="form-control" />

                                                    </div>
                                            </div>
                                            <span onClick={this.setContenuCommande} className="mt-2 btn btn-success">Valider</span>

                                            <span onClick={this.toggleContenuCommande} className="mt-2 btn btn-danger">Fermer</span>
                                            </div> }


                                 </div>
                                                  
                                      <div className="tab-pane" id="suivi_par" role="tabpanel">
                                      <div className="form-row">
                                      

                                      <div className="col-md-3">
                                                  <label  className="">Nom</label>
                                                  <select name="suivi_nom" onChange={this.setField}
                                                    ref={suivi_nom => this.suivi_nom = suivi_nom}
                                                    defaultValue={objetEdit.suivi_nom}
                                                className="form-control">
                                                <option defaultValue={null}></option>

                                                {this.props.personnels.map(tier => 
                                                        <option key={tier.id} value={tier.id}>{tier.nom} </option>

                                                        )}

                                                </select>
                                                  </div>
                                                  <div className="col-md-2">
                                                  <label  className="">Télephonne</label>
                                                  <input name="suivi_telephone"  type="text"
                                                  defaultValue={objetEdit.suivi_telephone}
                                                      onChange={this.setField}
                                                   ref={suivi_telephone => this.suivi_telephone = suivi_telephone}
                                                      className="form-control" />

                                                  </div>
                                                  <div className="col-md-2">
                                                  <label  className=""> N° de fax</label>
                                                  <input name="suivi_fax"  type="text"
                                                  defaultValue={objetEdit.suivi_fax}
                                                      onChange={this.setField}
                                                   ref={suivi_fax => this.suivi_fax = suivi_fax}
                                                      className="form-control" />

                                                  </div>

                                                  <div className="col-md-2">
                                                  <label  className="">Messagerie</label>
                                                  <input name="suivi_messagerie"  type="text"
                                                  defaultValue={objetEdit.suivi_messagerie}
                                                      onChange={this.setField}
                                                   ref={suivi_messagerie => this.suivi_messagerie = suivi_messagerie}
                                                      className="form-control" />

                                                  </div>

                                                  <div className="col-md-3">
                                                  <label  className="">Entité/Service</label>
                                                  <input name="suivi_entite_service"  type="text"
                                                  defaultValue={objetEdit.suivi_entite_service}
                                                      onChange={this.setField}
                                                   ref={suivi_entite_service => this.suivi_entite_service = suivi_entite_service}
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
        vehicules: state.vehicules.items,
        tiers: state.tiers.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        personnels: state.personnels.items,
        entites: state.entites.items,
        marques: state.marques.items,
        natures_energies: state.natures_energies.items,
        commandes: state.commandes.items

    }
  }

export default connect(mapStateToProps)(ModifierCommande)
