import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Example extends Component {
    render() {
        return (
            <div className="app-main__inner">
            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                        <div className="page-title-icon">
                            <i className="pe-7s-graph text-success">
                            </i>
                        </div>
                        <div>Form Layouts
                            <div className="page-title-subheading">Build whatever layout you need with our Architect framework.
                            </div>
                        </div>
                    </div>
                    <div className="page-title-actions">
                        <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" className="btn-shadow mr-3 btn btn-dark">
                            <i className="fa fa-star"></i>
                        </button>
                        <div className="d-inline-block dropdown">
                            <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-shadow dropdown-toggle btn btn-info">
                                <span className="btn-icon-wrapper pr-2 opacity-7">
                                    <i className="fa fa-business-time fa-w-20"></i>
                                </span>
                                Buttons
                            </button>
                            <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                                <ul className="nav flex-column">
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-link-icon lnr-inbox"></i>
                                            <span>
                                                Inbox
                                            </span>
                                            <div className="ml-auto badge badge-pill badge-secondary">86</div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-link-icon lnr-book"></i>
                                            <span>
                                                Book
                                            </span>
                                            <div className="ml-auto badge badge-pill badge-danger">5</div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#" className="nav-link">
                                            <i className="nav-link-icon lnr-picture"></i>
                                            <span>
                                                Picture
                                            </span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a disabled href="#" className="nav-link disabled">
                                            <i className="nav-link-icon lnr-file-empty"></i>
                                            <span>
                                                File Disabled
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>    </div>
            </div>            <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
                <li className="nav-item">
                    <a role="tab" className="nav-link active" id="tab-0" data-toggle="tab" href="#tab-content-0">
                        <span>Layout</span>
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
                                <div className="position-relative form-check"><input name="check" id="exampleCheck" type="checkbox" className="form-check-input" /><label for="exampleCheck" className="form-check-label">Check me out</label></div>
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
                                <div className="position-relative row form-group"><label for="exampleFile" className="col-sm-2 col-form-label">File</label>
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






<div className="app-main__inner">
<div className="app-page-title">
    <div className="page-title-wrapper">
        <div className="page-title-heading">
            <div className="page-title-icon">
                <i className="pe-7s-display1 icon-gradient bg-premium-dark">
                </i>
            </div>
            <div>Form Controls
                <div className="page-title-subheading">Wide selection of forms controls, using the Bootstrap 4 code base, but built with React.
                </div>
            </div>
        </div>
        <div className="page-title-actions">
            <button type="button" data-toggle="tooltip" title="Example Tooltip" data-placement="bottom" className="btn-shadow mr-3 btn btn-dark">
                <i className="fa fa-star"></i>
            </button>
            <div className="d-inline-block dropdown">
                <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="btn-shadow dropdown-toggle btn btn-info">
                    <span className="btn-icon-wrapper pr-2 opacity-7">
                        <i className="fa fa-business-time fa-w-20"></i>
                    </span>
                    Buttons
                </button>
                <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-link-icon lnr-inbox"></i>
                                <span>
                                    Inbox
                                </span>
                                <div className="ml-auto badge badge-pill badge-secondary">86</div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-link-icon lnr-book"></i>
                                <span>
                                    Book
                                </span>
                                <div className="ml-auto badge badge-pill badge-danger">5</div>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-link-icon lnr-picture"></i>
                                <span>
                                    Picture
                                </span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a disabled href="#" className="nav-link disabled">
                                <i className="nav-link-icon lnr-file-empty"></i>
                                <span>
                                    File Disabled
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>    </div>
</div>            <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
    <li className="nav-item">
        <a role="tab" className="nav-link active" id="tab-0" data-toggle="tab" href="#tab-content-0">
          <span>Basic</span>
        </a>
    </li>
    
    <li className="nav-item">
        <a role="tab" className="nav-link" id="tab-1" data-toggle="tab" href="#tab-content-1">
          <span>Input Groups</span>
        </a>
    </li>
    <li className="nav-item">
        <a role="tab" className="nav-link" id="tab-2" data-toggle="tab" href="#tab-content-2">
          <span>Custom Controls</span>
        </a>
    </li>
</ul>
<div className="tab-content">
    <div className="tab-pane tabs-animation fade show active" id="tab-content-0" role="tabpanel">
        <div className="row">
            <div className="col-md-6">
                <div className="main-card mb-3 card">
                    <div className="card-body"><h5 className="card-title">Controls Types</h5>
                        <form className="">
                            <div className="position-relative form-group"><label htmlFor="exampleEmail" className="">Email</label><input name="email" id="exampleEmail" placeholder="with a placeholder" type="email" className="form-control" /></div>
                            <div className="position-relative form-group"><label htmlFor="examplePassword" className="">Password</label><input name="password" id="examplePassword" placeholder="password placeholder" type="password"
                                                                                                                                   className="form-control" /></div>
                            <div className="position-relative form-group"><label htmlFor="exampleSelect" className="">Select</label><select name="select" id="exampleSelect" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select></div>
                            <div className="position-relative form-group"><label htmlFor="exampleSelectMulti" className="">Select Multiple</label><select multiple="" name="selectMulti" id="exampleSelectMulti" className="form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select></div>
                            <div className="position-relative form-group"><label htmlFor="exampleText" className="">Text Area</label><textarea name="text" id="exampleText" className="form-control"></textarea></div>
                            <div className="position-relative form-group"><label htmlFor="exampleFile" className="">File</label><input name="file" id="exampleFile" type="file" className="form-control-file" />
                                <small className="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                            </div>
                            <button className="mt-1 btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="main-card mb-3 card">
                    <div className="card-body"><h5 className="card-title">Sizing</h5>
                        <form className=""><input placeholder="lg" type="text" className="mb-2 form-control-lg form-control" /><input placeholder="default" type="text" className="mb-2 form-control" /><input placeholder="sm" type="text"
                                                                                                                                                                                               className="mb-2 form-control-sm form-control" />
                            <div className="divider"></div>
                            <select className="mb-2 form-control-lg form-control">
                                <option>Large Select</option>
                            </select><select className="mb-2 form-control">
                                <option>Default Select</option>
                            </select><select className="form-control-sm form-control">
                                <option>Small Select</option>
                            </select></form>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body"><h5 className="card-title">Checkboxes &amp; Radios</h5>
                        <form className="">
                            <fieldset className="position-relative form-group">
                                <div className="position-relative form-check"><label className="form-check-label"><input name="radio1" type="radio" className="form-check-input" /> Option one is this and that—be sure to include why it's great</label>
                                </div>
                                <div className="position-relative form-check"><label className="form-check-label"><input name="radio1" type="radio" className="form-check-input" /> Option two can be something else and selecting it will deselect option
                                    one</label></div>
                                <div className="position-relative form-check disabled"><label className="form-check-label"><input name="radio1" disabled="" type="radio" className="form-check-input" /> Option three is disabled</label></div>
                            </fieldset>
                            <div className="position-relative form-check"><label className="form-check-label"><input type="checkbox" className="form-check-input" /> Check me out</label></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="tab-pane tabs-animation fade" id="tab-content-1" role="tabpanel">
        <div className="row">
            <div className="col-md-6">
                <div className="main-card mb-3 card">
                    <div className="card-body"><h5 className="card-title">Input Groups</h5>
                        <div>
                            
                            <div className="input-group">
                                <div className="input-group-prepend"><span className="input-group-text">@</span></div>
                                <input placeholder="username" type="text" className="form-control" /></div>
                            <br/>
                            <div className="input-group">
                                <div className="input-group-prepend"><span className="input-group-text"><input aria-label="Checkbox for following text input" type="checkbox" className="" /></span></div>
                                <input placeholder="Check it out" type="text" className="form-control" /></div>
                            <br/>
                            <div className="input-group"><input placeholder="username" type="text" className="form-control" />
                                <div className="input-group-append"><span className="input-group-text">@example.com</span></div>
                            </div>
                            <br/>
                            <div className="input-group">
                                <div className="input-group-prepend"><span className="input-group-text">$</span><span className="input-group-text">$</span></div>
                                <input placeholder="Dolla dolla billz yo!" type="text" className="form-control" />
                                <div className="input-group-append"><span className="input-group-text">$</span><span className="input-group-text">$</span></div>
                            </div>
                            <br/>
                            <div className="input-group">
                                <div className="input-group-prepend"><span className="input-group-text">$</span></div>
                                <input placeholder="Amount" step="1" type="number" className="form-control" />
                                <div className="input-group-append"><span className="input-group-text">.00</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body"><h5 className="card-title">Input Group Button Dropdown</h5>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle btn btn-secondary">Button Dropdown</button>
                                <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu"><h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                    <button type="button" disabled="" tabIndex="-1" className="disabled dropdown-item">Action</button>
                                    <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                    <div tabIndex="-1" className="dropdown-divider"></div>
                                    <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                </div>
                            </div>
                            <input type="text" className="form-control" /></div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body"><h5 className="card-title">Input Group Button Shorthand</h5>
                        <div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-secondary">To the Left!</button>
                                </div>
                                <input type="text" className="form-control" /></div>
                            <br/>
                            <div className="input-group"><input type="text" className="form-control" />
                                <div className="input-group-append">
                                    <button className="btn btn-secondary">To the Right!</button>
                                </div>
                            </div>
                            <br/>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-danger">To the Left!</button>
                                </div>
                                <input placeholder="and..." type="text" className="form-control" />
                                <div className="input-group-append">
                                    <button className="btn btn-success">To the Right!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="main-card mb-3 card">
                    <div className="card-body"><h5 className="card-title">Input Group Sizing</h5>
                        <div>
                            <div className="input-group input-group-lg">
                                <div className="input-group-prepend"><span className="input-group-text">@lg</span></div>
                                <input type="text" className="form-control" /></div>
                            <br />
                            <div className="input-group">
                                <div className="input-group-prepend"><span className="input-group-text">@normal</span></div>
                                <input type="text" className="form-control" /></div>
                            <br />
                            <div className="input-group input-group-sm">
                                <div className="input-group-prepend"><span className="input-group-text">@sm</span></div>
                                <input type="text" className="form-control" /></div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body"><h5 className="card-title">Input Group Addon</h5>
                        <div>
                            <div className="input-group">
                                <div className="input-group-prepend"><span className="input-group-text">To the Left!</span></div>
                                <input type="text" className="form-control" /></div>
                            <br />
                            <div className="input-group"><input type="text" className="form-control" />
                                <div className="input-group-append"><span className="input-group-text">To the Right!</span></div>
                            </div>
                            <br />
                            <div className="input-group">
                                <div className="input-group-prepend"><span className="input-group-text">To the Left!</span></div>
                                <input placeholder="and..." type="text" className="form-control" />
                                <div className="input-group-append"><span className="input-group-text">To the Right!</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-card mb-3 card">
                    <div className="card-body"><h5 className="card-title">Input Group Button</h5>
                        <div>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-secondary">I'm a button</button>
                                </div>
                                <input type="text" className="form-control" /></div>
                            <br />
                            <div className="input-group"><input type="text" className="form-control" />
                                <div className="input-group-append">
                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle btn btn-secondary">Button Dropdown</button>
                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu"><h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                        <button type="button" disabled="" tabIndex="-1" className="disabled dropdown-item">Action</button>
                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                        <div tabIndex="-1" className="dropdown-divider"></div>
                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-secondary">Split Button</button>
                                    <button type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" className="dropdown-toggle dropdown-toggle-split btn btn-outline-secondary"><span
                                            className="sr-only">Toggle Dropdown</span></button>
                                    <div tabIndex="-1" role="menu" aria-hidden="true" className="dropdown-menu"><h6 tabIndex="-1" className="dropdown-header">Header</h6>
                                        <button type="button" disabled="" tabIndex="-1" className="disabled dropdown-item">Action</button>
                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                        <div tabIndex="-1" className="dropdown-divider"></div>
                                        <button type="button" tabIndex="0" className="dropdown-item">Another Action</button>
                                    </div>
                                </div>
                                <input placeholder="and..." type="text" className="form-control" />
                                <div className="input-group-append">
                                    <button className="btn btn-secondary">I'm a button</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="tab-pane tabs-animation fade" id="tab-content-2" role="tabpanel">
        <form className="">
            <div className="row">
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Checkboxes</h5>
                            <div className="position-relative form-group">
                                <div>
                                    <div className="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox">Check this
                                        custom checkbox</label></div>
                                    <div className="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox2" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox2">Or this
                                        one</label></div>
                                    <div className="custom-checkbox custom-control"><input type="checkbox" id="exampleCustomCheckbox3" disabled="" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomCheckbox3">But
                                        not this disabled one</label></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Inline</h5>
                            <div className="position-relative form-group">
                                <div>
                                    <div className="custom-checkbox custom-control custom-control-inline"><input type="checkbox" id="exampleCustomInline" className="custom-control-input" /><label className="custom-control-label"
                                                                                                                                                                                          htmlFor="exampleCustomInline">An inline custom
                                        input</label></div>
                                    <div className="custom-checkbox custom-control custom-control-inline"><input type="checkbox" id="exampleCustomInline2" className="custom-control-input" /><label className="custom-control-label"
                                                                                                                                                                                           htmlFor="exampleCustomInline2">and another one</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Radios</h5>
                            <div className="position-relative form-group">
                                <div>
                                    <div className="custom-radio custom-control"><input type="radio" id="exampleCustomRadio" name="customRadio" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomRadio">Select
                                        this custom radio</label></div>
                                    <div className="custom-radio custom-control"><input type="radio" id="exampleCustomRadio2" name="customRadio" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomRadio2">Or
                                        this one</label></div>
                                    <div className="custom-radio custom-control"><input type="radio" id="exampleCustomRadio3" disabled="" className="custom-control-input" /><label className="custom-control-label" htmlFor="exampleCustomRadio3">But not this
                                        disabled one</label></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="main-card mb-3 card">
                        <div className="card-body"><h5 className="card-title">Form Select</h5>
                            <div className="row"> 
                                <div className="col-md-6">
                                    <div className="position-relative form-group"><label htmlFor="exampleCustomSelect" className="">Custom Select</label><select type="select" id="exampleCustomSelect" name="customSelect" className="custom-select">
                                        <option value="">Select</option>
                                        <option>Value 1</option>
                                        <option>Value 2</option>
                                        <option>Value 3</option>
                                        <option>Value 4</option>
                                        <option>Value 5</option>
                                    </select></div>
                                    <div className="position-relative form-group"><label htmlFor="exampleCustomMutlipleSelect" className="">Custom Multiple Select</label><select multiple="" type="select" id="exampleCustomMutlipleSelect"
                                                                                                                                                                      name="customSelect" className="custom-select">
                                        <option value="">Select</option>
                                        <option>Value 1</option>
                                        <option>Value 2</option>
                                        <option>Value 3</option>
                                        <option>Value 4</option>
                                        <option>Value 5</option>
                                    </select></div>
                                </div>
                                <div className="col-md-6">
                                    <div className="position-relative form-group"><label htmlFor="exampleCustomSelectDisabled" className="">Custom Select Disabled</label><select type="select" id="exampleCustomSelectDisabled" name="customSelect"
                                                                                                                                                                      disabled="" className="custom-select">
                                        <option value="">Select</option>
                                        <option>Value 1</option>
                                        <option>Value 2</option>
                                        <option>Value 3</option>
                                        <option>Value 4</option>
                                        <option>Value 5</option>
                                    </select></div>
                                    <div className="position-relative form-group"><label htmlFor="exampleCustomMutlipleSelectDisabled" className="">Custom Multiple Select Disabled</label><select multiple="" type="select"
                                                                                                                                                                                       id="exampleCustomMutlipleSelectDisabled"
                                                                                                                                                                                       name="customSelect" disabled="" className="custom-select">
                                        <option value="">Select</option>
                                        <option>Value 1</option>
                                        <option>Value 2</option>
                                        <option>Value 3</option>
                                        <option>Value 4</option>
                                        <option>Value 5</option>
                                    </select></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>
</div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
