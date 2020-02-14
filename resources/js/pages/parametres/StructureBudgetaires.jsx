import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import {ToastContainer, toast } from 'react-toastify';

import StructureBudgetaireItem from '../../components/codifications/StructureBudgetaireItem';

  class StructureBudgetaire extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            libelle: '',
            niveau: '',
        //     structure_budgetaires: [
        //         'Siege',
        //         'Ditrection'

        //    ],
            selection: [],
            isFormSubmitted: false
        }

       // this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onEditSubmit = this.onEditSubmit.bind(this)

    }





    onDelete = (id) => {

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){

            const action = {type: "REMOVE_STRUCTURE_BUDGETAIRE", value: id}
            this.props.dispatch(action)
           // this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
            axios.delete('/api/supprimer_structure_budgetaire/' + id)
        }

    }


    onDelete = (item) => {

        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
            if(item.plan_budgetaires && item.plan_budgetaires.length){
                let message = `${item.libelle} contient des éléments dans le plan budgétaire
                en le supprimant cela supprimera toutes ses ramifications dans le plan budgétaire
                Souhaitez-vous continuer ?`

                if(confirm(message) ){

                   axios.delete('/api/supprimer_structure_budgetaire/' + item.id)
                 /*   item.plan_budgetaires.forEach(element => {
                    axios.delete('/api/supprimer_plan_geographique/' + element.id)
                   }); */

                   const action = {type: "REMOVE_STRUCTURE_BUDGETAIRE", value: item.id}
                    this.props.dispatch(action)

                   axios.get('/api/plan_budgetaires').then((response) => {

                    const action2 = {type: "GET_PLAN_BUDGETAIRE", value: response.data}
                    this.props.dispatch(action2)
                } )
                }
            }else{
                const action = {type: "REMOVE_STRUCTURE_BUDGETAIRE", value: item.id}
                this.props.dispatch(action)
               axios.delete('/api/supprimer_structure_budgetaire/' + item.id)

               axios.get('/api/plan_budgetaires').then((response) => {

                const action2 = {type: "GET_PLAN_BUDGETAIRE", value: response.data}
                this.props.dispatch(action2)
            } )
            }


        }

    }

    onEditSubmit(libelle, niveau, id){
        if(!libelle.length) return window.alert('Le libéllé ne peut pas être vide')
        axios.post('/api/modifier_structure_budgetaire/' + id, {
            libelle: libelle,
            niveau: niveau
        }).then(response => {
            const action = {type: "EDIT_STRUCTURE_BUDGETAIRE", value: response.data}
            this.props.dispatch(action)
          }).catch(error => console.log(error))
    }

    handleChange = (e) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }



   handleSubmit(e){
        e.preventDefault();

        if(this.verificationFormulaire() == null){
            this.setState({isFormSubmitted : true})
               axios.post('/api/ajouter_structure_budgetaire', {
                libelle: this.libelle.value,
                niveau: this.niveau.value
            }).then(response => {
                const action = {type: "ADD_STRUCTURE_BUDGETAIRE", value: response.data}
                this.props.dispatch(action)
                this.setState({libelle: '', niveau: ''})
                this.niveau.value = '';
                this.libelle.value = '';
                this.setState({isFormSubmitted : false})
            })

        }else{
              //console.log(this.verificationFormulaire())
              toast.error(this.verificationFormulaire(), {
                position: toast.POSITION.BOTTOM_CENTER
              });
          }



   // console.log(this.libelle.value)


    }


    verificationFormulaire () {
        if(this.libelle.value == '' ){
            return "Le libéllé de la structure est obligatoire !"
        }else if(this.niveau.value == '' ){
            return "Le niveau est obligatoire !"
        } else{
            return null
        }
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

    renderList(){
        return (  <table className="mb-0 table" >
        <thead>
        <tr>
             <th>Niveau </th>

            <th>Libéllé de la Structure </th>


        </tr>
        </thead>
        <tbody>

     { this.props.structure_budgetaires.sort((a, b) => a - b.niveau).map((item, index) =>
         <StructureBudgetaireItem
         index={index}
          key={item.id}
          onEditItem={this.onEditSubmit}
          onDelete={this.onDelete}
          dernierNiveau={Number( this.getNiveauAutomatiqueStructureBudgetaire() - 1 )}
         item={item} />
    )  }
        </tbody>
    </table>)
    }


    getNiveausStructureBudgetaire = () => {
        const events = [];
        this.props.structure_budgetaires.map(event => {
            if(!event.niveau) return;
            return events.push(event.niveau)
        })

        return events
    }

    getNiveauAutomatiqueStructureBudgetaire = () => {
        var niveau = Math.max(...this.getNiveausStructureBudgetaire(), 0)
        if (niveau == 0) return 1;
        return Number(niveau + 1);

    }

    lastLevel = () => {
        var niveau = Math.max(...this.getNiveausStructureBudgetaire(), 0)
        if (niveau == 0) return 1;
        return Number(niveau ) ;

    }



    render() {
        // console.log(Array.isArray(this.props.structure_budgetaires))
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion de la Structure des véhicules

                          {this.lastLevel() < 6 ?
                            <span className="pull-right">

                            {!this.state.inputOpen ? ( <button title=" Ajouter une nouvelle structure"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={this.toggleVisibleInput}
                                      >
                                      <i className="fa fa-plus"></i> {' '}

                                          Ajouter
                                             </button>) : null}
                                </span> : null }


                            </h5>
                            <br />
                            {this.state.inputOpen ?
                            <React.Fragment>

                            {this.lastLevel() < 6 ?
                            <div className="row">

                                <div className="col-md-2">
                                   <input
                                     ref={niveau => this.niveau = niveau}

                                     onChange={this.handleChange}
                                      name="niveau"
                                      readOnly
                                      value={this.getNiveauAutomatiqueStructureBudgetaire()}
                                      placeholder="niveau"
                                     type="number" className="form-control " />
                                   </div>

                                  <div className="col-md-4">
                                  <input
                                     ref={libelle => this.libelle = libelle}
                                     onChange={this.handleChange}
                                      name="libelle"
                                      placeholder="Libéllé de la Structure"
                                     type="text" className="form-control " />
                                  </div>

                                  <div className="col-md-2">
                                    <button disabled={this.state.isFormSubmitted || !this.state.libelle.length}  onClick={this.handleSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-success" >{this.state.isFormSubmitted ? (<i className="fa fa-spinner fa-spin fa-1x fa-fw"></i>) : 'Enregistrer'}</button>

                                  </div>

                                  <div className="col-md-2">
                                  <button title=" Quitter" className="mb-2 mr-2 btn-transition btn btn-outline-warning"
                                    onClick={this.toggleVisibleInput}
                                    >
                                 <i className="fa fa-times"></i> {' '} Fermer

                                </button>
                                  </div>





                            </div> : null }
                             </React.Fragment>  : null}

                           <div className="table-responsive">
                           {this.state.loading ? this.renderLoading() :
                            !this.props.structure_budgetaires.length ? this.renderEmpty() : this.renderList()}



                           </div>
                       </div>
                   </div>

                   <ToastContainer autoClose={4000} />


       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        structure_budgetaires: state.structure_budgetaires.items,
        loading: state.structure_budgetaires.loading,

    }
  }

export default connect(mapStateToProps)(StructureBudgetaire)
//export default TypeEntite

