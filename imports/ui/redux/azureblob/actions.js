import { AZURE_CREATE_BLOB } from "../actions";

export const createBlob = payload => ({
    type: AZURE_CREATE_BLOB,
    payload
});
