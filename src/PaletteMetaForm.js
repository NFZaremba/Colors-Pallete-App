import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';

import 'emoji-mart/css/emoji-mart.css';

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: 'form',
      newPaletteName: ''
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteName', value =>
      this.props.palettes.every(({ paletteName }) => {
        // console.log({ paletteName });
        return paletteName.toLowerCase() !== value.toLowerCase();
      })
    );
  }

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

  showEmojiPicker = () => {
    this.setState({
      ...this.state,
      stage: 'emoji'
    });
  };

  savePalette = emoji => {
    if (!emoji) {
      console.warn('Missing parameter: emoji');
      return;
    }
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    };
    this.props.handleSubmit(newPalette);
  };

  render() {
    const { newPaletteName, stage } = this.state;
    const { hideForm } = this.props;
    console.log(this.state);
    return (
      <div>
        <Dialog open={stage === 'emoji'} onClose={hideForm}>
          <Picker onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={stage === 'form'}
          onClose={hideForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Choose Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your palette. Make sure it is unique.
              </DialogContentText>

              <TextValidator
                label="Palette Name"
                value={newPaletteName}
                name="newPaletteName"
                onChange={this.handleChange}
                fullWidth
                margin="normal"
                validators={['required', 'isPaletteName']}
                errorMessages={[
                  'this field is required',
                  'Palette name must be unique'
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

PaletteMetaForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  palettes: PropTypes.array.isRequired,
  hideForm: PropTypes.func.isRequired
};

export default PaletteMetaForm;
