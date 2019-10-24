import React, { Component } from 'react'
import InputMask from 'react-input-mask';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {connect} from 'react-redux'
import NumberFormat from 'react-number-format';
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"





 class ModifierModeleVehicule extends Component {
    constructor(props) {
        super(props);
        this.state = {
           // date_creation: new Date(),
           typeSelected: 'Véhicule',
           energieSelected: 'Gasoil (GO)',
          // montant_forfait: 0.00,
          // cout: 0.00,
          mode_acquisition: 'Achat',
          leasing_duree: '1 an',
          type_permis: 'B',
          climatisation: 'non',
          pneu_neige: 'non',
          radio: 'non',
          gps: 'non',
          amortissement: 'Pas calcul',
          vehicule_remplacement_prevu: false,
          vehicule_propre: false,
          numero_contrat_location: '',
          echeance: '',
          duree_en_mois_location: '',
          pour_kilometre: '',
          montant_provision_carburant: '',
          montant_deposit: '',
          loyer_annuel_ttc: '',
          loyer_mensuel_ttc: '',
          leasing_apport_initial: '',
          leasing_valeur_rachat: '',
           modelModif: undefined

        }
    }

 
    componentDidMount(){
        axios.get('/api/voir_modele_vehicule/' + this.props.match.params.modele_id).then(response => {
            // const action = {type: "GET_ENTITE", value: response.data}
            //  this.props.dispatch(action)
            this.setState({modelModif: response.data})
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
            type="BallTriangle"
            color="#00BFFF"
            height={100}
            width={100}
         />
         </span>
    }

  

      verificationFormulaire () {
        if(this.nom_modele.value == undefined || !this.nom_modele.value.length){
            return "Le Nom du modèle est obligatoire !"
        }else if(this.categorie.value == undefined || !this.categorie.value.length){
            return "La Catégorie est obligatoire"
        }else if(!this.marque.value  || !this.marque.value.length){
            return "La Marque est obligatoire"
        }
        else{
            return null
        }
      
      }

      enregistrerPersonnel = (e) => {
        e.preventDefault()
          if(this.verificationFormulaire() == null){
           // console.log(this)
          // console.log(this.prix_ht)
            console.log(this.climatisation.value)
            // axios.post('/api/modifier_modele_vehicule/' + this.state.modelModif.id, {
            //     nom_modele: this.nom_modele.value,
            //     categorie: this.categorie.value,
            //     marque: this.marque.value,
            //     fournisseur: this.fournisseur.value,
            //     energie: this.energie.value,
            //     precision_energie: this.precision_energie.value,
            //     // vehicule propre a faire
            //     vehicule_remplacement_prevu: this.mode_acquisition.value ==="Location" ? this.vehicule_remplacement_prevu.checked : this.state.vehicule_remplacement_prevu,
            //     vehicule_propre: this.vehicule_propre.checked,
            //     chevaux: this.chevaux.value,
            //     nombre_place: this.nombre_place.value,
            //     taille_pneu: this.taille_pneu.value,
            //     couleur: this.couleur.value,
            //     longueur: this.longueur.value,
            //     largeur: this.largeur.value,
            //     hauteur: this.hauteur.value,
            //     leasing_valeur_rachat: this.mode_acquisition.value ==="Leasing" ? this.state.leasing_valeur_rachat : null,
            //     poids_vide: this.poids_vide.value,
            //     poids_charge: this.poids_charge.value,
            //     pression_pneu_avant: this.pression_pneu_avant.value,
            //     pression_pneu_arriere: this.pression_pneu_arriere.value,
            //     numero_contrat_location: this.mode_acquisition.value ==="Location" ? this.state.numero_contrat_location : null,
            //     echeance: this.mode_acquisition.value ==="Location" ? this.state.echeance : null,
            //     duree_en_mois_location: this.mode_acquisition.value ==="Location" ? this.state.duree_en_mois_location : null,
            //     montant_provision_carburant: this.mode_acquisition.value ==="Location" ? this.state.montant_provision_carburant : null,
            //     montant_deposit: this.mode_acquisition.value ==="Location" ? this.state.montant_deposit : null,
            //     loyer_annuel_ttc: this.mode_acquisition.value ==="Location" ? this.state.loyer_annuel_ttc : null,
            //     loyer_mensuel_ttc: this.mode_acquisition.value ==="Location" ? this.state.loyer_mensuel_ttc : null,
            //     leasing_apport_initial: this.mode_acquisition.value ==="Leasing" ? this.state.leasing_apport_initial : null,
            //     pour_kilometre: this.mode_acquisition.value ==="Location" ? this.state.pour_kilometre : null,
            //     entretien_par_km: this.entretien_par_km.value,
            //     taux_co2: this.taux_co2.value,
            //     cout_moyen_km: this.cout_moyen_km.value,
            //     cout_carte_grise: this.cout_carte_grise.value,
            //     contrat: this.contrat.value,
            //     duree_annee_garantie: this.duree_annee_garantie.value,
            //     duree_annee_amortissement: this.duree_annee_amortissement.value,
            //     prix_ht: this.mode_acquisition.value === "Achat" ? this.prix_ht.value : null,
            //     tva: this.mode_acquisition.value === "Achat" ? this.tva.value : null,
            //     prix_ttc: this.mode_acquisition.value ==="Achat" ? this.prix_ttc.value : null,
            //    // loyer_annuel: this.loyer_annuel.value,
              

            //     amortissement: this.amortissement.value,
            //     climatisation: this.climatisation.value,
            //     radio: this.radio.value,
            //     gps: this.gps.value,
            //     type_permis: this.type_permis.value,
            //     leasing_duree: this.mode_acquisition.value ==="Leasing" ? this.state.leasing_duree : this.leasing_duree,
            //     mode_acquisition: this.mode_acquisition.value,

            // }).then(response => {
                
            //    const action = {type: "EDIT_MODELE_VEHICULE", value: response.data}
            //    this.props.dispatch(action)

            //  this.props.history.push('/modeles_de_véhicules')
            // }).catch(error => console.log(error))

          }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }
      }
    

    render() {
        //console.log(this.checkUser())
        const {modelModif} = this.state
       // console.log(modelModif)
        return (
            <div className="app-main__inner">
             {modelModif != undefined ?

                <div>
                   <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
                            <li className="nav-item">
                                <a role="tab" className="nav-link active" id="tab-0"
                                 data-toggle="tab" href="#tab-content-0">
                                    <span>Description</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a role="tab" className="nav-link" id="tab-1"
                                 data-toggle="tab" href="#tab-content-1">
                                    <span>Acquisition</span>
                                </a>
                            </li>
                        </ul>

                        <form className="" onChange={this.setField} onSubmit={this.enregistrerPersonnel}>
                        <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>

                        <div className="tab-content">
                        <div className="tab-pane tabs-animation fade show active"
                         id="tab-content-0" role="tabpanel">
                            
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Fichier des modèles de véhicules

                        </h5>

                                <div className="form-row">
                                 
                                    <div className="col-md-3">
                                    <label  className="">Catégorie</label>
                                        <select  
                                        defaultValue={modelModif.categorie.id}
                                         name="categorie" 
                                        ref={categorie => this.categorie = categorie}
                                         className="form-control">
                                            <option value={null}></option>
                                            {this.props.categories_vehicules.map(cat =>
                                            <option key={cat.id}  value={cat.id}>{cat.nom_type}</option>
                                            )}

                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                    <label  className="">Marque</label>
                                        <select 
                                        defaultValue={modelModif.marque.id}
                                         name="marque" 
                                        ref={marque => this.marque = marque}
                                         className="form-control">
                                             <option value={null}></option>
                                            {this.props.marques.map(marque =>
                                            <option key={marque.id}  value={marque.id}>{marque.nom_marque}</option>
                                            )}

                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                    <label  className="">Fournisseur/Loueur par défaut</label>
                                        <select 
                                        defaultValue={modelModif.fournisseur.id}
                                         name="fournisseur" 
                                        ref={fournisseur => this.fournisseur = fournisseur}
                                         className="form-control">
                                           <option value={null}></option>
                                            {this.props.tiers.map(tier =>
                                            <option key={tier.id}  value={tier.id}>{tier.code}</option>
                                            )}

                                        </select>
                                
                                        </div>

                                        <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Modèle</label>
                                            <input name="nom_modele"
                                            ref={nom_modele => this.nom_modele = nom_modele}
                                            type='text'
                                            defaultValue={modelModif.nom_modele}
                                         
                                             className="form-control" /></div>
                                    </div>
                                 
                                </div>
                                <div className="form-row">
                                <div className="col-md-3">
                                    <label  className="">Energie</label>
                                        <select defaultValue={modelModif.energie} name="energie" 
                                        ref={energie => this.energie = energie}
                                         className="form-control">
                                         <option value="SUPER (SP)">SUPER (SP)</option>

                                            <option value="Electricité">Electricité</option>
                                            <option value="Essence">Essence</option>
                                            <option value="Gasoil (GO)">Gasoil (GO)</option>


                                        </select>
                                
                                        </div>
                                   
                                   
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Précision énergie</label>
                                            <input name="precision_energie"
                                            defaultValue={modelModif.precision_energie}
                                            ref={precision_energie => this.precision_energie = precision_energie}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Véhicule propre
                                             <input type="checkbox" 
                                             
                                             ref={vehicule_propre => this.vehicule_propre = vehicule_propre}
                                               onChange={this.setField}
                                               defaultChecked={modelModif.vehicule_propre}

                                                 name="vehicule_propre" className="" /></label>
                                        </div>
                                    </div>
                                 
                                </div>

                                <div className="form-row">
                              
                                   
                                   
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Chevaux Fiscaux</label>
                                            <input name="chevaux"
                                            defaultValue={modelModif.chevaux}
                                            ref={chevaux => this.chevaux = chevaux}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Nombre de places</label>
                                            <input name="nombre_place"
                                            defaultValue={modelModif.nombre_place}
                                            ref={nombre_place => this.nombre_place = nombre_place}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Couleur</label>
                                            <input name="couleur"
                                            defaultValue={modelModif.couleur}
                                            ref={couleur => this.couleur = couleur}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Taille des pneus</label>
                                            <input name="taille_pneu"
                                            defaultValue={modelModif.taille_pneu}
                                            ref={taille_pneu => this.taille_pneu = taille_pneu}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Longueur</label>
                                            <input name="longueur"
                                            defaultValue={modelModif.longueur}
                                            ref={longueur => this.longueur = longueur}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Largeur</label>
                                            <input name="largeur"
                                            defaultValue={modelModif.largeur}
                                            ref={largeur => this.largeur = largeur}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    
                                 
                                 
                                </div>

                                <div className="form-row">
                              
                                   
                                   
                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Hauteur</label>
                                      <input name="hauteur"
                                      defaultValue={modelModif.hauteur}
                                      ref={hauteur => this.hauteur = hauteur}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Poids a vide</label>
                                      <input name="poids_vide"
                                      defaultValue={modelModif.poids_vide}
                                      ref={poids_vide => this.poids_vide = poids_vide}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Poids en charge</label>
                                      <input name="poids_charge"
                                      defaultValue={modelModif.poids_charge}
                                      ref={poids_charge => this.poids_charge = poids_charge}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Pression des pneus avant</label>
                                      <input name="pression_pneu_avant"
                                      defaultValue={modelModif.pression_pneu_avant}
                                      ref={pression_pneu_avant => this.pression_pneu_avant = pression_pneu_avant}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Pression des pneus arrières</label>
                                      <input name="pression_pneu_arriere"
                                      defaultValue={modelModif.pression_pneu_arriere}
                                      ref={pression_pneu_arriere => this.pression_pneu_arriere = pression_pneu_arriere}
                                        type="text" className="form-control" /></div>
                              </div>

                          

                              
                           
                           
                          </div>
                                   

                                 


                              

                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Climatisation ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="climatisation"
                                             onChange={this.setField}
                                             defaultChecked={modelModif.climatisation === "oui"}
                                             ref={climatisation => this.climatisation = climatisation}
                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                            ref={climatisation => this.climatisation = climatisation}
                                             name="climatisation"
                                             defaultChecked={modelModif.climatisation === "non"}
                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Pneus neige ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="pneu_neige"
                                             onChange={this.setField}
                                             ref={pneu_neige => this.pneu_neige = pneu_neige}
                                             defaultChecked={modelModif.pneu_neige === "oui"}
                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                            ref={pneu_neige => this.pneu_neige = pneu_neige}
                                             name="pneu_neige"
                                             defaultChecked={modelModif.pneu_neige === "non"}
                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                
                                <div className="form-row">
                                   
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Radio/CD ? </label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="radio"
                                             onChange={this.setField}
                                             ref={radio => this.radio = radio}
                                             defaultChecked={modelModif.radio === "oui"}
                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                            ref={radio => this.radio = radio}

                                             name="radio"
                                             defaultChecked={modelModif.radio === "non"}
                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                    <div className="col-md-2"></div>
                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label className="center">Gps ?</label>
                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                    <div className="position-relative form-group">
                                            <label className="">
                                            Oui  <input type="radio"
                                             name="gps"
                                             onChange={this.setField}
                                             ref={gps => this.gps = gps}

                                             defaultChecked={modelModif.gps === "oui"}
                                              value="oui"
                                               className="" /> </label>
                                        </div>
                                    </div>

                                    <div className="col-md-1">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Non  <input type="radio"
                                            onChange={this.setField}
                                             name="gps"
                                             ref={gps => this.gps = gps}

                                             defaultChecked={modelModif.gps === "non"}
                                              value="non" className="" /></label>
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="form-row">
                              
                                   
                                   
                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Entretien a faire tous les x kms</label>
                                      <input name="entretien_par_km"
                                      defaultValue={modelModif.entretien_par_km}
                                      ref={entretien_par_km => this.entretien_par_km = entretien_par_km}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Taux d'émission de CO2</label>
                                      <input name="taux_co2"
                                      defaultValue={modelModif.taux_co2}

                                      ref={taux_co2 => this.taux_co2 = taux_co2}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Coût moyen du kilometrage</label>
                                      <input name="cout_moyen_km"
                                         defaultValue={modelModif.cout_moyen_km}

                                      ref={cout_moyen_km => this.cout_moyen_km = cout_moyen_km}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Coût de la carte grise</label>
                                      <input name="cout_carte_grise"
                                      defaultValue={modelModif.cout_carte_grise}
                                      ref={cout_carte_grise => this.cout_carte_grise = cout_carte_grise}
                                        type="text" className="form-control" /></div>
                              </div>

                        
                           
                          </div>

                          <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Type de Permis necéssaire pour ce véhicule</label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           A1  <input type="radio"
                                             onChange={this.setField}
                                             defaultChecked={modelModif.type_permis === "A1"}
                                             ref={type_permis => this.type_permis = type_permis}

                                            name="type_permis" value="A1"  className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           A  <input type="radio" name="type_permis"
                                            onChange={this.setField}
                                            ref={type_permis => this.type_permis = type_permis}

                                            defaultChecked={modelModif.type_permis === "A"}
                                            value="A" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           B  <input type="radio" name="type_permis"
                                                ref={type_permis => this.type_permis = type_permis}

                                                onChange={this.setField}
                                                defaultChecked={modelModif.type_permis === "B"}
                                                value="B" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           C  <input type="radio" name="type_permis"
                                             onChange={this.setField}
                                             ref={type_permis => this.type_permis = type_permis}

                                             defaultChecked={modelModif.type_permis === "C"}
                                            value="C" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           C1  <input type="radio" name="type_permis"
                                             onChange={this.setField}
                                             ref={type_permis => this.type_permis = type_permis}

                                             defaultChecked={modelModif.type_permis === "C1"}
                                            value="C1" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           D  <input type="radio" name="type_permis"
                                              onChange={this.setField}
                                              ref={type_permis => this.type_permis = type_permis}

                                              defaultChecked={modelModif.type_permis === "D"}
                                              value="D" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           E  <input type="radio"
                                              onChange={this.setField}
                                              ref={type_permis => this.type_permis = type_permis}

                                              defaultChecked={modelModif.type_permis === "E"}
                                              name="type_permis" value="E" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           F  <input type="radio" name="type_permis"
                                              onChange={this.setField}
                                              ref={type_permis => this.type_permis = type_permis}

                                              defaultChecked={modelModif.type_permis === "F"}
                                              value="F" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           BCDE  <input type="radio" name="type_permis"
                                              onChange={this.setField}
                                              ref={type_permis => this.type_permis = type_permis}
                                              defaultChecked={modelModif.type_permis === "BCDE"}
                                              value="BCDE" className="" /></label>
                                       </div>
                                   </div>
                               </div>

                               <div className="form-row">
                              
                                   
                                   
                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Contrat d'assurance</label>
                                      <input name="contrat"
                                      defaultValue={modelModif.contrat}
                                      ref={contrat => this.contrat = contrat}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Garantie (année)</label>
                                      <input name="duree_annee_garantie"
                                      defaultValue={modelModif.duree_annee_garantie}
                                      ref={duree_annee_garantie => this.duree_annee_garantie = duree_annee_garantie}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Amortissement ===></label>
                                     
                                    </div>
                              </div>

                             
                              <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Pas calcul  <input type="radio" name="amortissement"
                                              onChange={this.setField}
                                              ref={amortissement => this.amortissement = amortissement}
                                              defaultChecked={modelModif.amortissement === "Pas calcul"}
                                            value="Pas calcul" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Dégressif  <input type="radio" name="amortissement"
                                              onChange={this.setField}
                                              ref={amortissement => this.amortissement = amortissement}

                                              defaultChecked={modelModif.amortissement === "Dégressif"}
                                            value="Dégressif" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Linéaire  <input type="radio" name="amortissement"
                                              onChange={this.setField}
                                              ref={amortissement => this.amortissement = amortissement}

                                              defaultChecked={modelModif.amortissement === "Linéaire"}                                            
                                              value="Linéaire" className="" /></label>
                                       </div>
                                   </div>

                                   <div className="col-md-1">
                                  <div className="position-relative form-group">
                                      <label >durée</label>
                                      <input name="duree_annee_amortissement"
                                      defaultValue={modelModif.duree_annee_amortissement}
                                      ref={duree_annee_amortissement => this.duree_annee_amortissement = duree_annee_amortissement}
                                        type="text" className="form-control" /></div>
                              </div>

                        
                           
                          </div>

                            
                            

                        </div>
                    </div>
                        </div>


                        <div className="tab-pane tabs-animation fade" id="tab-content-1" role="tabpanel">

                            
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Acquisition

                        </h5>

                          <div className="form-row">
                                   
                                   <div className="col-md-3">
                                       <div className="position-relative form-group">
                                           <label className="center">Mode d'acquisition</label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                   <div className="position-relative form-group">
                                           <label className="">
                                           Achat  <input type="radio"
                                             onChange={this.setField}
                                             ref={mode_acquisition => this.mode_acquisition = mode_acquisition}
                                             defaultChecked={modelModif.mode_acquisition === "Achat"}

                                            name="mode_acquisition" value="Achat"  className="" /> </label>
                                       </div>
                                   </div>

                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Location  <input type="radio" name="mode_acquisition"
                                            onChange={this.setField}
                                            ref={mode_acquisition => this.mode_acquisition = mode_acquisition}

                                            defaultChecked={modelModif.mode_acquisition === "Location"}
                                            value="Location" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           Leasing  <input type="radio" name="mode_acquisition"
                                             ref={mode_acquisition => this.mode_acquisition = mode_acquisition}
                                             onChange={this.setField}
                                                defaultChecked={modelModif.mode_acquisition === "Leasing"}
                                                value="Leasing" className="" /></label>
                                       </div>
                                   </div>
                                 
                                 
                               </div>

                               {this.state.mode_acquisition === "Achat" ? 

                                <div className="form-row">
                                <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Prix HT</label>
                                            <input name="prix_ht"
                                            defaultValue={modelModif.prix_ht}
                                            ref={prix_ht => this.prix_ht = prix_ht}
                                              type="text" className="form-control" /></div>
                                    </div>
                                <div className="col-md-4">
                                    <label  className="">TVA</label>
                                        <select  name="tva" 
                                        defaultValue={modelModif.tva}
                                        ref={tva => this.tva = tva}
                                         className="form-control">
                                            <option value={1}>Véhicule</option>
                                            <option value={1}>Engin</option>

                                        </select>
                                
                                        </div>
                                   
                                   
                                 

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Prix TTC</label>
                                            <input name="prix_ttc"
                                            defaultValue={modelModif.prix_ttc}
                                            ref={prix_ttc => this.prix_ttc = prix_ttc}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    
                                  
                                 
                                </div>
                                : this.state.mode_acquisition === "Location" ?
                                    <div>
                                <div className="form-row">
                              
                                   
                                   
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >N° Contrat de Location</label>
                                            <input name="numero_contrat_location"
                                            defaultValue={modelModif.numero_contrat_location}
                                            ref={numero_contrat_location => this.numero_contrat_location = numero_contrat_location}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Echéance</label>
                                            <input name="echeance"
                                            defaultValue={modelModif.echeance}
                                            ref={echeance => this.echeance = echeance}
                                              type="date" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label className="form-check-label">
                                            Véhicule de remplacement prévu ? {' '}
                                             <input type="checkbox"
                                             ref={vehicule_remplacement_prevu => this.vehicule_remplacement_prevu = vehicule_remplacement_prevu}
                                               onChange={this.setField}
                                               defaultChecked={modelModif.vehicule_remplacement_prevu}
                                                 name="vehicule_remplacement_prevu" className="" /></label>
                                        </div>
                                    </div>


                                    
                                 
                                 
                                </div>

                                <div className="form-row">
                              
                                   
                                   
                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Durée en mois</label>
                                      <input name="duree_en_mois_location"
                                      defaultValue={modelModif.duree_en_mois_location}
                                      ref={duree_en_mois_location => this.duree_en_mois_location = duree_en_mois_location}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-1">
                                  <div className="position-relative form-group">
                                      <label >Kilometres</label>
                                      <input name="pour_kilometre"
                                      defaultValue={modelModif.pour_kilometre}
                                      ref={pour_kilometre => this.pour_kilometre = pour_kilometre}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Mt provision carburant</label>
                                      <input name="montant_provision_carburant"
                                      defaultValue={modelModif.montant_provision_carburant}
                                      ref={montant_provision_carburant => this.montant_provision_carburant = montant_provision_carburant}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Montant déposit</label>
                                      <input name="montant_deposit"
                                      defaultValue={modelModif.montant_deposit}
                                      ref={montant_deposit => this.montant_deposit = montant_deposit}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-3">
                                  <div className="position-relative form-group">
                                      <label >Loyer annuel TTC</label>
                                      <input name="loyer_annuel_ttc"
                                      defaultValue={modelModif.loyer_annuel_ttc}
                                      ref={loyer_annuel_ttc => this.loyer_annuel_ttc = loyer_annuel_ttc}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Loyer mensuel TTC</label>
                                      <input name="loyer_mensuel_ttc"
                                      defaultValue={modelModif.loyer_mensuel_ttc}
                                      ref={loyer_mensuel_ttc => this.loyer_mensuel_ttc = loyer_mensuel_ttc}
                                        type="text" className="form-control" /></div>
                              </div>

                          

                              
                           
                           
                          </div>
                             </div>      
                            : 
                                
                                
                  

                               <div className="form-row">
                              
                                   
                                   
                          

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Durée ===></label>
                                     
                                    </div>
                              </div>

                             
                              <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           1 an  <input type="radio" name="leasing_duree"
                                              onChange={this.setField}
                                              defaultChecked={modelModif.leasing_duree === "1 an"}
                                            value="1 an" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           2 ans  <input type="radio" name="leasing_duree"
                                              onChange={this.setField}
                                              defaultChecked={modelModif.leasing_duree === "2 ans"}
                                            value="2 ans" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           3 ans  <input type="radio" name="leasing_duree"
                                              onChange={this.setField}
                                              defaultChecked={modelModif.leasing_duree === "3 ans"}
                                            value="3 ans" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           4 ans  <input type="radio" name="leasing_duree"
                                              onChange={this.setField}
                                              defaultChecked={modelModif.leasing_duree === "4 ans"}
                                            value="4 ans" className="" /></label>
                                       </div>
                                   </div>
                                   <div className="col-md-1">
                                       <div className="position-relative form-group">
                                           <label className="form-check-label">
                                           5 ans  <input type="radio" name="leasing_duree"
                                              onChange={this.setField}
                                              defaultChecked={modelModif.leasing_duree === "5 ans"}
                                            value="5 ans" className="" /></label>
                                       </div>
                                   </div>


                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Apport Initial</label>
                                      <input name="leasing_apport_initial"
                                      defaultValue={modelModif.leasing_apport_initial}
                                      ref={leasing_apport_initial => this.leasing_apport_initial = leasing_apport_initial}
                                        type="text" className="form-control" /></div>
                              </div>

                              <div className="col-md-2">
                                  <div className="position-relative form-group">
                                      <label >Valeur Rachat</label>
                                      <input name="leasing_valeur_rachat"
                                      defaultValue={modelModif.leasing_valeur_rachat}
                                      ref={leasing_valeur_rachat => this.leasing_valeur_rachat = leasing_valeur_rachat}
                                        type="text" className="form-control" /></div>
                              </div>

                        
                           
                          </div>

                            }
                            

                        </div>
                    </div>
                        </div>
                            
                    </div>



                    </form>
                    <ToastContainer autoClose={8000} />
                    </div>
         : this.renderLoading() }

       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories_vehicules: state.categories_vehicules.items,
        tiers: state.tiers.items,
        marques: state.marques.items,

    }
  }

export default connect(mapStateToProps)(ModifierModeleVehicule)