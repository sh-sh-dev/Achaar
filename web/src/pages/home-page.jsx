import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import SwipeableViews from 'react-swipeable-views';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Badge from 'material-ui/Badge';
import {Link} from 'react-router-dom';
import qs from 'querystringify';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {MulitshSelf, MulitshItem, TypeText, Space, palette, validateCookie, numToFA} from '../utils/' ;
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
    get bar(){
        let color = '#fff';
        return (
            <AppBar style={{position: 'fixed', top: 0, backgroundColor: 'transparent'}} iconElementLeft={<IconButton><FontIcon className='mdi' color={color}>menu</FontIcon></IconButton>} zDepth={0} title='' iconElementRight={<React.Fragment>
                <IconButton onClick={() => {
                    this.setState({
                        searchDialogOpen: true
                    })
                }} tooltip='جستجو'>
                    <FontIcon color={color} className="mdi">search</FontIcon>
                </IconButton>
                {this.auth && <Link to='/cart'>
                    <IconButton tooltip='مشاهده سبد خرید'>
                        <FontIcon className='mdi' color={color}>shopping_cart</FontIcon>
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
                            <FontIcon color={color} className='mdi'>
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
        )
    }
    get searchDialog(){
        return (
            <Dialog open={this.state.searchDialogOpen} onRequestClose={this.closeSearchDialog} title='جستجو در آچار'
                contentStyle={{
                    width: '96vw',
                    maxWidth: 720
                }}>
                <form onSubmit={this.handleSearch} style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row-reverse'
                }}>
                <IconButton type="submit" tabIndex={-1} style={{marginLeft: 8}}>
                    <FontIcon className="mdi">search</FontIcon>
                </IconButton>
                <TextField ref='searchField' autoFocus={this.state.searchDialogOpen} fullWidth autoComplete='off' hintText='جستجو کنید...' name='query' />
                <IconButton tabIndex={-1} type="button" style={{marginRight: 8}} onClick={this.closeSearchDialog}>
                    <FontIcon className="mdi">close</FontIcon>
                </IconButton>
            </form>
        </Dialog>
        )
    }
    get drawer(){
        return (
            <Drawer docked={!1} onRequestChange={(drawerOpen) => this.setState({drawerOpen})} open={this.state.drawerOpen} width={300}>
                <Link to='/'>
                    <MenuItem>
                        خانه
                    </MenuItem>
                </Link>
            </Drawer>
        )
    }
    auth = validateCookie()
    get landing(){
        return (
            <React.Fragment>
                <Helmet>
                    <title>آچار | فروشگاه آنلاین تجهیزات و ابزار صنعتی</title>
                </Helmet>
                {this.bar}
                {this.searchDialog}
                {this.drawer}
                <div>
                    <Paper rounded={false} style={{
                        backgroundColor: palette.accent1Color,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='${palette.accent3Color}' fill-opacity='0.27'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E")`,
                        color: '#fff',
                        height: 256,
                        backgroundAttachment: 'fixed',
                        paddingLeft: 16,
                        paddingRight: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div>
                            <big>
                                <h1>آچار</h1>
                            </big>
                            <b>فروشگاه آنلاین ابزار و تجهیزات صنعتی</b>
                            <br />
                            <Space height={8} />
                            <div style={{
                                textAlign: 'center'
                            }}>
                                <RaisedButton label="مشاهده دسته بندی ها"></RaisedButton>
                                <Link to="/signup">
                                    <RaisedButton primary style={{marginLeft: 4}} label="ثبت نام در آچار"></RaisedButton>
                                </Link>
                            </div>
                        </div>
                    </Paper>
                    <div className="container">
                        <div className="col-xs-12 col-md-8" style={{
                            float: 'none',
                            margin: '0 auto',
                            padding: 16
                        }}>
                            <div style={{
                                textAlign: 'center'
                            }}>
                                <h1>آچار چیست؟</h1>
                                <p className="mute">
                                    آچار یک فروشگاه آنلاین تجهیزات و ابزار پیشرفته صنعتی است. خب گیتااار.
                                </p>
                                <h1>آچار نسبت به دیگران چه برتری هایی دارد؟</h1>
                                <div>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 landing-intro-section">
                                        <i className="mdi" style={{color: palette.primary2Color}}>search</i>
                                        <div className="title">آچار جــالب است.</div>
                                        <p>
                                            جالبه دیگه. جـــــالب.
                                        </p>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 landing-intro-section">
                                        <i className="mdi" style={{color: palette.primary2Color}}>search</i>
                                        <div className="title">آچار جــالب است.</div>
                                        <p>
                                            جالبه دیگه. جـــــالب.
                                        </p>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 landing-intro-section">
                                        <i className="mdi" style={{color: palette.primary2Color}}>search</i>
                                        <div className="title">آچار جــالب است.</div>
                                        <p>
                                            جالبه دیگه. جـــــالب.
                                        </p>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 landing-intro-section">
                                        <i className="mdi" style={{color: palette.primary2Color}}>search</i>
                                        <div className="title">آچار جــالب است.</div>
                                        <p>
                                            جالبه دیگه. جـــــالب.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    render(){
        if (!this.auth) {
            return <div>
                چی میخوای؟
            </div>;
        } else {
            return this.landing
        }
    }
}
