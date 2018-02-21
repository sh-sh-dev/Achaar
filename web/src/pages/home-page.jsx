import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Badge from 'material-ui/Badge';
import {Link} from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import {MulitshSelf, MulitshItem, TypeText, Space, palette, cookie, validateCookie} from '../utils/' ;
import Helmet from 'react-helmet';

export default class HomePage extends React.Component {
    state = {
        drawerOpen: false
    }
    auth = validateCookie()
    render(){
        document.body.className = '';
        return (
            <React.Fragment>
                <Helmet>
                    <title>آچار | فروشگاه آنلاین تجهیزات و ابزار صنعتی</title>
                </Helmet>
                <div>
                    <AppBar style={{position: 'fixed'}} iconElementLeft={<IconButton><FontIcon className='mdi' color={palette.primary3Color}>menu</FontIcon></IconButton>} zDepth={2} title='آچار' iconElementRight={<React.Fragment>
                        {this.auth && <Link to='/cart'>
                            <IconButton>
                                <FontIcon className='mdi' color={palette.primary3Color}>shopping_cart</FontIcon>
                            </IconButton>
                        </Link>
                        }
                        <IconMenu iconButtonElement={
                            <IconButton><FontIcon color={palette.primary3Color} className='mdi'>person</FontIcon></IconButton>
                        } targetOrigin={{horizontal: 'right', vertical: 'top'}} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                            {!this.auth ?
                                <React.Fragment>
                                    <Link to='/signup'>
                                        <MenuItem primaryText='ثبت نام' />
                                    </Link>
                                    <Link to='/signin'>
                                        <MenuItem primaryText="ورود به حساب" />
                                    </Link>
                                </React.Fragment>
                            :
                            <React.Fragment>
                                <Link to='/account/logout'>
                                    <MenuItem primaryText='خروج از حساب' />
                                </Link>
                                <Link to='/account/delete-account'>
                                    <MenuItem primaryText='حذف حساب کاربری' />
                                </Link>
                            </React.Fragment>
                            }
                        </IconMenu>
                    </React.Fragment>} onLeftIconButtonClick={() => this.setState(prev => ({drawerOpen: true}))} />
                    <Drawer docked={!1} onRequestChange={(drawerOpen) => this.setState({drawerOpen})} open={this.state.drawerOpen} width={300}>
                        <Link to='/'>
                            <MenuItem>
                                خانه
                            </MenuItem>
                        </Link>
                    </Drawer>
                    <Space height={64} />
                    {/* <DemoSimple /> */}
                    <MulitshSelf icon='bookmark border' headerText='جدیدترین کالاها' interval={7000}>
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                    </MulitshSelf>
                    <MulitshSelf icon='star border' headerText='پرفروش ترین ها' interval={8500}>
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                        <MulitshItem title='کالای اول' description='کالای دوم' imagePath={{}} price={41000} />
                    </MulitshSelf>
                </div>
            </React.Fragment>
        )
    }
}
