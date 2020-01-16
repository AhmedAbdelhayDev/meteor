import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle } from "reactstrap";

import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import DropzoneExample from "../../../containers/forms/DropzoneExample";

export default class CommonPage extends Component {
    static getDerivedStateFromProps(props, state) {
        const pathname = props.location.pathname;
        const patharr = pathname.split("/");
        if (patharr.length > 1) {
            const site_id = patharr[patharr.length - 1];
            return { site_id };
        }

        return null;
    }

    render() {
        return (
            <Fragment>
                <Row className="mb-4">
                    <Colxx xxs="12">
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
