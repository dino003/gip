import React, { Component } from 'react'

class Vehiculeform extends Component {

    constructor(props) {
        super(props);


    }

    enregegistrerParamVehicule = (e) => {
        e.preventDefault();
        let objet = {
            depense_impute_sur_budget: this.depense_impute_sur_budget.checked,
            zonne_geographique_obligatoire: this.zonne_geographique_obligatoire.checked,
            zone_organisationnelle_obligatoire: this.zone_organisationnelle_obligatoire.checked,

        }
        this.props.onSubmitParamVehicule( objet )
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
        const {item} = this.props
        return (
            <div className="main-card mb-3 card">
            <div className="card-body">
            {item != undefined && <form className="" onSubmit={this.enregegistrerParamVehicule}>
                                <div className="form-row">

                                    <div className="col-md-10">
                                        <div className="position-relative form-group">
                                            <label >Les Dépenses liées aux véhicules doivent-elles être déduites d'une ligne budgétaire ?</label>

                                        </div>
                                    </div>


                                    <div className="col-md-2">



                                           <input name="depense_impute_sur_budget" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.depense_impute_sur_budget}

                                            ref={depense_impute_sur_budget => this.depense_impute_sur_budget = depense_impute_sur_budget} />
                                    </div>




                                </div>

                                <div className="form-row">

                                   <div className="col-md-10">
                                       <div className="position-relative form-group">
                                           <label >Lors de la création d'un véhicule l'affectation géographique doit-être obligatoire ?</label>

                                       </div>
                                   </div>


                                   <div className="col-md-2">


                                          <input name="zonne_geographique_obligatoire" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.zonne_geographique_obligatoire}

                                            ref={zonne_geographique_obligatoire => this.zonne_geographique_obligatoire = zonne_geographique_obligatoire} />
                                   </div>

                               </div>

                               <div className="form-row">

                                   <div className="col-md-10">
                                       <div className="position-relative form-group">
                                       <label >Lors de la création d'un véhicule l'affectation organisationnelle doit-être obligatoire ?</label>

                                       </div>
                                   </div>


                                   <div className="col-md-2">



                                          <input name="zone_organisationnelle_obligatoire" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.zone_organisationnelle_obligatoire}

                                            ref={zone_organisationnelle_obligatoire => this.zone_organisationnelle_obligatoire = zone_organisationnelle_obligatoire} />
                                   </div>

                               </div>



                               {!this.props.isFormVehiculeSubmitted ? <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button> : <button disabled  className="mt-2 btn btn-primary">Merci de patienter <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button>}


                            </form>}
            </div>
        </div>
        )
    }
}


export default Vehiculeform
