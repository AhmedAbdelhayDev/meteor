import React, { Component, Fragment } from "react";
import { Row, Card, CardTitle, Button } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Colxx } from "../components/common/CustomBootstrap";
import IntlMessages from "../helpers/IntlMessages";

import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import '../assets/css/arcadiafileviewer.css';

const path = require('path');

class Error extends Component {
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

    componentDidMount() {
        document.body.classList.add("background");
        document.body.classList.add("no-footer");
    }
    componentWillUnmount() {
        document.body.classList.remove("background");
        document.body.classList.remove("no-footer");
    }
    render() {
        // const { fileType, filePath } = this.state;
        let filePath = "https://arcadiaisla.blob.core.windows.net/arcadia-site-media/TEST/S/5170c461-40dc-4102-bca4-d7db76b5beeb/photo/1579883694327-User1-log1o.png?st=2020-01-24T17%3A14%3A14Z&se=2020-01-24T20%3A34%3A14Z&sp=r&sv=2018-03-28&sr=b&sig=kDSgqJWR%2Bn%2BH01oOfJwXHNnxNS98mHyVlaYbZYkSA9Y%3D";
        let fileType = "png";

        return (
            <Fragment>
                <div className="fixed-background" />
                <main>
                    <div className="container">
                        <Row className="h-100">
                            <Colxx xxs="12" md="10" className="mx-auto my-auto">
                                <Card className="auth-card">
                                    <FileViewer
                                        fileType={fileType}
                                        filePath={filePath}
                                        errorComponent={CustomErrorComponent}
                                        onError={this.onError} />
                                </Card>
                            </Colxx>
                        </Row>
                    </div>
                </main>
            </Fragment>
        );
    }
}

export default Error;
