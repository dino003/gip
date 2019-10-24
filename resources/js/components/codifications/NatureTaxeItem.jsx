import React, { Component } from "react";

export default class NatureTaxeItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
        }
        
       // this.onDelete = this.onDelete.bind(this)
       this.onEditSubmit = this.onEditSubmit.bind(this)

    }


    onDelete = () =>{
        const {id, onDelete} = this.props
        onDelete(id)
    }

    onEdit = () =>{
         this.setState({isEdit: !this.state.isEdit})
        
    }

    onEditSubmit = (event) => {
        event.preventDefault()
         this.props.onEditItem(this.libelle.value, this.props.item.id, this.props.index);
         this.onEdit()
        // this.setState({isEdit: false})
       // console.log(this.libelle.value)
    
    }

   
    
    render() {
        const {item} = this.props
        return (
            <tr>
                {/*<td>{item.libelle}</td> */}
              {this.state.isEdit ?
               <td><input className="form-control" autoFocus
                ref={libelle => this.libelle = libelle} defaultValue={item.libelle} /> </td> 
              : <td onDoubleClick={this.onEdit}>{item.libelle}</td> }
                <td>

                    <span className="pull-right">
                        {!this.state.isEdit ? 
                         <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                         <i className="fa fa-trash"></i>
                    </button> :
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
                }
                   
                    </span>
                </td>
            </tr>
        );
    }
}
