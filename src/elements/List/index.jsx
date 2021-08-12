import React from 'react';
import ListStyle from './style';

const List = ({ children, _onClick, ...props }) => {
  return (
    <ListStyle onClick={_onClick} {...props}>
      {children}
    </ListStyle>
  );
};

List.defaultProps = {
  _onClick: () => {},
};

export default List;
