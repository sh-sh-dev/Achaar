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
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import {Tab, Tabs} from 'material-ui/Tabs';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {
    Table, TableRow, TableBody, TableRowColumn
} from 'material-ui/Table';
import {Link, Redirect} from 'react-router-dom';
import Helmet from 'react-helmet';
import FNR from 'react-fnr';
import Err404 from './err404';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

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
                            backgroundColor={`rgb(${scoreColor.join(', ')})`}
                            title={`امتیاز کاربر به این کالا: ${numToFA(comment.score)}`}
                            icon={
                                <FontIcon className="mdi">star</FontIcon>
                            } />
                    } />
                <CardText
                    expandable={true}>
                    {comment.text}
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
            commentDialogOpen: true
        }
    }

    handleChangeTab = value => {
        this.setState({
            activeTab: value
        })
    }

    auth = !!cookie.get('AS_AUTH').match(/^[a-f0-9]{32}$/gm)

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
                                <Paper className="col-xs-11.8 col-md-8 productmaincol clear" style={{
                                        padding: 0
                                    }}>
                                    <div>
                                        {(function() {
                                            switch (this.state.activeTab) {
                                                case 0:
                                                    return (<div className='clear' style={tabItemStyle}>
                                                        <ProductDetails warranties={result.warranties} discount={result.discount} hasD={result.has_discount} name={result.name} price={result.price} description={result.description} />
                                                    </div>);
                                                case 1:
                                                    return (<div className='clear' style={tabItemStyle}>
                                                        <Table selectable={false} multipleSelectable={false}>
                                                            <TableBody displayRowCheckbox={false}>
                                                                {result.technical_specifications.map(e => <TableRow><TableRowColumn>{e.item}</TableRowColumn><TableRowColumn>{e.value}</TableRowColumn></TableRow>)}
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
                                    <FloatingActionButton secondary={true} style={{
                                            position: 'fixed', right: this.state.activeTab === 2 ? -60 : 32, bottom: 32, zIndex: 1100
                                        }}>
                                        <FontIcon className='mdi'>add_shopping_cart</FontIcon>
                                    </FloatingActionButton>

                                    <FloatingActionButton backgroundColor={palette.accent3Color} style={{
                                            position: 'fixed', right: 32, bottom: this.state.activeTab === 2 ? 32 : -60, zIndex: 1100
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
                                                <FlatButton onClick={di.close.bind(this)} label="لغو" secondary={true}></FlatButton>,
                                                <FlatButton secondary={true} label="ثبت دیدگاه"></FlatButton>
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
                                                    fullWidth
                                                    underlineShow={false}
                                                    hintText='عنوان دیدگاه' />
                                            </div>
                                            <div style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-start'
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
                                                    rowsMax={7}
                                                    hintStyle={{
                                                        bottom: 'auto',
                                                        top: 12
                                                    }}
                                                    hintText='متن دیدگاه' />
                                            </div>
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
    }
}
