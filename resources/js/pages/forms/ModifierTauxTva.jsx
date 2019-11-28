import React, { Component } from 'react'

export default class ModifierTauxTva extends Component {

    constructor(props) {
        super(props);
        this.state = {
        

        }
    }

    setField = (event) => {
        //  this.setState({[e.target.name]: e.target.value})
          const target = event.target;
          const value = target.type === 'checkbox' ? target.checked : target.value;
          const name = target.name;
      
          this.setState({
            [name]: value
          });
        }

        editing = (e) => {
            e.preventDefault()
            this.props.onEditSubmit(this.code.value,
                 this.taux.value,
                 this.libelle.value,
                 this.defaut.value,
                  )
                  this.props.closeEdit();
        }
    
    render() {
        const {item, isOpen} = this.props
        return (
            <div className={isOpen ? "ui-theme-settings settings-open" : "ui-theme-settings"}>
            {isOpen &&   <button type="button" onClick={this.props.closeEdit.bind(this)} 
             className="btn-open-options btn btn-warning">
                <i className="fa fa-times fa-w-16 fa-spin fa-2x"></i>
            </button>}
            <div className="theme-settings__inner">
                <div className="scrollbar-container">
                    <div className="theme-settings__options-wrapper">
                        <h3 className="themeoptions-heading">Ajouter 
                        </h3>
                        <form ref={(ref) => this.formRef = ref} className="p-3" onChange={this.setField} onSubmit={this.enregistrerOperation}>
                            <br />
                              
                                    
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Code</label>
                                            <input name="code"
                                            ref={code => this.code = code}
                                            defaultValue={item.code}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Taux</label>
                                            <input name="taux"
                                            defaultValue={item.code}
                                            ref={taux => this.taux = taux}
                                              type="number" step="0.1" className="form-control" /></div>
                                    </div>
                                   
                                </div>

                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Libéllé</label>
                                            <input name="libelle"
                                            defaultValue={item.libelle}
                                            ref={libelle => this.libelle = libelle}
                                              type="text" className="form-control" /></div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Défaut</label>
                                            <select className="form-control"
                                            defaultValue={item.defaut}
                                     ref={defaut => this.defaut = defaut}
                                        onChange={this.setField}
                                     name="defaut">
                                         <option value={0}>Non</option>
                                         <option value={1}>Oui</option>
                                    </select>
                                              
                                              </div>
                                    </div>
                                   
                                </div>
                            

                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                       
                                <button type="submit" onClick={() => this.props.history.goBack()}
                                 className="mt-2 btn btn-warning pull-right">Retour</button>
                        </form>
                      
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
