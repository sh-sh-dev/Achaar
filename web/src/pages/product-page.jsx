import React, {Component} from 'react';
import {Space, palette, slicePrice, numToFA, cookie, resolveApiURL} from '../utils/';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import ReactStars from 'react-stars';
import {
    List,
    ListItem as LI
} from 'material-ui/List';
import {Tab, Tabs} from 'material-ui/Tabs';
import {
    Table, TableRow, TableBody, TableRowColumn
} from 'material-ui/Table';
import SwipeableViews from 'react-swipeable-views';
import {Link, Redirect} from 'react-router-dom';
import Helmet from 'react-helmet';
import FNR from 'react-fnr';
import Err404 from './err404';

const Comments = (props) => {
    let result = [];
    // const rateFullStars = (num) => {
    //     let fulls = Number(num[0]),
    //     halfs = Number(num[1]);
    //     let f = [];
    //     for (var i = 0; i < (fulls == 0 ? 4 : fulls); i++) {
    //         f.push(<i className='mdi'>{fulls == 0 ? 'star_border' : 'star'}</i>)
    //     }
    //     f.push(<i className='mdi'>{halfs >= .5 ? 'star_half' : 'star_border'}</i>)
    //     return f;
    // }
    for (var i = 0; i < props.data.length; i++) {
        let comment = props.data[i];
        result.push(
            <div>
                <div style={{fontSize: '1.25em'}}>{comment.title}</div>
                <div style={{fontSize: '.8em', opacity: .65}}>
                    <i className='mdi'>person</i> {comment.user}
                </div>
                <div style={{lineHeight: 1.35}}>
                    {comment.text.split('\n').map(e => <React.Fragment>{e} <br /></React.Fragment>)}
                </div>
                <div style={{fontSize: '.8em', opacity: .65, textAlign: 'left'}}>
                    {numToFA(comment.date).split(' ').reverse().join(' | ')}
                </div>
                {/* {comment.score != null && <div className='comment-rating' style={{direction: 'ltr', fontSize: '.8em', opacity: .75}}>
                {rateFullStars((Math.round(comment.score / 20 * 2) / 2).toFixed(1).toString().split('.'))}
                </div>} */}
            </div>
        )
    }
    return <List style={{
            marginLeft: -16,
            marginRight: -16
        }}>{result}</List>;
}

const ProductDetails = (props) => {
    let {price, discount, hasD} = props;
    let prevPrice;

    if (hasD === true) {
        prevPrice = price;
        price = discount.discounted_price.toString();
    }

    price = slicePrice(numToFA(price));
    prevPrice = slicePrice(numToFA(prevPrice));

    return (
        <div>
            <h2>{props.name}</h2>
                <i className="mdi" style={{
                        fontSize: '165%',
                        color: palette.accent1Color
                    }}>attach_money </i>
                    <span>قیمت: </span>
                    <b style={{
                            color: discount.special ? '#f44336' : palette.accent2Color
                        }}>{price}</b>&nbsp;
                    {hasD && <React.Fragment><s style={{color: '#888', fontSize: 13}}>{prevPrice}</s>&nbsp;</React.Fragment>}
                    تومان
                <Space height={16} />
                <i className="mdi" style={{
                        fontSize: '165%',
                        color: palette.accent1Color
                    }}>security </i>
                <span>گارانتی: </span>
                    <b>{props.warranties.map(e => {
                            return <React.Fragment>{e.full} <br /></React.Fragment>
                        })}</b>
            <p style={{
                    color: '#959595'
                }}>{props.description}</p>
        </div>
    )
}

export default class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: 2,
            commentDialogOpen: false
        }
    }

    handleChangeTab = value => {
        this.setState({
            activeTab: value
        })
    }

    auth = cookie.get('AS_AUTH')

    render(){
        const di = {
            close(){
                this.setState({commentDialogOpen: false})
            },
            open(){
                this.setState({commentDialogOpen: true})
            }
        },
        tabItemStyle = {
            direction: 'rtl',
            clear: 'both',
            padding: 16
        },
        product = this.state.data;
        return (
            <FNR
                component={
                    ({data: {result}}) => {
                        console.log(result);
                        if (!result.code) {
                            return <div>
                            <Helmet>
                                <title>
                                    {`${result.name} | آچار`}
                                </title>
                            </Helmet>
                            <AppBar
                                zDepth={2}
                                title={result.name}
                                iconElementLeft={
                                    <Link to='/'>
                                        <IconButton>
                                            <FontIcon
                                                className='mdi'
                                                color={palette.primary3Color}>
                                                arrow_forward
                                            </FontIcon>
                                        </IconButton>
                                    </Link>
                                }
                                style={{flexWrap: 'wrap', position: 'fixed', right: 0}}
                                iconElementRight={
                                    this.auth &&
                                    <Link to='/cart'>
                                        <IconButton>
                                            <FontIcon
                                                color={palette.primary3Color}
                                                className='mdi'>shopping_cart</FontIcon>
                                        </IconButton>
                                    </Link>
                                }>
                                <div style={{width: '100%', textAlign: 'center', marginRight: -20}}>
                                    <Tabs
                                        onChange={this.handleChangeTab}
                                        value={this.state.activeTab}
                                        style={{width: 500, maxWidth: '100vw', display: 'inline-block'}}>
                                        <Tab label='معرفی' value={0} />
                                        <Tab label="مشخصات فنی" value={1} />
                                        <Tab label="نظرات کاربران" value={2} />
                                    </Tabs>
                                </div>
                            </AppBar>
                            <Space height={104} />
                            <div style={{
                                    padding: 16
                                }}>
                                <Paper className="col-xs-12 col-md-8 productmaincol clear" style={{
                                        padding: 0
                                    }}>
                                    <SwipeableViews animateHeight index={this.state.activeTab} onChangeIndex={this.handleChangeTab} axis='x-reverse'>
                                        <div className='clear' style={tabItemStyle}>
                                            <ProductDetails warranties={result.warranties} discount={result.discount} hasD={result.has_discount} name={result.name} price={result.price} description={result.description} />
                                        </div>
                                        <div className='clear' style={tabItemStyle}>
                                            <Table selectable={false} multipleSelectable={false}>
                                                <TableBody displayRowCheckbox={false}>
                                                    {result.technical_specifications.map(e => <TableRow><TableRowColumn>{e.item}</TableRowColumn><TableRowColumn>{e.value}</TableRowColumn></TableRow>)}
                                                </TableBody>
                                            </Table>
                                        </div>
                                        <div className='clear' style={tabItemStyle}>
                                            <Comments data={result.comments} />
                                        </div>
                                    </SwipeableViews>
                                </Paper>
                            </div>
                            {this.auth &&
                                <React.Fragment>
                                    <FloatingActionButton secondary={true} style={{
                                            position: 'fixed', right: 25, bottom: 25, zIndex: 1100, transform: `scale(${this.state.activeTab === 2 ? 1 : 0})`, opacity: this.state.activeTab === 2 ? 1 : .4
                                        }} onClick={di.open.bind(this)}>
                                        <FontIcon className='mdi'>chat_bubble</FontIcon>
                                    </FloatingActionButton>

                                    <FloatingActionButton backgroundColor={palette[`primary${this.state.activeTab === 2 ? 2 : 1}Color`]} style={{position: 'fixed', right: 25, bottom: this.state.activeTab === 2 ? 96 : 25, zIndex: 1100}}>
                                        <FontIcon className='mdi'>add_shopping_cart</FontIcon>
                                    </FloatingActionButton>


                                    <Dialog contentStyle={{width: 'calc(100% - 50px)', maxWidth: 'none'}} modal={true} title={`دیدگاه شما درباره ${result.name}`} open={this.state.commentDialogOpen} modal={false} autoScrollBodyContent={true} onRequestClose={di.close.bind(this)} actions={[
                                            <FlatButton secondary={true} label='ارسال دیدگاه' onClick={di.close.bind(this)} />,
                                            <FlatButton secondary={true} onClick={di.close.bind(this)} label='لغو' />
                                        ]}>
                                        {this.state.commentDialogOpen &&
                                            <React.Fragment>
                                                <div style={{textAlign: 'center'}}>
                                                    <TextField floatingLabelText='عنوان دیدگاه شما' autoFocus />
                                                </div>
                                                <TextField multiLine floatingLabelText='دیدگاه خود را بنویسید...' rows={2} fullWidth={true} />
                                                <Space height={15} />
                                                <div style={{direction: 'ltr', textAlign: 'center'}}>
                                                    <ReactStars size={40} color1='#aaa' color2={palette.accent2Color} className='mdi unselectable' char='star' />
                                                </div>
                                            </React.Fragment>
                                        }
                                    </Dialog>
                                </React.Fragment>
                            }
                        </div>;
                        } else {
                            if (result.code === -403) {
                                return <Err404 />
                            } else {
                                return (
                                    <div className='load-indic'>
                                        <i className='mdi' style={{color: '#f44336', fontSize: 80}}>error_outline</i>
                                        <div style={{fontSize: '1.8em', margin: '.67rem 0', textAlign: 'center', fontWeight: 300}}>خطایی رخ داد.<br />
                                            <b>{this.state.data}</b>
                                        </div>
                                        <Space height={15} />
                                        <Link to='/'>
                                            <RaisedButton backgroundColor={palette.accent2Color} labelColor='#fff' label='خروج به صفحه اصلی' />
                                        </Link>
                                    </div>
                                )
                            }
                        }
                    }
                }
                url={resolveApiURL('getProduct')}
                loadingComponent={
                    () => {
                        return (<div className='load-indic'>
                            <CircularProgress size={120} thickness={6} color={palette.accent3Color} />
                            <br />
                            در حال بارگذاری کالا...
                        </div>)
                    }
                }
                errorComponent={
                    () => {
                        return <Redirect to='/' />
                    }
                }
                data={{product: this.props.pid}}
                method='post' />
        )
        if (this.state.loaded == true) {
            console.log(this.state.data);
        } else if (typeof this.state.loaded == 'string') {
            if (this.state.loaded == 'err-403') {
            } else {

            }
        } else {

        }
    }
}
