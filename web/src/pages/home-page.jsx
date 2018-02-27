import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Badge from 'material-ui/Badge';
import {Link} from 'react-router-dom';
import qs from 'querystringify';
import FontIcon from 'material-ui/FontIcon';
import {MulitshSelf, MulitshItem, TypeText, Space, palette, cookie, validateCookie, numToFA} from '../utils/' ;
import Helmet from 'react-helmet';

export default class HomePage extends React.Component {
    state = {
        drawerOpen: false,
        searchDialogOpen: false
    }
    handleSearch = e => {
        e.preventDefault();
        let text = this.refs.searchField.input.value.trim();
        if (text) {
            let string = qs.stringify({q: text}, true)
            this.props.history.push(`/search${string}`)
        }
    }
    closeSearchDialog = () => {
		this.setState({
            searchDialogOpen: false
		})
	}
    auth = validateCookie()
    render(){
        document.body.className = '';
        return (
            <React.Fragment>
                <Helmet>
                    <title>آچار | فروشگاه آنلاین تجهیزات و ابزار صنعتی</title>
                </Helmet>
                <Dialog open={this.state.searchDialogOpen} onRequestClose={this.closeSearchDialog} title='جستجو در آچار'>
                    <form onSubmit={this.handleSearch} style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row-reverse'
                    }}>
                        <IconButton type="submit" tabIndex={-1} style={{marginLeft: 8}}>
                            <FontIcon className="mdi">search</FontIcon>
                        </IconButton>
                        <TextField ref='searchField' fullWidth autoComplete='off' hintText='جستجو کنید...' name='query' />
                        <IconButton tabIndex={-1} type="button" style={{marginRight: 8}} onClick={this.closeSearchDialog}>
                            <FontIcon className="mdi">close</FontIcon>
                        </IconButton>
                    </form>
                </Dialog>
                <div>
                    <AppBar style={{position: 'fixed'}} iconElementLeft={<IconButton><FontIcon className='mdi' color={palette.primary3Color}>menu</FontIcon></IconButton>} zDepth={2} title='آچار' iconElementRight={<React.Fragment>
                        <IconButton onClick={() => {
                            this.setState({
                                searchDialogOpen: true
                            })
                        }} tooltip='جستجو'>
                            <FontIcon color={palette.primary3Color} className="mdi">search</FontIcon>
                        </IconButton>
                        {this.auth && <Link to='/cart'>
                            <IconButton tooltip='مشاهده سبد خرید'>
                                <FontIcon className='mdi' color={palette.primary3Color}>shopping_cart</FontIcon>
                                <Badge
                                    badgeContent={numToFA(5)}
                                    badgeStyle={{top: -36, left: -12}}
                                    secondary={true}>
                                </Badge>
                            </IconButton>
                        </Link>
                        }
                        <IconMenu iconButtonElement={
                                <IconButton tooltipPosition='bottom-left' tooltip='حساب کاربری'>
                                    <FontIcon color={palette.primary3Color} className='mdi'>
                                        person
                                    </FontIcon>
                                </IconButton>
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
                    <Space height={56 + 16} />
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
