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
import { authHeader } from '../Headers/index';
import history from '../../src';

export const getCommitteeMember = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/committee/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                for (var i = 0; i < json.length; i++) {
                    if (json[i].CommitteeMemberData == '') {
                        dispatch(onMemberDeleteCommitteemember(json[i]))
                    }
                }
                dispatch({
                    type: GET_COMMITTEE_MEMBER,
                    payload: json
                })
            })
            .catch((data) => console.log(data));
    }
};

export const getAllDesignation = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/Designation/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                
                dispatch({
                    type: GET_ALL_DESIGNATION,
                    payload: json
                })
            })
            .catch((data) => console.log(data));
    }
};

export const displayCommitteeMember = (committeemember) => {
    return {
        type: DISPLAY_COMMITTEE_MEMBER,
        payload: committeemember
    };
};

export const onOpenCommitteeMemberModal = () => {
    return {
        type: ON_OPEN_COMMITTEE_MEMBER_MODAL,
        payload: ''
    }
};

export const onCloseCommitteeMemberModal = () => {
    return {
        type: ON_CLOSE_COMMITTEE_MEMBER_MODAL,
        payload: ''
    }
};

export const onSaveCommitteeMember = (committeeMember) => {
    const committeeMemberData = new FormData();
    committeeMemberData.append('CommitteeMemberId', committeeMember.CommitteeMemberId);
    committeeMemberData.append('MemberId', committeeMember.MemberId);
    committeeMemberData.append('CommitteeMemberDesignation', committeeMember.CommitteeMemberDesignation);

    if (committeeMember.CommitteeMemberId) {
        const requestOptions = {
            method: 'PUT',
            headers: { ...authHeader() },
            body: committeeMemberData
        };
        return function (dispatch) {
            fetch(nodeUrl + '/committee/' + committeeMember.CommitteeMemberId, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        history.push('/login');
                    }
                    else
                        return response;
                })
                .then((response) => response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_COMMITTEE_MEMBER,
                        payload: json
                    });
                    dispatch(getCommitteeMember());
                })
                .catch((data) => console.log(data));
        }
    }
    else {
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader() },
            body: committeeMemberData
        };
        return function (dispatch) {
            fetch(nodeUrl + '/committee/', requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        history.push('/login');
                    }
                    else
                        return response;
                })
                .then((response) => response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_COMMITTEE_MEMBER,
                        payload: json
                    });
                    dispatch(getCommitteeMember())
                })
                .catch((data) => console.log(data));
        }
    }
};

export const handleRequestCommitteeClose = () => {
    return {
        type: HANDLE_REQUEST_COMMITTEE_CLOSE,
        payload: ''
    };
};

export const onDeleteCommitteeMember = (committeeMember) => {
    return function (dispatch) {
        const requestOptions = {
            method: 'DELETE',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/committee/" + committeeMember.CommitteeMemberId, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                dispatch({
                    type: ON_DELETE_COMMITTEE_MEMBER,
                    payload: ''
                });
                dispatch(getCommitteeMember())
            })
            .catch((data) => console.log(data));
    }
}

export const onMemberDeleteCommitteemember = (committeeMember) => {
    return function (dispatch) {
        const requestOptions = {
            method: 'DELETE',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/committee/" + committeeMember.CommitteeMemberId, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                dispatch({
                    type: ON_DELETE_MEMBER_COMMITTEEMEMBER_DELETE,
                    payload: ''
                });
                dispatch(getCommitteeMember())
            })
            .catch((data) => console.log(data));
    }
}


export const committeeMemberToggleDropDown = () => {
    return {
        type: COMMITTEE_MEMBER_TOGGLE_DROPDOWN,
        payload: ''
    };
}

export const committeeMemberSelectDropDown = (event) => {
    return {
        type: COMMITTEE_MEMBER_SELECT_DROP_DOWN,
        payload: event.target.innerText
    };
}

export const committeeMemberSelectDropDownValue = (event) => {
    return {
        type: COMMITTEE_MEMBER_SELECT_DROP_DOWN_VALUE,
        payload: event.target.value
    }
}

export const search = () => {
    return function (dispatch, getState) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        const fieldName = getState().CommitteeMember.dropDownValue;
        const searchValue = getState().CommitteeMember.searchMember;
        fetch(nodeUrl + "/committeeMemberSearch/" + fieldName + "/" + searchValue, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then(json => {
                dispatch({
                    type: SEARCH_COMMITTEE_MEMBER,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
}

export const committeeMemberClearInput = () => {
    return {
        type: COMMITTEE_MEMBER_CLEAR_INPUT,
        payload: ''
    };
}

export const committeeMemberClearAll = () => {
    return {
        type: COMMITTEE_MEMBER_CLEAR_ALL,
        payload: ''
    };
}