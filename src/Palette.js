import React, { Component } from 'react'
import ColorBox from './ColorBox.js'
import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';
import './Palette.css'

class Palette extends Component {
	constructor(props){
		super(props);
		this.state = {
			level: 500
		}
	}

	changeLevel =(level) => {
		this.setState({
			level
		})
	}

  render() {
		const {colors} = this.props.palette;
		const { level } =this.state;
		const colorBoxes = colors[level].map(color => {
			return <ColorBox background={color.hex} name={color.name} />
		})
	return (
	  <div className='Palette'>
		<Slider defaultValue={level} min={100} max={900} onAfterChange={this.changeLevel} step={100}/>
			<div className='Palette-colors'>
				{colorBoxes}
			</div>
	  </div>
	)
  }
}

export default Palette;
