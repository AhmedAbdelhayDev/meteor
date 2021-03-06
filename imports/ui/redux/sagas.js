import { all } from "redux-saga/effects";
import authSagas from "./auth/saga";
import todoSagas from "./todo/saga";
import chatSagas from "./chat/saga";
import surveyListSagas from "./surveyList/saga";
import surveyDetailSagas from "./surveyDetail/saga";
import newsiteSagas from "./newsite/saga";
import accuWeatherSagas from "./accuweather/saga";
import azureSagas from "./azureblob/saga";

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        todoSagas(),
        chatSagas(),
        surveyListSagas(),
        surveyDetailSagas(),
        newsiteSagas(),
        accuWeatherSagas(),
        azureSagas()
    ]);
}
