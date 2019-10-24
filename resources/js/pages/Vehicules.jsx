import React, { Component } from 'react'
import {connect} from 'react-redux'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import VehiculeItem from '../components/vehicules/VehiculeItem'
import MatriculeInput from '../components/MatriculeInput'

  class Vehicules extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            inputOpen: false,
            libelle: '',
            code: '',
    
            selection: [],
            obj: undefined,
          //  selected: (new Map(): Map<string, boolean>)      
        }   
    }

    // componentWillUnmount(){
    //     const action = {type: "ADD_CODE_INCIDENT", value: response.data}
    //     this.props.dispatch(action)    }




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

        
        this.props.history.push('/gestion_du_personnel/' + id)

    }

    handleChange = (e) =>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }



  async handleSubmit(e){
        e.preventDefault();

      const response =  await axios.post('api/ajouter_code_incident', {
            libelle: this.libelle.value,
            code: this.code.value
        })

       const action = {type: "ADD_CODE_INCIDENT", value: response.data}
       this.props.dispatch(action)
       this.setState({libelle: '', code: ''})
       this.code.value = '';
       this.libelle.value = '';

   // console.log(this.libelle.value)
       

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

    onSelect = id => {
       const obj = this.props.vehicules.find(veh => veh.id === id)
            
      // console.log(obj)
       this.setState({obj: obj}, () => {
        const action = {type: "EDIT_SELECTED", value: this.state.obj}
        this.props.dispatch(action)
       })

    }

    renderList(){
        return (  <table className="mb-0 table" >
        <thead>
        <tr>
        <th>Affecté a</th>

            <th>Immatriculation</th>
            <th>Type</th>
            <th>Acquisition</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Couleur</th>
            <th>Détenteur</th>
            <th>Chauffeur</th>
            <th>Catégorie</th>
            <th>Acquis le</th>

        </tr>
        </thead>
        <tbody>
          
     { this.props.vehicules.map((item, index) => 
         <VehiculeItem
         index={index}
          key={item.id} 
          onEdit={this.onEdit}              
          onDelete={this.onDelete}
          onSelect={this.onSelect}
          obj={this.state.obj}
         item={item} />
    )  }         
        </tbody>
    </table>)
    }
    
    

    render() {
        // console.log(Array.isArray(this.props.vehicule))
       // console.log(this.props.vehiculeSeleted)
        return (
            <div className="app-main__inner">
            <div className="main-card card" >
                       <div className="card-body ">
                           <h5 className="card-title">Gestion des véhicules 
                          
                        
                          
                            <span className="pull-right">
                        
                            <button title=" Ajouter un nouvel acteur"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={() => this.props.history.push('/creation-de-vehicule')}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                                </span>
                             
                                
                                <MatriculeInput text_attente="Aucune sélection" />
                                            
                                
                            </h5>
                           <div className="table-responsive">
                           {this.props.loading ? this.renderLoading() : 
                            !this.props.vehicules.length ? this.renderEmpty() : this.renderList()}


                             
                           </div>
                       </div>
                   </div>

          
                
       </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehicules: state.vehicules.items,
        loading: state.vehicules.loading,
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(Vehicules)
//export default TypeEntite

