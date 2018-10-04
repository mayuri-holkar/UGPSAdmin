import {
    GET_ALL_SECURITYMODULES,
    ON_SAVE_USERMODULE,
} from "constants/ActionTypes";

const INIT_STATE = {
    securityModuleList: [],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_SECURITYMODULES: {
            return {
                ...state,
                securityModuleList: action.payload
            }
        }

        case ON_SAVE_USERMODULE: {
            return { ...state }
        }

        default:
            return state;
    }
}