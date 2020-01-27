import React, { Component } from 'react';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

class ArcadiaFileViewer extends Component {
    constructor(props) {
        super(props);
        console.log("ArcadiaFileViewer");
        debugger;
    }

    render() {
        const {fileType, filePath} = this.props;

        return (
            <FileViewer
                fileType={fileType}
                filePath={filePath}
                errorComponent={CustomErrorComponent}
                onError={this.onError} />
        );
    }

    onError(e) {
        console.log(e, 'error in file-viewer');
    }
}

export default ArcadiaFileViewer;