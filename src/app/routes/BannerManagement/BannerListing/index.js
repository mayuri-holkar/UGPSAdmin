import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import { Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, InputGroupDropdown, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Tooltip from 'material-ui/Tooltip';
import Snackbar from 'material-ui/Snackbar';
import BannersList from "components/BannerManagement/BannerListing";
import {
    getAllBanners,
    onSearchBanner,
    bannerToggleDropDown,
    bannerSelectDropDown,
    bannerSelectDropDownValue,
    clearBannerInput,
    closeBannerSnackbar,
    searchBanner,
    onDeleteBanner
} from 'actions/BannersManagement';
import Style from './banner.scss';

class BannerListing extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.clearBannerInput();
        this.getAllBanners();
    }

    getAllBanners() {
        this.props.getAllBanners();
    }

    handleChange = (event) => {
        this.props.onSearchBanner(event);
    }

    closeSnackbar = () => {
        this.props.closeBannerSnackbar();
    }

    onDeleteBanner = (banner) => {
        this.props.onDeleteBanner(banner);
    }

    handleSubmit = (event) => {
        const { searchName, dropDownValue } = this.props;
        this.props.searchBanner(this.props.dropDownValue, this.props.searchName)
    }

    toggleDropDown = () => {
        this.props.bannerToggleDropDown();
    }

    selectDropDown = (value) => {
        this.props.bannerSelectDropDown(value);
        this.props.bannerSelectDropDownValue(value);
    }

    clearInput = () => {
        this.props.clearBannerInput();
        this.getAllBanners();
    }

    toRedirect = () => {
        this.props.history.push('/app/BannerManagement/add');
    }

    render() {
        const { showMessage, alertMessage, BannerList, onDeleteBanner} = this.props
        const buttonstyle = { marginTop: '10px', marginBottom: '10px' };
        return (
            <div className="app-wrapper">
                <div className="row" >
                    <div className="col-md-12">
                        <div className="page-heading d-sm-flex align-items-sm-center" id="pageHeading">
                            <div className="col-md-7">
                                <h2 className="title mb-3 mb-sm-0">Banner Management</h2>
                            </div>
                            <div className="col-md-5">
                                <div className="input-group align-items-sm-right" >
                                    <InputGroup>
                                        <Dropdown isOpen={this.props.dropdownOpen} toggle={this.toggleDropDown} id="d1">
                                            <DropdownToggle color="primary"  id="FieldName">
                                                {this.props.dropDownName}
                                            </DropdownToggle>
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
                        Add Banner
                    </Button>
                </div>
                <div>
                    <Paper>
                        <div className="jr-card">
                            {this.props.BannerList.length === 0 ?
                                <div className="h-100 d-flex align-items-center justify-content-center">
                                    {this.props.searchResult}
                                </div>
                                :
                                <BannersList banners={this.props.BannerList}
                                    onDeleteBanner={this.onDeleteBanner.bind(this)}/>
                            }
                        </div>
                        <Snackbar
                            key={alertMessage}
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

const mapStateToProps = ({ BannersManagement}) => {
    return {
        BannerList: BannersManagement.BannerList,
        dropDownName: BannersManagement.dropDownName,
        dropDownValue: BannersManagement.dropDownValue,
        dropdownOpen: BannersManagement.dropdownOpen,
        searchName: BannersManagement.searchName,
        alertMessage: BannersManagement.alertMessage,
        showMessage: BannersManagement.showMessage,
        searchResult: BannersManagement.searchResult
    }
};

export default connect(mapStateToProps, {
    getAllBanners,
    onSearchBanner,
    bannerToggleDropDown,
    bannerSelectDropDown,
    bannerSelectDropDownValue,
    clearBannerInput,
    closeBannerSnackbar,
    searchBanner,
    onDeleteBanner
})(BannerListing);