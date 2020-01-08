import React, { Component } from 'react'

class Alerte extends Component {

    constructor(props) {
        super(props);
        
        
    }

    enregistrerAlerte = (e) => {
        e.preventDefault();
        let objet = {
            entretien_prevu_x_jour_alerte: this.entretien_prevu_x_jour_alerte.checked,
            date_entretien_vehicule_depasse: this.date_entretien_vehicule_depasse.checked,
           
            stock_minimun_article_depasse: this.stock_minimun_article_depasse.checked,
            stock_null_article: this.stock_null_article.checked,
           
            entretien_planifie_prevu_x_kilometre_alerte: this.entretien_planifie_prevu_x_kilometre_alerte.checked,
            entretien_planifie_prevu_x_jour_alerte: this.entretien_planifie_prevu_x_jour_alerte.checked,

            entretien_planifie_kilometrage_prevu_depasse: this.entretien_planifie_kilometrage_prevu_depasse.checked,
           
           
            entretien_prevu_x_jour: this.entretien_prevu_x_jour.value,
            entretien_planifie_prevu_x_jour: this.entretien_planifie_prevu_x_jour.value,
            entretien_planifie_prevu_x_kilometre: this.entretien_planifie_prevu_x_kilometre.value,

        }
        this.props.onSubmitAlerte( objet )
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
            {item != undefined && <form className="" onSubmit={this.enregistrerAlerte}>
                                <div className="form-row">
                                <div className="col-md-12">
                                        <div className="position-relative form-group">
                                            <label >Le paramètrage ci-dessous détermine les évennements pour lesquels vous voulez déclencher une alerte. </label>
                                   </div>
                            </div>
                                </div>
                                <div className="form-row">
                                   
                                    <div className="col-md-5">
                                        <div className="position-relative form-group">
                                            <label >Un entretien véhicule est prévu dans X jours </label>
                                           
                                        </div>
                                    </div>

                                    <div className="col-md-2">
                                    <div className="position-relative form-group">

                                      <input name="entretien_prevu_x_jour" type="number"
                                       onChange={this.setField}
                                       className="form-control"
                                       defaultValue={item.entretien_prevu_x_jour}
                                       ref={entretien_prevu_x_jour => this.entretien_prevu_x_jour = entretien_prevu_x_jour} />
                                    </div>
                               </div>

                               <div className="col-md-2">
                                        <div className="position-relative form-group">
                                            <label >Alerte Active </label>
                                           
                                        </div>
                                    </div>


                                    <div className="col-md-2">
                                      
                      
                                           <input name="entretien_prevu_x_jour_alerte" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.entretien_prevu_x_jour_alerte}

                                            ref={entretien_prevu_x_jour_alerte => this.entretien_prevu_x_jour_alerte = entretien_prevu_x_jour_alerte} />
                                    </div>

                                  

                                  
                                </div>

                                <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >La date d'un entretien véhicule est dépassée ==> Alerte Active </label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-1">
                                     

                                          <input name="date_entretien_vehicule_depasse" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.date_entretien_vehicule_depasse}

                                            ref={date_entretien_vehicule_depasse => this.date_entretien_vehicule_depasse = date_entretien_vehicule_depasse} />
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-9">
                                       <div className="position-relative form-group">
                                           <label >Stock de matériels et fournitures Alerte si le stock minimum dépassé pour un article ==> Alerte Active </label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-1">
                                     

                                          <input name="stock_minimun_article_depasse" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.stock_minimun_article_depasse}

                                            ref={stock_minimun_article_depasse => this.stock_minimun_article_depasse = stock_minimun_article_depasse} />
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-9">
                                       <div className="position-relative form-group">
                                           <label >Stock de matériels et fournitures Alerte si le stock est nul pour un article ==> Alerte Active </label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-1">
                                     

                                          <input name="stock_null_article" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.stock_null_article}

                                            ref={stock_null_article => this.stock_null_article = stock_null_article} />
                                   </div>
                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-5">
                                       <div className="position-relative form-group">
                                           <label >Entretien planifié - prévu dans X kilomètres </label>
                                          
                                       </div>
                                   </div>

                                   <div className="col-md-2">
                                   <div className="position-relative form-group">

                                     <input name="entretien_planifie_prevu_x_kilometre" type="number"
                                      onChange={this.setField}
                                      className="form-control"
                                      defaultValue={item.entretien_planifie_prevu_x_kilometre}
                                      ref={entretien_planifie_prevu_x_kilometre => this.entretien_planifie_prevu_x_kilometre = entretien_planifie_prevu_x_kilometre} />
                                   </div>
                              </div>

                              <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label >Alerte Active </label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                     
                                          <input name="entretien_planifie_prevu_x_kilometre_alerte" type="checkbox"
                                           onChange={this.setField}
                                           defaultChecked={item.entretien_planifie_prevu_x_kilometre_alerte}

                                           ref={entretien_planifie_prevu_x_kilometre_alerte => this.entretien_planifie_prevu_x_kilometre_alerte = entretien_planifie_prevu_x_kilometre_alerte} />
                                   </div>

                                 

                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Entretien planifié - le kilometrage prévu est dépassé ==> Alerte Active </label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-1">
                                     

                                          <input name="entretien_planifie_kilometrage_prevu_depasse" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.entretien_planifie_kilometrage_prevu_depasse}

                                            ref={entretien_planifie_kilometrage_prevu_depasse => this.entretien_planifie_kilometrage_prevu_depasse = entretien_planifie_kilometrage_prevu_depasse} />
                                   </div>
                                 
                               </div>

                               
                               <div className="form-row">
                                   
                                   <div className="col-md-5">
                                       <div className="position-relative form-group">
                                           <label >Entretien planifié - prévu dans X jours </label>
                                          
                                       </div>
                                   </div>

                                   <div className="col-md-2">
                                   <div className="position-relative form-group">

                                     <input name="entretien_planifie_prevu_x_jour" type="number"
                                      onChange={this.setField}
                                      className="form-control"
                                      defaultValue={item.entretien_planifie_prevu_x_jour}
                                      ref={entretien_planifie_prevu_x_jour => this.entretien_planifie_prevu_x_jour = entretien_planifie_prevu_x_jour} />
                                   </div>
                              </div>

                              <div className="col-md-2">
                                       <div className="position-relative form-group">
                                           <label >Alerte Active </label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-2">
                                     
                     
                                          <input name="entretien_planifie_prevu_x_jour_alerte" type="checkbox"
                                           onChange={this.setField}
                                           defaultChecked={item.entretien_planifie_prevu_x_jour_alerte}

                                           ref={entretien_planifie_prevu_x_jour_alerte => this.entretien_planifie_prevu_x_jour_alerte = entretien_planifie_prevu_x_jour_alerte} />
                                   </div>

                                 

                                 
                               </div>

                               <div className="form-row">
                                   
                                   <div className="col-md-7">
                                       <div className="position-relative form-group">
                                           <label >Entretien planifié - la date prévue est dépassée ==> Alerte Active </label>
                                          
                                       </div>
                                   </div>


                                   <div className="col-md-1">
                                     

                                          <input name="entretien_planifie_date_prevu_depasse" type="checkbox"
                                            onChange={this.setField}
                                            defaultChecked={item.entretien_planifie_date_prevu_depasse}

                                            ref={entretien_planifie_date_prevu_depasse => this.entretien_planifie_date_prevu_depasse = entretien_planifie_date_prevu_depasse} />
                                   </div>
                                 
                               </div>


                               {!this.props.isFormAlerteSubmitted ? <button type="submit" className="mt-2 btn btn-primary">Enregistrer</button> : <button disabled  className="mt-2 btn btn-primary">Merci de patienter <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></button>}
                           
                                
                            </form>}
            </div>
        </div>
        )
    }
}


export default Alerte