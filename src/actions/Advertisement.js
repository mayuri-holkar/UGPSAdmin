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
    ON_DELETE_ADVERTISEMENTPHOTOS,
} from "constants/ActionTypes";
import { authHeader } from "Headers/index";
import history from '../index';

export const onSaveAdvertisement = (newAdvertisement) => {
    const Data = new FormData();
    Data.append('Name', newAdvertisement.Name);
    Data.append('Description', newAdvertisement.Description);
    Data.append('StartDate', newAdvertisement.StartDate);
    Data.append('EndDate', newAdvertisement.EndDate);
    Data.append('IsActive', newAdvertisement.IsActive);
    Data.append('Image', newAdvertisement.Image);
    Data.append('OldFileName', newAdvertisement.OldFileName);
    Data.append('AdvertisementType', newAdvertisement.AdvertisementType);
    Data.append('Amount', newAdvertisement.Amount);
    Data.append('AdvertisementAmountType', newAdvertisement.AdvertisementAmountType);
    Data.append('AdvertisementLocation', newAdvertisement.AdvertisementLocation);
    Data.append('AdvertisementPhotoId', newAdvertisement.AdvertisementPhotoId);
    Data.append('IsNewVisitingCard', newAdvertisement.isNewVisitingCard);
    var noOfFiles = newAdvertisement.FileName != undefined ? newAdvertisement.FileName.length : 0;
    Data.append('NoOfFiles', noOfFiles);
    if (newAdvertisement.AdvertisementLocation == 3) {
        Data.append('imageFile', newAdvertisement.imageFile);
        Data.append('FileName', newAdvertisement.FileName);
    }
    else {
        var imageArray = [];
        imageArray = newAdvertisement.imageFile;
        for (let i = 0; i < noOfFiles; i++) {
            Data.append('imageFile', newAdvertisement.imageFile[i]);
            Data.append('FileName', newAdvertisement.FileName[i]);
        }
    }
    if (newAdvertisement.AdvertisementId != '') {
        return function (dispatch) {
            fetch(nodeUrl + '/advertisement/' + newAdvertisement.AdvertisementId, {
                method: 'PUT',
                headers: { ...authHeader() },
                body: Data
            }).then(response => response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_ADVERTISEMENT,
                        payload: json
                    });
                    dispatch(getAllAdvertisements())
                }, err => {
                    console.log('Error occured while updating advertisement');
                });
        }
    }
    else {
        return function (dispatch) {
            fetch(nodeUrl + '/advertisement/', {
                method: 'POST',
                headers: { ...authHeader() },
                body: Data
            }).then((Response) => Response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_ADVERTISEMENT,
                        payload: json
                    });
                    dispatch(getAllAdvertisements())
                }, err => {
                    console.log('Error occured while saving advertisement');
                });
        }
    }
};

export const closeSnackbar = () => {
    return {
        type: CLOSE_SNACKBAR,
        payload: ''
    };
};

export const getAllAdvertisements = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/advertisement/", requestOptions)
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
                    type: GET_ALL_ADVERTISEMENTS,
                    payload: json
                });
            })
            .catch((json) => console.log(json));
    }
};

export const searchAdvertisement = (dropDownValue, searchName) => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/advertisements/" + dropDownValue + "/" + searchName, requestOptions)
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
                    type: SEARCH_ADVERTISEMENTS,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
}

export const onSearchAdvertisement = (event) => {
    return {
        type: ADVERTISEMENT_SEARCH_VALUE,
        payload: event.target.value
    }
}

export const advertisementToggleDropDown = () => {
    return {
        type: ADVERTISEMENT_TOGGLE_DROPDOWN,
        payload: ''
    };
}

export const advertisementSelectDropDown = (event) => {
    return {
        type: ADVERTISEMENT_SELECT_DROPDOWN,
        payload: event.target.innerText
    };
}

export const advertisementSelectDropDownValue = (event) => {
    return {
        type: ADVERTISEMENT_SELECT_DROPDOWN_VALUE,
        payload: event.currentTarget.value
    }
}

export const clearAdvertisementInput = () => {
    return {
        type: ADVERTISEMENT_CLEAR_INPUT,
        payload: ''
    }
}

export const getAdvertisementById = (AdvertisementId) => {
    return function (dispatch) {
        fetch(nodeUrl + "/advertisement/" + AdvertisementId, {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: GET_ADVERTISEMENT_BYID,
                    payload: json.data
                });
            });
    }
}

export const getAllAdvertisementTypes = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/getAdvertisementTypes/", requestOptions)
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
                    type: GET_ALL_ADVERTISEMENTTYPES,
                    payload: json
                });
            })
            .catch((json) => console.log(json));
    }
};

export const getAllAdvertisementLocations = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl + "/getAdvertisementLocations/", requestOptions)
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
                    type: GET_ALL_ADVERTISEMENTLOCATIONS,
                    payload: json
                });
            })
            .catch((json) => console.log(json));
    }
};

export const getAdvertisementPhotosById = (AdvertisementId) => {
    return function (dispatch) {
        fetch(nodeUrl + "/advertisementPhotosById/" + AdvertisementId, {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: GET_ADVERTISEMENTPHOTOS_BYID,
                    payload: json
                });
            });
    }
};

export const onDeleteAdvertisementPhotos = (advertisementId, photoId, fileName) => {
    return function (dispatch) {
        fetch(nodeUrl + '/advertisementphoto/' + advertisementId + '/' + photoId + '/' + fileName, {
            method: 'DELETE',
            headers: { ...authHeader() },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: ON_DELETE_ADVERTISEMENTPHOTOS,
                    payload: json
                });
                dispatch(getAdvertisementPhotosById(advertisementId));
            }, err => {
                console.log('Error occured while deleting event photo');
            });
    }
}