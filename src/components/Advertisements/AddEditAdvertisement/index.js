import React from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import history from '../../../index';
import styles from "./advertisement.css";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { GridList } from 'material-ui/GridList';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Input } from 'reactstrap';

class AddEditAdvertisement extends React.Component {
    constructor(props) {
        super(props);
        const {
            Name,
            Description,
            IsActive,
            StartDate,
            EndDate,
            FileName,
            Image,
            AdvertisementType,
            Amount,
            AdvertisementAmountType,
            AdvertisementLocation
        } = this.props.newAdvertisement

        this.state = {
            Name,
            Description,
            IsActive,
            StartDate: this.props.newAdvertisement.StartDate == '' ? '' : moment(StartDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
            EndDate: this.props.newAdvertisement.EndDate == '' ? '' : moment(EndDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
            FileName,
            AdvertisementType,
            Amount,
            AdvertisementAmountType,
            AdvertisementLocation,
            imageError: '',
            imagePreviewUrl: '',
            disableButton: false,
            dateError: '',
            imageFile:[],
            hideAmount: this.props.newAdvertisement.AdvertisementAmountType == 'Paid' ? false : true,
            radioError: '',
            Image: nodeUrl + '/getDefaultImage?token=' + JSON.parse(localStorage.getItem('user')).token,
            advertisementTypeError: '',
            advertisementLocationError: '',
            isVisitingCard: this.props.newAdvertisement.AdvertisementLocation == 3 ? true : false,
            isDelete: false,
            deletedPhotoId: '',
            deletedPhotoName: '',
            isNewVisitingCard: false,
            updatedIndex: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.handleChangeRadioButtons = this.handleChangeRadioButtons.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.checkIsNewVisitingCard = this.checkIsNewVisitingCard.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, dateError: '' })
    }

    onImageChange(e) {
        this.checkIsNewVisitingCard();
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file.name.endsWith('.jpg') && !file.name.endsWith('.png') && !file.name.endsWith('.jpeg')) {
            this.setState({
                imageError: "Please select only image files ",
            });
        }
        else {
            let fileArray = [];
            let fileNameArray = [];
            for (let i = 0; i < e.target.files.length; i++) {
                let reader = new FileReader();
                let file = e.target.files[i];
                reader.onloadend = () => {
                    {
                        fileArray[i] = reader.result;
                        fileNameArray[i] = file.name;
                        this.setState({ imagePreviewUrl: reader.result });
                    }
                    if (this.state.isVisitingCard) {
                        this.setState({ Image: reader.result });
                    }
                }
                reader.readAsDataURL(file);
            }
            this.setState({ imageError: '' })
            this.state.imageFile = fileArray;
            this.state.FileName = fileNameArray;
        }
    }

    handleChangeRadioButtons = (event, value) => {
        value == 'Paid' ? this.setState({ hideAmount: false }) : this.setState({ hideAmount: true, Amount: '' })
        this.setState({ value, [event.target.name]: event.target.value, radioError: '' });
    };

    handleStartDate = (date) => {
        this.setState({ StartDate: date.target.value });
        if (moment(date.target.value).isAfter(this.state.EndDate)) {
            this.setState({ dateError: 'End date must be greater than start date' });
        }
        else {
            this.setState({ StartDate: date.target.value , dateError: '' });
        }
    }

    handleEndDate = (date) => {
        this.setState({ EndDate: date.target.value });
        if (moment(date.target.value).isBefore(this.state.StartDate)) {
            this.setState({ dateError: 'End date must be greater than start date' });
        }
        else {
            this.setState({ EndDate: date.target.value , dateError: '' });
        }
    }

    onCancel = () => {
        history.push('/app/AdvertisementsListing');
    }

    handleSelectChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if (e.target.name == 'AdvertisementType') {
            this.setState({ advertisementTypeError: '' });
        }
        else if (e.target.name == 'AdvertisementLocation') {
            if (e.target.value == 3) {
                this.setState({ isVisitingCard: true });
                if (this.props.advertisementPhotos.length > 0) {
                    for (let i = 0; i < this.props.advertisementPhotos.length; i++) {
                        if (this.props.advertisementPhotos[i].AdvertisementLocation == 3) {
                            this.setState({
                                imagePreviewUrl: nodeUrl + '/advertisementphoto/' + this.props.advertisementPhotos[i].AdvertisementId + '/' + this.props.advertisementPhotos[i].FileNameInFolder + '?token=' + JSON.parse(localStorage.getItem('user')).token,
                                Image: nodeUrl + '/advertisementphoto/' + this.props.advertisementPhotos[i].AdvertisementId + '/' + this.props.advertisementPhotos[i].FileNameInFolder + '?token=' + JSON.parse(localStorage.getItem('user')).token,
                                isNewVisitingCard: false
                            })
                            i = 3;
                        }
                        else {
                            this.setState({ isNewVisitingCard: true, imagePreviewUrl: nodeUrl + '/getDefaultImage?token=' + JSON.parse(localStorage.getItem('user')).token })
                        }
                    }
                }
            }
            else { this.setState({ isVisitingCard: false }) }
            this.setState({ advertisementLocationError: '' })
        }
    }

    onDisplay = (photoId, name) => {
        this.setState({ isDelete: true, deletedPhotoId: photoId, deletedPhotoName: name });
    };

    onCancelDelete = () => {
        this.setState({ isDelete: false });
    };

    checkIsNewVisitingCard() {
        if (this.props.advertisementPhotos.length > 0) {
            for (let i = 0; i < this.props.advertisementPhotos.length; i++) {
                if (this.props.advertisementPhotos[i].AdvertisementLocation == 3) {
                    this.setState({
                        isNewVisitingCard: false, updatedIndex: i
                    })
                    i = this.props.advertisementPhotos.length;
                }
                else {
                    this.setState({ isNewVisitingCard: true });
                }
            }
        }
        else {
            this.setState({ isNewVisitingCard: true });
        }
    }

    onDelete = () => {
        this.setState({
            isDelete: false
        })
        var advertisementId = this.props.newAdvertisement.AdvertisementId;
        this.props.onDeleteAdvertisementPhotos(advertisementId, this.state.deletedPhotoId, this.state.deletedPhotoName);
    }

    onSave() {
        if (this.state.dateError == '' && this.state.imageError == '' && this.state.radioError == '' && this.state.advertisementLocationError == '' &&
            this.state.advertisementTypeError == '' && this.state.AdvertisementAmountType && this.state.AdvertisementLocation && this.state.AdvertisementType) {
            this.props.onSaveAdvertisement({
                Name: this.state.Name,
                Description: this.state.Description,
                IsActive: this.state.IsActive,
                StartDate: moment(this.state.StartDate).format('DD-MM-YYYY'),
                EndDate: moment(this.state.EndDate).format('DD-MM-YYYY'),
                AdvertisementId: this.props.newAdvertisement.AdvertisementId ? this.props.newAdvertisement.AdvertisementId : '',
                FileName: this.state.FileName != '' ? this.state.FileName : this.props.newAdvertisement.FileName,
                Image: this.state.Image,
                OldFileName: this.props.advertisementPhotos[this.state.updatedIndex] ? this.props.advertisementPhotos[this.state.updatedIndex].FileNameInFolder : '',
                AdvertisementType: this.state.AdvertisementType,
                Amount: this.state.Amount,
                AdvertisementAmountType: this.state.AdvertisementAmountType,
                AdvertisementLocation: this.state.AdvertisementLocation,
                imageFile: this.state.AdvertisementLocation == 3 ? this.state.Image : this.state.imageFile,
                AdvertisementPhotoId: this.props.advertisementPhotos[this.state.updatedIndex] ? this.props.advertisementPhotos[this.state.updatedIndex].AdvertisementPhotoId : '',
                isNewVisitingCard: this.state.isNewVisitingCard
            })
            this.setState({
                Name: '',
                Description: '',
                IsActive: '',
                StartDate: '',
                EndDate: '',
                FileName: '',
                Image: '',
                imageError: '',
                imagePreviewUrl: '',
                disableButton: true,
                AdvertisementType: '',
                Amount: '',
                AdvertisementAmountType: '',
                AdvertisementLocation: '',
                imageFile: ''
            })
            this.onCancel();
        }
        else if (!this.state.AdvertisementType) {
            this.setState({ advertisementTypeError: 'This field is required' });
        }
        else if (!this.state.AdvertisementLocation) {
            this.setState({ advertisementLocationError: 'This field is required' });
        }
        else if (!this.state.AdvertisementAmountType) {
            this.setState({ radioError: 'This field is required' });
        }
    }

    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        const { Name, Description, IsActive, StartDate, EndDate, Filename, Image, imageError, disableButton, hideAmount, AdvertisementType, Amount } = this.state
        const { newAdvertisement, advertisementTypes, advertisementLocations, advertisementPhotos } = this.props
        var photoIndex;
        var Index;
        if (advertisementPhotos.length > 0) {
            for (let i = 0; i < advertisementPhotos.length; i++) {
                if (advertisementPhotos[i].AdvertisementLocation == 3) {
                    photoIndex = i;
                    Index = i;
                    i = advertisementPhotos.length;
                    this.state.updatedIndex = photoIndex
                }
                else {
                    photoIndex = 'undefined';
                }
            }
        }
        return (
            <div className="row animated slideInUpTiny animation-duration-5">
                <div className="col-lg-12">
                    <div className="module-box">
                        <div className="page-heading d-sm-flex align-items-sm-center" id="div1">
                            <div className="col-md-7">
                                <h2 className="title mb-3 mb-sm-0">Advertisements</h2>
                            </div>
                        </div>
                        <div className="row" id="div2">
                            <div className="col-12">
                                <ValidatorForm className="contact-form jr-card" onSubmit={this.onSave} id="card">

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label form="Name">Advertisement Name</label><span className="text-danger"> *</span>
                                                <input className="form-control form-control-lg" name="Name" type="text"
                                                    onChange={this.handleChange} value={this.state.Name} placeholder="Advertisement Name" required="true" maxLength="50" />
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label htmlFor="StartDate">Start Date</label><span className="text-danger"> *</span>
                                                <Input type="date" name="StartDate" className="form-control form-control-lg" placeholder="date placeholder" onChange={this.handleStartDate.bind(this)} value={this.state.StartDate} required="true"/>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="form-group">
                                                <label htmlFor="EndDate">End Date</label><span className="text-danger"> *</span>
                                                <Input type="date" name="EndDate" className="form-control form-control-lg" placeholder="date placeholder" onChange={this.handleEndDate.bind(this)} value={this.state.EndDate} required="true" />
                                                <div className="style error">{this.state.dateError}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="Description">Description</label><span className="text-danger"> *</span>
                                                <textarea className="form-control form-control-md" name="Description" type="text"
                                                    onChange={this.handleChange} value={this.state.Description} placeholder="Description" required="true" maxLength="500" />
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <br />
                                                <FormControlLabel label="Is Active?"
                                                    control={
                                                        <Checkbox
                                                            checked={this.state.IsActive}
                                                            onChange={(event) => this.setState({ IsActive: event.target.checked })}
                                                            value={`${this.state.IsActive}`}
                                                        />}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label form="AdvertisementType">Advertisement Type</label><span className="text-danger"> *</span>
                                                <select value={this.state.AdvertisementType} className="form-control col-md-12" onChange={this.handleSelectChange} name="AdvertisementType">
                                                    <option value={this.state.value} disabled>Select Advertisement Type</option>
                                                    {
                                                        advertisementTypes ?
                                                            advertisementTypes.map((advertisementType) =>
                                                                <option key={advertisementType.AdvertisementTypeId} value={advertisementType.AdvertisementTypeId}>{advertisementType.AdvertisementType} </option>)
                                                            :
                                                            null
                                                    }
                                                </select>
                                                <div className="style error">{this.state.advertisementTypeError}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label form="AdvertisementLocation">Advertisement Location</label><span className="text-danger"> *</span>
                                                <select value={this.state.AdvertisementLocation} className="form-control col-md-12" onChange={this.handleSelectChange} name="AdvertisementLocation">
                                                    <option value={this.state.value} disabled>Select Advertisement Location</option>
                                                    {
                                                        advertisementLocations ?
                                                            advertisementLocations.map((location) =>
                                                                < option key={location.AdvertisementLocationId} value={location.AdvertisementLocationId} > {location.AdvertisementLocation}<span> </span> ({location.AdvertisementSize}) </option>)
                                                            :
                                                            null
                                                    }
                                                </select>
                                                <div className="style error">{this.state.advertisementLocationError}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <label>Advertisement Amount Type</label><span className="text-danger"> *</span>
                                            <div>
                                                <FormControl className="row">
                                                    <RadioGroup
                                                        className="d-flex flex-row"
                                                        aria-label="AdvertisementAmountType"
                                                        name="AdvertisementAmountType"
                                                        value={this.state.AdvertisementAmountType}
                                                        onChange={this.handleChangeRadioButtons}
                                                    >
                                                        <FormControlLabel value="Free" control={<Radio />} label="Free" />
                                                        <FormControlLabel value="Paid" control={<Radio />} label="Paid" />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                            <div className="style error">{this.state.radioError}</div>
                                        </div>
                                        {
                                            !hideAmount ?
                                                <div className="col-lg-3">
                                                    <div className="form-group">
                                                        <label htmlFor="Amount">Amount</label><span className="text-danger"> *</span>
                                                        <input className="form-control form-control-lg" name="Amount" type="text"
                                                            onChange={this.handleChange} value={this.state.Amount} placeholder="Amount" required={!hideAmount} maxLength="100" />
                                                    </div>
                                                </div> : null
                                        }
                                    </div>
                                    <div className="style error">{this.state.imageError}</div>
                                    {this.state.AdvertisementLocation ?
                                        <div className="jr card col-lg-12" id="cardbox">
                                            {
                                                this.state.AdvertisementLocation ?
                                                    this.state.isVisitingCard ?
                                                        <div className="row" id="div3">
                                                            <label htmlFor="inputfile" >
                                                                {
                                                                    newAdvertisement.AdvertisementId ?
                                                                        this.state.imagePreviewUrl != '' ?
                                                                            <img className="img-responsive" src={this.state.Image} id="image" />
                                                                            : ((advertisementPhotos.length > 0 || advertisementPhotos != '') && photoIndex != 'undefined') ?
                                                                                <img className="img-responsive" id="image"
                                                                                    src={nodeUrl + '/advertisementphoto/' + advertisementPhotos[photoIndex].AdvertisementId + '/' + advertisementPhotos[photoIndex].FileNameInFolder + '?token=' + user.token} />
                                                                                : <img className="img-responsive" src={this.state.Image} id="image" />
                                                                        :
                                                                        <img className="img-responsive" src={this.state.Image} id="image" />
                                                                }
                                                                <input ref={(ref) => { this.uploadInput = ref; }} id="inputfile" type="file" name="FileName" className="filetype"
                                                                    accept="image/jpeg,image/jpg,image/png" onChange={this.onImageChange} />
                                                            </label>
                                                        </div>
                                                        :
                                                        <div className="form-group">
                                                            <label className="jr-btn jr-btn-lg bg-primary text-white">
                                                                <i className="zmdi zmdi-instagram zmdi-hc-lg" />
                                                                <span>  </span> Upload Images
                                                <input id="file-input" type="file" onChange={this.onImageChange} name="FileName" className="filetype" accept="image/jpeg,image/jpg,image/png" multiple />
                                                            </label><br />
                                                            <div className="gl-advanced">
                                                                {advertisementPhotos != '' ?
                                                                    <GridList cellHeight={180} className="gl" cols={3} id="active-scroll-bars">
                                                                        {advertisementPhotos != '' ?
                                                                            advertisementPhotos.map((Images, index) => Images.AdvertisementLocation != 3 ?
                                                                                <div className="img-wrap" style={{ width: '250px', marginTop: '45px' }}>
                                                                                    <img key={Images.AdvertisementPhotoId} className="avatar size-125" src={nodeUrl + '/advertisementphoto/' + Images.AdvertisementId + '/' + Images.FileNameInFolder + "?token=" + user.token} id="img" />
                                                                                    <Tooltip id="tooltip-icon" title="Delete" placement="center">
                                                                                        <IconButton aria-label="Delete" id="clear" onClick={() => this.onDisplay(Images.AdvertisementPhotoId, Images.FileNameInFolder)}>
                                                                                            <DeleteIcon id="delete" />
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                </div> : <div style={{ height: '20px', width: '0px' }}></div>
                                                                            )
                                                                            : null
                                                                        }
                                                                        {this.state.imageFile.map((Images) =>
                                                                            <div className="img-wrap" style={{ width: '250px', marginTop: '45px' }}>
                                                                                <img key={Images} className="avatar size-125" src={Images} name="img" id="img" />
                                                                            </div>
                                                                        )}</GridList>
                                                                    :
                                                                    <GridList cellHeight={180} spacing={1} className="gl">
                                                                        {this.state.imageFile.map((Images) =>
                                                                            <div className="img-wrap" style={{ width: '250px', marginTop: '45px' }}>
                                                                                <img key={Images} className="avatar size-125" src={Images} name="img" id="img" />
                                                                            </div>
                                                                        )}</GridList>
                                                                }
                                                                <SweetAlert show={this.state.isDelete}
                                                                    warning
                                                                    showCancel
                                                                    confirmBtnText="Yes"
                                                                    cancelBtnText="No"
                                                                    confirmBtnBsStyle="danger"
                                                                    cancelBtnBsStyle="default"
                                                                    title="Are you sure?"
                                                                    onConfirm={() => this.onDelete()}
                                                                    onCancel={this.onCancelDelete}
                                                                >
                                                                    You want to delete this Photo?
				                                             </SweetAlert>
                                                            </div>
                                                        </div> :
                                                    null
                                            }
                                        </div>
                                        : null}
                                    <br />
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="form-group mb-0">
                                                <Button type="submit" raised className="jr-btn bg-light-green text-white" disabled={this.state.disableButton}> Submit</Button>
                                                <Button type="cancel" raised className="jr-btn bg-grey text-white" onClick={this.onCancel}>Cancel</Button>
                                            </div>
                                        </div>
                                    </div>
                                </ValidatorForm>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        )
    }
}
export default AddEditAdvertisement;