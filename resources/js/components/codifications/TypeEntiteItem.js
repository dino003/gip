import React, { Component } from "react";

import {connect} from 'react-redux'

 class TypeEntiteItem extends Component {

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
         this.props.onEditItem(this.nameInput.value, this.props.item.id, this.props.index);
         this.onEdit()
        // this.setState({isEdit: false})
       // console.log(this.nameInput.value)
    
    }

   
    
    render() {
        const {item} = this.props
        const firstElement = this.props.types_entites.find(el => el.type_entite == "SIEGE")
        return (
            <tr>
                {/*<td>{item.type_entite}</td> */}
              {this.state.isEdit ?
               <td><input className="form-control" autoFocus
                ref={nameInput => this.nameInput = nameInput} defaultValue={item.type_entite} /> </td> 
              : <td onDoubleClick={this.onEdit}>{item.type_entite}</td> }
                <td>

                    <span className="pull-right">
                        {!this.state.isEdit ? 
                        <React.Fragment>
                         {item == firstElement ? null :   <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                         <i className="fa fa-trash"></i>
                    </button>}
                        </React.Fragment> :
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

const mapStateToProps = state => {
    return {
        types_entites: state.types_entites.items,

    }
  }

export default connect(mapStateToProps)(TypeEntiteItem)
