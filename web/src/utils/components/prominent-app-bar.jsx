import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import {Link} from 'react-router-dom';
import palette from '../palette';
import theme from '../theme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export default function ProminentNavBar(props) {
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
        <MuiThemeProvider muiTheme={getMuiTheme(Object.assign(theme, {
            appBar: {
                color: 'transparent',
                textColor: '#fff'
            },
            flatButton: {
                textColor: '#fff'
            }
        }))}>
        <Paper zDepth={props.depth === undefined ? 2 : props.depth}
            style={{
                backgroundColor: palette.primary1Color,
                height: 256
            }}>
            <AppBar
                {...props}
                zDepth={0}
                title={props.title || 'آچار'}
                iconElementLeft={
                    props.leftIcon || (
                        <Link to={props.backHref || '/'}>
                            <IconButton>
                                <FontIcon color='#fff' className="mdi">arrow_forward</FontIcon>
                            </IconButton>
                        </Link>
                    )
                }
                iconElementRight={rightLinks} />
            </Paper>
        </MuiThemeProvider>
    )
}
