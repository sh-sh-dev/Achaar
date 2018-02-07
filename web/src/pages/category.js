import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import qs from 'querystringify';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import {GridList, GridTile} from 'material-ui/GridList';
// import Paper from 'material-ui/Paper';
import {palette, Space} from '../utils/'


let data = [
    {
        name: 'آچار فرانسه',
        price: 50000,
        id: 0
    },
    {
        name: 'آچار فرانسه',
        price: 4000,
        id: 1
    },
    {
        name: 'آچار فرانسه',
        price: 300000,
        id: 2
    },
    {
        name: 'آچار فرانسه',
        price: 1000,
        id: 3
    },
    {
        name: 'آچار فرانسه',
        price: 8420,
        id: 4
    },
    {
        name: 'آچار فرانسه',
        price: 50000,
        id: 5
    }
]

export default class Category extends Component {
    render(){
        const {history, match} = this.props,
        category = match.params.name,
        _query = {
            min: 0,
            max: Infinity,
            filter: ''
        },
        urlQuery = qs.parse(history.location.search),
        query = Object.assign(_query, urlQuery);
        data = data.filter(p => { return p.price >= Number(query.min) && Number(query.max) >= p.price && p.name.indexOf(query.filter) !== -1});
        return (
            <Fragment>
                <AppBar title={category} zDepth={2} iconElementLeft={
                    <Link to='/'>
                        <IconButton>
                            <FontIcon className='mdi' color={palette.primary3Color}>menu</FontIcon>
                        </IconButton>
                    </Link>
                } style={{position: 'fixed'}} />
                <Space height={64 + 15} />
                {/* <Subheader>نمایش {data.length} آیتم</Subheader> */}
                <GridList cold={2} cellHeight={200} padding={0}>
                    {data.map((e, index) => {
                        return (
                            <Link to={`/product/${e.id}`}>
                                <GridTile style={{margin: 1.5}} cols={1} rows={1} key={index} titlePosition='bottom'
                                    titleBackground='linear-gradient(to top, rgba(0,0,0,.5), transparent)'
                                    title={e.name} />
                            </Link>
                        )
                    })}
                </GridList>
            </Fragment>
        )
    }
}
