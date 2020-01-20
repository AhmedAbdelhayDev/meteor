import { AZURE_CREATE_BLOB, AZURE_CONTAINER_LIST } from "../actions";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

// import blobServiceClient from "../../../api/azureblob";

function* createBlob(action) {
    // try {
    //     const url =
    //         ESTATED_API_ADDRESS +
    //         "?token=" +
    //         ESTATED_TOKEN +
    //         "&street_address=" +
    //         action.payload.street_address +
    //         "&city=" +
    //         action.payload.city +
    //         "&state=" +
    //         action.payload.state +
    //         "&zip_code=" +
    //         action.payload.zip_code;
    //     const response = yield call(fetch, url);
    //     let payload = yield response.json();
    //     payload = { ...payload, abstract: action.payload };
    //     yield put({ type: SITE_GOT_DATA, payload });
    // } catch (error) {
    //     yield put({ type: SITE_GET_DATA_ERROR, error });
    // }
}

export function* watchCreateBlob() {
    yield takeEvery(AZURE_CREATE_BLOB, createBlob);
}

// const getContainerListAsync = async (email, password) =>
//     await blobServiceClient.listContainers()

function* getContainerList(action) {    
    console.log("------   container list start ------ \n");
    debugger;

    try {
        // const containerList = yield call(getContainerListAsync);

        containerList.forEach(function(container) {
            console.log(`Container ${i++}: ${container.name}`);    
        }, this);

        // for await (const container of blobServiceClient.listContainers()) {
        //     console.log(`Container ${i++}: ${container.name}`);
        // }

        console.log("------   container list end ------ \n");
        
    } catch (error) {
        console.log(error);
    }
}


export function* watchGetContainerList() {
    yield takeEvery(AZURE_CONTAINER_LIST, getContainerList);
}

export default function* rootSaga() {
    yield all([fork(watchCreateBlob), fork(watchGetContainerList)]);
}
