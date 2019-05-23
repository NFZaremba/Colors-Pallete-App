import React, { Component } from 'react'
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './NavBar.css'

class NavBar extends Component {
	render() {
		const { level, changeLevel } = this.props;
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
			</div>
		)
	}
}

export default NavBar;
