import React from 'react';
import Button from 'material-ui/Button';
import Table, { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';
import EventCell from "./EventCell/index";

const columnData = [
    { id: 'EventName', label: 'Event Name' },
    { id: 'EventDate', label: 'Event Date' },
    { id: 'EventVenue', label: 'Event Venue' },
    { id: 'IsActive', label: 'Is Active' },
];

class EventTableHead extends React.Component {
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

class EventList extends React.Component {
    constructor(props) {
        super(props);
        const { events } = props.events;
        this.state = {
            events,
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
        if (property === 'IsActive') {
            const events =
                order === 'desc'
                    ? this.props.events.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                    : this.props.events.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
            this.setState({ events, order, orderBy });
        }
        else {
            const events =
                order === 'desc'
                    ? this.props.events.sort((a, b) => (b[orderBy].toLowerCase() < a[orderBy].toLowerCase() ? -1 : 1))
                    : this.props.events.sort((a, b) => (a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? -1 : 1));
            this.setState({ events, order, orderBy });
        }
    };

    render() {
        const { order, orderBy, selected, rowsPerPage, page, selectoption, menuState } = this.state;
        const paginationArray = [5, 10, 15];
        return (
            <div className="flex-auto">
                <div>
                    <Table className="default-table table-unbordered table table-sm table-hover">
                        <EventTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.props.events.length} />
                        <TableBody>
                            {
                                this.props.events.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((events, index) => {
                                    return <EventCell key={index} events={events} />
                                })
                            }
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    count={this.props.events.length}
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
export default EventList;