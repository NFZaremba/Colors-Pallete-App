import React, { Component } from 'react'
import ColorBox from './ColorBox.js'
import NavBar from './NavBar.js'
import PaletteFooter from './PaletteFooter.js'
import { withStyles } from '@material-ui/styles';
import {styles} from './styles/PaletteStyles.js'

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
		const { classes } = this.props;
		const { level, format } =this.state;

		const colorBoxes = colors[level].map(color => {
			return <ColorBox key={color.name} background={color[format]} name={color.name} id={color.id} paletteId={id} showingFullPalette />
		})
		console.log(this.props.palette)
	return (
	  <div className={classes.Palette}>
			<NavBar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors />
			<div className={classes.colors}>
				{colorBoxes}
			</div>
			<PaletteFooter paletteName={paletteName} emoji={emoji}/>
	  </div>
	)
  }
}

export default withStyles(styles)(Palette);
