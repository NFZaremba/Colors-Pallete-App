import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette.js';
import PaletteList from './PaletteList.js';
import SingleColorPalette from './SingleColorPalette.js';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm.js';
import { generatePalette } from './colorHelpers';
require('dotenv').config();

class App extends Component {
  static defaultProps = {
    initStorage: JSON.parse(localStorage.getItem('palettes'))
  };

  constructor(props) {
    super(props);
    this.state = {
      palettes: this.props.initStorage || seedColors
    };
    console.log(this.state.palettes);
    console.log(process.env);
  }
  findPalette = id => {
    if (!id) {
      console.warn('Missing parameter: id');
    }
    console.log(this.state.palettes);
    return this.state.palettes.find(palette => {
      return palette.id === id;
    });
  };

  deletePalette = id => {
    if (!id) {
      console.warn('Missing paramter: id');
      return;
    }

    this.setState(
      prevState => ({
        palettes: prevState.palettes.filter(palette => palette.id !== id)
      }),
      this.syncLocalStorage
    );
  };

  savePalette = newPalette => {
    if (!newPalette) {
      console.warn('Missing parameter: id');
    }

    this.setState(
      {
        ...this.state,
        palettes: [...this.state.palettes, newPalette]
      },
      this.syncLocalStorage
    );
  };

  syncLocalStorage = () => {
    if (!localStorage) {
      console.warn('Browser does not support local storage');
      return;
    }

    window.localStorage.setItem(
      'palettes',
      JSON.stringify(this.state.palettes)
    );
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPaletteForm
              savePalette={this.savePalette}
              palettes={this.state.palettes}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList
              palettes={this.state.palettes}
              {...routeProps}
              deletePalette={this.deletePalette}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              colorId={routeProps.match.params.colorId}
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

App.propTypes = {
  initStorage: PropTypes.array.isRequired
};

export default App;
