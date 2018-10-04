import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import history from '../../../../index'
import moment from 'moment';

class EventCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: undefined,
            menuState: false,
        } 
    } 

    onEdit = () => {
        history.push('/app/Event/edit/' + (this.props.events.EventId))
    }

    onOptionSelect = event => {
        this.setState({ menuState: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ menuState: false });
    };

    onPhotoUpload = () => {
        history.push('/app/Event/photoUpload/' + (this.props.events.EventId))
    }

    render() {
        const options = [
            'Edit',
            'Add Event Photos'
        ];
        const ITEM_HEIGHT = 50;
        const { anchorEl, menuState} = this.state;
        const { events } = this.props
        const { EventName, EventDescription, EventDate, EventVenue, IsPublished, IsActive } = this.props.events;
        const active = IsActive ? "Active" : "Inactive";
        const IsActiveStyle = IsActive ? "text-white bg-success" : "text-white bg-danger";
        return (
            <TableRow>
                <TableCell>{EventName}</TableCell>
                <TableCell>{EventDate}</TableCell>
                <TableCell>{EventVenue}</TableCell>
                <TableCell><div className={`badge ${IsActiveStyle}`}>{active}</div></TableCell>
                <TableCell onClick={this.onOptionSelect}>
                    <IconButton>
                        <i className="zmdi zmdi-more-vert" />
                    </IconButton>
                </TableCell>
                <Menu id="long-menu"
                    anchorEl={anchorEl}
                    open={menuState}
                    onClose={this.handleRequestClose}
                    style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
                    MenuListProps={{
                        style: {
                            width: 150,
                        },
                    }}>
                    {options.map(option =>
                        <MenuItem key={option} onClick={() => {
                            if (option == 'Edit') {
                                this.onEdit()
                            } else {
                                this.handleRequestClose();
                                this.onPhotoUpload();
                            }
                        }
                        }>
                            {option}
                        </MenuItem>,
                    )}
                </Menu>
            </TableRow>
        );
    }
}
export default EventCell;
