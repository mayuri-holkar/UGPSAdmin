import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, InputGroupDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Tooltip from 'material-ui/Tooltip';
import Snackbar from 'material-ui/Snackbar';
import AdvertisementList from "components/Advertisements/AdvertisementList"
import {
    getAllAdvertisements,
    searchAdvertisement,
    onSearchAdvertisement,
    advertisementToggleDropDown,
    advertisementSelectDropDown,
    advertisementSelectDropDownValue,
    clearAdvertisementInput,
    closeSnackbar
} from 'actions/Advertisement';

class AdvertisementListing extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.clearAdvertisementInput();
        this.getAllAdvertisements();
    }

    getAllAdvertisements() {
        this.props.getAllAdvertisements();
    }

    handleChange = (event) => {
        this.props.onSearchAdvertisement(event);
    }

    closeSnackbar = () => {
        this.props.closeSnackbar();
    }

    handleSubmit = (event) => {
        const { searchName, dropDownValue } = this.props;
        this.props.searchAdvertisement(this.props.dropDownValue, this.props.searchName)
    }

    toggleDropDown = () => {
        this.props.advertisementToggleDropDown();
    }

    selectDropDown = (value) => {
        this.props.advertisementSelectDropDown(value);
        this.props.advertisementSelectDropDownValue(value);
    }

    clearInput = () => {
        this.props.clearAdvertisementInput();
        this.getAllAdvertisements();
    }

    toRedirect = () => {
        this.props.history.push('Advertisements/add');
    }

    render() {
        const { showMessage, alertMessage, advertisementList } = this.props
        const buttonstyle = { marginTop: '10px', marginBottom: '10px' };
        return (
            <div className="app-wrapper">
                <div className="row" >
                    <div className="col-md-12">
                        <div className="page-heading d-sm-flex align-items-sm-center" id="pageHeading">
                            <div className="col-md-7">
                                <h2 className="title mb-3 mb-sm-0">Advertisements</h2>
                            </div>
                            <div className="col-md-5">
                                <div className="input-group align-items-sm-right" >
                                    <InputGroup>
                                        <Dropdown isOpen={this.props.dropdownOpen} toggle={this.toggleDropDown} id="d1">
                                            <DropdownToggle color="primary" caret id="FieldName">
                                                {this.props.dropDownName}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem value="Name" onClick={this.selectDropDown.bind(this)}>Name</DropdownItem>
                                                <DropdownItem value="StartDate" onClick={this.selectDropDown.bind(this)}>Start Date</DropdownItem>
                                                <DropdownItem value="EndDate" onClick={this.selectDropDown.bind(this)}>End Date</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                        <Input id="searchName" type="text" value={this.props.searchName}
                                            placeholder="Search here..." ref="searchName" name="searchName" onChange={this.handleChange} />
                                        <InputGroupAddon addonType="append"><Button className="btn bg-primary" id="search" disabled={!this.props.searchName} type="submit" onClick={this.handleSubmit}  > <i className="zmdi zmdi-search zmdi-hc-fw" /> </Button></InputGroupAddon>
                                        <InputGroupAddon addonType="append"><Button disabled={!this.props.searchName} onClick={this.clearInput} className="btn bg-danger" id="Eventcancel"> <i className="zmdi zmdi-close zmdi-hc-fw" /></Button></InputGroupAddon>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Button className="btn jr-btn-rounded text-white btn-primary bg-primary btn-rounded " onClick={this.toRedirect} style={buttonstyle}>
                        Add Advertisement
                    </Button>
                </div>
                <div>
                    <Paper>
                        <div className="jr-card">
                            {this.props.advertisementList.length === 0 ?
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    {this.props.searchResult}
                                </div>
                                :
                                <AdvertisementList advertisements={this.props.advertisementList} />
                            }
                        </div>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={showMessage}
                            autoHideDuration={3000}
                            onClose={this.closeSnackbar}
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
                    </Paper>
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({ Advertisement }) => {
    return {
        advertisementList: Advertisement.advertisementList,
        dropDownName: Advertisement.dropDownName,
        dropDownValue: Advertisement.dropDownValue,
        dropdownOpen: Advertisement.dropdownOpen,
        searchResult: Advertisement.searchResult,
        searchName: Advertisement.searchName,
        alertMessage: Advertisement.alertMessage,
        showMessage: Advertisement.showMessage,

    }
};

export default connect(mapStateToProps, {
    getAllAdvertisements,
    searchAdvertisement,
    onSearchAdvertisement,
    advertisementToggleDropDown,
    advertisementSelectDropDown,
    advertisementSelectDropDownValue,
    clearAdvertisementInput,
    closeSnackbar
})(AdvertisementListing);