import React from 'react';
import StrongStyle from './style';

export interface Props {
  margin?: string;
  fs?: string;
  fw?: string;
  color?: string;
  lh?: string;
  textAlign?: string;
  addstyle?: any;
}

const Strong: React.FC<Props> = ({
  children,
  ...props
}): React.ReactElement => {
  return <StrongStyle {...props}>{children}</StrongStyle>;
};

Strong.defaultProps = {
  fw: 'bold',
};

export default Strong;
