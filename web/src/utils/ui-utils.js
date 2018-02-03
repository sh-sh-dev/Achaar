import React, {Component} from 'react';
import * as mul from './mulitsh';
import palette from './palette';

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
    return <div style={{height: props.height}}></div>
}

const chunk = (array, chunkSize) => {
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
}

function slicePrice(num) {
    return chunk(num.toString().split('').reverse(), 3).map(e => e.reverse().join('')).reverse().join(',')
}

export {
    Space,
    TypeText,
    palette,
    MulitshItem,
    MulitshSelf,
    chunk,
    slicePrice
};
