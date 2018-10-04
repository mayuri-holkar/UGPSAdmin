import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import Checkbox from 'material-ui/Checkbox';
import AddEditUser from 'components/User/AddEditUser';
import UpdatePassword from 'components/User/UpdatePassword';

class UserCell extends React.Component {
    constructor() {
        super();
        this.state = {
            selectoption: undefined,
            menuState: false,
            addUserState: false,
            anchorEl: undefined,
            updateUserState: false
        }
    }

    onCloseUserModal = () => {
        this.setState({ addUserState: false });
    };

    onCloseUpdatePasswordModal = () => {
        this.setState({ updateUserState: false });
    };

    onEventOptionSelect = event => {
        this.setState({ menuState: true, selectoption: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ menuState: false });
    };

    onEditUser = () => {
        this.setState({ menuState: false, addUserState: true });
    };

    onUpdatePass = () => {
        this.setState({ menuState: false, updateUserState: true });
    }

    render() {
        const options = ['Edit', 'Update Password'];
        const ITEM_HEIGHT = 40;
        const { menuState, selectoption, addUserState, updateUserState } = this.state;
        const { onCloseUserModal, onSaveUser, getAllUsers, users, onUpdatePassword, onCloseUpdatePasswordModal } = this.props;
        const { UserId, FirstName, LastName, UserEmailId, UserPhone, UserPassword, IsSuperAdmin, IsActive } = this.props.users;
        const IsActiveStyle = IsActive ? "text-white bg-success" : "text-white bg-danger";
        const active = IsActive ? "Active" : "Inactive"
        return (
            <TableRow>
                <TableCell>{FirstName}</TableCell>
                <TableCell>{LastName}</TableCell>
                <TableCell>{UserPhone}</TableCell>
                <TableCell>{UserEmailId}</TableCell>
                <TableCell><div className={`badge ${IsActiveStyle}`}>{active}</div></TableCell>
                <TableCell onClick={this.onEventOptionSelect}>
                    <IconButton>
                        <i className="zmdi zmdi-more-vert" />
                    </IconButton>
                </TableCell>
                <Menu id="long-menu"
                    anchorEl={selectoption}
                    open={menuState}
                    onClose={this.handleRequestClose}
                    style={{ maxHeight: ITEM_HEIGHT * 3.5 }}
                    MenuListProps={{
                        style: {
                            width: 150,
                        },
                    }}>
                    {options.map(option =>
                        <MenuItem key={option} onClick={() => {
                            if (option === 'Edit') {
                                this.onEditUser()
                            }
                            else {
                                this.onUpdatePass()
                            }
                        }
                        }>
                            {option}
                        </MenuItem>
                    )}
                </Menu>
                {addUserState &&
                    <AddEditUser open={addUserState}
                        users={this.props.users}
                        onCloseUserModal={this.onCloseUserModal}
                        onSaveUser={onSaveUser}
                        getAllUsers={getAllUsers}
                        userid={this.props.users.UserId} />}

                {updateUserState &&
                    <UpdatePassword open={updateUserState}
                        users={this.props.users}
                        onCloseUpdatePasswordModal={this.onCloseUpdatePasswordModal}
                        onUpdatePassword={onUpdatePassword}
                        getAllUsers={getAllUsers}
                        userid={this.props.users.UserId} />}
            </TableRow>
        );
    }
}

export default UserCell;