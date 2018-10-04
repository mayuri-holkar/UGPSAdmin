import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

class AddEditUser extends React.Component {
    constructor(props) {
        super(props);
        const { UserId, FirstName, LastName, UserEmailId, UserPhone, UserPassword, IsSuperAdmin, ConfirmPassword, IsActive, userid } = props.users;
        this.state = {
            UserId,
            FirstName,
            LastName,
            UserPhone,
            UserEmailId,
            UserPassword,
            ConfirmPassword,
            IsSuperAdmin,
            IsActive,
            userid,
            passwordError: '',
            emailError: '',
            phoneError: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleMobileNoKeyUp = this.keyUpHandler.bind(this, 'UserPhone');
        this.handlePasswordKeyUp = this.keyUpHandler.bind(this, 'UserPassword');
        this.handleConfirmPasswordKeyUp = this.keyUpHandler.bind(this, 'ConfirmPassword');
        this.emailValidate = this.emailValidate.bind(this);
    }

    clear() {
        this.setState({
            UserId: '',
            FirstName: '',
            UserEmailId: '',
            LastName: '',
            UserPhone: '',
            UserPassword: '',
            ConfirmPassword: '',
            IsSuperAdmin: false,
            IsActive: true,
            passwordError: '',
            emailError: '',
            phoneError: ''
        });
    }

    handleChange(e) {
        var n = e.target.name;
        this.setState({ [e.target.name]: e.target.value },
            function () {
                this.emailValidate(n);
            });
    }

    keyUpHandler(refName, e) {
        if (refName == 'UserPhone') {
            if (e.target.value == '' || e.target.value.match(/^[0-9]+$/)) {
                this.setState({ phoneError: '' })
            }
            else {
                this.setState({ phoneError: 'Only digits are allowed' })
            }
        }
        if (refName == 'UserPassword' || refName == 'ConfirmPassword') {
            if ((this.state.UserPassword != this.state.ConfirmPassword) && this.state.ConfirmPassword) {
                this.setState({ passwordError: 'Password does not matched' })
            }
            else {
                this.setState({ passwordError: '' })
            }
        }
    }

    emailValidate(refName) {
        if (refName == 'UserEmailId') {
            let lastAtPos = this.state.UserEmailId.lastIndexOf('@');
            let lastDotPos = this.state.UserEmailId.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.UserEmailId.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.UserEmailId.length - lastDotPos) > 2) && this.state.UserEmailId != '') {
                this.setState({ emailError: "Please enter valid email" });
            } else {
                this.setState({ emailError: "" });
            }
        }
    }

    handleSubmit() {
        if (this.state.emailError == '' && this.state.passwordError == '' && this.state.phoneError=='') {
            this.props.onSaveUser(
                {
                    'UserId': this.state.UserId,
                    'FirstName': this.state.FirstName.trim(),
                    'LastName': this.state.LastName.trim(),
                    'UserPhone': this.state.UserPhone,
                    'UserEmailId': this.state.UserEmailId,
                    'UserPassword': this.state.UserPassword.trim(),
                    'IsSuperAdmin': this.state.IsSuperAdmin,
                    'IsActive': this.state.IsActive
                });
            this.props.onCloseUserModal();
            this.clear();
        }
    }

    render() {
        const { onCloseUserModal, open, users, onSaveUser } = this.props;
        const { UserId, FirstName, LastName, UserEmailId, UserPhone, UserPassword, ConfirmPassword, IsSuperAdmin, IsActive } = this.state;
        const AddEditoption = UserId ? true : false
        return (
            <Modal className="modal-box" toggle={onCloseUserModal} isOpen={open}>
                <ModalHeader className="modal-box-header bg-primary">
                    {users.UserId == '' ? "Add User" : "Edit " + users.FirstName + " " + users.LastName}
                    <IconButton className="text-white"
                        onClick={(event) => { onCloseUserModal(); this.clear(); }}>
                        <CloseIcon />
                    </IconButton>
                </ModalHeader>
                <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
                    <div className="modal-box-content d-flex flex-column">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label form="FirstName">First Name</label><span className="text-danger"> *</span>
                                    <input className="form-control form-control-md" name="FirstName" type="text" onChange={this.handleChange}
                                        value={this.state.FirstName} required="true" placeholder="First Name" maxLength="50" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label form="LastName">Last Name</label><span className="text-danger"> *</span>
                                    <input className="form-control form-control-md" name="LastName" type="text" onChange={this.handleChange}
                                        value={this.state.LastName} required="true" placeholder="Last Name" maxLength="50" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label form="UserPhone">User Phone</label><span className="text-danger"> *</span>
                                    <input className="form-control form-control-md" name="UserPhone" type="text" onChange={this.handleChange}
                                        value={this.state.UserPhone} required="true" placeholder="User Phone" maxLength="10" onKeyUp={this.handleMobileNoKeyUp} />
                                    <div className="style error">{this.state.phoneError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label form="UserEmailId">User Email</label><span className="text-danger"> *</span>
                                    <input className="form-control form-control-md" name="UserEmailId" type="text" onChange={this.handleChange}
                                        value={this.state.UserEmailId} required="true" placeholder="User Email" maxLength="50" />
                                    <div className="style error">{this.state.emailError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label form="UserPassword" hidden={AddEditoption}>Password</label><span className="text-danger" hidden={AddEditoption}> *</span>
                                    <input className="form-control form-control-md" name="UserPassword" type="password" onChange={this.handleChange}
                                        hidden={AddEditoption} value={this.state.UserPassword} required="true" placeholder="Password" maxLength="50" onKeyUp={this.handlePasswordKeyUp} />
                                </div>
                            </div>
                        </div>
                        {this.props.userid ? null :
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label form="ConfirmPassword">Confirm Password</label><span className="text-danger"> *</span>
                                        <input className="form-control form-control-md" name="ConfirmPassword" type="password" onChange={this.handleChange}
                                            hidden={AddEditoption} value={this.state.ConfirmPassword} required="true" placeholder="Confirm Password" maxLength="50" onKeyUp={this.handleConfirmPasswordKeyUp} />
                                        <div className="style error">{this.state.passwordError}</div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div>
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.IsSuperAdmin}
                                    onChange={(event) => this.setState({ IsSuperAdmin: event.target.checked })}
                                    value="IsSuperAdmin"
                                />}
                                label="IsSuperAdmin"
                            />
                            <FormControlLabel control={
                                <Checkbox
                                    checked={this.state.IsActive}
                                    onChange={(event) => this.setState({ IsActive: event.target.checked })}
                                    value="IsActive"
                                    defaultChecked
                                />}
                                label="IsActive"
                            />
                        </div>
                    </div>
                    <div className="modal-box-footer d-flex flex-row">
                        <div>
                            <Button color="primary" type="submit" className="jr-btn" raised >Save</Button>
                            <Button color="default" className="jr-btn" onClick={() => {
                                if (UserId) {
                                    this.setState({
                                        UserId: this.props.users.UserId,
                                        FirstName: this.props.users.FirstName,
                                        LastName: this.props.users.LastName,
                                        UserPhone: this.props.users.UserPhone,
                                        UserEmailId: this.props.users.UserEmailId,
                                        UserPassword: this.props.users.UserPassword,
                                        IsSuperAdmin: this.props.users.IsSuperAdmin,
                                        IsActive: this.props.users.IsActive
                                    });
                                }
                                else
                                    this.clear();
                                this.props.onCloseUserModal();
                            }} raised>Discard</Button>
                        </div>
                    </div>
                </ValidatorForm>
            </Modal>
        );
    }
}
export default AddEditUser;