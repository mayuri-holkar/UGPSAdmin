import React from 'react';
import IconButton from 'material-ui/IconButton'
import CardMenu from "../CardMenu";

class CardHeader extends React.Component {

    onOptionMenuSelect = event => {
        this.setState({menuState: true, anchorEl: event.currentTarget});
    };
    handleRequestClose = () => {
        this.setState({menuState: false});
    };

    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            menuState: false,
        }
    }

    render() {
        const {heading, subHeading} = this.props;
        let {styleName} = this.props;
        if (!styleName) {
            styleName = "";
        }
        const {anchorEl, menuState} = this.state;
        return (
            <div className={`jr-card-header d-flex ${styleName}`}>
                <div className="mr-auto">
                    <h3 className="card-heading">{heading}</h3>
                    {subHeading && <p className="sub-heading">{subHeading}</p>}
                </div>
            </div>
        )
    }
}

export default CardHeader;

