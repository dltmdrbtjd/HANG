import React from 'react';
import MainTitleStyle from './style';

const MainTitle = ({ children, ...porps }) => {
  return <MainTitleStyle {...porps}>{children}</MainTitleStyle>;
};

MainTitle.defaultProps = {
  width: '100%',
  color: 'black',
  fw: 700,
};

export default MainTitle;
