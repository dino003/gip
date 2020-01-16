import React, { Component } from 'react'
import {connect} from 'react-redux'

 class FileUpload extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            fichier: null
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.fileUpload = this.fileUpload.bind(this);

    }

    componentDidMount(){
        this.props.onRef(this)

    }

    componentWillUnmount() {
        this.props.onRef(undefined)
      }

      method() {
       // window.alert('do stuff')
       this.inputElement.click();
      }

    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.fichier)
      }

    onChange(e) {
        this.setState({fichier: e.target.files[0]}, () => {
           // window.alert('test');
           let conf = confirm(`Souhaitez-vous envoyer le fichier ${this.state.fichier.name} ?`)
           if(conf) return this.fileUpload(this.state.fichier);
           // this.setState({fichier: null})
           return;
        })
      }


    fileUpload(file){
        // toggle
        // this.setState((prevState) => {
        //     return { element: !prevState.element}
        // })

       // const url = '/api/import_personnel';
       

        const formData = new FormData();
        formData.append('fichier',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }

        const action1 = {type: "START_UPLOAD"}
        this.props.dispatch(action1)
        
        axios.post(this.props.url, formData, config).then(res => {

            const action = {type: this.props.action_type, value: res.data}
            this.props.dispatch(action)
            
            const action2 = {type: "STOP_UPLOAD"}
            this.props.dispatch(action2)
            this.props.onSuccesUpload(file)

        }).catch(error => {
            const action3 = {type: "STOP_UPLOAD"}
            this.props.dispatch(action3)
            console.log(error)
            this.props.onErrorUpload(file)
        })

      }
    

    render() {
        return (
            <form onSubmit={this.onFormSubmit} >
                <input type="file" onChange={this.onChange}
                 ref={input => this.inputElement = input}
                style={{display: 'none'}}
                 />
                {/* <button type="submit">Importer le fichier</button> */}
          </form>
        )
    }
}


const mapStateToProps = state => {
    return {
        loading: state.personnels.loading


    }
  }

export default connect(mapStateToProps)(FileUpload)