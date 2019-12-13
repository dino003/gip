import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import InterventionItem from '../../components/vehicules/InterventionItem';
import MatriculeInput from '../../components/MatriculeInput';


  class Interventions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
           
            interventions: [],
            loading: false,
        }   
    }

    componentDidMount(){
        this.setState({
            interventions: this.props.interventions.filter(inter => inter.vehicule.id == this.props.vehiculeSeleted.id),
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

                const action = {type: "REMOVE_INTERVENTION", value: id}
                this.props.dispatch(action)
                axios.delete('/api/supprimer_vehicule_intervention/' + id)
                
            }
           
        }

     

    onEdit = (id) => {
        const vehic = this.props.vehiculeSeleted
        this.props.history.push('/gestion_du_parc_automobile/parc/modification-interventions-vehicules/' + vehic.id + '/' + vehic.immatriculation + '/intervention/' + id)
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
        const interventions = this.props.interventions.filter(inter => inter.vehicule.id == this.props.vehiculeSeleted.id)
        return (  <table className="mb-0 table" >
        <thead>
        <tr>
            <th>Véhicule</th>
            <th>Tiers</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Nature intervention</th>
            <th>Catégorie intervention</th>
            <th>Kms</th>
            <th>Coût</th>

        </tr>
        </thead>
        <tbody>
          
     { interventions.map((item, index) => 
         <InterventionItem
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
                           <h5 className="card-title">Gestion des Interventions 
                          
                            <span className="pull-right">
                        
                            <button title=" Ajouter une nouvelle intervention"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push(`/gestion_du_parc_automobile/parc/creation-interventions-vehicules/${vehiculeselect.id}/${vehiculeselect.immatriculation}`)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                                </span>
                             
                                
                                <MatriculeInput vehicule={this.props.vehicules.find(veh => veh.id == this.props.match.params.vehicule_id)} />
                                            
                                
                            </h5>
                           <div className="table-responsive">
                           {this.props.loading ? this.renderLoading() : 
                            !this.state.interventions.length ? this.renderEmpty() : this.renderList()}


                             
                           </div>
                       </div>
                   </div>

          
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        interventions: state.interventions.items,
        loading: state.interventions.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(Interventions)
//export default TypeEntite

