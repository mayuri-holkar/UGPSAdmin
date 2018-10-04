import React from 'react';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { Redirect } from 'react-router-dom';
import CardBox from 'components/CardBox';
import Checkbox from 'material-ui/Checkbox';
import { FormControlLabel } from 'material-ui/Form';

class AddEditMember extends React.Component {
    constructor(props) {
        super(props);
        const {
            Gender,
            FullName,
            FatherName,
            SurName,
            Address,
            Taluka,
            Jeello,
            PinCode,
            HomePhone,
            Email,
            MobileNo,
            GrandFatherName,
            Gol,
            PetaAttak,
            MulVatan,
            OtherInformation,
            Ajivansabhyanumber,
            FileName,
            MemberId,
            IsActive,
        } = this.props.member;

        this.state = {
            Gender,
            FullName,
            FatherName,
            SurName,
            Address,
            Taluka,
            Jeello,
            PinCode,
            HomePhone,
            Email,
            MobileNo,
            GrandFatherName,
            Gol,
            PetaAttak,
            MulVatan,
            OtherInformation,
            Ajivansabhyanumber,
            MemberId,
            isEmailValidate: '',
            EmailError: '',
            saveButtonDisable: false,
            cancel: false,
            selectGenderError: '',
            pinError: '',
            homePhoneError: '',
            MobileError: '',
            ajivanNumberError: '',
            IsActive,
            FileName: '',
            isPhotoValidate: true,
            imagePreviewUrl: '',
            imageError: '',
            Image: nodeUrl+'/getStaticImage?token=' + JSON.parse(localStorage.getItem('user')).token
        }

        this.handleChange = this.handleChange.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handlePinKeyUp = this.keyUpHandler.bind(this, 'PinCode');
        this.handleHomePhoneKeyUp = this.keyUpHandler.bind(this, 'HomePhone');
        this.handleMobileNoKeyUp = this.keyUpHandler.bind(this, 'MobileNo');
        this.handleAjivansabhyanumberKeyUp = this.keyUpHandler.bind(this, 'Ajivansabhyanumber');
    }

    handleChange(e) {
        var n = e.target.name;
        this.setState({
            [e.target.name]: e.target.value
        },
            function () {
                this.showError(n);
            });
        if ((e.target.name == 'Gender') && (e.target.value != undefined)) {
            this.setState({ selectGenderError: '' })
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
                imageError: "Please select only image file ",
                isPhotoValidate: false,
                Image: nodeUrl+'/getStaticImage?token=' + JSON.parse(localStorage.getItem('user')).token
            });
        }
        else if (file.size > max_size) {
            this.setState({
                imageError: " Image size must be less than 500kb",
                isPhotoValidate: false,
                Image: nodeUrl+'/getStaticImage?token=' + JSON.parse(localStorage.getItem('user')).token
            });
        }
        else {
            reader.onloadend = (e) => {
                this.setState({
                    Image: e.target.result,
                    isPhotoValidate: true,
                    imagePreviewUrl: reader.result,
                    imageError: '',
                });
            }
            reader.readAsDataURL(file);
        }
    }

    handleGenderChange(e) {
        this.setState({ [e.target.name]: e.target.value, selectGenderError: '' })
    }

    keyUpHandler(refName, e) {
        if (refName == 'PinCode') {
            if (e.target.value == '' || e.target.value.match(/^[0-9]+$/)) {
                this.setState({ pinError: '' })
            }
            else {
                this.setState({ pinError: 'Only digits are allowed' })
            }
        }
        if (refName == 'HomePhone') {
            if (e.target.value == '' || e.target.value.match(/^[0-9]+$/)) {
                this.setState({ homePhoneError: '' })
            }
            else {
                this.setState({ homePhoneError: 'Only digits are allowed' })
            }
        }
        if (refName == 'MobileNo') {
            if (e.target.value == '' || e.target.value.match(/^[0-9]+$/)) {
                this.setState({ MobileError: '' })
            }
            else {
                this.setState({ MobileError: 'Only digits are allowed' })
            }
        }
        if (refName == 'Ajivansabhyanumber') {
            if (e.target.value == '' || e.target.value.match(/^[0-9]+$/)) {
                this.setState({ ajivanNumberError: '' })
            }
            else {
                this.setState({ ajivanNumberError: 'Only digits are allowed' })
            }
        }
    }

    showError(refName) {
        if (refName == 'Email') {
            let lastAtPos = this.state.Email.lastIndexOf('@');
            let lastDotPos = this.state.Email.lastIndexOf('.');
            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.Email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.Email.length - lastDotPos) > 2)) {
                this.setState({ isEmailValidate: false, EmailError: "Please enter valid email" });
            } else {
                this.setState({ isEmailValidate: true, EmailError: "" });
            }
        }
    }

    onCancelClick = () => {
        this.setState({ cancel: true });
    }

    Save = () => {
        if (this.state.EmailError == '' && this.state.pinError == '' && this.state.MobileError == '' && this.state.imageError == ''
            && this.state.homePhoneError == '' && this.state.ajivanNumberError == '' && this.state.Gender != '') {
            this.props.onSaveMember(
                {
                    'FullName': this.state.FullName,
                    'FatherName': this.state.FatherName,
                    'SurName': this.state.SurName,
                    'Address': this.state.Address,
                    'Taluka': this.state.Taluka,
                    'Jeello': this.state.Jeello,
                    'PinCode': this.state.PinCode,
                    'HomePhone': this.state.HomePhone,
                    'Email': this.state.Email,
                    'MobileNo': this.state.MobileNo,
                    'GrandFatherName': this.state.GrandFatherName,
                    'Gol': this.state.Gol,
                    'PetaAttak': this.state.PetaAttak,
                    'MulVatan': this.state.MulVatan,
                    'OtherInformation': this.state.OtherInformation,
                    'Ajivansabhyanumber': this.state.Ajivansabhyanumber,
                    'Gender': this.state.Gender,
                    'FileName': this.state.FileName != '' ? this.state.FileName : this.props.member.FileName,
                    'IsActive': this.state.IsActive,
                    'Image': this.state.Image,
                    'MemberId': this.state.MemberId,
                    'OldFileName': this.props.member.FileNameInFolder ? this.props.member.FileNameInFolder : ''
                });
            this.setState({ saveButtonDisable: true })
        }
        else
            if (this.state.Gender == '') {
                this.setState({ selectGenderError: 'This field is required' })
            }
    }

    render() {
        let user = JSON.parse(localStorage.getItem('user'));
        const formStyle = { paddingBottom: '25px', paddingTop: '25px' }
        const fontstyle = { fontsize: '45px' }
        const cardstyle = { paddingBottom: '0px', marginBottom: '0px', paddingTop: '15px' }
        const headStyle = { paddingTop: '20px', paddingBottom: '10px', marginBottom: '10px' }
        const { onSaveMember, onDeleteMember, open, member } = this.props;
        const s = { display: 'none' };
        const { Gender, FullName, FatherName, SurName, Address, Taluka, Jeello, PinCode, HomePhone, FileName,
            Email, MobileNo, GrandFatherName, Gol, PetaAttak, MulVatan, OtherInformation, Ajivansabhyanumber, image, IsActive } = member;

        return (
            <div className="row animated slideInUpTiny animation-duration-5">
                <div className="col-lg-12 " id="cardbox" style={cardstyle} >
                    <div className="page-heading d-sm-flex align-items-sm-center" id="pageHeading">
                        <div className="col-md-7">
                            <h2 className="title mb-3 mb-sm-0" style={fontstyle}> Member</h2>
                        </div>
                    </div>
                    <ValidatorForm ref="form" onSubmit={this.Save}>
                        <div className="row">
                            <CardBox styleName="col-lg-12" cardStyle="no-Margin">
                                <div className="row">
                                    <div className="col-md-8 col-12 ">
                                        <label htmlFor="file-input" className=" content-center" >
                                            {
                                                (member.MemberId) ?
                                                    (this.state.imagePreviewUrl != '') ?
                                                        <img className="rounded-circle avatar size-100" src={this.state.Image} name="img" />
                                                        : (member.FileName != 'undefined') ?
                                                            <img className="rounded-circle avatar size-100" name="img"
                                                                src={nodeUrl+'/getPhoto/' + member.MemberId + '/' + member.FileNameInFolder + '?token=' + user.token} />
                                                            : <img className="rounded-circle avatar size-100" src={this.state.Image} name="img" />
                                                    :
                                                    <img className="rounded-circle avatar size-100" src={this.state.Image} name="img" />
                                            }
                                            <input ref={(ref) => { this.uploadInput = ref; }} id="file-input" type="file" name="FileName" className="filetype"
                                                accept="image/jpeg,image/jpg,image/png" onChange={this.onImageChange} style={s} />
                                        </label>
                                        <div className="style error">{this.state.imageError}</div>
                                    </div>
                                    <div className="col-md-3 ">
                                        <div className="form-group">
                                            <label htmlFor="other">Aajivan Sabhya Number</label> <span className="text-danger">*</span>
                                            <input ref="Ajivansabhyanumber" type="text" className="form-control form-control-md" placeholder="Aajivan Sabhya Number" required="true" maxLength="4" minLength="4"
                                                name="Ajivansabhyanumber" onChange={this.handleChange} onKeyUp={this.handleAjivansabhyanumberKeyUp} value={this.state.Ajivansabhyanumber} />
                                            <div className="style error">{this.state.ajivanNumberError}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardBox>
                            <CardBox styleName="col-lg-12">
                                <div><h3><b>Member Details</b></h3>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label form="Fullname">First Name</label> <span className="text-danger">*</span>
                                                <input htmlFor="Fullname" className="form-control form-control-md" name="FullName" type="text" value={this.state.FullName}
                                                    maxLength="50" onChange={this.handleChange} required="true" placeholder="Full Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="Surname">Surname</label> <span className="text-danger">*</span>
                                                <input className="form-control form-control-md" name="SurName" type="text" value={this.state.SurName}
                                                    maxLength="50" onChange={this.handleChange} required="true" placeholder="Surname" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="address">Address</label> <span className="text-danger">*</span>
                                                <textarea className="form-control form-control-md" rows="1" placeholder="Address" required="true"
                                                    maxLength="500" name="Address" value={this.state.Address} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="Taluka">Taluka</label> <span className="text-danger">*</span>
                                                <input className="form-control form-control-md" name="Taluka" type="text" value={this.state.Taluka}
                                                    maxLength="50" onChange={this.handleChange} required="true" placeholder="Taluka" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="Jeello">Jeello</label> <span className="text-danger">*</span>
                                                <input className="form-control form-control-md" name="Jeello" type="text" value={this.state.Jeello}
                                                    maxLength="50" onChange={this.handleChange} required="true" placeholder="Jeello" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="MulVatan">Mul Vatan</label> <span className="text-danger">*</span>
                                                <input className="form-control form-control-md" id="MulVatan" type="text" value={this.state.MulVatan}
                                                    maxLength="50" name="MulVatan" onChange={this.handleChange} required="true" placeholder="Mul Vatan" />
                                            </div>
                                        </div> <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="email">Email Id</label> <span className="text-danger">*</span>
                                                <input className="form-control form-control-md" name="Email" type="text" value={this.state.Email}
                                                    maxLength="50" onChange={this.handleChange} required="true" placeholder="Email Id" />
                                                <div className="style error">{this.state.EmailError}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label form="Gender">Gender</label><span className="text-danger"> *</span>
                                                <select value={this.state.Gender} className="form-control form-control-md" name="Gender" onChange={this.handleGenderChange}>
                                                    <option value="" disabled> Select Gender</option>
                                                    <option key="Male"> Male</option>
                                                    <option key="Female">Female</option>
                                                </select>
                                                <div className="style error">{this.state.selectGenderError}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="Pincode">Pin Code</label> <span className="text-danger">*</span>
                                                <input ref="PinCode" className="form-control form-control-md" name="PinCode" type="text" minLength="6" maxLength="6" value={this.state.PinCode}
                                                    onKeyUp={this.handlePinKeyUp} onChange={this.handleChange} required="true" placeholder="Pin Code" />
                                                <div className="style error">{this.state.pinError}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="homephone">Home Phone</label> <span className="text-danger">*</span>
                                                <input ref="HomePhone" className="form-control form-control-md" name="HomePhone" type="tel" minLength="10" maxLength="10" value={this.state.HomePhone}
                                                    onKeyUp={this.handleHomePhoneKeyUp} onChange={this.handleChange} required="true" placeholder="Home Phone" />
                                                <div className="style error">{this.state.homePhoneError}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="mobile">Mobile</label> <span className="text-danger">*</span>
                                                <input ref={MobileNo} className="form-control form-control-md" name="MobileNo" type="tel" minLength="10" maxLength="10" value={this.state.MobileNo}
                                                    onKeyUp={this.handleMobileNoKeyUp} onChange={this.handleChange} required="true" placeholder="Mobile" />
                                                <div className="style error">{this.state.MobileError}</div>
                                            </div>
                                        </div>

                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="other">Other Information</label>
                                                <textarea className="form-control form-control-md" rows="1" placeholder="Other Information"
                                                    maxLength="500" name="OtherInformation" value={this.state.OtherInformation} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <br /> <h3><b>Family Details</b></h3>
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="Fathername">Father's Name</label> <span className="text-danger">*</span>
                                                <input className="form-control form-control-md" name="FatherName" type="text" value={this.state.FatherName}
                                                    maxLength="50" onChange={this.handleChange} required="true" placeholder="Father's Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="Grandfather">Grandfather's Name</label> <span className="text-danger">*</span>
                                                <input className="form-control form-control-md" name="GrandFatherName" type="text" value={this.state.GrandFatherName}
                                                    maxLength="50" onChange={this.handleChange} required="true" placeholder="Grandfather's Name" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="Gol">Gol</label> <span className="text-danger">*</span>
                                                <input className="form-control form-control-md" name="Gol" type="text" value={this.state.Gol}
                                                    maxLength="50" onChange={this.handleChange} required="true" placeholder="Gol" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label htmlFor="PetaAttak">PetaAttak</label> <span className="text-danger">*</span>
                                                <input className="form-control form-control-md" name="PetaAttak" type="text" value={this.state.PetaAttak}
                                                    maxLength="50" onChange={this.handleChange} required="true" placeholder="PetaAttak" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group" style={{ marginBottom: '0px' }}>
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
                                                <Button type="submit" raised className="jr-btn bg-light-green text-white" disabled={this.state.saveButtonDisable} style={{ marginBottom: '10px' }}>Submit</Button>
                                                <Button raised className="jr-btn bg-grey text-white" onClick={this.onCancelClick} style={{ left: '10px' }}>Cancel
                                                   {this.state.cancel && <Redirect to={{ pathname: '/app/memberslist' }} />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBox>
                        </div>
                    </ValidatorForm>
                </div>
            </div>
        );
    }
}
export default AddEditMember;