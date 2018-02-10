import React, {Component, Fragment as F} from 'react';
import {Link} from 'react-router-dom';
import qs from 'querystringify';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Drawer from 'material-ui/Drawer';
import Slider from 'material-ui/Slider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Toggle from 'material-ui/Toggle';
import {GridList, GridTile} from 'material-ui/GridList';
import {palette, Space, numToFA, slicePrice, resolveApiURL} from '../utils/'
import Helmet from 'react-helmet';
import axios from 'axios';


let data = [
    {
        name: 'آچار فرانسه',
        price: 50000,
        id: 0,
        available: true
    },
    {
        name: 'دیل حیدری‌:|',
        price: 26500,
        id: 1,
        available: false
    }
]

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
        this.query.availables = this.query.availables == 'true' ? true : false;
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
            } else if (res.data.ok == false) {
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
        if (this.state.loaded == true) {
            return (
                <F>
                    <Helmet>
                        <title>
                            دسته بندی {this.category} | آچار
                        </title>
                    </Helmet>

                    <div className='category'>
                        <AppBar title={this.state.data.name} style={{flexShrink: 0}} zDepth={2} iconElementLeft={
                            <IconButton onClick={() => {
                                this.setState({
                                    FDO: true
                                })
                            }}>
                                <FontIcon className='mdi' color={palette.primary3Color}>menu</FontIcon>
                            </IconButton>
                        } iconElementRight={
                            <IconMenu iconButtonElement={
                                <IconButton>
                                    <FontIcon color={palette.primary3Color} className='mdi'>sort</FontIcon>
                                </IconButton>
                            } targetOrigin={{horizontal: 'right', vertical: 'top'}} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                                <MenuItem onClick={() => {
                                    this.setState({
                                        sortFn: (a,b) => a.price - b.price
                                    })
                                }}>قیمت از کمتر به بیشتر</MenuItem>
                                <MenuItem onClick={() => {
                                    this.setState({
                                        sortFn: (a,b) => b.price - a.price
                                    })
                                }}>قیمت از بیشتر به کمتر</MenuItem>
                            </IconMenu>
                        } />


                        <div className='scroll-content'>
                            {this.filterHelpers()}
                            <div className='result' style={{padding: 16}}>
                                <div className='col-xs-2 col-md-6'>
                                    {this.state.data.products.filter((e, ind) => {
                                        let condition = (this.query.min < e.price && e.price < this.query.max && e.name.indexOf(this.query.filter) !== -1 && ind%2 === 0);
                                        if (this.query.availables == true) {
                                            return condition && e.available == true
                                        } else {
                                            return condition
                                        }
                                    }).sort(this.state.sortFn).map((e, index) => {
                                        return (
                                            <Link to={`/product/${e.id}`} style={{display: 'block'}} key={index}>
                                            <Card style={{overflow: 'hidden'}}>
                                                <CardMedia>
                                                    <div style={{backgroundColor: palette.primary3Color, height: 200}}></div>
                                                </CardMedia>
                                                <CardTitle title={e.name} />
                                                <CardText>
                                                    {e.has_discount ?
                                                        <F>قیمت: <s color={{color: '#888'}}>{slicePrice(numToFA(e.price))}</s> <b style={{color: palette.accent1Color}}>{slicePrice(numToFA(e.price))}</b> تومان</F>
                                                    :
                                                        <F>قیمت: <b style={{color: palette.accent1Color}}>{slicePrice(numToFA(e.price))}</b> تومان</F>
                                                    }
                                                </CardText>
                                            </Card>
                                        </Link>
                                    )
                                })}
                                </div>
                                <div className='col-xs-2 col-md-6'>
                                    {this.state.data.products.filter((e, ind) => {
                                        let condition = (this.query.min < e.price && e.price < this.query.max && e.name.indexOf(this.query.filter) !== -1 && ind%2 === 1);
                                        if (this.query.availables == true) {
                                            return condition && e.available == true
                                        } else {
                                            return condition
                                        }
                                    }).sort(this.state.sortFn).map((e, index) => {
                                        return (
                                            <Link to={`/product/${e.id}`} style={{display: 'block'}} key={index}>
                                            <Card style={{overflow: 'hidden'}}>
                                                <CardMedia>
                                                    <div style={{backgroundColor: palette.primary3Color, height: 200}}></div>
                                                </CardMedia>
                                                <CardTitle title={e.name} />
                                                <CardText>
                                                    {e.has_discount ?
                                                        <F>قیمت: <s>{slicePrice(numToFA(e.price))}</s> <b>{slicePrice(numToFA(e.price))}</b> تومان</F>
                                                    :
                                                        <F>قیمت: {slicePrice(numToFA(e.price))} تومان</F>
                                                    }
                                                </CardText>
                                            </Card>
                                        </Link>
                                    )
                                })}
                                </div>
                            </div>
                        </div>
                    </div>
                </F>
            )
        } else {
            return <div>loading...</div>
        }
    }
}
