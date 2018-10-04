import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import moment from 'moment';
import Avatar from 'material-ui/Avatar';
import { Redirect } from 'react-router-dom';

class AdvertisementCell extends React.Component {
    constructor() {
        super();
        this.state = {
            editState: false
        }
    }
    onEdit = () => {
        this.setState({ editState: true });
    }

    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        const { editState } = this.state;
        const { advertisements } = this.props;
        const { Name, Description, StartDate, EndDate, IsActive, AdvertisementType, AdvertisementLocation } = this.props.advertisements;
        const Active = IsActive ? 'Active' : 'Inactive';
        const IsActiveStyle = IsActive ? "text-white bg-success" : "text-white bg-danger";
        var type;
        if (AdvertisementType == 1) {
            type = 'Advertising and media';
        } else if (AdvertisementType == 2) {
            type = 'Information and technology';
        }
        else if (AdvertisementType == 3) {
            type = 'Real estate and construction material';
        }
        else { type = 'Other' }
        var location;
        if (AdvertisementLocation == 1) {
            location = 'Left side';
        } else if (AdvertisementLocation == 2) {
            location = 'Right side';
        }
        else { location = 'Visiting card' }
        return (
            <TableRow>
                <TableCell> {Name} </TableCell>
                <TableCell>{StartDate}</TableCell>
                <TableCell>{EndDate}</TableCell>
                <TableCell><div className={`badge ${IsActiveStyle}`}>{Active}</div></TableCell>
                <TableCell>{type}</TableCell>
                <TableCell>{location}</TableCell>
                <TableCell>
                    <Tooltip id="tooltip-icon" title="Edit Advertisement" placement="bottom">
                        <i className="zmdi zmdi-edit zmdi-hc-x" onClick={this.onEdit} style={{ paddingLeft: '20px', marginLeft: '20px' }}></i>
                    </Tooltip>
                </TableCell>
                {editState ?
                    <Redirect to={{
                        pathname: '/app/Advertisements/edit/' + (advertisements.AdvertisementId),
                    }} />
                    :
                    null
                }
            </TableRow>
        );
    }
}
export default AdvertisementCell;