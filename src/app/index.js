import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import 'jquery-slimscroll/jquery.slimscroll.min';
import {toggleCollapsedNav} from 'actions/index';
import Header from "components/Header/index";
import Sidebar from 'containers/SideNav/index';
import Footer from 'components/Footer';
import Tour from "../components/Tour/index";
import MembersList from './routes/Member/MemberList/index'
import { COLLAPSED_DRAWER, FIXED_DRAWER } from 'constants/ActionTypes';
import ColorOption from "containers/Customizer/ColorOption";
import Member from './routes/Member/AddEditMember/index'
import CommitteeMember from "app/routes/CommitteeMember";
import EventManagement from './routes/EventManagement/EventList/index';
import Dashboard from './routes/dashboard';
import Event from './routes/EventManagement/AddEditEvent/index';
import EventPhotos from './routes/EventManagement/AddEditEventPhotos/index';
import Advertisements from './routes/Advertisements/AddEditAdvertisement/index';
import AdvertisementListing from './routes/Advertisements/AdvertisementListing/index';
import User from './routes/User';
import ManageUserRoles from './routes/ManageRoles/index';
import BannerManagement from './routes/BannerManagement/BannerListing/index'
import BannerAddEdit from './routes/BannerManagement/AddEditBanners/index'

class App extends React.Component {
    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    render() {
        const { match, drawerType } = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? "fixed-drawer" : drawerType.includes(COLLAPSED_DRAWER) ? "collapsible-drawer" : "mini-drawer";
        return (
            <div className={`app-container ${drawerStyle}`}>
                <Tour />
                <Sidebar onToggleCollapsedNav={this.onToggleCollapsedNav.bind(this)} />
                <div className="app-main-container">
                    <Header drawerType={drawerType} onToggleCollapsedNav={this.onToggleCollapsedNav} />
                    <main className="app-main-content-wrapper">
                        <div className="app-main-content">                      
                            <Route path={`${match.url}/dashboard`} component={Dashboard}/>                                        
							<Route path={`${match.url}/CommitteeMember`} component={CommitteeMember} />
                            <Route path={`${match.url}/user`} component={User} />
                            <Route path={`${match.url}/member/add`} component={Member} />
                            <Route path={`${match.url}/member/edit/:id`} component={Member} />
                            <Route path={`${match.url}/memberslist`} component={MembersList} />
                            <Route path={`${match.url}/EventManagement`} component={EventManagement} />
                            <Route path={`${match.url}/Event/add`} component={Event} />
                            <Route path={`${match.url}/Event/edit/:id`} component={Event} />
                            <Route path={`${match.url}/Event/photoUpload/:id`} component={EventPhotos} />
                            <Route path={`${match.url}/Advertisements/add`} component={Advertisements} />
                            <Route path={`${match.url}/Advertisements/edit/:id`} component={Advertisements} />
                            <Route path={`${match.url}/ManageRoles`} component={ManageUserRoles} />
                            <Route path={`${match.url}/AdvertisementsListing`} component={AdvertisementListing} />
                            <Route path={`${match.url}/BannerManagementListing`} component={BannerManagement} />
                            <Route path={`${match.url}/BannerManagement/add`} component={BannerAddEdit} />
                            <Route path={`${match.url}/BannerManagement/edit/:id`} component={BannerAddEdit} />
                        </div>
                    </main>
                    <Footer />
                </div>
                <ColorOption />
            </div>
        );
    }
}

const mapStateToProps = ({ settings }) => {
    const { navCollapsed, drawerType } = settings;
    return { navCollapsed, drawerType }
};

export default withRouter(connect(mapStateToProps, { toggleCollapsedNav })(App));