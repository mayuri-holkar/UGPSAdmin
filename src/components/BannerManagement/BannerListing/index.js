import React from 'react';
import BannerCell from './BannerCell/index';
import Table, { TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel } from 'material-ui/Table';
import Tooltip from 'material-ui/Tooltip';

const columnData = [
    { id: 'Name', label: 'Name', dataId: 'bannerName' },
    { id: 'IsActive', label: 'Is Active', dataId: 'action' },
];

class BannerTableHead extends React.Component {
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
                            <TableCell
                                key={column.id}
                                id={column.dataId}
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
                    <TableCell id="action" >Edit</TableCell>
                    <TableCell id="action">Delete</TableCell>
                </TableRow>
            </TableHead>
        );
    }
}

class BannerList extends React.Component {
    constructor(props) {
        super(props);
        const { banners } = this.props.banners;
        this.state = {
            banners,
            page: 0,
            rowsPerPage: 5,
            order: 'asc',
            orderBy: '',
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
    }

    handleChangePage = (banner, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = (banner) => {
        this.setState({ rowsPerPage: banner.target.value });
    }

    createSortHandler = property => banner => {
        this.props.onRequestSort(banner, property);
    };

    handleRequestSort = (banners, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
        if (property === 'IsActive') {
            const banners =
                order === 'desc'
                    ? this.props.banners.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
                    : this.props.banners.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
            this.setState({ banners, order, orderBy });
        }
        else {
            const banners =
                order === 'desc'
                    ? this.props.banners.sort((a, b) => (b[orderBy].toLowerCase() < a[orderBy].toLowerCase() ? -1 : 1))
                    : this.props.banners.sort((a, b) => (a[orderBy].toLowerCase() < b[orderBy].toLowerCase() ? -1 : 1));
            this.setState({ banners, order, orderBy });
        }
    };

    render() {
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        const { onDeleteBanner } = this.props;
        const paginationArray = [5, 10, 15];
        return (
            <div className="table-responsive-material">
                <Table className="default-table table-unbordered table table-sm table-hover bannerTable">
                    <BannerTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={this.handleRequestSort}
                        rowCount={this.props.banners.length} />
                    <TableBody>
                        {
                            this.props.banners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((banner, index) => {
                                return <BannerCell key={index} banners={banner}
                                    onDeleteBanner={onDeleteBanner} />
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                count={this.props.banners.length}
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
export default BannerList;