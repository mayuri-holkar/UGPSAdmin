import React from 'react';
import { connect } from 'react-redux';
import Table, { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Card } from 'reactstrap';
import { Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, InputGroupDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import styles from "./eventStyles.css";
import Snackbar from 'material-ui/Snackbar';
import EventList from "components/EventManagement/EventList";
import {
    getAllEvents,
    searchEvent,
    eventToggleDropDown,
    eventselectDropDown,
    eventselectDropDownValue,
    onSearchEvent,
    clearEventInput,
    getNumberOfPhotos,
    closeSnackbar,
} from 'actions/EventManagement';

class EventManagement extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInput = this.clearInput.bind(this)
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    componentWillMount() {
        this.props.clearEventInput();
        this.getAllEvents();
    }

    getAllEvents() {
        this.props.getAllEvents();
    }

    handleChange = (event) => {
        this.props.onSearchEvent(event);
    }

    closeSnackbar = () => {
        this.props.closeSnackbar();
    }

    handleSubmit = (event) => {
        const { searchName, dropDownValue } = this.props;
        this.props.searchEvent(this.props.dropDownValue, this.props.searchName)
    }

    toggleDropDown = () => {
        this.props.eventToggleDropDown();
    }

    toRedirect = () => {
        this.props.history.push('Event/add');
    }

    selectDropDown = (event) => {
        this.props.eventselectDropDown(event);
        this.props.eventselectDropDownValue(event);
    }

    clearInput = () => {
        this.props.clearEventInput();
        this.getAllEvents();
    }

    render() {
        const { showMessage, alertMessage } = this.props
        return (
            <div className="app-wrapper">
                <div className="row" >
                    <div className="col-md-12">
                        <div className="page-heading d-sm-flex align-items-sm-center" id="pageHeading">
                            <div className="col-md-7">
                                <h2 className="title mb-3 mb-sm-0">Event Management</h2>
                            </div>
                            <div className="col-md-5">
                                <div className="input-group align-items-sm-right" >
                                    <InputGroup>
                                        <Dropdown isOpen={this.props.dropdownOpen} toggle={this.toggleDropDown} id="d1">
                                            <DropdownToggle color="primary" caret id="FieldName">
                                                {this.props.dropDownName}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem value="EventName" onClick={this.selectDropDown.bind(this)}>Event Name</DropdownItem>
                                                <DropdownItem value="EventVenue" onClick={this.selectDropDown.bind(this)}>Event Venue</DropdownItem>
                                                <DropdownItem value="EventDate" onClick={this.selectDropDown.bind(this)}>Event Date</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Input id="searchName" type="text" value={this.props.searchName}
                                            placeholder="Search here.." ref="searchName" name="searchName" onChange={this.handleChange} />
                                        <InputGroupAddon addonType="append"> <Button className="btn bg-primary" id="search" disabled={!this.props.searchName} type="submit" onClick={this.handleSubmit}  > <i className="zmdi zmdi-search zmdi-hc-fw" /> </Button></InputGroupAddon>
                                        <InputGroupAddon addonType="append"> <Button disabled={!this.props.searchName} onClick={this.clearInput} className="btn bg-danger" id="Eventcancel"> <i className="zmdi zmdi-close zmdi-hc-fw" /></Button></InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button className="btn jr-btn-rounded text-white btn-primary bg-primary btn-rounded " onClick={this.toRedirect} style={{ marginBottom: '10px', marginTop: '10px'}}>
                        Add Event
                </Button>
                </div>
                <div>
                    <Paper>
                        <div className="jr-card">
                            {this.props.eventList.length === 0 ?
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    {this.props.SearchResult}
                                </div>
                                :
                                <EventList events={this.props.eventList} />
                            }
                        </div>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={showMessage}
                            autoHideDuration={3000}
                            onClose={this.closeSnackbar}
                            SnackbarContentProps={{
                                'aria-describedby': 'message-id',
                            }}
                            message={<span id="message-id">{alertMessage}</span>}
                            action={[
                                <Button fab className="jr-btn-fab-sm bg-success text-white">
                                    <i className="zmdi zmdi-thumb-up zmdi-hc-fw" />
                                </Button>
                            ]}
                        />
                    </Paper>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ EventManagement }) => {
    return {
        eventList: EventManagement.eventList,
        dropDownName: EventManagement.dropDownName,
        dropDownValue: EventManagement.dropDownValue,
        dropdownOpen: EventManagement.dropdownOpen,
        SearchResult: EventManagement.SearchResult,
        searchName: EventManagement.searchName,
        numberOfPhotos: EventManagement.numberOfPhotos,
        alertMessage: EventManagement.alertMessage,
        showMessage: EventManagement.showMessage
    }
};

export default connect(mapStateToProps, {
    getAllEvents,
    searchEvent,
    eventToggleDropDown,
    eventselectDropDown,
    eventselectDropDownValue,
    onSearchEvent,
    clearEventInput,
    getNumberOfPhotos,
    closeSnackbar,
})(EventManagement);