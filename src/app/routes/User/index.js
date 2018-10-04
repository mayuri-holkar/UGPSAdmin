import React from 'react';
import { connect } from 'react-redux';
import Table, { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import { Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, InputGroupDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import UserList from "components/User/UserList";
import AddEditUser from 'components/User/AddEditUser';
import UpdatePassword from 'components/User/UpdatePassword';
import Style from './UserStyles.scss';
import {
    getAllUsers,
    searchUser,
    userToggleDropDown,
    userSelectDropDown,
    userselectDropDownValue,
    onSearchUser,
    clearUserInput,
    onOpenUserModal,
    onCloseUserModal,
    onSaveUser,
    handleRequestUserClose,
    onUpdatePassword,
    onCloseUpdatePasswordModal,
    onOpenUpdatePasswordModal,
} from 'actions/User';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInput = this.clearInput.bind(this)
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    componentWillMount() {
        this.props.clearUserInput();
        this.getAllUsers();
    }

    getAllUsers() {
        this.props.getAllUsers();
    }

    handleChange = (event) => {
        this.props.onSearchUser(event);
    }

    onClick() {
        this.props.onOpenUserModal();
    }

    onCloseUserModal = () => {
        this.props.onCloseUserModal();
    }

    onOpenUpdatePasswordModal = () => {
        this.props.onOpenUpdatePasswordModal();
    }

    onCloseUpdatePasswordModal = () => {
        this.props.onCloseUpdatePasswordModal();
    }

    onSaveUser = (User) => {
        this.props.onSaveUser(User);
        this.props.clearUserInput();
    }

    onUpdatePassword = (User) => {
        this.props.onUpdatePassword(User);
        this.props.clearUserInput();
    }

    handleSubmit = (event) => {
        const { searchName, dropDownValue } = this.props;
        this.props.searchUser(this.props.dropDownValue, this.props.searchName)
    }

    toggleDropDown = () => {
        this.props.userToggleDropDown();
    }

    selectDropDown = (event) => {
        this.props.userSelectDropDown(event);
        this.props.userselectDropDownValue(event);
    }

    clearInput = () => {
        this.props.clearUserInput();
        this.getAllUsers();
    }

    handleRequestUserClose = () => {
        this.props.handleRequestUserClose();
        this.props.clearUserInput();
    }

    render() {
        const { searchResult, addUserState, updateUserState, alertMessage, showMessage, dropDownName, dropdownOpen, users } = this.props;
        return (
            <div className="app-wrapper">
                <div className="module-box">
                    <div className="row" >
                        <div className="col-md-12">
                            <div className="page-heading d-sm-flex align-items-sm-center" id="UserpageHeading" style={{ marginBottom: '10px' }}>
                                <div className="col-md-7">
                                    <h2 className="title mb-3 mb-sm-0">Users</h2>
                                </div>
                                <div className="col-md-5">
                                    <div className="input-group align-items-sm-right" >
                                        <InputGroup>
                                            <Dropdown isOpen={this.props.dropdownOpen} toggle={this.toggleDropDown} id="d1">
                                                <DropdownToggle color="primary" caret id="FieldName">
                                                    {this.props.dropDownName}
                                                </DropdownToggle>
                                                <DropdownMenu>
                                                    <DropdownItem value="FirstName" onClick={this.selectDropDown.bind(this)}>First Name</DropdownItem>
                                                    <DropdownItem value="LastName" onClick={this.selectDropDown.bind(this)}>Last Name</DropdownItem>
                                                    <DropdownItem value="UserPhone" onClick={this.selectDropDown.bind(this)}>Phone</DropdownItem>
                                                    <DropdownItem value="UserEmailId" onClick={this.selectDropDown.bind(this)}>Email</DropdownItem>
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
                        <Button className="btn jr-btn-rounded text-white btn-primary bg-primary btn-rounded " onClick={this.onClick.bind(this)} style={{ marginBottom: '10px' }}>
                            Add User
                         </Button>
                    </div>
                    <div>
                        <Paper>
                            <div className="jr-card">
                                {this.props.userList.length === 0 ?
                                    <div className="h-100 d-flex align-items-center justify-content-center">
                                        {this.props.SearchResult}
                                    </div>
                                    :
                                    <UserList users={this.props.userList}
                                        onCloseUserModal={this.onCloseUserModal.bind(this)}
                                        onSaveUser={this.props.onSaveUser.bind(this)}
                                        onUpdatePassword={this.onUpdatePassword.bind(this)}
                                        onCloseUpdatePasswordModal={this.onCloseUpdatePasswordModal.bind(this)}
                                        getAllUsers={this.getAllUsers.bind(this)} />
                                }
                            </div>
                        </Paper>
                    </div>
                </div>
                <AddEditUser open={addUserState} users={{
                    UserId: '',
                    'FirstName': '',
                    'LastName': '',
                    'UserEmailId': '',
                    'UserPhone': '',
                    'UserPassword': '',
                    'IsSuperAdmin': false,
                    'IsActive': true,
                    userid: '',
                }}
                    onCloseUserModal={this.onCloseUserModal.bind(this)}
                    onSaveUser={this.onSaveUser.bind(this)}
                    getAllUsers={this.getAllUsers.bind(this)}
                />

                <UpdatePassword open={updateUserState} users={{
                    UserId: '',
                    'UserPassword': '',
                    userid: '',
                    'FirstName': '',
                    'LastName': ''
                }}
                    onCloseUpdatePasswordModal={this.onCloseUpdatePasswordModal.bind(this)}
                    onUpdatePassword={this.onUpdatePassword.bind(this)}
                    getAllUsers={this.getAllUsers.bind(this)}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showMessage}
                    autoHideDuration={3000}
                    onClose={this.handleRequestUserClose}
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
            </div>
        );
    }
}

const mapStateToProps = ({ User }) => {
    return {
        userList: User.userList,
        dropDownName: User.dropDownName,
        dropDownValue: User.dropDownValue,
        dropdownOpen: User.dropdownOpen,
        SearchResult: User.SearchResult,
        searchName: User.searchName,
        addUserState: User.addUserState,
        updateUserState: User.updateUserState,
        alertMessage: User.alertMessage,
        showMessage: User.showMessage,
        IsActive: User.IsActive,
    }
};

export default connect(mapStateToProps, {
    getAllUsers,
    searchUser,
    userToggleDropDown,
    userSelectDropDown,
    userselectDropDownValue,
    onSearchUser,
    clearUserInput,
    onOpenUserModal,
    onCloseUserModal,
    onSaveUser,
    handleRequestUserClose,
    onUpdatePassword,
    onCloseUpdatePasswordModal,
    onOpenUpdatePasswordModal,
})(User);