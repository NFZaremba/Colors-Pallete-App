import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { styles } from './styles/PaletteFooterStyles';

const PaletteFooter = props => {
  const { paletteName, emoji, classes } = props;
  return (
    <footer className={classes.PaletteFooter}>
      {paletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
};

PaletteFooter.propTypes = {
  paletteName: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PaletteFooter);
