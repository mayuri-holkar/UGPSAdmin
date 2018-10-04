import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import { Badge } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class UserDetailCell extends React.Component {
    constructor() {
        super();
        this.state = {
            addMemberState: false
        }
    }

    onEdit = () => {
        this.setState({ addMemberState: true });
    }

    render() {
        const { addMemberState } = this.state;
        const { MemberId, FullName, SurName, IsActive, Email, FileNameInFolder } = this.props.data;
        var nodeURL = this.props.url;
        var memberImage = FileNameInFolder != "" ? nodeURL + '/getMemberPhoto/' + MemberId + '/' + FileNameInFolder : nodeURL + "/defaultImage";
        const active = IsActive ? "Active" : "Inactive";
        const IsActiveStyle = IsActive ? "text-white bg-success" : "text-white bg-danger";

        return (
            <tr
                tabIndex={-1}
                key={MemberId}>
                <td>
                    <div className="user-profile d-flex flex-row align-items-center">
                        <Avatar
                            alt={FullName}
                            src={memberImage}
                            className="user-avatar avatar-shadow mr-2"
                        />
                        <div className="user-detail">
                            <h4 className="user-name text-capitalize">{FullName} {SurName} </h4>
                            <p className="user-description">{Email}</p>
                        </div>
                    </div>
                </td>
                <td className="text-right">
                    <Badge className="d-block text-uppercase text-white" href="javascript:void(0)" color={IsActiveStyle}>{active}</Badge>
                </td>
                <td className="text-right ">
                    <IconButton className="size-30"><i className="zmdi zmdi-more-vert" onClick={this.onEdit} id="editicon"></i></IconButton>
                </td>
                {addMemberState ?
                    <Redirect to={{
                        pathname: '/app/member/edit/' + (MemberId),
                    }} />
                    :
                    null
                }
            </tr>
        );

    }
}

export default UserDetailCell;