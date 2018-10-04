import React, { Component } from 'react';
import CommitteeCell from 'components/CommitteeMember/CommitteeList/CommitteeCell/index';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import Table, { TableSortLabel, TableBody, TableHeader, TablePagination } from 'material-ui/Table';
import { TableFooter } from 'material-ui';
import TableRow from 'material-ui/Table/TableRow';
import TableHead from 'material-ui/Table/TableHead';
import TableCell from 'material-ui/Table/TableCell';
import Tooltip from 'material-ui/Tooltip';

const committeeColumnData = [
    { id: "DesignationData.Designation", numberic: false, label: 'Designation' },
];

class DataTableHead extends React.Component {
    committeeSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { order, orderBy, numSelected, rowCount } = this.props;
        return (
            <TableHead className="th-border-b">
                <TableRow>
                    <TableCell id="names">Member Name</TableCell>
                    {committeeColumnData.map(column => {
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
                                        onClick={this.committeeSortHandler(column.id)}
                                    >
                                        {column.label}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                        );
                    }, this)}
                    <TableCell id="names">Email Id</TableCell>
                    <TableCell id="names">Address</TableCell>
                    <TableCell id="names">Phone</TableCell>
                    <TableCell id="names">Action</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

class CommitteeList extends Component {
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        const data =
            order === 'desc'
                ? this.props.data.sort((a, b) => (b.DesignationData.Designation.toLowerCase() < a.DesignationData.Designation.toLowerCase() ? -1 : 1))
                : this.props.data.sort((a, b) => (a.DesignationData.Designation.toLowerCase() < b.DesignationData.Designation.toLowerCase() ? -1 : 1));
        this.setState({ data, order, orderBy });
    };

    handleKeyDown = (event, id) => {
        if (keycode(event) === 'space') {
            this.handleClick(event, id);
        }
    };

    constructor(props) {
        super(props);
        const { data } = this.props.data;
        this.state = {
            data,
            rowsPerPage: 5,
            page: 0,
            order: 'asc',
            orderBy: '',
            searchMessage: '',
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    render() {
        const { rowsPerPage, page } = this.state;
        const { onCloseCommitteeMemberModal, onSaveCommitteeMember, onDeleteCommitteeMember, getCommitteeMember, getAllDesignation, designation } = this.props;
        const paginationArray = [5, 10, 15];
        return (
            <div className="table-responsive-material">
                {this.props.data.length === 0 ?
                    <div className="h-100 d-flex align-items-center justify-content-center">
                        {this.state.searchMessage}
                    </div>
                    :
                    <Table className="default-table table-unbordered table table-sm table-hover">
                        <DataTableHead
                            order={this.state.order}
                            orderBy={this.state.orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.props.data.length}
                        />
                        <TableBody>
                            {this.props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((committeeMember) =>
                                <CommitteeCell key={committeeMember.CommitteeMemberId}
                                    committeeMember={committeeMember}
                                    designation={this.props.designation}
                                    onCloseCommitteeMemberModal={onCloseCommitteeMemberModal}
                                    onSaveCommitteeMember={onSaveCommitteeMember}
                                    getCommitteeMember={getCommitteeMember}
                                    onDeleteCommitteeMember={onDeleteCommitteeMember}
                                    getAllDesignation={getAllDesignation}
                                />
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={this.props.data.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    rowsPerPageOptions={paginationArray}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                }
            </div>
        );
    }
}

export default CommitteeList;