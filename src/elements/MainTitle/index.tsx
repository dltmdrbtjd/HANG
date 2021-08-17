import React from 'react';
import MainTitleStyle from './style';

export interface Props {
  children: string;
  width?: string;
  height?: string;
  margin?: string;
  padding?: string;
  fs?: string;
  fw?: string;
  color?: string;
  lh?: string;
  textAlign?: string;
  addstyle?: any;
}

const MainTitle: React.FC<Props> = ({
  children,
  ...props
}): React.ReactElement => {
  return <MainTitleStyle {...props}>{children}</MainTitleStyle>;
};

MainTitle.defaultProps = {
  fw: 'bold',
};

export default MainTitle;
