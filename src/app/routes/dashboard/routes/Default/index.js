import React from 'react';
import IconButton from 'material-ui/IconButton';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis
} from 'recharts';
import ReportBox from "components/ReportBox/index";
import UserDetailTable from "components/dashboard/Common/UserDetailTable";
import {
    announcementsNotification,
    appNotification,
    latestPostList,
    marketingData,
    pieChartData,
    products
} from "app/routes/dashboard/routes/Default/data";
import Button from 'material-ui/Button';
import Statistics from "components/dashboard/default/Statistics";
import ContainerHeader from "components/ContainerHeader/index";
import CardMenu from "components/dashboard/Common/CardMenu";
import Team from "app/routes/extraPages/routes/aboutUs/Componets/Team";
import CardHeader from "components/dashboard/Common/CardHeader/index";
import { authHeader } from '../../../../../Headers/index';
import history from '../../../../../../src';
import moment from 'moment';
import image1 from '../Images/image1.png';
import image2 from '../Images/image2.png';
import image3 from '../Images/image3.png';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


class Default extends React.Component {
    onOptionMenuSelect = event => {
        this.setState({ menuState: true, anchorEl: event.currentTarget });
    };
    handleRequestClose = () => {
        this.setState({ menuState: false });
    };

    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            menuState: false,
            totalMember: '',
            totalFamilyMember: '',
            totalCommitteeMember: '',
            upcomingEvent: [],
            maleCount: 0,
            femaleCount: 0,
            members: [],
            totalEvents: ''
        }
    }

    componentWillMount() {
        var maleCount = 0;
        var femaleCount = 0;
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' }
        };

        fetch(nodeUrl + "/members/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then((result) => {
                for (var i = 0; i < result.length; i++) {
                    result[i].Gender == 'Male' ? maleCount++ : femaleCount++;
                }
                this.setState({ members: result.reverse(), totalMember: result.length, maleCount: maleCount, femaleCount: femaleCount });
            })
            .catch((err) => {
                console.log(err)
            });

        fetch(nodeUrl + "/familymembers/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then((result) => {
                this.setState({ totalFamilyMember: result.length });
            })
            .catch((err) => {
                console.log(err)
            });

        fetch(nodeUrl + "/committee/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then((result) => {
                this.setState({ totalCommitteeMember: result.length });
            })
            .catch((err) => {
                console.log(err)
            });

        fetch(nodeUrl + "/upcomingevents/", requestOptions)
            .then((response) => {
                if (!response.ok) {
                    history.push('/login');
                }
                else
                    return response;
            })
            .then((response) => response.json())
            .then((result) => {
                this.setState({
                    upcomingEvent: result, totalEvents: result.length
                })
            })
            .catch((err) => {
                console.log(err)
            });
    }

    toRedirect = () => {
        this.props.history.push('/app/EventManagement');
    }

    toRedirectMemberList = () => {
        this.props.history.push('/app/memberslist');
    }

    render() {
        const { anchorEl, menuState } = this.state;
        const data = this.state.upcomingEvent;
        var currentdate = new Date();
        var memberData = [];
        var count = 0;
        var nodeURL = nodeUrl;
        var chartDataMembers = [
            { name: 'Female', count: this.state.femaleCount },
            { name: 'Male', count: this.state.maleCount },
        ];
        return (
            <div className="dashboard animated slideInUpTiny animation-duration-3">
                <ContainerHeader match={this.props.match} title="Dashboard" />
                <div className="row">
                    <div className="col-xl-9 col-12">
                        <div className="row">
                            <div className="col-xl-8 col-lg-6 col-sm-7 col-12">
                                <div className="row">
                                    <div className="col-sm-6 col-12">
                                        <div className={`jr-card net-chart bg-primary`}>
                                            <div className="jr-card-thumb">
                                                <img className="img-fluid" src={image1} />
                                            </div>
                                            <div className="jr-card-body text-white br-break">
                                                <h3 className="mb-0 pl-3"><strong>{this.state.totalMember}</strong></h3>
                                                <p className="mb-0">Members </p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-12">
                                        <div className={`jr-card net-chart bg-cyan`}>
                                            <div className="jr-card-thumb">
                                                <img className="img-fluid" src={image2} />
                                            </div>
                                            <div className="jr-card-body text-white br-break">
                                                <h3 className="mb-0 pl-3"><strong>{this.state.totalFamilyMember}</strong></h3>
                                                <p className="mb-0">Family Members </p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6 col-sm-5 col-12">
                                <div className={`jr-card net-chart bg-blue`}>
                                    <div className="jr-card-thumb">
                                        <img className="img-fluid" src={image3} />
                                    </div>
                                    <div className="jr-card-body text-white br-break">
                                        <h3 className="mb-0 pl-3"><strong>{this.state.totalCommitteeMember}</strong></h3>
                                        <p className="mb-0">Committee Members </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-12">
                        <div className={`jr-card net-chart bg-teal`}>
                            <div className="jr-card-thumb">
                                <img className="img-fluid" src="http://www.totalevent.co.nz/wp-content/uploads/2018/06/Total_Event_Brandmark_RGB.png" />
                            </div>
                            <div className="jr-card-body text-white br-break">
                                <h3 className="mb-0 pl-3"><strong>{this.state.totalEvents}</strong></h3>
                                <p className="mb-0">Events </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-xl-4 col-lg-6 col-sm-7 col-12">
                        <div className="jr-card">
                            <CardHeader heading="New Members"
                                subHeading="4 new members" styleName="mb-2" />
                            <UserDetailTable data={this.state.members} url={nodeURL} />
                            <div className="py-3">
                                <a href="javascript:void(0)" className="card-link text-uppercase text-primary" onClick={this.toRedirectMemberList}>View All Members
                        </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-5 col-lg-6 col-sm-5 col-12">
                        <div className="jr-card">
                            <div className="jr-card-header d-flex">
                                <div className="mr-auto">
                                    <h3 className="card-heading"> Upcoming Events </h3>
                                </div>
                            </div>
                            <ul className="list-unstyled">
                                {this.state.upcomingEvent.map((latestPostList, index) => {
                                    if (moment(latestPostList.EventDate, "DD-MM-YYYY").format("YYYY-MM-DD") >= moment(currentdate, "DD-MM-YYYY").format("YYYY-MM-DD") && latestPostList.IsActive == true) {
                                        if (count < 3) {
                                            var eventImage = (latestPostList.EventWithPhoto.length > 0) ?
                                                nodeURL + "/getEventPhotos/" + latestPostList.EventId + '/' + latestPostList.EventWithPhoto[0].FileNameInFolder : nodeURL + "/defaultEventImage";
                                            var eventDetails = latestPostList.EventDescription.replace(/<{1}[^<>]{1,}>{1}/g, '');
                                            return (
                                                <li key={index} className="media media-list post-list" >
                                                    <div className="size-80 post-image mr-3">
                                                        <div className="grid-thumb-equal rounded">
                                                            <div className="grid-thumb-cover">
                                                                <img className="img-fluid rounded" src={eventImage} alt="user-image" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <h4 className="mt-0 mb-1">{latestPostList.EventName}</h4>
                                                        <p className="meta-date mb-1">{latestPostList.EventDate}</p>
                                                        <p>{eventDetails.length < 60 ? eventDetails.substr(0, 65) : eventDetails.substr(0, 65)+"..."}</p>
                                                    </div>
                                                </li>
                                            )
                                        }
                                        count++;
                                    }
                                }
                                )}
                            </ul>
                            <div className="py-3">
                                <a href="javascript:void(0)" className="card-link text-uppercase text-primary" onClick={this.toRedirect}>View All Events
                                    </a>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-3 col-12">
                        <ReportBox heading="Members Statstics" title="" detail="Members Statstics">
                            <BarChart data={chartDataMembers}>
                                <Tooltip />
                                <Bar dataKey='count' fill='#3f51b5' maxBarSize={30} />
                                <XAxis stroke="#3f51b5" dataKey="name" />
                            </BarChart>
                        </ReportBox>
                    </div>
                </div>
                
                <CardMenu menuState={menuState} anchorEl={anchorEl}
                    handleRequestClose={this.handleRequestClose.bind(this)} />

            </div>

        );
    }
}

export default Default;