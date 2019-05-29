import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Slider from 'rc-slider/lib/Slider';

import styles from './styles/NavbarStyles'
import 'rc-slider/assets/index.css';

class NavBar extends Component {
	constructor(props){
		super(props);
		this.state= {
			format: 'hex',
			open: false,
		}
	}
	handleFormatChange =(e) => {
		let value = e.target.value;
		this.setState({
			...this.state,
			format: value,
			open:true,
		})
		this.props.handleChange(value)
	}

	closeSnackbar = () => {
		this.setState({
			...this.state,
			open: false
		})
	}

	render() {
		const { level, changeLevel, showingAllColors, classes } = this.props;
		const { format, open } = this.state;
		return (
			<div className={classes.Navbar}>
				<div className={classes.logo}>
				<Link to='/'>Color-Picker</Link>
				</div>
				{showingAllColors && (<div>
					<span>Level: {level}</span>
					<div className={classes.slider}>
						<Slider defaultValue={level} min={100} max={900} onAfterChange={changeLevel} step={100}/>
					</div>
				</div>)}
				<div className={classes.selectContainer}>
					<Select value={format} onChange={this.handleFormatChange}>
						<MenuItem value='hex'>HEX - #fffff</MenuItem>
						<MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
						<MenuItem value='rgba'>RGBA - rgb(255, 255, 255, 1.0)</MenuItem>
					</Select>
				</div>
				<Snackbar 
					anchorOrigin={{vertical: 'bottom', horizontal: 'left'}} 
					open={open}
					autoHideDuration={3000}
					message={<span id='message-id'>Format Changed to {format.toUpperCase()}</span>}
					ContentProps={{
						"aria-describedby": "message-id"
					}}
					onClose={this.closeSnackbar}
					action={[
						<IconButton onClick={this.closeSnackbar}>
							<CloseIcon/>
						</IconButton>
					]}
				/>
			</div>
		)
	}
}

export default withStyles(styles)(NavBar);
