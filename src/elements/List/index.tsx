import React from 'react';
import ListStyle from './style';

export interface Props {
  isFlex?: boolean;
  hoz?: string;
  ver?: string;
  width?: string;
  height?: string;
  radius?: string;
  bgColor?: string;
  fs?: string;
  padding?: string;
  addstyle?: any;
  _onClick?: any;
}

const List: React.FC<Props> = ({ children, _onClick, ...props }) => {
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
