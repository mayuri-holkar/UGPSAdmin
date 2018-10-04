import React from 'react';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Menu, {MenuItem} from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import Tooltip from 'material-ui/Tooltip';

class MemberCell extends React.Component {
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
        const { member } = this.props;
        const { FullName, FatherName, SurName, Address, HomePhone, MobileNo, GrandFatherName, Gol,
            MulVatan } = this.props.member;
        return (
            <TableRow>
                <TableCell>{FullName}</TableCell>
                <TableCell>{FatherName}</TableCell>
                <TableCell>{SurName}</TableCell>
                <TableCell>{Address}</TableCell>
                <TableCell>{HomePhone}</TableCell>
                <TableCell>{MobileNo}</TableCell>
                <TableCell>{GrandFatherName}</TableCell>
                <TableCell>{Gol}</TableCell>
                <TableCell>{MulVatan}</TableCell>
                <TableCell className="text-center" >
                    <Tooltip id="tooltip-icon" title="Edit Member" placement="bottom">
                        <i className="zmdi zmdi-edit zmdi-hc-x" onClick={this.onEdit} id="editicon" ></i>
                    </Tooltip>
                </TableCell> 
                {addMemberState ?
                    <Redirect to={{
                        pathname: '/app/member/edit/' + (this.props.member.MemberId),
                    }} />
                    :
                    null
                }
            </TableRow>
        );
    }
}
export default MemberCell;

