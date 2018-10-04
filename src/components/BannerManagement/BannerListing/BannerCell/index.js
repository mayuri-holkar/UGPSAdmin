import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import moment from 'moment';
import Avatar from 'material-ui/Avatar';
import { Redirect } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

class BannerCell extends React.Component {
    constructor() {
        super();
        this.state = {
            editState: false,
            isDelete: false
        }
    }
    onEdit = () => {
        this.setState({ editState: true });
    }

    onDelete = () => {
        this.onDisplay();
    }

    onDisplay() {
        this.setState({
            isDelete: true
        })
    };

    onCancel = () => {
        this.setState({
            isDelete: false
        })
    };

    deleteFile = () => {
        this.setState({
            isDelete: false
        })
        this.props.onDeleteBanner(this.props.banners);
    };

    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        const { editState } = this.state;
        const { banners } = this.props;
        const { Name, StartDate, EndDate, IsActive}  = this.props.banners;
        const Active = IsActive ? 'Active' : 'Inactive';
        const IsActiveStyle = IsActive ? "text-white bg-success" : "text-white bg-danger";
        var type;
        return (
            <TableRow>
                <TableCell> {Name} </TableCell>
                <TableCell><div className={`badge ${IsActiveStyle}`}>{Active}</div></TableCell>
                <TableCell>
                    <Tooltip id="tooltip-icon" title="Edit Banner" placement="bottom">
                        <i className="zmdi zmdi-edit zmdi-hc-2x text-blue" onClick={this.onEdit} style={{ paddingLeft: '5px', marginLeft: '5px' }}></i>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Tooltip id="tooltip-icon" title="Delete Banner " placement="bottom">
                        <i className="zmdi zmdi-delete zmdi-hc-2x text-danger" onClick={this.onDelete.bind(this)} style={{ paddingLeft: '5px', marginLeft: '5px' }}></i>
                    </Tooltip>
                </TableCell>
                {editState ?
                    <Redirect to={{
                        pathname: '/app/BannerManagement/edit/' + (banners.BannerId),
                    }} />
                    :
                    null
                }
                <SweetAlert
                    show={this.state.isDelete}
                    warning
                    showCancel
                    confirmBtnText="Yes"
                    cancelBtnText="No"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.deleteFile}
                    onCancel={this.onCancel}
                >
                    You want to delete this record?
				</SweetAlert>
            </TableRow>
        );
    }
}
export default BannerCell;