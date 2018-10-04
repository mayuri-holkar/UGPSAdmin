import React from 'react';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import Button from 'material-ui/Button';
import moment from 'moment';
import AddEditFamilyMember from '../../../Member/AddEditFamilyMember/index';

class FamilyMemberCell extends React.Component {
    constructor() {
        super();
        this.state = {
            addFamilyMemberState: false
        }
    }

    onCloseFamilyMemberModal = () => {
        this.setState({ addFamilyMemberState: false });
    };

    onEdit = () => {
        this.setState({ addFamilyMemberState: true });
    };
   
    render() {
        const { addFamilyMemberState } = this.state;
        const { onCloseFamilyMemberModal, familymember, onSaveFamilyMember, MemberName, cities, citizenships, heights, natives, education } = this.props;        
        const { Name, Relation, Dob, BloodGroup, Education, MaritalStatus, MarriageDate, LookingForPartner,
            PartnerHeight, Occupation, BusinessAddress, Mobile, Email, filename, FamilyMemberId, Native } = this.props.familymember;
        var partnerHeight = '';
        for (let i = 0; i < heights.length; i++) {
            if (heights[i].HeightId == PartnerHeight) {
                partnerHeight = heights[i].Description;
            }
        }
        return (
            <TableRow>
                <TableCell>{Name},<br />{Education},{Dob},{BloodGroup}</TableCell>
                <TableCell>{Relation}</TableCell>
                <TableCell>{MaritalStatus}{MarriageDate == '' ? (LookingForPartner !== '' ? ',' : null) : ','}{MarriageDate == '' ? null : MarriageDate}{LookingForPartner !== '' ? < br /> : null}{LookingForPartner !== '' ? LookingForPartner : null}{partnerHeight == '' ? null : ',' + partnerHeight}</TableCell>
                <TableCell>{Occupation}</TableCell>
                <TableCell>{BusinessAddress}</TableCell>
                <TableCell>{Mobile}{Mobile==''?null:(Email == '' ? null : ',')}{Email == '' ? null :<br/>}{Email}</TableCell>
                <TableCell className="text-center">
                    <Tooltip id="tooltip-icon" title="Edit Family Member" placement="bottom">
                            <i className="zmdi zmdi-edit zmdi-hc-x" onClick={this.onEdit}></i>
                    </Tooltip>
                </TableCell>                
                {
                    addFamilyMemberState &&
                    <AddEditFamilyMember open={this.state.addFamilyMemberState} familymember={this.props.familymember}
                        onCloseFamilyMemberModal={this.onCloseFamilyMemberModal} onSaveFamilyMember={onSaveFamilyMember}
                        MemberName={this.props.MemberName} cities={cities} citizenships={citizenships}
                        heights={heights} natives={natives} education={education} 
                    />
                }
            </TableRow>
        );
    }
}
export default FamilyMemberCell;
