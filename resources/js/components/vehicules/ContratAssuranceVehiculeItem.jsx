import React, { Component, Fragment } from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import today from '../../utils/today';

 class ContratAssuranceVehiculeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isSelect: false,
            selectIndex: 0
        }
        this.onDeclencherContratEnCourVehicule = this.onDeclencherContratEnCourVehicule.bind(this)
        this.isContratExpired = this.isContratExpired.bind(this);
    }

    onDeclencherContratEnCourVehicule(){
        const {item, onContratEncour} = this.props
        let confi = confirm(`Voulez-vous definir le contrat N° ${item.numero_contrat_police} comme contrat courant du véhicule ?`);
        if(confi) {
           // this.setState({isDefautDeclench: !this.state.isDefautDeclench})
            onContratEncour(item.id)

        }
    }

    isContratExpired(item) {
        let date_de_fin = Date.parse(item.periode_date_fin);
        let date_du_jour = Date.parse(today);

        return date_du_jour > date_de_fin;


    }



    render() {

        const {item, isDefautDeclench } = this.props

        return (

             <tr >

             <td className="sticky-col first-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.numero_contrat_police || ''}</td>

            <td className="sticky-col second-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.compagnie_assurance ? item.compagnie_assurance.code : ''}</td>
            <td className="sticky-col third-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.periode_date_debut ? moment(item.periode_date_debut).format('DD/MM/YYYY')  : ''}</td>
            <td className="sticky-col thour-col" onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.periode_date_fin ? moment(item.periode_date_fin).format('DD/MM/YYYY')  : ''}</td>

            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_contrat ? moment(item.date_contrat).format('DD/MM/YYYY') : ''}</td>
            <td onDoubleClick={this.props.onEdit.bind(this, item.id)}>{item.date_prise_effet ? moment(item.date_prise_effet).format('DD/MM/YYYY') : ''}</td>
             <td><span >{this.isContratExpired(item) ? <em style={{color: 'red'}}>Expiré</em> : <em style={{color: 'lime'}}>Valable</em>}</span></td>

          {!item.global ?  <td >
                    {!this.isContratExpired(item) &&   <Fragment>
                     {!isDefautDeclench ?

                      <button title={item.encour_vehicule == 0 ? `Marquer le Contrat N° ${item.numero_contrat_police} comme contrat courant du véhicule ` : null} disabled={item.encour_vehicule == 1} className={item.encour_vehicule == 1 ? 'mb-2 mr-2 btn btn-light' : 'mb-2 mr-2 btn btn-success'} onClick={this.onDeclencherContratEnCourVehicule}> {item.encour_vehicule == 0 ? 'Non' : 'Oui'}</button> :  <button disabled> <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button> }
                 </Fragment>}

                 </td> : <td >
                    {!this.isContratExpired(item) ? <Fragment>

                    {this.props.isAvailableContratEmpty() ? <span  className="mb-2 mr-2 btn btn-light" > Oui</span> : <span  className="mb-2 mr-2 btn btn-success" > Non</span> }
                 </Fragment> : null}

                 </td> }

            <td>
            {item.encour_vehicule == 0 || !item.global &&
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

export default connect(mapStateToProps)(ContratAssuranceVehiculeItem)
