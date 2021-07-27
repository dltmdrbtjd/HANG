import React from 'react';
import GridStyle from './style';

const Grid = ({ children, ...props }) => {
  return <GridStyle {...props}>{children}</GridStyle>;
};

Grid.defaultProps = {
  width: '100%',
};

export default Grid;
