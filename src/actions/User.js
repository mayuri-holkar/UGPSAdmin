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
import { authHeader } from '../Headers/index';
import history from '../../src';

export const getAllUsers = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/users/", requestOptions)
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
                    type: GET_ALL_USERS,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};

export const searchUser = (dropDownValue, searchName) => {
    return function (dispatch, getState) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/users/" + dropDownValue + "/" + searchName, requestOptions)
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
                    type: SEARCH_USER,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
}

export const onOpenUserModal = () => {
    return {
        type: ON_OPEN_USER_MODAL,
        payload: ''
    }
};

export const onCloseUserModal = () => {
    return {
        type: ON_CLOSE_USER_MODAL,
        payload: ''
    }
};

export const onUpdatePassword = (users) => {
    const passwordData = new FormData();
    passwordData.append('UserId', users.UserId);
    passwordData.append('UserPassword', users.UserPassword);
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader() },
        body: passwordData
    };
    return function (dispatch) {
        fetch(nodeUrl + '/usersPassword/' + users.UserId, requestOptions)
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
                    type: ON_UPDATE_PASSWORD,
                    payload: json
                });
                dispatch(getAllUsers());
            })
            .catch((data) => console.log(data));
    }
}

export const onSaveUser = (users) => {
    const UserData = new FormData();
    UserData.append('UserId', users.UserId);
    UserData.append('FirstName', users.FirstName);
    UserData.append('LastName', users.LastName);
    UserData.append('UserEmailId', users.UserEmailId);
    UserData.append('UserPhone', users.UserPhone);
    UserData.append('UserPassword', users.UserPassword);
    UserData.append('IsSuperAdmin', users.IsSuperAdmin);
    UserData.append('IsActive', users.IsActive);

    if (users.UserId) {
        const requestOptions = {
            method: 'PUT',
            headers: { ...authHeader() },
            body: UserData
        };
        return function (dispatch) {
            fetch(nodeUrl + '/users/' + users.UserId, requestOptions)
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
                        type: ON_SAVE_USER,
                        payload: json
                    });
                    dispatch(getAllUsers());
                    let userId = JSON.parse(localStorage.getItem('UserId'))
                    if (userId == users.UserId) {
                        localStorage.setItem('UserFirstName', JSON.stringify(json.FirstName));
                        localStorage.setItem('UserLastName', JSON.stringify(json.LastName));
                    }
                })
                .catch((data) => console.log(data));
        }
    }
    else {
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader() },
            body: UserData
        };
        return function (dispatch) {
            fetch(nodeUrl + '/users/', requestOptions)
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
                        type: ON_SAVE_USER,
                        payload: json
                    });
                    dispatch(getAllUsers())
                })
                .catch((data) => console.log(data));
        }
    }
};

export const onSearchUser = (event) => {
    return {
        type: USER_SEARCH_VALUE,
        payload: event.target.value
    }
}

export const userToggleDropDown = () => {
    return {
        type: USER_TOGGLE_DROPDOWN,
        payload: ''
    };
}

export const userSelectDropDown = (event) => {
    return {
        type: USER_SELECT_DROPDOWN,
        payload: event.target.innerText
    };
}

export const userselectDropDownValue = (event) => {
    return {
        type: USER_SELECT_DROPDOWN_VALUE,
        payload: event.currentTarget.value
    }
}

export const clearUserInput = () => {
    return {
        type: USER_CLEAR_INPUT,
        payload: ''
    }
}

export const handleRequestUserClose = () => {
    return {
        type: HANDLE_REQUEST_USER_CLOSE,
        payload: ''
    };
};

export const onOpenUpdatePasswordModal = () => {
    return {
        type: ON_OPEN_UPDATE_PASSWORD_MODAL,
        payload: ''
    }
};

export const onCloseUpdatePasswordModal = () => {
    return {
        type: ON_CLOSE_UPDATE_PASSWORD_MODAL,
        payload: ''
    }
};
export const getAllSystemUsers = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/systemusers/", requestOptions)
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
                    type: GET_ALL_SYSTEMUSERS,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};