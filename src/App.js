import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette.js';
import PaletteList from './PaletteList.js';
import SingleColorPalette from './SingleColorPalette.js';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm.js';
import { generatePalette } from './colorHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedColors
    };
    console.log(this.state.palettes);
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

  savePalette = newPalette => {
    if (!newPalette) {
      console.warn('Missing parameter: id');
    }

    this.setState({
      ...this.state,
      palettes: [...this.state.palettes, newPalette]
    });
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
            <PaletteList palettes={this.state.palettes} {...routeProps} />
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

export default App;
