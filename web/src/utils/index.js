import validateCookie from './cookie-validation';
import React, {Component} from 'react';
import * as mul from './components/mulitsh.jsx';
import palette from './palette';
import theme from './theme';
import BlankLink from './components/blank-link.jsx';
import NewLine from "./components/new-line.jsx";
import AuthBased from './components/auth-based.jsx';
const cookie = require('cookies-js');
const {MulitshItem, MulitshSelf} = mul;

class TypeText extends Component{
    constructor(props){
        super(props);
        this.state = {
            max: 0
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.int = setInterval(this.charPlusPlus, this.props.dur || 50)
        }, this.props.delay || 0)
    }
    charPlusPlus = () => {
        if (this.state.max < this.props.text.length){
            this.setState(prev => ({
                max: prev.max + 1
            }))
        }
    }
    render(){
        return (<React.Fragment>{this.props.text.substring(0, this.state.max)}</React.Fragment>)
    }
}

function Space(props){
    let {style} = props;
    if (!style) {
        style = {};
    }
    return <div {...props} style={Object.assign(style, {height: props.height})}></div>
}

const chunk = (array, chunkSize) => {
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
}

const numToFA = num => {
    const _faNums = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
    const toBeRepld = [/0/gi, /1/gi, /2/gi, /3/gi, /4/gi, /5/gi, /6/gi, /7/gi, /8/gi, /9/gi]
    num = num.toString()
    for (var i = 0; i < 10; i++) {
        num = num.replace(toBeRepld[i], _faNums[i]);
    };
    return num;
};

const slicePrice = num => chunk(num.toString().split('').reverse(), 3).map(e => e.reverse().join('')).reverse().join(',');

const $APP_DEFAULTS = require('./app-defaults.json');

const resolveApiURL = path => `${$APP_DEFAULTS.api_url}/${path}`;

export {
    Space,
    TypeText,
    palette,
    MulitshItem,
    MulitshSelf,
    chunk,
    slicePrice,
    numToFA,
    cookie,
    $APP_DEFAULTS,
    resolveApiURL,
    BlankLink,
    theme,
    validateCookie,
    NewLine,
    AuthBased
};
