import React from 'react';
import GridStyle from './style';

export interface Props {
  isFlex?: boolean;
  hoz?: string;
  ver?: string;
  column?: string;
  width?: string;
  height?: string;
  margin?: string;
  bgColor?: string;
  radius?: string;
  overflow?: string;
  padding?: string;
  border?: string;
  borDirection?: string;
  fs?: string;
  fw?: string;
  color?: string;
  lh?: string;
  textAlign?: string;
  position?: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  z?: string;
  shadow?: string;
  translate?: any;
  cursor?: string;
  addstyle?: any;
  _onClick?: any;
}

const Grid: React.FC<Props> = ({
  _onClick,
  children,
  ...props
}): React.ReactElement => {
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
