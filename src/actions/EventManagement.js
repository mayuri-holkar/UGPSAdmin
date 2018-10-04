import {
    GET_ALL_EVENTS,
    SEARCH_EVENTS,
    EVENT_SEARCH_VALUE,
    EVENTS_TOGGLE_DROPDOWN,
    EVENTS_SELECT_DROPDOWN,
    EVENTS_SELECT_DROPDOWN_VALUE,
    EVENTS_CLEAR_INPUT,
    ON_SAVE_EVENT,
    CLOSE_SNACKBAR,
    GET_EVENT_BYID,
    ON_SAVE_EVENTPHOTOS,
    GET_EVENTPHOTOS_BYID,
    ON_DELETE_EVENTPHOTOS
} from "constants/ActionTypes";
import { authHeader } from '../Headers/index';
import history from '../../src';

export const getAllEvents = () => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/events/", requestOptions)
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
                    type: GET_ALL_EVENTS,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
};

export const searchEvent = (dropDownValue, searchName) => {
    return function (dispatch) {
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };
        fetch(nodeUrl+"/events/" + dropDownValue + "/" + searchName, requestOptions)
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
                    type: SEARCH_EVENTS,
                    payload: json
                });
            })
            .catch((data) => console.log(data));
    }
}

export const onSearchEvent = (event) => {
    return {
        type: EVENT_SEARCH_VALUE,
        payload: event.target.value
    }
}

export const eventToggleDropDown = () => {
    return {
        type: EVENTS_TOGGLE_DROPDOWN,
        payload: ''
    };
}

export const eventselectDropDown = (event) => {
    return {
        type: EVENTS_SELECT_DROPDOWN,
        payload: event.target.innerText
    };
}

export const eventselectDropDownValue = (event) => {
    return {
        type: EVENTS_SELECT_DROPDOWN_VALUE,
        payload: event.currentTarget.value
    }
}

export const clearEventInput = () => {
    return {
        type: EVENTS_CLEAR_INPUT,
        payload: ''
    }
}

export const onSaveEvent = (newEvent) => {
    const eventData = new FormData();
    eventData.append('EventName', newEvent.EventName);
    eventData.append('EventDescription', newEvent.EventDescription);
    eventData.append('EventDate', newEvent.EventDate);
    eventData.append('EventVenue', newEvent.EventVenue);
    eventData.append('IsActive', newEvent.IsActive);
    eventData.append('IsPublished', newEvent.IsPublished);
    eventData.append('EventId', newEvent.EventId);

    if (newEvent.EventId) {
        return function (dispatch) {
            fetch(nodeUrl+'/events/' + newEvent.EventId, {
                method: 'PUT',
                headers: { ...authHeader() },
                body: eventData
            }).then(response => response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_EVENT,
                        payload: json
                    });
                    dispatch(getAllEvents())
                }, err => {
                    console.log('Error occured while updating event');
                });
        }
    }
    else {
        return function (dispatch) {
            fetch(nodeUrl+'/events/', {
                method: 'POST',
                headers: { ...authHeader() },
                body: eventData
            }).then((Response) => Response.json())
                .then(json => {
                    dispatch({
                        type: ON_SAVE_EVENT,
                        payload: json
                    });
                    dispatch(getAllEvents())
                }, err => {
                    console.log('Error occured while saving event');
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

export const getEventById = (EventId) => {
    return function (dispatch) {
        fetch(nodeUrl+"/events/" + EventId, {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: GET_EVENT_BYID,
                    payload: json
                });
            });
    }
};

export const onSaveEventPhotos = (newEvent, eventId) => {
    const eventData = new FormData();
    eventData.append('EventId', eventId);
    eventData.append('EventPhotoId', newEvent.EventPhotoId);
    var imageArray = [];
    imageArray = newEvent.imageFile;
    for (let i = 0; i < imageArray.length; i++) {
        eventData.append('imageFile', newEvent.imageFile[i]);
        eventData.append('FileName', newEvent.FileName[i]);
    }
    return function (dispatch) {
        fetch(nodeUrl+'/eventPhotos/' + eventId, {
            method: 'POST',
            headers: { ...authHeader() },
            body: eventData
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: ON_SAVE_EVENTPHOTOS,
                    payload: json
                });
            }, err => {
                console.log('Error occured while uploading event photos');
            });
    }
};

export const onDeleteEventPhotos = (eventId,photoId,fileName) => {
    return function (dispatch) {
        fetch(nodeUrl+'/eventphoto/' + eventId + '/' + photoId +'/'+ fileName,{
            method: 'DELETE',
            headers: { ...authHeader() },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: ON_DELETE_EVENTPHOTOS,
                    payload: json
                });
                dispatch(getEventPhotosById(eventId));
            }, err => {
                console.log('Error occured while deleting event photo');
            });
    }
}

export const getEventPhotosById = (EventId) => {
    return function (dispatch) {
        fetch(nodeUrl+"/eventPhotos/" + EventId, {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        }).then((Response) => Response.json())
            .then(json => {
                dispatch({
                    type: GET_EVENTPHOTOS_BYID,
                    payload: json
                });
            });
    }
};
