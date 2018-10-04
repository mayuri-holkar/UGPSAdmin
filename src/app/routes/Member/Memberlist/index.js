import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, InputGroupDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import styles from "./memberList.css";
import MemberList from "components/Member/MemberList";

import {
    getMembers,
    searchMember,
    toggleDropDown,
    selectDropDown,
    selectDropDownValue,
    clearInput,
    onSearchMembers
} from 'actions/Members';

class MembersList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearInput = this.clearInput.bind(this)
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    toRedirect = () => {
        this.props.history.push('member/add');
    }

    componentWillMount() {
        this.props.clearInput();
        this.getMembers();
    }

    getMembers() {
        this.props.getMembers();
    }

    handleChange = (event) => {
        this.props.onSearchMembers(event);
    }

    handleSubmit = (event) => {
        const { searchName, dropDownValue } = this.props;
        this.props.searchMember(this.props.dropDownValue, this.props.searchName)
    }

    toggleDropDown = () => {
        this.props.toggleDropDown();
    }

    selectDropDown = (event) => {
        this.props.selectDropDown(event);
        this.props.selectDropDownValue(event);
    }

    clearInput = () => {
        this.props.clearInput();
        this.getMembers();
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="row" >
                    <div className="col-md-12">
                        <div className="page-heading d-sm-flex align-items-sm-center" id="pageHeading">
                            <div className="col-md-7">
                                <h2 className="title mb-3 mb-sm-0">Members</h2>
                            </div>
                            <div className="col-md-5">
                                <div className="align-items-sm-right">
                                    <InputGroup>
                                        <Dropdown isOpen={this.props.dropdownOpen} toggle={this.toggleDropDown} id="d1">
                                            <DropdownToggle color="primary" caret id="FieldName">
                                                {this.props.dropDownName}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem value="FullName" onClick={this.selectDropDown.bind(this)}>First Name</DropdownItem>
                                                <DropdownItem value="FatherName" onClick={this.selectDropDown.bind(this)}>Father name</DropdownItem>
                                                <DropdownItem value="SurName" onClick={this.selectDropDown.bind(this)}>Surname</DropdownItem>
                                                <DropdownItem value="Address" onClick={this.selectDropDown.bind(this)}>Address</DropdownItem>
                                                <DropdownItem value="HomePhone" onClick={this.selectDropDown.bind(this)}>Home Phone</DropdownItem>
                                                <DropdownItem value="MobileNo" onClick={this.selectDropDown.bind(this)}>Mobile No</DropdownItem>
                                                <DropdownItem value="GrandFatherName" onClick={this.selectDropDown.bind(this)}>GrandFather Name</DropdownItem>
                                                <DropdownItem value="Gol" onClick={this.selectDropDown.bind(this)}>Gol</DropdownItem>
                                                <DropdownItem value="MulVatan" onClick={this.selectDropDown.bind(this)}>MulVatan</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Input id="searchName" type="text" value={this.props.searchName}
                                            placeholder="Search here.." ref="searchName" name="searchName" onChange={this.handleChange} />
                                        <InputGroupAddon addonType="append"><Button raised className="btn bg-primary" id="search" disabled={!this.props.searchName} type="submit" onClick={this.handleSubmit}  > <i className="zmdi zmdi-search zmdi-hc-fw" /> </Button></InputGroupAddon>
                                        <InputGroupAddon addonType="append"><Button disabled={!this.props.searchName} onClick={this.clearInput} className="btn bg-danger " id="cancel"> <i className="zmdi zmdi-close zmdi-hc-fw" /></Button></InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button className="btn jr-btn-rounded text-white btn-primary bg-primary btn-rounded " onClick={this.toRedirect} style={{ marginTop: '10px', marginBottom: '10px' }}>
                        Add Member
                </Button>
                </div>
                <div>
                    <Paper>
                        <div className="jr-card">
                            {this.props.MemberList.length === 0 ?
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    {this.props.SearchResult}
                                </div>
                                :
                                <MemberList members={this.props.MemberList} />
                            }
                        </div>
                    </Paper>
                </div>
                
            </div>
        );
    }
}

const mapStateToProps = ({ Member }) => {
    return {
        MemberList: Member.MemberList,
        SearchResult: Member.SearchResult,
        dropDownName: Member.dropDownName,
        dropDownValue: Member.dropDownValue,
        dropdownOpen: Member.dropdownOpen,
        searchName: Member.searchName
    }
};

export default connect(mapStateToProps, {
    getMembers, searchMember, toggleDropDown,
    selectDropDown, selectDropDownValue,
    clearInput, onSearchMembers
})(MembersList);