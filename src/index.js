import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createHashHistory';
import {ConnectedRouter, routerMiddleware} from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import reducers from "./reducers";
import App from './containers/App';
import Page404 from 'app/routes/extraPages/routes/404';
 
const history = createHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk),(middleware)
);
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Switch>
				<Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
	</Provider>, document.getElementById('app-site'));
export default history;