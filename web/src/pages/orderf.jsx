import React, {Fragment as F} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {palette, cookie, Space, BlankLink, slicePrice, numToFA} from '../utils/';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import {
    Step,
    Stepper,
    StepButton,
    StepLabel,
} from 'material-ui/Stepper';
import Helmet from "react-helmet";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const GridInput = (props) => {
    let borderBottom;
    if (props.borderBottom === undefined) {
        borderBottom = true;
    } else {
        borderBottom = props.borderBottom;
    }
    return (
        <div
            className={`col-xs-12 col-md-${props.colSize || 12}`}
            style={{padding: 16, display: 'flex', alignItems: 'center', borderBottom: borderBottom ? '1px solid #dedede' : 'none'}}>
            <div style={{paddingLeft: 16, whiteSpace: 'nowrap'}}>
                <i
                    className='mdi'
                    style={{color: palette.accent3Color}}>
                    {props.icon.split(' ').join('_')}
                </i>
                <b>
                    {' ' + props.placeHolder}
                </b>
            </div>
            <TextField
                {...props.inputProps}
                style={{margin: 0}}
                fullWidth
                underlineShow={false}
                hintText={props.placeHolder}
                defaultValue={props.defaultValue} />
        </div>
    )
}

class OrderFinalization extends React.Component {
    auth = cookie.get('AS_AUTH')
    state = {
        activeStep: 2,
        mobile: window.innerWidth < 768,
        chosenPeyk: 'alopeyk',
        chosenPayMethod: 'online'
    }
    componentDidMount() {
        let _ = this;
        window.onresize = function () {
            _.setState({
                mobile: window.innerWidth < 768
            })
        }
    }
    updatePeyk = (shit, value) => {
        this.setState({
            chosenPeyk: value
        })
    }
    paymentMethodUpdate = (shit, value) => {
        this.setState({
            chosenPayMethod: value
        })
    }
    getStuff(){
        switch (this.state.activeStep) {
            case 0:
                return <F>
                    <h2 style={{margin: 16}}>
                        مشخصات گیرنده
                    </h2>
                    <GridInput
                        inputProps={{autoFocus: true}}
                        icon='person'
                        placeHolder='نام گیرنده'
                        defaultValue="اصغر اکبری" />
                    <GridInput
                        placeHolder='آدرس گیرنده'
                        icon='home'
                        defaultValue='همونجا' />
                    <GridInput
                        placeHolder='شماره تلفن ثابت'
                        borderBottom={this.state.mobile}
                        icon='call'
                        defaultValue='44514365'
                        colSize={5} />
                    <GridInput
                        borderBottom={false}
                        placeHolder='شماره تلفن همراه'
                        icon='contact phone'
                        defaultValue='09357778351'
                        colSize={7} />
                    <Space height={16} />
                    <div style={{padding: 16, textAlign: 'center'}}>
                        <RaisedButton
                            onClick={() => {
                                this.setState({activeStep: 1})
                            }}
                            label='تایید اطلاعات'
                            primary={true} />
                    </div>
                </F>;
            case 1:
                return <div style={{padding: 16}}>
                    <h2 style={{marginTop: 0}}>نحوه ارسال</h2>
                    <RadioButtonGroup onChange={this.updatePeyk} name='peyk' defaultSelected='alopeyk'>
                        <RadioButton
                            value='alopeyk' label={
                                <F>
                                    ارسال کالا با <BlankLink style={{
                                        position: 'relative',
                                        zIndex: 2
                                    }} href='https://alopeyk.com'>الوپیک</BlankLink>
                                    <br />
                                    <p style={{margin: 0, color: '#888', fontSize: 12}}>
                                        سفارش شما با پیک موتوری الوپیک فرستاده می‌شود. لازم به ذکر است حوزه کاری این سرویس فقط در استان‌های تهران و البرز می باشد.
                                    </p>
                                </F>
                            } style={{
                                marginBottom: 16
                            }} />
                        <RadioButton value='pishtaz' label={
                                <F>ارسال کالا با <b>پست پیشتاز</b></F>
                            } />
                    </RadioButtonGroup>
                    <Divider style={{marginTop: 16}} />
                    <h2>نحوه پرداخت</h2>
                    <RadioButtonGroup name='payment_method' onChange={this.paymentMethodUpdate} defaultSelected='online'>
                        <RadioButton
                            style={{
                                marginBottom: 16
                            }}
                            value='naghd'
                            label='پرداخت نقدی در مقصد' />
                        <RadioButton
                            value='online'
                            label='پرداخت آنلاین' />
                    </RadioButtonGroup>
                    <Divider style={{marginBottom: 16, marginTop: 16}} />
                    <Toggle label='دریافت رسید' labelPosition='right'/>
                    <Space height={15} />
                    <div style={{textAlign: 'center'}}>
                        <FlatButton
                            label='بازگشت' onClick={
                                () => {
                                    this.setState({
                                        activeStep: 0
                                    });
                                }
                            } style={{marginRight: 8}} />
                        <RaisedButton onClick={
                                () => {
                                    this.setState({
                                        activeStep: 2
                                    })
                                }
                            } label='تایید' primary />
                    </div>
                </div>
            case 2:
                return (
                    <div
                        style={{
                            padding: 16
                        }}>
                        <h2>کالاها</h2>
                        <div
                            style={{
                                overflow: 'auto'
                            }}>
                            <table className='cart-main'>
                                <thead>
                                    <tr>
                                        <th>نام</th>
                                        <th>تعداد</th>
                                        <th>قیمت واحد</th>
                                        <th>قیمت کل</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>آچار لندنی</td>
                                        <td>{numToFA(2)}</td>
                                        <td>{slicePrice(numToFA(410000))}</td>
                                        <td>{slicePrice(numToFA(410000 * 2))}</td>
                                    </tr>
                                    <tr>
                                        <td>آچار لندنی</td>
                                        <td>{numToFA(2)}</td>
                                        <td>{slicePrice(numToFA(410000))}</td>
                                        <td>{slicePrice(numToFA(410000 * 2))}</td>
                                    </tr>
                                    <tr>
                                        <td>آچار لندنی</td>
                                        <td>{numToFA(2)}</td>
                                        <td>{slicePrice(numToFA(410000))}</td>
                                        <td>{slicePrice(numToFA(410000 * 2))}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            default:
                return <Redirect to='/' />
        }
    }
    render () {
        if (this.auth) {
            return (<F>
                <Helmet>
                    <title>نهایی‌سازی خرید | آچار</title>
                </Helmet>
                <Paper
                    rounded={false}
                    style={{
                        backgroundColor: palette[`accent${this.state.activeStep + 1}Color`],
                        height: 256
                    }}>
                    <AppBar
                        title={
                            (function() {
                                switch (this.state.activeStep) {
                                    case 0:
                                        return 'اطلاعات گیرنده';
                                    case 1:
                                        return 'اطلاعات سفارش';
                                    default:
                                        return 'بازبینی سفارش';
                                }
                            }.bind(this)())
                        }
                        zDepth={0}
                        style={{
                            backgroundColor: 'transparent'
                        }}
                        iconElementLeft={
                            <Link to='/cart'>
                                <IconButton>
                                    <FontIcon color='#fff' className='mdi'>arrow_forward</FontIcon>
                                </IconButton>
                            </Link>
                    } />
                </Paper>
                <Paper
                    rounded={false}
                    zDepth={5}
                    style={{
                        position: 'fixed',
                        bottom:0,
                        left:0,
                        right: 0,
                        zIndex: 1100,
                        height: 35,
                        display:'flex',
                        alignItems: 'center',
                        overflow: 'hidden'
                    }}>
                    <Stepper
                        style={{width: '100%'}} activeStep={this.state.activeStep}>
                        <Step>
                            <StepButton onClick={
                                    () => {
                                        this.setState({
                                            activeStep: 0
                                        });
                                    }
                                }>آدرس تحویل</StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={
                                    () => {
                                        this.setState({
                                            activeStep: 1
                                        });
                                    }
                                }>شیوه ارسال</StepButton>
                        </Step>
                        <Step>
                            <StepButton onClick={
                                    () => {
                                        this.setState({
                                            activeStep: 2 
                                        });
                                    }
                                }>بازبینی</StepButton>
                        </Step>
                    </Stepper>
                </Paper>
                <div style={{marginTop: -128}}>
                    <div className='col-xs-12 col-md-8' style={{float: 'none', margin: '0 auto'}}>
                        <Paper style={{
                                overflow: 'auto',
                                maxHeight: 'calc(100vh - 256px + 128px - 35px - 16px)'
                            }} className='clear' zDepth={2}>
                            {this.getStuff()}
                        </Paper>
                    </div>
                </div>
            </F>)
        } else {
            return <Redirect to='/' />
        }
    }
}

export default OrderFinalization;
