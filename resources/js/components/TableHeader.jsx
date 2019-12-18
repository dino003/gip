import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

export default class TableHeader extends Component {
    constructor(props) {
        super(props);
        
    }

    handleInputChange = () => {
        this.props.searchChange(this.search.value)
    }
    
    render() {
        const {titre, isLink, link, isButton,
             toggleVisibleInput, toggleSearchInput, isSearchInputVisible} = this.props
        return (
            <h5 className="card-title">{titre}
            <span className="pull-right">
                {isLink ?
            <NavLink title=" Ajouter un nouvel acteur"
                       className="mb-2 mr-2 btn-transition btn btn-outline-primary pull-right"
                       to={link}
                       >
                       <i className="fa fa-plus"></i> {' '}

                           Ajouter
                              </NavLink> :
                              <button title=" Ajouter un nouvel acteur"
                                      className="mb-2 mr-2 btn-transition btn btn-outline-primary"
                                      onClick={this.props.toggleVisibleInput.bind(this)}
                                      >
                                      <i className="fa fa-plus"></i> {' '}
     
                                          Ajouter
                                             </button>
                                             }
                             {/* {isSearchInputVisible ?  <button title="Quitter le mode recherche"
                       className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right"
                       onClick={() => toggleSearchInput()}
                       >
                       <i className="fa fa-times"></i> {' '}

                              </button> :  <button title="Rechercher"
                       className="mb-2 mr-2 btn-transition btn btn-outline-info pull-right"
                       onClick={() => toggleSearchInput()}
                       >
                       <i className="fa fa-search"></i> {' '}

                              </button>} */}
                              </span>
                            {isSearchInputVisible &&  
             <input
             ref={search => this.search = search}
                onChange={this.handleInputChange}
              style={{width: '40%'}} type="text" className="form-control pull-right" placeholder="Taper pour rechercher" />
             }
            </h5>
        )
    }
}
