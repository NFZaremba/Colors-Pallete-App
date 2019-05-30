import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox.js';
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
      open: false,
      currentColor: 'teal',
      colors: [],
      newColorName: '',
      newPaletteName: ''
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
    ValidatorForm.addValidationRule('isPaletteName', value =>
      this.props.palettes.every(({ paletteName }) => {
        console.log({ paletteName });
        return paletteName.toLowerCase() !== value.toLowerCase();
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

  handleSubmit = () => {
    let newName = this.state.newPaletteName;
    console.log(newName.toLowerCase().replace(/ /g, '-'));
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

  render() {
    const { classes } = this.props;
    const { open, currentColor, newColorName, newPaletteName } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                validators={['required', 'isPaletteName']}
                errorMessages={[
                  'this field is required',
                  'Palette name must be unique'
                ]}
              />
              <Button type="submit" variant="contained" color="primary">
                Save Palette
              </Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
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
            <Button variant="contained" color="secondary">
              Clear Palette
            </Button>
            <Button variant="contained" color="primary">
              Random Color
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={newColor => this.updateCurrentColor(newColor)}
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
              style={{ backgroundColor: currentColor }}
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <u>
            {this.state.colors.map(color => (
              <DraggableColorBox
                key={color.name}
                color={color.color}
                name={color.name}
                handleClick={() => this.removeColor(color.name)}
              />
            ))}
          </u>
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
  palettes: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
