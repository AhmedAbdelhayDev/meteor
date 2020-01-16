import {
    SITE_GET_WEATHER_LOCKEY,
    SITE_GOT_WEATHER_LOCKEY,
    SITE_GET_WEATHER_ERROR_LOCKEY,
    SITE_GOT_WEATHER
} from "../actions";
import {
    ACCUWEATHER_LOCATION_KEY_API_ADDRESS,
    ACCUWEATHER_CURRENT_API_ADDRESS,
    ACCUWEATHER_API_KEY
} from "../../constants/define";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";

function* getSiteWeatherLocationKey(action) {
    try {
        debugger;
        const url =
            ACCUWEATHER_LOCATION_KEY_API_ADDRESS +
            "?q=" +
            action.payload.postal_code +
            "&apikey=" +
            ACCUWEATHER_API_KEY;

        const response = yield call(fetch, url);
        const payload = yield response.json();

        //call current conditions api again.
        const locKey = payload[0].Key;
        const urlCurrent =
            ACCUWEATHER_CURRENT_API_ADDRESS +
            locKey +
            "?apikey=" +
            ACCUWEATHER_API_KEY;

        const responseCurrent = yield call(fetch, urlCurrent);
        const jsonData = yield responseCurrent.json();
        const weatherData = jsonData[0];

        yield put({ type: SITE_GOT_WEATHER, payload: weatherData });
    } catch (error) {
        yield put({ type: SITE_GET_WEATHER_ERROR_LOCKEY, error });
    }
}

export function* watchGetSiteWeatherLocationKey() {
    yield takeEvery(SITE_GET_WEATHER_LOCKEY, getSiteWeatherLocationKey);
}

export default function* rootSaga() {
    yield all([fork(watchGetSiteWeatherLocationKey)]);
}
