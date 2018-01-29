import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import HomePage from './pages/homePage';
import SignIn from './pages/signin';
import { Route, BrowserRouter } from 'react-router-dom';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import palette from './palette';
// const Home = () => (
//     <div>
//         <h2>Home</h2>
//     </div>
// )
// const Category = () => (
//     <div>
//         <h2>Category</h2>
//     </div>
// )
// const Products = () => (
//     <div>
//         <h2>Products</h2>
//     </div>
// )
class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Route path="/" exact component={HomePage}/>
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
