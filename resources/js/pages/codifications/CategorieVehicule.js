import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import TableHeader from '../../components/TableHeader'
import CategorieVehiculeItem from '../../components/codifications/CategorieVehiculeItem'
import AjouterCategorieVehicule from '../forms/AjouterCategorieVehicule'


 class CategorieVehicules extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            isOpen: false,
            isSearchInputVisible : false,
            entitesState: this.props.entites
        }
        
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

    renderEmpty(){
       return <span style={{textAlign: 'center', color: 'red'}}>
            Aucune donnée enregistrée !            
        </span>
    }

    renderList(){
        return (    <table className="mb-0 table" >
        <thead>
        <tr>
            <th>Types</th>
            <th>Type</th>
            <th>Coût</th>
            <th>Encombrement</th>
            <th>Cartes</th>
            <th>Garantie</th>
            <th>Options</th>
            <th>Etat</th>

          



        </tr>
        </thead>
        <tbody>
         {this.props.categories_vehicules.map((entite, index) =>  
         <CategorieVehiculeItem 
         key={entite.id} 
         index={index}
         onDelete={this.onDelete}
         onEdit={this.onEdit}
         item={entite} />
        )}
      
        </tbody>
    </table>)
    }

    onDelete = (id) => {
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_CATEGORIE_VEHICULE", value: id}
            this.props.dispatch(action)
            this.setState({entitesState : this.state.entitesState.filter(ent => ent.id !== id)})
           // axios.delete('api/supprimer_entite/' + id)
        }
       
    }

    onEdit = (id) => {
    //     var entites = this.props.entites
    //    // var str entites[index],uc = structures[index]


    //     this.setState({
    //         objetModif:
    //         editIndex: index
    //     }, () => this.passEdit())

        
        this.props.history.push('/gestion_du_parc_automobile/categories_véhicules/' + id)

    }

    searchChange = search => {
   
        const ents =  this.state.entitesState.filter((user) => {
            return user.entite.toLowerCase().includes(search) 
           // || user.prenom.toLowerCase().includes(searchTermPrenom) 
           || user.nom_entite.toLowerCase().includes(search) 

          }
        )

        this.setState({entitesState: ents})
          
    }
    

    render() {
    const {isSearchInputVisible} = this.state
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <TableHeader
                           isSearchInputVisible={isSearchInputVisible}
                           link="/gestion_du_parc_automobile/ajouter_categories_véhicules"
                           searchChange={this.searchChange}
                           titre="Gestion des catégories de véhicules"
                           toggleSearchInput={this.toggleSearchInput}
                           toggleVisibleInput={this.toggleOpen}
                            isLink />
                           {/*
                           <h5 className="card-title">Gestion des entités
                           <span className="pull-right">
                           <NavLink title=" Ajouter un nouvel acteur"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary pull-right"
                                      to="/ajouter-entite"
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </NavLink>
                                            {isSearchInputVisible ?  <button title="Quitter le mode recherche"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right"
                                      onClick={this.toggleSearchInput}
                                      >
                                      <i className="fa fa-times"></i> {' '}
     
                                             </button> :  <button title="Rechercher"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-info pull-right"
                                      onClick={this.toggleSearchInput}
                                      >
                                      <i className="fa fa-search"></i> {' '}
     
                                             </button>}
                                             </span>
                                           {isSearchInputVisible &&  
                            <input
                            ref={search => this.search = search}

                             style={{width: '40%'}} type="text" className="form-control pull-right" placeholder="Taper pour rechercher" />
                            }
                           </h5> */}
                           <div className="table-responsive">
                           {this.state.loading ? this.renderLoading() : 
                            !this.props.categories_vehicules.length ? this.renderEmpty() : this.renderList()}

                           </div>
                       </div>
                   </div>

       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories_vehicules: state.categories_vehicules.items
    }
  }

export default connect(mapStateToProps)(CategorieVehicules)
