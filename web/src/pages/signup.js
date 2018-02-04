import React, {Component} from 'react';
// import palette from '../utils/palette';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Space} from '../utils/';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import axios from 'axios';

export default class SignUp extends Component {
    constructor(props){
        document.body.className = 'superdoc-form signup';
        super(props)
        this.phoneNumRegexp = /^[0][9][0-4][0-9]{8,8}$/g;
        this.state = {
            phone: false,
            pass: false,
            name: !true,
            mode: 'write',
            focusName: false,
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
    verifyName = (e) => {
        let val = e.target.value;
        this.setState({
            name: val.split(' ').filter(e => e.length >= 1).length >= 2 && val.match(/[آ-ی]/) && !val.match(/([a-zA-Z])/) && !val.match(/\d/) && !val.match(this.farsiNumbers)
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let inps = e.target.elements;
        let forms = {
            name: inps.name.value,
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
            url: '//localhost/Achaar/api/signup',
            data: forms
        }).then(res => {
            console.log(res);
            let status = res.data.code;
            if (status == 100) {
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
                        <h2>ثبت نام
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
                            شما از طریق این فرم می‌توانید در سایت آچار ثبت نام کرده و از خدمات ما بهره مند شوید. <br />
                            لطفا مشخصات خود را در فرم، طبق این اطلاعات وارد کنید:
                            <ul>
                                <li>
                                    <b>نام و نام خانوادگی</b>:
                                    از نوشتن اعداد و حروف انگلیسی پرهیز کنید و حداقل دو کلمه وارد نمایید.
                                </li>
                                <li>
                                    <b>شماره تلفن همراه</b>:
                                    شماره باید با الگوی عمومی مطابقت داشته باشد (مثلا 09213456789). همچنین نوشتن اعداد فارسی نیز مجاز است.
                                </li>
                                <li>
                                    <b>گذرواژه</b>:
                                    گذرواژه شما باید حداقل 6 و حداکثر 18 رقم یا حرف داشته باشد. سعی کنید گذرواژه‌تان را همیشه در ذهن داشته باشید!
                                </li>
                            </ul>
                        </Dialog>
                        <form method='post' onSubmit={this.handleSubmit}>
                            <div>
                                <TextField onFocus={() => {this.setState({focusName: true})}} required onChange={this.verifyName} floatingLabelText='نام و نام خانوادگی' errorStyle={{textAlign: 'left'}} errorText={!this.state.name && this.state.focusName && 'نام اشتباه است.'} type='text' name='name' autoComplete='off' />
                            </div>
                            <div>
                                <TextField onFocus={() => {this.setState({focusPhone: true})}} required floatingLabelText='شماره تلفن' errorStyle={{textAlign: 'left'}} type='text' onChange={this.verifyPhoneNumber} errorText={!this.state.phone && this.state.focusPhone && 'شماره اشتباه است.'} name='phoneNum' autoComplete='off' />
                            </div>
                            <div>
                                <TextField onFocus={() => {this.setState({focusPass: true})}} required floatingLabelText='گذرواژه' errorText={!this.state.pass && this.state.focusPass && 'گذرواژه باید دارای حداقل 6 و حداکثر 18 رقم یا حرف باشد.'} errorStyle={{textAlign: 'left'}} type='password' name='pass' autoComplete='off' onChange={this.verifyPass} />
                            </div>
                            <Space height={20} />
                            <RaisedButton disabled={!this.state.pass || !this.state.phone || !this.state.name} type='submit' primary={true} label='ثبت نام' />
                            <Space height={20} />
                            <p style={{fontSize: '80%'}}>قبلا حساب داشته اید؟ <Link to='/signin'>وارد آن شوید!</Link></p>
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
            case 'success':
                return (<div className='loading'>
                    <div>
                        <FontIcon className='mdi' color='#4caf50'>done</FontIcon><br />
                        <b>ثبت نام با موفقیت انجام شد!</b>
                    </div>
                </div>)
        }
    }
    render() {
        return (<Paper zDepth={5} className='form-main'>
            <Helmet>
                <title>آچار | ثبت نام</title>
            </Helmet>
            {this.renderChildren()}
        </Paper>)
    }
}
