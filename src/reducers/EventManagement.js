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
    ON_DELETE_EVENTPHOTOS,
    GET_EVENTPHOTOS_BYID
} from "constants/ActionTypes";

const INIT_STATE = {
    eventList: [],
    allEventList: [],
    dropDownValue: 'EventName',
    dropdownOpen: false,
    dropDownName: 'Event Name',
    searchName: '',
    showMessage: false,
    alertMessage: '',
    oldEvent: '',
    eventPhotos: '',
    deleteAlertMessage: '',
    SearchResult:''
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ALL_EVENTS: {
            let SearchResult;
            if (action.payload == '') {
                SearchResult = 'No records found';
            }
            return { ...state, eventList: action.payload, allEventList: action.payload, SearchResult: SearchResult }
        }

        case SEARCH_EVENTS: {
            let events = [];
            let SearchResult = '';
            if (action.payload == 'No Record') {
                events = state.allEventList;
            }
            else if (action.payload == '') {
                events = '';
                SearchResult = 'No records found';
            }
            else {
                events = action.payload;
            }
            return { ...state, eventList: events, SearchResult: SearchResult }
        }

        case EVENT_SEARCH_VALUE: {
            return {
                ...state,
                searchName: action.payload,
            }
        }

        case EVENTS_TOGGLE_DROPDOWN: {
            return {
                ...state,
                dropdownOpen: !state.dropdownOpen
            }
        }

        case EVENTS_SELECT_DROPDOWN: {
            return {
                ...state,
                dropDownName: action.payload
            }
        }

        case EVENTS_SELECT_DROPDOWN_VALUE: {
            return {
                ...state,
                dropDownValue: action.payload
            }
        }

        case EVENTS_CLEAR_INPUT: {
            return {
                ...state,
                dropDownName: 'Event Name',
                dropDownValue: 'EventName',
                searchName: ''
            }
        }

        case CLOSE_SNACKBAR: {
            return {
                ...state,
                showMessage: false
            }
        }

        case ON_SAVE_EVENT: {
            var msg = '';
            if (action.payload.EventId) {
                msg = 'Event updated successfully';
            }
            else {
                msg = 'Event inserted successfully';
            }
            return {
                ...state,
                alertMessage: msg,
                showMessage: true,
            }
        }

        case GET_EVENT_BYID: {
            return {
                ...state,
                oldEvent: action.payload[0]
            }
        }

        case ON_SAVE_EVENTPHOTOS: {
            var msg = 'Event photos uploaded successfully';
            return {
                ...state,
                alertMessage: msg,
                showMessage: true,
            }
        }

        case GET_EVENTPHOTOS_BYID: {
            return {
                ...state,
                eventPhotos: action.payload
            }
        }

        case ON_DELETE_EVENTPHOTOS: {
            var msg = 'Photo deleted successfully';
            return {
                ...state,
                deleteAlertMessage: msg,
                showMessage: true,
            }
        }

        default:
            return state;
    }
}