import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import HomePage from './pages/homePage';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import { Route, BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import palette from './palette';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/" exact component={HomePage}/>
                <Route path='/signup' exact component={SignUp} />
                <Route path='/signin' exact component={SignIn} />
            </React.Fragment>
        )
    }
}

ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme({
    isRtl: true,
    palette,
    fontFamily: 'inherit'
})}><BrowserRouter><App /></BrowserRouter></MuiThemeProvider>, document.getElementById('root'))

registerServiceWorker();
