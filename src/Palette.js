import React, { Component } from 'react'
import ColorBox from './ColorBox.js'
import NavBar from './NavBar.js'
import './Palette.css'

class Palette extends Component {
	constructor(props){
		super(props);
		this.state = {
			level: 500,
			format: 'hex'
		}
	}

	changeLevel =(level) => {
		this.setState({
			level
		})
	}

	changeFormat = (value) => {
		this.setState({
			format:value
		})
	}

  render() {
		const {colors} = this.props.palette;
		const { level, format } =this.state;
		const colorBoxes = colors[level].map(color => {
			return <ColorBox background={color[format]} name={color.name} />
		})
	return (
	  <div className='Palette'>
			<NavBar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} />
			<div className='Palette-colors'>
				{colorBoxes}
			</div>
	  </div>
	)
  }
}

export default Palette;
