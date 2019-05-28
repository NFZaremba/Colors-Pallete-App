import React, { Component } from 'react'
import MiniPalette from './MiniPalette'
import { withStyles } from '@material-ui/styles';
import {styles} from './styles/PaletteListStyles'

class PaletteList extends Component {
	goToPalette = (id) => {
		this.props.history.push(`/palette/${id}`)
	}
	render() {
		const { palettes, classes } = this.props;
		console.log(palettes)
		return (
			<div className={classes.root}>
				<div className={classes.container}>
					<nav className={classes.nav}>
						<h1 style={{color: 'white'}}>Color-Picker</h1>
					</nav>
					<div className={classes.palettes}>
						{palettes.map(palette => (
							<MiniPalette key={palette.id} {...palette} handleClick={() => this.goToPalette(palette.id)}/>
						))}
					</div>
				</div>
				
			</div>
		)
	}
}

export default withStyles(styles)(PaletteList);