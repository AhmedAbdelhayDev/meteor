import { SITE_GET_DATA, SITE_GET_DATA_ERROR, SITE_GOT_DATA } from "../actions";
import { ESTATED_API_ADDRESS, ESTATED_TOKEN } from "../../constants/define";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

function* getSiteData(action) {
    try {
        const url =
            ESTATED_API_ADDRESS +
            "?token=" +
            ESTATED_TOKEN +
            "&street_address=" +
            action.payload.street_address +
            "&city=" +
            action.payload.city +
            "&state=" +
            action.payload.state +
            "&zip_code=" +
            action.payload.zip_code;

        const response = yield call(fetch, url);
        let payload = yield response.json();
        payload = { ...payload, abbr: action.payload };

        yield put({ type: SITE_GOT_DATA, payload });
    } catch (error) {
        yield put({ type: SITE_GET_DATA_ERROR, error });
    }
}

export function* watchGetSiteData() {
    yield takeEvery(SITE_GET_DATA, getSiteData);
}

export default function* rootSaga() {
    yield all([fork(watchGetSiteData)]);
}
