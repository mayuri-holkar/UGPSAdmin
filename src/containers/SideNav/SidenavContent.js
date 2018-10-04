import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'material-ui/Button';
import 'jquery-slimscroll/jquery.slimscroll.min';
import { authHeader } from '../../Headers/index';
import history from '../../../src/index';

class SideNavContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemUserId: JSON.parse(localStorage.getItem('UserId')),
            data: [],
            systemUserData: [],
            memberHide: true,
            eventHide: true,
            committeeHide: true,
            advertisementHide: true,
            manageRolesHide: true,
            isUpdatedProps: false,
            userHide: true
        }
        this.getUserModulesById = this.getUserModulesById.bind(this);
        this.hideMenues = this.hideMenues.bind(this);
    }

    componentWillMount() {
        this.getUserModulesById();
        this.getSystemUserById();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps) {
            this.setState({ isUpdatedProps: true })
            this.hideMenues()
        }
    }

    hideMenues() {
        for (let i = 0; i < this.state.data.length; i++) {
            if (this.state.data[i].SecurityModuleId == 1 && this.state.data[i].IsActive == true) {
                this.setState({ memberHide: false })
            }
            if (this.state.data[i].SecurityModuleId == 2 && this.state.data[i].IsActive == true) {
                this.setState({ committeeHide: false })
            }
            if (this.state.data[i].SecurityModuleId == 3 && this.state.data[i].IsActive == true) {
                this.setState({ eventHide: false })
            }
            if (this.state.data[i].SecurityModuleId == 4 && this.state.data[i].IsActive == true) {
                this.setState({ advertisementHide: false })
            }
        }
        if (this.state.systemUserData[0].IsSuperAdmin == true) {
            this.setState({ memberHide: false, committeeHide: false, eventHide: false, advertisementHide: false, manageRolesHide: false, userHide: false })
        }
    }

    componentDidMount() {
        this.getSystemUserById();
        const { history } = this.props;
        const nav = $(this.nav);
        const slideDuration = 250;
        nav.slimscroll({
            height: '100%'
        });
        const pathname = `#${history.location.pathname}`;
        $("ul.nav-menu > li.menu").click(function () {
            const menuLi = this;
            $("ul.nav-menu > li.menu").not(menuLi).removeClass("open");
            $("ul.nav-menu > li.menu ul").not($("ul", menuLi)).slideUp(slideDuration);
            $("> ul", menuLi).slideToggle(slideDuration);
            $(menuLi).toggleClass("open");
        });

        $("ul.sub-menu li").click(function (e) {
            let superSubMenu = $(this).parent();
            if (superSubMenu.parent().hasClass("active")) {
                $("li", superSubMenu).not($(this)).removeClass("active");
            }
            else {
                $("ul.sub-menu li").not($(this)).removeClass("active");
            }
            $(this).toggleClass("active");
            e.stopPropagation();
        });

        const activeLi = $('a[href="' + pathname + '"]');
        const activeNav = activeLi.closest("ul");
        if (activeNav.hasClass("sub-menu")) {
            activeNav.slideDown(slideDuration);
            activeNav.parent().addClass("open");
            activeLi.parent().addClass("active");
        } else {
            activeLi.parent().addClass("open");
        }
    }

    getUserModulesById() {
        fetch(nodeUrl+"/userModules/" + this.state.systemUserId, {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((Response) => Response.json())
            .then(res => {
                this.setState({ data: res, isUpdatedProps: true });
            });
    }

    getSystemUserById() {
        fetch(nodeUrl+"/systemuser/" + this.state.systemUserId, {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        })
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((Response) => Response.json())
            .then(res => {
                this.setState({ systemUserData: res, isUpdatedProps: true });
                this.hideMenues();
            });
    }

    render() {
        return (
            <div>
                {this.state.isUpdatedProps ?
                    <ul className="nav-menu" ref={(item) => {
                        this.nav = item;
                    }}>
                        <li className="menu no-arrow">
                            <Button href="#/app/dashboard/default"> <i className="zmdi zmdi-view-dashboard " />
                                <span className="nav-text">Dashboard</span>
                            </Button>
                        </li>
                        <li className="menu no-arrow">
                            <Button href="#/app/ManageRoles" hidden={this.state.manageRolesHide}>
                                <i className="zmdi zmdi-account" />
                                <span className="nav-text">Manage Roles</span>
                            </Button>
                        </li>
                        <li className="menu no-arrow">
                            <Button href="#/app/AdvertisementsListing" hidden={this.state.advertisementHide}>
                                <i className="zmdi zmdi-image" />
                                <span className="nav-text" >Advertisements</span>
                            </Button>
                        </li>

                        <li className="menu no-arrow">
                            <Button href="#/app/CommitteeMember" hidden={this.state.committeeHide}>
                                <i className="zmdi zmdi-account-box " />
                                <span className="nav-text" >Committee Member</span>
                            </Button>
                        </li>

                        <li className="menu no-arrow">
                            <Button href="#/app/EventManagement" hidden={this.state.eventHide}>
                                <i className="zmdi zmdi-calendar" />
                                <span className="nav-text">Event Management</span>
                            </Button>
                        </li>

                        <li className="menu no-arrow ">
                            <Button href="#/app/memberslist" hidden={this.state.memberHide} >
                                <i className="zmdi zmdi-account-circle" />
                                <span className="nav-text">Member</span>
                            </Button>
                        </li>

                        <li className="menu no-arrow">
                            <Button href="#/app/user" hidden={this.state.userHide}>
                                <i className="zmdi zmdi-account" />
                                <span className="nav-text">User</span>
                            </Button>
                        </li>

                        <li className="menu no-arrow">
                            <Button href="#/app/BannerManagementListing" hidden={this.state.userHide}>
                                <i className="zmdi zmdi-group" />
                                <span className="nav-text">Banner Management</span>
                            </Button>
                        </li>

                    </ul>
                    : null}
            </div>
        );
    }
}
export default withRouter(SideNavContent);

