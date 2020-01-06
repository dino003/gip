import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import UtilisationItem from '../../components/vehicules/UtilisationItem';
import {ToastContainer, toast } from 'react-toastify';
import ModifierUtilisationVehicule from '../forms/Vehicules/ModifierUtilisationVehicule';
import InputMask from 'react-input-mask';
import MatriculeInput from '../../components/MatriculeInput';

import today from '../../utils/today'
import inputStyle from '../../utils/inputStyle'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Container, Button, Link } from 'react-floating-action-button'



  class Utilisations extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            isOpen: false,
            isEdit: false,
            objetModif: undefined,
            editIndex: undefined,
            utilisations: []

        }   
    }

    // componentDidMount(){
    // this.setState({
    //     utilisations: this.props.utilisations.filter(util => util.vehicule.id == this.props.vehiculeSeleted.id),
    //     //loading: false
    //  })

    //  if(this.props.vehiculeSeleted == undefined){
    //   const action = {type: "EDIT_SELECTED", value: this.props.location.state.veh}
    //   this.props.dispatch(action)

    //  }

    // }


    onDelete = (id) => {

        confirmAlert({
            title: 'Suppression',
            message: 'Voulez-vous vraiment supprimer ?',
            buttons: [
              {
                label: 'OUI',
                onClick: () => {
                    const action = {type: "REMOVE_UTILISATION", value: id}
                    this.props.dispatch(action)
                   
                    axios.delete('/api/supprimer_vehicule_utilisation/' + id).then(_ =>  toast.success("Supprimé avec succès !", {
                        position: toast.POSITION.BOTTOM_CENTER
                      }))
                } 
              },
              {
                label: 'ANNULER',
                onClick: () => {}
              }
            ]
          });

        // let conf = confirm('Voulez-vous vraiment supprimer ?')
        // if(conf === true){
        //     const action = {type: "REMOVE_UTILISATION", value: id}
        //     this.props.dispatch(action)
        //    // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
        //     axios.delete('/api/supprimer_vehicule_utilisation/' + id)
            
        // }
       
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

    onEdit = ( id, index) => {
        var utilisations = this.props.utilisations.filter(util => util.vehicule.id == this.props.match.vehicule_id)
       // var struc = utilisations[index]


        this.setState({
            objetModif: utilisations.find(util => util.id == id),
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

    setFielDdateDebutUtilisation = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => this.date_fin_utilisation.value = this.date_debut_utilisation.value);
    }

    verificationFormulaire () {
        if(this.kilometres_parcourus.value < 0 && this.kilometres_parcourus.value.length){
            return "Le nombre de kilomètre parcourus ne peut être négatif !"
        }else if(this.nature_utilisation.value == undefined || !this.nature_utilisation.value.length){
          return "La nature d'utilisation est obligatoire !"
        } else if(this.utilisatation_normal_ou_pret.value == undefined || !this.utilisatation_normal_ou_pret.value.length){
            return "Le type d'utilisation est obligatoire !"
          }else if(this.utilisateur.value == undefined || !this.utilisateur.value.length){
            return "L'utilisateur est obligatoire !"
          }else if(this.date_debut_utilisation.value == undefined || !this.date_debut_utilisation.value.length){
            return "La date de début d'utilisation est obligatoire !"
          }else if(this.date_fin_utilisation.value == undefined || !this.date_fin_utilisation.value.length){
            return "La date de fin d'utilisation est obligatoire !"
          }else if(this.heure_debut.value == undefined || !this.heure_debut.value.length){
            return "L'heure de début d'utilisation est obligatoire !"
          }else if(this.heure_de_fin.value == undefined || !this.heure_de_fin.value.length){
            return "L'heure de fin d'utilisation est obligatoire !"
          }else{
            return null
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

        setFieldKilometrageRetour = (event) => {
            //  this.setState({[e.target.name]: e.target.value})
              const target = event.target;
              const value = target.type === 'checkbox' ? target.checked : target.value;
              const name = target.name;
          
              this.setState({
                [name]: value
              }, () => {
                  //alert('ok')
                this.kilometres_parcourus.value = this.kilometrage_compteur_retour.value - this.kilometrage_compteur_debut.value
              //  this.kilometrage_compteur_retour.value = parseFloat(this.kilometres_parcourus.value) + parseFloat(this.kilometrage_compteur_debut.value)

              });

            }

            setFieldKilometrageParcourus = (event) => {
                //  this.setState({[e.target.name]: e.target.value})
                  const target = event.target;
                  const value = target.type === 'checkbox' ? target.checked : target.value;
                  const name = target.name;
              
                  this.setState({
                    [name]: value
                  }, () => {
                      //alert('ok')
                   // this.kilometres_parcourus.value = this.kilometrage_compteur_retour.value - this.kilometrage_compteur_debut.value
                    this.kilometrage_compteur_retour.value = parseFloat(this.kilometres_parcourus.value) + parseFloat(this.kilometrage_compteur_debut.value)
    
                  });
    
                }

                checkIfUtilisationIsPossible = (debut, fin) => {
                    var vehicule = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
                    var lesReservationsDuVehicule = this.props.reservations.filter(reser => reser.vehicule.id == vehicule.id && !reser.abandonne && !reser.transforme_en_utilisation)
                   
                    var tab = []
                    var debut = Date.parse(debut)
                    var fin = Date.parse(fin)
            
                    lesReservationsDuVehicule.map(veh => {
                        let dateDebutDejaReserve = Date.parse(veh.date_debut_reservation)
                        let dateFinDejaReserve = Date.parse(veh.date_fin_reservation)
                        tab.push(debut >= dateDebutDejaReserve && debut <= dateFinDejaReserve)
                        tab.push(fin >= dateDebutDejaReserve && fin <= dateFinDejaReserve)
                        tab.push(debut <= dateDebutDejaReserve && fin >= dateFinDejaReserve)
                    })
             
                    return (tab.includes(true)) ? 'Il y\'a déja une réservation pour ce véhicule et pour cette période' : null 
                  }

      resetForm(){
          this.setState(this.base)
      }

      onEditSubmit = ( utilisatation_normal_ou_pret, nature_utilisation, utilisateur, chauffeur,date_debut_utilisation, heure_debut,date_fin_utilisation, heure_de_fin, kilometrage_compteur_debut, kilometrage_compteur_retour, kilometres_parcourus, lieu_depart, destination) => {
       //  e.preventDefault()
        let modif = this.state.objetModif
        const utili = this.props.personnels.find(per => per.id == utilisateur)

          axios.post('/api/modifier_vehicule_utilisation/' + modif.id, {
                  // vehicule: this.props.vehiculeSeleted.id,
                 // vehicule_id: vehicule.id,
                   utilisateur_id: utilisateur,
                   chauffeur_id: chauffeur,
                   utilisatation_normal_ou_pret: utilisatation_normal_ou_pret,
                   utilisateur: utilisateur,
                   entite_utilisateur: utili.entite_affectation.entite,
                   entite_utilisateur_id: utili.entite_affectation.entite,
                   nature_utilisation: nature_utilisation,
                   chauffeur: chauffeur,
                   date_debut_utilisation: date_debut_utilisation,
                   date_fin_utilisation: date_fin_utilisation,
                   heure_debut: heure_debut,
                   heure_de_fin: heure_de_fin,
                   kilometrage_compteur_debut: kilometrage_compteur_debut,
                   kilometrage_compteur_retour: kilometrage_compteur_retour,
                   kilometres_parcourus: kilometres_parcourus,
                   lieu_depart: lieu_depart,
                   destination: destination,  
          }).then(response => {
            const action = {type: "EDIT_UTILISATION", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    
           // console.log(sin)
      }

      enregistrerUtilisation = async (e) => {
          e.preventDefault()
          var vehicule = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
          const utili = this.props.personnels.find(per => per.id == this.utilisateur.value)

          if(this.verificationFormulaire() == null){
           await axios.post('/api/ajouter_vehicule_utilisation', 
               {
                   vehicule: vehicule.id,
                   vehicule_id: vehicule.id,
                   utilisateur_id: this.utilisateur.value,
                   chauffeur_id: this.chauffeur.value,
                   utilisatation_normal_ou_pret: this.utilisatation_normal_ou_pret.value,
                   utilisateur: this.utilisateur.value,
                   entite_utilisateur: utili.entite_affectation.entite,
                   entite_utilisateur_id: utili.entite_affectation.entite,
                   nature_utilisation: this.nature_utilisation.value,
                   chauffeur: this.chauffeur.value,
                   date_debut_utilisation: this.date_debut_utilisation.value,
                   date_fin_utilisation: this.date_fin_utilisation.value,
                   heure_debut: this.heure_debut.value,
                   heure_de_fin: this.heure_de_fin.value,
                   kilometrage_compteur_debut: this.kilometrage_compteur_debut.value,
                   kilometrage_compteur_retour: this.kilometrage_compteur_retour.value,
                   kilometres_parcourus: this.kilometres_parcourus.value,
                   lieu_depart: this.lieu_depart.value,
                   destination: this.destination.value,   

            }
            ).then(response => {
                const action = {type: "ADD_UTILISATION", value: response.data}
                this.props.dispatch(action)
                const val = {id: vehicule.id, kilometrage_acquisition: response.data.kilometrage_compteur_retour }
                const action2 = {type: "EDIT_VEHICULE_KILOMETRAGE", value: val}

                this.props.dispatch(action2)
                var vehicule2 = this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
                const action3 = {type: "EDIT_SELECTED", value: vehicule2}
                this.props.dispatch(action3)

                this.closeEdit();
            })
             .catch(error => console.log(error));
        

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

    renderEmpty(){
       return <span style={{textAlign: 'center', color: 'red'}}>
            Aucune donnée enregistrée !            
        </span>
    }

    onSelect = id => {
       const obj = this.props.vehicules.find(veh => veh.id === id)

      // console.log(obj)
       this.setState(obj)

    }

    renderList(){
        const utilis = this.props.utilisations.filter(util => util.vehicule.id == this.props.match.params.vehicule_id)
        return (  <table className="mb-0 table" id="export" >
        <thead>
        <tr>
        <th>Véhicule</th>

            <th>Entité de l'utilisateur</th>
            <th>Utilisateur</th>
            <th>Chauffeur</th>
            <th>Type</th>
            <th>Nature utilisation</th>
            <th>Date début</th>
            <th>Heure</th>
            <th>Date fin</th>
            <th>Heure</th>
            <th>Kms compteur </th>
            <th>Kms Parcourus</th>
            <th>Kms Retour</th>




        </tr>
        </thead>
        <tbody>
          
     { utilis.map((item, index) => 
         <UtilisationItem
         style={{backgroundColor: 'orange'}}
         index={index}
          key={item.id} 
          onEdit={this.onEdit}              
          onDelete={this.onDelete}
         item={item} />
    )  }         
        </tbody>
    </table>)
    }

    calcule = () => {
        return this.kilometrage_compteur_retour.value - this.kilometrage_compteur_debut.value
    }
    
    

    render() {
        if(this.props.vehiculeSeleted == undefined && this.props.vehicules.length){
            const action = {type: "EDIT_SELECTED", value:  this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}
              this.props.dispatch(action)
            }
        const vehiculeSelect = this.props.vehiculeSeleted ? this.props.vehiculeSeleted : this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)
        const utilisations = this.props.utilisations.filter(util => util.vehicule.id == this.props.match.params.vehicule_id)


        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des utilisations du véhicule
                          
                        
                          
                            <span className="pull-right">
                        
                            {/* <button title=" Ajouter un nouvel acteur"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={this.closeEdit}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button> */}

                                             { this.props.utilisations.filter(inter => inter.vehicule.id == this.props.match.params.vehicule_id).length ?

                                                <ReactHTMLTableToExcel
                                                id="test-table-xls-button"
                                                className="mb-2 mr-2 btn-transition btn btn-outline-success"
                                                table="export"
                                                filename={`Liste des Utilisations de ${vehiculeSelect ? vehiculeSelect.immatriculation : null}`}
                                                sheet="tablexls"
                                                buttonText="Ecran -> Liste"/> : null}
                                </span>
                             
                                {this.props.vehicules.length ?
                            <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)}/> : null
                            }                                 
                            </h5>
                           <div className="table-responsive">
                   
                           {!this.props.vehicules.length ? this.renderLoading() : 
                            !utilisations.length ? this.renderEmpty() : this.renderList()}


                             
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
                        <form ref={(ref) => this.formRef = ref} className="p-3" onChange={this.setField} onSubmit={this.enregistrerUtilisation}>
                            <br />
                            <div className="form-row">
                                <div className="col-md-6">
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Type d'utilisation</label>
                                    <select className="form-control"
                                    style={inputStyle}

                                     ref={utilisatation_normal_ou_pret => this.utilisatation_normal_ou_pret = utilisatation_normal_ou_pret}
                                        onChange={this.setField}
                                     name="utilisatation_normal_ou_pret">
                                        <option >Utilisation normale</option>
                                        <option >Prêt</option>
                                      
                                    </select>
                                </div>
                                </div>
                           
                                <div className="col-md-6">
                             

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Nature Utilisation</label>
                                    <select className="form-control"
                                     style={inputStyle}

                                     ref={nature_utilisation => this.nature_utilisation = nature_utilisation}
                                        onChange={this.setField}
                                     name="nature_utilisation">
                                        <option value={null}></option>

                                         {this.props.natures_reservations.map(nat => 
                                        <option key={nat.id} value={nat.id}>{nat.libelle}</option>

                                         )}
                                      

                                    </select>
                                </div>
                                </div>
                               

                                </div>

                                <div className="form-row">
                                <div className="col-md-6">
                                    <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Utilisateur</label>
                                    <select className="form-control"
                                     style={inputStyle}

                                    defaultValue={vehiculeSelect == undefined ?
                                        null : vehiculeSelect.detenteur ? vehiculeSelect.detenteur.id : null}
                                     ref={utilisateur => this.utilisateur = utilisateur}
                                        onChange={this.setField}
                                     name="utilisateur">
                                         <option value={null}></option>
                                         {this.props.personnels.map(per => 
                                             <option key={per.id} value={per.id}>{per.prenom} {per.nom}</option>

                                         )}
                                      

                                    </select>
                                </div>
                                    </div>
                              

                              
                             <div className="col-md-6">
                                 {/*
                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Entité de l'utilisateur</label>
                                    <select className="form-control"
                                        style={inputStyle}

                                     defaultValue={vehiculeSelect == undefined ?
                                        null : vehiculeSelect.entite_comptable ? vehiculeSelect.entite_comptable.id : null}
                                     ref={entite_utilisateur => this.entite_utilisateur = entite_utilisateur}
                                        onChange={this.setField}
                                     name="entite_utilisateur">
                                         <option value={null}></option>

                                        {this.props.entites.map(ent => 
                                             <option key={ent.id} value={ent.id}>{ent.entite}</option>

                                        )}                                      

                                    </select>
                                </div>
                                */}

                                <div className="position-relative form-group">
                                    <label htmlFor="exampleAddress" className="">Chauffeur</label>
                                    <select className="form-control"
                                     ref={chauffeur => this.chauffeur = chauffeur}
                                        onChange={this.setField}
                                        defaultValue={vehiculeSelect == undefined ?
                                            null : vehiculeSelect.detenteur ? vehiculeSelect.detenteur.id : null}
                                         name="chauffeur">
                                             <option value={null}></option>
                                             {this.props.personnels.map(per => 
                                                 <option key={per.id} value={per.id}>{per.prenom} {per.nom}</option>
    
                                             )}

                                    </select>
                                </div>
                            </div>
                              
                                </div>
                              
                           
                             

                              
                              
                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Date début utilisation</label>
                                            <input name="date_debut_utilisation"
                                            defaultValue={today}
                                            min={today}
                                            style={inputStyle}
                                            onChange={this.setFielDdateDebutUtilisation}
                                            ref={date_debut_utilisation => this.date_debut_utilisation = date_debut_utilisation}
                                              type="date" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Heure début </label>
                                            <InputMask mask="99:99" maskChar={null} 
                                            style={inputStyle}
                                            defaultValue="08:00"
                                            inputRef={heure_debut => this.heure_debut = heure_debut}
                                            className="form-control"
                                            name="heure_debut"
                                            />
                                          
                                              </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Durée (heure)</label>
                                            <input name="duree_utilisation_heure"
                                            ref={duree_utilisation_heure => this.duree_utilisation_heure = duree_utilisation_heure}
                                              type="number" className="form-control" /></div>
                                    </div>
                                     
                                 
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Date fin utilisation</label>

                                            <input name="date_fin_utilisation"
                                                style={inputStyle}
                                                min={this.date_debut_utilisation ? this.date_debut_utilisation.value : today}
                                                defaultValue={this.date_debut_utilisation ? this.date_debut_utilisation.value : today}
                                            ref={date_fin_utilisation => this.date_fin_utilisation = date_fin_utilisation}
                                              type="date" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Heure de fin </label>
                                            <InputMask mask="99:99" maskChar={null} 
                                            style={inputStyle}
                                            defaultValue="18:00"
                                            inputRef={heure_de_fin => this.heure_de_fin = heure_de_fin}
                                            className="form-control"
                                            name="heure_de_fin"
                                            />
                                          
                                              </div>
                                    </div>

                                   
                                </div>

                                <div className="form-row">
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Kilomètrage début</label>
                                            <input name="kilometrage_compteur_debut"
                                            readOnly
                                            defaultValue={vehiculeSelect == undefined ?
                                                null : vehiculeSelect.kilometrage_acquisition }
                                ref={kilometrage_compteur_debut => this.kilometrage_compteur_debut = kilometrage_compteur_debut}
                                              type="number" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label > au retour </label>
                                            <input name="kilometrage_compteur_retour"
                                            onChange={this.setFieldKilometrageRetour}

                                            ref={kilometrage_compteur_retour => this.kilometrage_compteur_retour = kilometrage_compteur_retour}
                                              type="number" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label > parcourus </label>
                                            <input name="kilometres_parcourus"
                                             onChange={this.setFieldKilometrageParcourus}

                                            ref={kilometres_parcourus => this.kilometres_parcourus = kilometres_parcourus}
                                              type="number" className="form-control" /></div>
                                    </div>

                                   
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Lieu Départ</label>
                                            <input name="lieu_depart"
                                            ref={lieu_depart => this.lieu_depart = lieu_depart}
                                              type="text"  className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Destination </label>
                                            <input name="destination"
                                            ref={destination => this.destination = destination}
                                            type="text"  className="form-control" /></div>
                                    </div>

                                   
                                </div>

                            
                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div> ) 
        : 
        <ModifierUtilisationVehicule item={this.state.objetModif}
        closeEdit={this.closeEdit}
        onEditSubmit={this.onEditSubmit}
        natures_reservations={this.props.natures_reservations}
        personnels={this.props.personnels}
         isOpen={this.state.isOpen} />

    }
                 <ToastContainer autoClose={4000} />

                 <Container>
                        <Button
                        tooltip="Ajouter une ligne d'utilisation"
                        icon="fas fa-plus"
                    // rotate={true}
                        styles={{backgroundColor: 'green', color: 'white', cursor: 'pointer'}}

                        onClick={this.closeEdit}
                        />
                </Container> 
       
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehicules: state.vehicules.items,
        loading: state.vehicules.loading,
        natures_reservations: state.natures_reservations.items,
        utilisateurs: state.utilisateurs.items,
        personnels: state.personnels.items,
        entites: state.entites.items,
        vehiculeSeleted: state.vehiculeSeleted.vehicule,
        utilisations: state.utilisations.items


    }
  }

export default connect(mapStateToProps)(Utilisations)
//export default TypeEntite

