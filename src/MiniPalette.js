import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { styles } from './styles/MiniPaletteStyles.js';
import DeleteIcon from '@material-ui/icons/Delete';

class MiniPalette extends Component {
  // constructor(props) {
  //   super(props);
  // }

  deletePalette = e => {
    e.stopPropagation();
    this.props.deletePalette(this.props.id);
  };

  render() {
    const { classes, paletteName, emoji, colors, handleClick } = this.props;
    const miniColorBoxes = colors.map(color => (
      <div
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
        key={color.name}
      />
    ));

    return (
      <div className={classes.root} onClick={handleClick}>
        <div className={classes.delete}>
          <DeleteIcon
            className={classes.deleteIcon}
            onClick={this.deletePalette}
          />
        </div>
        <div className={classes.colors}>{miniColorBoxes}</div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    );
  }
}

MiniPalette.propTypes = {
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  paletteName: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  colors: PropTypes.array.isRequired,
  deletePalette: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default withStyles(styles)(MiniPalette);
