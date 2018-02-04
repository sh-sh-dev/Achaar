import React, {Component, Fragment} from 'react';
import Helmet from 'react-helmet';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';
import {palette, Space, slicePrice, numToFA} from '../utils/';
import Paper from 'material-ui/Paper';
import {
    Table, TableRow, TableHeader, TableHeaderColumn, TableBody, TableRowColumn
} from 'material-ui/Table';

export default class ShoppingCart extends Component {
    state = {
        items: [
            {
                name: 'آچار فرانسه',
                price: 41000,
                amount: 4
            },
            {
                name: 'آچار فرانسه',
                price: 41000,
                amount: 4
            },
            {
                name: 'آچار فرانسه',
                price: 41000,
                amount: 4
            },
            {
                name: 'آچار فرانسه',
                price: 41000,
                amount: 4
            }
        ]
    }
    render(){
        return (
            <Fragment>
                <Helmet>
                    <title>سبد خرید | آچار</title>
                </Helmet>
                <Paper zDepth={1} style={{backgroundColor: palette.primary1Color, height: 256}}>
                    <AppBar style={{backgroundColor: 'transparent'}} title='سبد خرید' zDepth={0} iconElementLeft={<Link to='/'><IconButton><FontIcon className='mdi' color={palette.primary3Color}>arrow_forward</FontIcon></IconButton></Link>} />
                </Paper>
                <div className='col-xs-12 col-md-8' style={{position: 'relative', top: -70, float: 'none', margin: '0 auto'}}>
                    <Paper style={{overflow: 'auto', padding: 15}} zDepth={1}>
                        <table className='cart-main'>
                            <thead>
                                <tr>
                                    <th>نام</th>
                                    <th>تعداد</th>
                                    <th>قیمت واحد</th>
                                    <th>قیمت کل</th>
                                    <th>فعالیت ها</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* <tr>
                                    <td>آچار فرانسه</td>
                                    <td>4</td>
                                    <td>20000</td>
                                    <td>80000</td>
                                    <td>
                                        <IconButton tooltipPosition='top-center' tooltip='حذف آیتم از سبد خرید'>
                                    <FontIcon className='mdi' color='#f44336'>
                                    delete
                                    </FontIcon>
                                        </IconButton>
                                        <IconButton tooltipPosition='top-center' tooltip='افزایش تعداد کالا'>
                                    <FontIcon className='mdi' color={palette.accent1Color}>
                                    add_circle_outline
                                    </FontIcon>
                                        </IconButton>
                                        <IconButton tooltipPosition='top-center' tooltip='کاهش تعداد کالا'>
                                    <FontIcon className='mdi' color={palette.accent2Color}>
                                    remove_circle_outline
                                    </FontIcon>
                                        </IconButton>
                                    </td>
                                </tr> */}
                                {this.state.items.map(e => <tr>
                                    <td>{e.name}</td>
                                    <td>{numToFA(e.amount)}</td>
                                    <td>{slicePrice(numToFA(e.price))} تومان</td>
                                    <td>{slicePrice(numToFA(e.price * e.amount))} تومان</td>
                                    <td className='actions'>
                                        <div>
                                            <IconButton tooltipPosition='top-center' tooltip='حذف آیتم از سبد خرید'>
                                                <FontIcon className='mdi' color='#f44336'>
                                                    delete
                                                </FontIcon>
                                            </IconButton>
                                            <IconButton tooltipPosition='top-center' tooltip='افزایش تعداد کالا'>
                                                <FontIcon className='mdi' color={palette.accent1Color}>
                                                    add_circle_outline
                                                </FontIcon>
                                            </IconButton>
                                            <IconButton tooltipPosition='top-center' tooltip='کاهش تعداد کالا'>
                                                <FontIcon className='mdi' color={palette.accent2Color}>
                                                    remove_circle_outline
                                                </FontIcon>
                                            </IconButton>
                                        </div>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </Paper>
                </div>
            </Fragment>
        )
    }
}
