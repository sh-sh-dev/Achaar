import React, {Component} from 'react';

export default class TypeText extends Component{
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
