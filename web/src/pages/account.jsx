import React from 'react';
import {Redirect} from 'react-router-dom';
import {validateCookie, AuthBased} from '../utils/';
import AppBar from 'material-ui/AppBar';

export default class Account extends React.Component {
    render(){
        return (
            <AuthBased>
                <AppBar title='حساب کاربری شما' />
            </AuthBased>
        )
    }
};
