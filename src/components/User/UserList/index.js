import React from 'react';
import UserCell from "./UserCell";
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

const columnData = [
    { id: 'FirstName', label: 'First Name' },
    { id: 'LastName', label: 'Last Name' },
    { id: 'UserPhone', label: 'Phone' },
    { id: 'UserEmailId', label: 'Email Id' },
    { id: 'IsActive', label: 'Is Active' },
];

class UserTableHead extends React.Component {
    constructor(props) {
        super(props);
        this.createSortHandler = this.createSortHandler.bind(this);
    };

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        return (
            <TableHead className="th-border-b">
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell
                                key={column.id}
                                id="names"
                            >
                                <Tooltip
                                    title="Sort"
                                    enterDelay={300}
                                >
                                    <TableSortLabel
                                        active={orderBy === column.id}
                                        direction={order}
                                        onClick={this.createSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    <TableCell id="names">Action</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

class UserList extends React.Component {
    constructor(props) {
        super(props);
        const { users } = props.users;
        this.state = {
            users,
            selectoption: undefined,
            menuState: false,
            page: 0,
            rowsPerPage: 5,
            order: 'asc',
            orderBy: '',
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({ rowsPerPage: event.target.value });
    }

    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        if (property === 'IsActive' || property === 'IsSuperAdmin') {
            const users =
                order === 'asc'
                    ? this.props.users.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                    : this.props.users.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
            this.setState({ users, order, orderBy });
        }
        else {
            const users =
                order === 'desc'
                    ? this.props.users.sort((a, b) => (b[orderBy].toLowerCase() < a[orderBy].toLowerCase() ? -1 : 1))
                    : this.props.users.sort((a, b) => (a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? -1 : 1));
            this.setState({ users, order, orderBy });
        }
    };

    render() {
        const { order, orderBy, selected, rowsPerPage, page, selectoption, menuState } = this.state;
        const { onCloseUserModal, onSaveUser, onUpdatePassword, onCloseUpdatePasswordModal } = this.props;
        const paginationArray = [5, 10, 15];
        return (
            <div className="flex-auto">
                <div>
                    <Table className="default-table table-unbordered table table-sm table-hover">
                        <UserTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.props.users.length} />
                        <TableBody>
                            {
                                this.props.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((users, index) => {
                                    return <UserCell key={users.UserId}
                                        users={users}
                                        onCloseUserModal={onCloseUserModal}
                                        onCloseUpdatePasswordModal={onCloseUpdatePasswordModal}
                                        onSaveUser={onSaveUser}
                                        onUpdatePassword={onUpdatePassword}
                                    />
                                })
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={this.props.users.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    rowsPerPageOptions={paginationArray}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        );
    }
}

export default UserList;