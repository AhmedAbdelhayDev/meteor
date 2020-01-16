import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Badge
} from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { injectIntl } from "react-intl";

import TagsInputExample from "../../../containers/forms/TagsInputExample";
import { ReactTableWithPaginationCard } from "../../../containers/ui/ReactTableCards";

import files from "../../../data/files";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

const MapWithAMarker = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: -34.397, lng: 150.644 }}>
        <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>
    ))
);

class FileViewerPage extends Component {
  constructor(props) {
    super(props);
    this.toggleTab = this.toggleTab.bind(this);
    this.state = {
      activeFirstTab: "1",
    };
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeFirstTab: tab
      });
    }
  }

  render() {
    const { messages } = this.props.intl;
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
            <h1>File Viewer</h1>
            <div className="text-zero top-right-button-container">
              <UncontrolledDropdown>
                <DropdownToggle
                  caret
                  color="primary"
                  size="lg"
                  outline
                  className="top-right-button top-right-button-single">
                  <IntlMessages id="pages.actions" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>
                    <IntlMessages id="pages.header" />
                  </DropdownItem>
                  <DropdownItem disabled>
                    <IntlMessages id="pages.delete" />
                  </DropdownItem>
                  <DropdownItem>
                    <IntlMessages id="pages.another-action" />
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <IntlMessages id="pages.another-action" />
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <Breadcrumb match={this.props.match} />
            <Separator className="mb-5" />

            <Row>
              <Colxx xxs="12" xl="8" className="col-left">
                <Card className="mb-4">
                    <CardBody>
                        <CardTitle>
                          <IntlMessages id="maps.google" />
                        </CardTitle>
                        <MapWithAMarker
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCO8MfadmlotuuHC8wmjwL_46I5QAMIiRU&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div className="map-item" />}
                        containerElement={<div className="map-item" />}
                        mapElement={<div className="map-item" />}/>
                    </CardBody>
                </Card>
                <ReactTableWithPaginationCard data={files}/>
              </Colxx>

              <Colxx xxs="12" xl="4" className="col-right">
                <Card className="mb-4">
                  <CardBody>
                    <p className="mb-3">
                      Vivamus ultricies augue vitae commodo condimentum. Nullam faucibus eros eu mauris feugiat, eget consectetur tortor tempus.
                      <br /><br />
                      Sed volutpat mollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque quis cursus mauris.
                      <br /><br />
                      Nulla non purus fermentum, pulvinar dui condimentum, malesuada nibh. Sed viverra quam urna, at condimentum ante viverra non. Mauris posuere erat sapien, a convallis libero lobortis sit amet. Suspendisse in orci tellus.
                    </p>
                    <p className="text-muted text-small mb-2">{messages["forms.tags"]}</p>
                    <p className="mb-3">
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill>FRONTEND</Badge>
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill>JAVASCRIPT</Badge>
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill>SECURITY</Badge>
                      <Badge color="outline-secondary" className="mb-1 mr-1" pill>DESIGN</Badge>
                    </p>
                    <TagsInputExample/>
                  </CardBody>
                </Card>
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

export default injectIntl(FileViewerPage);
