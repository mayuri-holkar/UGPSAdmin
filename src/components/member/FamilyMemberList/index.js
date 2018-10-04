import React from 'react';
import FamilyMemberCell from "./FamilyMemberCell/index";
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class FamilyMemberList extends React.Component {
    constructor() {
        super();
    }
    render() {
        const { onSaveFamilyMember, onCloseFamilyMemberModal, familymembers, MemberName, cities, citizenships, natives, heights, education } = this.props;
        const cellstyle = { color: 'black' }
        const tableStyle = { paddingTop: '0px', paddingLeft: '70px', paddingRight: '48px' };
        return (
            <div className="jr-card">
                <br/> <h3><b>Family Members</b></h3>
                <div className="col-md-12 col-12" >
                    <div className="table-responsive-material" >
                        <Table className="default-table table-unbordered table table-sm table-hover">
                            <TableHead className="th-border-b">
                                <TableRow>
                                    <TableCell style={cellstyle}>Name</TableCell>
                                    <TableCell style={cellstyle}>Relation</TableCell>
                                    <TableCell style={cellstyle}>Marital Status</TableCell>
                                    <TableCell style={cellstyle}>Occupation</TableCell>
                                    <TableCell style={cellstyle}>Business Address</TableCell>
                                    <TableCell style={cellstyle}>Contact</TableCell>
                                    <TableCell className="text-center" style={cellstyle}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.familymembers.map((familymember) =>
                                    <FamilyMemberCell key={familymember.FamilyMemberId} familymember={familymember} onSaveFamilyMember={onSaveFamilyMember}
                                        onCloseFamilyMemberModal={onCloseFamilyMemberModal} MemberName={this.props.MemberName} cities={cities} citizenships={citizenships}
                                        heights={heights} natives={natives} education={education} 
                                    />

                                )}</TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}
export default FamilyMemberList;