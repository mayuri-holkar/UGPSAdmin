import {
    GET_ALL_USERS,
    SEARCH_USER,
    USER_SEARCH_VALUE,
    USER_TOGGLE_DROPDOWN,
    USER_SELECT_DROPDOWN,
    USER_SELECT_DROPDOWN_VALUE,
    USER_CLEAR_INPUT,
    ON_SAVE_USER,
    ON_CLOSE_USER_MODAL,
    ON_OPEN_USER_MODAL,
    HANDLE_REQUEST_USER_CLOSE,
    ON_UPDATE_PASSWORD,
    ON_OPEN_UPDATE_PASSWORD_MODAL,
    ON_CLOSE_UPDATE_PASSWORD_MODAL,
    GET_ALL_SYSTEMUSERS
} from "constants/ActionTypes";

const INIT_STATE = {
    userList: [],
    allUserList: [],
    systemUserList:[],
    dropDownValue: 'FirstName',
    dropdownOpen: false,
    dropDownName: 'First Name',
    searchName: '',
    alertMessage: '',
    showMessage: false,
    addUserState: false,
    updateUserState: false,
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_ALL_USERS: {
            let SearchResult = ''
            if (action.payload == '') {
                SearchResult = 'No records found';
            }
            return { ...state, userList: action.payload, allUserList: action.payload, SearchResult: SearchResult }
        }

        case SEARCH_USER: {
            let users = [];
            let SearchResult = '';
            if (action.payload == 'No Record') {
                users = state.allUserList;
            }
            else if (action.payload == '') {
                users = '';
                SearchResult = 'No records found';
            }
            else {
                users = action.payload;
            }
            return { ...state, userList: users, SearchResult: SearchResult }
        }

        case USER_SEARCH_VALUE: {
            return {
                ...state,
                searchName: action.payload,
            }
        }

        case USER_TOGGLE_DROPDOWN: {
            return {
                ...state,
                dropdownOpen: !state.dropdownOpen
            }
        }

        case USER_SELECT_DROPDOWN: {
            return {
                ...state,
                dropDownName: action.payload
            }
        }

        case USER_SELECT_DROPDOWN_VALUE: {
            return {
                ...state,
                dropDownValue: action.payload
            }
        }

        case USER_CLEAR_INPUT: {
            return {
                ...state,
                dropDownName: 'First Name',
                dropDownValue: 'FirstName',
                searchName: ''
            }
        }

        case ON_OPEN_USER_MODAL: {
            return { ...state, addUserState: true}
        }

        case ON_CLOSE_USER_MODAL: {
            return { ...state, addUserState: false}
        }

        case ON_OPEN_UPDATE_PASSWORD_MODAL: {
            return { ...state, updateUserState: true } 
        }

        case ON_CLOSE_UPDATE_PASSWORD_MODAL: {
            return { ...state, updateUserState: false }
        }

        case ON_SAVE_USER: {
            var msg = '';
            if (action.payload == '') {
                msg = 'User inserted successfully';
            }
            if (action.payload) {
                msg = 'User updated successfully';
            }
            return {
                ...state,
                alertMessage: msg,
                showMessage: true,
                searchMember: ''
            }
        }

        case ON_UPDATE_PASSWORD: {
            var msg = '';
            if (action.payload) {
                msg = 'Password updated successfully';
            }
            return {
                ...state,
                alertMessage: msg,
                showMessage: true,
                searchMember: ''
            }
        }

        case HANDLE_REQUEST_USER_CLOSE: {
            return { ...state, showMessage: false }
        }

        case GET_ALL_SYSTEMUSERS: {
            return {
                ...state,
                systemUserList: action.payload
            }
        }
        default:
            return state;
    }
}

