import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PaletteFormNav from './PaletteFormNav';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: 'teal',
      colors: this.props.palettes[0].colors,
      newColorName: ''
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorName', value =>
      this.state.colors.every(({ name }) => {
        return name.toLowerCase() !== value.toLowerCase();
      })
    );
    ValidatorForm.addValidationRule('isColor', value =>
      this.state.colors.every(({ color }) => {
        return color.toLowerCase() !== this.state.currentColor.toLowerCase();
      })
    );
  }

  toggleDrawerOpen = () => {
    const { open } = this.state;
    this.setState({ open: !open ? true : false });
  };

  updateCurrentColor = newColor => {
    if (!newColor) {
      console.warn('Missing paramter: newColor');
      return;
    }
    console.log(newColor);

    this.setState({
      ...this.state,
      currentColor: newColor.hex
    });
  };

  addNewColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };
    this.setState({
      ...this.state,
      colors: [...this.state.colors, newColor],
      newColorName: ''
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

  handleSubmit = newPaletteName => {
    if (!newPaletteName) {
      console.warn('Missing paramter: newPaletteName');
      return;
    }

    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, '-'),
      colors: this.state.colors
    };
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
    const { open, currentColor, newColorName, colors } = this.state;

    const paletteFull = colors.length >= maxColor;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          classes={classes}
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
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addRandomColor}
              disabled={paletteFull}
            >
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={newColorName}
              name="newColorName"
              onChange={this.handleChange}
              validators={['required', 'isColorName', 'isColor']}
              errorMessages={[
                'this field is required',
                'Color name must be unique',
                'Color already used'
              ]}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ backgroundColor: paletteFull ? 'grey' : currentColor }}
              disabled={paletteFull}
            >
              {paletteFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
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
