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
} from "reactstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import { Separator, Colxx } from "../../../components/common/CustomBootstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import { injectIntl } from "react-intl";

import { FileListTableWithPaginationCard } from "../../../containers/ui/FileListTableCards";

import files from "../../../data/files";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";


import axios from "axios";

import { servicePath, themeRadiusStorageKey } from "../../../constants/defaultValues";

import DataListView from "../../../containers/pages/DataListView";
import Pagination from "../../../containers/pages/Pagination";
import ContextMenuContainer from "../../../containers/pages/ContextMenuContainer";

import {GetStandardDate} from '../../../constants/define';
import { withTracker } from 'meteor/react-meteor-data';
import Sites from "/imports/api/sites";
import Blobs from "/imports/api/blobs";

import filesize from 'filesize';

function collect(props) {
  return { data: props.data };
}
const apiUrl = servicePath + "/cakes/paging";

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

    this.state = {
      selectedPageSize: 10,      
      pageSizes: [10, 20, 30, 50, 100],
      dropdownSplitOpen: false,
      modalOpen: false,
      currentPage: 1,
      totalItemCount: 0,
      totalPage: 1,
      search: "",
      selectedItems: [],
      lastChecked: null,
      isLoading: false,
      siteCount: 0,
      files: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if(props.siteCount !== state.siteCount ) {
      return {siteCount: props.siteCount}
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if( prevState.siteCount !== this.state.siteCount ) {
      this.dataListRender();
    }
  }

  componentDidMount() {
    this.dataListRender();
  }

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };
  
  changePageSize = size => {
    this.setState(
      {
        selectedPageSize: size,
        currentPage: 1
      },
      () => this.dataListRender()
    );
  };
  onChangePage = page => {
    this.setState(
      {
        currentPage: page
      },
      () => this.dataListRender()
    );
  };

  onSearchKey = e => {
    if (e.key === "Enter") {
      this.setState(
        {
          search: e.target.value.toLowerCase()
        },
        () => this.dataListRender()
      );
    }
  };

  onCheckItem = (event, id) => {
    if (
      event.target.tagName === "A" ||
      (event.target.parentElement && event.target.parentElement.tagName === "A")
    ) {
      return true;
    }
    if (this.state.lastChecked === null) {
      this.setState({
        lastChecked: id
      });
    }

    let selectedItems = this.state.selectedItems;
    if (selectedItems.includes(id)) {
      selectedItems = selectedItems.filter(x => x !== id);
    } else {
      selectedItems.pop();
      selectedItems.push(id);
    }
    this.setState({
      selectedItems
    });

    if( selectedItems.length === 1 ) {
      const selectedSiteID = selectedItems[0];

      const blobs = Blobs.find(
          {site_id: selectedSiteID},
          {
              fields: {              
                  file_name: 1,
                  file_size: 1,
                  user_name: 1,
                  uploaded_date: 1,
                  site_id: 1,
                  _id: 1
              }
          },
          {
              sort: {
                  uploaded_date: -1
              }
          }
        ).fetch();

          debugger;

        let files = [];
        blobs.map(blob => {
          files = files.concat({
            id: blob._id,
            name: blob.file_name,
            owner: blob.user_name,
            size: filesize(blob.file_size),
            date: GetStandardDate(blob.uploaded_date),
            comments: blob.comments ? blob.comments : ""
          });
        });

        this.setState({
          files
        });
    }



    /** multi select */
    // if (event.shiftKey) {
    //   var items = this.state.items;
    //   var start = this.getIndex(id, items, "id");
    //   var end = this.getIndex(this.state.lastChecked, items, "id");
    //   items = items.slice(Math.min(start, end), Math.max(start, end) + 1);
    //   selectedItems.pop();
    //   selectedItems.push(
    //     ...items.map(item => {
    //       return item.id;
    //     })
    //   );
    //   selectedItems = Array.from(new Set(selectedItems));
    //   this.setState({
    //     selectedItems
    //   });
    // }
    document.activeElement.blur();
  };

  getIndex(value, arr, prop) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][prop] === value) {
        return i;
      }
    }
    return -1;
  }
  
  dataListRender() {
    const {
      selectedPageSize,
      currentPage,
      search
    } = this.state;
    // axios
    //   .get(
    //     `${apiUrl}?pageSize=${selectedPageSize}&currentPage=${currentPage}&orderBy=${
    //       selectedOrderOption.column
    //     }&search=${search}`
    //   )
    //   .then(res => {
    //     return res.data;
    //   })
    //   .then(data => {
    //     this.setState({
    //       totalPage: data.totalPage,
    //       items: data.data,
    //       selectedItems: [],
    //       totalItemCount: data.totalItem,
    //       isLoading: true
    //     });
    //   });

    const sites = Sites.find(
      {},
      {
          fields: {              
              "abstract.region": 1,
              "abstract.state": 1,
              "abstract.city": 1,
              "abstract.site_name": 1,
              updated_at: 1,
              site_id: 1
          }
      },
      {
          sort: {
              "updated_at": -1
          }
      },
      {
          skip: selectedPageSize * (currentPage - 1),
          limit: selectedPageSize
      }
    ).fetch();

    const totalPage = Math.ceil(this.props.siteCount / selectedPageSize)

    let data = {
      status: true,
      totalItem: this.props.siteCount,
      totalPage: totalPage,
      pageSize: selectedPageSize,
      currentPage: currentPage
    }

    let innerData = [];
    sites.map(site => {
      innerData = innerData.concat({
        id: site.site_id,
        title: site.abstract.site_name,
        // img: "/assets/img/02.jpg",
        category: `${site.abstract.region}, ${site.abstract.state}, ${site.abstract.city}`,
        // status: "PROCESSED",
        // statusColor: "secondary",
        // description: "Site description",
        // sales: 574
        // stock: 16
        date: GetStandardDate(site.updated_at)
      });
    });

    data = {...data, data: innerData};

    this.setState({
      totalPage: data.totalPage,
      items: data.data,
      selectedItems: [],
      totalItemCount: data.totalItem,
      isLoading: true
    });
  }

  onContextMenuClick = (e, data, target) => {
    console.log(
      "onContextMenuClick - selected items",
      this.state.selectedItems
    );
    console.log("onContextMenuClick - action : ", data.action);
  };

  onContextMenu = (e, data) => {
    const clickedProductId = data.data;
    if (!this.state.selectedItems.includes(clickedProductId)) {
      this.setState({
        selectedItems: [clickedProductId]
      });
    }

    return true;
  };

  render() {
    
    return !this.state.isLoading ? (
      <div className="loading" />
    ) : (
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
                <FileListTableWithPaginationCard data={this.state.files}/>
              </Colxx>

              <Colxx xxs="12" xl="4" className="col-right">
                <Fragment>
                  <div className="disable-text-selection">
                    <Row>
                      <Colxx xxs="12">
                        <div className="mb-2">
                          <h5>
                            <IntlMessages id="fileviewer.sitelist" />
                          </h5>
                        </div>
                      </Colxx>
                    </Row>
                    <Row>
                      {this.state.items.map(product => {
                        return (
                          <DataListView
                            key={product.id}
                            product={product}
                            isSelect={this.state.selectedItems.includes(product.id)}
                            onCheckItem={this.onCheckItem}
                            collect={collect}
                          />
                        );
                      })}{" "}
                      <Pagination
                        currentPage={this.state.currentPage}
                        totalPage={this.state.totalPage}
                        onChangePage={i => this.onChangePage(i)}
                      />
                      <ContextMenuContainer
                        onContextMenuClick={this.onContextMenuClick}
                        onContextMenu={this.onContextMenu}
                      />
                    </Row>
                  </div>
                </Fragment>
              </Colxx>
            </Row>
          </Colxx>
        </Row>
      </Fragment>
    );
  }
}

let trackedFileViewerPage = withTracker(() => {
  return {
    siteCount: Sites.find().count()
    // siteCount: Sites.find(
    //   {},
    //   {
    //       fields: {              
    //           "abstract.region": 1,
    //           "abstract.state": 1,
    //           "abstract.city": 1,
    //           "abstract.site_name": 1,
    //           site_id: 1
    //       }
    //   },
    //   {
    //       sort: {
    //           "updated_at": -1
    //       }
    //   }
    // ).count()
  };
})(FileViewerPage);

export default injectIntl(trackedFileViewerPage);
