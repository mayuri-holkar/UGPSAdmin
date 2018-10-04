import React from 'react';
import UserDetailCell from './UserDetailCell';

class UserDetailTable extends React.Component {

    render() {
        return (
            <div className="table-responsive-material">
                <table className="default-table table-sm table remove-table-border mb-0 ">
                    <tbody>
                        {this.props.data.map((memberData, index) => {
                            if (index < 4) {
                                return <UserDetailCell key={memberData.MemberId} data={memberData} url={this.props.url} />
                            }
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserDetailTable;