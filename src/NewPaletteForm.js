import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';

import styles from './styles/NewPaletteFormStyles';

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      colors: this.props.palettes[0].colors
    };
  }

  toggleDrawerOpen = () => {
    const { open } = this.state;
    this.setState({ open: !open ? true : false });
  };

  addNewColor = newColor => {
    if (!newColor) {
      console.warn('Missing paramter: newColor');
      return;
    }

    this.setState({
      ...this.state,
      colors: [...this.state.colors, newColor]
    });
  };

  handleChange = e => {
    if (!e) {
      console.warn('Missing paramter: event');
      return;
    }

    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = newPalette => {
    if (!newPalette) {
      console.warn('Missing paramter: newPalette');
      return;
    }

    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;

    this.props.savePalette(newPalette);
    this.props.history.push('/');
  };

  removeColor = colorName => {
    if (!colorName) {
      console.warn('Missing paramter: colorName');
      return;
    }

    this.setState({
      ...this.state,
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    // this.setState(({ colors }) => ({
    //   colors: arrayMove(colors, oldIndex, newIndex)
    // }));

    this.setState({
      ...this.state,
      colors: arrayMove(this.state.colors, oldIndex, newIndex)
    });
  };

  clearColors = () => {
    this.setState({
      ...this.state,
      colors: []
    });
  };

  addRandomColor = () => {
    // pick random color from existing palettes
    const allColors = this.props.palettes.map(p => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({
      ...this.state,
      colors: [...this.state.colors, randomColor]
    });
    console.log(allColors);
  };

  render() {
    const { classes, maxColor, palettes } = this.props;
    const { open, colors } = this.state;

    const paletteFull = colors.length >= maxColor;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          open={open}
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          toggleDrawerOpen={this.toggleDrawerOpen}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.toggleDrawerOpen}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.btns}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this.clearColors}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.addRandomColor}
                disabled={paletteFull}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              colors={colors}
              paletteFull={paletteFull}
              addNewColor={this.addNewColor}
            />
          </div>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={colors}
            removeColor={this.removeColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

NewPaletteForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  savePalette: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  palettes: PropTypes.array.isRequired,
  maxColor: PropTypes.number.isRequired
};

NewPaletteForm.defaultProps = {
  maxColor: 20
};

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
