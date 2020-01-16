import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle } from "reactstrap";

import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import DropzoneExample from "../../../containers/forms/DropzoneExample";

import Breadcrumb from "../../../containers/navs/Breadcrumb";

import Sites from "../../../../api/sites";

export default class CommonPage extends Component {
    constructor(props) {
        super(props);
    }

    static getDerivedStateFromProps(props, state) {
        const pathname = props.location.pathname;
        const patharr = pathname.split("/");
        if (patharr.length > 1) {
            const site_id = patharr[patharr.length - 1];
            let siteData = Sites.findOne({ site_id: site_id });
            return { siteData };
        }

        return null;
    }

    render() {
        return (
            <Fragment>
                <Row className="mb-4">
                    <Colxx xxs="12">
                        <h1>{this.state.siteData.abstract.site_name}</h1>

                        <Breadcrumb match={this.props.match} />
                        <Separator className="mb-5" />

                        <Card>
                            <CardBody>
                                <CardTitle>
                                    <IntlMessages id="menu.fileupload" />
                                </CardTitle>
                                <DropzoneExample
                                    ref={node => (this.dropzone = node)}
                                />
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}
