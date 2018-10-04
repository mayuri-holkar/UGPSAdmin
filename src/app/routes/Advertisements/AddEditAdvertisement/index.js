import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import AddEditAdvertisement from 'components/Advertisements/AddEditAdvertisement/index'
import {
    onSaveAdvertisement,
    getAdvertisementById,
    getAllAdvertisementTypes,
    getAllAdvertisementLocations,
    getAdvertisementPhotosById,
    onDeleteAdvertisementPhotos,
    closeSnackbar
} from 'actions/Advertisement';

class Advertisements extends React.Component {
    constructor() {
        super()
        this.state = {
            isNewProps: false
        }
    }
    componentWillReceiveProps = (nextProps) => {
        if (nextProps) {
            this.setState({ isNewProps: true });
        }
    }

    componentWillMount() {
        const advId = this.props.match.params.id;
        if (advId) {
            this.getAdvertisementById(advId);
            this.getAdvertisementPhotosById(advId);
        }
        this.props.getAllAdvertisementTypes();
        this.props.getAllAdvertisementLocations();
    }

    getAdvertisementById(advertisementId) {
        this.props.getAdvertisementById(advertisementId);
    }

    getAdvertisementPhotosById(advertisementId) {
        this.props.getAdvertisementPhotosById(advertisementId);
    }

    onSaveAdvertisement = (newAdvertisement) => {
        this.props.onSaveAdvertisement(newAdvertisement)
    }

    onDeleteAdvertisementPhotos = (advertisementId, photoId, name) => {
        this.props.onDeleteAdvertisementPhotos(advertisementId, photoId, name)
        this.getAdvertisementPhotosById(advertisementId);
    }

    closeSnackbar = () => {
        this.props.closeSnackbar();
    }
    render() {
        const { newAdvertisement, advertisementObj, advertisementTypes, advertisementLocations, advertisementPhotos, deleteAlertMessage, showMessage } = this.props;
        return (
            <div className="col-lg-12">
                {this.props.match.params.id ?
                    (advertisementObj.AdvertisementId == this.props.match.params.id && this.state.isNewProps ?
                        <AddEditAdvertisement onSaveAdvertisement={this.onSaveAdvertisement.bind(this)}
                            newAdvertisement={this.props.match.params.id ? advertisementObj : {
                                Name: '',
                                Description: '',
                                IsActive: '',
                                StartDate: '',
                                EndDate: '',
                                FileName: '',
                                AdvertisementAmountType: '',
                                Amount: '',
                                AdvertisementType: '',
                                AdvertisementLocation: ''
                            }} advertisementTypes={advertisementTypes} advertisementLocations={advertisementLocations}
                            advertisementPhotos={advertisementPhotos} getAdvertisementPhotos={this.getAdvertisementPhotosById.bind(this)}
                            onDeleteAdvertisementPhotos={this.onDeleteAdvertisementPhotos.bind(this)} /> : null)
                    :
                    <AddEditAdvertisement newAdvertisement={{
                        Name: '',
                        Description: '',
                        IsActive: true,
                        StartDate: '',
                        EndDate: '',
                        FileName: '',
                        AdvertisementAmountType: '',
                        Amount: '',
                        AdvertisementType: '',
                        AdvertisementLocation: ''
                    }} advertisementTypes={this.props.advertisementTypes} advertisementLocations={this.props.advertisementLocations}
                    onSaveAdvertisement={this.onSaveAdvertisement.bind(this)} advertisementPhotos=''/>
                }
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={showMessage}
                    autoHideDuration={3000}
                    onClose={this.closeSnackbar}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{deleteAlertMessage}</span>}
                    action={[
                        <Button fab className="jr-btn-fab-sm bg-success text-white">
                            <i className="zmdi zmdi-thumb-up zmdi-hc-fw" />
                        </Button>
                    ]}
                />
            </div>
        )
    }
}

const mapStateToProps = ({ Advertisement }) => {
    return {
        advertisementObj: Advertisement.advertisementObj,
        advertisementTypes: Advertisement.advertisementTypes,
        advertisementLocations: Advertisement.advertisementLocations,
        advertisementPhotos: Advertisement.advertisementPhotos,
        deleteAlertMessage: Advertisement.deleteAlertMessage,
        showMessage: Advertisement.showMessage
    }
};

export default connect(mapStateToProps, {
    onSaveAdvertisement,
    getAdvertisementById,
    getAllAdvertisementTypes,
    getAllAdvertisementLocations,
    getAdvertisementPhotosById,
    onDeleteAdvertisementPhotos
})(Advertisements);