import { AZURE_CREATE_BLOB, AZURE_CONTAINER_LIST } from "../actions";

// const {
//     BlobServiceClient,
//     StorageSharedKeyCredential
// } = require("@azure/storage-blob");

// import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const INIT_STATE = {
    blobServiceClient: null
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case AZURE_CREATE_BLOB:
            break;

        case AZURE_CONTAINER_LIST:
            break;

        default:            
            // debugger;
            // if (state.blobServiceClient === null) {
            //     //CREATE blobServiceClient
            //     const sharedKeyCredential = new StorageSharedKeyCredential(
            //         AZURE_ACCOUNT,
            //         AZURE_ACCOUNT_KEY
            //     );
            //     const blobServiceClient = new BlobServiceClient(
            //         `https://${AZURE_ACCOUNT}.blob.core.windows.net`,
            //         sharedKeyCredential
            //     );

            //     return { ...state, blobServiceClient };
            // }


            return { ...state };
    }
};
