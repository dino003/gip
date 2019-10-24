import React, { Component } from 'react'
import Sidebar from '../components/layouts/Sidebar'
import NavBar from '../components/layouts/NavBar'
import NFooter from '../components/layouts/NFooter'


export default class Dashboard extends Component {
    render() {
        return (
            <div className="app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header">
                <NavBar />
            <div className="app-main">
                <Sidebar />

                <div className="app-main__outer "> 
                <div className="app-main__inner ">
                
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                           
                           
                                <button type="button" className="btn-shadow btn btn-warning">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20"></i>
                                    </span>
                                    Tiers
                                </button>
                                   <button type="button" className="btn-shadow btn btn-info">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20"></i>
                                    </span>
                                    Entités
                                </button>
                                
                                <button type="button" className="btn-shadow btn btn-danger">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20"></i>
                                    </span>
                                    Personnel
                                </button>
                                
                                <button type="button" className="btn-shadow btn btn-primary">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20"></i>
                                    </span>
                                    Stock Matériel
                                </button>
                                
                                <button type="button" className="btn-shadow btn btn-warning">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20"></i>
                                    </span>
                                    C. Véhicules
                                </button>
                                
                                <button type="button" className="btn-shadow btn btn-info">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20"></i>
                                    </span>
                                    O. Missions
                                </button>
                                
                                <button type="button" className="btn-shadow btn btn-danger">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20"></i>
                                    </span>
                                    Détenteurs
                                </button>
                                
                                <button type="button" className="btn-shadow btn btn-primary">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20"></i>
                                    </span>
                                    Editions
                                </button>
                                
                               
                                
                                <button type="button" className="btn-shadow btn btn-warning">
                                    <span className="btn-icon-wrapper pr-2 opacity-7">
                                        <i className="fa fa-business-time fa-w-20"></i>
                                    </span>
                                    Fonctions
                                </button>
                                
                           
                        </div>
                        
                    </div>
                </div> 
                {/* */}          
                <div className="row">
                    <div className="col-lg-6">
                        <div className="main-card mb-3 card">
                            <div className="card-body"><h5 className="card-title">Simple table</h5>
                                <table className="mb-0 table">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="main-card mb-3 card">
                            <div className="card-body"><h5 className="card-title">Table bordered</h5>
                                <table className="mb-0 table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="main-card mb-3 card">
                            <div className="card-body"><h5 className="card-title">Table without border</h5>
                                <table className="mb-0 table table-borderless">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="main-card mb-3 card">
                            <div className="card-body"><h5 className="card-title">Table dark</h5>
                                <table className="mb-0 table table-dark">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="main-card mb-3 card">
                            <div className="card-body"><h5 className="card-title">Table with hover</h5>
                                <table className="mb-0 table table-hover">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="main-card mb-3 card">
                            <div className="card-body"><h5 className="card-title">Table responsive</h5>
                                <div className="table-responsive">
                                    <table className="mb-0 table">
                                        <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Table heading</th>
                                            <th>Table heading</th>
                                            <th>Table heading</th>
                                            <th>Table heading</th>
                                            <th>Table heading</th>
                                            <th>Table heading</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                            <td>Table cell</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="main-card mb-3 card">
                            <div className="card-body"><h5 className="card-title">Table sizing</h5>
                                <table className="mb-0 table table-sm">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="main-card mb-3 card">
                            <div className="card-body"><h5 className="card-title">Table striped</h5>
                                <table className="mb-0 table table-striped">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry</td>
                                        <td>the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    <NFooter />
                </div>
            </div>

            </div>
        )
    }
}
