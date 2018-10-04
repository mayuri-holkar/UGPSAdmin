import {
    GET_COMMITTEE_MEMBER,
    DISPLAY_COMMITTEE_MEMBER,
    SEARCH_COMMITTEE_MEMBER,
    ON_OPEN_COMMITTEE_MEMBER_MODAL,
    ON_CLOSE_COMMITTEE_MEMBER_MODAL,
    ON_SAVE_COMMITTEE_MEMBER,
    HANDLE_REQUEST_COMMITTEE_CLOSE,
    ON_DELETE_COMMITTEE_MEMBER,
    COMMITTEE_MEMBER_TOGGLE_DROPDOWN,
    COMMITTEE_MEMBER_SELECT_DROP_DOWN,
    COMMITTEE_MEMBER_SELECT_DROP_DOWN_VALUE,
    SEARCH,
    COMMITTEE_MEMBER_CLEAR_INPUT,
    COMMITTEE_MEMBER_CLEAR_ALL,
    ON_DELETE_MEMBER_COMMITTEEMEMBER_DELETE,
    GET_ALL_DESIGNATION
} from "constants/ActionTypes";

const INIT_STATE = {
    alertMessage: '',
    showMessage: false,
    memberList: [],
    designation:[],
    searchMember: '',
    allMemberList: [],
    searchResult: '',
    addCommitteeMemberState: false,
    dropdownOpen: false,
    dropDownName: 'Member Name',
    dropDownValue: 'CommitteeMemberData.FullName'
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_COMMITTEE_MEMBER: {
            let searchResult = ''
            if (action.payload == '') {
                searchResult = 'No records found';
            }
            return { ...state, memberList: action.payload, allMemberList: action.payload, searchResult: searchResult}
        }

        case GET_ALL_DESIGNATION: {
            return { ...state, designation: action.payload }
        }

        case DISPLAY_COMMITTEE_MEMBER: {
            return { ...state, searchMember: action.payload }
        }

        case SEARCH_COMMITTEE_MEMBER: {
            let data = [];
            let searchResult = '';
            if (action.payload == 'No Record') {
                data = state.allMemberList;
            }
            else if (action.payload == '') {
                data = '';
                searchResult = 'No records found';
            }
            else {
                data = action.payload;
            }
            return { ...state, memberList: data, searchResult: searchResult }
        }

        case ON_OPEN_COMMITTEE_MEMBER_MODAL: {
            return { ...state, addCommitteeMemberState: true }
        }

        case ON_CLOSE_COMMITTEE_MEMBER_MODAL: {
            return { ...state, addCommitteeMemberState: false }
        }

        case ON_SAVE_COMMITTEE_MEMBER: {
            var msg = '';
            if (action.payload == '') {
                msg = 'Committee member inserted successfully';
            }
            if (action.payload) {
                msg = 'Committee member updated successfully';
            }
            return {
                ...state,
                alertMessage: msg,
                showMessage: true,
                searchMember: ''
            }
        }

        case HANDLE_REQUEST_COMMITTEE_CLOSE: {
            return { ...state, showMessage: false }
        }

        case ON_DELETE_COMMITTEE_MEMBER: {
            return {
                ...state,
                alertMessage: 'Committee member deleted successfully',
                showMessage: true,
                searchMember: ''
            }
        }

        case ON_DELETE_MEMBER_COMMITTEEMEMBER_DELETE: {
            return {
                ...state,
                alertMessage: '',
                showMessage: false,
                searchMember: ''
            }
        }

        case COMMITTEE_MEMBER_TOGGLE_DROPDOWN: {
            return {
                ...state,
                dropdownOpen: !state.dropdownOpen
            }
        }

        case COMMITTEE_MEMBER_SELECT_DROP_DOWN: {
            return {
                ...state,
                dropDownName: action.payload
            }
        }

        case COMMITTEE_MEMBER_SELECT_DROP_DOWN_VALUE: {
            return {
                ...state,
                dropDownValue: action.payload
            }
        }

        case SEARCH: {
            let data = [];
            let searchResult = '';
            if (action.payload == '') {
                data = '';
                searchResult = 'No records found';
            }
            else {
                data = action.payload;
            }
            return { ...state, memberList: data, searchResult: searchResult }
        }

        case COMMITTEE_MEMBER_CLEAR_INPUT: {
            return { ...state, memberList: state.allMemberList, searchMember: '', searchResult: '', dropDownName: 'Member Name', dropDownValue: 'CommitteeMemberData.FullName' }
        }

        case COMMITTEE_MEMBER_CLEAR_ALL: {
            return { ...state, searchMember: '', searchResult: '', dropDownName: 'Member Name', dropDownValue: 'CommitteeMemberData.FullName' }
        }

        default:
            return state;

    }
}