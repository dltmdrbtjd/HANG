import React from 'react';
import UlStyle from './style';

export interface Props {
  isFlex?: boolean;
  hoz?: string;
  ver?: string;
  width?: string;
  height?: string;
  margin?: string;
  bgColor?: string;
  radius?: string;
  border?: string;
  overflow?: string;
  padding?: string;
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
  translate?: string;
  addstyle?: any;
  children?: React.ReactElement | React.ReactElement[] | string;
}

const Ul = React.forwardRef<HTMLUListElement, Props>(
  ({ children, ...props }, ref) => {
    return (
      <UlStyle ref={ref} {...props}>
        {children}
      </UlStyle>
    );
  },
);

export default Ul;
