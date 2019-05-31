import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import { withStyles } from '@material-ui/styles';
import { styles } from './styles/PaletteListStyles';

class PaletteList extends Component {
  goToPalette = id => {
    if (!id) {
      console.warn('Missing paramter: id');
      return;
    }

    this.props.history.push(`/palette/${id}`);
  };
  render() {
    const { palettes, classes, deletePalette } = this.props;
    console.log(palettes);
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 style={{ color: 'white' }}>Color-Picker</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                key={palette.id}
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                deletePalette={deletePalette}
                id={palette.id}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

PaletteList.propTypes = {
  history: PropTypes.object.isRequired,
  palettes: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  deletePalette: PropTypes.func.isRequired
};

export default withStyles(styles)(PaletteList);
