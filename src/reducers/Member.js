import {
    GET_ALL_MEMBERS,
    SEARCH_MEMBERS,
    MEMBER_TOGGLE_DROPDOWN,
    MEMBER_SELECT_DROP_DOWN,
    MEMBER_SELECT_DROP_DOWN_VALUE,
    MEMBER_CLEAR_INPUT,
    MEMBER_ON_SEARCH,
    ON_SAVE_MEMBER,
    HANDLE_REQUEST_MEMBER_CLOSE,
    ON_OPEN_FAMILY_MEMBER_MODAL,
    ON_CLOSE_FAMILY_MEMBER_MODAL,
    ON_SAVE_FAMILY_MEMBER,
    GET_FAMILY_MEMBERS_BY_ID,
    GET_MEMBER_BY_ID,
    GET_ALL_CITIES,
    GET_ALL_CITIZENSHIP,
    GET_ALL_NATIVES,
    GET_ALL_EDUCATION,
    GET_ALL_HEIGHTS
} from "constants/ActionTypes";

const INIT_STATE = {
    MemberList: [],
    AllmemberList: [],
    alertMessage: '',
    showMessage: false,
    memberid: '',
    addFamilyMemberState: false,
    showFamilyMessage: false,
    familyAlertMessage: '',
    FamilyMemberList: [],
    AllFamilyMemberList: [],
    getId: '',
    oldmember: '',
    dropDownValue: 'FullName',
    dropdownOpen: false,
    dropDownName: 'First Name',
    searchName: '',
    MemberName: '',
    cities: [],
    citizenships: [],
    natives: [],
    heights: [],
    education: [],
    SearchResult: ''
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_MEMBERS: {
            let SearchResult;
            if (action.payload == '') {
                SearchResult = 'No records found';
            }
            return { ...state, MemberList: action.payload, AllmemberList: action.payload, SearchResult: SearchResult }
        }
        case SEARCH_MEMBERS: {
            let members = [];
            let SearchResult;
            if (action.payload == 'No Record') {
                members = state.AllmemberList;
            }
            else if (action.payload == '') {
                members = '';
                SearchResult = 'No records found';
            }
            else {
                members = action.payload;
            }
            return { ...state, MemberList: members, SearchResult: SearchResult }
        }
        case ON_SAVE_MEMBER: {
            var msg = '';
            if (action.payload.Member_Id ) {
                msg = 'Member inserted successfully';
            }
            else {
                msg = 'Member updated successfully';
            }
            return {
                ...state,
                alertMessage: msg,
                showMessage: true,
                memberid: action.payload.Member_Id,
                MemberName: action.payload.MemberName
            }
        }
        case HANDLE_REQUEST_MEMBER_CLOSE: {
            return {
                ...state,
                showMessage: false,
                showFamilyMessage: false
            }
        }
        case ON_OPEN_FAMILY_MEMBER_MODAL: {
            return { ...state, addFamilyMemberState: true }
        }
        case ON_CLOSE_FAMILY_MEMBER_MODAL: {
            return { ...state, addFamilyMemberState: false }
        }
        case ON_SAVE_FAMILY_MEMBER: {
            var msg = '';
            if (action.payload == '') {
                msg = 'Family member inserted successfully';
            }
            if (action.payload) {
                msg = 'Family member updated successfully';
            }
            if (action.payload.errors) {
                msg = 'Error Occured'
            }
            return {
                ...state,
                familyAlertMessage: msg,
                showFamilyMessage: true,
            }
        }
        case GET_FAMILY_MEMBERS_BY_ID: {
            return { ...state, FamilyMemberList: action.payload, AllFamilyMemberList: action.payload }
        }
        case GET_MEMBER_BY_ID: {
            return {
                ...state,
                getId: action.payload.Member_Id,
                oldmember: action.payload.member[0],
                MemberName: action.payload.member[0].FullName
            }
        }
        case MEMBER_TOGGLE_DROPDOWN: {
            return {
                ...state,
                dropdownOpen: !state.dropdownOpen
            }
        }
        case MEMBER_SELECT_DROP_DOWN: {
            return {
                ...state,
                dropDownName: action.payload
            }
        }
        case MEMBER_SELECT_DROP_DOWN_VALUE: {
            return {
                ...state,
                dropDownValue: action.payload
            }
        }
        case MEMBER_CLEAR_INPUT: {
            return {
                ...state,
                dropDownName: 'First Name',
                dropDownValue: 'FullName',
                searchName: ''
            }
        }
        case MEMBER_ON_SEARCH: {
            return {
                ...state,
                searchName: action.payload,
            }
        }
        case GET_ALL_CITIES: {
            return { ...state, cities: action.payload } 
        }
        case GET_ALL_CITIZENSHIP: {
            return { ...state, citizenships: action.payload}
        }
        case GET_ALL_NATIVES: {
            return { ...state, natives: action.payload}
        }
        case GET_ALL_EDUCATION: {
            return { ...state, education: action.payload}
        }
        case GET_ALL_HEIGHTS: {
            return { ...state, heights: action.payload}
        }
        default:
            return state;
    }
}