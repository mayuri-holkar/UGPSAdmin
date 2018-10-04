import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import AddEditBanner from 'components/BannerManagement/AddEditBanner/index'
import {
    onSaveBanner,
    getBannerById,
    getBannerPhotosById,
    onDeleteBannerPhotos,
    closeBannerSnackbar,
} from 'actions/BannersManagement';

class BannerManagement extends React.Component {
    constructor() {
        super()
        this.state = {
            isNewProps: false,
            bannerPhotos: []
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps) {
            this.setState({ isNewProps: true });
        }
    }

    componentWillMount() {
        const bannerId = this.props.match.params.id;
        if (bannerId) {
            this.getBannerById(bannerId);
            this.getBannerPhotosById(bannerId);
        }
    }

    getBannerById(bannerId) {
        this.props.getBannerById(bannerId);
    }

    onSaveBanner = (newBanner) => {
        this.props.onSaveBanner(newBanner)
    }

    getBannerPhotosById(bannerId) {
        this.props.getBannerPhotosById(bannerId);
    }

    onDeleteBannerPhotos = (bannerId, photoId, name) => {
        this.props.onDeleteBannerPhotos(bannerId, photoId, name)
        this.getBannerPhotosById(bannerId);
    }

    closeSnackbar = () => {
        this.props.closeBannerSnackbar();
    }

    render() {
        const { newBanner, bannerData, deleteAlertMessage, showMessage } = this.props;
        return (
            <div className="col-lg-12">
                {
                    this.state.isNewProps = 'true' ?
                        this.props.match.params.id ?
                            (bannerData.BannerId == this.props.match.params.id && this.state.isNewProps ?
                                <AddEditBanner
                                    newBanner={this.props.match.params.id ? bannerData : {
                                        'Name': '',
                                        'IsActive': '',
                                        'FileName': '',
                                    }} onSaveBanner={this.onSaveBanner.bind(this)}
                                    bannerPhotos={this.props.bannerPhotos} getBannerPhotosById={this.getBannerPhotosById.bind(this)}
                                    onDeleteBannerPhotos={this.onDeleteBannerPhotos.bind(this)} /> : null)
                            :
                            <AddEditBanner newBanner={{
                                'Name': '',
                                'IsActive': true,
                                'FileName': '',
                            }}
                                onSaveBanner={this.onSaveBanner.bind(this)}
                                bannerPhotos={this.state.bannerPhotos} /> : null
                }
                <Snackbar
                    key={deleteAlertMessage}
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

const mapStateToProps = ({ BannersManagement }) => {
    return {
        bannerPhotos: BannersManagement.bannerPhotos,
        bannerData: BannersManagement.bannerData,
        deleteAlertMessage: BannersManagement.deleteAlertMessage,
        showMessage: BannersManagement.showMessage
    }
}

export default connect(mapStateToProps, {
    onSaveBanner,
    getBannerById,
    getBannerPhotosById,
    onDeleteBannerPhotos,
    closeBannerSnackbar,
})(BannerManagement)