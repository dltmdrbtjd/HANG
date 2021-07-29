import React from 'react';
import GridStyle from './style';

const Grid = ({ _onClick, children, ...props }) => {
  return (
    <GridStyle onClick={_onClick} {...props}>
      {children}
    </GridStyle>
  );
};

Grid.defaultProps = {
  width: '100%',
  _onClick: () => {},
};

export default Grid;
