import React, {Component, Fragment} from 'react';
import Helmet from 'react-helmet';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {Link} from 'react-router-dom';
import {palette, Space, slicePrice} from '../utils/ui-utils';
import FloatingActionButton from 'material-ui/FloatingActionButton';
// import Dialog from 'material-ui/Dialog';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

class CartListItem extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <ListItem className='unselectable' primaryText={this.props.name} rightIconButton={
                <IconButton tooltip='مشاهده جزئیات'><FontIcon className='mdi'>more_vert</FontIcon></IconButton>
            } />
        )
    }
}

export default class ShoppingCart extends Component {
    state = {
        items: [
            {
                name: 'آچار فرانسه',
                price: 41000
            }
        ]
    }
    render(){
        return (
            <Fragment>
                <Helmet>
                    <title>سبد خرید | آچار</title>
                </Helmet>
                <AppBar style={{position: 'fixed'}} title='سبد خرید' zDepth={2} iconElementLeft={<Link to='/'><IconButton><FontIcon className='mdi' color='#fff'>arrow_forward</FontIcon></IconButton></Link>} />
                <Space height={64 + 75} />
                <div className='container'>
                    <div className='col-xs-12 col-md-8' style={{float: 'none', margin: '0 auto'}}>
                        <Paper zDepth={1}>
                            <div style={{fontWeight: 300, fontSize: 20, padding: 15, borderBottom: '1px solid #dedede', color: '#373737'}}>سبد خرید</div>
                            <div style={{position: 'relative'}}>
                                <FloatingActionButton style={{position: 'absolute', left: 'calc(100% - 60px)', top: -20}} mini secondary><FontIcon className='mdi'>done_all</FontIcon></FloatingActionButton>
                                <List>
                                    <Subheader>نهایی نشده</Subheader>
                                    {this.state.items.map((e, index) => <CartListItem name={e.name} />)}
                                </List>
                            </div>
                        </Paper>
                    </div>
                </div>
            </Fragment>
        )
    }
}
