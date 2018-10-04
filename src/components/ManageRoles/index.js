import React from 'react';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Select from 'material-ui/Select';
import { FormControlLabel } from 'material-ui/Form';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import CardBox from 'components/CardBox';
import Checkbox from 'material-ui/Checkbox';
import Switch from 'material-ui/Switch';

class ManageRoles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systemUser: '',
            systemUserId: '',
            isUserSelected: false,
            isModuleSelected: []
        }
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    handleChangeUser(e) {
        this.props.getAllSecurityModules();
        this.setState({ isUserSelected: false, systemUserId: e.target.value })
        var moduleList = this.props.securityModuleList;
        for (let i = 0; i < moduleList.length; i++) {
            if (moduleList[i].getJoinedData != '') {
                for (let j = 0; j < moduleList[i].getJoinedData.length; j++) {
                    if (moduleList[i].getJoinedData[j].SystemUserId == e.target.value) {
                        this.state.isModuleSelected[i] = moduleList[i].getJoinedData[j].IsActive;
                    }
                }
            }
        }
        this.setState({ isModuleSelected: this.state.isModuleSelected, systemUser: e.target.value, isUserSelected: true })
    }

    handleChangeCheckbox(event, index, module) {
        const value = event.target.checked;
        var userModuleId;
        this.state.isModuleSelected[index] = value;
        this.setState({ isModuleSelected: this.state.isModuleSelected })
        if (module.getJoinedData != '') {
            for (let i = 0; i < module.getJoinedData.length; i++) {
                if (module.getJoinedData[i].SystemUserId == this.state.systemUserId && module.getJoinedData[i].SecurityModuleId == module.SecurityModuleId) {
                    userModuleId = module.getJoinedData[i].UserModuleId
                }
            }
        }
        this.props.onSaveUserModule({
            'SystemUserId': this.state.systemUserId,
            'SecurityModuleId': module.SecurityModuleId,
            'IsActive': value,
            'UserModuleId': userModuleId != undefined ? userModuleId : ''
        })
    };

    render() {
        return (
            <div className="row animated slideInUpTiny animation-duration-5">
                <div className="col-lg-12">
                    <div className="module-box">
                        <div className="page-heading d-sm-flex align-items-sm-center"
                            style={{ marginLeft: '15px', marginTop: '15px', paddingTop: '25px', paddingBottom: '25px', marginRight: '10px', paddingLeft: '0px' }}>
                            <div className="col-md-7">
                                <h2 className="title mb-3 mb-sm-0">Manage Roles</h2>
                            </div>
                        </div>
                        <CardBox styleName="col-lg-12">
                            <ValidatorForm ref="form" onSubmit={this.handleChangeCheckbox} >
                                <div className="col-md-6 row">
                                    <div className="col-md-4">
                                        <label style={{ fontSize: '15px', paddingTop: '10px' }}><b>System Users :</b></label>
                                    </div>
                                    <div className="col-md-8">
                                        <select value={this.state.systemUser} className="form-control col-md-12" onChange={this.handleChangeUser}>
                                            <option value="" disabled>Select System User</option>
                                            {
                                                this.props.systemUserList ?
                                                    this.props.systemUserList.map((User) =>
                                                        User.IsSuperAdmin == false ?
                                                            <option key={User.UserId} value={User.UserId}> {User.FirstName} {User.LastName} </option> : null)
                                                    :
                                                    null
                                            }
                                        </select>
                                    </div>
                                </div><br /><br />
                                {this.state.isUserSelected ?
                                    <CardBox styleName="col-lg-8">
                                        <div className="form-group">
                                            <label className="col-md-4" style={{ paddingLeft: '0px', fontSize: '15px' }}><b>Features</b></label><hr />
                                            <Table className="table-responsive-material default-table table-sm text-center">
                                                <TableBody>
                                                    {this.props.securityModuleList.map((module, index) =>
                                                        <TableRow>
                                                            <TableCell style={{ fontSize: '14px' }}>
                                                                <i className="zmdi zmdi-label-alt text-green darken-3" style={{ marginRight: '10px' }} />
                                                                {module.SecurityModuleName}
                                                            </TableCell>
                                                            <TableCell style={{ width: '25px' }}>
                                                                <FormControlLabel
                                                                    label=""
                                                                    control={
                                                                        <Switch
                                                                            classes={{
                                                                                checked: 'text-primary',
                                                                                bar: 'bg-primary',
                                                                            }}
                                                                            checked={this.state.isModuleSelected[index]}
                                                                            onChange={(e) => this.handleChangeCheckbox(e, index, module)}
                                                                        />
                                                                    }
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </CardBox>
                                    : null}
                            </ValidatorForm>
                        </CardBox>
                    </div>
                </div>
            </div >
        )
    }
}
export default ManageRoles;