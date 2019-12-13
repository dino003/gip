import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import MatriculeInput from '../../components/MatriculeInput';
import DepenseRecetteItem from '../../components/vehicules/DepenseRecetteItem';


  class DepenseRecettes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
           
            depense_recettes: [],
            loading: false,
        }   
    }

    componentDidMount(){
        this.setState({
            depense_recettes: this.props.depense_recettes.filter(dr => dr.vehicule.id == this.props.vehiculeSeleted.id),
            //loading: false
         })
    
         if(this.props.vehiculeSeleted == undefined){
          const action = {type: "EDIT_SELECTED", value: this.props.location.state.veh}
          this.props.dispatch(action)
    
         }
    
        }
    
    
        onDelete = (id) => {
    
            let conf = confirm('Voulez-vous vraiment supprimer ?')
            if(conf === true){

                const action = {type: "REMOVE_DR", value: id}
                this.props.dispatch(action)
                axios.delete('/api/supprimer_vehicule_depense_recette/' + id)
                
            }
           
        }

     

    onEdit = (id) => {
        const vehic = this.props.vehiculeSeleted
        this.props.history.push('/gestion_du_parc_automobile/parc/modification-depense-recettes-vehicules/' + vehic.id + '/' + vehic.immatriculation + '/dr/' + id)
    }

    handleChange = (e) =>{
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
        const depense_recettes = this.props.depense_recettes.filter(inter => inter.vehicule.id == this.props.vehiculeSeleted.id)
        return (  <table className="mb-0 table" >
        <thead>
        <tr>
            <th>Entité</th>
            <th>Véhicule</th>
            <th>Nature Dépense/Recettes</th>
            <th>Imputation</th>
            <th>Type</th>

            <th>Date</th>
            <th>Monttant TTC</th>
            <th>Montant HT</th>
            <th>Tiers</th>
            <th>N° de Pièce</th>
            <th>Date Pièce</th>


        </tr>
        </thead>
        <tbody>
          
     { depense_recettes.map((item, index) => 
         <DepenseRecetteItem
         index={index}
          key={item.id} 
          onEdit={this.onEdit}              
          onDelete={this.onDelete}
         item={item} />
    )  }         
        </tbody>
    </table>)
    }
    
    

    render() {
        const vehiculeselect = this.props.vehiculeSeleted
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des depense_recettes 
                          
                            <span className="pull-right">
                        
                            <button title=" Ajouter une nouvelle intervention"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-depense-recettes-vehicules/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                                </span>
                             
                                
                                <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)} />
                                            
                                
                            </h5>
                           <div className="table-responsive">
                           {this.props.loading ? this.renderLoading() : 
                            !this.state.depense_recettes.length ? this.renderEmpty() : this.renderList()}


                             
                           </div>
                       </div>
                   </div>

          
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        depense_recettes: state.depense_recettes.items,
        loading: state.depense_recettes.loading,
        vehicules: state.vehicules.items,

        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(DepenseRecettes)
//export default TypeEntite

