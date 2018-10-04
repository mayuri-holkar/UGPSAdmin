import React from 'react';
import Button from 'material-ui/Button';
import { Redirect } from 'react-router-dom';
import { GridList } from 'material-ui/GridList';
import styles from './photo.css'
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';
import SweetAlert from 'react-bootstrap-sweetalert';

class EventManagementPhotosAddEdit extends React.Component {
    constructor(props) {
        super(props);
        const {
            EventPhotoId,
            FileName,
            EventId
        } = this.props.newEvent

        this.state = {
            EventPhotoId,
            FileName: [],
            imageFile: [],
            cancel: false,
            disableButton: true,
            isDelete: false,
            deletedPhotoId: '',
            deletedPhotoName: '',
            imageError: '',
            isPhotoValidate: true
        }
        this.handleImageChange = this.handleImageChange.bind(this);
        this.onUploadPhotos = this.onUploadPhotos.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUploadPhotos = this.onUploadPhotos.bind(this);
        this.onCancelDelete = this.onCancelDelete.bind(this);
        this.onDisplay = this.onDisplay.bind(this);
    }

    handleImageChange = (event) => {
        let reader = new FileReader();
        let file = event.target.files[0];
        if (!file.name.endsWith('.jpg') && !file.name.endsWith('.png') && !file.name.endsWith('.jpeg')) {
            this.setState({
                imageError: "Please select only image files ",
                isPhotoValidate: false,
                Image: nodeUrl + '/getStaticImage?token=' + JSON.parse(localStorage.getItem('user')).token
            });
        }
        else {
            let fileArray = [];
            let fileNameArray = [];
            for (let i = 0; i < event.target.files.length; i++) {
                let reader = new FileReader();
                let file = event.target.files[i];
                reader.onloadend = () => {
                    {
                        fileArray[i] = reader.result;
                        fileNameArray[i] = file.name;
                        this.setState({ image: reader.result, disableButton: false });
                    }
                }
                reader.readAsDataURL(file);
            }
            this.setState({ imageError: '', isPhotoValidate: true })
            this.state.imageFile = fileArray;
            this.state.FileName = fileNameArray;
        }
    }

    onUploadPhotos = () => {
        if (this.state.imageError == '') {
            this.props.onSaveEventPhotos({
                'FileName': this.state.FileName,
                'EventPhotoId': this.state.EventPhotoId,
                'EventId': this.state.EventId,
                'imageFile': this.state.imageFile
            });
            this.props.getEventPhotosById(this.props.newEvent.EventId);
            this.setState({ disableButton: true, imageFile: [], cancel: true })
        }
    }

    OnCancel = () => {
        this.setState({ cancel: true })
        this.props.clearEventInput();
    }

    onDisplay = (photoId, name) => {
        this.setState({
            isDelete: true, deletedPhotoId: photoId, deletedPhotoName: name
        })
    };

    onCancelDelete = () => {
        this.setState({
            isDelete: false
        })
    };

    onDelete = () => {
        this.setState({
            isDelete: false
        })
        var eventId = this.props.newEvent.EventId;
        this.props.onDeleteEventPhotos(eventId, this.state.deletedPhotoId, this.state.deletedPhotoName);
        this.props.getEventPhotosById(eventId);
    }

    render() {
        const { onSaveEventPhotos, newEvent, eventPhotos } = this.props;
        const { FileName } = newEvent;
        let user = JSON.parse(localStorage.getItem('user'));
        return (
            <div className="col-lg-12">
                <div className="module-box">
                    <div className="col-md-12" style={{ paddingLeft: '0px', paddingRight: '0px', paddingTop: '15px' }}>
                        <div className="page-heading d-sm-flex align-items-sm-center" id="pageHead">
                            <div className="col-md-7">
                                <h2 className="title mb-3 mb-sm-0">Event Management Photos</h2>
                            </div>
                        </div>
                    </div>
                    <div className="animated slideInUpTiny animation-duration-3">
                        <div className="col-sm-12 contact-form jr-card content-center" >
                            <div className="row">
                                <div className="form-group">
                                    <label className="jr-btn jr-btn-lg bg-primary text-white" style={{ marginLeft: '13px' }}>
                                        <i className="zmdi zmdi-instagram zmdi-hc-lg" />
                                        <span>  </span> Upload Event Images
                                    <input id="file-input" type="file" onChange={this.handleImageChange} name="FileName" className="filetype" accept="image/jpeg,image/jpg,image/png" multiple />
                                    </label><div className="style error">{this.state.imageError}</div> <br />
                                    <div className="gl-advanced">
                                        {this.props.eventPhotos != '' ?
                                            <GridList cellHeight={180} className="gl" cols={3} id="active-scroll-bars">
                                                {this.props.eventPhotos != '' ?
                                                    this.props.eventPhotos.map((Images) =>
                                                        <div className="img-wrap" style={{ width: '250px', marginTop: '45px' }}>
                                                            <img key={Images.EventPhotoId} className="avatar size-125" src={ nodeUrl + '/photos/' + this.props.newEvent.EventId + '/' + Images.FileNameInFolder + "?token=" + user.token} id="img" />
                                                            <Tooltip id="tooltip-icon" title="Delete" placement="center">
                                                                <IconButton aria-label="Delete" id="clear" onClick={() => this.onDisplay(Images.EventPhotoId, Images.FileNameInFolder)}>
                                                                    <DeleteIcon id="delete" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        </div>
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
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group mb-0">
                                        <br />
                                        <Button type="submit" raised className="jr-btn bg-light-green text-white" onClick={this.onUploadPhotos} disabled={this.state.disableButton}> Submit</Button>
                                        <Button type="Cancel" raised className="jr-btn bg-grey text-white" onClick={this.OnCancel} >Cancel
                                         {this.state.cancel && <Redirect to={{ pathname: '/app/EventManagement' }} />}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default EventManagementPhotosAddEdit;