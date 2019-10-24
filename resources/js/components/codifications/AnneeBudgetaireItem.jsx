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
        const { item } = this.props

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
                            <td >  <input type="checkbox" defaultChecked={item.encours}
                                onChange={this.props.onChangeEnCours.bind(this, item.id)} /> </td>
                    
                    <td>
    
                        <span className="pull-right">
                                <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                                    <i className="fa fa-trash"></i>
                                </button> 
                        </span>
                    </td>
                </tr>
            );
        }
      
    }
}

export default connect(null, null)(AnneeBudgetaireItem)

