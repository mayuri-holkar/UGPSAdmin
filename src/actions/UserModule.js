import {
    GET_ALL_SECURITYMODULES,
    ON_SAVE_USERMODULE
} from "constants/ActionTypes";
import { authHeader } from "Headers/index";
import history from "../index";

export const getAllSecurityModules = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/securityModules/", requestOptions)
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
                    type: GET_ALL_SECURITYMODULES,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};

export const onSaveUserModule = (userModule) => {
    const userModuleData = new FormData();
    userModuleData.append('SystemUserId', userModule.SystemUserId);
    userModuleData.append('SecurityModuleId', userModule.SecurityModuleId);
    userModuleData.append('IsActive', userModule.IsActive);

    if (userModule.UserModuleId != '') {
        return function (dispatch) {
            fetch(nodeUrl+'/userModules/' + userModule.UserModuleId, {
                method: 'PUT',
                headers: { ...authHeader() },
                body: userModuleData
            }).then(response => response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_USERMODULE,
                        payload: json
                    });
                    dispatch(getAllSecurityModules())
                }, err => {
                    console.log('Error occured while updating user module');
                });
        }
    }
    else {
        return function (dispatch) {
            fetch(nodeUrl+'/userModules', {
                method: 'POST',
                headers: { ...authHeader() },
                body: userModuleData
            }).then((Response) => Response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_USERMODULE,
                        payload: json
                    });
                    dispatch(getAllSecurityModules())
                }, err => {
                    console.log('Error occured while saving user module');
                });
        }
    }
};