import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: 'teal',
      newColorName: ''
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorName', value =>
      this.props.colors.every(({ name }) => {
        return name.toLowerCase() !== value.toLowerCase();
      })
    );
    ValidatorForm.addValidationRule('isColor', value =>
      this.props.colors.every(({ color }) => {
        return color.toLowerCase() !== this.state.currentColor.toLowerCase();
      })
    );
  }

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
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName
    };

    this.props.addNewColor(newColor);

    this.setState({
      ...this.state,
      newColorName: ''
    });
  };

  render() {
    const { paletteFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.updateCurrentColor}
          className={classes.picker}
        />
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            value={newColorName}
            placeholder="Color Name"
            className={classes.colorNameInput}
            name="newColorName"
            variant="filled"
            margin="normal"
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
            className={classes.addColor}
            style={{ backgroundColor: paletteFull ? 'grey' : currentColor }}
            disabled={paletteFull}
          >
            {paletteFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

ColorPickerForm.propTypes = {
  paletteFull: PropTypes.bool.isRequired,
  addNewColor: PropTypes.func.isRequired,
  colors: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ColorPickerForm);
