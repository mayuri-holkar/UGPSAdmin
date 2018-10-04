import React from 'react';
import { connect } from 'react-redux';
import EventAddEdit from "components/EventManagement/EventAddEdit/index";
import {
    onSaveEvent,
    getEventById,
    clearEventInput
} from 'actions/EventManagement';

class Event extends React.Component {
    constructor(props) {
        super(props)
    }

    onSaveEvent = (newEvent)=> {
        this.props.onSaveEvent(newEvent);
        this.getEventById(newEvent.EventId);
        this.props.clearEventInput();
    }

    componentWillMount() {
        const eventId = this.props.match.params.id;
        if (eventId) {
            this.getEventById(eventId);
        }
    }

    getEventById = (eventId) => {
        this.props.getEventById(eventId)
    }

    render() {
        const {newEvent, oldEvent} = this.props
        return (
            <div>
                {this.props.match.params.id ?
                    (oldEvent.EventId == this.props.match.params.id ?
                        <EventAddEdit onSaveEvent={this.onSaveEvent.bind(this)} newEvent={this.props.match.params.id ? oldEvent : {
                            EventId: '',
                            EventName: '',
                            EventDescription: '',
                            EventDate: '',
                            EventVenue: '',
                            IsActive: '',
                            IsPublished: ''
                        }} /> : null)
                    :
                    <EventAddEdit onSaveEvent={this.onSaveEvent.bind(this)} newEvent={{
                        EventId: '',
                        EventName: '',
                        EventDescription: '',
                        EventDate: '',
                        EventVenue: '',
                        IsActive: true,
                        IsPublished: false
                    }} />
                }
                </div>
        );
    }
}

const mapStateToProps = ({ EventManagement }) => {
    return {
        oldEvent: EventManagement.oldEvent,
    }
};

export default connect(mapStateToProps, {
    onSaveEvent,
    getEventById,
    clearEventInput
})(Event);