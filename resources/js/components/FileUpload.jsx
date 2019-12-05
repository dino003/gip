import React, { Component } from 'react'

export default class FileUpload extends Component {
    render() {
        return (
            <form>
                <input type="file" />
                <button type="submit">Importer le fichier</button>
          </form>
        )
    }
}
