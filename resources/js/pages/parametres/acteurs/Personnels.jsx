import React, { Component } from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import PersonnelItem from '../../../components/parametres/PersonnelItem'
//import {getEntites} from '../../reducers/EntitesReducer'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import TableHeader from '../../../components/TableHeader'


 class Personnels extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            isSearchInputVisible : false,
            personnelState: this.props.personnels
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
            <th>Nom</th>
            <th>Prenoms</th>
            <th>Matricule</th>
            <th>Entité</th>
            <th>Telephonne</th>
            <th>Téléphonne portable</th>
           
          

        </tr>
        </thead>
        <tbody>
         {this.props.personnels.map((personnel, index) =>  
         <PersonnelItem 
         key={personnel.id} 
         index={index}
         onDelete={this.onDelete}
         onEdit={this.onEdit}
         item={personnel} />
        )}
      
        </tbody>
    </table>)
    }

    onDelete = (id) => {
        let conf = confirm('Voulez-vous vraiment supprimer ?')
        if(conf === true){
        
            const action = {type: "REMOVE_PERSONNEL", value: id}
            this.props.dispatch(action)
            const itemIndex = this.state.personnelState.findIndex(item => item.id === id)

            this.setState({personnelState: this.state.personnelState.filter((item, index) => index !== itemIndex)})
            axios.delete('api/supprimer_personnel/' + id)
        }
       
    }

    onEdit = (id) => {
    //     var entites = this.props.entites
    //    // var str entites[index],uc = structures[index]


    //     this.setState({
    //         objetModif:
    //         editIndex: index
    //     }, () => this.passEdit())

        
        this.props.history.push('/gestion_du_parc_automobile/gestion_du_personnel/' + id)

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
                           link="/gestion_du_parc_automobile/ajouter_personnel"
                           searchChange={this.searchChange}
                           titre="Gestion du personnel"
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
                           {this.state.loading ? this.renderLoading() : 
                            !this.props.personnels.length ? this.renderEmpty() : this.renderList()}

                           </div>
                       </div>
                   </div>

       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        personnels: state.personnels.items
    }
  }

export default connect(mapStateToProps)(Personnels)
