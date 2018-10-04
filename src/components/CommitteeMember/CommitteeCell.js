import React from 'react';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import AddCommitteeMember from "./AddCommitteeMember";
import SweetAlert from 'react-bootstrap-sweetalert';
import TableRow from 'material-ui/Table/TableRow';
import TableCell from 'material-ui/Table/TableCell';

class CommitteeCell extends React.Component {

	onCommitteeMemberOptionSelect = event => {
		this.setState({ menuState: true, anchorEl: event.currentTarget });
	};

	handleRequestClose = () => {
		this.setState({ menuState: false });
	};

	onCloseCommitteeMemberModal = () => {
		this.setState({ addCommitteeMemberState: false });
	};

	onEditContact = () => {
		this.setState({ menuState: false, addCommitteeMemberState: true });
	};

	onDisplay() {
		this.setState({
			isDelete: true
		})
	};

	onCancel = () => {
		this.setState({
			isDelete: false
		})
	};

	deleteFile = () => {
		this.setState({
			isDelete: false
		})
		this.props.onDeleteCommitteeMember(this.props.committeeMember);
	};

	constructor() {
		super();
		this.state = {
			anchorEl: undefined,
			menuState: false,
			addCommitteeMemberState: false,
			isDelete: false,
		}
	}

	render() {
		const options = [
			'Edit',
			'Delete'
		];
		const ITEM_HEIGHT = 40;
		const { anchorEl, menuState, addCommitteeMemberState } = this.state;
		const { committeeMember, onSaveCommitteeMember, getCommitteeMember } = this.props;
		const { CommitteeMemberId, CommitteeMemberName, CommitteeMemberDesignation, CommitteeMemberAddress, CommitteeMemberEmail, CommitteeMemberPhone, CommitteeMemberPhotoURL } = this.props.committeeMember;
		const thumb = new Buffer(CommitteeMemberPhotoURL.data).toString('base64');
		const statusStyle = status.includes("Completed") ? "text-white bg-success" : status.includes("On Hold") ? "bg-amber" : status.includes("Delayed") ? "text-white bg-danger" : "text-white bg-grey";
		return (
			<TableRow
				tabIndex={-1}
				key={CommitteeMemberId}
			>
				<TableCell>
					<div className="user-profile d-flex flex-row align-items-center">
						<div className="user-avatar">
							{CommitteeMemberPhotoURL.data.length ?
								<Avatar
									alt={name}
									src={"data:image/jpeg;base64," + thumb}
									className="user-avatar"
								/>
								:
								<Avatar
									alt={name}
									src="http://localhost:8080/image.png"
									className="user-avatar"
								/>
							}
						</div>
						<div className="user-detail">
							<h5>{CommitteeMemberName} </h5>
						</div>
					</div>
				</TableCell>
				<TableCell>{CommitteeMemberDesignation}</TableCell>
				<TableCell>{CommitteeMemberEmail}</TableCell>
				<TableCell>{CommitteeMemberAddress}</TableCell>
				<TableCell>{CommitteeMemberPhone}</TableCell>
				<TableCell onClick={this.onCommitteeMemberOptionSelect}>
					<IconButton>
						<i className="zmdi zmdi-more-vert" />
					</IconButton>
				</TableCell>
				<Menu id="long-menu"
					anchorEl={anchorEl}
					open={menuState}
					onClose={this.handleRequestClose}
					style={{ maxHeight: ITEM_HEIGHT * 4.5 }}
					MenuListProps={{
						style: {
							width: 100,
						},
					}}>
					{options.map(option =>
						<MenuItem key={option} onClick={() => {
							if (option === 'Edit') {
								this.onEditContact()
							} else {
								this.handleRequestClose();
								this.onDisplay();
							}
						}
						}>
							{option}
						</MenuItem>,
					)}
				</Menu>
				{
					addCommitteeMemberState &&
					<AddCommitteeMember open={addCommitteeMemberState}
						committeeMember={this.props.committeeMember}
						onCloseCommitteeMemberModal={this.onCloseCommitteeMemberModal}
						onSaveCommitteeMember={onSaveCommitteeMember}
						getCommitteeMember={getCommitteeMember} />
				}
				<SweetAlert show={this.state.isDelete}
					warning
					showCancel
					confirmBtnText="Yes"
					cancelBtnText="No"
					confirmBtnBsStyle="danger"
					cancelBtnBsStyle="default"
					title="Are you sure?"
					onConfirm={this.deleteFile}
					onCancel={this.onCancel}
				>
					You want to delete this record?
				</SweetAlert>
			</TableRow>
		);
	}
}

export default CommitteeCell;
