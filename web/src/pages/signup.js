import React, {Component} from 'react';
import palette from '../palette';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import {Space} from '../ui-utils';
import Helmet from 'react-helmet';
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props){
        document.body.className = 'superdoc-form signup'
        super(props)
        this.phoneNumRegexp = /^[0][9][0-4][0-9]{8,8}$/g;
        this.state = {
            phone: false,
            pass: false,
            name: !true,
            mode: 'write'
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
    verifyName = (e) => {
        let val = e.target.value;
        this.setState({
            name: val.split(' ').filter(e => e.length >= 1).length >= 2 && val.match(/[آ-ی]/) && !val.match(/([a-zA-Z])/)
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let inps = e.target.elements;
        let forms = {
            name: inps.name.value,
            mobile: inps.phoneNum.value,
            password: inps.pass.value
        };
        for (var i = 0; i < this.farsiNumbers.length; i++) {
            forms.mobile = forms.mobile.replace(this.farsiNumbers[i], i);
            forms.password = forms.password.replace(this.farsiNumbers[i], i);
        }
        this.setState({mode: 'loading'});
        let $ = this;
        axios({
            method: 'post',
            url: '//localhost/Achaar/api/signup',
            data: forms
        }).then(res => {
            console.log(res);
            let status = res.data.code;
            if (status == 100) {
                $.setState({mode: 'success'})
            }
        })
    }
    renderChildren(){
        if (this.state.mode == 'write') {
            return (
                <React.Fragment>
                    <h2>ثبت نام</h2>
                    <form method='post' onSubmit={this.handleSubmit} style={{paddingTop: 50}}>
                        <div>
                            <TextField autoFocus required onChange={this.verifyName} floatingLabelText='نام و نام خانوادگی' errorStyle={{textAlign: 'left'}} errorText={!this.state.name && 'نام کامل نیست.'} type='text' name='name' autoComplete='off' />
                        </div>
                        <div>
                            <TextField required floatingLabelText='شماره تلفن' errorStyle={{textAlign: 'left'}} type='text' onChange={this.verifyPhoneNumber} errorText={!this.state.phone && 'شماره اشتباه است.'} name='phoneNum' autoComplete='off' />
                        </div>
                        <div>
                            <TextField required floatingLabelText='گذرواژه' errorText={!this.state.pass && 'گذرواژه باید دارای حداقل 6 و حداکثر 18 رقم یا حرف باشد.'} errorStyle={{textAlign: 'left'}} type='password' name='pass' autoComplete='off' onChange={this.verifyPass} />
                        </div>
                        <Space height={20} />
                        <RaisedButton disabled={!this.state.pass || !this.state.phone} type='submit' primary={true}>ثبت نام</RaisedButton>
                    </form>
                </React.Fragment>)
        } else if (this.state.mode == 'loading') {
            return (<div className='loading'>
                <div>
                    <CircularProgress size={80} />
                    <b style={{display: 'block', marginTop: 5}}>در حال ارسال اطلاعات...</b>
                </div>
            </div>)
        } else if (this.state.mode == 'success') {
            return (<div className='loading'>
                <div>
                    <FontIcon className='material-icons' color='#4caf50'>done</FontIcon><br />
                    <b>ثبت نام با موفقیت انجام شد!</b>
                </div>
            </div>)
        }
    }
    render() {
        return (<Paper zDepth={5} className='form-main'>
                <Helmet>
                    <title>ثبت نام در آچار</title>
                </Helmet>
                {this.renderChildren()}
            </Paper>)
    }
}
