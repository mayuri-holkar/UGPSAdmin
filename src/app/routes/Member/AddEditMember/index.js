import React from 'react';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import Button from 'material-ui/Button';
import AddEditMember from "components/Member/AddEditMember/index"
import AddEditFamilyMember from "components/Member/AddEditFamilyMember/index";
import FamilyMemberList from "components/Member/FamilyMemberList/index";

import {
    onSaveMember,
    handleRequestMemberClose,
    onSaveFamilyMember,
    onOpenFamilyMemberModal,
    onCloseFamilyMemberModal,
    getFamilyMembersById,
    getMemberById,
    getAllCities,
    getAllCitizenships,
    getAllNatives,
    getAllEducation,
    getAllHeights
} from 'actions/Members';

class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            showList: false,
            buttonDisable: true,
            flag: false
        }
    }

    componentWillMount() {
        const mid = this.props.match.params.id;
        if (mid) {
            this.setState({ showList: true, buttonDisable: false })
            this.getMemberById(mid);
            this.getFamilyMembersById(mid);
            this.props.getAllCities();
            this.props.getAllCitizenships();
            this.props.getAllEducation();
            this.props.getAllHeights();
            this.props.getAllNatives();
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps) {
            this.setState({ flag: true });
        }
    }

    onSaveMember = (member) => {
        this.props.onSaveMember(member);
        this.setState({ buttonDisable: false })
        if (member.MemberId) {
            this.getMemberById(member.MemberId);
        }
    }

    handleRequestMemberClose = () => {
        this.props.handleRequestMemberClose();
    }

    onOpenModel() {
        this.props.onOpenFamilyMemberModal();
    }

    onCloseFamilyMemberModal = () => {
        this.props.onCloseFamilyMemberModal();
    }

    onSaveFamilyMember = (familymember) => {
        this.setState({ showList: true })
        this.props.onSaveFamilyMember(familymember);
    }

    getFamilyMembersById(mid) {
        this.props.getFamilyMembersById(mid);
    }

    getMemberById(mid) {
        const member = this.props.getMemberById(mid);
    }

    render() {
        const { member, alertMessage, showMessage, addFamilyMemberState, familymember, showFamilyMessage, familyAlertMessage, oldmember, imageURL, MemberName, cities, citizenships, natives, heights, education } = this.props;
        const buttonstyle = { marginLeft: '10px', marginTop: '10px', marginBottom: '10px' };
        return (
            <div className="col-lg-12">
                {
                    this.props.match.params.id ?
                        (oldmember.MemberId == this.props.match.params.id && this.state.flag ?
                            <AddEditMember onSaveMember={this.onSaveMember.bind(this)} member={this.props.match.params.id ? oldmember : {
                                FullName: '',
                                FatherName: '',
                                SurName: '',
                                Address: '',
                                Taluka: '',
                                Jeello: '',
                                PinCode: '',
                                HomePhone: '',
                                Email: '',
                                MobileNo: '',
                                GrandFatherName: '',
                                Gol: '',
                                PetaAttak: '',
                                MulVatan: '',
                                OtherInformation: '',
                                Ajivansabhyanumber: '',
                                Gender: '',
                                IsActive: '',
                                Image: '',
                            }} getMemberById={this.getMemberById.bind(this)} /> : null)
                        :
                        <AddEditMember onSaveMember={this.onSaveMember.bind(this)} member={{
                            FullName: '',
                            FatherName: '',
                            SurName: '',
                            Address: '',
                            Taluka: '',
                            Jeello: '',
                            PinCode: '',
                            HomePhone: '',
                            Email: '',
                            MobileNo: '',
                            GrandFatherName: '',
                            Gol: '',
                            PetaAttak: '',
                            MulVatan: '',
                            OtherInformation: '',
                            Ajivansabhyanumber: '',
                            Gender: '',
                            IsActive: true,
                            Image: '',
                        }} />
                }
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showMessage}
                    autoHideDuration={3000}
                    onClose={this.handleRequestMemberClose}
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
                <div>
                    <Button className="btn jr-btn-rounded text-white btn-primary bg-primary btn-rounded " onClick={this.onOpenModel.bind(this)} style={buttonstyle} disabled={this.state.buttonDisable}>
                        Add Family Member
                    </Button>
                    {
                        this.state.flag ?
                            <AddEditFamilyMember open={addFamilyMemberState} familymember={{
                                'FamilyMemberId': '',
                                'MemberId': this.props.match.params.id ? this.props.match.params.id : '',
                                'Name': '',
                                'Relation': '',
                                'DateOfBirth': '',
                                'BloodGroup': '',
                                'Education': '',
                                'MaritalStatus': '',
                                'MarriageDate': '',
                                'LookingForPartner': '',
                                'PartnerHeight': '',
                                'Occupation': '',
                                'OccupationType': '',
                                'BusinessType': '',
                                'BusinessAddress': '',
                                'Mobile': '',
                                'Email': '',
                                'Filename': '',
                                'Gender': '',
                                'SkinTone': '',
                                'Weight': '',
                                'City': '',
                                'Citizenship': '',
                                'Native': '',
                                'Manglik': '',
                                'Handicaped': ''
                            }} onCloseFamilyMemberModal={this.onCloseFamilyMemberModal.bind(this)}
                                onSaveFamilyMember={this.onSaveFamilyMember.bind(this)}
                                MemberName={this.props.MemberName} cities={cities} citizenships={citizenships}
                                heights={heights} natives={natives} education={education}
                            /> : null
                    }
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                        open={showFamilyMessage}
                        autoHideDuration={3000}
                        onClose={this.handleRequestMemberClose}
                        SnackbarContentProps={{
                            'aria-describedby': 'message-id',
                        }}
                        message={<span id="message-id">{familyAlertMessage}</span>}
                        action={[
                            <Button fab className="jr-btn-fab-sm bg-success text-white">
                                <i className="zmdi zmdi-thumb-up zmdi-hc-fw" />
                            </Button>
                        ]}
                    />
                </div>
                {
                    (this.state.showList && this.props.FamilyMemberList.length > 0) ?
                        <FamilyMemberList familymembers={this.props.FamilyMemberList} onSaveFamilyMember={this.onSaveFamilyMember.bind(this)} MemberName={this.props.MemberName}
                          cities={cities} citizenships={citizenships} heights={heights} natives={natives} education={education} />
                        : null
                }

            </div>
        );
    }
}
const mapStateToProps = ({ Member }) => {
    return {
        alertMessage: Member.alertMessage,
        showMessage: Member.showMessage,
        familyAlertMessage: Member.familyAlertMessage,
        showFamilyMessage: Member.showFamilyMessage,
        addFamilyMemberState: Member.addFamilyMemberState,
        FamilyMemberList: Member.FamilyMemberList,
        oldmember: Member.oldmember,
        MemberName: Member.MemberName,
        cities: Member.cities,
        citizenships: Member.citizenships,
        natives: Member.natives,
        heights: Member.heights,
        education: Member.education
    }
};

export default connect(mapStateToProps, {
    onSaveMember,
    handleRequestMemberClose,
    onSaveFamilyMember,
    onOpenFamilyMemberModal,
    onCloseFamilyMemberModal,
    getFamilyMembersById,
    getMemberById,
    getAllCities,
    getAllCitizenships,
    getAllNatives,
    getAllEducation,
    getAllHeights
})(Member);

