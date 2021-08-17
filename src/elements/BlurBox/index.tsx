import React from 'react';
// style
import BlurBoxStyle from './style';

export interface Props {
  children: any;
  hoz?: string;
  ver?: string;
  isFlex?: any;
}

const BlurBox: React.FC<Props> = ({
  children,
  ...props
}): React.ReactElement => {
  return <BlurBoxStyle {...props}>{children}</BlurBoxStyle>;
};

export default BlurBox;
