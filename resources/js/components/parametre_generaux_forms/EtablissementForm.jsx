import React, { Component } from 'react'

 class EtablissementForm extends Component {
     constructor(props) {
         super(props);
         
     }

     enregisterInfo = (e) =>{
        e.preventDefault();
        let objetInfo = {
            societe: this.societe.value,
            adresse1: this.adresse1.value,
            adresse2: this.adresse2.value,
            code_postal: this.code_postal.value,
            ville: this.ville.value,
            telephonne: this.telephonne.value,
            fax: this.fax.value,
            internet: this.internet.value
        }
        this.props.onFormInfoEtablissemntSubmit( objetInfo )
     }
     
    render() {

        const {item} = this.props
        return (
            <div className="main-card mb-3 card">
            <div className="card-body">
            <form className="" onSubmit={this.enregisterInfo}>
                                <div className="form-row">
                                   
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Société *</label>
                                            <input name="societe"
                                            defaultValue={item.societe}
                                            ref={societe => this.societe = societe}
                                            type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Adresse </label>
                                            <input name="adresse1"
                                            defaultValue={item.adresse1}

                                            ref={adresse1 => this.adresse1 = adresse1}

                                              type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Adresse (suite) </label>
                                            <input name="adresse2"
                                            defaultValue={item.adresse2}

                                            ref={adresse2 => this.adresse2 = adresse2}

                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                  
                                </div>

                                 

                                    <div className="form-row">
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Code postal </label>
                                            <input name="code_postal"  type="text"
                                            defaultValue={item.code_postal}

                                            ref={code_postal => this.code_postal = code_postal}

                                             className="form-control" /></div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Ville </label>
                                            <input name="ville" type="text"
                                            defaultValue={item.ville}

                                            ref={ville => this.ville = ville}

                                            className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Téléphonne </label>
                                            <input name="telephonne"
                                            defaultValue={item.telephonne}

                                            ref={telephonne => this.telephonne = telephonne}

                                             type="text" className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Fax </label>
                                            <input name="fax" type="text"
                                            defaultValue={item.fax}

                                            ref={fax => this.fax = fax}

                                             className="form-control" />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="position-relative form-group">
                                            <label >Site internet </label>
                                            <input name="internet" type="text"
                                            defaultValue={item.internet}

                                            ref={internet => this.internet = internet}

                                             className="form-control" />
                                        </div>
                                    </div>
                                  
                                </div>
                               
                             
                                <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button>
                           
                                
                            </form>
            </div>
        </div> 
        )
    }
}


export default EtablissementForm
