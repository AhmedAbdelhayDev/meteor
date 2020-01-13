import React, { Component, Fragment } from "react";
import { Row } from "reactstrap";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { injectIntl } from "react-intl";
import AddNewSiteWizard from "../../../containers/wizard/AddNewSiteWizard";
import LastStepEnd from "../../../containers/wizard/LastStepEnd";
import TopNavDisabled from "../../../containers/wizard/TopNavDisabled";
import Validation from "../../../containers/wizard/Validation";
import Layouts from "../../../containers/wizard/Layouts";

class NewSitePage extends Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <Breadcrumb
                            heading="menu.newsite"
                            match={this.props.match}
                        />
                        <Separator className="mb-5" />
                    </Colxx>
                </Row>
                <Row>
                    <Colxx xxs="12" className="mb-5">
                        <h5 className="mb-4">Add Site</h5>
                        <AddNewSiteWizard />
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
}

export default injectIntl(NewSitePage);
