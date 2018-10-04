import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import EventPhotosAddEdit from "components/EventManagement/EventPhotosAddEdit/index";
import {
    onSaveEventPhotos,
    getAllEvents,
    onDeleteEventPhotos,
    getEventPhotosById,
    clearEventInput,
    closeSnackbar
} from 'actions/EventManagement';

class EventPhotos extends React.Component {
    constructor() {
        super();
        this.state = {
            updatedProps: false
        };
    }

    componentDidMount = () => {
        const eventId = this.props.match.params.id;
        if (eventId) {
            this.getEventPhotosById(eventId);
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps) {
            this.setState({ updatedProps: true });
        }
    }

    closeSnackbar = () => {
        this.props.closeSnackbar();
    }

    getEventPhotosById = (eventId) => {
        this.props.getEventPhotosById(eventId);
    }

    onDeleteEventPhotos = (eventId, photoId, name) => {
        this.props.onDeleteEventPhotos(eventId, photoId, name)
        this.getEventPhotosById(eventId);
    }

    onSaveEventPhotos = (newEvent, eventId) => {
        var eventId = this.props.match.params.id;
        this.props.onSaveEventPhotos(newEvent, eventId);
        this.getEventPhotosById(eventId);
        this.props.clearEventInput();
    }

    render() {
        const { newEvent, eventPhotos, showMessage, deleteAlertMessage } = this.props
        return (
            <div> {
                this.state.updatedProps ?
                    eventPhotos.length > 0 ?
                        eventPhotos[0].EventId == this.props.match.params.id ?
                            <EventPhotosAddEdit onSaveEventPhotos={this.onSaveEventPhotos.bind(this)}
                                newEvent={{
                                    'EventPhotoId': '',
                                    'EventId': this.props.match.params.id,
                                    'FileName': '',
                                }}
                                getEventPhotosById={this.getEventPhotosById.bind(this)}
                                onDeleteEventPhotos={this.onDeleteEventPhotos.bind(this)}
                                eventPhotos={this.props.eventPhotos}
                                clearEventInput={this.props.clearEventInput}
                            /> : null
                        : <EventPhotosAddEdit onSaveEventPhotos={this.onSaveEventPhotos.bind(this)}
                            newEvent={{
                                'EventPhotoId': '',
                                'EventId': this.props.match.params.id,
                                'FileName': '',
                            }}
                            getEventPhotosById={this.getEventPhotosById.bind(this)}
                            onDeleteEventPhotos={this.onDeleteEventPhotos.bind(this)}
                            clearEventInput={this.props.clearEventInput}
                            eventPhotos=''
                        />
                    : null
            }
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showMessage}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{deleteAlertMessage}</span>}
                    action={[
                        <Button fab className="jr-btn-fab-sm bg-success text-white">
                            <i className="zmdi zmdi-thumb-up zmdi-hc-fw" />
                        </Button>
                    ]}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ EventManagement }) => {
    return {
        eventPhotos: EventManagement.eventPhotos,
        deleteAlertMessage: EventManagement.deleteAlertMessage,
        showMessage: EventManagement.showMessage
    }
};

export default connect(mapStateToProps, {
    onSaveEventPhotos,
    getAllEvents,
    onDeleteEventPhotos,
    getEventPhotosById,
    clearEventInput,
    closeSnackbar
})(EventPhotos);