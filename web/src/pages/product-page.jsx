import React, {Component} from 'react';
import {Space, palette, slicePrice, numToFA, resolveApiURL, validateCookie, cookie, NewLine} from '../utils/' ;
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import {Tab, Tabs} from 'material-ui/Tabs';
import {
    Table, TableRow, TableBody, TableRowColumn
} from 'material-ui/Table';
import {Link, Redirect} from 'react-router-dom';
import Helmet from 'react-helmet';
import FNR from 'react-fnr';
import Err404 from './errors/not-found';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import { Rating } from 'material-ui-rating';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';

class StarRating extends Component {
    state = {
        value: 5
    }
    render() {
        return(
            <div style={{
                    textAlign: 'center'
                }}>
                <span style={{
                        fontWeight: 500,
                        fontSize: 20
                    }}>امتیاز شما به این کالا: <strong>{numToFA(this.state.value)}</strong> از ۵</span>
                <Rating
                    value={this.state.value}
                    max={5}
                    onChange={value => {
                        this.setState({
                            value
                        })
                    }}
                    />
            </div>
        )
    }
}

const Comments = (props) => {
    let result = [];
    for (var i = 0; i < props.data.length; i++) {
        let comment = props.data[i];
        comment.score = Number(comment.score);

        // generate a color based on score. 🎨
        let scoreColor = Math.round(comment.score / 100 * 255);
        scoreColor = [255 - scoreColor, scoreColor, 0];

        result.push(
            <Card
                key={i}
                style={{
                    boxShadow: 'none'
                }}>
                <CardHeader
                    title={comment.title}
                    subtitle={numToFA(`${comment.user} | ${comment.date.split(' ').join(' - ')}`)}
                    actAsExpander={true}
                    showExpandableButton={true}
                    avatar={
                        <Avatar
                            size={30}
                            style={{
                                marginTop: 5
                            }}
                            backgroundColor={`rgb(${scoreColor.join(', ')})`}
                            title={`امتیاز کاربر به این کالا: ${numToFA(comment.score)}`}
                            icon={
                                <FontIcon className="mdi">star</FontIcon>
                            } />
                    } />
                <CardText
                    expandable={true}>
                    <NewLine
                        text={comment.text} />
                </CardText>
            </Card>
        )
    }
    return result
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
            <h2>
                {props.name}
            </h2>
            <i
                className="mdi"
                style={{
                    fontSize: '165%',
                    color: palette.accent1Color
                }}>attach_money </i>
                <span>قیمت: </span>
                <b style={{
                        color: discount.special ? '#f44336' : palette.accent2Color
                    }}>
                    {price}
                </b>
                &nbsp;
                {hasD &&
                    <React.Fragment><s style={{color: '#888', fontSize: 13}}>
                        {prevPrice}
                    </s>&nbsp;</React.Fragment>
                }
                تومان
                <Space height={16} />
                <i
                    className="mdi"
                    style={{
                        fontSize: '165%',
                        color: palette.accent1Color
                    }}>security </i>
                    <span>گارانتی: </span>
                    {props.warranties.length > 0 ?
                        <b>
                            {props.warranties.map((e, index) => {
                                return <React.Fragment key={`G_${index}`}>
                                    {e.full}
                                    <br />
                                </React.Fragment>
                            })}
                        </b>
                        :
                        <b>ندارد</b>
                    }
                    <div>
                        {props.children}
                    </div>
                    <p style={{
                            color: '#777777',
                            fontSize: 14,
                            fontWeight: 500
                        }}>
                        {props.description}
                    </p>
                </div>
            )
}

export default class ProductPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeTab: 0,
            commentDialogOpen: false,
            commentSnackOpen: false,
            commentSnackText: '',
            fabHidden: false
        };

        let didScroll = false,
        last = 0,
        delta = 5,
        height = 56;

        window.addEventListener('scroll', e => {
            didScroll = true;
        })

        setInterval(() => {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 330)

        const hasScrolled = () => {
            let st = window.scrollY;

            if (Math.abs(last - st) <= delta) {return;}

            if (st > last && st > height) {
                this.setState({
                    fabHidden: true
                });
            } else {
                if (st + window.innerHeight < document.body.offsetHeight) {
                    this.setState({
                        fabHidden: false
                    });
                }
            }
            last = st;
        }
    }

    handleChangeTab = value => {
        this.setState({
            activeTab: value,
            fabHidden: false
        })
    }

    auth = validateCookie()

    sendComment = () => {
        let score = this.rateComponent.state.value,
        commentText = this.commentTextField.getValue(),
        commentTitle = this.commentTitleField.getValue(),
        token = cookie.get('AS_AUTH');
        if (commentText && commentTitle && score) {
            axios({
                method: 'post',
                url: resolveApiURL('addComment'),
                data: {
                    token,
                    text: commentText,
                    title: commentTitle,
                    score,
                    product: this.props.pid
                }
            }).then(res => {
                console.log(res);
                this.setState({
                    commentDialogOpen: false,
                    commentSnackOpen: true,
                    commentSnackText: res.data.result
                })
            })
        }
    }

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
        };
        return (
            <FNR
                component={
                    ({data}) => {
                        const {result, code} = data;
                        if (data.ok === true) {
                            return (<div>
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
                                    <Paper className="col-xs-11.8 col-md-8 productmaincol clear" style={{
                                            padding: 0
                                        }}>
                                        <div>
                                            {(function() {
                                                switch (this.state.activeTab) {
                                                    case 0:
                                                        return (<div className='clear' style={tabItemStyle}>
                                                            <ProductDetails warranties={result.warranties} discount={result.discount} hasD={result.has_discount} name={result.name} price={result.price} description={result.description}>
                                                                    {this.auth &&
                                                                        <div
                                                                            style={{
                                                                                textAlign: 'center',
                                                                                padding: 24,
                                                                                margin: '0 auto',
                                                                                maxWidth: 220
                                                                            }}>
                                                                        <RaisedButton
                                                                            label='افزودن به سبد خرید'
                                                                            fullWidth
                                                                            secondary={true}
                                                                            icon={
                                                                                <FontIcon className="mdi">add_shopping_cart</FontIcon>
                                                                            } />
                                                                        </div>
                                                                    }
                                                            </ProductDetails>
                                                        </div>);
                                                    case 1:
                                                        return (<div className='clear' style={tabItemStyle}>
                                                            <Table selectable={false} multipleSelectable={false}>
                                                                <TableBody displayRowCheckbox={false}>
                                                                    {result.technical_specifications.map((e, index) => <TableRow key={index}><TableRowColumn>{e.item}</TableRowColumn><TableRowColumn>{e.value}</TableRowColumn></TableRow>)}
                                                                </TableBody>
                                                            </Table>
                                                        </div>);
                                                    case 2:
                                                        return (<div className='clear' style={tabItemStyle}>
                                                            <Comments data={result.comments} />
                                                        </div>);
                                                    default:
                                                        return <Redirect to='/' />
                                                }
                                            }.bind(this)())}
                                        </div>
                                    </Paper>
                                </div>
                                {this.auth &&
                                    <React.Fragment>
                                        <Snackbar
                                            open={this.state.commentSnackOpen}
                                            message={this.state.commentSnackText}
                                            autoHideDuration={3000}
                                            onRequestClose={
                                                () => {
                                                    this.setState({
                                                        commentSnackOpen: false
                                                    })
                                                }
                                            } />
                                        <FloatingActionButton secondary={true} style={{
                                                position: 'fixed',
                                                right: 32,
                                                bottom: !this.state.fabHidden ? 32 : -60,
                                                zIndex: 1100,
                                                transform: `scale(${ Number(this.state.activeTab !== 2) })`
                                            }}>
                                            <FontIcon className='mdi'>add_shopping_cart</FontIcon>
                                        </FloatingActionButton>

                                        <FloatingActionButton backgroundColor={palette.accent3Color} style={{
                                                position: 'fixed',
                                                right: 32,
                                                bottom: !this.state.fabHidden ? 32 : -60,
                                                zIndex: 1100,
                                                transform: `scale(${ Number(this.state.activeTab === 2) })`
                                            }} onClick={di.open.bind(this)} iconStyle={{
                                                color: palette.accent1Color
                                            }}>
                                            <FontIcon className='mdi'>chat_bubble</FontIcon>
                                        </FloatingActionButton>

                                        <Dialog
                                            onRequestClose={di.close.bind(this)}
                                            title='دیدگاه شما'
                                            open={this.state.commentDialogOpen}
                                            contentStyle={{
                                                width: '96vw',
                                                maxWidth: 720,
                                            }}
                                            modal
                                            actions={
                                                [
                                                    <FlatButton style={{
                                                            marginRight: 8
                                                        }} onClick={di.close.bind(this)} label="لغو" secondary={true}></FlatButton>,
                                                    <FlatButton onClick={this.sendComment} secondary={true} label="ثبت دیدگاه"></FlatButton>
                                                ]
                                            }>
                                                <div style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        borderBottom: '1px solid #dedede',
                                                        paddingBottom: 8,
                                                        marginBottom: 8
                                                    }}>
                                                    <IconButton disableTouchRipple style={{
                                                            marginRight: 16
                                                        }} tabIndex={-1}>
                                                        <FontIcon className="mdi">create</FontIcon>
                                                    </IconButton>
                                                    <TextField
                                                        ref={
                                                            e => {this.commentTitleField = e}
                                                        }
                                                        fullWidth
                                                        underlineShow={false}
                                                        hintText='عنوان دیدگاه' />
                                                </div>
                                                <div style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        borderBottom: '1px solid #dedede'
                                                    }}>
                                                    <IconButton disableTouchRipple style={{
                                                            marginRight: 16
                                                        }} tabIndex={-1}>
                                                        <FontIcon className="mdi">subject</FontIcon>
                                                    </IconButton>
                                                    <TextField
                                                        fullWidth
                                                        underlineShow={false}
                                                        multiLine
                                                        rows={7}
                                                        ref={
                                                            e => {this.commentTextField = e}
                                                        }
                                                        rowsMax={7}
                                                        hintStyle={{
                                                            bottom: 'auto',
                                                            top: 12
                                                        }}
                                                        hintText='متن دیدگاه' />
                                                </div>
                                                <Space height={15} />
                                                <StarRating ref={
                                                        (e) => {this.rateComponent = e}
                                                    } />
                                        </Dialog>
                                    </React.Fragment>
                                }
                            </div>);
                        } else {
                            if (code === -403) {
                                return <Err404 />
                            } else {
                                return (
                                    <div className='load-indic'>
                                        <i className='mdi' style={{color: '#f44336', fontSize: 80}}>error_outline</i>
                                        <div style={{fontSize: '1.8em', margin: '.67rem 0', textAlign: 'center', fontWeight: 300}}>خطایی رخ داد.<br />
                                            <b style={{
                                                    fontWeight: 500,
                                                    fontSize: '.85em'
                                                }}>{result}.</b>
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
    }
}
