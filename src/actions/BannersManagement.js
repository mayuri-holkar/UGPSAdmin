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
import { authHeader } from "Headers/index";
import history from '../index';

export const getAllBanners = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/banner/", requestOptions)
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
                    type: GET_ALL_BANNER,
                    payload: json
                });
            })
            .catch((json) => console.log(json));
    }
};

export const onSaveBanner = (newBanner) => {
    const Data = new FormData();
    Data.append('Name', newBanner.Name);
    Data.append('IsActive', newBanner.IsActive);
    var noOfFiles = newBanner.FileName != undefined ? newBanner.FileName.length : 0;
    Data.append('NoOfFiles', noOfFiles);
    var imageArray = [];
    imageArray = newBanner.imageFile;
    for (let i = 0; i < noOfFiles; i++) {
        Data.append('imageFile', newBanner.imageFile[i]);
        Data.append('FileName', newBanner.FileName[i]);
    }
    if (newBanner.BannerId != '') {
        return function (dispatch) {
            fetch(nodeUrl + '/banner/' + newBanner.BannerId, {
                method: 'PUT',
                headers: { ...authHeader() },
                body: Data
            }).then(response => response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_BANNER,
                        payload: json
                    });
                    dispatch(getAllBanners())
                }, err => {
                    console.log('Error occured while updating advertisement');
                });
        }
    }
    else {
        return function (dispatch) {
            fetch(nodeUrl + '/banner/', {
                method: 'POST',
                headers: { ...authHeader() },
                body: Data
            }).then((Response) => Response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_BANNER,
                        payload: json
                    });
                    dispatch(getAllBanners())
                }, err => {
                    console.log('Error occured while saving banner');
                });
        }
    }
};

export const getBannerById = (BannerId) => {
    return function (dispatch) {
        fetch(nodeUrl + "/banner/" + BannerId, {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: GET_BANNER_BY_ID,
                    payload: json.data
                });
            });
    }
}

export const getBannerPhotosById = (BannerId) => {
    return function (dispatch) {
        fetch(nodeUrl + "/bannerPhotosById/" + BannerId, {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: GET_BANNERPHOTOS_BYID,
                    payload: json
                });
            });
    }
};

export const onDeleteBannerPhotos = (BannerId, photoId, fileName) => {
    return function (dispatch) {
        fetch(nodeUrl + '/bannerphoto/' + BannerId + '/' + photoId + '/' + fileName, {
            method: 'DELETE',
            headers: { ...authHeader() },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: ON_DELETE_BANNERPHOTOS,
                    payload: json
                });
                dispatch(getBannerPhotosById(BannerId));
            }, err => {
                console.log('Error occured while deleting banner photo');
            });
    }
}

export const searchBanner = (dropDownValue, searchName) => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/banner/" + dropDownValue + "/" + searchName, requestOptions)
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
                    type: SEARCH_BANNER,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
}

export const onDeleteBanner = (banner) => {
    return function (dispatch) {
        const requestOptions = {
            method: 'DELETE',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/banner/" + banner.BannerId, requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                dispatch({
                    type: ON_DELETE_BANNER,
                    payload: ''
                });
                dispatch(getAllBanners())
            })
            .catch((data) => console.log(data));
    }
}

export const onSearchBanner = (event) => {
    return {
        type: BANNER_SEARCH_VALUE,
        payload: event.target.value
    }
}

export const bannerToggleDropDown = () => {
    return {
        type: BANNER_TOGGLE_DROPDOWN,
        payload: ''
    };
}

export const bannerSelectDropDown = (event) => {
    return {
        type: BANNER_SELECT_DROPDOWN,
        payload: event.target.innerText
    };
}

export const bannerSelectDropDownValue = (event) => {
    return {
        type: BANNER_SELECT_DROPDOWN_VALUE,
        payload: event.currentTarget.value
    }
}

export const clearBannerInput = () => {
    return {
        type: BANNER_CLEAR_INPUT,
        payload: ''
    }
}

export const closeBannerSnackbar = () => {
    return {
        type: CLOSE_BANNER_SNACKBAR,
        payload: ''
    };
};