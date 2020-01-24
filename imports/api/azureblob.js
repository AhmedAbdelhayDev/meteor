export const azureStorage = require('azure-storage');

import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import { AZURE_ACCOUNT, AZURE_ACCOUNT_KEY } from "../ui/constants/define";

export const blobService = azureStorage.createBlobService(AZURE_ACCOUNT,AZURE_ACCOUNT_KEY);

//CREATE blobServiceClient
const sharedKeyCredential = new StorageSharedKeyCredential(
    AZURE_ACCOUNT,
    AZURE_ACCOUNT_KEY
);

export const blobServiceClient = new BlobServiceClient(
    "https://" + AZURE_ACCOUNT + ".blob.core.windows.net",
    sharedKeyCredential
);