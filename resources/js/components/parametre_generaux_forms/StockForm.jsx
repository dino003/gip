import React, { Component } from 'react'
import inputStyle from '../../utils/inputStyle';

 class StockForm extends Component {
     constructor(props) {
         super(props);
        
     }

     enregistrerParamStock = (e) =>{
        e.preventDefault();
        let objetInfo = {
            entite_defaut: this.entite_defaut.value,
            nom_entite: this.nom_entite.value,
            gerer_numero_article_auto: this.gerer_numero_article_auto.checked,
         
        }
        this.props.onFormStockSubmit( objetInfo )
     }

     setFieldEntite = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => {
            this.nom_entite.value = this.nomEntite()
            // this.contenu_libelle_commande.value = this.LibelleAutoDeCommannde()

        });
    }

    setField = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    nomEntite = () => {
        //  this.libelle_commande.value = this.type_commande.value 
        if (this.entite_defaut != undefined && this.entite_defaut.value != '') {
           var enti = this.props.entites.find(ent => ent.id == this.entite_defaut.value)
           return  enti.nom_entite || null
        }

        return null

    }
     
    render() {

        const {item, entites} = this.props
        return (
            <div className="main-card mb-3 card">
            <div className="card-body">
                {item != undefined && 
            <form className="" onSubmit={this.enregistrerParamStock}>
                                <div className="form-row">
                                <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <label >Entité par défaut de gestion du stock </label>
                                          
                                        </div>
                                    </div>
                                   
                                   {entites && <React.Fragment>
                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <select name="entite_defaut"
                                            defaultValue={item.entite_defaut}
                                            onChange={this.setFieldEntite}
                                                ref={entite_defaut => this.entite_defaut = entite_defaut}
                                                style={inputStyle}
                                            className="form-control">
                                            <option value={null}></option>

                                            {entites.map(entite => 
                                                    <option key={entite.id} value={entite.id}>{entite.entite}  </option>

                                                    )}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="position-relative form-group">
                                            <input name="nom_entite"
                                            defaultValue={item.nom_entite}
                                            readOnly
                                            ref={nom_entite => this.nom_entite = nom_entite}

                                              type="text" className="form-control" />
                                        </div>
                                    </div>
                                       </React.Fragment>}

                                
                                  
                                </div>

                                 

                                    <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group">
                                            <label >Pour chaque article faut-il gerer le n° d'article automatiquement ? </label>
                                   </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <input name="gerer_numero_article_auto" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.gerer_numero_article_auto}

                                            ref={gerer_numero_article_auto => this.gerer_numero_article_auto = gerer_numero_article_auto} />
                                        </div>
                                    </div>

                                
                                  
                                </div>
                               
                             
                                {!this.props.isFormStockSubmitted ? <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button> : <button disabled  className="mt-2 btn btn-primary">Merci de patienter  <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button>}
                           
                                
                            </form> }
            </div>
        </div> 
        )
    }
}


export default StockForm
