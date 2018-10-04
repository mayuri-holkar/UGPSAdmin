import React from 'react';
import Avatar from 'material-ui/Avatar'
import Menu, { MenuItem } from 'material-ui/Menu';
import { Redirect } from 'react-router-dom';

class UserInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogout: false,
            anchorEl: null,
            open: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
    }

    handleSubmit = () => {
		this.setState({ isLogout: true })
        localStorage.removeItem('user');
        localStorage.removeItem('UserFirstName');
        localStorage.removeItem('UserLastName');
    }

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const FirstName = JSON.parse(localStorage.getItem('UserFirstName'));
        const LastName = JSON.parse(localStorage.getItem('UserLastName'));
        return (
            <div className="user-profile d-flex flex-row align-items-center">
                <Avatar
                    alt='...'
                    src='http://via.placeholder.com/256x256'
                    className="user-avatar "
                />
                <div className="user-detail">
                    <h4 className="user-name" onClick={this.handleClick}>{FirstName} {LastName}<i
                        className="zmdi zmdi-caret-down zmdi-hc-fw align-middle" />
                    </h4>
                </div>
                <Menu className="user-info"
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onClose={this.handleRequestClose}
                    PaperProps={{
                        style: {
                            width: 120,
                            paddingTop: 0,
                            paddingBottom: 0
                        }
                    }}
                >
                    <MenuItem onClick={this.handleRequestClose}><i
                        className="zmdi zmdi-account zmdi-hc-fw mr-2" />
                        Profile </MenuItem>
                    <MenuItem onClick={this.handleSubmit} ><i
                        className="zmdi zmdi-sign-in zmdi-hc-fw mr-2" />Logout
                    </MenuItem>
					{this.state.isLogout ?
						<Redirect to="/login" />
						:
						null
					}
                </Menu>
            </div>
        );
    }
}

export default UserInfo;

