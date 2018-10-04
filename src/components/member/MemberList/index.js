import React from 'react';
import MemberCell from "./MemberCell/index";
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

const columnData = [
    { id: 'FullName', numeric: false, label: 'First Name' },
    { id: 'FatherName', numeric: false, label: 'Father Name' },
    { id: 'SurName', numeric: false, label: 'Surname' },
    { id: 'Address', numeric: false, label: 'Address' },
    { id: 'HomePhone', numeric: false, label: 'Home Phone' },
    { id: 'MobileNo', numeric: false, label: 'Mobile No' },
    { id: 'GrandFatherName', numeric: false, label: 'Grandfather Name' },
    { id: 'Gol', numeric: false, label: 'Gol' },
    { id: 'MulVatan', numeric: false, label: 'Mul Vatan' },
];
class DataTableHead extends React.Component {
    constructor(props) {
        super(props);
        this.createSortHandler = this.createSortHandler.bind(this);
    };
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
        const cellstyle = { backgroundColor: '#FFF5EE' }
        const actionCellstyle = { paddingLeft: '25px' }
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
                    <TableCell id="names1">Action</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

class MemberList extends React.Component {
    constructor(props) {
        super(props);
        const { members } = props.members;
        this.state = {
            members,
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

        const members =
            order === 'desc'
                ? this.props.members.sort((a, b) => (b[orderBy].toLowerCase() < a[orderBy].toLowerCase() ? -1 : 1))
                : this.props.members.sort((a, b) => (a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? -1 : 1));
        this.setState({ members, order, orderBy });
    };

    render() {
        const { order, orderBy, selected, rowsPerPage, page, selectoption, menuState } = this.state;
        const paginationArray = [5, 10, 15];
        return (

            <div className="table-responsive-material">
                <Table className="default-table table-unbordered table table-sm table-hover">
                    <DataTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={this.props.members.length} />

                    <TableBody>
                        {
                            this.props.members.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member, index) => {
                                return <MemberCell key={index} member={member} />
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={this.props.members.length}
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
        );
    }
}

export default MemberList;
