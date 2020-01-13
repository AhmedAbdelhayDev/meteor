import React, { Component, Fragment } from "react";
import {
  Row,
  Card,
  CardTitle,
  CardBody,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  TabContent,
  TabPane,
  Badge,
  CardHeader,
  Label,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { injectIntl } from "react-intl";
import GlideComponentThumbs from "../../../components/carousel/GlideComponentThumbs";
import { detailImages, detailThumbs } from "../../../data/carouselItems";
import { detailsQuestionsData } from "../../../data/questions";
import CommentWithLikes from "../../../components/pages/CommentWithLikes";
import { commentWithLikesData } from "../../../data/comments";
import QuestionAnswer from "../../../components/pages/QuestionAnswer";
import GalleryDetail from "../../../containers/pages/GalleryDetail";

import TagsInputExample from "../../../containers/forms/TagsInputExample";

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

class CommonPage extends Component {
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
            <h1>Magdalena Cake</h1>
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
                <Card className="mb-4">
                  <CardHeader>
                    <Nav tabs className="card-header-tabs ">
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "1",
                            "nav-link": true
                          })}
                          onClick={() => { this.toggleTab("1"); }} to="#" location={{}} >
                          <IntlMessages id="pages.general-title" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "2",
                            "nav-link": true
                          })}
                          onClick={() => { this.toggleTab("2"); }} to="#" location={{}} >
                          <IntlMessages id="pages.property-title" />
                      </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "3",
                            "nav-link": true
                          })}
                          onClick={() => { this.toggleTab("3"); }} to="#" location={{}} >
                          <IntlMessages id="pages.structure-title" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "4",
                            "nav-link": true
                          })}
                          onClick={() => { this.toggleTab("4"); }} to="#" location={{}} >
                          <IntlMessages id="pages.owner-title" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "5",
                            "nav-link": true
                          })}
                          onClick={() => { this.toggleTab("5"); }} to="#" location={{}} >
                          <IntlMessages id="pages.tax-title" />
                      </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "6",
                            "nav-link": true
                          })}
                          onClick={() => { this.toggleTab("6"); }} to="#" location={{}} >
                          <IntlMessages id="pages.sales-title" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "7",
                            "nav-link": true
                          })}
                          onClick={() => { this.toggleTab("7"); }} to="#" location={{}} >
                          <IntlMessages id="pages.mortgages-title" />
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "8",
                            "nav-link": true
                          })}
                          onClick={() => { this.toggleTab("8"); }} to="#" location={{}} >
                          <IntlMessages id="pages.legal-title" />
                      </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({
                            active: this.state.activeFirstTab === "9",
                            "nav-link": true
                          })}
                          onClick={() => { this.toggleTab("9"); }} to="#" location={{}} >
                          <IntlMessages id="pages.other-title" />
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </CardHeader>

                  <TabContent activeTab={this.state.activeFirstTab}>
                    <TabPane tabId="1">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="siteId" sm={2} className="font-weight-bold">
                                        Site ID
                                    </Label>
                                    <Label id="siteId" sm={10}>
                                        Example site id
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="ownerName" sm={2} className="font-weight-bold">
                                        Owner Name
                                    </Label>
                                    <Label id="ownerName" sm={10}>
                                        Example Owner Name
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="formattedStreetAddress" sm={2} className="font-weight-bold">
                                        Formatted Street Address
                                    </Label>
                                    <Label id="formattedStreetAddress" sm={10}>
                                        Example Formatted Street Address
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="city" sm={2} className="font-weight-bold">
                                        City
                                    </Label>
                                    <Label id="city" sm={10}>
                                        Example City
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        State
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example State
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="zipcode" sm={2} className="font-weight-bold">
                                        Zip Code plus four
                                    </Label>
                                    <Label id="zipcode" sm={10}>
                                        Example Zip Code plus four
                                    </Label>
                                </FormGroup>
                            </Form>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>                              
                            <Form>
                                <FormGroup row>
                                    <Label for="siteId" sm={2} className="font-weight-bold">
                                        Depth (ft)
                                    </Label>
                                    <Label id="siteId" sm={10}>
                                        Example Depth (ft)
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="ownerName" sm={2} className="font-weight-bold">
                                        Width (ft)
                                    </Label>
                                    <Label id="ownerName" sm={10}>
                                        Example Width (ft)
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="formattedStreetAddress" sm={2} className="font-weight-bold">
                                        Size
                                    </Label>
                                    <Label id="formattedStreetAddress" sm={10}>
                                        Example Size
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="city" sm={2} className="font-weight-bold">
                                        Acres
                                    </Label>
                                    <Label id="city" sm={10}>
                                        Example Acres
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Range
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Range
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="zipcode" sm={2} className="font-weight-bold">
                                        Township
                                    </Label>
                                    <Label id="zipcode" sm={10}>
                                        Example Township
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Section
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Section
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Block
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Block
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Lot
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Lot
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Location Description
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Location Description
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Building Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Building Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Boundaries
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Boundaries
                                    </Label>
                                </FormGroup>
                            </Form>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="3">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="siteId" sm={2} className="font-weight-bold">
                                        Year Built
                                    </Label>
                                    <Label id="siteId" sm={10}>
                                        Example Year Built
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="ownerName" sm={2} className="font-weight-bold">
                                        Year Updated
                                    </Label>
                                    <Label id="ownerName" sm={10}>
                                        Example Year Updated
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="formattedStreetAddress" sm={2} className="font-weight-bold">
                                        Identifier
                                    </Label>
                                    <Label id="formattedStreetAddress" sm={10}>
                                        Example Identifier
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="city" sm={2} className="font-weight-bold">
                                        Rooms Count
                                    </Label>
                                    <Label id="city" sm={10}>
                                        Example Rooms Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Beds Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Beds Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="zipcode" sm={2} className="font-weight-bold">
                                        Baths Count
                                    </Label>
                                    <Label id="zipcode" sm={10}>
                                        Example Baths Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Half Baths Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Half Baths Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Full Baths Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Full Baths Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Quarter Baths Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Quarter Baths Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Three Quarter Baths Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Three Quarter Baths Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Stories Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Stories Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Units Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Units Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Total Size
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Total Size
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Finished Size
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Finished Size
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Unfinished Size
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Unfinished Size
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Basement Size
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Basement Size
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Garage Size
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Garage Size
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Height
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Height
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Architecture Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Architecture Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Exterior Wall Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Exterior Wall Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Air Condition Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Air Condition Type
                                    </Label>
                                </FormGroup>                                
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Basement Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Basement Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Building Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Building Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Category
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Category
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Condition
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Condition
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Construction Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Construction Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Fireplace Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Fireplace Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Fireplace Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Fireplace Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Foundation Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Foundation Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Flooring Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Flooring Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Garage Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Garage Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Heating Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Heating Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Mobile Home
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Mobile Home
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Parking Spaces
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Parking Spaces
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Pool Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Pool Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Quality
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Quality
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Roof Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Roof Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Roof Style Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Roof Style Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Electricity Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Electricity Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Fuel Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Fuel Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Sewer Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Sewer Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Water Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Water Type
                                    </Label>
                                </FormGroup>
                            </Form>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="4">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <p className="font-weight-bold">Site ID</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Owner Name</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Formatted Street_Address</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">City</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">State</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Zip Code plus four</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="5">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <p className="font-weight-bold">Site ID</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Owner Name</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Formatted Street_Address</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">City</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">State</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Zip Code plus four</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="6">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <p className="font-weight-bold">Site ID</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Owner Name</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Formatted Street_Address</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">City</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">State</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Zip Code plus four</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="7">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <p className="font-weight-bold">Site ID</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Owner Name</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Formatted Street_Address</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">City</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">State</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                            <p className="font-weight-bold">Zip Code plus four</p>
                            <p>
                              Vivamus ultricies augue vitae commodo condimentum. Nullamfaucibus eros eu mauris feugiat, eget consectetur tortor tempus. Sed volutpatmollis dui eget fringilla. Vestibulum blandit urna ut tellus lobortis tristique.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubiliaCurae; Pellentesque quis cursus mauris. Nam in ornare erat. Vestibulum convallisenim ac massa dapibus consectetur. Maecenas facilisis eros ac felis mattis, egetauctor sapien varius.
                            </p>
                            <br />
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="8">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="siteId" sm={2} className="font-weight-bold">
                                        APN Original
                                    </Label>
                                    <Label id="siteId" sm={10}>
                                        Example APN Original
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="ownerName" sm={2} className="font-weight-bold">
                                        APN Unformatted
                                    </Label>
                                    <Label id="ownerName" sm={10}>
                                        Example APN Unformatted
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="formattedStreetAddress" sm={2} className="font-weight-bold">
                                        Tax Account Number
                                    </Label>
                                    <Label id="formattedStreetAddress" sm={10}>
                                        Example Tax Account Number
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="city" sm={2} className="font-weight-bold">
                                        Legal Description
                                    </Label>
                                    <Label id="city" sm={10}>
                                        Example Legal Description
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Planned Urban Development
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Planned Urban Development
                                    </Label>
                                </FormGroup>
                            </Form>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="9">
                      <Row>
                        <Colxx sm="12">
                          <CardBody>
                            <Form>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Name
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Name
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        State FIPS Code
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example State FIPS Code
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        FIPS Code / Census Tract
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example FIPS Code / Census Tract 
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Census Block / Name
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Census Block / Name
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Code
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Code
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Type/ (geographies.police)Name
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Type/ (geographies.police)Name
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        City
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example City
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        State FIPS
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example State FIPS
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        County FIPS/ (geographies.fire)Fire Department ID
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example County FIPS/ (geographies.fire)Fire Department ID
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Name
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Name
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Address
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Address
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Address Second
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Address Second
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        City
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example City
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Zip Code
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Zip Code
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Mailing Address
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Mailing Address
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Department Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Department Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Organization Type
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Organization Type
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Website (with clickable link)
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Website (with clickable link)
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Stations Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Stations Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Career Firefighters Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Career Firefighters Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Volunteer Firefighters Count
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Volunteer Firefighters Count
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Non Firefighting Staff
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Non Firefighting Staff
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        County
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example County
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        State/ (geographies.flood)Fima Flood Zone
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example State/ (geographies.flood)Fima Flood Zone
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Annual Flood Risk
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Annual Flood Risk
                                    </Label>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="state" sm={2} className="font-weight-bold">
                                        Firm Panel ID
                                    </Label>
                                    <Label id="state" sm={10}>
                                        Example Firm Panel ID
                                    </Label>
                                </FormGroup>
                            </Form>
                          </CardBody>
                        </Colxx>
                      </Row>
                    </TabPane>
                  </TabContent>
                </Card>

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

export default injectIntl(CommonPage);
