import React, { Component } from 'react'

export default class TableHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSearchInputVisible: false
        }
       this.handleInputChange = this.handleInputChange.bind(this) 
       this.toggleSearchInput = this.toggleSearchInput.bind(this) 

    }

    handleInputChange () {
        this.props.searchChange(this.search.value)
    }

    toggleSearchInput () {
        const {changeState} = this.props

        changeState()
        this.setState({isSearchInputVisible: !this.state.isSearchInputVisible} )

    }
    
    render() {
        const {isSearchInputVisible} = this.state
        const {text_recherche} = this.props
        return (
           <React.Fragment>
                <span className="pull-right">
         
                        {isSearchInputVisible ?  <button title="Quitter le mode recherche"
                className="mb-2 mr-2 btn-transition btn btn-outline-danger pull-right"
                onClick={this.toggleSearchInput}
                >
                <i className="fa fa-times"></i> {' '}

                        </button> :  <button title="Rechercher"
                className="mb-2 mr-2 btn-transition btn btn-outline-info pull-right"
                onClick={this.toggleSearchInput}
                >
                <i className="fa fa-search"></i> {' '}

                        </button>}
                        </span>
                        {isSearchInputVisible &&  
                <input
                ref={search => this.search = search}
                onChange={this.handleInputChange}
                 type="text" className="form-control pull-right" placeholder={text_recherche ? text_recherche : 'Taper pour rechercher'} />
               
               }
           </React.Fragment>
        
        )
    }
}
