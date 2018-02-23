import React from 'react';
import FNR from 'react-fnr';
import {cookie} from './utils/';
import Err404 from './pages/errors/not-found';
import Loading from './pages/errors/loading';
import Err from './pages/errors/err';
const XHRConfig = require('./xhr-config.json');

export default class Skeleton extends React.Component {
    constructor (props) {
        super(props)
    }
    get Config(){
        return Object.assign(XHRConfig, {
            url: this.props.url,
            data: this.props.data,
            method: this.props.method || 'post',
            auth: this.props.authEnabled ? {username: null, password: cookie.get('AS_AUTH') } : undefined
        })
    }
    render() {
        return (
            <FNR
                {...this.Config}
                component={({data}) => {
                    const {ok, code, result} = data;
                    if (ok === true) {
                        return this.props.component(data);
                    } else {
                        return <Err err={result + '.'} />
                    }
                }}
                loadingComponent={() => {
                    return <Loading text={`در حال بارگذاری ${this.props.subject}...`} />
                }}
                errorComponent={err => {
                    console.log(err);
                    return <div>LOL</div>;
                }} />
        );
    }
};
