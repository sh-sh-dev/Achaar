import React, {Component, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {cookie, Space, palette} from '../utils/';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Helmet from 'react-helmet';

export default class DeleteAccount extends Component {
    auth = !!cookie.get('AS_AUTH').match(/^[a-f0-9]{32}$/gm);
    state = {
        done: false
    }
    render(){
        if (this.state.done == true) {
            cookie.expire('AS_AUTH')
            return <Redirect to='/' />;
        }
        else {
            if (!this.auth) {
                return <Redirect to='/' />
            } else {
                return (
                    <Fragment>
                        <Helmet>
                            <title>حذف حساب | آچار</title>
                        </Helmet>
                        <Paper rounded={false} zDepth={1} style={{backgroundColor: palette.primary1Color, height: 256}}>
                            <AppBar title='حذف حساب' iconElementLeft={
                                <Link to='/'>
                                    <IconButton>
                                        <FontIcon color={palette.primary3Color} className='mdi'>arrow_forward</FontIcon>
                                    </IconButton>
                                </Link>
                            } zDepth={0} style={{background: 'transparent'}} />
                        </Paper>
                        <div className='col-xs-12 col-md-8' style={{float: 'none', margin: '0 auto', top: -56}}>
                            <Paper style={{padding: 45, color: '#777', textAlign: "center"}}>
                                <i className='mdi' style={{fontSize: 100, color: palette.accent1Color}}>close</i>
                                <br />
                                <b>
                                    با حذف حساب، شما نمی‌توانید از خدمات ما بهره مند شوید. البته حساب شما و همچنین اطلاعات و سفارشات شما همچنان ذخیره هستند.
                                    <br/>
                                    بعداً می‌توانید از طریق همین دستگاه یا دستگاه دیگری به حساب خود وارد شوید.
                                </b>
                                <Space height={15} />
                                <RaisedButton onClick={
                                    () => {
                                        this.setState({done: true})
                                    }
                                } secondary={true} icon={
                                    <FontIcon className='mdi'>close</FontIcon>
                                } label='حذف حساب' />
                            </Paper>
                        </div>
                    </Fragment>
                )
            }
        }
    }
}
