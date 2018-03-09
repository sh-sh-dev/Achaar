import React from "react";
import validateCookie from '../cookie-validation';
import {Redirect} from 'react-router-dom';

export default function AuthBased({bool, children, invalidComponent}) {
    if (bool === undefined || typeof bool !== 'boolean') {
        bool = true;
    }
    if (validateCookie() === bool) {
        return children;
    } else {
        return invalidComponent || <Redirect to='/' />;
    }
}
