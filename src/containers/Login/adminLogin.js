import React from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Button from 'material-ui/Button';
import { FormControlLabel } from 'material-ui/Form';
import Snackbar from 'material-ui/Snackbar';
import { Redirect } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import history from '../../index';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UserEmailId: '',
            UserPassword: '',
            isLoggedIn: false,
            snackbarOpen: false,
            vertical: 'top',
            horizontal: 'center'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = () => {
        const { UserEmailId, UserPassword } = this.state;
        fetch(nodeUrl+"/login/" + UserEmailId + "&" + UserPassword).then((Response) => Response.json())
            .then((result) => {
                if (result) {
                        if (result.IsActive == true) {
                            this.setState({ isLoggedIn: true });
                            if (result.token) {
                                localStorage.setItem('user', JSON.stringify(result));
                                localStorage.setItem('UserFirstName', JSON.stringify(result.FirstName));
                                localStorage.setItem('UserLastName', JSON.stringify(result.LastName));
                                localStorage.setItem('UserId', JSON.stringify(result.UserId))
                                history.push("/app/dashboard/default");
                            }
                        } else {
                            this.setState({ snackbarOpen: true });
                        }
                    }
                    else {
                        this.setState({ snackbarOpen: true });
                    }
                })
            .catch((err) => {
                this.setState({ snackbarOpen: true });
            });
    }

    handleRequestClose = () => {
        this.setState({
            snackbarOpen: false,
        });
    };

    render() {
        const { vertical, horizontal, snackbarOpen } = this.state;
        return (
            <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
                <div className="app-login-main-content">
                    <div className="app-logo-content d-flex align-items-center justify-content-center" >
                        <div to="/" title="Jambo">
                            <img src={nodeUrl + "/adminLogo"} alt="jambo" title="jambo" height="380px" width="268px"/> 
                        </div>
                    </div>
                    <div className="app-login-content">
                        <div className="app-login-header mb-4">
                            <h1>Login </h1>
                        </div> 
                        <div className="app-login-form">
                            <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                                <fieldset>
                                    <TextValidator
                                        label="Email"
                                        fullWidth
                                        name="UserEmailId"
                                        type="text"
                                        margin="normal"
                                        value={this.state.UserEmailId}
                                        onChange={this.handleChange}
                                        validators={['isEmail', 'required']}
                                        errorMessages={['This field must be a valid email address', 'This field is required']}
                                    />
                                    <TextValidator
                                        label="Password"
                                        fullWidth
                                        type="password"
                                        name="UserPassword"
                                        margin="normal"
                                        value={this.state.UserPassword}
                                        onChange={this.handleChange}
                                        validators={['required']}
                                        errorMessages={['This field is required']}
                                    />
                                    <div className="mt-1 mb-2 d-flex justify-content-between align-items-center">
                                        <FormControlLabel control={<Checkbox value="gilad" />} label="Remember me" />
                                    </div>
                                    <div className="mt-1 mb-2 d-flex justify-content-between align-items-center">
                                        <Button type="submit" className="btn jr-btn-rounded text-white btn-primary bg-primary btn-rounded">SIGN IN</Button>
                                        <div className="app-social-block my-1 my-sm-3">
                                            <ul className="social-link">
                                                <li>
                                                    <IconButton className="icon">
                                                        <i className="zmdi zmdi-facebook" />
                                                    </IconButton>
                                                </li>
                                                <li>
                                                    <IconButton className="icon">
                                                        <i className="zmdi zmdi-twitter" />
                                                    </IconButton>
                                                </li>
                                                <li>
                                                    <IconButton className="icon">
                                                        <i className="zmdi zmdi-google-plus" />
                                                    </IconButton>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </fieldset>
                            </ValidatorForm>
                        </div>
                    </div>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={this.state.snackbarOpen}
                    message="Invalid username or password"
                    autoHideDuration={3000}
                    onClose={this.handleRequestClose}
                />
            </div>
        )
    }
};
export default Login;