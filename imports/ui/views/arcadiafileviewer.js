import React, { Component, Fragment } from "react";
import { Row, Card, CardTitle, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../components/common/CustomBootstrap";
import IntlMessages from "../helpers/IntlMessages";

import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import '../assets/css/arcadiafileviewer.css';

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

        this.state = { filePath: url, fileType: extname };

        this.onError = this.onError.bind(this);
    }

    render() {
        const { fileType, filePath } = this.state;

        return (
            <Fragment>
                <div className="fileview-container">

                    <FileViewer
                        fileType={fileType}
                        filePath={filePath}
                        errorComponent={CustomErrorComponent}
                        onError={this.onError} />

                </div>
            </Fragment>
        );
    }

    onError(e) {
        console.log(e, 'error in file-viewer');
    }
}

export default ArcadiaFileViewer;
