import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import HomePage from './homePage';
import { Link, Route, Switch, BrowserRouter } from 'react-router-dom';
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
            <div>
                <Route path="/" exact component={HomePage}/>
                {/* <Route path="/category" component={Category}/>
                <Route path="/products" component={Products}/> */}
            </div>
        )
    }
}

ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme({
    isRtl: true,
    palette,
    fontFamily: 'iransansweb'
})}><BrowserRouter><App /></BrowserRouter></MuiThemeProvider>, document.getElementById('root'))

registerServiceWorker();
