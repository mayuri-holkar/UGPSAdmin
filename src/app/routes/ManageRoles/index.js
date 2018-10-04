import React from 'react';
import { connect } from 'react-redux';
import ManageRoles from "components/ManageRoles/index"
import { getAllSystemUsers } from 'actions/User';
import { getAllSecurityModules, onSaveUserModule } from 'actions/UserModule';

class ManageUserRoles extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isNewProps: false }
    }

    componentWillMount = () => {
        this.getAllSystemUsers();
        this.getAllSecurityModules();
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps) {
            this.setState({ isNewProps: true });
        }
    }

    getAllSystemUsers = () => {
        this.props.getAllSystemUsers();
    }

    onSaveUserModule = (userModule) => {
        this.props.onSaveUserModule(userModule);
    }

    getAllSecurityModules = () => {
        this.props.getAllSecurityModules();
    }

    render() {
        const { systemUserList, securityModuleList, userModule } = this.props;
        return (
            <div>{
                this.state.isNewProps && securityModuleList.length > 0
                    ?
                    <ManageRoles systemUserList={systemUserList} securityModuleList={securityModuleList} userModule={{
                        'UserModuleId': '',
                        'SecurityModuleId': '',
                        'SystemUserId': '',
                        'IsActive': ''
                    }} onSaveUserModule={this.onSaveUserModule.bind(this)}
                        getAllSecurityModules={this.getAllSecurityModules} />
                    : null
            }
            </div>
        );
    }
}
const mapStateToProps = ({ User, UserModule }) => {
    return {
        systemUserList: User.systemUserList,
        securityModuleList: UserModule.securityModuleList,
    }
};

export default connect(mapStateToProps, {
    getAllSystemUsers,
    getAllSecurityModules,
    onSaveUserModule,
})(ManageUserRoles);
