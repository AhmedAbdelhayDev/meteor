import { AZURE_CREATE_BLOB } from "../actions";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

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

export default function* rootSaga() {
    yield all([fork(watchCreateBlob)]);
}
