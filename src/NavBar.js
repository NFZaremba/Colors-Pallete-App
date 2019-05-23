import React, { Component } from 'react'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './NavBar.css'

class NavBar extends Component {
	constructor(props){
		super(props);
		this.state= {
			format: 'hex'
		}
	}
	handleChange =(e) => {
		let value = e.target.value;
		this.setState({
			format: value
		})
		this.props.handleChange(value)
	}
	render() {
		const { level, changeLevel } = this.props;
		const { format } = this.state;
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
					<Select value={format} onChange={this.handleChange}>
						<MenuItem value='hex'>HEX - #fffff</MenuItem>
						<MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
						<MenuItem value='rgba'>RGBA - rgb(255, 255, 255, 1.0)</MenuItem>
					</Select>
				</div>
			</div>
		)
	}
}

export default NavBar;
