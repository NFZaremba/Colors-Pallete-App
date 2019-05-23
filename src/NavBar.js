import React, { Component } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './NavBar.css'

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
		const { level, changeLevel } = this.props;
		const { format, open } = this.state;
		return (
			<div className='Navbar'>
				<div className='logo'>
					<a href="#">Color-Picker</a>
				</div>
				<div className="slider-container">
					<span>Level: {level}</span>
					<div className='slider'>
						<Slider defaultValue={level} min={100} max={900} onAfterChange={changeLevel} step={100}/>
					</div>
				</div>
				<div className="select-container">
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

export default NavBar;
