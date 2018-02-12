import React, {Fragment as F} from 'react';
import {Redirect} from 'react-router-dom';
import {palette, cookie, Space, BlankLink} from '../utils/';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
    Step,
    Stepper,
    StepButton,
    StepLabel,
} from 'material-ui/Stepper';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const GridInput = (props) => {
    let borderBottom;
    if (props.borderBottom === undefined) {
        borderBottom = true;
    } else {
        borderBottom = props.borderBottom;
    }
    return (
        <div className={`col-xs-12 col-md-${props.colSize || 12}`} style={{padding: 16, display: 'flex', alignItems: 'center', borderBottom: borderBottom ? '1px solid #dedede' : 'none'}}>
            <div style={{paddingLeft: 16, whiteSpace: 'nowrap'}}><i className='mdi' style={{color: palette.accent3Color}}>{props.icon.split(' ').join('_')}</i>  <b>{props.placeHolder}</b></div>
            <TextField {...props.inputProps} style={{margin: 0}} fullWidth underlineShow={false} hintText={props.placeHolder} defaultValue={props.defaultValue} />
        </div>
    )
}

class OrderFinalization extends React.Component {
    auth = cookie.get('AS_AUTH')
    state = {
        activeStep: 0,
        mobile: window.innerWidth < 768
    }
    componentDidMount() {
        let _ = this;
        window.onresize = function () {
            _.setState({
                mobile: window.innerWidth < 768
            })
        }
        console.log(this.steps);
    }
    getStuff(){
        switch (this.state.activeStep) {
            case 0:
                return <F>
                    <h3 style={{margin: 16}}>مشخصات گیرنده</h3>
                    <GridInput inputProps={{autoFocus: true}} icon='person' placeHolder='نام گیرنده' defaultValue="اصغر اکبری" />
                    <GridInput placeHolder='آدرس گیرنده' icon='home' defaultValue='همونجا' />
                    <GridInput placeHolder='شماره تلفن ثابت' borderBottom={this.state.mobile} icon='call' defaultValue='44514365' colSize={5} />
                    <GridInput borderBottom={false} placeHolder='شماره تلفن همراه' icon='call' defaultValue='09357778351' colSize={7} />
                    <Space height={16} />
                    <div style={{padding: 16, textAlign: 'center'}}>
                        <RaisedButton onClick={() => {
                                this.setState({activeStep: 1})
                            }} label='تایید اطلاعات' primary={true} />
                    </div>
                </F>;
            case 1:
                return <div style={{padding: 16}}>
                    <h3 style={{marginTop: 0}}>شیوه ارسال</h3>
                    <RadioButtonGroup name='peyk' defaultSelected='alopeyk'>
                        <RadioButton
                            value='alopeyk' label={
                                <F>
                                    ارسال کالا با <BlankLink style={{
                                        position: 'relative',
                                        zIndex: 2
                                    }} href='https://alopeyk.com'>الوپیک</BlankLink>
                                    <br />
                                    <p style={{margin: 0, color: '#888', fontSize: 12}}>اینطوری سریع‌تر میرسه.</p>
                                </F>
                            } style={{
                                marginBottom: 16
                            }} />
                        <RadioButton value='pishtaz' label={
                                <F>ارسال کالا با <b>پیک پیشتاز</b></F>
                            } />
                    </RadioButtonGroup>
                </div>
            case 2:
                return <div>همین دیگه.</div>;
        }
    }
    render () {
        if (this.auth) {
            return (<F>
                <Paper
                    rounded={false}
                    style={{
                        backgroundColor: palette[`primary${this.state.activeStep + 1}Color`],
                        height: 256
                    }}>
                    <AppBar
                        title='نهایی‌سازی خرید'
                        zDepth={0}
                        style={{
                            backgroundColor: 'transparent'
                        }}
                        iconElementLeft={<F></F>} />
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
                    height: 64,
                    display:'flex',
                    alignItems: 'center'
                }}>
                    <Stepper ref={
                            (e) => {this.steps = e}
                        } style={{width: '100%'}} activeStep={this.state.activeStep}>
                        <Step>
                            <StepLabel>آدرس تحویل</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>شیوه ارسال</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>بازبینی</StepLabel>
                        </Step>
                    </Stepper>
                </Paper>
                <div style={{paddingBottom: 80, marginTop: -128}}>
                    <div className='col-xs-12 col-md-8' style={{float: 'none', margin: '0 auto'}}>
                        <Paper style={{
                                overflow: 'auto',
                                maxHeight: 'calc(100vh - 256px + 128px - 64px - 16px)'
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
