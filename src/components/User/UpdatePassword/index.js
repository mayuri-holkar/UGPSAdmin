import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';
import { authHeader } from '../../../Headers/index';

class UpdatePassword extends React.Component {
    constructor(props) {
        super(props);
        const { UserId, userid, FirstName, LastName } = props.users;
        this.state = {
            UserId,
            UserPassword: '',
            ConfirmPassword: '',
            FirstName,
            LastName,
            passwordError: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handlePasswordKeyUp = this.keyUpHandler.bind(this, 'UserPassword');
        this.handleConfirmPasswordKeyUp = this.keyUpHandler.bind(this, 'ConfirmPassword');
    }

    clear() {
        this.setState({
            UserId: '',
            UserPassword: '',
            ConfirmPassword: '',
            passwordError: ''
        });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    keyUpHandler(refName, e) {
        if (refName == 'UserPassword' || refName == 'ConfirmPassword') {
            if ((this.state.UserPassword != this.state.ConfirmPassword) && this.state.ConfirmPassword) {
                this.setState({ passwordError: 'Password does not matched' })
            }
            else {
                this.setState({ passwordError: '' })
            }
        }
    }

    handleSubmit() {
        if (this.state.passwordError == '') {
            this.props.onUpdatePassword(
                {
                    'UserId': this.state.UserId,
                    'UserPassword': this.state.UserPassword.trim()
                });
            this.clear();
            this.props.onCloseUpdatePasswordModal();
        }
    }

    render() {
        const { onCloseUpdatePasswordModal, open, users, onUpdatePassword } = this.props;
        const { UserId, UserPassword, ConfirmPassword } = this.state;
        return (
            <Modal className="modal-box" toggle={onCloseUpdatePasswordModal} isOpen={open}>
                <ModalHeader className="modal-box-header bg-primary">
                    {users.UserId == '' ? null : "Update Password" + " " + this.state.FirstName + " " + this.state.LastName}
                    <IconButton className="text-white"
                        onClick={(event) => { onCloseUpdatePasswordModal(); this.clear(); }}>
                        <CloseIcon />
                    </IconButton>
                </ModalHeader>
                <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
                    <div className="modal-box-content d-flex flex-column">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label form="UserPassword">Password</label><span className="text-danger"> *</span>
                                    <input className="form-control form-control-md" name="UserPassword" type="password" onChange={this.handleChange}
                                        value={this.state.UserPassword} required="true" placeholder="Password" maxLength="50" onKeyUp={this.handlePasswordKeyUp} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label form="ConfirmPassword">Confirm Password</label><span className="text-danger"> *</span>
                                    <input className="form-control form-control-md" name="ConfirmPassword" type="password" onChange={this.handleChange}
                                        value={this.state.ConfirmPassword} required="true" placeholder="Confirm Password" maxLength="50" onKeyUp={this.handleConfirmPasswordKeyUp} />
                                    <div className="style error">{this.state.passwordError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-box-footer d-flex flex-row">
                            <div>
                                <Button color="primary" type="submit" className="jr-btn" raised >Save</Button>
                                <Button color="default" className="jr-btn" onClick={() => {
                                    this.clear();
                                    this.props.onCloseUpdatePasswordModal();
                                }} raised>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </ValidatorForm>
            </Modal>
        );
    }
}
export default UpdatePassword;