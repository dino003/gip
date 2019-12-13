import React, { Component } from 'react'

export default class TauxTvaItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDefautDeclench: false
        }

        this.onDeclencherTvaDefaut = this.onDeclencherTvaDefaut.bind(this)
        
    }

    onDeclencherTvaDefaut(){
        const {item, onTvaDefaut} = this.props
        let confi = confirm(`Voulez-vous definir le Taux de TVA par défaut à  ${item.taux}% ?`);
        if(confi) {
           // this.setState({isDefautDeclench: !this.state.isDefautDeclench})
            onTvaDefaut(item.id)
           // this.setState({isDefautDeclench: !this.state.isDefautDeclench})

        } 
    }
    
    render() {
        const {item, index, isDefautDeclench} = this.props
       // const {isDefautDeclench} = this.state
        return (
            
            <tr>
                                      
             <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.libelle } </td>

            <td onDoubleClick={this.props.onEdit.bind(this, index)}>{item.taux}%</td>

                {!isDefautDeclench ?  <td > <button title={item.defaut == 0 ? `Marquer le taux de TVA par défaut à ${item.taux}%` : null} disabled={item.defaut == 1} className={item.defaut == 0 ? 'mb-2 mr-2 btn btn-light' : 'mb-2 mr-2 btn btn-success'} onClick={this.onDeclencherTvaDefaut}> {item.defaut == 0 ? 'Non' : 'Oui'}</button></td> :  <td > <button disabled> Chargement...</button></td>}
            <td>
               {item.defaut == 0 &&  <span className="pull-right">
                    <button onClick={this.props.onDelete.bind(this, item.id)} className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right">
                    <i className="fa fa-trash"></i>
                </button>
              
                </span>}
        </td>
            


        </tr>
        )
    }
}
