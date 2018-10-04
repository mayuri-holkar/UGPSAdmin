import React from 'react';
import Button from 'material-ui/Button';
import 'jquery-slimscroll/jquery.slimscroll.min';
import Snackbar from 'material-ui/Snackbar';
import CommitteeList from 'components/CommitteeMember/CommitteeList/index';
import AddCommitteeMember from "components/CommitteeMember/AddCommitteeMember/index";
import SearchBox from "components/SearchBox/index";
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import { connect } from 'react-redux';
import {
    getCommitteeMember,
    displayCommitteeMember,
    searchCommitteeMember,
    onOpenCommitteeMemberModal,
    onCloseCommitteeMemberModal,
    onSaveCommitteeMember,
    handleRequestCommitteeClose,
    onDeleteCommitteeMember,
    committeeMemberToggleDropDown,
    committeeMemberSelectDropDown,
    committeeMemberSelectDropDownValue,
    search,
    committeeMemberClearInput,
    committeeMemberClearAll,
    getAllDesignation
} from 'actions/CommitteeMember';
import { getMembers } from 'actions/Members';
import { Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, InputGroupDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Style from './Style.scss';

class CommitteeMember extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getCommitteeMember();
        this.props.committeeMemberClearAll();
    }
    componentDidMount() {
        this.getMembers();
        this.getAllDesignation();
    }

    getCommitteeMember() {
        this.props.getCommitteeMember();
    }

    getMembers() {
        this.props.getMembers();
    }

    getAllDesignation() {
        this.props.getAllDesignation();
    }

    onChange(event) {
        this.props.displayCommitteeMember(event.target.value);
    }

    onClick() {
        this.props.onOpenCommitteeMemberModal();
    }

    handleRequestCommitteeClose = () => {
        this.props.handleRequestCommitteeClose();
    }

    onCloseCommitteeMemberModal = () => {
        this.props.onCloseCommitteeMemberModal();
    }

    onSaveCommitteeMember = (CommitteeMember) => {
        this.props.onSaveCommitteeMember(CommitteeMember);
    }

    onDeleteCommitteeMember = (CommitteeMember) => {
        this.props.onDeleteCommitteeMember(CommitteeMember);
    }

    toggleDropDown = () => {
        this.props.committeeMemberToggleDropDown();
    }

    selectDropDown = (event) => {
        this.props.committeeMemberSelectDropDown(event);
        this.props.committeeMemberSelectDropDownValue(event);
    }

    handleSubmit = (event) => {
        this.props.search();
    }

    clearInput = () => {
        this.props.committeeMemberClearInput();
    }

    render() {
        const { memberList, designation, searchMember, searchResult, addCommitteeMemberState, alertMessage, showMessage, dropDownName, dropdownOpen, MemberList } = this.props;
        return (
            <div className="app-wrapper">
                <div className="row">
                    <div className="col-md-12">
                        <div className="page-heading d-sm-flex align-items-sm-center" id="pageHeading">
                            <div className="col-md-7">
                                <h2 className="title mb-3 mb-sm-0">Committee Members</h2>
                            </div>
                            <div className="col-md-5">
                                <div className="input-group align-items-sm-right" >
                                    <InputGroup>
                                        <Dropdown isOpen={dropdownOpen} toggle={this.toggleDropDown.bind(this)} id="d1">
                                            <DropdownToggle color="primary" caret id="FieldName">
                                                {dropDownName}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem value="CommitteeMemberData.FullName" onClick={this.selectDropDown.bind(this)}>Member Name</DropdownItem>
                                                <DropdownItem value="DesignationData.Designation" onClick={this.selectDropDown.bind(this)}>Designation</DropdownItem>
                                                <DropdownItem value="CommitteeMemberData.Email" onClick={this.selectDropDown.bind(this)}>Email Id</DropdownItem>
                                                <DropdownItem value="CommitteeMemberData.Address" onClick={this.selectDropDown.bind(this)}>Address</DropdownItem>
                                                <DropdownItem value="CommitteeMemberData.MobileNo" onClick={this.selectDropDown.bind(this)}>Phone</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Input id="searchName" type="text" value={searchMember}
                                            placeholder="Search here.." ref="searchName" name="searchName" onChange={this.onChange.bind(this)} />
                                        <InputGroupAddon addonType="append"><Button raised className="btn bg-primary" id="search" disabled={!searchMember} type="submit" onClick={this.handleSubmit.bind(this)}  > <i className="zmdi zmdi-search zmdi-hc-fw" /> </Button></InputGroupAddon>
                                        <InputGroupAddon addonType="append"><Button disabled={!searchMember} onClick={this.clearInput.bind(this)} className="btn bg-danger " id="cancel"> <i className="zmdi zmdi-close zmdi-hc-fw" /></Button></InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button className="btn jr-btn-rounded text-white btn-primary bg-primary btn-rounded " onClick={this.onClick.bind(this)} style={{ marginBottom: '10px', marginTop: '10px', width:'180px' }}>
                        Add Committee Member
                </Button>
                </div>
                <div>
                    <Paper>
                        <div className="jr-card">
                            {memberList.length === 0 ?
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    {searchResult}
                                </div>
                                :
                                <CommitteeList data={memberList}
                                    designation={designation}
                                    onCloseCommitteeMemberModal={this.onCloseCommitteeMemberModal.bind(this)}
                                    onSaveCommitteeMember={this.props.onSaveCommitteeMember.bind(this)}
                                    getCommitteeMember={this.getCommitteeMember.bind(this)}
                                    onDeleteCommitteeMember={this.onDeleteCommitteeMember.bind(this)}
                                    getAllDesignation={this.getAllDesignation.bind(this)}/>
                            }
                        </div>
                    </Paper>
                </div>
                <AddCommitteeMember open={addCommitteeMemberState} committeeMember={{
                    CommitteeMemberId: '',
                    'MemberId': '',
                    'CommitteeMemberDesignation': '',
                }}
                    MemberList={MemberList}
                    designation={designation}
                    onCloseCommitteeMemberModal={this.onCloseCommitteeMemberModal.bind(this)}
                    onSaveCommitteeMember={this.onSaveCommitteeMember.bind(this)}
                    getCommitteeMember={this.getCommitteeMember.bind(this)}
                    getAllDesignation={this.getAllDesignation.bind(this)}
                    getMembers={this.getMembers.bind(this)}
                />
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showMessage}
                    autoHideDuration={3000}
                    onClose={this.handleRequestCommitteeClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{alertMessage}</span>}
                    action={[
                        <Button fab className="jr-btn-fab-sm bg-success text-white">
                            <i className="zmdi zmdi-thumb-up zmdi-hc-fw" />
                        </Button>
                    ]}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ CommitteeMember, Member }) => {
    return {
        memberList: CommitteeMember.memberList,
        searchMember: CommitteeMember.searchMember,
        searchResult: CommitteeMember.searchResult,
        addCommitteeMemberState: CommitteeMember.addCommitteeMemberState,
        alertMessage: CommitteeMember.alertMessage,
        showMessage: CommitteeMember.showMessage,
        dropdownOpen: CommitteeMember.dropdownOpen,
        dropDownName: CommitteeMember.dropDownName,
        MemberList: Member.MemberList,
        designation: CommitteeMember.designation
    }
};

export default connect(mapStateToProps, {
    getCommitteeMember,
    displayCommitteeMember,
    searchCommitteeMember,
    onOpenCommitteeMemberModal,
    onCloseCommitteeMemberModal,
    onSaveCommitteeMember,
    handleRequestCommitteeClose,
    onDeleteCommitteeMember,
    committeeMemberToggleDropDown,
    committeeMemberSelectDropDown,
    committeeMemberSelectDropDownValue,
    search,
    committeeMemberClearInput,
    committeeMemberClearAll,
    getMembers,
    getAllDesignation
})(CommitteeMember);