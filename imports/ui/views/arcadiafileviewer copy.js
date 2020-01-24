import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
const path = require('path');

class ArcadiaFileViewer extends Component {
    constructor(props) {
        super(props);
        console.log("ArcadiaFileViewer");

        let search = this.props.location.search; //?p=...
        let enc = search.substr(3);
        let url = atob(enc);
        let basename = path.basename(url); //time-username-filename?params
        let arr0 = basename.split("?");
        let fullname = arr0[0];
        let extname = path.extname(fullname);
        extname = extname.substr(1);    //remove '.'

        this.state = {filePath: url, fileType: extname};
    }

    render() {
        const { fileType, filePath } = this.state;

        return (
            <div>

            {fileType}
            : :
            {filePath}

            <FileViewer
                fileType={fileType}
                filePath={filePath}
                errorComponent={CustomErrorComponent}
                onError={this.onError} />
            </div>
        );
    }

    onError(e) {
        console.log(e, 'error in file-viewer');
    }
}

export default ArcadiaFileViewer;