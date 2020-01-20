import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

import { AZURE_ACCOUNT, AZURE_ACCOUNT_KEY } from "../ui/constants/define";

//CREATE blobServiceClient
const sharedKeyCredential = new StorageSharedKeyCredential(
    AZURE_ACCOUNT,
    AZURE_ACCOUNT_KEY
);

export default blobServiceClient = new BlobServiceClient(
    "https://" + AZURE_ACCOUNT + ".blob.core.windows.net",
    sharedKeyCredential
);