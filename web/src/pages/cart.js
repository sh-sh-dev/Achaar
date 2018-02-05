import React, {Component, Fragment} from 'react';
import Helmet from 'react-helmet';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
// import TouchRipple from 'material-ui/internal/TouchRipple';
import {Link} from 'react-router-dom';
import {palette, Space, slicePrice, numToFA} from '../utils/';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import update from 'immutability-helper';

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
        ],
        confirmDialogOpen: false
    }
    changeAmount = (index, inc) => {
        let {items} = this.state;
        const IO = {};
        let i = index.toString();
        IO[i] = {};
        IO[i].amount = {$set: items[index].amount + inc};
        let newItems = update(items, IO);
        return (() => {
            // console.log(newItems);
            this.setState({
                items: newItems
            })
        }).bind(this)
    }
    render(){
        const closeD = () => {
            this.setState({confirmDialogOpen: false})
        }
        return (
            <Fragment>
                <Helmet>
                    <title>سبد خرید | آچار</title>
                </Helmet>
                <Paper zDepth={1} style={{backgroundColor: palette.primary1Color, height: 256}}>
                    <AppBar style={{backgroundColor: 'transparent'}} title='سبد خرید' zDepth={0} iconElementLeft={<Link to='/'><IconButton><FontIcon className='mdi' color={palette.primary3Color}>arrow_forward</FontIcon></IconButton></Link>} />
                </Paper>
                <div className='col-xs-12 col-md-8' style={{position: 'relative', top: -70, float: 'none', margin: '0 auto'}}>
                    <Paper style={{padding: 15}} zDepth={1}>
                        <div style={{overflow: 'auto'}}>
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
                                    {this.state.items.map((e, index) => <tr key={index}>
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
                                                <IconButton tooltipPosition='top-center' tooltip='افزایش تعداد کالا' onClick={this.changeAmount(index, 1)}>
                                                    <FontIcon className='mdi' color={palette.accent1Color}>
                                                        add_circle_outline
                                                    </FontIcon>
                                                </IconButton>
                                                <IconButton tooltipPosition='top-center' tooltip='کاهش تعداد کالا' onClick={this.changeAmount(index, -1)} disabled={this.state.items[index].amount < 2}>
                                                    <FontIcon className='mdi' color={palette.accent2Color}>
                                                        remove_circle_outline
                                                    </FontIcon>
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>
                        <Space height={15} />
                        <div style={{textAlign: 'center'}}>
                            <RaisedButton onClick={() => {
                                this.setState({confirmDialogOpen: true})
                            }} secondary label='نهایی سازی خرید' icon={<FontIcon className='mdi'>done</FontIcon>} />
                        </div>
                    </Paper>
                </div>

                <Dialog title='تأئید نهایی سازی خرید' open={this.state.confirmDialogOpen} onRequestClose={closeD} actions={[<FlatButton secondary={true} onClick={closeD}>بله</FlatButton>, <FlatButton secondary={true} onClick={closeD}>خیر</FlatButton>]}>
                    آیا از نهایی سازی خرید خود اطمینان دارید؟
                    <b>این کار غیرقابل بازگشت است!</b>
                </Dialog>
            </Fragment>
        )
    }
}
