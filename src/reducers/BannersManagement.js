import {
    ON_SAVE_BANNER,
    GET_ALL_BANNER,
    BANNER_SEARCH_VALUE,
    BANNER_TOGGLE_DROPDOWN,
    BANNER_SELECT_DROPDOWN,
    BANNER_SELECT_DROPDOWN_VALUE,
    BANNER_CLEAR_INPUT,
    GET_BANNER_BY_ID,
    GET_BANNERPHOTOS_BYID,
    ON_DELETE_BANNERPHOTOS,
    CLOSE_BANNER_SNACKBAR,
    SEARCH_BANNER,
    ON_DELETE_BANNER
} from "constants/ActionTypes";

const INIT_STATE = {
    showMessage: false,
    alertMessage: '',
    BannerList: [],
    dropDownValue: 'Name',
    dropdownOpen: false,
    dropDownName: 'Name',
    searchName: '',
    bannerData: '',
    bannerPhotos: [],
    deleteAlertMessage: '',
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ON_SAVE_BANNER: {
            var msg = '';
            if (action.payload.BannerId) {
                msg = 'Banner updated successfully';
            }
            else {
                msg = 'Banner inserted successfully';
            }
            return {
                ...state,
                alertMessage: msg,
                showMessage: true,
            }
        }

        case GET_ALL_BANNER: {
            let searchResult;
            if (action.payload == '') {
                searchResult = 'No records found';
            }
            return { ...state, BannerList: action.payload, searchResult: searchResult }
        }

        case BANNER_SEARCH_VALUE: {
            return {
                ...state,
                searchName: action.payload,
            }
        }

        case BANNER_TOGGLE_DROPDOWN: {
            return {
                ...state,
                dropdownOpen: !state.dropdownOpen
            }
        }

        case BANNER_SELECT_DROPDOWN: {
            return {
                ...state,
                dropDownName: action.payload
            }
        }

        case BANNER_SELECT_DROPDOWN_VALUE: {
            return {
                ...state,
                dropDownValue: action.payload
            }
        }

        case BANNER_CLEAR_INPUT: {
            return {
                ...state,
                dropDownName: 'Name',
                dropDownValue: 'Name',
                searchName: ''
            }
        }

        case GET_BANNER_BY_ID: {
            return {
                ...state,
                bannerData: action.payload[0]
            }
        }

        case GET_BANNERPHOTOS_BYID: {
            return {
                ...state,
                bannerPhotos: action.payload
            }
        }

        case ON_DELETE_BANNERPHOTOS: {
            var msg = 'Photo deleted successfully';
            return {
                ...state,
                deleteAlertMessage: msg,
                showMessage: true,
            }
        }

        case CLOSE_BANNER_SNACKBAR: {
            return {
                ...state,
                showMessage: false
            }
        }

        case SEARCH_BANNER: {
            let banners = [];
            let SearchResult = '';
            if (action.payload == 'No Record') {
                banners = state.BannerList;
            }
            else if (action.payload == '') {
                banners = '';
                SearchResult = 'No records found';
            }
            else {
                banners = action.payload;
            }
            return { ...state, BannerList: banners, searchResult: SearchResult }
        }

        case ON_DELETE_BANNER: {
            return {
                ...state,
                alertMessage: 'Banner deleted successfully',
                showMessage: true,
            }
        }

        default:
            return state;
    }
};