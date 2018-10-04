import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Settings from './Settings';
import CommitteeMember from "./CommitteeMember";
import Member from "./Member";
import EventManagement from "./EventManagement";
import User from "./User";
import UserModule from "./UserModule";
import Advertisement from "./Advertisement";
import BannersManagement from "./BannersManagement"

const reducers = combineReducers({
    routing: routerReducer,
    settings: Settings,
    Member: Member,
	CommitteeMember: CommitteeMember,
    EventManagement: EventManagement,
    User: User,
    UserModule: UserModule,
    Advertisement: Advertisement,
    BannersManagement:BannersManagement
});

export default reducers;
