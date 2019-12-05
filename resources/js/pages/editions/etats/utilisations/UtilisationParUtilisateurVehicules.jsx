import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import today from '../../../../utils/today';
import moment from 'moment';
import {groupBy, calculSommeColonne, formatageNombre} from '../../../../utils/Repository'
import Pdf from "react-to-pdf";

const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
   // format: [4,2]
};

class UtilisationParUtilisateurVehicules extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            show: false,

            consommations: [],
            loading: false,
        }

     
    }


    componentDidMount() {

    }

    showModal = e => {
        this.setState({
          show: !this.state.show
        });
      };


    onDelete = (id) => {

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if (conf === true) {

            const action = { type: "REMOVE_INTERVENTION", value: id }
            this.props.dispatch(action)
            axios.delete('/api/supprimer_vehicule_intervention/' + id)

        }

    }



    onEdit = (id) => {
        const vehic = this.props.vehiculeSeleted
        this.props.history.push('/gestion_du_parc_automobile/parc/modification-consommations-vehicules/' + vehic.id + '/' + vehic.immatriculation + '/consommation/' + id)
    }

    handleChange = (e) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }





    toggleVisibleInput = () => {
        this.setState(prevState => {
            return {
                inputOpen: !prevState.inputOpen
            }
        })
    }

    toggleVisible = () => {
        this.setState(prevState => {
            return {
                isOpen: !prevState.isOpen
            }
        })
    }


    renderLoading() {
        return <span style={{ textAlign: 'center' }}>

            <Loader
                type="BallTriangle"
                color="#00BFFF"
                height={100}
                width={100}
            />
        </span>
    }

    renderEmpty() {
        return <span style={{ textAlign: 'center', color: 'red' }}>
            Aucune donnée enregistrée !
        </span>
    }


    renderList() {
        const consommations = this.props.consommations.filter(inter => inter.vehicule.id == this.props.vehiculeSeleted.id)
        return (<table className="mb-0 table" >
            <thead>
                <tr>
                    <th>Nature</th>
                    <th>Libéllé Etat</th>
                    <th>Référence</th>
                    <th>Sélection ?</th>
                    <th>Quantité</th>
                    <th>TTC</th>
                    <th>TVA</th>
                    <th>HT</th>
                    <th>Tiers</th>
                    <th>Libéllé</th>


                </tr>
            </thead>
            <tbody>
                <tr>

                    <td onDoubleClick={this.onEdit}>{item.libelle}</td>
                    <td onDoubleClick={this.onEdit}>{item.cout_unitaire}</td>


                    <td>

                        <span className="pull-right">
                            <button onClick={this.props.onDelete.bind(this, item.id)}
                                className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                                <i className="fa fa-trash"></i>
                            </button>

                        </span>
                    </td>
                </tr>

            </tbody>
        </table>)
    }



    render() {

        const etat = this.props.utilisations.length ? groupBy(this.props.utilisations, 'utilisateur_id') : null
       // const  etat2 = etat != null ? groupBy(etat, 'vehicule_id') : null
    //    var tabNiveau2 = []
    //    console.log( etat)
    //        if(etat != null){
    //            etat.forEach(currentItem => {
    //               // console.log(groupBy(currentItem, 'vehicule_id'))
    //                 var ty = groupBy(currentItem, 'vehicule_id')
    //                 // var pol = ty.map(p => p)
    //                 console.log( ty)

    //            });
   
    //        }
    const et2 = this.props.utilisations.length ? groupBy(this.props.utilisations, 'utilisateur_id', 'vehicule_id') : null
    const etUtili = this.props.utilisations.length ? groupBy(this.props.utilisations, 'utilisateur_id') : null
    const etVehi = this.props.utilisations.length ? groupBy(this.props.utilisations, 'vehicule_id') : null

      // console.log(etUtili, etVehi)
               if(etUtili != null){
               etUtili.forEach((currentItem, index) => {
                  // console.log(groupBy(currentItem, 'vehicule_id'))
                    // var pol = ty.map(p => p)
                    console.log( currentItem)

               });
   
           }

        return (
            <div className="app-main__inner">
                <div className="row">
                    <div className="col-lg-12">
                <div className="main-card mb-3 card">
                    <div className="card-body ">
                    {/* <button type="button" className="btn mr-2 mb-2 btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Small modal</button>

                    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="complex-table"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/> */}

   
{/* <Pdf targetRef={ref} filename="div-blue.pdf" options={options} x={.5} y={.5}>
        {({toPdf}) => (
            <button onClick={toPdf}>Generate pdf</button>
        )}
    </Pdf> */}

    <Pdf targetRef={ref} filename="code-example.pdf" options={options}>
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf>

                        <div className="table-responsive" ref={ref}>
                           

                           {etUtili && etUtili.map((etatCourant, index) => {
                               const niveau2 = groupBy(etatCourant, 'vehicule_id')
                            //    console.log(niveau2)
                                var tab = []
                                niveau2.forEach(val => tab.push(val[0]))

                               return (<table key={index} className="mb-0 table table-bordered" id="complex-table">
                               <thead>
                               <tr > 
                                         <th colSpan="4">AGOSOFT Parc-Automobile - Utilisation Véhicules par Utilisateurs</th>
                                         <th colSpan="2">DATE: {moment(today).format('DD/MM/YYYY')}</th>
                                         <th colSpan="2">Référence: PA 00058</th>
                                      </tr>

                                      <tr style={{backgroundColor: 'gray'}}> 
                                         <th colSpan="12">Utilisateur: {etatCourant[0].utilisateur.prenom} {etatCourant[0].utilisateur.nom}</th>
                                      </tr>  

                                    
                               </thead>
                               {/* <caption>Nom de l'etat</caption> */}
                                { niveau2.map((base) => {
                                   // console.log(element)
                                    return base.map((element, index) => {
                                        // var precedentIndex = base[index - 1]
                                        // var suivantIndex = base[index + 1]
                                        // objetPrecedent = this.props.find(el, index)
                                        return (<React.Fragment key={index}>
                                             <thead>
                       
                                                 <tr> 
                                                <th colSpan="5">Véhicule  ({base[0].vehicule.immatriculation})</th>
                                                 <th colSpan="3">Véhicule de {base[0].vehicule.type_vehicule_statut}</th>
             
                                             </tr>
             
                                            </thead> 
             
                                            <tbody> 
                                                <tr> 
                                                    <th >Date Début</th> 
                                                    <th>Heure</th> 
                                                    <th>Date Fin</th> 
                                                    <th>Heure</th> 
                                                    <th>Kms cmptr</th> 
                                                    <th>Kms parcourus </th> 
                                                    <th>But de l'utilisation</th> 
                                                     
                                                    </tr> 
                                                    <tr> 
                                                        <td>{moment(element.date_debut_utilisation).format('DD/MM/YYYY')}</td> 
                                                         <td>{element.heure_debut.slice(0, 5)}</td> 
                                                        <td>{moment(element.date_fin_utilisation).format('DD/MM/YYYY')}</td> 
                                                        <td>{element.heure_de_fin.slice(0, 5)}</td> 
                                                         <td>{formatageNombre(element.kilometrage_compteur_debut)}</td> 
                                                        <td>{formatageNombre(element.kilometres_parcourus)}</td> 
                                                        <td>{element.nature_utilisation ? element.nature_utilisation.libelle : null}</td> 
                                                       
             
                                                    </tr> 
                                                         
                                                   
                                                </tbody>
             
                                                <tfoot> 
                                                    <tr> 
                                                        <th colSpan="2">Nombre d'utilisations du véhicule ( {base.length} )</th> 
                                                        <th > Kms parcourus  ({calculSommeColonne(base)})</th> 
                                                        </tr> 
             
                                                        <tr> 
                                                        <th colSpan="2">Nombre d'utilisations Utilisateur ( {base.length} )</th> 
                                                        <th> Kms parcourus  ({calculSommeColonne(base)})</th> 
                                                        </tr> 
                                                        
                                                </tfoot>
                                       </React.Fragment>)
                                    })
                                })}
                              


                           </table>)
                           })}

                         

                        </div>
                    </div>
                </div>
                </div>
                </div>


        




            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        consommations: state.consommations.items,
        utilisations: state.utilisations.items,

        loading: state.consommations.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
}

export default connect(mapStateToProps)(UtilisationParUtilisateurVehicules)
//export default TypeEntite

