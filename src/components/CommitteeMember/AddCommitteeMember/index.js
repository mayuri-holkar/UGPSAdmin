import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import '../Style.scss';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class AddCommitteeMember extends React.Component {
    constructor(props) {
        super(props);
        const { MemberList, designation, committeeMemberDesignation} = this.props
        const { CommitteeMemberId, CommitteeMemberDesignation, MemberId, CommitteeMemberData } = props.committeeMember;
        this.state = {
            CommitteeMemberId,
            MemberId,
            designationError: '',
            memberSelectError: '',
            FullName: CommitteeMemberId ?CommitteeMemberData.FullName : '',
            SurName: CommitteeMemberId ? CommitteeMemberData.SurName : '',
            memberId: CommitteeMemberId ? CommitteeMemberData.MemberId : '',
            IsActive: CommitteeMemberId ? CommitteeMemberData.IsActive : '',
            designation,
            CommitteeMemberDesignation: CommitteeMemberId ?committeeMemberDesignation.Designation:''
        }
    }

    clear() {
        this.setState({
            CommitteeMemberId: '',
            CommitteeMemberDesignation: '',
            MemberId: '',
            designationError: '',
            memberSelectError: ''
        });
    }

    handleSubmit() {
        if (this.state.MemberId == '') {
            this.setState({ memberSelectError: "This field is required" })
        }
        if (this.state.CommitteeMemberDesignation == '') {
            this.setState({ designationError: "This field is required" })
        }
        if (this.state.MemberId !== '' && this.state.CommitteeMemberDesignation !== '') {
            this.props.onCloseCommitteeMemberModal();
            this.props.onSaveCommitteeMember(
                {
                    'CommitteeMemberId': this.state.CommitteeMemberId,
                    'MemberId': this.state.MemberId,
                    'CommitteeMemberDesignation': this.state.CommitteeMemberDesignation,
                });
            this.clear();
        }
    }

    handleChangeMember = (MemberId) => {
        const value = MemberId === null ? '' : MemberId.value
        this.setState({ MemberId: value, memberSelectError: '' });
    }

    handleChangeDesignation = (CommitteeMemberDesignation) => {
        const value = CommitteeMemberDesignation === null ? '' : CommitteeMemberDesignation.value
        this.setState({ CommitteeMemberDesignation: value, designationError: '' });
    }

    render() {
        const { onCloseCommitteeMemberModal, open, committeeMember, onSaveCommitteeMember, getCommitteeMember, getMembers, MemberList, designation } = this.props;
        const { CommitteeMemberId, CommitteeMemberDesignation, MemberId, FullName, SurName, memberId, IsActive } = this.state;
        const editOption = CommitteeMemberId ? true : false;
        const submitDisable = this.props.committeeMember.MemberId ? (IsActive ? false : true) : false;
        const memberPlaceholder = editOption ? FullName + " " + SurName + "-" + memberId : 'Select Member';
        const designationPlaceholder = editOption ? CommitteeMemberDesignation: 'Select Designation';
        let optionsMember = [];
        {
            this.props.committeeMember.MemberId ? null :
                MemberList.map(member =>
                    member.IsActive ?
                        optionsMember.push({ label: member.FullName + " " + member.SurName + "-" + member.MemberId, value: member._id }) : null
                );
        }
        let optionDesignation = [];
        {
            editOption ?
                (IsActive == true ?
                    designation.map(designation =>
                        optionDesignation.push({ label: designation.Designation, value: designation.DesignationId })): null) :
                designation.map(designation =>
                    optionDesignation.push({ label: designation.Designation, value: designation.DesignationId })) 
        };
        return (
            <Modal className="modal-box" toggle={onCloseCommitteeMemberModal} isOpen={open}>
                <ModalHeader className="modal-box-header bg-primary">
                    {committeeMember.CommitteeMemberId == '' ? "Add Committee Member" : "Edit " + FullName + " " + SurName}
                    <IconButton className="text-white"
                        onClick={(event) => { onCloseCommitteeMemberModal(); this.clear(); }}>
                        <CloseIcon />
                    </IconButton>
                </ModalHeader>
                <ValidatorForm onSubmit={this.handleSubmit.bind(this)}>
                    <div className="modal-box-content d-flex flex-column">
                        <div className="style error"> {this.props.committeeMember.MemberId ? (IsActive ? null : <span className="style error"> This member is inactive</span>) : null}</div>
                        <br />
                        <InputLabel className="text-primary">Member<span className="text-danger"> *</span></InputLabel>
                        <br />
                        <FormControl className="w-100">
                            <Select
                                name="form-field-name"
                                value={this.state.MemberId}
                                onChange={this.handleChangeMember}
                                options={optionsMember}
                                placeholder={memberPlaceholder}
                                noResultsText={"No Suggestions found"}
                                clearable={true}
                            />
                            <div className="style error">{this.state.memberSelectError}</div>
                        </FormControl>
                        <br />
                        <InputLabel className="text-primary">Designation<span className="text-danger"> *</span></InputLabel>
                        <br />
                        <FormControl className="w-100">
                            <Select
                                name="form-field-name"
                                value={this.state.CommitteeMemberDesignation}
                                onChange={this.handleChangeDesignation}
                                options={optionDesignation}
                                placeholder={designationPlaceholder}
                                noResultsText={"No Suggestions found"}
                                clearable={true}
                            />
                            <div className="style error">{this.state.designationError}</div>
                        </FormControl>
                    </div>
                    <div className="modal-box-footer d-flex flex-row">
                        <div>
                            <Button type="submit" className="jr-btn bg-light-green text-white" raised disabled={submitDisable}>Submit </Button>
                            <Button className="jr-btn bg-grey text-white" onClick={() => {
                                if (CommitteeMemberId) {
                                    this.setState({
                                        CommitteeMemberId: this.props.committeeMember.CommitteeMemberId,
                                        MemberId: this.props.committeeMember.MemberId,
                                        CommitteeMemberDesignation: this.props.committeeMember.CommitteeMemberDesignation,
                                    });
                                }
                                else
                                    this.clear();
                                this.props.onCloseCommitteeMemberModal();
                            }} raised>Cancel</Button>
                        </div>
                    </div>
                </ValidatorForm>
            </Modal>
        );
    }
}

export default AddCommitteeMember;