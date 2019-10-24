import React, { Component } from 'react'

export default class EtablissementForm extends Component {
    render() {
        return (
            <div className="main-card mb-3 card">
            <div className="card-body"><h5 className="card-title">Grid Rows</h5>
                <form className="">
                <div className="position-relative form-group">
                        <label className="">Société</label>
                        <input name="societe" id="exampleAddress" placeholder="1234 Main St" type="text" className="form-control" />
                        </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="position-relative form-group">
                                <label className="">Adresse</label>
                                <input name="adresse1" placeholder="with a placeholder" type="text" className="form-control" /></div>
                        </div>
                        <div className="col-md-6">
                            <div className="position-relative form-group">
                                <label className=""></label>
                                <input name="adresse2"  placeholder="password placeholder" type="text"
                                                                                                                                     className="form-control" /></div>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="position-relative form-group">
                                <label className="">Telephonne</label>
                                <input name="telephonne" placeholder="with a placeholder" type="text" className="form-control" /></div>
                        </div>
                        <div className="col-md-6">
                            <div className="position-relative form-group">
                                <label className="">Fax</label>
                                <input name="fax"  placeholder="password placeholder" type="text"
                                                                                                                                     className="form-control" /></div>
                        </div>
                    </div>
 
                    <div className="position-relative form-group">
                        <label className="">Address 2</label>
                        <input name="address2" placeholder="Apartment, studio, or floor" type="text" className="form-control" />
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <div className="position-relative form-group">
                                <label className="">Site web</label>
                                <input name="internet" type="text" className="form-control" /></div>
                        </div>
                        <div className="col-md-4">
                            <div className="position-relative form-group">
                                <label className="">Ville</label>
                                <input name="ville" type="text" className="form-control" /></div>
                        </div>
                        <div className="col-md-2">
                            <div className="position-relative form-group">
                                <label  className="">Code postal</label>
                                <input name="code_postal" type="text" className="form-control" /></div>
                        </div>
                    </div>
                    <div className="position-relative form-check"><input name="check" id="exampleCheck" type="checkbox" className="form-check-input" /><label htmlFor="exampleCheck" className="form-check-label">Check me out</label></div>
                    <button className="mt-2 btn btn-primary">Sign in</button>
                </form>
            </div>
        </div>
        )
    }
}
