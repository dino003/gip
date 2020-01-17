import React, { Component } from 'react'


export default class Dashboard extends Component {
    render() {
        return (
            
            <div className="app-main__outer">
            <div className="app-main__inner">
                <div className="app-page-title">
                    <div className="page-title-wrapper">
                        <div className="page-title-heading">
                            <div className="page-title-icon">
                                <i className="pe-7s-wallet icon-gradient bg-plum-plate">
                                </i>
                            </div>
                            <div>Dashboard Boxes
                                <div className="page-title-subheading">Highly configurable boxes best used for showing numbers in an user friendly way.
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
                                <div tabindex="-1" role="menu" aria-hidden="true" className="dropdown-menu dropdown-menu-right">
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
                </div>            <div className="">
                    <div className="row">
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Total Orders</div>
                                        <div className="widget-subheading">Last year expenses</div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="widget-numbers text-success"><span>1896</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Clients</div>
                                        <div className="widget-subheading">Total Clients Profit</div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="widget-numbers text-primary"><span>$ 568</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Products Sold</div>
                                        <div className="widget-subheading">Total revenue streams</div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="widget-numbers text-warning"><span>$14M</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-wrapper">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Followers</div>
                                        <div className="widget-subheading">People Interested</div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="widget-numbers text-danger"><span>46%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider mt-0" style={{marginBottom: '30px'}}></div>
                    <div className="row">
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content bg-night-fade">
                                <div className="widget-content-wrapper text-white">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Total Orders</div>
                                        <div className="widget-subheading">Last year expenses</div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="widget-numbers text-white"><span>1896</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content bg-arielle-smile">
                                <div className="widget-content-wrapper text-white">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Clients</div>
                                        <div className="widget-subheading">Total Clients Profit</div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="widget-numbers text-white"><span>$ 568</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content bg-premium-dark">
                                <div className="widget-content-wrapper text-white">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Products Sold</div>
                                        <div className="widget-subheading">Total revenue streams</div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="widget-numbers text-warning"><span>$14M</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content bg-happy-green">
                                <div className="widget-content-wrapper text-white">
                                    <div className="widget-content-left">
                                        <div className="widget-heading">Followers</div>
                                        <div className="widget-subheading">People Interested</div>
                                    </div>
                                    <div className="widget-content-right">
                                        <div className="widget-numbers text-dark"><span>46%</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider mt-0" style={{marginBottom: '30px'}}></div>
                    <div className="row">
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Total Orders</div>
                                            <div className="widget-subheading">Last year expenses</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-success">1896</div>
                                        </div>
                                    </div>
                                    <div className="widget-progress-wrapper">
                                        <div className="progress-bar-xs progress">
                                            <div className="progress-bar bg-primary" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style={{width: '65%'}}></div>
                                        </div>
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">YoY Growth</div>
                                            <div className="sub-label-right">100%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Clients</div>
                                            <div className="widget-subheading">Total Clients Profit</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-primary">$12.6k</div>
                                        </div>
                                    </div>
                                    <div className="widget-progress-wrapper">
                                        <div className="progress-bar-lg progress-bar-animated progress">
                                            <div className="progress-bar bg-warning" role="progressbar" aria-valuenow="47" aria-valuemin="0" aria-valuemax="100" style={{width: '47%'}}></div>
                                        </div>
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">Retention</div>
                                            <div className="sub-label-right">100%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Products Sold</div>
                                            <div className="widget-subheading">Total revenue streams</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-warning">$3M</div>
                                        </div>
                                    </div>
                                    <div className="widget-progress-wrapper">
                                        <div className="progress-bar-xs progress-bar-animated-alt progress">
                                            <div className="progress-bar bg-danger" role="progressbar" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100" style={{width: '85%'}}></div>
                                        </div>
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">Sales</div>
                                            <div className="sub-label-right">100%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-xl-4">
                            <div className="card mb-3 widget-content">
                                <div className="widget-content-outer">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Followers</div>
                                            <div className="widget-subheading">People Interested</div>
                                        </div>
                                        <div className="widget-content-right">
                                            <div className="widget-numbers text-danger">45,9%</div>
                                        </div>
                                    </div>
                                    <div className="widget-progress-wrapper">
                                        <div className="progress-bar-sm progress-bar-animated-alt progress">
                                            <div className="progress-bar bg-success" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" style={{width: '65%'}}></div>
                                        </div>
                                        <div className="progress-sub-label">
                                            <div className="sub-label-left">Twitter Progress</div>
                                            <div className="sub-label-right">100%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider mt-0" style={{marginBottom: '30px'}}></div>
                    <div className="main-card mb-3 card">
                        <div className="no-gutters row">
                            <div className="col-md-4">
                                <div className="widget-content">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-right ml-0 mr-3">
                                            <div className="widget-numbers text-success">1896</div>
                                        </div>
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Total Orders</div>
                                            <div className="widget-subheading">Last year expenses</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="widget-content">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-right ml-0 mr-3">
                                            <div className="widget-numbers text-warning">$ 14M</div>
                                        </div>
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Products Sold</div>
                                            <div className="widget-subheading">Total revenue streams</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="widget-content">
                                    <div className="widget-content-wrapper">
                                        <div className="widget-content-right ml-0 mr-3">
                                            <div className="widget-numbers text-danger">45.9%</div>
                                        </div>
                                        <div className="widget-content-left">
                                            <div className="widget-heading">Followers</div>
                                            <div className="widget-subheading">People Interested</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider mt-0" style={{marginBottom: '30px'}}></div>
                    <div className="main-card mb-3 card">
                        <div className="no-gutters row">
                            <div className="col-md-4">
                                <div className="pt-0 pb-0 card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Total Orders</div>
                                                            <div className="widget-subheading">Last year expenses</div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-success">1896</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Clients</div>
                                                            <div className="widget-subheading">Total Clients Profit</div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-primary">$12.6k</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pt-0 pb-0 card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Followers</div>
                                                            <div className="widget-subheading">People Interested</div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-danger">45,9%</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Products Sold</div>
                                                            <div className="widget-subheading">Total revenue streams</div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-warning">$3M</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="pt-0 pb-0 card-body">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Total Orders</div>
                                                            <div className="widget-subheading">Last year expenses</div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-success">1896</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <div className="widget-content p-0">
                                                <div className="widget-content-outer">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-left">
                                                            <div className="widget-heading">Clients</div>
                                                            <div className="widget-subheading">Total Clients Profit</div>
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-numbers text-primary">$12.6k</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="divider mt-0" style={{marginBottom: '30px'}}></div>
                   
                   
                </div>
            </div>

        </div>
        )
    }
}
