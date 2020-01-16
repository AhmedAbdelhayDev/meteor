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

import "../../../assets/css/weather.css";
import { getSiteWeather } from "../../../redux/accuweather/actions";
import { ConvertEpochToDateFormat } from "../../../constants/define";
import { connect } from "react-redux";

//Offline Testing
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

//testing
import Sites from "../../../../api/sites";

//Offline Testing
const MapWithAMarker = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            <Marker position={{ lat: -34.397, lng: 150.644 }} />
        </GoogleMap>
    ))
);

class CommonPage extends Component {
    constructor(props) {
        super(props);
        this.toggleTab = this.toggleTab.bind(this);
        this.state = {
            activeFirstTab: "1"
        };

        // let data = Sites.find({}).fetch();
        this.siteData = Sites.findOne();
    }

    componentDidMount() {
        this.props.getSiteWeather({
            postal_code: this.siteData.abstract.zip_code
        });
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeFirstTab: tab
            });
        }
    }

    render() {
        if (this.siteData === null) {
            return <div>Please insert new site.</div>;
        }

        let weatherDateTime = "";
        let weatherTemperature = "";
        let weatherIconSrc = "";

        if (this.props.weatherData.data) {
            weatherIconSrc =
                "https://www.accuweather.com/images/weathericons/" +
                this.props.weatherData.data.WeatherIcon +
                ".svg";

            const dateTime = ConvertEpochToDateFormat(
                this.props.weatherData.data.EpochTime
            );
            weatherDateTime =
                dateTime.month +
                "/" +
                dateTime.day +
                " " +
                dateTime.ampmhours +
                ":" +
                dateTime.minutes +
                " " +
                dateTime.ampm;

            weatherTemperature = Math.round(
                this.props.weatherData.data.Temperature.Metric.Value
            );
        }

        const { messages } = this.props.intl;
        return (
            <Fragment>
                <Row>
                    <Colxx xxs="12">
                        <h1>California</h1>

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
                                            loadingElement={
                                                <div className="map-item" />
                                            }
                                            containerElement={
                                                <div className="map-item" />
                                            }
                                            mapElement={
                                                <div className="map-item" />
                                            }
                                        />
                                    </CardBody>
                                </Card>
                                <Card className="mb-4">
                                    <CardHeader>
                                        <Nav tabs className="card-header-tabs ">
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active:
                                                            this.state
                                                                .activeFirstTab ===
                                                            "1",
                                                        "nav-link": true
                                                    })}
                                                    onClick={() => {
                                                        this.toggleTab("1");
                                                    }}
                                                    to="#"
                                                    location={{}}
                                                >
                                                    <IntlMessages id="pages.general-title" />
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active:
                                                            this.state
                                                                .activeFirstTab ===
                                                            "2",
                                                        "nav-link": true
                                                    })}
                                                    onClick={() => {
                                                        this.toggleTab("2");
                                                    }}
                                                    to="#"
                                                    location={{}}
                                                >
                                                    <IntlMessages id="pages.property-title" />
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active:
                                                            this.state
                                                                .activeFirstTab ===
                                                            "3",
                                                        "nav-link": true
                                                    })}
                                                    onClick={() => {
                                                        this.toggleTab("3");
                                                    }}
                                                    to="#"
                                                    location={{}}
                                                >
                                                    <IntlMessages id="pages.structure-title" />
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active:
                                                            this.state
                                                                .activeFirstTab ===
                                                            "4",
                                                        "nav-link": true
                                                    })}
                                                    onClick={() => {
                                                        this.toggleTab("4");
                                                    }}
                                                    to="#"
                                                    location={{}}
                                                >
                                                    <IntlMessages id="pages.owner-title" />
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({
                                                        active:
                                                            this.state
                                                                .activeFirstTab ===
                                                            "5",
                                                        "nav-link": true
                                                    })}
                                                    onClick={() => {
                                                        this.toggleTab("5");
                                                    }}
                                                    to="#"
                                                    location={{}}
                                                >
                                                    <IntlMessages id="pages.tax-title" />
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </CardHeader>

                                    <TabContent
                                        activeTab={this.state.activeFirstTab}
                                    >
                                        <TabPane tabId="1">
                                            <Row>
                                                <Colxx sm="12">
                                                    <CardBody>
                                                        <Form>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="siteId"
                                                                    sm={2}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Site ID
                                                                </Label>
                                                                <Label
                                                                    id="siteId"
                                                                    sm={10}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .site_id
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="ownerName"
                                                                    sm={2}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Owner Name
                                                                </Label>
                                                                <Label
                                                                    id="ownerName"
                                                                    sm={10}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .abstract
                                                                            .owner_name
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="formattedStreetAddress"
                                                                    sm={2}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Formatted
                                                                    Street
                                                                    Address
                                                                </Label>
                                                                <Label
                                                                    id="formattedStreetAddress"
                                                                    sm={10}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .address
                                                                            .formatted_street_address
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="city"
                                                                    sm={2}
                                                                    className="font-weight-bold"
                                                                >
                                                                    City
                                                                </Label>
                                                                <Label
                                                                    id="city"
                                                                    sm={10}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .address
                                                                            .city
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={2}
                                                                    className="font-weight-bold"
                                                                >
                                                                    State
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={10}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .address
                                                                            .state
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="zipcode"
                                                                    sm={2}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Zip Code
                                                                </Label>
                                                                <Label
                                                                    id="zipcode"
                                                                    sm={10}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .address
                                                                            .zip_code
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="zip_plus_forcode"
                                                                    sm={2}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Zip plus for
                                                                    code
                                                                </Label>
                                                                <Label
                                                                    id="zip_plus_forcode"
                                                                    sm={10}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .address
                                                                            .zip_plus_four_code
                                                                    }
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
                                                                <Label
                                                                    for="apn_original"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The
                                                                    formatted
                                                                    assessor's
                                                                    parcel
                                                                    number
                                                                </Label>
                                                                <Label
                                                                    id="apn_original"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .apn_original
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="fips_code"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Unique
                                                                    County
                                                                    identifier
                                                                </Label>
                                                                <Label
                                                                    id="fips_code"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .fips_code
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="depth_ft"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Depth
                                                                    measurement
                                                                    of the
                                                                    parcel in
                                                                    feet
                                                                </Label>
                                                                <Label
                                                                    id="depth_ft"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .depth_ft
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="frontage_ft "
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Frontage
                                                                    measurement
                                                                    of the
                                                                    parcel in
                                                                    feet
                                                                </Label>
                                                                <Label
                                                                    id="frontage_ft "
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .frontage_ft
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="area_sq_ft"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Total area
                                                                    of the
                                                                    parcel in
                                                                    square feet
                                                                </Label>
                                                                <Label
                                                                    id="area_sq_ft"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .area_sq_ft
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="area_acres"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Total area
                                                                    of the
                                                                    parcel in
                                                                    acres
                                                                </Label>
                                                                <Label
                                                                    id="area_acres"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .area_acres
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="county_name"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The name of
                                                                    the county
                                                                </Label>
                                                                <Label
                                                                    id="county_name"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .county_name
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="county_land_use_code "
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The land use
                                                                    code
                                                                </Label>
                                                                <Label
                                                                    id="county_land_use_code "
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .county_land_use_code
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="county_land_use_description"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The land use
                                                                    description
                                                                </Label>
                                                                <Label
                                                                    id="county_land_use_description"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .county_land_use_description
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The general
                                                                    land use
                                                                    category
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .standardized_land_use_category
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The land use
                                                                    type
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .standardized_land_use_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    List
                                                                    describing
                                                                    the location
                                                                    and
                                                                    surrounding
                                                                    area
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .location_descriptions
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    City zoning
                                                                    designation
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .zoning
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Count of all
                                                                    buildings
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .building_count
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Parcel
                                                                    identifier
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .tax_account_number
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Legal
                                                                    description
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .legal_description
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Indicates
                                                                    properties
                                                                    with
                                                                    multiple or
                                                                    partial lots
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .lot_code
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Number(s)
                                                                    identifying
                                                                    individual
                                                                    lots
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .lot_number
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The name of
                                                                    the
                                                                    subdivision,
                                                                    plat, or
                                                                    tract
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .subdivision
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The
                                                                    jurisdictio
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .municipality
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Section
                                                                    township
                                                                    range
                                                                    meridian
                                                                    identifier
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .parcel
                                                                            .section_township_range
                                                                    }
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
                                                                <Label
                                                                    for="siteId"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The year the
                                                                    structure
                                                                    was built
                                                                </Label>
                                                                <Label
                                                                    id="siteId"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .year_built
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="ownerName"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The year a
                                                                    structure
                                                                    was
                                                                    substantially
                                                                    updated or
                                                                    improved
                                                                </Label>
                                                                <Label
                                                                    id="ownerName"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .effective_year_built
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="formattedStreetAddress"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The total
                                                                    number of
                                                                    rooms
                                                                </Label>
                                                                <Label
                                                                    id="formattedStreetAddress"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .rooms_count
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="city"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The number
                                                                    of bedroom
                                                                </Label>
                                                                <Label
                                                                    id="city"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .beds_count
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The total
                                                                    number of
                                                                    bathrooms
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .baths
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="zipcode"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The number
                                                                    of partial
                                                                    bathrooms
                                                                </Label>
                                                                <Label
                                                                    id="zipcode"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .partial_baths_count
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Total number
                                                                    of units
                                                                    reported to
                                                                    the county
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .units_count
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The type of
                                                                    parking
                                                                    available
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .parking_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The total
                                                                    number of
                                                                    available
                                                                    parking
                                                                    spaces
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .parking_spaces_count
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Type of pool
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .pool_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Style or
                                                                    historical
                                                                    period
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .architecture_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Type of
                                                                    material
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .construction_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Material
                                                                    used for the
                                                                    exterior
                                                                    walls
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .exterior_wall_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The type of
                                                                    material
                                                                    used in the
                                                                    foundation
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .foundation_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The material
                                                                    used for the
                                                                    roof
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .roof_material_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The
                                                                    architectural
                                                                    style for
                                                                    the roof
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .roof_style_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Primary
                                                                    heating type
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .heating_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Type of fuel
                                                                    used to heat
                                                                    the building
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .heating_fuel_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Air
                                                                    conditioning
                                                                    type
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .air_conditioning_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Total number
                                                                    of
                                                                    fireplaces
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .fireplaces
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Basement
                                                                    type
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .basement_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The quality
                                                                    of the
                                                                    structure
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .quality
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Current
                                                                    condition of
                                                                    the
                                                                    structure
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .condition
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Type of
                                                                    flooring
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .flooring_types
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Total number
                                                                    of all
                                                                    plumbing
                                                                    fixtures
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .plumbing_fixtures_count
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The type of
                                                                    material
                                                                    used for the
                                                                    interior
                                                                    walls.
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .interior_wall_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The water
                                                                    system
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .water_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    The waste
                                                                    disposal/sewage
                                                                    system
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .sewer_type
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    Total square
                                                                    footage
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .total_area_sq_ft
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    List of
                                                                    other rooms
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .other_rooms
                                                                    }
                                                                </Label>
                                                            </FormGroup>
                                                            <FormGroup row>
                                                                <Label
                                                                    for="state"
                                                                    sm={4}
                                                                    className="font-weight-bold"
                                                                >
                                                                    List of
                                                                    amenities
                                                                </Label>
                                                                <Label
                                                                    id="state"
                                                                    sm={8}
                                                                >
                                                                    {
                                                                        this
                                                                            .siteData
                                                                            .data
                                                                            .structure
                                                                            .amenities
                                                                    }
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
                                                        <Form>
                                                            {Object.entries(
                                                                this.siteData
                                                                    .data.owner
                                                            ).map(
                                                                ([
                                                                    key,
                                                                    value
                                                                ]) => {
                                                                    return (
                                                                        <FormGroup
                                                                            key={
                                                                                key
                                                                            }
                                                                            row
                                                                        >
                                                                            <Label
                                                                                for="siteId"
                                                                                sm={
                                                                                    4
                                                                                }
                                                                                className="font-weight-bold"
                                                                            >
                                                                                {
                                                                                    messages[
                                                                                        "site.data.owner." +
                                                                                            key
                                                                                    ]
                                                                                }
                                                                            </Label>
                                                                            <Label
                                                                                id="siteId"
                                                                                sm={
                                                                                    8
                                                                                }
                                                                            >
                                                                                {
                                                                                    value
                                                                                }
                                                                            </Label>
                                                                        </FormGroup>
                                                                    );
                                                                }
                                                            )}
                                                        </Form>
                                                    </CardBody>
                                                </Colxx>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="5">
                                            <Row>
                                                <Colxx sm="12">
                                                    <CardBody>
                                                        <Form>
                                                            {this.siteData.data.taxes.map(
                                                                item => {
                                                                    return Object.entries(
                                                                        item
                                                                    ).map(
                                                                        ([
                                                                            key,
                                                                            value
                                                                        ]) => {
                                                                            return (
                                                                                <FormGroup
                                                                                    key={
                                                                                        key
                                                                                    }
                                                                                    row
                                                                                >
                                                                                    <Label
                                                                                        for="siteId"
                                                                                        sm={
                                                                                            4
                                                                                        }
                                                                                        className="font-weight-bold"
                                                                                    >
                                                                                        {
                                                                                            messages[
                                                                                                "site.data.taxes." +
                                                                                                    key
                                                                                            ]
                                                                                        }
                                                                                    </Label>
                                                                                    <Label
                                                                                        id="siteId"
                                                                                        sm={
                                                                                            8
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            value
                                                                                        }
                                                                                    </Label>
                                                                                </FormGroup>
                                                                            );
                                                                        }
                                                                    );
                                                                }
                                                            )}
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
                                        {this.props.weatherData.data && (
                                            <div className="conditions-card card panel conditions-card">
                                                <p className="module-header title">
                                                    Current Weather
                                                    <span className="temp-unit">
                                                        °C
                                                    </span>
                                                </p>
                                                <p className="module-header sub date">
                                                    {weatherDateTime}
                                                </p>
                                                <div className="temp-icon-wrapper">
                                                    <img
                                                        className="weather-icon icon"
                                                        data-src={
                                                            weatherIconSrc
                                                        }
                                                        width="128px"
                                                        height="128px"
                                                        data-eager=""
                                                        src={weatherIconSrc}
                                                    />

                                                    <div className="temperatures">
                                                        <p className="value mb-5">
                                                            {weatherTemperature}
                                                            °
                                                            <span className="hi-lo-label"></span>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="phrase">
                                                    {
                                                        this.props.weatherData
                                                            .data.WeatherText
                                                    }
                                                </div>
                                            </div>
                                        )}
                                        <p className="text-muted text-small mb-2">
                                            {messages["forms.tags"]}
                                        </p>
                                        <p className="mb-3">
                                            <Badge
                                                color="outline-secondary"
                                                className="mb-1 mr-1"
                                                pill
                                            >
                                                FRONTEND
                                            </Badge>
                                            <Badge
                                                color="outline-secondary"
                                                className="mb-1 mr-1"
                                                pill
                                            >
                                                JAVASCRIPT
                                            </Badge>
                                            <Badge
                                                color="outline-secondary"
                                                className="mb-1 mr-1"
                                                pill
                                            >
                                                SECURITY
                                            </Badge>
                                            <Badge
                                                color="outline-secondary"
                                                className="mb-1 mr-1"
                                                pill
                                            >
                                                DESIGN
                                            </Badge>
                                        </p>
                                        <TagsInputExample />
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

const mapStateToProps = ({ accuweatherReducer }) => {
    return {
        weatherData: accuweatherReducer
    };
};

export default injectIntl(
    connect(mapStateToProps, {
        getSiteWeather
    })(CommonPage)
);
