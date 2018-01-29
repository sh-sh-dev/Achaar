import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import TypeText from './ui-utils';
import palette from './palette';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import {MulitshSelf, MulitshItem} from './c/mulitsh';
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
    render(){

        return (
            <div>
                <AppBar zDepth={1} title={<TypeText text='آچار' dur='150' />} iconElementRight={
                    <IconMenu iconButtonElement={
                        <IconButton><FontIcon className='mdi'>account_circle</FontIcon></IconButton>
                    } targetOrigin={{horizontal: 'right', vertical: 'top'}} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                    <MenuItem disabled primaryText="کاربر مهمان" />
                    <MenuItem primaryText="ساخت حساب" />
                    <MenuItem primaryText="ورود به حساب قبلی" />
                </IconMenu>} />
                <DemoSimple />
                <MulitshSelf icon='bookmark border' headerText='جدیدترین کالاها'>
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
        )
    }
}
