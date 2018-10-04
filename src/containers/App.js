import React, { Component } from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MainApp from 'app/index';
import Login from 'containers/Login/adminLogin';
import 'react-big-calendar/lib/less/styles.less';
import 'styles/bootstrap.scss'
import 'styles/app.scss';
import indigoTheme from 'containers/themes/indigoTheme';
import cyanTheme from 'containers/themes/cyanTheme';
import orangeTheme from 'containers/themes/orangeTheme';
import amberTheme from 'containers/themes/amberTheme';
import pinkTheme from 'containers/themes/pinkTheme';
import blueTheme from 'containers/themes/blueTheme';
import purpleTheme from 'containers/themes/purpleTheme';
import greenTheme from 'containers/themes/greenTheme';
import darkTheme from 'containers/themes/darkTheme';
import {
	AMBER,
	BLUE,
	CYAN,
	DARK_AMBER,
	DARK_BLUE,
	DARK_CYAN,
	DARK_DEEP_ORANGE,
	DARK_DEEP_PURPLE,
	DARK_GREEN,
	DARK_INDIGO,
	DARK_PINK,
	DEEP_ORANGE,
	DEEP_PURPLE,
	GREEN,
	INDIGO,
	PINK
} from "constants/ThemeColors";
import { PrivateRoute } from '../app/routes/PrivateRoute/PrivateRoute';
class App extends Component {
	getColorTheme(themeColor, applyTheme) {
		switch (themeColor) {
			case INDIGO: {
				applyTheme = createMuiTheme(indigoTheme);
				break;
			}
			case CYAN: {
				applyTheme = createMuiTheme(cyanTheme);
				break;
			}
			case AMBER: {
				applyTheme = createMuiTheme(amberTheme);
				break;
			}
			case DEEP_ORANGE: {
				applyTheme = createMuiTheme(orangeTheme);
				break;
			}
			case PINK: {
				applyTheme = createMuiTheme(pinkTheme);
				break;
			}
			case BLUE: {
				applyTheme = createMuiTheme(blueTheme);
				break;
			}
			case DEEP_PURPLE: {
				applyTheme = createMuiTheme(purpleTheme);
				break;
			}
			case GREEN: {
				applyTheme = createMuiTheme(greenTheme);
				break;
			}
			case DARK_INDIGO: {
				applyTheme = createMuiTheme(indigoTheme);
				break;
			}
			case DARK_CYAN: {
				applyTheme = createMuiTheme(cyanTheme);
				break;
			}
			case DARK_AMBER: {
				applyTheme = createMuiTheme(amberTheme);
				break;
			}
			case DARK_DEEP_ORANGE: {
				applyTheme = createMuiTheme(orangeTheme);
				break;
			}
			case DARK_PINK: {
				applyTheme = createMuiTheme(pinkTheme);
				break;
			}
			case DARK_BLUE: {
				applyTheme = createMuiTheme(blueTheme);
				break;
			}
			case DARK_DEEP_PURPLE: {
				applyTheme = createMuiTheme(purpleTheme);
				break;
			}
			case DARK_GREEN: {
				applyTheme = createMuiTheme(greenTheme);
				break;
			}
		}
		return applyTheme;
	}

	render() {
		const { match, location, themeColor, isDarkTheme } = this.props;
		if (location.pathname == '/') {
			let user = JSON.parse(localStorage.getItem('user'));
			if (user && user.token) {
				return <Redirect to={'app/dashboard/default'} />
			}
			else {
				return <Redirect to={'/login'} />
			}

		}
		let applyTheme = createMuiTheme(indigoTheme);
		if (isDarkTheme) {
			applyTheme = createMuiTheme(darkTheme)
		} else {
			applyTheme = this.getColorTheme(themeColor, applyTheme);
		}
		return (
			<MuiThemeProvider theme={applyTheme}>
				<div className="app-main">
					<PrivateRoute path={`${match.url}app`} component={MainApp} />
					<Route path={`${match.url}login`} component={Login} />
				</div>
			</MuiThemeProvider>
		);
	}
}

const mapStateToProps = ({ settings }) => {
	const { themeColor, sideNavColor, darkTheme } = settings;
	return { themeColor, sideNavColor, isDarkTheme: darkTheme }
};

export default connect(mapStateToProps)(App);