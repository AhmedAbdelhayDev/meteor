import React, { Component, Fragment } from "react";
import { Row, Card, CardBody, CardTitle, Button } from "reactstrap";

import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx, Separator } from "../../../components/common/CustomBootstrap";
import Dropzone from "../../../containers/forms/Dropzone";

import Breadcrumb from "../../../containers/navs/Breadcrumb";

import Sites from "../../../../api/sites";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";

// import blobServiceClient from '../../../../api/azureblob';
import {getContainerList} from '../../../redux/azureblob/actions';

// import Azure from 'azure-storage';
// import { StorageError, ServiceResponse } from 'azure-storage';
// import { createBlobService, BlobService, createQueueService, QueueService } from 'azure-storage';


// import AzureStorage from 'azure-storage';

// import { BlobServiceClient } from '@azure/storage-blob';
// import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
// import { AZURE_ACCOUNT, AZURE_ACCOUNT_KEY } from '../../../constants/define';

class FileUploadPage extends Component {
    constructor(props) {
        super(props);
                
        //CREATE blobServiceClient
        // const sharedKeyCredential = new StorageSharedKeyCredential(
        //     AZURE_ACCOUNT,
        //     AZURE_ACCOUNT_KEY
        // );
        // const blobServiceClient = new BlobServiceClient(
        //     `https://${AZURE_ACCOUNT}.blob.core.windows.net`,
        //     sharedKeyCredential
        // );

        this.state = {
            pathname: null,
            siteData: null,
            uploadAvailable: false,
            clearAvailable: false
            // blobServiceClient
        };

        this.uploadfiles = this.uploadfiles.bind(this);
        this.clear = this.clear.bind(this);
        this.addedfile = this.addedfile.bind(this);
        this.reset = this.reset.bind(this);
        this.uploaded = this.uploaded.bind(this);

        // console.log("------------ 1 -----------");
        // debugger;

        // let blobService = AzureStorage.createBlobService();
        // console.log(blobService);

        // debugger;        
        // let blobService = azure.createBlobService();
        // blobService.createContainerIfNotExists('taskcontainer', 
        //     {
        //         publicAccessLevel: 'blob'
        //     }, function(error, result, response) {
        //         if (!error) {
        //             // if result = true, container was created.
        //             // if result = false, container already existed.
        //         }
        //     }
        // );

        // console.log("------------ 2 -----------");

        // this.props.getContainerList();
    }

    static getDerivedStateFromProps(props, state) {
        const pathname = props.location.pathname;
        const patharr = pathname.split("/");
        if (state.pathname !== pathname && patharr.length > 1) {
            const site_id = patharr[patharr.length - 1];
            let siteData = Sites.findOne({ site_id: site_id });

            return { siteData, pathname };
        }

        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if( prevState.pathname !== this.state.pathname ) {
            if( this.dropzone ) {
                this.dropzone.clear();
            }
        }
    }

    uploaded() {
        this.setState({
            uploadAvailable: false,
            clearAvailable: true
        })
    }

    addedfile() {
        this.setState({
            uploadAvailable: true,
            clearAvailable: true
        })
    }

    reset() {
        this.setState({
            uploadAvailable: false,
            clearAvailable: false
        })
    }

    uploadfiles(ev) {
        if( ev ) {
            const info = {
                region: this.state.siteData.abstract.region,
                site_id: this.state.siteData.site_id
            }
            
            this.dropzone.uploadfiles(info);
        }
    }

    clear(ev) {
        this.dropzone.clear();
    }

    render() {
        if( !this.state.siteData ) {
            return null;
        }

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
                                <Dropzone
                                    ref={node => (this.dropzone = node)}
                                    addedfile = {this.addedfile}
                                    reset = {this.reset}
                                    uploaded = {this.uploaded}
                                />
                                <div className="text-center mt-4">
                                    <Button color="primary" className="mr-4" onClick={this.uploadfiles} disabled={!this.state.uploadAvailable}>
                                        <IntlMessages id="file.uploadfiles" />
                                    </Button>

                                    <Button color="danger" onClick={this.clear} disabled={!this.state.clearAvailable}>
                                        <IntlMessages id="file.clear" />
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>
            </Fragment>
        );
    }
};

const mapStateToProps = ({ azureReducer }) => {
    return {
        azureState: azureReducer
    };
};

export default injectIntl(connect(mapStateToProps, {getContainerList})(FileUploadPage));