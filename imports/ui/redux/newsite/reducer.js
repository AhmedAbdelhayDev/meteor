import { SITE_GET_DATA, SITE_GOT_DATA, SITE_GET_DATA_ERROR } from "../actions";
import Sites from "../../../api/sites";
import { ISLA_SITE_ID } from "../../constants/define";
import { generateUUID } from "../../constants/define";

const INIT_STATE = {
    loading: false,
    site_data: null,
    error: ""
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SITE_GET_DATA:
            return { ...state, loading: true };

        case SITE_GOT_DATA:
            let resp = action.payload;

            if (resp.data !== null) {
                const curDate = new Date();
                //data, metadata, warnings, createdAt, updatedAt
                resp = {
                    ...resp,
                    ISLA_SITE_ID: generateUUID(),
                    createdAt: curDate,
                    updatedAt: curDate
                };

                Sites.insert(resp);

                return { ...state, loading: false, error: "" }; //success
            }

        //continue to send error

        case SITE_GET_DATA_ERROR:
            return { ...state, loading: false, error: action.error };

        default:
            return { ...state };
    }
};
