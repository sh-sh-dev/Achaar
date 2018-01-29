import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import Img from 'react-image';
import { autoPlay } from 'react-swipeable-views-utils';
import palette from '../palette';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const chunk = (array, chunkSize) => {
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
}

class MulitshSelf extends Component {
    constructor(props){
        super(props);
        this.state = {
            index: 0,
            mobile: window.innerWidth < 768
        };
        window.onresize = () => {
            this.setState(prev => ({
                mobile: window.innerWidth < 768
            }))
        }
    }

    handleChangeIndex = index => {
        this.setState({
            index,
        });
    };

    control = (num) => {
        let $ = this;
        return () => {
            $.setState(prev => ({
                index: prev.index + num
            }))
        }
    }

    render() {
        let children = chunk(this.props.children.filter(e => e.type.name === 'MulitshItem'), (this.state.mobile ? 3 : 5));
        return (
            <div className='mulitsh'>
                <div className='header'><i className='mdi'>{this.props.icon.split(' ').join('_')}</i> {this.props.headerText}</div>
                <div className='main'>
                    <button className='mulitsh-button' disabled={this.state.index == children.length - 1} onClick={this.control(1)}><i className='mdi'>keyboard_arrow_right</i></button>
                    <AutoPlaySwipeableViews style={{width: '100%'}} interval={3000} enableMouseEvents index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                        {children.map(e => <div key={children.indexOf(e)}>{e}</div>)}
                    </AutoPlaySwipeableViews>
                    <button className='mulitsh-button' disabled={this.state.index == 0} onClick={this.control(-1)}><i className='mdi'>keyboard_arrow_left</i></button>
                </div>
            </div>
        );
    }
}

function MulitshItem(props) {
    return (
        <div className='mulitsh-item'>
            <Img src={props.imagePath} />
            <div className='title'>{props.title}</div>
            <p>{props.description}</p>
            <div className='footer'>
                <span className='price' style={{color: palette.accent1Color}}>{chunk(props.price.toString().split('').reverse(), 3).map(e => e.reverse().join('')).reverse().join(',')} تومان</span>
            </div>
        </div>
    )
}

export {MulitshSelf, MulitshItem};
