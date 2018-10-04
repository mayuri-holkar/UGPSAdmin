import React, { PropTypes } from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Checkbox from 'material-ui/Checkbox';
import { FormControl, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import history from '../../../index';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { GridList } from 'material-ui/GridList';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Input } from 'reactstrap';

class AddEditBanner extends React.Component {
    constructor(props) {
        super(props);
        const {
            Name,
            IsActive,
            FileName,
        } = this.props.newBanner
        this.state = {
            Name,
            disableButton: false,
            dateError: '',
            imageFile: [],
            isDelete: false,
            FileName,
            imageError: '',
            IsActive,
            deletedPhotoId: '',
            deletedPhotoName: '',
            imagePreviewUrl: '',
        }
        this.onSave = this.onSave.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value, dateError: '' })
    }

    onImageChange(e) {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file.name.endsWith('.jpg') && !file.name.endsWith('.png') && !file.name.endsWith('.jpeg')) {
            this.setState({
                imageError: "Please select only image files ",
            });
        }
        else if (file.size > 1048576) {
            this.setState({
                imageError: "Image size must be less than 1Mb",
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
                        this.setState({ imagePreviewUrl: reader.result, something: 'jr card col-lg-12' });
                    }
                }
                reader.readAsDataURL(file);
            }
            this.setState({ imageError: '' })
            this.state.imageFile = fileArray;
            this.state.FileName = fileNameArray;
        }
    }

    onDelete = () => {
        this.setState({
            isDelete: false
        })
        var bannerId = this.props.newBanner.BannerId;
        this.props.onDeleteBannerPhotos(bannerId, this.state.deletedPhotoId, this.state.deletedPhotoName);
    }

    onDisplay = (photoId, name) => {
        this.setState({ isDelete: true, deletedPhotoId: photoId, deletedPhotoName: name });
    };

    onCancelDelete = () => {
        this.setState({ isDelete: false });
    };

    onCancel = () => {
        history.push('/app/BannerManagementListing');
    }

    onSave() {
        if (this.state.dateError == '' && this.state.imageError == '') {
            this.props.onSaveBanner({
                Name: this.state.Name,
                IsActive: this.state.IsActive,
                BannerId: this.props.newBanner.BannerId ? this.props.newBanner.BannerId : '',
                FileName: this.state.FileName != '' ? this.state.FileName : this.props.newBanner.FileName,
                imageFile: this.state.imageFile,
            })
            this.setState({
                Name: '',
                disableButton: true,
                bannersPhotos: '',
                isDelete: false,
                imageError: '',
                FileName: '',
                imageFile: '',
                IsActive: true,
            })
            this.onCancel();
        }
    }

    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        const { bannerPhotos } = this.props;
        const { disableButton, Name, dateError, IsActive } = this.state;
        const styleCard = bannerPhotos.length != 0 ? 'jr card col-lg-12' : this.state.something
        return (
            <div className="row animated slideInUpTiny animation-duration-5">
                <div className="col-lg-12">
                    <div className="module-box">
                        <div className="page-heading d-sm-flex align-items-sm-center" id="div1">
                            <div className="col-md-7">
                                <h2 className="title mb-3 mb-sm-0">Banners Management</h2>
                            </div>
                        </div>
                        <div className="row" id="div2">
                            <div className="col-12">
                                <ValidatorForm className="contact-form jr-card" onSubmit={this.onSave} id="card">
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label form="Name">Banner Name</label><span className="text-danger"> *</span>
                                                <input className="form-control form-control-lg" name="Name" type="text"
                                                    onChange={this.handleChange} value={this.state.Name} placeholder="Banner Name" required="true" maxLength="50" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="style error">{this.state.imageError}</div>
                                    <div className={styleCard} id="cardbox">
                                        <div className="form-group">
                                            <label className="jr-btn jr-btn-lg bg-primary text-white">
                                                <i className="zmdi zmdi-instagram zmdi-hc-lg" />
                                                <span> Upload Images </span>
                                                <input id="file-input" type="file" onChange={this.onImageChange.bind(this)} name="FileName" className="filetype" accept="image/jpeg,image/jpg,image/png" multiple />
                                            </label>
                                            <div className="gl-advanced">
                                                {
                                                    this.props.bannersPhotos != '' ?
                                                        <GridList cellHeight={180} className="gl" cols={3} id="active-scroll-bars">
                                                            {this.props.bannersPhotos != '' ?
                                                                this.props.bannerPhotos.map((Images, index) =>
                                                                    <div key={index} className="img-wrap" style={{ width: '250px', marginTop: '45px' }}>
                                                                        <img key={Images.BannerPhotoId} className="avatar size-125" src={nodeUrl + '/bannerphoto/' + Images.BannerId + '/' + Images.FileNameInFolder + "?token=" + user.token} id="img" />
                                                                        <Tooltip id="tooltip-icon" title="Delete" placement="bottom">
                                                                            <IconButton aria-label="Delete" id="clear" onClick={() => this.onDisplay(Images.BannerPhotoId, Images.FileNameInFolder)}>
                                                                                <DeleteIcon id="delete" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </div>
                                                                )
                                                                : null
                                                            }
                                                            {this.state.imageFile.map((Images, index) =>
                                                                <div key={index} className="img-wrap" style={{ width: '250px', marginTop: '45px' }}>
                                                                    <img key={Images.BannerPhotoId} className="avatar size-125" src={Images} name="img" id="img" />
                                                                </div>
                                                            )}</GridList>
                                                        :
                                                        <GridList cellHeight={180} spacing={1} className="gl">
                                                            {this.state.imageFile.map((Images, index) =>
                                                                <div key={index} className="img-wrap" style={{ width: '250px', marginTop: '45px' }}>
                                                                    <img key={Images.BannerPhotoId} className="avatar size-125" src={Images} name="img" id="img" />
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
                                                    onConfirm={() => this.onDelete().bind(this)}
                                                    onCancel={this.onCancelDelete.bind(this)}
                                                >
                                                    You want to delete this Photo?
				                                             </SweetAlert>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <FormControlLabel label="Is Active?"
                                            control={
                                                <Checkbox
                                                    checked={this.state.IsActive}
                                                    onChange={(event) => this.setState({ IsActive: event.target.checked })}
                                                    value={`${this.state.IsActive}`}
                                                />}
                                        />
                                    </div>
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
export default AddEditBanner;