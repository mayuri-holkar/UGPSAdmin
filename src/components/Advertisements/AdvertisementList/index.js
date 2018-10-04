import React from 'react';
import AdvertisementCell from './AdvertisementCell/index';
import Table, { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

const columnData = [
    { id: 'Name', label: 'Name' },
    { id: 'StartDate', label: 'Start Date' },
    { id: 'EndDate', label: 'End Date' },
    { id: 'IsActive', label: 'Is Active' },
];

class AdvertisementTableHead extends React.Component {
    constructor(props) {
        super(props);
        this.createSortHandler = this.createSortHandler.bind(this);
    };

    createSortHandler = property => advertisement => {
        this.props.onRequestSort(advertisement, property);
    };

    render() {
        const { order, orderBy, rowCount } = this.props;
        return (
            <TableHead className="th-border-b">
                <TableRow>
                    {columnData.map(column => {
                        return (
                            <TableCell style={{ width: '12%' }}
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
                    <TableCell id="names" style={{ width: '16%' }}>Advertisement Type</TableCell>
                    <TableCell id="names" style={{ width: '16%' }}>Advertisement Location</TableCell>
                    <TableCell id="names" style={{ width: '13%', left:'20px' }}>Action</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

class AdvertisementList extends React.Component {
    constructor(props) {
        super(props);
        const { advertisements } = this.props.advertisements;
        this.state = {
            advertisements,
            page: 0,
            rowsPerPage: 5,
            order: 'asc',
            orderBy: '',
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    handleChangePage = (advertisement, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (advertisement) => {
        this.setState({ rowsPerPage: advertisement.target.value });
    }

    createSortHandler = property => advertisement => {
        this.props.onRequestSort(advertisement, property);
    };

    handleRequestSort = (advertisements, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        if (property === 'IsActive') {
            const advertisements =
                order === 'desc'
                    ? this.props.advertisements.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                    : this.props.advertisements.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
            this.setState({ advertisements, order, orderBy });
        }
        else {
            const advertisements =
                order === 'desc'
                    ? this.props.advertisements.sort((a, b) => (b[orderBy].toLowerCase() < a[orderBy].toLowerCase() ? -1 : 1))
                    : this.props.advertisements.sort((a, b) => (a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? -1 : 1));
            this.setState({ advertisements, order, orderBy });
        }
    };

    render() {
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const paginationArray = [5, 10, 15];
        return (

            <div className="table-responsive-material">
                <Table className="default-table table-unbordered table table-sm table-hover">
                    <AdvertisementTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={this.props.advertisements.length} />

                    <TableBody>
                        {
                            this.props.advertisements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((advertisement, index) => {
                                return <AdvertisementCell key={index} advertisements={advertisement} />
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={this.props.advertisements.length}
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
export default AdvertisementList;