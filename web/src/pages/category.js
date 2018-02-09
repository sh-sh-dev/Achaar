import React, {Component, Fragment} from 'react';
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
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Toggle from 'material-ui/Toggle';
import {GridList, GridTile} from 'material-ui/GridList';
import {palette, Space, numToFA, slicePrice} from '../utils/'
import Helmet from 'react-helmet';


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
            mobile: window.innerWidth < 768
        }
        window.onresize = () => {
            this.setState({
                mobile: window.innerWidth < 768
            })
        }
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
        return (
            <Fragment>
                <Helmet>
                    <title>
                        دسته بندی {this.category} | آچار
                    </title>
                </Helmet>

                <div className='category'>
                    <AppBar title={this.category} style={{flexShrink: 0}} zDepth={2} iconElementLeft={
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
                        <div className='result'>
                            <GridList cold={2} cellHeight={200} padding={0}>
                                {data.filter(e => {
                                    let condition = (this.query.min < e.price && e.price < this.query.max && e.name.indexOf(this.query.filter) !== -1);
                                    if (this.query.availables == true) {
                                        return condition && e.available == true
                                    } else {
                                        return condition
                                    }
                                }).sort(this.state.sortFn).map((e, index) => {
                                    return (
                                        <GridTile key={index} cols={window.innerWidth < 768 ? 2 : 1} style={{transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms", margin: 2}} rows={1} titlePosition='bottom' titleBackground='linear-gradient(to top, rgba(0,0,0,.5), transparent)' title={e.name} subtitle={
                                            e.available ?
                                                <b>{slicePrice(numToFA(e.price))} تومان</b>
                                            :
                                            <b style={{color: "hsl(0, 82%, 72%)"}}>ناموجود</b>}>
                                            <Link to={`/product/${e.id}`} style={{display: 'block', backgroundColor: palette.accent2Color, height: '100%'}}></Link>
                                        </GridTile>
                                    )
                                })}
                            </GridList>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
