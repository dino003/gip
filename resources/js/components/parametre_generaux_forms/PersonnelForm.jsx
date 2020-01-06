import React, { Component } from 'react'

 class PersonnelForm extends Component {
     constructor(props) {
         super(props);
        
     }

     enregistrerInfoPersonnel = (e) =>{
        e.preventDefault();
        let objetInfo = {
            fonction: this.fonction.checked,
            info_permis: this.info_permis.checked,
            matricule_obligatoire: this.matricule_obligatoire.checked,
            boite_lettre: this.boite_lettre.checked,
            numero_conducteur: this.numero_conducteur.checked,

        }
        this.props.onFormPersonnelSubmit( objetInfo )
     }

    

    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

 
     
    render() {

        const {item, entites} = this.props
        return (
            <div className="main-card mb-3 card">
            <div className="card-body">
                {item != undefined && 
            <form className="" onSubmit={this.enregistrerInfoPersonnel}>
                              
                            <div className="form-row">
                            <div className="col-md-12">
                                        <div className="position-relative form-group">
                                            <label >Cochez les cases ci-dessous si vous souhaitez que certaines information soient obligatoires lors de l'introduction d'une nouvelle personne </label>
                                   </div>
                            </div>
                            </div>
                                    <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >La Fonction est obligatoire ? </label>
                                   </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <input name="fonction" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.fonction}

                                            ref={fonction => this.fonction = fonction} />
                                        </div>
                                    </div>

                                
                                  
                                </div>

                                
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Le Matricule de la personne est obligatoire ? </label>
                                   </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <input name="matricule_obligatoire" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.matricule_obligatoire}

                                            ref={matricule_obligatoire => this.matricule_obligatoire = matricule_obligatoire} />
                                        </div>
                                    </div>

                                
                                  
                                </div>
                                    <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Les informations sur le permis de conduire sont obligatoires ? </label>
                                   </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <input name="info_permis" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.info_permis}

                                            ref={info_permis => this.info_permis = info_permis} />
                                        </div>
                                    </div>

                                
                                  
                                </div>
                                    <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >L'adresse email de la personne est obligatoire ? </label>
                                   </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <input name="boite_lettre" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.boite_lettre}

                                            ref={boite_lettre => this.boite_lettre = boite_lettre} />
                                        </div>
                                    </div>

                                
                                  
                                </div>
                                    <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Le N° du conducteur est obligatoire ? </label>
                                   </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <input name="numero_conducteur" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.numero_conducteur}

                                            ref={numero_conducteur => this.numero_conducteur = numero_conducteur} />
                                        </div>
                                    </div>

                                
                                  
                                </div>
                               
                             
                                {!this.props.isFormPersonnelSubmitted ? <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button> : <button disabled  className="mt-2 btn btn-primary">Merci de patienter  <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button>}
                           
                                
                            </form> }
            </div>
        </div> 
        )
    }
}


export default PersonnelForm
