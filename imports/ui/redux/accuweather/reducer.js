import {
    SITE_GET_WEATHER_LOCKEY,
    SITE_GOT_WEATHER,
    SITE_GET_WEATHER_ERROR_LOCKEY
} from "../actions";

const INIT_STATE = {
    loading: false,
    site_data: null,
    error: ""
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        //start loading
        case SITE_GET_WEATHER_LOCKEY:
            return { ...state, loading: true };

        case SITE_GOT_WEATHER:
            const weatherData = action.payload;

            return { ...state, loading: false, weatherData, error: null }; //success

        //continue to send error
        case SITE_GET_WEATHER_ERROR_LOCKEY:
            return { ...state, loading: false, error: action.error };

        default:
            return { ...state };
    }
};
