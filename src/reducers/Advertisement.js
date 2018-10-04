import {
    ON_SAVE_ADVERTISEMENT,
    CLOSE_SNACKBAR,
    GET_ALL_ADVERTISEMENTS,
    SEARCH_ADVERTISEMENTS,
    ADVERTISEMENT_TOGGLE_DROPDOWN,
    ADVERTISEMENT_SELECT_DROPDOWN,
    ADVERTISEMENT_SELECT_DROPDOWN_VALUE,
    ADVERTISEMENT_SEARCH_VALUE,
    ADVERTISEMENT_CLEAR_INPUT,
    GET_ADVERTISEMENT_BYID,
    GET_ALL_ADVERTISEMENTTYPES,
    GET_ALL_ADVERTISEMENTLOCATIONS,
    GET_ADVERTISEMENTPHOTOS_BYID,
    ON_DELETE_ADVERTISEMENTPHOTOS
} from "constants/ActionTypes";

const INIT_STATE = {
    showMessage: false,
    alertMessage: '',
    advertisementList: [],
    dropDownValue: 'Name',
    dropdownOpen: false,
    dropDownName: 'Name',
    searchName: '',
    advertisementObj: '',
    searchResult: '',
    advertisementTypes: [],
    advertisementLocations: [],
    advertisementPhotos: [],
    deleteAlertMessage: '',
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ON_SAVE_ADVERTISEMENT: {
            var msg = '';
            if (action.payload.AdvertisementId) {
                msg = 'Advertisement updated successfully';
            }
            else {
                msg = 'Advertisement inserted successfully';
            }
            return {
                ...state,
                alertMessage: msg,
                showMessage: true,
            }
        }

        case CLOSE_SNACKBAR: {
            return {
                ...state,
                showMessage: false
            }
        }

        case GET_ALL_ADVERTISEMENTS: {
            let searchResult;
            if (action.payload == '') {
                searchResult = 'No records found';
            }
            return { ...state, advertisementList: action.payload, searchResult: searchResult}
        }

        case SEARCH_ADVERTISEMENTS: {
            let advertisements = [];
            let SearchResult = '';
            if (action.payload == 'No Record') {
                advertisements = state.advertisementList;
            }
            else if (action.payload == '') {
                advertisements = '';
                SearchResult = 'No records found';
            }
            else {
                advertisements = action.payload;
            }
            return { ...state, advertisementList: advertisements, searchResult: SearchResult }
        }

        case ADVERTISEMENT_SEARCH_VALUE: {
            return {
                ...state,
                searchName: action.payload,
            }
        }

        case ADVERTISEMENT_TOGGLE_DROPDOWN: {
            return {
                ...state,
                dropdownOpen: !state.dropdownOpen
            }
        }

        case ADVERTISEMENT_SELECT_DROPDOWN: {
            return {
                ...state,
                dropDownName: action.payload
            }
        }

        case ADVERTISEMENT_SELECT_DROPDOWN_VALUE: {
            return {
                ...state,
                dropDownValue: action.payload
            }
        }

        case ADVERTISEMENT_CLEAR_INPUT: {
            return {
                ...state,
                dropDownName: 'Name',
                dropDownValue: 'Name',
                searchName: ''
            }
        }

        case GET_ADVERTISEMENT_BYID: {
            return {
                ...state,
                advertisementObj: action.payload[0]
            }
        }

        case GET_ALL_ADVERTISEMENTTYPES: {
            let searchResult;
            if (action.payload == '') {
                searchResult = 'No records found';
            }
            return { ...state, advertisementTypes: action.payload, searchResult: searchResult }
        }
            
        case GET_ALL_ADVERTISEMENTLOCATIONS: {
            let searchResult;
            if (action.payload == '') {
                searchResult = 'No records found';
            }
            return { ...state, advertisementLocations: action.payload, searchResult: searchResult }
        }

        case GET_ADVERTISEMENTPHOTOS_BYID: {
            return {
                ...state,
                advertisementPhotos: action.payload
            }
        }

        case ON_DELETE_ADVERTISEMENTPHOTOS: {
            var msg = 'Photo deleted successfully';
            return {
                ...state,
                deleteAlertMessage: msg,
                showMessage: true,
            }
        }

        default:
            return state;
    }
}