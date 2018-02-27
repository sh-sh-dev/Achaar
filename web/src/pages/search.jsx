import React from 'react';
import Skeleton from '../skeleton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Helmet from 'react-helmet';
import qs from "querystringify";
import { palette, Space } from "../utils/";
import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
const xssClean = require('xss-clean/lib/xss').clean;

class SearchInput extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			empty: props.text.length === 0
		}
	}
	render(){
		let search = this.props.text;
		return (
			<Paper style={{
					padding: 4,
					margin: 8,
					height: 56,
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'row',
					width: '100%',
					backgroundColor: 'rgba(255,255,255,.35)'
				}}>

				<Link to="/">
					<IconButton
						style={{
							marginRight: 4
						}}>

						<FontIcon className="mdi">arrow_forward</FontIcon>

					</IconButton>
				</Link>

				<TextField
					hintText='جستجو کنید...'
					defaultValue={search}
					underlineShow={false}
					fullWidth={true}
					ref={f => {this.field = f}}
					onChange={
						(shit, value) => {
							this.setState({
								empty: value.length === 0
							});
						}
					}
					onKeyDown={
						e => {
							if (e.key === 'Enter') {
								this.refs.button.props.onClick()
							}
						}
					}
					/>

				<IconButton
					style={{
						marginLeft: 4,
						transform: `scale(${ Math.max(.4, Number(!this.state.empty)) })`,
						opacity: Number(!this.state.empty),
						pointerEvents: this.state.empty ? 'none' : 'auto',
					}}
					ref='button'
					onClick={
						() => {
							this.props.callBack(this.field.input.value)
						}
					}>

					<FontIcon className="mdi">search</FontIcon>

				</IconButton>

			</Paper>
		)
	}
}

const truth = [
	{
		title: 'آچار فرانسه سیاه :|',
		category: 'ابزار سبک'
	},
	{
		title: 'پرینتر ۹ بعدی',
		category: 'ابزار تخیلی'
	}
]

export default class Search extends React.Component {
	constructor(props){
		super(props);
	}
	render(){
		let search = xssClean(qs.parse(this.props.history.location.search).q);

		return (
			<div>
				<Helmet>
					<title>نمایش نتایج جستجو برای {search} | آچار</title>
				</Helmet>
				<Paper
					style={{
						height: 160,
						display: 'flex',
						backgroundColor: palette.primary1Color
					}}>
					<SearchInput text={search} callBack={value => {
							if (value && value !== search) {
								this.props.history.push({
									search: qs.stringify({q: value}, true)
								})
								this.forceUpdate();
							}
						}} />
				</Paper>
				<div className="col-xs-12 col-md-8" style={{float: 'none', margin: '0 auto', marginTop: -56}}>
					<Paper style={{padding: 16}}>
						<h1>نتایج جستجوی <b style={{color: palette.accent1Color}}>{search}</b></h1>
						<List style={{marginLeft: -16, marginRight: -16}}>
							{truth.map(
								(e, index) => {
									return (
										<Link to='/' tabIndex={-1} key={index}>
											<ListItem
												className='unselectable'
												primaryText={e.title}
												secondaryText={e.category} />
										</Link>
									)
								}
							)}
						</List>
					</Paper>
				</div>
			</div>
		)
	}
}
