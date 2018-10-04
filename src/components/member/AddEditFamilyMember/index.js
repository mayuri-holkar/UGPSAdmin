import React from 'react';
import { Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import CardBox from 'components/CardBox';
import { FormControlLabel } from 'material-ui/Form';
import Checkbox from 'material-ui/Checkbox';
import { ValidatorForm } from 'react-material-ui-form-validator';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class AddEditFamilyMember extends React.Component {
	constructor(props) {
		super(props);
		const {
            Name,
			Relation,
			Dob,
			BloodGroup,
			Education,
			MaritalStatus,
			MarriageDate,
			LookingForPartner,
			PartnerHeight,
			Occupation,
			OccupationType,
			BusinessAddress,
			Mobile,
			Email,
			Filename,
			image,
			FamilyMemberId,
			Gender,
			Weight,
			SkinTone,
			City,
			Citizenship,
			Native,
			Manglik,
			Handicaped,
        } = this.props.familymember

		this.state = {
			Name,
			Relation,
            Dob: this.props.familymember.Dob == '' || this.props.familymember.Dob == undefined ? '' : moment(Dob, "DD-MM-YYYY").format("YYYY-MM-DD"),
			BloodGroup,
			Education,
			Native,
			MaritalStatus,
            MarriageDate: this.props.familymember.MarriageDate == '' ? '' : moment(MarriageDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
			LookingForPartner,
			FamilyMemberId,
			PartnerHeight: this.props.familymember.PartnerHeight == null ? '' : this.props.familymember.PartnerHeight,
			Occupation,
			OccupationType,
			BusinessAddress,
			Mobile,
			Email,
			Filename,
			Weight,
			SkinTone,
			Gender,
			City,
			Citizenship,
			Manglik,
			Handicaped,
			dateStatus: this.props.familymember.MaritalStatus === "Married" ? false : true,
			hideMatrimonial: this.props.familymember.LookingForPartner === 'Yes' ? false : true,
			isPhotoValidate: true,
			imageError: '',
			imagePreviewUrl: '',
			selectMaritalStatusError: '',
			selectBloodgrpError: '',
			MobileError: '',
			EmailError: '',
			selectGenderError: '',
			image: nodeUrl + '/getStaticImage?token=' + JSON.parse(localStorage.getItem('user')).token,
			hideStatus: this.props.familymember.MaritalStatus ? this.props.familymember.MaritalStatus === 'Married' ? false : true : true,
			ageError: '',
			selectOccupationError: '',
			selectCityError: '',
			selectCityzenshipError: '',
			selectNativeError: '',
			selectEducationError: '',
			selectHeightError: '',
			marrigeDateError: '',
		}

		this.handleMarritalStatus = this.handleMarritalStatus.bind(this);
		this.handlePartner = this.handlePartner.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.onImageChange = this.onImageChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.handleMobileNoKeyUp = this.keyUpHandler.bind(this, 'Mobile');
		this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
		this.handleMarriageDate = this.handleMarriageDate.bind(this);
	}

	componentWillMount() {
		this.checkHide();
	}

	handleMarriageDate = (date) => {
        this.setState({ MarriageDate: date.target.value }, function () { this.checkMarrigeDate(); });
	}

    handleDateOfBirth = (date) => {
        this.setState({ Dob: date.target.value }, function () { this.checkAge(); this.checkHide(); this.checkMarrigeDate() });
	}

	handleChange(e) {
		var n = e.target.name;
		var value = e.target.value;
		this.setState({ [e.target.name]: e.target.value }, function () {
			this.showError(n);
		});
	}

	checkMarrigeDate = () => {
		if (this.state.Dob && this.state.MarriageDate) {
			if (moment(this.state.MarriageDate).diff(this.state.Dob, 'years') < 18) {
				this.setState({
					marrigeDateError: 'Age must be greater than 18'
				});
			}
			else {
				this.setState({ marrigeDateError: '' });
			}
		}
		if (this.state.marrigeDateError && this.state.MarriageDate == '') {
			this.setState({
				marrigeDateError: ''
			});
		}
	}

	checkAge = () => {
		if (this.state.MaritalStatus && this.state.MaritalStatus != 'Unmarried') {
			if (this.state.Dob && moment().diff(this.state.Dob, 'years') < 18) {
				this.setState({
					ageError: 'Age must be greater than 18'
				});
			}
			else {
				this.setState({ ageError: '' });
			}
		}
		else {
			this.setState({
				ageError: ''
			});
		}
	}

	keyUpHandler(refName, e) {
		if (refName == 'Mobile') {
			if (e.target.value == '' || e.target.value.match(/^[0-9]+$/)) {
				this.setState({ MobileError: '' })
			}
			else {
				this.setState({ MobileError: 'Only digits are allowed' })
			}
		}
	}

	handleMarritalStatus(e) {
		var name = e.target.value;
		this.setState({
			[e.target.name]: e.target.value
		},
			function () {
				if (name != 'Married') {
					this.checkAge();
					this.checkHide();
				}
				else
					this.checkAge();
			});
		if (e.target.value == "Married") {
			this.setState({
				dateStatus: false,
				selectMaritalStatusError: '',
				hideStatus: false,
			})
		}
		else {
			this.setState({
				dateStatus: true,
				MarriageDate: '',
				selectMaritalStatusError: '',
				marrigeDateError: '',
			})
		}
	}

	showError(refName) {
		if (refName == 'Email') {
			let lastAtPos = this.state.Email.lastIndexOf('@');
			let lastDotPos = this.state.Email.lastIndexOf('.');
			if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.Email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.Email.length - lastDotPos) > 2) && this.state.Email != '') {
				this.setState({ isEmailValidate: false, EmailError: "Please enter valid email" });
			} else {
				this.setState({ isEmailValidate: true, EmailError: "" });
			}
		}
	}

	handleSelectChange(e) {
		if (e.target.name == 'City') {
			this.setState({ selectCityError: '' });
		}
		else if (e.target.name == 'Citizenship') {
			this.setState({ selectCityzenshipError: '' })
		}
		else if (e.target.name == 'Native') {
			this.setState({ selectNativeError: '' })
		}
		else if (e.target.name == 'PartnerHeight') {
			this.setState({ selectHeightError: '' })
		}
		else if (e.target.name == 'Education') {
			this.setState({ selectEducationError: '' })
		}
		else if (e.target.name == 'BloodGroup') {
			this.setState({ selectBloodgrpError: '' })
		}
		else if (e.target.name == 'Occupation') {
			this.setState({ selectOccupationError: '' })
		}
		else {
			this.setState({ selectGenderError: '' })
		}
		this.setState({ [e.target.name]: e.target.value });
	}

	handlePartner(e) {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.value == "Yes") {
			this.setState({ hideMatrimonial: false })
		}
		else {
			this.setState({ hideMatrimonial: true, Weight: '', SkinTone: '', Manglik: '', Handicaped: false })
		}
	}

	onImageChange(e) {
		e.preventDefault();
		this.setState({ [e.target.name]: e.target.files[0].name });
		let reader = new FileReader();
		let file = e.target.files[0];
		let max_size = 512000;
		if (!file.name.endsWith('.jpg') && !file.name.endsWith('.png') && !file.name.endsWith('.jpeg')) {
			this.setState({
				imageError: "Please select only image file",
				isPhotoValidate: false,
				Image: nodeUrl + '/getStaticImage?token=' + JSON.parse(localStorage.getItem('user')).token
			});
		}
		else if (file.size > max_size) {
			this.setState({
				imageError: " Image size must be less than 500kb",
				isPhotoValidate: false,
				Image: nodeUrl + '/getStaticImage?token=' + JSON.parse(localStorage.getItem('user')).token
			});
		}
		else {
			reader.onloadend = (e) => {
				this.setState({
					image: e.target.result,
					isPhotoValidate: true,
					imagePreviewUrl: reader.result,
					imageError: '',
				});
			}
			reader.readAsDataURL(file);
		}
	}

	onsubmit = () => {
		if (this.state.MaritalStatus && this.state.BloodGroup && this.state.Gender && this.state.Occupation && this.state.City && this.state.Citizenship && this.state.Native //&& this.state.PartnerHeight
			&& this.state.Education && this.state.EmailError == '' && this.state.imageError == '' && this.state.ageError == '' && this.state.MobileError == '' && this.state.selectHeightError == '' && this.state.marrigeDateError == '') {
			this.props.onCloseFamilyMemberModal();
			this.props.onSaveFamilyMember(
				{
					Name: this.state.Name,
					Relation: this.state.Relation,
                    Dob:moment(this.state.Dob).format('DD-MM-YYYY'),
					BloodGroup: this.state.BloodGroup,
					Education: this.state.Education,
					MaritalStatus: this.state.MaritalStatus,
                    MarriageDate:moment(this.state.MarriageDate).format('DD-MM-YYYY'),
					LookingForPartner: this.state.LookingForPartner,
					PartnerHeight: this.state.PartnerHeight,
					Occupation: this.state.Occupation,
					OccupationType: this.state.Occupation == 'Service' ? this.state.OccupationType : '',
					BusinessAddress: this.state.BusinessAddress,
					Mobile: this.state.Mobile,
					Email: this.state.Email,
					Filename: this.state.Filename != '' ? this.state.Filename : this.props.familymember.Filename,
					FamilyMemberId: this.state.FamilyMemberId ? this.state.FamilyMemberId : '',
					file: this.state.image,
					MemberId: this.props.familymember.MemberId,
					Gender: this.state.Gender,
					Weight: this.state.Weight,
					SkinTone: this.state.SkinTone,
					OldFileName: this.props.familymember.FileNameInFolder ? this.props.familymember.FileNameInFolder : '',
					City: this.state.City,
					Citizenship: this.state.Citizenship,
					Native: this.state.Native,
					Manglik: this.state.Manglik,
					Handicaped: this.state.Handicaped,
					Age: this.state.Dob && moment().diff(this.state.Dob, 'years')
				});
			this.closeModalConfirm();
		}
		else {
			if (!this.state.BloodGroup) {
				this.setState({ selectBloodgrpError: 'This field is required' })
			}
			else if (!this.state.Gender) {
				this.setState({ selectGenderError: 'This field is required' })
			}
			else if (!this.state.MaritalStatus) {
				this.setState({ selectMaritalStatusError: 'This field is required' })
			}
			else if (!this.state.City) {
				this.setState({ selectCityError: 'This field is required' })
			}
			else if (!this.state.Citizenship) {
				this.setState({ selectCityzenshipError: 'This field is required' })
			}
			else if (!this.state.Native) {
				this.setState({ selectNativeError: 'This field is required' })
			}
			else if (!this.state.PartnerHeight) {
				this.setState({ selectHeightError: 'This field is required' })
			}
			else if (!this.state.Education) {
				this.setState({ selectEducationError: 'This field is required' })
			}
			else if (!this.state.Occupation) {
				this.setState({ selectOccupationError: 'This field is required' })
			}
		}
	}

	closeModalConfirm = () => {
		this.props.onCloseFamilyMemberModal();
		this.setState({
			Name: '',
			Relation: '',
			Dob: '',
			BloodGroup: '',
			Education: '',
			MaritalStatus: '',
			MarriageDate: '',
			LookingForPartner: '',
			PartnerHeight: '',
			Occupation: '',
			OccupationType: '',
			BusinessAddress: '',
			Mobile: '',
			Email: '',
			file: '',
			Gender: '',
			Weight: '',
			SkinTone: '',
			Filename: '',
			image: nodeUrl + '/getStaticImage?token=' + JSON.parse(localStorage.getItem('user')).token,
			selectBloodgrpError: '',
			selectMaritalStatusError: '',
			selectGenderError: '',
			selectOccupationError: '',
			EmailError: '',
			dateStatus: true,
			hideMatrimonial: true,
			hideStatus: true,
			age: '',
			ageError: '',
			City: '',
			Citizenship: '',
			Native: '',
			Manglik: '',
			Handicaped: false,
            marrigeDateError: '',
            imageError:''
		})
	}

	checkHide = () => {
		if (this.state.MaritalStatus && this.state.MaritalStatus != 'Married') {
			if (!this.state.Dob) {
				this.setState({ hideStatus: true });
			}
			else {
				this.setState({
					hideStatus: moment().diff(this.state.Dob, 'years') < 18 ? false : true
				});
			}
		}
	}

	render() {
		let user = JSON.parse(localStorage.getItem('user'));
		const { Name, Relation, Dob, BloodGroup, Education, OccupationType, MaritalStatus, MarriageDate, LookingForPartner, Handicaped,
			PartnerHeight, Occupation, BusinessAddress, Mobile, Email, Filename, dateStatus, image, Gender, Weight, SkinTone, heightStatus, Native, City, Citizenship } = this.state;
		const { onSaveFamilyMember, onDeleteFamilyMember, onCloseFamilyMemberModal, open, familymember, FMemId, showfamily, imageURL, FamilyMemberId, MemberName } = this.props;
		const formStyle = { paddingBottom: '25px', paddingTop: '25px' }
		const imagestyle = { align: 'center', marginLeft: '264px', marginBottom: '20px' };
		return (
			<Modal isOpen={open} toggle={onCloseFamilyMemberModal} className="modal-lg">
				<ModalHeader className="modal-box-header bg-primary">
					<div className="col text-white text-center" > <h2><b>{this.props.MemberName ? MemberName : ''}</b> </h2> </div>
					<IconButton className="text-white"
						onClick={this.closeModalConfirm}>
						<CloseIcon />
					</IconButton>
				</ModalHeader>
				<ModalBody>
					<div className="col-md-12 contact-form jr-card content-center" style={formStyle}>
						<div className="row" style={imagestyle}>
							<label htmlFor="fileinput">
								{
									(familymember.FamilyMemberId) ?
										(this.state.imagePreviewUrl != '') ?
											<img className="rounded-circle avatar size-100" src={this.state.image} name="img" />
											: (familymember.Filename) ?
												<img className="rounded-circle avatar size-100" name="img"
													src={nodeUrl + '/getImage/' + familymember.MemberId + '/' + familymember.FamilyMemberId + '/' + familymember.FileNameInFolder + '?token=' + user.token} />
												:
												<img className="rounded-circle avatar size-100" src={this.state.image} name="img" />
										:
										<img className="rounded-circle avatar size-100" src={this.state.image} name="img" />
								}
								<input ref={(ref) => { this.uploadInput = ref; }} id="fileinput" type="file" name="Filename" className="filetype"
									accept="image/jpeg,image/jpg,image/png" onChange={this.onImageChange} />
							</label>
							<div className="style error">{this.state.imageError}</div>
						</div>
						<ValidatorForm ref="form" onSubmit={this.onsubmit}>
							<div className="row">
								<CardBox styleName="col-lg-12">
									<div><h3><b>Member Details</b></h3>
										<div className="row">
											<div className="col-md-4">
												<div className="form-group">
													<label form="name">Name</label><span className="text-danger"> *</span>
													<input type="text" className="form-control form-control-md" name="Name" type="text"
														value={this.state.Name} onChange={this.handleChange} required="true" placeholder="Name" maxLength="50" />
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<label form="relation">Relation</label><span className="text-danger"> *</span>
													<input className="form-control form-control-md" name="Relation" type="text" onChange={this.handleChange}
														value={this.state.Relation} required="true" placeholder="Relation" maxLength="50" />
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<label form="Dob">Date Of Birth</label><span className="text-danger"> *</span>
                                                    <Input type="date" name="Dob" className="form-control form-control-md" placeholder="date placeholder" onChange={this.handleDateOfBirth.bind(this)} value={this.state.Dob} required="true" />
													<div className="style error">{this.state.ageError}</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-4">
												<div className="form-group">
													<label form="bg">Blood Group</label><span className="text-danger"> *</span>
													<select className="form-control form-control-md" name="BloodGroup" value={this.state.BloodGroup} onChange={this.handleSelectChange}>
														<option disabled> Select Blood Group</option>
														<option value="A+">A+</option>
														<option value="B+">B+</option>
														<option value="A-">A-</option>
														<option value="B-">B-</option>
														<option value="O+">O+</option>
														<option value="O-">O-</option>
														<option value="AB+">AB+</option>
														<option value="AB-">AB-</option>
													</select>
													<div className="style error">{this.state.selectBloodgrpError}</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<label form="mobile">Mobile Number</label>
													<input ref="Mobile" className="form-control form-control-md" name="Mobile" type="tel" maxLength="10" minLength="10"
														required={!this.state.hideMatrimonial} value={this.state.Mobile} onKeyUp={this.handleMobileNoKeyUp} onChange={this.handleChange} placeholder="Mobile Number" />
													<div className="style error">{this.state.MobileError}</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<label form="email">Email Id</label>
													<input className="form-control form-control-md" name="Email" type="text" onChange={this.handleChange}
														required={!this.state.hideMatrimonial} value={this.state.Email} placeholder="Email Id" maxLength="50" />
													<div className="style error">{this.state.EmailError}</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-4">
												<div className="form-group">
													<label form="Gender">Gender</label><span className="text-danger"> *</span>
													<select value={this.state.Gender} className="form-control form-control-md" name="Gender" onChange={this.handleSelectChange}>
														<option value={this.state.value} disabled> Select Gender</option>
														<option key="Male"> Male</option>
														<option key="Female">Female</option>
													</select>
													<div className="style error">{this.state.selectGenderError}</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<label form="MaritalStatus">Marital Status</label><span className="text-danger"> *</span>
													<select value={this.state.MaritalStatus} className="form-control form-control-md" name="MaritalStatus" onChange={this.handleMarritalStatus}>
														<option value={this.state.value} disabled> Select Marital Status</option>
														<option key="Married"> Married</option>
														<option key="Unmarried">Unmarried</option>
														<option key="Widower">Widower</option>
														<option key="Divorced">Divorced</option>
													</select>
													<div className="style error">{this.state.selectMaritalStatusError}</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<label form="MarriageDate">Marriage Date</label>
                                                    <Input type="date" name="MarriageDate" className="form-control form-control-md" placeholder="date placeholder" disabled={this.state.dateStatus} onChange={this.handleMarriageDate.bind(this)} value={this.state.MarriageDate} required="true" />
													<div className="style error">{this.state.marrigeDateError}</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-4">
												<div className="form-group">
													<label form="City">City</label><span className="text-danger"> *</span>
													<select value={this.state.City} className="form-control col-md-12" onChange={this.handleSelectChange} name="City">
														<option value={this.state.value} disabled>Select City</option>
														{
															this.props.cities ?
																this.props.cities.map((city) =>
																	city.CityName !== 'All' ? <option key={city.CityId} value={city.CityId}>{city.CityName} </option> : null)
																:
																null
														}
													</select>
													<div className="style error">{this.state.selectCityError}</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<label form="Citizenship">Citizenship</label><span className="text-danger"> *</span>
													<select value={this.state.Citizenship} className="form-control col-md-12" onChange={this.handleSelectChange} name="Citizenship">
														<option value={this.state.value} disabled>Select Citizenship</option>
														{
															this.props.citizenships ?
																this.props.citizenships.map((citizenship) =>
																	citizenship.Description != 'All' ? <option key={citizenship.CitizenshipId} value={citizenship.CitizenshipId}>{citizenship.Description} </option> : null)
																:
																null
														}
													</select>
													<div className="style error">{this.state.selectCityzenshipError}</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<label form="Native">Native</label><span className="text-danger"> *</span>
													<select value={this.state.Native} className="form-control col-md-12" onChange={this.handleSelectChange} name="Native">
														<option value={this.state.value} disabled>Select Native</option>
														{
															this.props.natives ?
																this.props.natives.map((native) =>
																	native.Name != 'All' ? < option key={native.NativeId} value={native.NativeId} > {native.Name} </option> : null)
																:
																null
														}
													</select>
													<div className="style error">{this.state.selectNativeError}</div>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-4">
												<div className="form-group">
													<label form="partnerheight">Height</label><span className="text-danger"> *</span>
													<select value={this.state.PartnerHeight} className="form-control col-md-12" onChange={this.handleSelectChange} name="PartnerHeight" >
														<option value={this.state.value} disabled>Select Height</option>
														{
															this.props.heights ?
																this.props.heights.map((height) =>
																	height.Description != 'All' ? < option key={height.HeightId} value={height.HeightId} > {height.Description} </option> : null)
																:
																null
														}
													</select>
													<div className="style error">{this.state.selectHeightError}</div>
												</div>
											</div>
										</div>
									</div>
								</CardBox>
								<CardBox styleName="col-lg-12">
									<div><h3><b>Education And Profession</b></h3>
										<div className="row">
											<div className="col-md-4">
												<div className="form-group">
													<label form="Education">Education</label><span className="text-danger"> *</span>
													<select value={this.state.Education} className="form-control col-md-12" onChange={this.handleSelectChange} name="Education">
														<option value={this.state.value} disabled>Select Education</option>
														{
															this.props.education ?
																this.props.education.map((education) =>
																	education.Description != 'All' ? < option key={education.EducationId} value={education.EducationId} > {education.Description} </option> : null)
																:
																null
														}
													</select>
													<div className="style error">{this.state.selectEducationError}</div>
												</div>
											</div>
											<div className="col-md-4">
												<div className="form-group">
													<label form="Occupation">Occupation</label><span className="text-danger"> *</span>
													<select value={this.state.Occupation} className="form-control form-control-md" name="Occupation" onChange={this.handleSelectChange}>
														<option value={this.state.value} disabled> Select Occupation </option>
														<option key="Service"> Service</option>
														<option key="Business">Business</option>
													</select>
													<div className="style error">{this.state.selectOccupationError}</div>
												</div>
											</div>
											{this.state.Occupation == 'Service' ?
												<div className="col-md-4">
													<div className="form-group">
														<label form="OccupationType">Occupation Type</label><span className="text-danger"> *</span>
														<input className="form-control form-control-md" name="OccupationType" type="text" onChange={this.handleChange}
															value={this.state.OccupationType} required="true" placeholder="Occupation Type" maxLength="50" />
													</div>
												</div>
												:
												<div className="col-md-4">
													<div className="form-group">
														<label form="BusinessAddress">Business Address</label><span className="text-danger"> *</span>
														<textarea className="form-control form-control-md" name="BusinessAddress" rows="1" onChange={this.handleChange}
															value={this.state.BusinessAddress} required="true" placeholder="Business Address" maxLength="50" />
													</div>
												</div>
											}
										</div>
										{this.state.Occupation == 'Service' ?
											<div className="row">
												<div className="col-md-4">
													<div className="form-group">
														<label form="BusinessAddress">Business Address</label><span className="text-danger"> *</span>
														<textarea className="form-control form-control-md" name="BusinessAddress" rows="1" onChange={this.handleChange}
															value={this.state.BusinessAddress} required="true" placeholder="Business Address" maxLength="50" />
													</div>
												</div>
											</div>
											: null}
									</div>
								</CardBox>
								{
									this.state.hideStatus ?
										<CardBox styleName="col-lg-12">
											<div><h3><b>Matrimonial Details</b></h3>
												<div className="row">
													<div className="col-md-4">
														<div className="form-group">
															<label form="partnerStatus">Looking For Partner?</label>
															<select value={this.state.LookingForPartner} className="form-control form-control-md" name="LookingForPartner" onChange={this.handlePartner}>
																<option value="" disabled> Select</option>
																<option value="Yes">Yes</option>
																<option value="No">No</option>
															</select>
														</div>
													</div>

													<div className="col-md-4">
														<div className="form-group">
															<label form="Weight">Weight</label>
															<input type="text" className="form-control form-control-md" name="Weight" onChange={this.handleChange}
																disabled={this.state.hideMatrimonial} value={this.state.Weight} placeholder="Weight" maxLength="50" />
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-group">
															<label form="SkinTone">Skin Tone</label>
															<input type="text" className="form-control form-control-md" name="SkinTone" onChange={this.handleChange}
																disabled={this.state.hideMatrimonial} value={this.state.SkinTone} placeholder="Skin Tone" maxLength="50" />
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-md-4">
														<div className="form-group">
															<label form="Manglik">Manglik?</label>
															<select value={this.state.Manglik} className="form-control form-control-md" name="Manglik" onChange={this.handleChange} disabled={this.state.hideMatrimonial}>
																<option value="" disabled>Select</option>
																<option value="Yes">Yes</option>
																<option value="No">No</option>
															</select>
														</div>
													</div>
													<div className="col-md-4">
														<div className="form-group">
															<br />
															<FormControlLabel label="Tick for handicap?"
																control={
																	<Checkbox
																		checked={this.state.Handicaped}
																		onChange={(event) => this.setState({ Handicaped: event.target.checked })}
																		value={this.state.Handicaped}
																		disabled={this.state.hideMatrimonial}
																	/>}
															/>
														</div>
													</div>
												</div>
											</div>
										</CardBox>
										: null
								}
								<div className="row">
									<div className="col-md-4">
										<div className="form-group ">
											<Button type="submit" raised className="jr-btn bg-light-green text-white" style={{ left: '10px' }}>Submit</Button>
										</div>
									</div>
								</div>
							</div>
						</ValidatorForm>
					</div>
				</ModalBody>
			</Modal>
		);
	}
}
export default AddEditFamilyMember;
