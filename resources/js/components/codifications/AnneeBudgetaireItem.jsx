import React, { Component } from "react";

import { connect } from 'react-redux'

class AnneeBudgetaireItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
        }

        // this.onDelete = this.onDelete.bind(this)
        this.onEditSubmit = this.onEditSubmit.bind(this)
        this.onDeclencherAnneeEnCours = this.onDeclencherAnneeEnCours.bind(this);

    }

    onDeclencherAnneeEnCours(){
        const {item, onAnneeEnCours} = this.props
        let confi = confirm(`Voulez-vous definir   ${item.annee_budgetaire} comme Année budgétaire en cours ?`);
        if(confi) {
           // this.setState({isDefautDeclench: !this.state.isDefautDeclench})
            onAnneeEnCours(item.id)
           // this.setState({isDefautDeclench: !this.state.isDefautDeclench})

        } 
    }


    onDelete = () => {
        const { id, onDelete } = this.props
        onDelete(id)
    }

    onEdit = () => {
        this.setState({ isEdit: !this.state.isEdit })

    }

    onEditSubmit = (event) => {
        event.preventDefault()
        this.props.onEditItem(this.nameInput.value, this.props.item.id, this.props.index);
        this.onEdit()
        // this.setState({isEdit: false})
        // console.log(this.nameInput.value)

    }

   



    render() {
        const { item, isDefautDeclench } = this.props

        if (this.state.isEdit) {
            return (
                <tr>
                    <td><input className="form-control" autoFocus type="number"
                        ref={nameInput => this.nameInput = nameInput} defaultValue={item.annee_budgetaire} /> </td>
                    <td>

                        <span className="pull-right">
                                <span>
                                    <button onClick={this.onEdit} className="mb-2 mr-2 btn-transition btn btn-outline-warning pull-right">
                                        <i className="fa fa-times"></i>
                                        Annuler
                                    </button>
                                    <button onClick={this.onEditSubmit} className="mb-2 mr-2 btn-transition btn btn-outline-primary pull-right">
                                        <i className="fa fa-edit"></i>
                                        Enregistrer
                                </button>
                                </span>
                            

                        </span>
                    </td>

                </tr>
            )
        }else{
            return (
                <tr>
                 
                    <td onDoubleClick={this.onEdit}>{item.annee_budgetaire}</td>
                   

                    {!isDefautDeclench ?  <td > <button title={item.encours == 0 ? `Marquer  ${item.annee_budgetaire} comme année budgétaire en cours` : null} disabled={item.encours == 1} className={item.encours == 0 ? 'mb-2 mr-2 btn btn-light' : 'mb-2 mr-2 btn btn-success'} onClick={this.onDeclencherAnneeEnCours}> {item.encours == 0 ? 'Non' : 'Oui'}</button></td> :  <td > <button disabled><i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button></td>}
            <td>
               {item.encours == 0 &&  <span className="pull-right">
                    <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                    <i className="fa fa-trash"></i>
                </button>
              
                </span>}
        </td>
                </tr>
            );
        }
      
    }
}

export default connect(null, null)(AnneeBudgetaireItem)

