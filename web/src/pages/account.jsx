import React from 'react';
import {validateCookie, AuthBased} from '../utils/';
import ProminentNavBar from '../utils/components/prominent-app-bar.jsx';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import Paper from 'material-ui/Paper';
import {Redirect, Link} from 'react-router-dom';
import {Space} from '../utils/'
import Helmet from 'react-helmet';
import {List, ListItem} from 'material-ui/List';

export default class Account extends React.Component {
    state = {
        logoutDialogOpen: false
    }
    get userInfo(){
        return (
            <Paper>
                <Subheader>اطلاعات کاربری</Subheader>
                <List>
                    <ListItem leftIcon={
                        <FontIcon className="mdi">person</FontIcon>
                    } primaryText='حسین خوانساری' />
                    <ListItem leftIcon={
                        <FontIcon className="mdi">call</FontIcon>
                    } primaryText='۰۹۱۲۳۴۵۶۷۸۹' />
                </List>
            </Paper>
        )
    }
    get actions(){
        return (
            <Paper>
                <Subheader>تنظیمات حساب</Subheader>
                <List>
                    <ListItem leftIcon={
                        <FontIcon className="mdi">close</FontIcon>
                    } primaryText='خروج از حساب' onClick={() => {
                        this.setState({
                            logoutDialogOpen: true
                        })
                    }} />
                    <ListItem insetChildren primaryText={
                        <span style={{color: '#f44336'}}>
                            حذف حساب
                        </span>
                    } />
                </List>
            </Paper>
        )
    }
    get logoutDialog(){
        return (
            <Dialog title='خروج از حساب کاربری' open={this.state.logoutDialogOpen}
                onRequestClose={
                    () => {
                        this.setState({
                            logoutDialogOpen: false
                        })
                    }
                } actions={[<div>LOL</div>]}>
                آیا می‌خواهید از حساب خود خارج شوید؟
                پس از خروج از حساب، شما می‌توانید بعدا با هر دستگاهی به حساب خود وارد شوید.
            </Dialog>
        )
    }
    render(){
        return (
            <React.Fragment>
                <AuthBased>
                    {this.logoutDialog}
                    <Helmet>
                        <title>حساب کاربری شما | آچار</title>
                    </Helmet>
                    <ProminentNavBar
                        title='حساب کاربری شما'
                        rightLinks={
                            <Link to="/cart">
                                <IconButton>
                                    <FontIcon color='#fff' className="mdi">shopping_cart</FontIcon>
                                </IconButton>
                            </Link>
                        } />
                    <Space height={16} />
                    <div className="col-xs-12 col-md-6"
                        style={{
                            float: 'none',
                            margin: '0 auto',
                            marginTop: -72,
                            zIndex: 1101
                        }}>
                        {this.userInfo}
                        <Space height={8} />
                        {this.actions}
                    </div>
                </AuthBased>
            </React.Fragment>
        )
    }
};
