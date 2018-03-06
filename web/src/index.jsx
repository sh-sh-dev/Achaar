// basic stuff
import React from 'react'
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// theme and UI
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {theme} from './utils/';
// routes
import HomePage from './pages/home-page';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import ProductPage from './pages/product-page';
import ShoppingCart from './pages/cart';
import Category from './pages/category';
import Account from "./pages/account";
import OrderFinalization from './pages/orderf';
import Err404 from './pages/errors/not-found';
import Search from "./pages/search";
// misc
import './styles/index.scss';
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {
    render() {
        return (
            <Router>
                <MuiThemeProvider muiTheme={theme}>
                    <Switch>
                        {/* Index */}
                        <Route path="/" exact component={HomePage} />
                        {/* Account */}
                        <Route path='/signup' exact component={SignUp} />
                        <Route path='/signin' exact component={SignIn} />
                        {/* Products */}
                        <Route exact path='/category/:name' component={Category} />
                        <Route path='/product/:id' render={({match, history}) => <ProductPage pid={match.params.id} history={history} />} exact />
                        {/* Cart */}
                        <Route exact path='/cart' component={ShoppingCart} />
                        <Route exact path='/order-finalization' component={OrderFinalization} />
                        {/* Account managing */}
                        <Route exact path='/account' component={Account} />
                        {/* Search */}
                        <Route exact path='/search' component={Search} />
                        {/* And, 404! */}
                        <Route component={Err404} />
                    </Switch>
                </MuiThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))

registerServiceWorker();
