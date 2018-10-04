import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import './Style.scss';

class AddCommitteeMember extends React.Component {
	constructor(props) {
		super(props);
		const { CommitteeMemberId, CommitteeMemberName, CommitteeMemberDesignation, CommitteeMemberAddress, CommitteeMemberEmail, CommitteeMemberPhone, CommitteeMemberPhotoURL } = props.committeeMember;
		this.state = {
			CommitteeMemberId,
			CommitteeMemberName,
			CommitteeMemberDesignation,
			CommitteeMemberAddress,
			CommitteeMemberEmail,
			CommitteeMemberPhone,
			CommitteeMemberPhotoURL,
			file: '',
			imagePreviewUrl: '',
			imageError: '',
			isPhotoValidate: true
		}
		this._handleImageChange = this._handleImageChange.bind(this);
	}

	_handleImageChange(e) {
		e.preventDefault();
		let reader = new FileReader();
		let file = e.target.files[0];
		const max_size = 51200;
		if (file.size > max_size) {
			this.setState({
				imageError: "Image size must be less than 50 kb",
				isPhotoValidate: false,
			});
		}
		else {
			reader.onloadend = () => {
				this.setState({
					file: file,
					CommitteeMemberPhotoURL: file,
					imagePreviewUrl: reader.result,
					isPhotoValidate: true,
					imageError: ''
				});
			}
			reader.readAsDataURL(file);
		}
	}

	clear() {
		this.setState({
			CommitteeMemberId: '',
			CommitteeMemberName: '',
			CommitteeMemberEmail: '',
			CommitteeMemberAddress: '',
			CommitteeMemberDesignation: '',
			CommitteeMemberPhone: '',
			CommitteeMemberPhotoURL: '',
			file: '',
			imagePreviewUrl: '',
			isPhotoValidate: true,
			imageError: ''
		});
	}

	handleSubmit() {
		if (!this.state.isPhotoValidate) {
			return false;
		}
		else {
			this.props.onCloseCommitteeMemberModal();
			this.props.onSaveCommitteeMember(
				{
					'CommitteeMemberId': this.state.CommitteeMemberId,
					'CommitteeMemberName': this.state.CommitteeMemberName.trim(),
					'CommitteeMemberDesignation': this.state.CommitteeMemberDesignation.trim(),
					'CommitteeMemberAddress': this.state.CommitteeMemberAddress.trim(),
					'CommitteeMemberEmail': this.state.CommitteeMemberEmail,
					'CommitteeMemberPhone': this.state.CommitteeMemberPhone,
					'CommitteeMemberPhotoURL': this.state.file
				});
			this.clear();
		}
	}

	render() {
		const { onCloseCommitteeMemberModal, open, committeeMember, onSaveCommitteeMember, getCommitteeMember } = this.props;
		const { CommitteeMemberId, CommitteeMemberName, CommitteeMemberDesignation, CommitteeMemberAddress, CommitteeMemberEmail, CommitteeMemberPhone, CommitteeMemberPhotoURL } = this.state;
		let thumb = CommitteeMemberId ?
			this.props.committeeMember.CommitteeMemberPhotoURL.data.length == 0 ?
				"http://localhost:8080/image.png"
				:
				new Buffer(this.props.committeeMember.CommitteeMemberPhotoURL.data).toString('base64')
			:
			"http://localhost:8080/image.png";
		return (
			<Modal className="modal-box" toggle={onCloseCommitteeMemberModal} isOpen={open}>
				<ModalHeader className="modal-box-header bg-primary">
					{committeeMember.CommitteeMemberId == '' ? "Add Member" : "Edit Member"}
					<IconButton className="text-white"
						onClick={(event) => { onCloseCommitteeMemberModal(); this.clear(); }}>
						<CloseIcon />
					</IconButton>
				</ModalHeader>
				<ValidatorForm
					onSubmit={this.handleSubmit.bind(this)}
				>
					<div className="modal-box-content d-flex flex-column">
						<label htmlFor="file-input" className="style">
							{CommitteeMemberId ?
								this.state.imagePreviewUrl ?
									<img className="rounded-circle avatar size-120" src={this.state.imagePreviewUrl} />
									:
									CommitteeMemberPhotoURL.data.length === 0 ?
										<img className="rounded-circle avatar size-120" src={thumb} />
										:
										<img className="rounded-circle avatar size-120" src={"data:image/jpeg;base64," + thumb} />
								:
								this.state.imagePreviewUrl ?
									<img className="rounded-circle avatar size-120" src={this.state.imagePreviewUrl} />
									:
									<img className="rounded-circle avatar size-120" src={thumb} />
							}
							<i className="zmdi zmdi-edit zmdi-hc-2x edit"></i>
							<input ref={(ref) => { this.uploadInput = ref; }} id="file-input" type="file" onChange={this._handleImageChange} accept="image/jpeg,image/jpg,image/png" />
						</label>
						<div className="style error">{this.state.imageError}</div>
						<TextValidator
							name="Name"
							id="required"
							label="Name"
							onChange={(event) => this.setState({ CommitteeMemberName: event.target.value })}
							validators={['required']}
							errorMessages={['This field is required']}
							value={CommitteeMemberName}
							margin="normal"
							InputProps={{ inputProps: { maxLength: 50 } }}
						/>
						<TextValidator
							id="required"
							name="Email"
							label="Email"
							onChange={(event) => this.setState({ CommitteeMemberEmail: event.target.value })}
							value={CommitteeMemberEmail}
							margin="normal"
							validators={['required', 'isEmail']}
							errorMessages={['this field is required', 'Please enter valid email address']}
							InputProps={{ inputProps: { maxLength: 254 } }}
						/>
						<TextValidator
							id="required"
							name="Phone"
							label="Phone"
							type="number"
							onChange={(event) => this.setState({ CommitteeMemberPhone: event.target.value })}
							value={CommitteeMemberPhone}
							margin="normal"
							validators={['required', 'matchRegexp:^([0-9]{10})$']}
							errorMessages={['This field is required', 'Please enter valid phone number']}
							onInput={(e) => {
								e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
							}}
						/>
						<TextValidator
							id="required"
							name="Designation"
							label="Designation"
							onChange={(event) => this.setState({ CommitteeMemberDesignation: event.target.value })}
							value={CommitteeMemberDesignation}
							margin="normal"
							InputProps={{ inputProps: { maxLength: 50 } }}
						/>
						<TextValidator
							id="required"
							name="Address"
							label="Address"
							onChange={(event) => this.setState({ CommitteeMemberAddress: event.target.value })}
							value={CommitteeMemberAddress}
							margin="normal"
							InputProps={{ inputProps: { maxLength: 500 } }}
						/>
					</div>
					<div className="modal-box-footer d-flex flex-row">
						<div>
							<Button color="primary" type="submit" className="jr-btn" raised>Save </Button>
							<Button color="default" className="jr-btn" onClick={() => {
								if (CommitteeMemberId) {
									this.setState({
										CommitteeMemberId: this.props.committeeMember.CommitteeMemberId,
										CommitteeMemberName: this.props.committeeMember.CommitteeMemberName,
										CommitteeMemberEmail: this.props.committeeMember.CommitteeMemberEmail,
										CommitteeMemberDesignation: this.props.committeeMember.CommitteeMemberDesignation,
										CommitteeMemberPhone: this.props.committeeMember.CommitteeMemberPhone,
										CommitteeMemberAddress: this.props.committeeMember.CommitteeMemberAddress,
										CommitteeMemberPhotoURL: this.props.committeeMember.CommitteeMemberPhotoURL,
										file: '',
										imagePreviewUrl: '',
										isPhotoValidate: true,
										imageError: ''
									});
								}
								else
									this.clear();
							}} raised>Discard</Button>
						</div>
					</div>
				</ValidatorForm>
			</Modal>
		);
	}
}

export default AddCommitteeMember;