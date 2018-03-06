import React from "react";
import validateCookie from '../cookie-validation';

export default function AuthBased({bool, children}) {
    if (bool === undefined) {
        bool = true;
    }
    if (validateCookie() === bool) {
        return children;
    }
}
