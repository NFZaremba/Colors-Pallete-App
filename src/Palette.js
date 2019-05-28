import React, { Component } from 'react'
import ColorBox from './ColorBox.js'
import NavBar from './NavBar.js'
import { PaletteFooter } from './PaletteFooter.js'
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
		const {colors, paletteName, emoji, id} = this.props.palette;
		const { level, format } =this.state;
		const colorBoxes = colors[level].map(color => {
			return <ColorBox key={color.name} background={color[format]} name={color.name} id={color.id} paletteId={id} showLink={true} />
		})
		console.log(this.props.palette)
	return (
	  <div className='Palette'>
			<NavBar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors />
			<div className='Palette-colors'>
				{colorBoxes}
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji}/>
	  </div>
	)
  }
}

export default Palette;
