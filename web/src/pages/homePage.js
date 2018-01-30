import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {TypeText, Space} from '../ui-utils';
import palette from '../palette';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import {Link} from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import {MulitshSelf, MulitshItem} from '../c/mulitsh';
import Helmet from 'react-helmet';
const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {};

function slideRenderer(params) {
    const { index, key } = params;
    var i = mod(index, 10);
    return (
        <div key={key} className='ic-item' style={Object.assign({}, styles.slide, {backgroundColor: palette.accent2Color})}>
            <div className='ici-icon'>
                <FontIcon className='mdi ici-icon-main' color='#fff' style={{fontSize: 50}}>cloud_download</FontIcon>
            </div>
            <p>
                حالا یک مثشال ساده میتونه کار رو بهتر کنه.
            </p>
        </div>
    )
}

function DemoSimple() {
    return (
        <VirtualizeSwipeableViews slideRenderer={slideRenderer} enableMouseEvents />
    );
}

export default class HomePage extends React.Component {
    state = {
        drawerOpen: false
    }
    render(){
        document.body.className = '';
        return (
            <React.Fragment>
                <Helmet>
                    <title>آچار | فروشگاه آنلاین تجهیزات و ابزار صنعتی</title>
                </Helmet>
                <div>
                    <AppBar style={{position: 'fixed'}} zDepth={2} title='آچار' iconElementRight={
                        <IconMenu iconButtonElement={
                            <IconButton><FontIcon className='mdi'>account_circle</FontIcon></IconButton>
                        } targetOrigin={{horizontal: 'right', vertical: 'top'}} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                        <MenuItem disabled primaryText="کاربر مهمان" />
                        <Link to='/signup' style={{color: 'inherit'}}>
                            <MenuItem primaryText='ثبت نام' />
                        </Link>
                        <MenuItem primaryText="ورود به حساب قبلی" />
                    </IconMenu>} onLeftIconButtonClick={() => this.setState(prev => ({drawerOpen: !prev.drawerOpen}))} />
                    <Drawer docked={!1} onRequestChange={(drawerOpen) => this.setState({drawerOpen})} open={this.state.drawerOpen} width={300}>
                        <MenuItem primaryText='خانه' />
                    </Drawer>
                    <Space height={64} />
                    <DemoSimple />
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
