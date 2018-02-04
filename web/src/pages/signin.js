import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Space} from '../utils/';
import Helmet from 'react-helmet';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class SignIn extends Component {
    constructor(props){
        document.body.className = 'superdoc-form signin';
        super(props)
        this.phoneNumRegexp = /^[0][9][0-4][0-9]{8,8}$/g;
        this.state = {
            phone: false,
            pass: false,
            mode: 'write',
            focusPass: false,
            focusPhone: false,
            helpDialogOpen: false
        }
        this.farsiNumbers = [/۰/gi, /۱/gi, /۲/gi, /۳/gi, /۴/gi, /۵/gi, /۶/gi, /۷/gi, /۸/gi, /۹/gi];
    }
    verifyPhoneNumber = (e) => {
        let val = e.target.value;
        for (var i = 0; i < 10; i++) {
            val = val.replace(this.farsiNumbers[i], i)
        }
        this.setState({
            phone: val.match(this.phoneNumRegexp)
        })
    }
    verifyPass = (e) => {
        let val = e.target.value;
        this.setState({
            pass: (val.split('').length >= 6 && 18 >= val.split('').length)
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let inps = e.target.elements;
        let forms = {
            password: inps.pass.value,
            mobile: inps.phoneNum.value
        };
        for (var i = 0; i < this.farsiNumbers.length; i++) {
            forms.mobile = forms.mobile.replace(this.farsiNumbers[i], i);
            forms.password = forms.password.replace(this.farsiNumbers[i], i);
        }
        this.setState({mode: 'loading'});
        let $ = this;
        axios({
            method: 'post',
            url: '//localhost/Achaar/api/signin',
            data: forms
        }).then(res => {
            console.log(res);
            // let status = res.data.code;
            let status = res.data.ok;
            if (status) {
                $.setState({mode: 'success'})
            } else {
                $.setState({mode: 'write'})
            }
        })
    }
    renderChildren(){
        switch (this.state.mode) {
            case 'write':
                let closeDialog = () => {
                    this.setState({helpDialogOpen: !1})
                }
                return (
                <React.Fragment>
                    <h2>ورود به حساب
                        <IconButton touch={true} tabIndex={-1} onClick={() => {this.setState({helpDialogOpen: true})}} style={{float: "left"}}>
                            <FontIcon className='mdi'>info_outline</FontIcon>
                        </IconButton>
                        <Link to='/'>
                            <IconButton touch={true} tabIndex={-1} style={{float: "right"}}>
                                <FontIcon className='mdi'>arrow_back</FontIcon>
                            </IconButton>
                        </Link>
                    </h2>
                    <Dialog title='راهنمایی' modal={false} open={this.state.helpDialogOpen} onRequestClose={closeDialog} actions={<FlatButton onClick={closeDialog} secondary={true} tabIndex={-1}>تایید</FlatButton>} autoScrollBodyContent={true}>
                        اگر قبلا در آچار حساب داشته‌اید، اکنون می‌توانید از طریق این فرم وارد آن شوید. <br />
                        برای این کار، لطفا شماره تلفن حساب قبلی خود و گذرواژه آن را در فرم وارد کنید.
                    </Dialog>
                    <form method='post' onSubmit={this.handleSubmit}>
                        <div>
                            <TextField onFocus={() => {this.setState({focusPhone: true})}} required floatingLabelText='شماره تلفن' errorStyle={{textAlign: 'left'}} type='text' onChange={this.verifyPhoneNumber} errorText={!this.state.phone && this.state.focusPhone && 'شماره اشتباه است.'} name='phoneNum' autoComplete='off' />
                        </div>
                        <div>
                            <TextField onFocus={() => {this.setState({focusPass: true})}} required floatingLabelText='گذرواژه' errorText={!this.state.pass && this.state.focusPass && 'گذرواژه باید دارای حداقل 6 و حداکثر 18 رقم یا حرف باشد.'} errorStyle={{textAlign: 'left'}} type='password' name='pass' autoComplete='off' onChange={this.verifyPass} />
                        </div>
                        <Space height={20} />
                        <RaisedButton disabled={!this.state.pass || !this.state.phone} type='submit' primary={true} label='ورود به حساب' />
                        <Space height={20} />
                        <p style={{fontSize: '80%'}}>قبلا حسابی نداشته اید؟ <Link to='/signup'>اینجا یکی بسازید.</Link></p>
                    </form>
                </React.Fragment>)
                break;
            case 'loading':
                return (<div className='loading'>
                    <div>
                        <CircularProgress size={80} />
                        <b style={{display: 'block', marginTop: 5}}>در حال ارسال اطلاعات...</b>
                    </div>
                </div>)
                break;
            case 'success':
                return (<div className='loading'>
                    <div>
                        <FontIcon className='mdi' color='#4caf50'>done</FontIcon><br />
                        <b>ورود با موفقیت انجام شد!</b>
                    </div>
                </div>)
                break;
        }
        // if (this.state.mode == 'write') {
        // } else if (this.state.mode == 'loading') {
        // } else if (this.state.mode == 'success') {
        // }
    }
    render() {
        return (<Paper zDepth={5} className='form-main'>
            <Helmet>
                <title>آچار | ورود به حساب</title>
            </Helmet>
            {this.renderChildren()}
        </Paper>)
    }
}
