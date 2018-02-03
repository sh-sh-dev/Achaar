// basic stuff
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
// theme and UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {palette} from './utils/ui-utils';
// routes
import HomePage from './pages/homePage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import ProductPage from './pages/product-page';
import ShoppingCart from './pages/cart';
// misc
import './styles/index.scss';
import registerServiceWorker from './registerServiceWorker';



// The story begins...(:



class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/" exact component={HomePage}/>
                <Route path='/signup' exact component={SignUp} />
                <Route path='/signin' exact component={SignIn} />
                <Route path='/product/:name' render={({match, history}) => <ProductPage productName={match.params.name} />} exact />
                <Route exact path='/cart' component={ShoppingCart} />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme({
    isRtl: true,
    palette,
    fontFamily: 'inherit',
    borderRadius: 2.5
})}><BrowserRouter><App /></BrowserRouter></MuiThemeProvider>, document.getElementById('root'))

registerServiceWorker();
