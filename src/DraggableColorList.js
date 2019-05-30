import React from 'react';
import PropTypes from 'prop-types';
import DraggableColorBox from './DraggableColorBox.js';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = props => {
  const { colors, removeColor } = props;
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, i) => (
        <DraggableColorBox
          index={i}
          key={color.name}
          color={color.color}
          name={color.name}
          handleClick={() => removeColor(color.name)}
        />
      ))}
    </div>
  );
};

DraggableColorList.propTypes = {
  colors: PropTypes.array.isRequired,
  removeColor: PropTypes.func.isRequired
};

export default SortableContainer(DraggableColorList);
