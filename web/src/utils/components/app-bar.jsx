import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom';

export default function NavBar(props) {
    const backLink = (
        <Link to={props.backHref || '/'}>
            <IconButton>
                <FontIcon className="mdi">arrow_forward</FontIcon>
            </IconButton>
        </Link>
    )

    let {rightLinks} = props;

    if (rightLinks && Array.isArray(props.rightLinks)){
        rightLinks = <React.Fragment>{rightLinks}</React.Fragment>
    }

    return (
        <AppBar
            {...props}
            zDepth={props.depth === undefined ? 2 : props.depth}
            title={props.title || 'آچار'}
            iconElementLeft={props.leftIcon || backLink}
            iconElementRight={rightLinks} />
        )
}
