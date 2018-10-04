import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import AddCommitteeMember from "components/CommitteeMember/AddCommitteeMember/index";
import SweetAlert from 'react-bootstrap-sweetalert';
import TableRow from 'material-ui/Table/TableRow';
import TableCell from 'material-ui/Table/TableCell';

class CommitteeCell extends React.Component {
    onCommitteeMemberOptionSelect = event => {
        this.setState({ menuState: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ menuState: false });
    };

    onCloseCommitteeMemberModal = () => {
        this.setState({ addCommitteeMemberState: false });
    };

    onEditContact = () => {
        this.setState({ menuState: false, addCommitteeMemberState: true });
    };

    onDisplay() {
        this.setState({
            isDelete: true
        })
    };

    onCancel = () => {
        this.setState({
            isDelete: false
        })
    };

    deleteFile = () => {
        this.setState({
            isDelete: false
        })
        this.props.onDeleteCommitteeMember(this.props.committeeMember);
    };

    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            menuState: false,
            addCommitteeMemberState: false,
            isDelete: false,
        }
    }

    render() {
        const options = [
            'Edit',
            'Delete'
        ];
        const ITEM_HEIGHT = 40;
        const { anchorEl, menuState, addCommitteeMemberState } = this.state;
        const { committeeMember, onSaveCommitteeMember, getCommitteeMember, getAllDesignation } = this.props;
        const { CommitteeMemberId, CommitteeMemberDesignation, MemberId, CommitteeMemberData, DesignationData } = this.props.committeeMember;
        return (
            <TableRow
                tabIndex={-1}
                key={CommitteeMemberId}
            >
                <TableCell>{CommitteeMemberData.FullName + " " + CommitteeMemberData.SurName}</TableCell>
                <TableCell>{DesignationData.Designation}</TableCell>
                <TableCell>{CommitteeMemberData.Email}</TableCell>
                <TableCell>{CommitteeMemberData.Address}</TableCell>
                <TableCell>{ CommitteeMemberData.MobileNo}</TableCell>
                <TableCell onClick={this.onCommitteeMemberOptionSelect}>
                    <IconButton>
                        <i className="zmdi zmdi-more-vert" />
                    </IconButton>
                </TableCell>

                <Menu id="long-menu"
                    anchorEl={anchorEl}
                    open={menuState}
                    onClose={this.handleRequestClose}
                    style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
                    MenuListProps={{
                        style: {
                            width: 100,
                        },
                    }}>
                    {options.map(option =>
                        <MenuItem key={option} onClick={() => {
                            if (option === 'Edit') {
                                this.onEditContact()
                            } else {
                                this.handleRequestClose();
                                this.onDisplay();
                            }
                        }
                        }>
                            {option}
                        </MenuItem>,
                    )}
                </Menu>
                {
                    addCommitteeMemberState &&
                    <AddCommitteeMember open={addCommitteeMemberState}
                        committeeMemberDesignation={this.props.committeeMember.DesignationData}
                        designation={this.props.designation}
                        committeeMember={this.props.committeeMember}
                        onCloseCommitteeMemberModal={this.onCloseCommitteeMemberModal}
                        onSaveCommitteeMember={onSaveCommitteeMember}
                        getCommitteeMember={getCommitteeMember}
                        getAllDesignation={getAllDesignation}
                    />
                }
                <SweetAlert show={this.state.isDelete}
                    warning
                    showCancel
                    confirmBtnText="Yes"
                    cancelBtnText="No"
                    confirmBtnBsStyle="danger"
                    cancelBtnBsStyle="default"
                    title="Are you sure?"
                    onConfirm={this.deleteFile}
                    onCancel={this.onCancel}
                >
                    You want to delete this record?
				</SweetAlert>
            </TableRow>
        );
    }
}

export default CommitteeCell;