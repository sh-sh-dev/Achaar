import React, {Component} from 'react';
import {TypeText, Space, palette} from '../utils/ui-utils';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Tab, Tabs} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import TouchRipple from 'material-ui/internal/TouchRipple';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';

const chunk = (array, chunkSize) => {
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
}

export default class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: 0
        }
    }
    handleChangeTab = value => {
        this.setState({
            activeTab: value
        })
    }
    render(){
        let {props} = this;
        return (
            <div className='container'>
                <Helmet>
                    <title>{`${props.productName} | آچار`}</title>
                </Helmet>
                <AppBar zDepth={2} title={props.productName} iconElementLeft={<IconButton><Link draggable={false} to='/'><FontIcon className='mdi' color='#fff'>arrow_forward</FontIcon></Link></IconButton>} style={{flexWrap: 'wrap', position: 'fixed', right: 0}}>
                    <Tabs onChange={this.handleChangeTab} value={this.state.activeTab} style={{width: 'calc(100% + 48px)', marginLeft: -24, marginRight: -24}}>
                        <Tab label='معرفی' value={0} />
                        <Tab label="مشخصات فنی" value={1} />
                        <Tab label="نظرات کاربران" value={2} />
                    </Tabs>
                </AppBar>
                <Space height={127} />
                {/* <div style={{margin: '0 auto', float: 'none'}} className='col-xs-12 col-md-8'>
                </div> */}
                <Paper zDepth={1} style={{overflow: 'hidden'}}>
                    <SwipeableViews index={this.state.activeTab} animateHeight onChangeIndex={this.handleChangeTab} enableMouseEvents axis='x-reverse'>
                        <div className='clear' style={{direction: 'rtl'}}>
                            <div className='col-xs-12 col-md-6'>
                                <Space height={1} />
                                {/* Pictures! */}
                            </div>
                            <div className='col-xs-12 col-md-6'>
                                <h2>&zwnj;<TypeText text={props.productName} /></h2>
                                <div style={{fontSize: '1.25em'}}>
                                    <p style={{color: '#585858'}}>
                                        <i className='mdi'>restore</i> گارانتی: <b style={{color: '#000'}}>شخمه صنعت پرداز غرب</b>
                                        <br />
                                        <i className='mdi'>money_off</i> قیمت:
                                        <b style={{color: palette.accent2Color}}> {chunk('450000'.toString().split('').reverse(), 3).map(e => e.reverse().join('')).reverse().join(',')} تومان</b>
                                    </p>
                                    <Space height={20} />
                                    <div style={{margin: '0 20px'}}>
                                        <RaisedButton fullWidth={true} label='افزودن به سبد خرید' secondary={true}>
                                            <FontIcon className='mdi' color='#fff'>add_shopping_cart</FontIcon>
                                        </RaisedButton>
                                    </div>
                                    <Space height={20} />
                                </div>
                            </div>
                        </div>
                        <div style={{padding: 15, direction: 'rtl'}}>
                            {[1,2,3,4,5,6,8,9,10,11,12,13,14].map(i => <div>مشخصه {i}: <b>مقدار {i}</b></div>)}
                        </div>
                        <div style={{padding: 15, direction: 'rtl'}}>
                            نظر نداره (ق) :|
                        </div>
                    </SwipeableViews>
                </Paper>


                <Space height={100} />


                <Paper role='button' rounded={!1} style={{position: 'fixed', zIndex: 1100, bottom: 0, left: 0, right: 0, cursor: 'pointer', boxShadow: '0 -4px 20px -1px rgba(0,0,0,.2)'}} className='unselectable'>
                    <TouchRipple>
                        <div style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center', padding: '10px 0', color: '#757575'}}>
                            <i className='mdi'>add_shopping_cart</i>&nbsp; افزودن به سبد خرید
                        </div>
                    </TouchRipple>
                </Paper>
            </div>
        )
    }
}
