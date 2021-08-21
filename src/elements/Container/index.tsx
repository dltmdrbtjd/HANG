import React from 'react';
import ContainerStyle from './style';

export interface Props {
  padding?: string;
  height?: string;
  addstyle?: any;
}

const Container: React.FC<Props> = ({
  children,
  ...props
}): React.ReactElement => {
  return <ContainerStyle {...props}>{children}</ContainerStyle>;
};

Container.defaultProps = {
  padding: '90px 0 80px 0',
};

export default Container;
