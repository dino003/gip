import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

 class ContratAssuranceItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }
        this.onDeclencherContratParDefaut = this.onDeclencherContratParDefaut.bind(this)   
    }

    onDeclencherContratParDefaut(){
        const {item, onContratdefaut} = this.props
        let confi = confirm(`Voulez-vous definir le contrat N° ${item.numero_contrat_police} comme contrat global par défaut ?`);
        if(confi) {
           // this.setState({isDefautDeclench: !this.state.isDefautDeclench})
            onContratdefaut(item.id)

        } 
    }


   
    render() {

        const {item, isDefautDeclench} = this.props

        return (
            
             <tr > 
                 
                 <td >
                    {item.global == 1 &&   <Fragment>
                     {!isDefautDeclench ? 
                         
                      <button title={item.defaut == 0 ? `Marquer le Contrat N° ${item.numero_contrat_police} comme contrat global par défaut ` : null} disabled={item.defaut == 1} className={item.defaut == 0 ? 'mb-2 mr-2 btn btn-light' : 'mb-2 mr-2 btn btn-success'} onClick={this.onDeclencherContratParDefaut}> {item.defaut == 0 ? 'Non' : 'Oui'}</button> :  <button disabled> <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button> }
                 </Fragment>}

                 </td>  
                 

             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{ !item.global ? item.vehicules ? item.vehicules.immatriculation : '' : 'Tous'}</td>
             <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_contrat_police || ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.compagnie_assurance ? item.compagnie_assurance.code : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_contrat ? moment(item.date_contrat).format('DD/MM/YYYY') : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_prise_effet ? moment(item.date_prise_effet).format('DD/MM/YYYY') : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.periode_date_debut ? moment(item.periode_date_debut).format('DD/MM/YYYY')  : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.periode_date_fin ? moment(item.periode_date_fin).format('DD/MM/YYYY')  : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.global == 1 ? 'Oui' : 'Non'}</td>

            <td>
            {item.defaut == 0 &&
                <span className="pull-right">
                    <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                    <i className="fa fa-trash"></i>
                </button>
              
                </span>
                }
        </td>
            


        </tr>
        )
    }
}

const mapStateToProps = state => {
    return {
        vehiculeSeleted: state.vehiculeSeleted.vehicule

    }
  }

export default connect(mapStateToProps)(ContratAssuranceItem)
