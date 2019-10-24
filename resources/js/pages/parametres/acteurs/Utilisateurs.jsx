import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import UtilisateurItem from '../../../components/parametres/UtilisateurItem'
//import {getEntites} from '../../reducers/EntitesReducer'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import TableHeader from '../../../components/TableHeader'


 class Utilisateurs extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            isSearchInputVisible : false,
            utilisateursState: this.props.utilisateurs
        }
        
    }


    toggleSearchInput = () => {
        this.setState({isSearchInputVisible: !this.state.isSearchInputVisible})
    }

    handleSearchInputChange = (event) => {
    
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
            <th>Code Utilisateur</th>
            <th>Nom et Prenoms</th>
            <th>Adresse Email</th>
            <th>Date de création</th>
           
           
          

        </tr>
        </thead>
        <tbody>
         {this.props.utilisateurs.map((user, index) =>  
         <UtilisateurItem 
         key={user.id} 
         index={index}
         onDelete={this.onDelete}
         onEdit={this.onEdit}
         item={user} />
        )}
      
        </tbody>
    </table>)
    }

    onDelete = (id) => {
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_UTILISATEUR", value: id}
            this.props.dispatch(action)
            const itemIndex = this.state.utilisateursState.findIndex(item => item.id === id)

            this.setState({utilisateursState: this.state.utilisateursState.filter((item, index) => index !== itemIndex)})
            axios.delete('api/supprimer_user/' + id)
        }
       
    }

    onEdit = (id) => {
    //     var entites = this.props.entites
    //    // var str entites[index],uc = structures[index]


    //     this.setState({
    //         objetModif:
    //         editIndex: index
    //     }, () => this.passEdit())

        
        this.props.history.push('/gestion_du_parc_automobile/gestion-des-utilisateurs/' + id)

    }

    searchChange = search => {
   
        const ents =  this.state.tiersState.filter((user) => {
            return user.entite.toLowerCase().includes(search) 
           || user.nom_entite.toLowerCase().includes(search) 

          }
        )

        this.setState({tiersState: ents})
          
    }
    

    render() {
    const {isSearchInputVisible} = this.state
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <TableHeader
                           isSearchInputVisible={isSearchInputVisible}
                           link="/gestion_du_parc_automobile/ajouter-utilisateurs"
                           searchChange={this.searchChange}
                           titre="Gestion des Utilisateurs"
                           toggleSearchInput={this.toggleSearchInput}
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
                           {this.props.loading ? this.renderLoading() : 
                            !this.props.utilisateurs.length ? this.renderEmpty() : this.renderList()}

                           </div>
                       </div>
                   </div>

       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        utilisateurs: state.utilisateurs.items,
        loading: state.utilisateurs.loading
    }
  }

export default connect(mapStateToProps)(Utilisateurs)
