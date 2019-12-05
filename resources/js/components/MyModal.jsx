import React, { Component } from 'react'

export default class MyModal extends Component {
        constructor(props) {
            super(props);
            
        }
        
    onClose = e => {
        //this.props.show = false;
        this.props.onClose && this.props.onClose(e)
      };


    render() {
        if(!this.props.show){
            return null;
        }
    return (
       

            <div className="modalDynamique" style={{position: 'absolute'}}>
            <div className=" modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                        <button onClick={e => {this.onClose(e);}}  className="close" >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.props.children}
                    </div>
                    <div className="modal-footer">
                        <button onClick={e => {this.onClose(e);}} className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
            </div>
        )
        
    }
}
