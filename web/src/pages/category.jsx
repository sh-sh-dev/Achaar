import React, {Component, Fragment as F} from 'react';
import {Link} from 'react-router-dom';
import qs from 'querystringify';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Toggle from 'material-ui/Toggle';
import CircularProgress from 'material-ui/CircularProgress';
import Err404 from './err404';
import {palette, Space, numToFA, slicePrice, resolveApiURL, validateCookie} from '../utils/' 
import Helmet from 'react-helmet';
import axios from 'axios';

class CategoryItem extends Component {
    render() {
        const data = this.props.data.map((e, index) => {
            return (
                <Link to={`/product/${e.id}`} style={{display: 'block'}} key={index}>
                    <Card style={{overflow: 'hidden'}}>
                        <CardMedia>
                            <div className='catpimage' style={{backgroundColor: palette.primary3Color, height: 200}}>
                                {
                                    e.discount.special && <span>تخفیف ویژه</span>
                                }
                        </div>
                    </CardMedia>
                    <CardTitle title={e.name} />
                    <CardText>
                        {e.has_discount ?
                            <F>قیمت: <s style={{color: '#888', fontSize: 13}}>{slicePrice(numToFA(e.price))}</s> &nbsp;<b style={
                                {
                                    color: e.discount.special ? '#f44336' : palette.accent1Color,
                                    fontSize: 17.5
                                }
                            }>{slicePrice(numToFA(e.discount.discounted_price))}</b> تومان</F>
                            :
                            <F>قیمت: <b style={{color: palette.accent1Color}}>{slicePrice(numToFA(e.price))}</b> تومان</F>
                        }
                    </CardText>
                </Card>
            </Link>
            )
        });
        if (this.props.data.length > 0) {
            return (
                <F>
                    <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' style={{padding: 0}}>{data.filter((e, index) => index%2 == 0)}</div>
                    <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' style={{padding: 0}}>{data.filter((e, index) => index%2 == 1)}</div>
                </F>
            );
        } else {
            return (<div className='unselectable' style={{color: '#888', textAlign: 'center', fontWeight: 300, fontSize: 35, padding: '50px 12px'}}>
                <i className='mdi' style={{fontSize: 80, color: palette.accent1Color}}>error_outline</i>
                <Space height={20} />
                نتیجه ای یافت نشد! <br />
            <b style={{fontSize: 16, color: '#212121'}}>
                    جستجوی شما بی‌نتیجه بود. به دنبال چیز دیگری بگردید!
                </b>
            </div>)
        }
    }
}

export default class Category extends Component {
    constructor(props){
        super(props);
        this.category = props.match.params.name;
        this.query = Object.assign({},{
            min: 0,
            max: 1e6,
            filter: '',
            availables: false
        }, qs.parse(props.history.location.search))
        this.query.min = Number(this.query.min);
        this.query.max = Number(this.query.max);
        this.query.availables = this.query.availables === 'true' ? true : false;
        this.state = {
            sortFn: (a,b) => a.id - b.id,
            FDO: false,
            mobile: window.innerWidth < 768,
            loaded: false,
            data: []
        }
        window.onresize = () => {
            this.setState({
                mobile: window.innerWidth < 768
            })
        }
    }
    componentDidMount(){
        let _ = this;
        axios({
            method: 'post',
            url: resolveApiURL('getCategory'),
            data: {
                category: _.category
            }
        }).then(res => {
            console.log(res);
            if (res.data.ok) {
                _.setState({
                    loaded: true,
                    data: res.data.result
                })
            } else if (res.data.ok === false) {
                _.setState({
                    loaded: `err${res.data.code}`,
                    data: res.data.result
                })
            }
        })
    }
    updateQueryString = (q, v) => {
        let newQuery = {};
        newQuery[q] = v;
        const query = Object.assign(this.query, newQuery);
        this.props.history.push({
            search: qs.stringify(query, true)
        })
    }
    filterHelpers = () => {
        return (
            <div className={`FDO--container ${this.state.FDO && ' open'}`} data-mobile={this.state.mobile}>
                <Paper zDepth={1} style={{width: '100%'}} rounded={false}>
                    <div style={{display: 'flex', alignItems: 'center', height: 64, padding: '16px 8px', borderBottom: '1px solid #dedede'}}>
                        <IconButton style={{marginRight: 16}} onClick={
                            () => {
                                this._filterInput.focus()
                            }
                        }>
                            <FontIcon color={palette.accent3Color} className='mdi'>search</FontIcon>
                        </IconButton>

                        <TextField ref={(e) => {this._filterInput = e}} defaultValue={this.query.filter} fullWidth={true} underlineShow={false} onChange={e => {
                            this.updateQueryString('filter', e.target.value)
                        }} hintText='جستجو کنید...' />

                        {this.state.mobile &&
                            <IconButton tooltipPosition='bottom-left' tooltip='مشاهده نتایج' style={{marginLeft: 16}} onClick={() => {
                                this.setState({
                                    FDO: false
                                })
                            }}>
                                <FontIcon className='mdi'>arrow_back</FontIcon>
                            </IconButton>
                        }
                    </div>
                    <div style={{padding: 24}}>
                        حداقل قیمت:
                        <b> {slicePrice(numToFA(this.query.min))} </b>
                        تومان
                        <Slider defaultValue={this.query.min} axis='x-reverse' step={2e4} min={0} max={this.query.max - 1e4} onChange={(ev, val) => {
                            this.updateQueryString('min', val);
                        }} />
                        حداکثر قیمت:
                        <b> {slicePrice(numToFA(this.query.max))} </b>
                        تومان
                        <Slider disabled={this.query.min + 1e4 === 1e6} defaultValue={this.query.max} axis='x-reverse' step={2e4} min={this.query.min + 1e4} max={1e6} onChange={(ev, val) => {
                            this.updateQueryString('max', val);
                        }} />
                        <Toggle defaultToggled={this.query.availables} onToggle={(n, t) => {
                            this.updateQueryString('availables', t)
                        }} label='فقط کالاهای موجود را نمایش بده' labelPosition='right' />
                    </div>
                </Paper>
            </div>
        )
    }
    render(){
        if (this.state.loaded === true) {
            return (
                <F>
                    <Helmet>
                        <title>
                            دسته بندی {this.state.data.name} | آچار
                        </title>
                    </Helmet>

                    <div className='category'>
                        <AppBar title={this.state.data.name} style={{flexShrink: 0}} zDepth={2} iconElementLeft={
                            this.state.mobile ?
                            <IconButton onClick={() => {
                                this.setState({
                                    FDO: true
                                })
                            }}>
                                <FontIcon className='mdi' color={palette.primary3Color}>menu</FontIcon>
                            </IconButton> :
                            <F></F>
                        } />


                        <div className='scroll-content'>
                            {this.filterHelpers()}
                            <div className='result' style={{padding: 16}}>
                                <CategoryItem data={this.state.data.products.filter((e, ind) => {
                                        let condition = (this.query.min < e.price && e.price < this.query.max && e.name.indexOf(this.query.filter.replace(/ /g, '')) !== -1);
                                        if (this.query.availables === true) {
                                            return condition && e.available === true
                                        } else {
                                            return condition
                                        }
                                    }).sort(this.state.sortFn)} />
                            </div>
                        </div>
                    </div>
                </F>
            )
        } else if (typeof this.state.loaded === 'string') {
            if (this.state.loaded === 'err-701') {
                return <F>
                    <Err404 />
                    <Helmet>
                        <title>دسته بندی یافت نشد!</title>
                    </Helmet>
                </F>
            } else {
                return (
                    <div className='load-indic'>
                        <Helmet>
                            <title>خطایی رخ داد!</title>
                        </Helmet>
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
        } else {
            return (<div className='load-indic'>
                <CircularProgress size={120} thickness={6} color={palette.accent3Color} />
                <br />
                در حال بارگذاری دسته بندی...
            </div>)
        }
    }
}
