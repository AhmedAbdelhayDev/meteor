import { AZURE_CREATE_BLOB, AZURE_CONTAINER_LIST } from "../actions";

export const createBlob = payload => ({
    type: AZURE_CREATE_BLOB,
    payload
});

export const getContainerList = () => (
    {
        type: AZURE_CONTAINER_LIST
    }
);
