import React, {Component} from 'react';
import palette from '../palette';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
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
            writeable: true,
            name: !true
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
            pass: val.split('').length >= 6
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
            phoneNum: inps.phoneNum.value,
            pass: inps.pass.value
        };
        for (var i = 0; i < this.farsiNumbers.length; i++) {
            forms.phoneNum = forms.phoneNum.replace(this.farsiNumbers[i], i)
        }
        // console.log(forms);
        this.setState({writeable: false});
        axios({
            method: 'post',
            url: '//localhost/Achaar/api/signin',
            data: forms
        }).then(res => {
            console.log(res)
        })
    }
    renderChildren(){
        if (this.state.writeable) {
            return (
                <React.Fragment>
                    <h2>ثبت نام</h2>
                    <form method='post' onSubmit={this.handleSubmit} style={{paddingTop: 50}}>
                        <div>
                            <TextField autoFocus required onChange={this.verifyName} floatingLabelText='نام و نام خانوادگی' errorStyle={{textAlign: 'left'}} errorText={!this.state.name && 'نام کامل نیست.'} type='text' name='name' autocomplete='off' />
                        </div>
                        <div>
                            <TextField required floatingLabelText='شماره تلفن' errorStyle={{textAlign: 'left'}} type='text' onChange={this.verifyPhoneNumber} errorText={!this.state.phone && 'شماره اشتباه است.'} name='phoneNum' autocomplete='off' />
                        </div>
                        <div>
                            <TextField required floatingLabelText='گذرواژه' errorText={!this.state.pass && 'گذرواژه حداقل باید ۶ حرف یا رقم داشته باشد.'} errorStyle={{textAlign: 'left'}} type='password' name='pass' autocomplete='off' onChange={this.verifyPass} />
                        </div>
                        <Space height={20} />
                        <RaisedButton disabled={!this.state.pass || !this.state.phone} type='submit' primary={true}>ثبت نام</RaisedButton>
                    </form>
                </React.Fragment>)
        } else {
            return (<div className='loading'>
                <div>
                    <CircularProgress size={80} />
                    <b style={{display: 'block', marginTop: 5}}>در حال ارسال اطلاعات...</b>
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
