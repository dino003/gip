import React, { Component } from 'react'

export default class ParametreGeneraux extends Component {
    render() {
        return (
            <div className="app-main__inner">
              
            <div className="">
              <div className="col-md-12">

             <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
                <li className="nav-item">
                    <a role="tab" className="nav-link active" id="tab-0" data-toggle="tab" href="#tab-content-0">
                    <i className="fa fa-home"></i> 

                        <span>  Etablissement</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Fonctions</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                    <i className="fa fa-car"></i> 

                        <span> Véhicules</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Coûts</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Cartes Reservations/Ordres de missions</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <i className="fa fa-times"></i> 
                        <span> Stocks</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Personnel</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Assurances</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Techniques </span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Messagerie</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Alerte 1</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Alerte 2</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
                        <span>Grid</span>
                    </a>
                </li>
            </ul>
            <div className="tab-content">
                <div className="tab-pane tabs-animation fade show active" id="tab-content-0" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Grid Rows</h5>
                            <form className="">
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group"><label htmlFor="exampleEmail11" className="">Email</label><input name="email" id="exampleEmail11" placeholder="with a placeholder" type="email" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="position-relative form-group"><label htmlFor="examplePassword11" className="">Password</label><input name="password" id="examplePassword11" placeholder="password placeholder" type="password"
                                                                                                                                                 className="form-control" /></div>
                                    </div>
                                </div>
                                <div className="position-relative form-group"><label htmlFor="exampleAddress" className="">Address</label><input name="address" id="exampleAddress" placeholder="1234 Main St" type="text" className="form-control" /></div>
                                <div className="position-relative form-group"><label htmlFor="exampleAddress2" className="">Address 2</label><input name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" type="text" className="form-control" />
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="position-relative form-group"><label htmlFor="exampleCity" className="">City</label><input name="city" id="exampleCity" type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="position-relative form-group"><label htmlFor="exampleState" className="">State</label><input name="state" id="exampleState" type="text" className="form-control" /></div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="position-relative form-group"><label htmlFor="exampleZip" className="">Zip</label><input name="zip" id="exampleZip" type="text" className="form-control" /></div>
                                    </div>
                                </div>
                                <div className="position-relative form-check"><input name="check" id="exampleCheck" type="checkbox" className="form-check-input" /><label htmlFor="exampleCheck" className="form-check-label">Check me out</label></div>
                                <button className="mt-2 btn btn-primary">Sign in</button>
                            </form>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Inline</h5>
                            <div>
                                <form className="form-inline">
                                    <div className="mb-2 mr-sm-2 mb-sm-0 position-relative form-group"><label htmlFor="exampleEmail22" className="mr-sm-2">Email</label><input name="email" id="exampleEmail22" placeholder="something@idk.cool" type="email"
                                                                                                                                                                   className="form-control" /></div>
                                    <div className="mb-2 mr-sm-2 mb-sm-0 position-relative form-group"><label htmlFor="examplePassword22" className="mr-sm-2">Password</label><input name="password" id="examplePassword22" placeholder="don't tell!" type="password"
                                                                                                                                                                         className="form-control" /></div>
                                    <button className="btn btn-primary">Submit</button>
                                </form>
                                <div className="divider"></div>
                                <form className="">
                                    <div className="position-relative form-check form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" /> Some input</label></div>
                                    <div className="position-relative form-check form-check-inline"><label className="form-check-label"><input type="checkbox" className="form-check-input" /> Some other input</label></div>
                                </form>
                                <div className="divider"></div>
                                <form className="form-inline">
                                    <div className="position-relative form-group"><label htmlFor="exampleEmail33" className="sr-only">Email</label><input name="email" id="exampleEmail33" placeholder="Email" type="email" className="mr-2 form-control" /></div>
                                    <div className="position-relative form-group"><label htmlFor="examplePassword44" className="sr-only">Password</label><input name="password" id="examplePassword44" placeholder="Password" type="password"
                                                                                                                                                    className="mr-2 form-control" /></div>
                                    <button className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tab-pane tabs-animation fade" id="tab-content-1" role="tabpanel">
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Grid</h5>
                            <form className="">
                                <div className="position-relative row form-group"><label htmlFor="exampleEmail" className="col-sm-2 col-form-label">Email</label>
                                    <div className="col-sm-10"><input name="email" id="exampleEmail" placeholder="with a placeholder" type="email" className="form-control" /></div>
                                </div>
                                <div className="position-relative row form-group"><label htmlFor="examplePassword" className="col-sm-2 col-form-label">Password</label>
                                    <div className="col-sm-10"><input name="password" id="examplePassword" placeholder="password placeholder" type="password" className="form-control" /></div>
                                </div>
                                <div className="position-relative row form-group"><label htmlFor="exampleSelect" className="col-sm-2 col-form-label">Select</label>
                                    <div className="col-sm-10"><select name="select" id="exampleSelect" className="form-control"></select></div>
                                </div>
                                <div className="position-relative row form-group"><label htmlFor="exampleSelectMulti" className="col-sm-2 col-form-label">Select Multiple</label>
                                    <div className="col-sm-10"><select multiple="" name="selectMulti" id="exampleSelectMulti" className="form-control"></select></div>
                                </div>
                                <div className="position-relative row form-group"><label htmlFor="exampleText" className="col-sm-2 col-form-label">Text Area</label>
                                    <div className="col-sm-10"><textarea name="text" id="exampleText" className="form-control"></textarea></div>
                                </div>
                                <div className="position-relative row form-group"><label htmlFor="exampleFile" className="col-sm-2 col-form-label">File</label>
                                    <div className="col-sm-10"><input name="file" id="exampleFile" type="file" className="form-control-file" />
                                        <small className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                                    </div>
                                </div>
                                <fieldset className="position-relative row form-group">
                                    <legend className="col-form-label col-sm-2">Radio Buttons</legend>
                                    <div className="col-sm-10">
                                        <div className="position-relative form-check"><label className="form-check-label"><input name="radio2" type="radio" className="form-check-input" /> Option one is this and that—be sure to include why it's great</label></div>
                                        <div className="position-relative form-check"><label className="form-check-label"><input name="radio2" type="radio" className="form-check-input" /> Option two can be something else and selecting it will deselect option
                                            one</label></div>
                                        <div className="position-relative form-check disabled"><label className="form-check-label"><input name="radio2" disabled="" type="radio" className="form-check-input" /> Option three is disabled</label></div>
                                    </div>
                                </fieldset>
                                <div className="position-relative row form-group"><label htmlFor="checkbox2" className="col-sm-2 col-form-label">Checkbox</label>
                                    <div className="col-sm-10">
                                        <div className="position-relative form-check"><label className="form-check-label"><input id="checkbox2" type="checkbox" className="form-check-input" /> Check me out</label></div>
                                    </div>
                                </div>
                                <div className="position-relative row form-check">
                                    <div className="col-sm-10 offset-sm-2">
                                        <button className="btn btn-secondary">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
       </div>
        )
    }
}
