import { combineReducers } from "redux";
import settings from "./settings/reducer";
import menu from "./menu/reducer";
import authUser from "./auth/reducer";
import todoApp from "./todo/reducer";
import chatApp from "./chat/reducer";
import surveyListApp from "./surveyList/reducer";
import surveyDetailApp from "./surveyDetail/reducer";
import newsiteReducer from "./newsite/reducer";
import accuweatherReducer from "./accuweather/reducer";

const reducers = combineReducers({
    menu,
    settings,
    authUser,
    todoApp,
    chatApp,
    surveyListApp,
    surveyDetailApp,
    newsiteReducer,
    accuweatherReducer
});

export default reducers;
