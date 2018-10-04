import React from 'react';
import 'jquery-slimscroll/jquery.slimscroll.min';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import CKEditor from "react-ckeditor-component";
import { FormControlLabel } from 'material-ui/Form';
import { ValidatorForm } from 'react-material-ui-form-validator';
import history from '../../../index';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class EventAddEdit extends React.Component {
    constructor(props) {
        super(props);
        const {
            EventName,
            EventDescription,
            EventDate,
            EventVenue,
            IsActive,
            IsPublished,
            EventId
        } = this.props.newEvent

        this.state = {
            EventName,
            EventDescription,
            EventDate: this.props.newEvent.EventDate == '' ? '' : moment(EventDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
            EventVenue,
            IsActive,
            IsPublished,
            EventId,
            content: '',
            disableButton: false,
        }
       
        this.handleChange = this.handleChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleDate = (date) => {
        this.setState({ EventDate: date.target.value });
    }

    onCancel = () => {
        history.push('/app/EventManagement');
    }

    onChange = (evt) => {
        const editedEventDiscription = evt.editor.getData();
        this.setState({
            EventDescription: editedEventDiscription
        })
    }

    onSave = () => {
        this.props.onSaveEvent({
            'EventName': this.state.EventName,
            'EventVenue': this.state.EventVenue,
            'EventDate': moment(this.state.EventDate).format('DD-MM-YYYY'),
            'EventDescription': this.state.EventDescription,
            'IsActive': this.state.IsActive,
            'IsPublished': this.state.IsPublished,
            'EventId': this.state.EventId,
        });
        this.setState({ disableButton: true })
        history.push('/app/EventManagement');
    }

    render() {
        const { onSaveEvent, newEvent } = this.props;
        const { EventName, EventDescription, EventDate, EventVenue, IsActive, IsPublished } = newEvent;
        return (
            <div className="col-lg-12">
                <div className="module-box">
                    <div className="row">
                        <div className="col-md-12" style={{ paddingTop: '15px' }}>
                            <div className="page-heading d-sm-flex align-items-sm-center" id="pageHeading">
                                <div className="col-md-7">
                                    <h2 className="title mb-3 mb-sm-0">Event Management</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="animated slideInUpTiny animation-duration-3">
                        <div className="row">
                            <div className="col-12" style={{ paddingTop: '20px' }}>
                                <ValidatorForm className="contact-form jr-card" onSubmit={this.onSave.bind(this)}>
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label form="EventName">Event Name</label><span className="text-danger"> *</span>
                                                <input className="form-control form-control-lg" name="EventName" type="text"
                                                    onChange={this.handleChange} value={this.state.EventName} placeholder="Event Name" required="true" maxLength="50" />
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-12">
                                            <div className="form-group">
                                                <label htmlFor="EventDate">Event Date</label><span className="text-danger"> *</span>
                                                <Input type="date" name="EventDate" className="form-control form-control-lg" placeholder="date placeholder" onChange={this.handleDate.bind(this)} value={this.state.EventDate} required="true" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 col-12">
                                            <div className="form-group">
                                                <label htmlFor="EventVenue">Event Venue</label><span className="text-danger"> *</span>
                                                <input className="form-control form-control-lg" name="EventVenue" type="text"
                                                    onChange={this.handleChange} value={this.state.EventVenue} placeholder="Event Venue" required="true" maxLength="50" />
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <div className="form-group">
                                                <br />
                                                <FormControlLabel label="Is Active?"
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.IsActive}
                                                            onChange={(event) => this.setState({ IsActive: event.target.checked })}
                                                            value={`${this.state.IsActive}`}
                                                        />}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-2 col-12">
                                            <div className="form-group">
                                                <br />
                                                <FormControlLabel label="Is Published?"
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.IsPublished}
                                                            onChange={(event) => this.setState({ IsPublished: event.target.checked })}
                                                            value={this.state.IsPublished}
                                                        />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label>Event Description</label>
                                                <CKEditor
                                                    required="true"
                                                    value={this.state.EventDescription}
                                                    name="EventDescription"
                                                    content={this.state.EventDescription}
                                                    events={{
                                                        "change": this.onChange.bind(this)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group mb-0">
                                                <Button type="submit" raised className="jr-btn bg-light-green text-white" disabled={this.state.disableButton}> Submit</Button>
                                                <Button type="cancel" raised className="jr-btn bg-grey text-white" onClick={this.onCancel}>Cancel</Button>
                                            </div>
                                        </div>
                                    </div>
                                </ValidatorForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default EventAddEdit;